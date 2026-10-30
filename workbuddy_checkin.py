#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorkBuddy 每日积分签到（纯代码层，无需打开应用、无需点击）
原理：读取 WorkBuddy 本地明文会话文件中的 accessToken，
     直接向 https://copilot.tencent.com/v2/billing/meter 发起签到请求。

说明：
- token 由 WorkBuddy 自身维护（你日常打开 WorkBuddy 时会自动刷新），脚本只读取，不修改。
- 为避免影响你主程序的登录态，脚本不会用 refreshToken 去刷新/轮转 token；
  若 accessToken 过期（例如很久没开 WorkBuddy），会提示你先打开一次 WorkBuddy。
- 新版 WorkBuddy 已把本地会话文件加密（accessToken 变成 {"$wbEncrypted":...}），
  所以本脚本读的是同目录的明文副本 token.info；该副本由 wb_token_sync.py 自动刷新
  （解密走 wb_token_dump.js + WorkBuddy 自带二进制，无需调试器/管理员权限），
  run_checkin.bat 每次签到前都会先跑一遍，服务器侧的 token.info 也由它推送。
"""
import json
import os
import sys
import time
import base64
import datetime
import urllib.request
import urllib.error

# 网关会拒绝 Python-urllib 默认 UA（get-user-resource 直接 403），统一带上浏览器 UA
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# 强制 UTF-8 输出：计划任务里 stdout 会重定向到日志文件，系统默认编码可能是 GBK，
# 若日志含中文/emoji 会抛 UnicodeEncodeError 导致脚本异常退出。这里统一按 UTF-8 写。
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

def _token_is_plaintext(path):
    """会话文件里的 accessToken 是否为明文 JWT 字符串。

    新版 WorkBuddy 客户端已把本地会话文件加密（accessToken 变成
    {"$wbEncrypted":..,"envelope":..} 对象），此时无法直接读取，需回退到明文副本。
    """
    try:
        with open(path, "r", encoding="utf-8") as f:
            d = json.load(f)
        return isinstance((d.get("auth") or {}).get("accessToken"), str)
    except Exception:
        return False


# 会话文件位置（明文存放 accessToken / uid / domain）
def find_token_file():
    # 1) 环境变量显式指定（部署到服务器时用：WB_TOKEN_FILE=/opt/wb-checkin/token.info）
    env = os.environ.get("WB_TOKEN_FILE")
    if env and os.path.isfile(env):
        return env
    # 2) 默认：WorkBuddy 本地明文会话文件
    candidates = []
    local = os.environ.get("LOCALAPPDATA")
    if local:
        candidates.append(os.path.join(local, "CodeBuddyExtension", "Data", "Public", "auth", "workbuddy-desktop.info"))
    candidates.append(r"C:\Users\54004\AppData\Local\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info")
    # 3) 兜底：脚本同目录的明文 token.info（新版客户端把本地会话文件加密后，
    #    这里维护的明文副本仍可直接使用；由人工/部署流程更新）
    candidates.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "token.info"))
    # 优先返回「accessToken 是明文」的那个；若全部被加密，再退回第一个存在的（交给上层报明确错误）
    fallback = None
    for c in candidates:
        if not os.path.isfile(c):
            continue
        if _token_is_plaintext(c):
            return c
        if fallback is None:
            fallback = c
    return fallback

def b64url_decode(s):
    s += "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s)

def decode_jwt_exp(token):
    try:
        part = token.split(".")[1]
        payload = json.loads(b64url_decode(part))
        return payload.get("exp")
    except Exception:
        return None

def load_session(path):
    with open(path, "r", encoding="utf-8") as f:
        d = json.load(f)
    auth = d.get("auth", {})
    tok = auth.get("accessToken")
    if not isinstance(tok, str):
        # 新版 WorkBuddy 把本地会话文件加密了；给出明确指引而不是让它变成诡异的 401
        raise ValueError(
            "会话文件里的 accessToken 不是明文（新版 WorkBuddy 已加密该文件）。"
            "请先跑一次 run_token_sync.bat 生成明文 token.info"
            "（或用环境变量 WB_TOKEN_FILE 指定其路径）。"
        )
    return {
        "access_token": tok,
        "uid": d.get("account", {}).get("uid"),
        "domain": auth.get("domain") or "copilot.tencent.com",
        "token_type": auth.get("tokenType") or "Bearer",
    }

def post(base, path, token, uid, domain, body, use_proxy):
    url = base + path
    data = json.dumps(body or {}).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("X-User-Id", uid)
    req.add_header("X-Domain", domain)
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", UA)
    req.add_header("Accept", "application/json, text/plain, */*")
    handlers = []
    if not use_proxy:
        handlers.append(urllib.request.ProxyHandler({}))
    opener = urllib.request.build_opener(*handlers)
    with opener.open(req, timeout=20) as r:
        return r.status, r.read().decode("utf-8", "replace")

# 早高峰网关常见 429/5xx；退避重试，避免一次抖动让当天整轮签到失败
RETRY_CODES = (429, 500, 502, 503, 504)
MAX_ATTEMPTS = 3


def _retry_delay(exc, attempt):
    """429 优先用服务端 Retry-After，其余指数退避（2s、4s）。"""
    try:
        if isinstance(exc, urllib.error.HTTPError):
            ra = (exc.headers or {}).get("Retry-After")
            if ra:
                return max(1.0, min(float(ra), 30.0))
    except Exception:
        pass
    return min(2.0 * (2 ** attempt), 20.0)


def _post_once(base, path, sess, body, use_proxy):
    return post(base, path, sess["access_token"], sess["uid"], sess["domain"], body, use_proxy)


def call(base, path, sess, body=None, allow_direct=True):
    last_err = None
    for attempt in range(MAX_ATTEMPTS):
        retryable = True
        try:
            return _post_once(base, path, sess, body, use_proxy=True)
        except urllib.error.HTTPError as e:
            last_err = e
            retryable = e.code in RETRY_CODES
        except (urllib.error.URLError, OSError) as e:
            last_err = e
        if allow_direct:
            try:
                return _post_once(base, path, sess, body, use_proxy=False)
            except urllib.error.HTTPError as e:
                last_err = e
                retryable = retryable and e.code in RETRY_CODES
            except (urllib.error.URLError, OSError) as e:
                last_err = e
        if not retryable:
            break  # 鉴权/业务错误：重试无意义
        if attempt < MAX_ATTEMPTS - 1:
            time.sleep(_retry_delay(last_err, attempt))
    raise last_err

def write_state(ok, message, data):
    """把本次结果写入状态文件（供网页展示"上次签到记录"）。路径由 WB_STATE_FILE 指定。"""
    path = os.environ.get("WB_STATE_FILE")
    if not path:
        return
    try:
        d = data or {}
        rec = {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
            "activity": d.get("activity_name"),
            "total": d.get("total_credits"),
            "today": d.get("today_credit"),
            "streak": d.get("streak_days"),
            "checked": bool(d.get("today_checked_in")),
        }
        with open(path, "w", encoding="utf-8") as f:
            json.dump(rec, f, ensure_ascii=False)
    except Exception:
        pass


def snapshot_balance(sess):
    """查询资源余额并写入每日历史（balance_history.json）。

    供自动签到定时任务调用：保证每天都有一条余额样本，网页的「昨日用量」
    才能算得出来（之前只有打开页面时才采样，历史永远凑不够两天）。
    路径由 WB_BALANCE_HISTORY 指定，默认与脚本同目录，和 web_server.py 共用。
    """
    path = os.environ.get("WB_BALANCE_HISTORY") or os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "balance_history.json")
    try:
        base = f"https://{sess['domain']}/v2/billing/meter"
        body = {
            "PageNumber": 1, "PageSize": 100, "ProductCode": "p_tcaca",
            "Status": [0, 3],
            "PackageStartTimeRangeBegin": "2024-12-01 21:25:00",
            "PackageStartTimeRangeEnd": "2026-12-31 23:59:59",
        }
        s, b = call(base, "/get-user-resource", sess, body)
        if s != 200:
            return
        d = json.loads(b)
        resp = (d.get("data") or {}).get("Response") or {}
        accounts = (resp.get("Data") or {}).get("Accounts") or []
        total = 0.0
        for a in accounts:
            total += float(a.get("CapacityRemainPrecise") or 0)
        today = datetime.date.today().isoformat()
        hist = {}
        try:
            with open(path, "r", encoding="utf-8") as f:
                hist = json.load(f)
        except Exception:
            hist = {}
        hist[today] = round(total, 2)
        keys = sorted(hist.keys())
        if len(keys) > 60:
            for k in keys[:-60]:
                hist.pop(k, None)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(hist, f, ensure_ascii=False)
    except Exception:
        pass


def _pre_checkin_chat(sess):
    """签到前置：WorkBuddy 官方要求「当天存在一次对话记录」才会记录签到
    （否则 daily-checkin 不生效 → 签到空白 / 连登断开）。

    先补发一条极简对话满足该条件。尽力而为：wb_growth 缺失或对话失败都不阻断签到。
    返回 (status, err)：status 为对话 HTTP 状态码，失败为 None。
    """
    try:
        import sys as _sys
        _d = os.path.dirname(os.path.abspath(__file__))
        if _d not in _sys.path:
            _sys.path.insert(0, _d)
        import wb_growth
    except Exception as e:
        return None, "wb_growth 未加载: %s" % e
    try:
        st, _ = wb_growth.chat_completion(sess, "deepseek-v4-flash", "你好")
        return st, None
    except Exception as e:
        return None, str(e)


def main():
    log = []
    def p(*a):
        line = " ".join(str(x) for x in a)
        print(line)
        log.append(line)

    p("=" * 56)
    p("WorkBuddy 每日签到  ", datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    p("=" * 56)

    tok_path = find_token_file()
    if not tok_path:
        p("[失败] 找不到会话文件 workbuddy-desktop.info，请确认 WorkBuddy 已登录过。")
        write_state(False, "找不到登录凭证文件", None)
        return 2
    p("[信息] 会话文件:", tok_path)

    try:
        sess = load_session(tok_path)
    except Exception as e:
        p(f"[失败] 读取会话失败: {e}")
        write_state(False, f"读取凭证失败: {e}", None)
        return 2

    if not sess["access_token"] or not sess["uid"]:
        p("[失败] 会话中缺少 accessToken / uid。")
        write_state(False, "凭证缺少 accessToken / uid", None)
        return 2

    # 检查 token 是否过期
    exp = decode_jwt_exp(sess["access_token"])
    if exp:
        exp_dt = datetime.datetime.fromtimestamp(exp)
        p(f"[信息] Token 有效期至: {exp_dt.strftime('%Y-%m-%d %H:%M:%S')}")
        if exp_dt < datetime.datetime.now():
            p("[失败] accessToken 已过期。请先打开一次 WorkBuddy 让它刷新登录态，再运行本脚本。")
            write_state(False, "登录凭证已过期，请在电脑上打开一次 WorkBuddy", None)
            return 3

    base = f"https://{sess['domain']}/v2/billing/meter"

    # 记录今日余额到历史（供网页「昨日用量」计算；失败不影响签到）
    try:
        snapshot_balance(sess)
    except Exception:
        pass

    # 1) 查状态
    try:
        s, b = call(base, "/checkin-activity-status", sess, {})
    except Exception as e:
        p(f"[失败] 查询签到状态网络错误: {e}")
        write_state(False, f"网络错误: {e}", None)
        return 4
    if s != 200:
        p(f"[失败] 查询签到状态返回 HTTP {s}: {b[:300]}")
        write_state(False, f"查询状态返回 HTTP {s}", None)
        return 4
    status = json.loads(b)
    data = (status.get("data") or {})
    p(f"[活动] {data.get('activity_name')} · {data.get('theme_name')} (第{data.get('season')}期)  截止 {data.get('end_time')}")
    p(f"[积分] 累计 {data.get('total_credits')} / 今日 {data.get('today_credit')} / 连签 {data.get('streak_days')} 天")
    p(f"[状态] 今日是否已签: {data.get('today_checked_in')}")

    if data.get("today_checked_in"):
        p("[结果] 今天已经签到过了，无需重复操作。✅")
        write_state(True, "今天已经签到过了", data)
        return 0

    # 1.5) 签到前置：官方要求「当天有一次对话记录」才记录签到，先补一条极简对话
    #      （与 112 web_server.py 的 _pre_checkin_chat 行为保持一致）
    p("[动作] 签到前置：补发一条对话（满足官方「当天有对话」要求）...")
    _cst, _cerr = _pre_checkin_chat(sess)
    if _cst:
        p(f"[前置] 对话完成 HTTP {_cst}")
    else:
        p(f"[前置] 对话未完成（不阻断签到）: {_cerr}")

    # 2) 签到
    p("[动作] 执行签到 daily-checkin ...")
    try:
        s2, b2 = call(base, "/daily-checkin", sess, {})
    except Exception as e:
        p(f"[失败] 签到网络错误: {e}")
        write_state(False, f"签到网络错误: {e}", data)
        return 4
    p(f"[返回] HTTP {s2}: {b2[:400]}")
    try:
        resp = json.loads(b2)
    except Exception:
        resp = {}
    code = resp.get("code")
    if code == 0:
        p("[结果] 签到成功！✅")
        # 重新查一次状态，拿到最新累计 / 连签数
        try:
            s3, b3 = call(base, "/checkin-activity-status", sess, {})
            nd = (json.loads(b3).get("data") or {}) if s3 == 200 else data
        except Exception:
            nd = data
        p(f"[积分] 累计 {nd.get('total_credits')} / 今日 {nd.get('today_credit')} / 连签 {nd.get('streak_days')} 天")
        write_state(True, "签到成功", nd)
        return 0
    elif code == 10001:
        p("[结果] 服务器提示今天已签到（幂等）。✅")
        write_state(True, "今天已经签到过了", data)
        return 0
    else:
        p(f"[失败] 签到被拒绝 code={code} msg={resp.get('msg')}")
        write_state(False, f"签到被拒绝: {resp.get('msg')}", data)
        return 5

if __name__ == "__main__":
    sys.exit(main())
