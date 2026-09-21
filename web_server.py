#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorkBuddy 每日签到 · 手机网页版（纯标准库，零第三方依赖）

原理：
  签到必须用电脑上 WorkBuddy 的登录凭证，所以本程序要跑在这台电脑上。
  它读取本地明文会话文件里的 accessToken，代替手机去调官方签到接口；
  手机连同一 WiFi，浏览器打开 http://<电脑局域网IP>:8765 即可查看并一键签到。

复用 workbuddy_checkin.py 里已验证的 find_token_file / load_session / call。
"""

import os
import sys
import json
import ssl
import socket
import hashlib
import time
import datetime
import uuid
import urllib.request
import urllib.error
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs, urlencode

# 计划任务/后台运行时，stdout 可能是 GBK，强制 UTF-8 避免中文崩溃
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from workbuddy_checkin import find_token_file, load_session, call

try:
    import wb_growth
except Exception:
    wb_growth = None

try:
    import wb_travel
except Exception:
    wb_travel = None

try:
    from wb_icon import (
        CENTER_SVG,
        WB_SVG,
        QF_SVG,
        MM_SVG,
        TRAE_SVG,
        LX_SVG,
        LK_SVG,
        HW_SVG,
        QD_SVG,
    )
except Exception:
    CENTER_SVG = ""
    WB_SVG = ""
    QF_SVG = ""
    MM_SVG = ""
    TRAE_SVG = ""
    LX_SVG = ""
    LK_SVG = ""
    HW_SVG = ""
    QD_SVG = ""

# WorkBuddy 成长中心图标（紫色渐变火箭，对应成长中心品牌色 #7C5CFF）
GROWTH_SVG = r"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="grGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C5CFF"/><stop offset="1" stop-color="#9D7BFF"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#grGrad)"/><path d="M32 10c6 5 7 14 4 23l-4 7h0l-4-7c-3-9-2-18 4-23z" fill="#fff"/><circle cx="32" cy="24" r="4.5" fill="#7C5CFF"/><path d="M24 33l-6 9 7-4z" fill="#fff"/><path d="M40 33l6 9-7-4z" fill="#fff"/><path d="M29 40l3 12 3-12z" fill="#FFE255"/><circle cx="47" cy="18" r="2.6" fill="#fff"/><circle cx="17" cy="21" r="1.8" fill="#fff"/><circle cx="44" cy="40" r="1.6" fill="#fff"/></svg>"""
# 每日任务（每天刷新的成长中心动作）：橙金日历+对勾
DAILY_SVG = r"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="dlGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F79009"/><stop offset="1" stop-color="#FDB022"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#dlGrad)"/><circle cx="24" cy="13" r="3.4" fill="#fff"/><circle cx="40" cy="13" r="3.4" fill="#fff"/><rect x="13" y="16" width="38" height="35" rx="7" fill="#fff"/><rect x="13" y="16" width="38" height="10" rx="6" fill="#FFE3B0"/><path d="M22 37l6 6 13-14" fill="none" stroke="#F79009" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>"""

PORT = int(os.environ.get("WB_PORT", "8765"))
HOST = os.environ.get("WB_HOST", "0.0.0.0")
ACCESS_KEY = os.environ.get(
    "WB_ACCESS_KEY", ""
)  # 留空 = 不校验口令；非空则手机首次访问需输入一次（生产环境由 systemd service 的 WB_ACCESS_KEY 注入）

# 最近一次签到结果（由 workbuddy_checkin.py 写入；自动定时与手动点击都会记）
STATE_FILE = os.environ.get("WB_STATE_FILE", os.path.join(BASE_DIR, "last_run.json"))

# ============================ 千帆签到适配器配置 ============================
# 千帆签到接口基址。本服务在服务端直接调用它的 API（带 token，避开浏览器跨域），不搬动千帆代码。
# 自部署时通过环境变量 QF_BASE_URL 指定你自己的千帆服务地址；留空（默认）则跳过千帆平台（卡片显示「未配置」），
# 不影响其余 7 个平台。示例：http://<你的千帆服务IP>/checkin
QIANFAN_BASE = os.environ.get("QF_BASE_URL", "").rstrip("/")
# 千帆口令优先级：环境变量 QF_ACCESS_TOKEN > 同目录 qf_token.txt（部署时由 deploy_ui.py 写入，便于不改 systemd）
QIANFAN_TOKEN = os.environ.get("QF_ACCESS_TOKEN", "")
if not QIANFAN_TOKEN:
    try:
        with open(os.path.join(BASE_DIR, "qf_token.txt"), "r", encoding="utf-8") as _f:
            QIANFAN_TOKEN = _f.read().strip()
    except Exception:
        QIANFAN_TOKEN = ""

_SSL_CTX = ssl.create_default_context()
_SSL_CTX.check_hostname = False
_SSL_CTX.verify_mode = ssl.CERT_NONE


# ============================ 运行设置（傻瓜式配置，持久化于 settings.json） ============================
SETTINGS_FILE = os.environ.get("WB_SETTINGS_FILE", os.path.join(BASE_DIR, "settings.json"))

PLATFORM_TITLES = {
    "workbuddy": "WorkBuddy",
    "qianfan": "百度千帆",
    "minimax": "MiniMax Code",
    "qoder": "Qoder",
    "linkai": "Link AI",
    "travel": "派猫猫旅行",
    "lingxi": "WPS 灵犀",
    "trae": "Trae Work",
    "huawei": "华为码道",
}


def _default_settings():
    return {
        "schedule_enabled": True,
        "schedule_time": "08:35",
        "access_key": "",          # 留空=沿用环境变量 WB_ACCESS_KEY；填写则覆盖
        "platforms": {k: True for k in PLATFORM_TITLES},
        "notify_webhook": "",
        "notify_on": False,
    }


def load_settings():
    d = _default_settings()
    try:
        with open(SETTINGS_FILE, "r", encoding="utf-8") as _f:
            saved = json.loads(_f.read() or "{}")
        for k in d:
            if k in saved:
                d[k] = saved[k]
        saved_plat = saved.get("platforms") or {}
        for k in d["platforms"]:
            if k in saved_plat:
                d["platforms"][k] = bool(saved_plat[k])
    except Exception:
        pass
    return d


def save_settings(d):
    base = _default_settings()
    out = {}
    for k in base:
        if k == "platforms":
            out[k] = {pk: bool((d.get("platforms") or {}).get(pk, True)) for pk in base[k]}
        else:
            out[k] = d.get(k, base[k])
    with open(SETTINGS_FILE, "w", encoding="utf-8") as _f:
        _f.write(json.dumps(out, ensure_ascii=False, indent=2))
    return out


SETTINGS = load_settings()
_sched_wake = threading.Event()
_sched_wake_travel = threading.Event()


def current_key():
    return SETTINGS.get("access_key") or ACCESS_KEY


def platform_enabled(name):
    return bool(SETTINGS.get("platforms", {}).get(name, True))


def reschedule():
    _sched_wake.set()


def _fmt_push(host, payload):
    """把推送内容按平台渲染成最终文本。
    payload 为字符串（测试/通用）→ 原样返回；为 dict{title,results,ts} → 结构化渲染。
    返回 (style, text)。style 仅用于自检，实际格式已在文本内体现。"""
    if isinstance(payload, str):
        return "plain", payload
    title = payload.get("title", "签到中心")
    results = payload.get("results", [])
    ts = payload.get("ts", "")
    sym = {"ok": "✅", "warn": "⚠️", "fail": "❌", "skip": "⏭️"}
    n_ok = sum(1 for r in results if r.get("s") == "ok")
    n_warn = sum(1 for r in results if r.get("s") == "warn")
    n_fail = sum(1 for r in results if r.get("s") == "fail")
    total = len(results)

    def footer():
        bits = []
        if n_warn:
            bits.append("未签 %d" % n_warn)
        if n_fail:
            bits.append("失败 %d" % n_fail)
        return " · ".join(bits)

    # 企业微信 / 钉钉：纯文本
    if "qyapi.weixin.qq.com" in host or "oapi.dingtalk.com" in host:
        lines = [title]
        for r in results:
            lines.append("%s %s%s" % (r["label"], sym.get(r["s"], ""),
                                      (" " + r["note"]) if r.get("note") else ""))
        f = footer()
        if f:
            lines.append("")
            lines.append(f)
        if ts:
            lines += ["", ts]
        return "plain", "\n".join(lines)
    # PushPlus：HTML（默认 html 模板）
    if "pushplus.plus" in host or "pushplus.one" in host:
        parts = ["<b>%s</b>" % title]
        for r in results:
            parts.append("%s <b>%s</b>%s" % (sym.get(r["s"], ""), r["label"],
                                             (" " + r["note"]) if r.get("note") else ""))
        f = footer()
        if f:
            parts.append("<br><b>%s</b>" % f)
        if ts:
            parts.append("<br><br><span style='color:#999'>%s</span>" % ts)
        return "html", "<br>".join(parts)
    # Server 酱：Markdown（微信内加粗/换行更清晰）
    if "ftqq.com" in host:
        lines = ["**%s**" % title, ""]
        for r in results:
            lines.append("%s **%s**%s" % (sym.get(r["s"], ""), r["label"],
                                          (" " + r["note"]) if r.get("note") else ""))
        f = footer()
        if f:
            lines += ["", f]
        if ts:
            lines += ["", ts]
        return "markdown", "\n".join(lines)
    # 通用：纯文本
    lines = [title]
    for r in results:
        lines.append("%s %s%s" % (r["label"], sym.get(r["s"], ""),
                                  (" " + r["note"]) if r.get("note") else ""))
    return "plain", "\n".join(lines)


def _send_webhook(url, payload):
    """向 webhook 推送，按平台自动适配请求格式。
    支持：企业微信群机器人 / 钉钉机器人 / PushPlus(推个人微信) / Server酱(推个人微信) / 通用 JSON。
    payload 可为字符串或结构化 dict。失败抛出异常。"""
    host = (urlparse(url).hostname or "").lower()
    style, text = _fmt_push(host, payload)
    headers = {"Content-Type": "application/json"}
    data = None
    # 企业微信群机器人 / 钉钉机器人：标准 text 类型
    if "qyapi.weixin.qq.com" in host or "oapi.dingtalk.com" in host:
        data = json.dumps({"msgtype": "text", "text": {"content": text}}).encode("utf-8")
    # PushPlus（默认渠道 wechat，推送到个人微信，免费）
    elif "pushplus.plus" in host or "pushplus.one" in host:
        parts = urlparse(url)
        token = ""
        seg = [p for p in parts.path.split("/") if p]
        if len(seg) >= 2 and seg[0] in ("send", "batchSend"):
            token = seg[1]
        if not token:
            token = parse_qs(parts.query).get("token", [""])[0]
        body = {"token": token, "title": "签到中心",
                "content": text, "template": "html"}
        data = json.dumps(body).encode("utf-8")
    # Server 酱（推送到个人微信，免费 5 条/天）：表单 title + desp
    elif "ftqq.com" in host:
        title = payload.get("title", "签到中心") if isinstance(payload, dict) else "签到中心"
        data = urlencode({"title": title, "desp": text}).encode("utf-8")
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
    # 通用：原样 JSON（兼容自搭端点）
    else:
        data = json.dumps({"text": text,
                           "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    urllib.request.urlopen(req, timeout=8, context=_SSL_CTX)
    return True, ""


def notify_summary(results):
    """每日签到完成后推送摘要。results: list of {label, s(ok/warn/fail), note}。"""
    url = SETTINGS.get("notify_webhook", "")
    if not url or not SETTINGS.get("notify_on"):
        return
    try:
        n_ok = sum(1 for r in results if r.get("s") == "ok")
        total = len(results)
        title = "每日签到完成 · 已签 %d/%d" % (n_ok, total)
        payload = {"title": title, "results": results,
                   "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        _send_webhook(url, payload)
    except Exception as e:
        print("[notify] 推送失败: %s" % e)


def _scheduler_loop():
    """内置定时调度器：按 settings.schedule_time 每日自动跑 run_daily_all。
    被 reschedule() 唤醒时可热更新时间，无需重启进程。"""
    while True:
        try:
            if SETTINGS.get("schedule_enabled") and SETTINGS.get("schedule_time"):
                try:
                    hh, mm = (SETTINGS["schedule_time"].split(":"))[:2]
                    now = datetime.datetime.now()
                    target = now.replace(hour=int(hh), minute=int(mm), second=0, microsecond=0)
                    if target <= now:
                        target = target + datetime.timedelta(days=1)
                    wait = (target - now).total_seconds()
                except Exception:
                    time.sleep(60)
                    continue
                print("[scheduler] 下次自动签到: %s（约 %.0f 秒后）" % (
                    target.strftime("%Y-%m-%d %H:%M"), wait))
                if _sched_wake.wait(wait):
                    _sched_wake.clear()
                    continue
                print("[scheduler] 触发定时签到")
                try:
                    run_daily_all()
                except Exception as e:
                    print("[scheduler] 定时签到异常: %s" % e)
                continue
            else:
                _sched_wake.wait(60)
                _sched_wake.clear()
        except Exception as e:
            print("[scheduler] 异常: %s" % e)
            time.sleep(60)


def _http_json(url, method="GET", timeout=20, headers=None, retries=0):
    """服务端发起 JSON 请求（用于调用千帆等外部签到 API）。

    retries>0 时对「网络异常 / 5xx」做退避重试——外部签到上游偶发抖动很常见。
    若对方返回 5xx 但 body 是合法 JSON（自建服务通常会把错误原因放在 body 里），
    直接返回该 body 并附加 _http_status，交给上层按业务判断，避免把一个
    「上游业务错误」误报成网关故障（例如千帆的 502 其实是登录态校验失败）。
    """
    last = None
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(
                url, method=method, headers=headers or {"User-Agent": "WBCheckinCenter/1.0"}
            )
            with urllib.request.urlopen(req, timeout=timeout, context=_SSL_CTX) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except urllib.error.HTTPError as e:
            body = None
            try:
                body = json.loads(e.read().decode("utf-8", "replace"))
            except Exception:
                body = None
            # body 里带 ok 字段 = 对方主动给出的业务错误说明，原样返回
            if isinstance(body, dict) and "ok" in body:
                body.setdefault("_http_status", e.code)
                return body
            last = e
            if attempt < retries and e.code in (500, 502, 503, 504):
                time.sleep(1.2 * (attempt + 1))
                continue
            raise
        except Exception as e:
            last = e
            if attempt < retries:
                time.sleep(1.2 * (attempt + 1))
                continue
            raise
    if last:
        raise last


# ============================ 业务逻辑 ============================
def _session():
    tok = find_token_file()
    if not tok:
        raise RuntimeError("找不到 WorkBuddy 会话文件，请确认 WorkBuddy 已登录过。")
    sess = load_session(tok)
    if not sess.get("access_token") or not sess.get("uid"):
        raise RuntimeError("会话中缺少 accessToken / uid。")
    return sess


def _base(sess):
    return "https://%s/v2/billing/meter" % sess["domain"]


def read_last_run():
    """读取最近一次签到结果（自动定时 / 手动点击都记在这里）。

    兼容历史文件两种形态：旧版单条 dict，新版数组（按时间正序追加，最新在末尾）。
    """
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data[-1] if data else None
        return data
    except Exception:
        return None


def _append_rec(path, rec, limit=30):
    """把一条签到记录追加到历史文件（保留最近 limit 条，最新在末尾）。

    兼容旧版单条 dict 文件：读入后自动转成数组再追加。
    """
    try:
        data = None
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            data = None
        if isinstance(data, list):
            data.append(rec)
        elif isinstance(data, dict):
            data = [data, rec]
        else:
            data = [rec]
        data = data[-limit:]
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
    except Exception:
        pass


def _record_state(ok, message, st, source="web"):
    """把本页手动签到的结果也记进状态文件，保持页面记录统一（追加式历史）。"""
    try:
        s = st or {}
        rec = {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
            "activity": s.get("activity"),
            "total": s.get("total"),
            "today": s.get("today"),
            "streak": s.get("streak"),
            "checked": bool(s.get("checked")),
            "source": source,
        }
        _append_rec(STATE_FILE, rec, 30)
    except Exception:
        pass


def get_remaining():
    """查询账户资源余额（资源包 CapacityRemainPrecise 之和）。独立接口，失败不影响主流程。"""
    sess = _session()
    base = _base(sess)
    body = {
        "PageNumber": 1,
        "PageSize": 100,
        "ProductCode": "p_tcaca",
        "Status": [0, 3],
        "PackageStartTimeRangeBegin": "2024-12-01 21:25:00",
        "PackageStartTimeRangeEnd": "2026-12-31 23:59:59",
    }
    s, b = call(base, "/get-user-resource", sess, body)
    if s != 200:
        raise RuntimeError("查询余额返回 HTTP %s" % s)
    d = json.loads(b)
    resp = (d.get("data") or {}).get("Response") or {}
    accounts = (resp.get("Data") or {}).get("Accounts") or []
    total = 0.0
    pkgs = []
    for a in accounts:
        rem = float(a.get("CapacityRemainPrecise") or 0)
        total += rem
        pkgs.append(
            {
                "name": a.get("PackageName"),
                "remain": round(rem, 2),
                "used": round(float(a.get("CapacityUsedPrecise") or 0), 2),
                "capacity": round(float(a.get("CapacitySizePrecise") or 0), 2),
            }
        )
    return {"remaining": round(total, 2), "packages": pkgs}


# 消耗明细接口（官方"积分消耗明细"）的 base：与 get-user-resource 同域名，但路径不带 /v2
def _base_usage(sess):
    return "https://%s/billing/meter" % sess["domain"]


# 按天缓存，避免每次刷新页面都打一次接口（服务器长驻，跨天自动失效）
_USAGE_CACHE = {}


def _fetch_usage_day(sess, day):
    """拉取某一天的全部消耗明细，返回当日消耗积分总和（自动翻页）。"""
    base = _base_usage(sess)
    total_credit = 0.0
    page = 1
    page_size = 200
    while True:
        body = {
            "startTime": "%s 00:00:00" % day,
            "endTime": "%s 23:59:59" % day,
            "pageNum": page,
            "pageSize": page_size,
        }
        s, b = call(base, "/get-user-request-usage", sess, body)
        if s != 200:
            raise RuntimeError("查询消耗明细返回 HTTP %s" % s)
        d = json.loads(b)
        recs = (d.get("data") or {}).get("data") or []
        if not recs:
            break
        for r in recs:
            try:
                total_credit += float(r.get("credit") or 0)
            except Exception:
                pass
        total = int((d.get("data") or {}).get("total") or 0)
        if page * page_size >= total or len(recs) < page_size:
            break
        page += 1
    return round(total_credit, 2)


def get_yesterday_usage():
    """昨日用量 = 昨日全部消耗明细的 credit 求和（来自官方"积分消耗明细"，真实准确）。"""
    sess = _session()
    yest = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
    if yest in _USAGE_CACHE:
        return _USAGE_CACHE[yest]
    val = _fetch_usage_day(sess, yest)
    _USAGE_CACHE[yest] = val
    return val


def get_status():
    sess = _session()
    s, b = call(_base(sess), "/checkin-activity-status", sess, {})
    if s != 200:
        raise RuntimeError("查询签到状态返回 HTTP %s" % s)
    d = json.loads(b).get("data") or {}
    st = {
        "activity": d.get("activity_name"),
        "theme": d.get("theme_name"),
        "season": d.get("season"),
        "end_time": d.get("end_time"),
        "total": d.get("total_credits"),
        "today": d.get("today_credit"),
        "daily": d.get("daily_credit"),
        "streak": d.get("streak_days"),
        "checked": bool(d.get("today_checked_in")),
        "remaining": None,
        "usage": None,
        "packages": [],
    }
    # 余额与昨日用量（独立接口，失败不影响签到主流程）
    try:
        res = get_remaining()
        st["remaining"] = res["remaining"]
        st["packages"] = res["packages"]
    except Exception:
        pass
    # 昨日用量：来自官方"积分消耗明细"真实消耗，单独 try 防止拖垮整体
    try:
        st["usage"] = get_yesterday_usage()
    except Exception:
        pass
    return st


def do_checkin():
    sess = _session()
    st = get_status()
    if st["checked"]:
        _record_state(True, "今天已经签到过了", st, "web")
        return {
            "already": True,
            "message": "今天已经签到过了，无需重复操作",
            "status": st,
        }

    s, b = call(_base(sess), "/daily-checkin", sess, {})
    try:
        resp = json.loads(b)
    except Exception:
        resp = {}
    code = resp.get("code")
    if code in (0, 10001):
        already = code == 10001
        if already:
            msg = "今天已经签到过了，无需重复操作"
        else:
            gain = (resp.get("data") or {}).get("today_credit", st.get("daily"))
            msg = ("签到成功！今日 +%s 积分" % gain) if gain else "签到成功！"
        new_st = get_status()
        _record_state(True, msg, new_st, "web")
        return {"already": already, "message": msg, "status": new_st}
    _record_state(False, "签到被拒绝", st, "web")
    raise RuntimeError("签到被拒绝：code=%s msg=%s" % (code, resp.get("msg")))


# ============================ MiniMax Code 签到适配器 ============================
# 官方接口（从 agent.minimax.cn 网页端前端 bundle 逆向 + 实测确认）：
#   签到面板  GET  https://agent.minimax.cn/minimax-cloud/api/v1/signin/status
#   领取奖励  POST https://agent.minimax.cn/minimax-cloud/api/v1/signin/claim  body {}
#   鉴权（网页端 Web 会话，非桌面端 OAuth 链）：
#     - URL 查询参数携带 token=<网页 JWT> + 设备标识参数（client=web&region=cn 等）
#     - Header: x-timestamp=<秒级时间戳>、x-signature=<MD5 签名>
#     - x-signature = MD5(f"{秒级时间戳}I*7Cf%WZ#S&%1RlZJ&C2{body字符串}")
#   token 来源：agent.minimax.cn 网页端登录后 localStorage._token（有效期约 40 天，
#   快到期时在浏览器重新登录一次即可，无需 refresh 链）。
# 返回结构: {base_resp:{status_code,status_msg}, data:{days:[{day_no,points,is_today,status}]}}
#   status: 1=Upcoming 2=Claimable 3=Claimed；claim 返回 claim_result: 1=新领取 2=已签到
# 凭据优先级：环境变量 MM_WEB_TOKEN > 同目录 mm_web_token.json
MM_WEB_TOKEN = os.environ.get("MM_WEB_TOKEN", "")
if not MM_WEB_TOKEN:
    try:
        with open(
            os.path.join(BASE_DIR, "mm_web_token.json"), "r", encoding="utf-8"
        ) as _f:
            _mt = json.load(_f)
        MM_WEB_TOKEN = MM_WEB_TOKEN or _mt.get("access_token", "")
    except Exception:
        pass
MM_STATE_FILE = os.path.join(BASE_DIR, "mm_last_run.json")


def _mm_sign_headers(now_s, body_str):
    """计算 MiniMax 网页端请求签名所需的 Header。"""
    sig = hashlib.md5(
        ("%dI*7Cf%%WZ#S&%%1RlZJ&C2%s" % (now_s, body_str)).encode("utf-8")
    ).hexdigest()
    return {"x-timestamp": str(now_s), "x-signature": sig}


def _mm_api(path, method="GET", body=None):
    """访问 MiniMax 签到 API（网页端 Web 会话鉴权）。返回解析后的 JSON dict。"""
    if not MM_WEB_TOKEN:
        raise RuntimeError(
            "未配置 MiniMax Code 网页登录凭据（mm_web_token.json 或 MM_WEB_TOKEN）"
        )
    now_ms = int(time.time() * 1000)
    now_s = now_ms // 1000
    params = {
        "device_platform": "web",
        "biz_id": "3",
        "app_id": "3001",
        "version_code": "22201",
        "unix": str(now_ms),
        "timezone_offset": "28800",
        "sys_language": "zh",
        "lang": "zh",
        "uuid": "9f344780-29b5-4a7b-985c-9db6957960d0",
        "device_id": "81828527",
        "os_name": "Windows",
        "browser_name": "Chrome",
        "device_memory": "32",
        "cpu_core_num": "20",
        "browser_language": "zh-CN",
        "browser_platform": "Win32",
        "user_id": "555802743632904195",
        "screen_width": "1707",
        "screen_height": "1067",
        "token": MM_WEB_TOKEN,
        "client": "web",
        "region": "cn",
    }
    body_str = ""
    data = None
    if body is not None:
        body_str = json.dumps(body)
        data = body_str.encode("utf-8")
    url = "https://agent.minimax.cn/minimax-cloud/api/v1%s?%s" % (
        path,
        urlencode(params),
    )
    headers = {"Content-Type": "application/json"}
    headers.update(_mm_sign_headers(now_s, body_str))
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    with urllib.request.urlopen(req, timeout=20, context=_SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def _mm_record(ok, message):
    _append_rec(
        MM_STATE_FILE,
        {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
        },
        30,
    )


def _mm_read_last():
    try:
        with open(MM_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data[-1] if data else None
        return data
    except Exception:
        return None


def _mm_panel():
    """拉取签到面板，解析成结构化数据。"""
    d = _mm_api("/signin/status")
    br = d.get("base_resp") or {}
    if br.get("status_code") != 0:
        raise RuntimeError("MiniMax: %s" % (br.get("status_msg") or "status 获取失败"))
    days = (d.get("data") or {}).get("days") or []
    today = next((x for x in days if x.get("is_today")), None)
    claimed_today = bool(today and today.get("status") == 3)
    claimable_today = bool(today and today.get("status") == 2)
    claimed_count = sum(1 for x in days if x.get("status") == 3)
    return {
        "days": days,
        "today": today,
        "claimed_today": claimed_today,
        "claimable_today": claimable_today,
        "claimed_count": claimed_count,
        "cycle_points": sum(x.get("points", 0) for x in days),
    }


def get_mm_card():
    try:
        p = _mm_panel()
        lr = _mm_read_last()
        today = p["today"] or {}
        rows = [
            {"k": "本轮已签", "v": "%s / 7 天" % p["claimed_count"]},
            {"k": "今日奖励", "v": "+%s 积分" % (today.get("points") or "—")},
            {"k": "本轮总奖励", "v": "%s 积分" % p["cycle_points"]},
        ]
        if lr:
            rows.append(
                {
                    "k": "上次签到",
                    "v": "%s %s"
                    % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️"),
                }
            )
        return {
            "name": "minimax",
            "title": "MiniMax Code 每日签到",
            "brand": "#7C3AED",
            "brand2": "#A855F7",
            "icon": "mm",
            "checked": p["claimed_today"],
            "metric_label": "本轮已签",
            "metric_value": "%s / 7 天" % p["claimed_count"],
            "last_run": lr,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return _auth_fail_card(
            "minimax", "MiniMax Code 每日签到", "#7C3AED", "#A855F7", "mm", e,
            [("如何恢复",
              "MiniMax 网页登录态已失效：重新登录 code.minimax.io 后在浏览器开发者工具复制 access_token，"
              "更新服务器上的 mm_web_token.json；或运行本机取 token 脚本推送到服务器，再点「重新检查」")],
        )


def run_mm_checkin():
    """执行 MiniMax Code 签到，返回最新卡片。已签/重复领均幂等。"""
    p = _mm_panel()
    if p["claimed_today"]:
        _mm_record(True, "今天已经签到过了")
        return get_mm_card()
    d = _mm_api("/signin/claim", method="POST", body={})
    br = d.get("base_resp") or {}
    if br.get("status_code") != 0:
        raise RuntimeError(
            "MiniMax 领取失败：%s" % (br.get("status_msg") or "未知错误")
        )
    data = d.get("data") or {}
    result = data.get("claim_result")
    if result == 1:
        _mm_record(True, "签到成功！今日 +%s 积分" % data.get("points"))
    elif result == 2:
        _mm_record(True, "今天已经签到过了")
    else:
        raise RuntimeError("MiniMax 领取失败：claim_result=%s" % result)
    return get_mm_card()


# ============================ Trae Work 签到适配器 ============================
# 客户端实机逆向（2026-09-21 经客户端抓包确认）：
#   签到入口在桌面客户端「账户」菜单，文案「每日领 150 积分 / 会员多领 50 积分」，
#   证明该账户签到功能正常开通 —— 服务端此前把 9004 误读成「账户未开通」是错的。
#   真实签到流程（客户端发起）：
#     换发 Token  POST https://api.trae.cn/cloudide/api/v3/common/GetUserToken  （凭 cookie 会话换 8h JWT，无 body）
#     签到面板  POST https://api.trae.cn/trae/api/v2/ug/checkin_credits/status
#     领取奖励  POST https://api.trae.cn/trae/api/v2/ug/checkin_credits/claim
#     鉴权      Authorization: Cloud-IDE-JWT <jwt>
#     请求体    {"req_source": 2}  ← 客户端通道固定为 2（SOLO_CN 安装包）；之前服务端误用 3（网页通道）
#     额外头    x-device-id / x-device-model / x-device-system / x-client-version（之前服务端完全缺失）
#   实测事实   claim 仅 code=0 为成功；9004="submitted order parameters are incorrect"
#             —— 即「请求被后端拒绝（参数/通道不符）」，不是「今日已签」也不是「账户未开通」。
#             req_source 改 2 + 补齐客户端设备头后，9004 应消失（仍非 0 则需进一步抓包对齐签名）。
# 凭据优先级：环境变量 TRAE_COOKIE > 同目录 trae_cookie.txt（HttpOnly+cookie 串，约 14 天）
#            -> 每日先 GetUserToken 换新 JWT；无 cookie 时降级用 TRAE_JWT / trae_jwt.txt（8h 短期）
TRAE_COOKIE = os.environ.get("TRAE_COOKIE", "")
if not TRAE_COOKIE:
    try:
        with open(
            os.path.join(BASE_DIR, "trae_cookie.txt"), "r", encoding="utf-8"
        ) as _f:
            TRAE_COOKIE = _f.read().strip()
    except Exception:
        TRAE_COOKIE = ""
TRAE_JWT = os.environ.get("TRAE_JWT", "")
if not TRAE_JWT:
    try:
        with open(os.path.join(BASE_DIR, "trae_jwt.txt"), "r", encoding="utf-8") as _f:
            TRAE_JWT = _f.read().strip()
    except Exception:
        TRAE_JWT = ""
TRAE_STATE_FILE = os.path.join(BASE_DIR, "trae_last_run.json")
TRAE_API = "https://api.trae.cn/trae/api/v2/ug/checkin_credits"
TRAE_UG_BASE = "https://api.trae.cn/trae/api/v2/ug"
TRAE_TOKEN_API = "https://api.trae.cn/cloudide/api/v3/common/GetUserToken"
# 客户端通道标识：SOLO_CN 安装包固定为 2（之前误用网页通道 3，导致 claim 被后端 9004 拒绝）
TRAE_REQ_SOURCE = int(os.environ.get("TRAE_REQ_SOURCE", "2"))
# 伪客户端设备头：服务端无真实设备，用固定代表值；如 Trae 校验特定值可在环境变量覆盖
TRAE_DEVICE_ID = os.environ.get("TRAE_DEVICE_ID") or ("wb-%s" % uuid.uuid4().hex[:16])
TRAE_DEVICE_MODEL = os.environ.get("TRAE_DEVICE_MODEL", "Windows")
TRAE_DEVICE_SYSTEM = os.environ.get("TRAE_DEVICE_SYSTEM", "Windows 10 x64")
TRAE_CLIENT_VERSION = os.environ.get("TRAE_CLIENT_VERSION", "2.0.0")


def _trae_get_token():
    """优先用 cookie 换发新 JWT（约 8h 有效）；无 cookie 时返回配置的静态 JWT。"""
    if TRAE_COOKIE:
        req = urllib.request.Request(
            TRAE_TOKEN_API,
            data=b"",
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Cookie": TRAE_COOKIE,
                "Origin": "https://work.trae.cn",
                "Referer": "https://work.trae.cn/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        )
        with urllib.request.urlopen(req, timeout=20, context=_SSL_CTX) as r:
            j = json.loads(r.read().decode("utf-8", "replace"))
        tok = (j.get("Result") or {}).get("Token") or ""
        if tok:
            return tok
    if TRAE_JWT:
        return TRAE_JWT
    return ""


def _trae_post(url, body):
    """统一的 Trae POST 调用（带 JWT + 浏览器同款头 + 客户端设备头）。"""
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        method="POST",
        headers={
            "Authorization": "Cloud-IDE-JWT %s" % _trae_get_token(),
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Origin": "https://work.trae.cn",
            "Referer": "https://work.trae.cn/",
            # 客户端实机必带的设备上下文（服务端侧之前缺失，导致 claim 被 9004 拒绝）
            "x-device-id": TRAE_DEVICE_ID,
            "x-device-model": TRAE_DEVICE_MODEL,
            "x-device-system": TRAE_DEVICE_SYSTEM,
            "x-client-version": TRAE_CLIENT_VERSION,
        },
    )
    with urllib.request.urlopen(req, timeout=20, context=_SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def _trae_api(action, req_source=None):
    return _trae_post(
        "%s/%s" % (TRAE_API, action),
        {"req_source": req_source if req_source is not None else TRAE_REQ_SOURCE},
    )


def _trae_record(ok, message):
    _append_rec(
        TRAE_STATE_FILE,
        {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
        },
        30,
    )


def _trae_read_last():
    try:
        with open(TRAE_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data[-1] if data else None
        return data
    except Exception:
        return None


def get_trae_card():
    if not (TRAE_COOKIE or TRAE_JWT):
        return {
            "name": "trae",
            "title": "Trae Work 每日签到",
            "brand": "#111827",
            "brand2": "#374151",
            "icon": "trae",
            "checked": False,
            "needs_auth": True,
            "auth_url": "https://work.trae.cn/?mode=mtc",
            "metric_label": "状态",
            "metric_value": "未配置",
            "last_run": None,
            "rows": [{"k": "说明", "v": "请在浏览器登录后重新加载本页"}],
            "error": None,
        }
    # 主动探测 cookie 是否仍有效；有 cookie 却换不出 token = 已过期
    try:
        if TRAE_COOKIE and not _trae_get_token():
            lr = _trae_read_last()
            return {
                "name": "trae",
                "title": "Trae Work 每日签到",
                "brand": "#111827",
                "brand2": "#374151",
                "icon": "trae",
                "checked": False,
                "needs_auth": True,
                "auth_url": "https://work.trae.cn/?mode=mtc",
                "metric_label": "状态",
                "metric_value": "Cookie 已过期",
                "last_run": lr,
                "rows": [
                    {
                        "k": "说明",
                        "v": "登录 cookie 已失效，请重新在浏览器登录 work.trae.cn 后导出 trae_cookie.txt",
                    },
                    {
                        "k": "上次执行",
                        "v": ("%s ⚠️" % str(lr.get("ts"))[5:16]) if lr else "无记录",
                    },
                ],
                "error": None,
            }
    except Exception:
        pass
    try:
        d = _trae_api("status")
        lr = _trae_read_last()
        checked = bool(d.get("checked_in"))
        credits = d.get("credits") or 0
        extra = d.get("extra_credits") or 0
        rows = [
            {
                "k": "每日奖励",
                "v": "+%s work_credits%s"
                % (credits, ("（会员+%s）" % extra) if extra else ""),
            },
            {"k": "签到状态", "v": "✅ 今日已签" if checked else "待签到"},
        ]
        if lr:
            rows.append(
                {
                    "k": "上次执行",
                    "v": "%s %s"
                    % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️"),
                }
            )
        # 自动签到失败时明确提示真实原因，避免"账户已签但没跑成"或"cookie 过期"的误判
        if lr and not lr.get("ok"):
            last_msg = (lr.get("message") or "")[:60]
            rows.insert(
                0,
                {
                    "k": "⚠️ 自动签到",
                    "v": ("上次失败：%s" % last_msg)
                    if last_msg
                    else "上次失败（原因未记录）",
                },
            )
        return {
            "name": "trae",
            "title": "Trae Work 每日签到",
            "brand": "#111827",
            "brand2": "#374151",
            "icon": "trae",
            "checked": checked,
            "metric_label": "今日状态",
            "metric_value": "已签到" if checked else "待签到",
            "last_run": lr,
            "rows": rows,
            # 说明：在本机浏览器登录 trae 并不会把登录态同步给服务器（Cookie 在服务器侧），
            # 这个链接只用来核对账号状态，别让人误以为「点一下就能签到」。
            "extra_link": {"text": "🔗 打开 work.trae.cn（登录态不会同步到服务器）",
                           "url": "https://work.trae.cn/?mode=mtc"},
            "error": None,
        }
    except Exception as e:
        return _auth_fail_card(
            "trae", "Trae Work 每日签到", "#111827", "#374151", "trae", e,
            [("如何恢复",
              "Trae 登录 Cookie 已失效：重新登录 work.trae.cn 后用 trae_capture.js 导出 "
              "trae_cookie.txt 推到服务器，再点「重新检查」")],
        )


def run_trae_checkin():
    """执行 Trae Work 每日签到（客户端通道 req_source=2 + 设备头）。

    注意：claim 仅 code=0 算签到成功；非 0 code 一律如实记为失败，不能误报已签。
    9004 = "submitted order parameters are incorrect"：表示请求被后端拒绝（参数/通道不符），
    不是「今日已签」也不是「账户未开通」——客户端实机已证明该账户签到功能正常。
    此前服务端用 req_source=3（网页通道）且缺设备头，正是 9004 的诱因；现改 2 + 补设备头。
    """
    if not (TRAE_COOKIE or TRAE_JWT):
        raise RuntimeError(
            "未配置 Trae 凭据（trae_cookie.txt / TRAE_JWT 或 trae_jwt.txt）"
        )
    # 前置校验：cookie 失效时尽早给出明确告警，避免静默误判
    tok = _trae_get_token()
    if not tok:
        _trae_record(
            False,
            "登录 cookie 已过期，请重新在浏览器登录 work.trae.cn 后导出 trae_cookie.txt",
        )
        raise RuntimeError(
            "Trae 登录 cookie 已过期，请重新导出 trae_cookie.txt（详见签到中心 Trae 卡片说明）"
        )
    results = []
    claimed = False
    try:
        d = _trae_api("claim")
        if isinstance(d, dict):
            br = d.get("code")
            if br == 0:
                claimed = True
                results.append("签到成功（checkin_credits/claim）")
            else:
                msg = d.get("message") or br
                # 9004 = 请求被后端拒绝（参数/通道不符）。若改 2+设备头后仍出现，
                # 说明还需对齐客户端其它校验（如请求签名），需进一步抓包。
                results.append(
                    "claim 接口拒绝:code=%s %s（请求被后端拒绝，非账户未开通）"
                    % (br, msg)
                )
        else:
            results.append("未知响应")
    except Exception as e:
        results.append("claim 调用异常:%s" % e)
    # 防误报：仅有接口明确返回 code=0 才算签到成功；否则一律记为失败
    ok = claimed
    _trae_record(ok, "；".join(results))
    return get_trae_card()


# ============================ WPS 灵犀签到适配器 ============================
# 官方接口（lingxi.wps.cn）：
#   任务面板  GET https://lingxi.wps.cn/api/public/v1/tasks?date=YYYY-MM-DD
#            返回 data.tasks[]（含 daily_check_in 每日任务：reward_amount=100, status=claimed/incomplete/locked）
#   每日签到  POST https://lingxi.wps.cn/api/public/v1/tasks/daily_check_in/claim?date=YYYY-MM-DD  body {}
#            返回 data（task_key/trade_no/total_claimed_credits），已签幂等（重复返回 200）
#   鉴权      需登录 Cookie（*.wps.cn，核心会话为 HttpOnly）；每日任务 +100 智点
# 凭据优先级：环境变量 LX_COOKIE > 同目录 lx_cookie.txt
LX_COOKIE = os.environ.get("LX_COOKIE", "")
if not LX_COOKIE:
    try:
        with open(os.path.join(BASE_DIR, "lx_cookie.txt"), "r", encoding="utf-8") as _f:
            LX_COOKIE = _f.read().strip()
    except Exception:
        LX_COOKIE = ""
LX_STATE_FILE = os.path.join(BASE_DIR, "lx_last_run.json")
LX_TASK_API = "https://lingxi.wps.cn/api/public/v1/tasks"


def _lx_api(path, method="GET", body=None):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://lingxi.wps.cn/",
    }
    if LX_COOKIE:
        headers["Cookie"] = LX_COOKIE
    if body is not None:
        headers["Content-Type"] = "application/json"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        "%s%s" % (LX_TASK_API, path), data=data, method=method, headers=headers
    )
    with urllib.request.urlopen(req, timeout=20, context=_SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def _lx_record(ok, message):
    _append_rec(
        LX_STATE_FILE,
        {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
        },
        30,
    )


def _lx_read_last():
    try:
        with open(LX_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data[-1] if data else None
        return data
    except Exception:
        return None


def get_lx_card():
    if not LX_COOKIE:
        return {
            "name": "lingxi",
            "title": "WPS 灵犀每日签到",
            "brand": "#10B981",
            "brand2": "#059669",
            "icon": "lx",
            "checked": False,
            "needs_auth": True,
            "hide_auth_link": True,
            "auth_url": "https://lingxi.wps.cn/",
            "metric_label": "状态",
            "metric_value": "未配置",
            "last_run": None,
            "rows": [{"k": "说明", "v": "服务器未读到灵犀 Cookie（lx_cookie.txt）：在浏览器登录 lingxi.wps.cn 后导出 Cookie 部署到服务器"}],
            "error": None,
        }
    try:
        today = datetime.date.today().isoformat()
        d = _lx_api("/?date=%s" % today)
        lr = _lx_read_last()
        data = d.get("data") or {}
        tasks = data.get("tasks") or []
        daily = None
        for t in tasks:
            if isinstance(t, dict) and t.get("task_key") == "daily_check_in":
                daily = t
                break
        daily = daily or {}
        claimed = daily.get("status") == "claimed"
        checked = bool(daily.get("checked") or claimed)
        reward = daily.get("reward_amount") or 100
        rows = [
            {"k": "今日智点", "v": "+%s" % reward},
            {"k": "累计智点", "v": "暂无法获取"},
            {
                "k": "签到状态",
                "v": "✅ 今日已签" if checked else ("已领取" if claimed else "待签到"),
            },
        ]
        if lr:
            rows.append(
                {
                    "k": "上次执行",
                    "v": "%s %s"
                    % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️"),
                }
            )
        return {
            "name": "lingxi",
            "title": "WPS 灵犀每日签到",
            "brand": "#10B981",
            "brand2": "#059669",
            "icon": "lx",
            "checked": checked,
            "metric_label": "今日状态",
            "metric_value": "已签到" if checked else "待签到",
            "last_run": lr,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return _auth_fail_card(
            "lingxi", "WPS 灵犀每日签到", "#10B981", "#059669", "lx", e,
            [("如何恢复",
              "WPS 灵犀登录 Cookie 已失效：在浏览器登录 lingxi.wps.cn 后用抓 Cookie 脚本导出 "
              "lx_cookie.txt 部署到服务器，或在设置页更新 LX_COOKIE，再点「重新检查」")],
        )


def run_lx_checkin():
    """执行 WPS 灵犀每日签到（幂等：已签重复领取仍返回 200）。"""
    if not LX_COOKIE:
        raise RuntimeError("未配置灵犀登录 Cookie（lx_cookie.txt 或 LX_COOKIE）")
    today = datetime.date.today().isoformat()
    d = _lx_api("/daily_check_in/claim?date=%s" % today, method="POST", body={})
    data = d.get("data") or {}
    reward = data.get("reward_amount") or 100
    total = data.get("total_claimed_credits")
    msg = "今日 +%s 智点" % reward
    if total is not None:
        msg += "（累计 %s）" % total
    _lx_record(True, msg)
    return get_lx_card()


# ============================ Link AI 签到适配器 ============================
# 官方接口（link-ai.tech）：
#   签到     GET https://link-ai.tech/api/chat/web/app/user/sign/in
#   鉴权     Authorization: Bearer {token}
#   重复签到 code:870 "签到失败"
# 凭据优先级：环境变量 LINKAI_TOKEN > 同目录 linkai_token.txt
LINKAI_TOKEN = os.environ.get("LINKAI_TOKEN", "")
if not LINKAI_TOKEN:
    try:
        with open(
            os.path.join(BASE_DIR, "linkai_token.txt"), "r", encoding="utf-8"
        ) as _f:
            LINKAI_TOKEN = _f.read().strip()
    except Exception:
        LINKAI_TOKEN = ""


# ============================ 华为码道（DevCloud）签到适配器 ============================
# 官方接口（华为 DevCloud 码道 chat）：
#   查询活动   GET  https://devcloud.cn-north-4.huaweicloud.com/chat/PromptCenterService/v1/ops/delivery?channel=WEB
#   签到领取   POST .../v1/ops/claim        body {"campaignId":1,"idempotentKey":"claim_1_<ts>","channel":"WEB"}
#   确认       POST .../v1/ops/confirm     body {"campaignId":1}
#   鉴权       Cookie: devclouddevuibjJ_SESSION_ID=... （Edge 登录态；凭据优先级：环境变量 HW_COOKIE > hw_cookie.txt）
#   每日签到活动：campaignId=1 type=USER_LOGIN，benefitAmount=1000 CREDIT
#   状态流转：ELIGIBLE(待领) -> CLAIMED/CONFIRMED/CONSUMED(已签)
HW_STATE_FILE = os.path.join(BASE_DIR, "hw_last_run.json")
HW_BASE = "https://devcloud.cn-north-4.huaweicloud.com/chat/PromptCenterService"
# 会话失效时的统一说明（很重要：签到用的是「服务器自己那份 Cookie」，
# 用户在本人浏览器里登录华为云，服务器拿不到 —— 因为 J_SESSION_ID 是 HttpOnly，
# 页面 JS 也读不到，只能靠本机守护把会话推上来）
HW_SESSION_DEAD_MSG = (
    "服务器侧华为会话已失效（HTTP 401）：签到由服务器携带自己保存的 Cookie 发起，"
    "所以在你自己浏览器登录华为云并不会让本卡恢复。"
    "恢复办法：在电脑上双击 relogin_huawei.bat，在弹出的窗口里登录一次华为云，"
    "看到「已推送」即可（约 1 分钟，本卡自动变绿）。"
)
HW_COOKIE = os.environ.get("HW_COOKIE", "")
if not HW_COOKIE:
    try:
        with open(os.path.join(BASE_DIR, "hw_cookie.txt"), "r", encoding="utf-8") as _f:
            HW_COOKIE = _f.read().strip()
    except Exception:
        HW_COOKIE = ""


def _hw_api(path, method="GET", body=None):
    # 必须带浏览器同款头，否则华为网关会把接口请求当普通页面访问、
    # 返回 SPA 的 HTML 而非 JSON（导致解析失败）。实测关键头：
    #   x-requested-with / agent-type / x-language / language / accept + GET 的 _ 缓存戳
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0",
        "agent-type": "PromptCenter",
        "x-language": "zh-cn",
        "language": "zh-cn",
        "x-requested-with": "XMLHttpRequest",
        "accept": "application/json, text/plain, */*",
        "referer": "https://devcloud.cn-north-4.huaweicloud.com/chat/home",
        "Cookie": HW_COOKIE,
    }
    # 华为 CSRF 令牌以 header 名 "cftk" 下发（从登录 Cookie devclouddevuibjtcftk 取值）
    for _part in HW_COOKIE.split(";"):
        _part = _part.strip()
        if _part.startswith("devclouddevuibjtcftk="):
            headers["cftk"] = _part.split("=", 1)[1]
            break
    if body is not None:
        headers["Content-Type"] = "application/json"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    # GET 请求附加浏览器同款 _ 缓存戳，确保服务端返回 JSON 而非 SPA HTML
    url = "%s%s" % (HW_BASE, path)
    if method == "GET":
        sep = "&" if "?" in url else "?"
        url += "%s_=%d" % (sep, int(time.time() * 1000))
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    with urllib.request.urlopen(req, timeout=25, context=_SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def _hw_record(ok, message):
    _append_rec(
        HW_STATE_FILE,
        {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
        },
        30,
    )


def _hw_read_last():
    try:
        with open(HW_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data[-1] if data else None
        return data
    except Exception:
        return None


# 华为会话 Cookie 寿命极短（静置 30~60 分钟即失效），而当日签到只需成功一次。
# 因此本地记一条「今日已签」标记：当天签到成功后，卡片直接读标记返回，
# 不再每次去 ping 华为接口（避免会话已失效 → 卡片反而报「登录态过期」）。
# 标记按自然日（本地时区）判定，跨过 0 点自动视为过期（无需定时清理）。
HW_DONE_FILE = os.path.join(BASE_DIR, "hw_today_done.json")


def _hw_mark_today_done(message=""):
    """记录「今天已签到成功」，供 get_hw_card 短路使用。"""
    try:
        with open(HW_DONE_FILE, "w", encoding="utf-8") as f:
            json.dump(
                {
                    "date": datetime.date.today().isoformat(),
                    "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "message": message or "今日签到成功",
                },
                f,
                ensure_ascii=False,
            )
    except Exception:
        pass


def _hw_today_done():
    """若今天已成功签到，返回标记 dict；否则 None（含跨 0 点自动失效）。"""
    try:
        with open(HW_DONE_FILE, "r", encoding="utf-8") as f:
            d = json.load(f)
        if isinstance(d, dict) and d.get("date") == datetime.date.today().isoformat():
            return d
    except Exception:
        pass
    return None


def _hw_clear_today_done():
    """清除今日标记（凭据被重置/需要真实查询时调用）。"""
    try:
        os.remove(HW_DONE_FILE)
    except Exception:
        pass


def _hw_done_card(mark):
    """今日已签到的短路卡片：不依赖华为会话，直接展示本地成功记录。"""
    ts = mark.get("ts") or ""
    rows = [
        {"k": "今日福利", "v": "1000 积分"},
        {"k": "签到状态", "v": "✅ 今日已签（本地记录）"},
        {"k": "签到时间", "v": ts[5:16] if len(ts) >= 16 else ts},
        {"k": "说明", "v": "今日已成功签到，为避免华为短效会话反复失效，本卡当天不再实时查询；次日 0 点自动恢复查询。"},
    ]
    return {
        "name": "huawei",
        "title": "华为码道每日签到",
        "brand": "#804FED",
        "brand2": "#6A35D6",
        "icon": "huawei",
        "checked": True,
        "badge": "今日已签",
        "hide_auth_link": True,
        "auth_url": "https://devcloud.cn-north-4.huaweicloud.com/chat/home",
        "metric_label": "今日积分",
        "metric_value": "已领 1000",
        "last_run": {"ts": ts, "ok": True, "message": mark.get("message") or "今日签到成功"},
        "rows": rows,
        "error": None,
    }


def _hw_find_daily(items):
    """从活动列表里挑出每日签到活动（campaignId=1 / USER_LOGIN）。"""
    if not isinstance(items, list):
        return None
    for x in items:
        if not isinstance(x, dict):
            continue
        if x.get("campaignId") == 1 or x.get("type") in ("USER_LOGIN", "DAILY_CLAIM"):
            return x
    return None


def get_hw_card():
    # 今日已签到成功 → 直接读本地标记，不再 ping 华为（短效会话易失效，避免误报过期）
    _done = _hw_today_done()
    if _done:
        return _hw_done_card(_done)
    return _hw_live_card()


def _hw_live_card():
    """真实查询华为签到状态（会 ping 华为接口，依赖会话 Cookie）。"""
    if not HW_COOKIE:
        return {
            "name": "huawei",
            "title": "华为码道每日签到",
            "brand": "#804FED",
            "brand2": "#6A35D6",
            "icon": "huawei",
            "checked": False,
            "needs_auth": True,
            "badge": "未配置",
            "hide_auth_link": True,
            "auth_url": "https://devcloud.cn-north-4.huaweicloud.com/chat/home",
            "metric_label": "状态",
            "metric_value": "未配置",
            "last_run": None,
            "rows": [
                {"k": "原因", "v": "服务器上还没有华为会话 Cookie（hw_cookie.txt 为空）"},
                {"k": "如何恢复", "v": "在电脑上双击 relogin_huawei.bat，弹出的窗口里登录一次华为云"},
            ],
            "error": None,
        }
    try:
        d = _hw_api("/v1/ops/delivery?channel=WEB")
        if d.get("code") != 0:
            raise RuntimeError(d.get("message") or "华为活动查询失败")
        items = (d.get("data") or {}).get("items") or []
        camp = _hw_find_daily(items)
        if not camp:
            raise RuntimeError("未找到每日签到活动")
        status = camp.get("status")
        claimable = camp.get("claimable", False)
        checked = status in ("CLAIMED", "CONFIRMED", "CONSUMED")
        amount = camp.get("benefitAmount")
        unit = camp.get("benefitUnit") or "CREDIT"
        unit_cn = "积分" if unit == "CREDIT" else unit
        lr = _hw_read_last()
        rows = [
            {"k": "今日福利", "v": "%s %s" % (amount, unit_cn)},
            {
                "k": "签到状态",
                "v": "✅ 今日已签" if checked else ("可领取" if claimable else "暂不可领"),
            },
            {"k": "活动标题", "v": camp.get("title") or "每日签到"},
        ]
        if lr:
            rows.append(
                {
                    "k": "上次执行",
                    "v": "%s %s"
                    % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️"),
                }
            )
        metric_value = ("已领 %s" % amount) if checked else ("%s %s" % (amount, unit_cn))
        return {
            "name": "huawei",
            "title": "华为码道每日签到",
            "brand": "#804FED",
            "brand2": "#6A35D6",
            "icon": "huawei",
            "checked": checked,
            "metric_label": "今日积分",
            "metric_value": metric_value,
            "last_run": lr,
            "rows": rows,
            "error": None,
        }
    except urllib.error.HTTPError as e:
        # 401/403 = 华为云登录态（会话 cookie）已过期，需要本人重新登录，非配置错误
        if e.code in (401, 403):
            return {
                "name": "huawei",
                "title": "华为码道每日签到",
                "brand": "#804FED",
                "brand2": "#6A35D6",
                "icon": "huawei",
                "checked": False,
                "needs_auth": True,
                "badge": "登录态过期",
                "hide_auth_link": True,
                "auth_url": "https://devcloud.cn-north-4.huaweicloud.com/chat/home",
                "metric_label": "登录态",
                "metric_value": "已过期",
                "last_run": _hw_read_last(),
                "rows": [
                    {"k": "原因", "v": "服务器侧华为会话（Cookie）已失效，非配置错误"},
                    {"k": "如何恢复", "v": "在电脑上双击 relogin_huawei.bat，弹出的窗口里登录一次华为云（一次性）"},
                    {"k": "为什么登录没用", "v": "签到用服务器自己那份 Cookie；你在本人浏览器登录，服务器拿不到（HttpOnly）"},
                ],
                "error": None,
            }
        return _card_error("huawei", "华为码道每日签到", "#804FED", "#6A35D6", "huawei", e)
    except Exception as e:
        return _card_error("huawei", "华为码道每日签到", "#804FED", "#6A35D6", "huawei", e)


def run_hw_checkin():
    """执行华为码道每日签到（campaignId=1），已签则幂等跳过。"""
    if not HW_COOKIE:
        raise RuntimeError("未配置华为登录 Cookie（hw_cookie.txt 或 HW_COOKIE）")
    # 先看今天是否已签，避免重复领取报错
    try:
        d = _hw_api("/v1/ops/delivery?channel=WEB")
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            _hw_record(False, "会话失效 HTTP %s" % e.code)
            raise RuntimeError(HW_SESSION_DEAD_MSG)
        raise
    if d.get("code") != 0:
        raise RuntimeError(d.get("message") or "华为活动查询失败")
    items = (d.get("data") or {}).get("items") or []
    camp = _hw_find_daily(items)
    if camp and camp.get("status") in ("CLAIMED", "CONFIRMED", "CONSUMED"):
        _hw_record(True, "今日已签到（幂等跳过）")
        _hw_mark_today_done("今日已签到（幂等跳过）")
        return get_hw_card()
    ts = int(time.time() * 1000)
    claim = _hw_api(
        "/v1/ops/claim",
        method="POST",
        body={"campaignId": 1, "idempotentKey": "claim_1_%s" % ts, "channel": "WEB"},
    )
    if claim.get("code") != 0:
        raise RuntimeError(claim.get("message") or "华为签到领取失败")
    conf = _hw_api("/v1/ops/confirm", method="POST", body={"campaignId": 1})
    if conf.get("code") != 0:
        raise RuntimeError(conf.get("message") or "华为签到确认失败")
    _hw_record(True, "今日签到成功 +1000 积分")
    _hw_mark_today_done("今日签到成功 +1000 积分")
    return get_hw_card()


# ---------------- Qoder 每日领 100 Credits ----------------
QD_STATE_FILE = os.path.join(BASE_DIR, "qoder_last_run.json")
QD_TOKEN_FILE = os.path.join(BASE_DIR, "qoder_token.txt")
QD_BASE = os.environ.get("QODER_BASE_URL", "https://openapi.qoder.sh")
QD_AUTH_URL = "https://qoder.com/account/profile"
QD_CAMPAIGN_PATH = "/sash/api/v1/me/campaigns"
# 服务端绝不刷新 token（刷新会挤掉你本机 Qoder 客户端的登录态），只读着用；
# token 过期只能靠本机脚本重新取一份推上来。
QD_SESSION_DEAD_MSG = (
    "服务器侧 Qoder 登录态已失效（HTTP 401）：领取由服务器携带自己保存的 token 发起，"
    "服务端不会自动刷新 token（刷新会顶掉你本机 Qoder 客户端的登录态）。"
    "恢复办法：在电脑上双击 push_qoder.bat，它从本机 Qoder 客户端取出最新 token 推送上来，"
    "约 1 分钟本卡自动变绿。"
)


def _qd_token():
    """读 Qoder access token：环境变量 QODER_TOKEN 优先，其次 qoder_token.txt。

    每次调用都重新读文件，push_qoder.bat 推上新 token 后无需重启服务。
    返回 (token, expires_at_iso)，未配置时返回 ("", None)。
    """
    tok = os.environ.get("QODER_TOKEN", "").strip()
    exp = None
    if not tok:
        try:
            with open(QD_TOKEN_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    if line.lower().startswith("# expiresat="):
                        exp = line.split("=", 1)[1].strip()
                    elif not line.startswith("#") and not tok:
                        tok = line
        except Exception:
            pass
    return tok, exp


def _qd_api(path, method="GET", body=None):
    """调 Qoder 开放接口。最小可用头：Authorization + Cosy-ClientType + Accept + UA。"""
    tok, _ = _qd_token()
    headers = {
        "Authorization": "Bearer %s" % tok,
        "Cosy-ClientType": "10",
        "Accept": "application/json",
        "User-Agent": "Qoder",
    }
    if body is not None:
        headers["Content-Type"] = "application/json"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(
        "%s%s" % (QD_BASE, path), data=data, method=method, headers=headers
    )
    with urllib.request.urlopen(req, timeout=25, context=_SSL_CTX) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def _qd_record(ok, message):
    _append_rec(
        QD_STATE_FILE,
        {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": bool(ok),
            "message": message,
        },
        30,
    )


def _qd_read_last():
    try:
        with open(QD_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data[-1] if data else None
        return data
    except Exception:
        return None


def _qd_find_daily(payload):
    """从 campaigns 里挑出「每日领 100 Credits」（actionType=CLAIM_BENEFIT）。

    列表里还有 actionType=VIEW_DETAILS 的展示型活动，必须跳过；
    已领取的那条优先，避免同 key 多条时误判成「可领」。
    """
    items = (payload or {}).get("campaigns") or []
    best = None
    for c in items:
        if not isinstance(c, dict):
            continue
        if c.get("actionType") != "CLAIM_BENEFIT":
            continue
        if c.get("claimStatus") == "CLAIMED":
            return c
        if best is None:
            best = c
    return best


def _qd_benefit_text(camp):
    b = (camp or {}).get("benefit") or {}
    amount = b.get("amount")
    kind = (b.get("kind") or "CREDITS").upper()
    unit = {"CREDITS": "Credits", "CREDIT": "Credits", "POINTS": "积分"}.get(
        kind, kind.title()
    )
    return ("%s %s" % (amount, unit)) if amount is not None else "每日福利"


def _qd_validity_text(camp):
    v = ((camp or {}).get("benefit") or {}).get("validity") or {}
    days = v.get("days")
    if (v.get("mode") or "").upper() == "RELATIVE_DAYS" and days:
        return "领取后 %s 天有效" % days
    return "以活动说明为准"


def _qd_window(camp):
    """返回 (是否在领取窗口内, 状态文案)。窗口：每日 10:00(UTC+8) 刷新，次日 09:59 截止。"""
    now = time.time()
    start_at = (camp or {}).get("startAt")
    end_at = (camp or {}).get("endAt")
    if isinstance(start_at, (int, float)) and now < start_at:
        return False, "今日 10:00 刷新后开放"
    if isinstance(end_at, (int, float)) and now > end_at:
        return False, "本期已截止（无补领）"
    return True, "可领取"


def get_qd_card():
    tok, exp = _qd_token()
    if not tok:
        return {
            "name": "qoder",
            "title": "Qoder 每日领 100 Credits",
            "brand": "#141414",
            "brand2": "#4A4A4A",
            "icon": "qd",
            "checked": False,
            "needs_auth": True,
            "badge": "未配置",
            "hide_auth_link": True,
            "auth_url": QD_AUTH_URL,
            "metric_label": "状态",
            "metric_value": "未配置",
            "last_run": None,
            "rows": [
                {"k": "原因", "v": "服务器上还没有 Qoder 登录态（qoder_token.txt 为空）"},
                {
                    "k": "如何配置",
                    "v": "在电脑上双击 push_qoder.bat，自动从本机 Qoder 客户端取出 token 推送到服务器",
                },
            ],
            "error": None,
        }
    try:
        d = _qd_api(QD_CAMPAIGN_PATH)
        camp = _qd_find_daily(d)
        if not camp:
            raise RuntimeError("未找到「每日领 100 Credits」活动（可能已下线或账号未参与）")
        checked = camp.get("claimStatus") == "CLAIMED"
        benefit = _qd_benefit_text(camp)
        in_window, window_txt = _qd_window(camp)
        lr = _qd_read_last()
        rows = [
            {"k": "今日福利", "v": benefit},
            {
                "k": "领取状态",
                "v": "✅ 今日已领" if checked else window_txt,
            },
            {"k": "有效期限", "v": _qd_validity_text(camp)},
            {"k": "领取窗口", "v": "每日 10:00 刷新，次日 09:59 截止（无补领）"},
        ]
        if exp:
            rows.append({"k": "登录态", "v": "有效期至 %s" % str(exp)[:10]})
        if lr:
            rows.append(
                {
                    "k": "上次执行",
                    "v": "%s %s"
                    % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️"),
                }
            )
        amount = ((camp.get("benefit") or {}).get("amount"))
        metric_value = ("已领 %s" % amount) if checked else str(amount)
        return {
            "name": "qoder",
            "title": "Qoder 每日领 100 Credits",
            "brand": "#141414",
            "brand2": "#4A4A4A",
            "icon": "qd",
            "checked": checked,
            "badge": None if (checked or in_window) else window_txt,
            "metric_label": "今日 Credits",
            "metric_value": metric_value,
            "last_run": lr,
            "rows": rows,
            "error": None,
        }
    except urllib.error.HTTPError as e:
        # 401/403 = Qoder 登录态（access token）过期，需要本机重新取一份，非配置错误
        if e.code in (401, 403):
            return {
                "name": "qoder",
                "title": "Qoder 每日领 100 Credits",
                "brand": "#141414",
                "brand2": "#4A4A4A",
                "icon": "qd",
                "checked": False,
                "needs_auth": True,
                "badge": "登录态过期",
                "hide_auth_link": True,
                "auth_url": QD_AUTH_URL,
                "metric_label": "登录态",
                "metric_value": "已过期",
                "last_run": _qd_read_last(),
                "rows": [
                    {
                        "k": "原因",
                        "v": "服务器侧 Qoder token 已失效（HTTP %s），非配置错误" % e.code,
                    },
                    {
                        "k": "如何恢复",
                        "v": "在电脑上双击 push_qoder.bat，自动取本机 Qoder 客户端的最新 token 推上来",
                    },
                    {
                        "k": "为什么自动刷新不行",
                        "v": "刷新 token 会顶掉你本机客户端的登录态，所以服务端只读不刷新",
                    },
                ],
                "error": None,
            }
        return _card_error("qoder", "Qoder 每日领 100 Credits", "#141414", "#4A4A4A", "qd", e)
    except Exception as e:
        return _card_error("qoder", "Qoder 每日领 100 Credits", "#141414", "#4A4A4A", "qd", e)


def run_qd_checkin():
    """执行 Qoder「每日领 100 Credits」领取，已领则幂等跳过。"""
    tok, _ = _qd_token()
    if not tok:
        raise RuntimeError("未配置 Qoder 登录态（qoder_token.txt 或 QODER_TOKEN）")
    try:
        d = _qd_api(QD_CAMPAIGN_PATH)
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            _qd_record(False, "登录态失效 HTTP %s" % e.code)
            raise RuntimeError(QD_SESSION_DEAD_MSG)
        raise
    camp = _qd_find_daily(d)
    if not camp:
        raise RuntimeError("未找到「每日领 100 Credits」活动")
    if camp.get("claimStatus") == "CLAIMED":
        _qd_record(True, "今日已领取（幂等跳过）")
        return get_qd_card()
    cid = camp.get("campaignId")
    if not cid:
        raise RuntimeError("活动缺少 campaignId，无法领取")
    in_window, window_txt = _qd_window(camp)
    if not in_window:
        _qd_record(True, "领取窗口未开启：%s" % window_txt)
        return get_qd_card()
    r = _qd_api(
        "%s/%s/claim" % (QD_CAMPAIGN_PATH, cid), method="POST", body={}
    )
    if (r or {}).get("status") != "CLAIMED":
        msg = (r or {}).get("message") or "领取失败"
        _qd_record(False, msg)
        raise RuntimeError(msg)
    _qd_record(True, "今日领取成功 +%s" % _qd_benefit_text(camp))
    return get_qd_card()


LK_STATE_FILE = os.path.join(BASE_DIR, "lk_last_run.json")
LK_API_BASE = "https://link-ai.tech/api/chat/web/app/user"


def _lk_api(path, method="GET", body=None):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://link-ai.tech/console/account",
        "Accept": "application/json",
    }
    if LINKAI_TOKEN:
        headers["Authorization"] = "Bearer %s" % LINKAI_TOKEN
    if body is not None:
        headers["Content-Type"] = "application/json"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        "%s%s" % (LK_API_BASE, path), data=data, method=method, headers=headers
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            return json.loads(body)
        except Exception:
            return {"success": False, "code": e.code, "message": body[:200]}
    except Exception as e:
        return {"success": False, "code": -1, "message": str(e)}


def _lk_record(ok, msg):
    _append_rec(
        LK_STATE_FILE,
        {
            "ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ok": ok,
            "message": msg,
            "source": "auto",
        },
        30,
    )


def get_lk_card():
    if not LINKAI_TOKEN:
        return {
            "name": "linkai",
            "title": "Link AI 每日签到",
            "brand": "#3B82F6",
            "brand2": "#2563EB",
            "icon": "lk",
            "checked": False,
            "needs_auth": True,
            "auth_url": "https://link-ai.tech/console/account",
            "metric_label": "状态",
            "metric_value": "未配置",
            "last_run": None,
            "rows": [
                {"k": "说明", "v": "请在浏览器登录后获取 token 写入 linkai_token.txt"}
            ],
            "error": None,
        }
    try:
        d = _lk_api("/sign/in")
        lr = _lk_read_last()
        checked = False
        if not d.get("success"):
            if d.get("code") == 870:
                checked = True
            else:
                raise RuntimeError(d.get("message") or "状态查询失败")
        else:
            checked = True
        # 查积分余额
        bal = "--"
        try:
            r = _lk_api("/get/balance")
            if r.get("success"):
                bal = r.get("data", {}).get(
                    "score", r.get("data", {}).get("balance", "--")
                )
        except Exception:
            pass
        rows = [
            {
                "k": "签到状态",
                "v": "\u2705 \u4eca\u65e5\u5df2\u7b7e"
                if checked
                else "\u5f85\u7b7e\u5230",
            },
        ]
        if lr:
            rows.append(
                {
                    "k": "上次执行",
                    "v": "%s %s"
                    % (
                        str(lr.get("ts"))[5:16],
                        "\u2705" if lr.get("ok") else "\u26a0\ufe0f",
                    ),
                }
            )
        return {
            "name": "linkai",
            "title": "Link AI 每日签到",
            "brand": "#3B82F6",
            "brand2": "#2563EB",
            "icon": "lk",
            "checked": checked,
            "metric_label": "可用积分",
            "metric_value": bal,
            "last_run": lr,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return _auth_fail_card(
            "linkai", "Link AI 每日签到", "#3B82F6", "#2563EB", "lk", e,
            [("如何恢复",
              "Link AI 令牌已失效：登录 link-ai.tech/console/account 复制新的 API Token，"
              "更新服务器上的 linkai_token.txt；或在设置页更新 LINKAI_TOKEN，再点「重新检查」")],
        )


def run_lk_checkin():
    if not LINKAI_TOKEN:
        raise RuntimeError("未配置 Link AI Token（linkai_token.txt 或 LINKAI_TOKEN）")
    d = _lk_api("/sign/in")
    if d.get("success"):
        points = (
            d.get("data", {}).get("points") or d.get("data", {}).get("score") or "?"
        )
        _lk_record(True, "今日 +%s 积分" % points)
        return get_lk_card()
    code = d.get("code")
    if code == 870:
        _lk_record(True, "今日已签到")
        return get_lk_card()
    raise RuntimeError(d.get("message") or "Link AI 签到失败 (code=%s)" % code)


def _lk_read_last():
    try:
        with open(LK_STATE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list) and data:
            return data[-1]
        if isinstance(data, dict):
            return data
    except Exception:
        pass
    return None


def get_lk_detail():
    if not LINKAI_TOKEN:
        raise RuntimeError("未配置 Link AI Token")
    history = _load_json_records(LK_STATE_FILE, 30)
    bal = "--"
    try:
        r = _lk_api("/get/balance")
        if r.get("success"):
            bal = r.get("data", {}).get("score", r.get("data", {}).get("balance", "--"))
    except Exception:
        pass
    return {
        "ok": True,
        "name": "linkai",
        "title": "Link AI 每日签到",
        "signin": {
            "history": history,
            "checked": get_lk_card().get("checked"),
        },
        "consumption": {
            "balance": bal,
        },
    }


# ============================ 签到中心：多平台适配器 ============================
def _card_error(name, title, brand, brand2, icon, err):
    return {
        "name": name,
        "title": title,
        "brand": brand,
        "brand2": brand2,
        "icon": icon,
        "checked": False,
        "metric_label": "—",
        "metric_value": "—",
        "last_run": None,
        "rows": [],
        "error": str(err),
    }


def _auth_fail_card(name, title, brand, brand2, icon, err, steps):
    """登录态/令牌失效或查询异常时的友好卡片（替代裸 _card_error）。

    自动签到平台一旦 token/cookie 过期，裸 _card_error 只会丢一句英文红条，
    用户完全不知道该怎么办。这里统一转成「needs_auth」卡片：角标说明状态，
    并用 steps 给出明确的恢复步骤（指向本地取凭据脚本或设置页粘贴新 token）。
    服务器侧的凭据无法直接经浏览器「跳转登录」刷新——它来自你本机浏览器登录态，
    所以需要本机脚本把新令牌推上来，或手动更新服务器上的凭据文件。

    ⚠️ 判定顺序：先判「网络类瞬时故障」（超时/连接重置/DNS），这类**不是**凭据问题，
    绝不能提示用户去重导 Cookie——实测「The read operation timed out」若落到
    凭据分支，会误导用户白折腾。只有确属鉴权错误才走「登录态过期」。
    """
    s = str(err or "").strip()
    low = s.lower()
    # 1) 网络类瞬时故障优先判定（不是凭据问题）
    transient = any(
        k in low
        for k in (
            "timed out", "timeout", "connection reset", "connection aborted",
            "connection refused", "connection error", "temporarily unavailable",
            "max retries", "name or service not known", "getaddrinfo",
            "temporary failure in name resolution", "remote end closed",
            "ssl", "eof occurred", "network is unreachable", "remotedisconnected",
        )
    ) or any(k in s for k in ("超时", "连接被重置", "网络不可达", "暂时不可用", "服务暂时不可用"))
    # 2) 鉴权类错误
    is_auth = any(
        k in low
        for k in (
            "401", "403", "unauthorized", "forbidden", "expired", "invalid token",
            "invalid_token", "token expired", "authentication", "not logged",
        )
    ) or any(
        k in s
        for k in ("过期", "失效", "登录", "鉴权", "未授权", "凭据", "凭证", "cookie")
    )
    if transient and not is_auth:
        # 网络抖动：等一会刷新即可，不提示重导凭据
        return {
            "name": name,
            "title": title,
            "brand": brand,
            "brand2": brand2,
            "icon": icon,
            "checked": False,
            "needs_auth": False,
            "badge": "查询失败",
            "hide_auth_link": True,
            "metric_label": "状态",
            "metric_value": "暂时查不到",
            "last_run": None,
            "rows": [
                {"k": "原因", "v": (s[:140] + "…") if len(s) > 140 else (s or "未知错误")},
                {"k": "说明", "v": "这是接口临时超时/网络抖动，不是登录态失效；"
                                 "稍后点「重新检查签到状态」即可，无需重导凭据。"},
            ],
            "error": None,
        }
    badge = "登录态过期" if is_auth else "查询失败"
    rows = [{"k": "原因", "v": (s[:140] + "…") if len(s) > 140 else (s or "未知错误")}]
    for k, v in steps:
        rows.append({"k": k, "v": v})
    return {
        "name": name,
        "title": title,
        "brand": brand,
        "brand2": brand2,
        "icon": icon,
        "checked": False,
        "needs_auth": True,
        "badge": badge,
        "hide_auth_link": True,
        "metric_label": "状态",
        "metric_value": "需更新凭据",
        "last_run": None,
        "rows": rows,
        "error": None,
    }


def get_wb_card():
    try:
        st = get_status()
        lr = read_last_run()
        rows = [
            {
                "k": "今日已得",
                "v": ("+%s 分" % st["today"]) if st.get("today") is not None else "--",
            },
            {
                "k": "资源余额",
                "v": ("%s 分" % st["remaining"])
                if st.get("remaining") is not None
                else "--",
            },
            {
                "k": "连续签到",
                "v": ("%s 天" % st["streak"]) if st.get("streak") is not None else "--",
            },
            {"k": "活动截止", "v": st.get("end_time") or "--"},
        ]
        return {
            "name": "workbuddy",
            "title": "WorkBuddy加油站",
            "brand": "#00C29A",
            "brand2": "#00C885",
            "icon": "wb",
            "checked": bool(st.get("checked")),
            "metric_label": "累计积分",
            "metric_value": st.get("total"),
            "last_run": lr,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return _auth_fail_card(
            "workbuddy", "WorkBuddy加油站", "#00C29A", "#00C885", "wb", e,
            [("如何恢复",
              "服务器上的 WorkBuddy 会话令牌已失效：更新 WB_TOKEN_FILE 指向的 token.info"
              "（SSH 覆盖或本机取令牌脚本推送），再点「重新检查」")],
        )


def _qf_friendly_error(raw):
    """把千帆上游的原始报错翻译成人话。

    区分「上游偶发抖动」（等一会就好）与「凭据真的要换」——千帆 cookie 实测
    有效期约一个月，且服务端会偶发返回「登录已经过期」但十几分钟后自愈，
    直接展示原始英文/中文报错会让人误以为需要立刻重新导出 cookie。
    """
    s = str(raw or "").strip()
    low = s.lower()
    if ("登录" in s and ("过期" in s or "失效" in s)) or "unauthorized" in low or "401" in s:
        return ("千帆提示登录态校验未通过（上游偶发判定，通常十几分钟后自愈，"
                "签到记录不受影响）。若持续超过一天，需重新导出千帆 cookie。")
    if any(k in s for k in ("502", "503", "504")) or "timed out" in low or "timeout" in low:
        return "千帆服务暂时不可用（网络或上游抖动），稍后刷新即可，签到记录不受影响。"
    return "千帆状态查询失败：%s" % (s or "未知原因")


def _qf_degraded_card(err):
    """千帆状态查询失败时的降级卡片：保留历史签到信息 + 人话提示，不整卡变红。

    千帆的 /api/status 依赖上游两个接口（签到信息 + 积分余量），任一抖动都会
    让整张卡变成报错。这里改为：状态查不到时用 /api/history（独立接口，通常
    仍可用）回显最近签到，只把「实时积分/今日状态」标为待刷新。
    """
    friendly = _qf_friendly_error(err)
    last_run = None
    rows = []
    checked = False
    try:
        h = _http_json(
            "%s/api/history?days=7&token=%s" % (QIANFAN_BASE, QIANFAN_TOKEN), retries=1
        )
        hs = h.get("data") or []
        if hs:
            rec = hs[0]
            ok = rec.get("status") == "success"
            last_run = {
                "ts": rec.get("date"),
                "ok": ok,
                "message": rec.get("message"),
                "source": "qianfan",
            }
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            checked = bool(ok and rec.get("date") == today)
            rows.append({
                "k": "最近签到",
                "v": "%s %s" % (rec.get("date") or "--", "已签到" if ok else "未成功"),
            })
    except Exception:
        pass
    rows.append({"k": "实时积分", "v": "暂时查不到"})
    rows.append({"k": "今日状态", "v": "暂时查不到"})
    return {
        "name": "qianfan",
        "title": "百度千帆每日签到",
        "brand": "#4E6EF2",
        "brand2": "#2932E1",
        "icon": "qf",
        "checked": checked,
        "metric_label": "可用积分",
        "metric_value": "--",
        "last_run": last_run,
        "rows": rows,
        "badge": "状态待刷新",
        "error": friendly,
    }


def get_qf_card():
    try:
        if not QIANFAN_TOKEN or not QIANFAN_BASE:
            raise RuntimeError("未配置千帆（请设置 QF_BASE_URL 与 QF_ACCESS_TOKEN）")
        d = _http_json(
            "%s/api/status?token=%s" % (QIANFAN_BASE, QIANFAN_TOKEN), retries=1
        )
        if not d.get("ok"):
            raise RuntimeError(d.get("error") or "千帆状态获取失败")
        data = d.get("data") or {}
        signin = data.get("signin") or {}
        points = data.get("points") or {}
        # 最近一次签到：从 history 取最新一条
        last_run = None
        try:
            h = _http_json(
                "%s/api/history?days=7&token=%s" % (QIANFAN_BASE, QIANFAN_TOKEN)
            )
            hs = h.get("data") or []
            if hs:
                rec = hs[0]
                last_run = {
                    "ts": rec.get("date"),
                    "ok": rec.get("status") == "success",
                    "message": rec.get("message"),
                    "source": "qianfan",
                }
        except Exception:
            pass
        rows = [
            {"k": "累计积分", "v": points.get("totalPoints", "--")},
            {"k": "已签天数", "v": signin.get("totalTimes", "--")},
            {"k": "已用积分", "v": points.get("usedPoints", "--")},
        ]
        if data.get("pointsStale"):
            # 千帆服务端已降级：积分来自最近一次快照而非实时查询，如实标注
            rows.append({"k": "积分数据", "v": "上次快照（实时查询暂时失败）"})
        return {
            "name": "qianfan",
            "title": "百度千帆每日签到",
            "brand": "#4E6EF2",
            "brand2": "#2932E1",
            "icon": "qf",
            "checked": bool(signin.get("signedToday")),
            "metric_label": "可用积分",
            "metric_value": points.get("available", "--"),
            "last_run": last_run,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return _qf_degraded_card(e)


# 本字典的插入顺序 = 手机页卡片顺序：WorkBuddy 固定第一，
# 其余「服务器自持长效凭据、无需人工干预」的排前面，凭据短效/依赖本机的沉底。
# ================== 派猫猫旅行（状态机 + 轮询） ==================
_TRAVEL_COOKIE = None  # 模块级缓存：本地 cookie 文件路径（首次探测后填充）
_TRAVEL_RUN = {"running": False, "results": None, "updated": None, "error": None,
               "state": "", "arrive_at": 0}


def _travel_cookie():
    """返回 cookie 文本（若有），否则 None（走 Bearer）。"""
    global _TRAVEL_COOKIE
    if _TRAVEL_COOKIE is not None:
        return _TRAVEL_COOKIE
    try:
        p = os.environ.get("WB_TRAVEL_COOKIE") or os.path.join(BASE_DIR, "wb_travel_cookie.txt")
        if os.path.isfile(p):
            with open(p, "r", encoding="utf-8") as f:
                raw = f.read().strip()
                _TRAVEL_COOKIE = raw or None
        else:
            _TRAVEL_COOKIE = None
    except Exception:
        _TRAVEL_COOKIE = None
    return _TRAVEL_COOKIE


def get_travel_card():
    """派猫猫旅行卡片（供签到中心网格展示）。失败返回错误卡，绝不抛异常。"""
    base = {
        "name": "travel", "title": "派猫猫旅行",
        "brand": "#F59E0B", "brand2": "#FBBF24", "icon": "travel",
        "checked": False, "metric_label": "今日奖励", "metric_value": "--",
        "rows": [], "error": None,
    }
    if wb_travel is None:
        base["error"] = "旅行模块未加载（wb_travel.py 缺失）"
        return base
    sess = _load_session_safe()
    if not sess or not sess.get("access_token"):
        base["needs_auth"] = True
        base["error"] = "未找到本地会话 token（服务器需 WB_TOKEN_FILE 指向明文 token.info）"
        return base
    cookie = _travel_cookie()
    return wb_travel.get_travel_card(sess, cookie=cookie)


def run_travel_background(prefer_loc=None):
    """后台执行一轮旅行巡检（depart/claim 状态机），避免长连接被 nginx 超时打断。"""
    global _TRAVEL_RUN
    _TRAVEL_RUN["running"] = True
    _TRAVEL_RUN["error"] = None
    try:
        sess = _load_session_safe()
        if not sess or not sess.get("access_token"):
            _TRAVEL_RUN["error"] = "未找到本地会话 token（WB_TOKEN_FILE 需指向明文 token.info）"
            return
        cookie = _travel_cookie()
        _TRAVEL_RUN["results"] = wb_travel.run_poll(sess, cookie=cookie, prefer_loc=prefer_loc)
        ls = getattr(wb_travel, "LAST_STATUS", {}) or {}
        _TRAVEL_RUN["state"] = (ls.get("state") or "").lower()
        _TRAVEL_RUN["arrive_at"] = ls.get("arrive_at") or 0
    except Exception as e:
        _TRAVEL_RUN["error"] = str(e)
    finally:
        _TRAVEL_RUN["running"] = False
        _TRAVEL_RUN["updated"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def _travel_poll_loop():
    """旅行轮询守护线程：负责「到点自动领奖」。

    旅行耗时 1~4 小时，每日 08:35 那次自动签到只能把猫「派出」，回来领奖要靠本线程。
    策略：起来先巡检一轮；若读到 state=traveling 且知道 arrive_at，就精确睡到
    「到达后 1 分钟」再巡检（而不是死等固定 30 分钟），其余情况最多等 30 分钟。
    服务端 data.state 是权威状态机，巡检天然幂等。"""
    default_wait = 30 * 60
    while True:
        wait = default_wait
        try:
            if platform_enabled("travel"):
                print("[travel] 轮询巡检（状态机 depart/claim）")
                run_travel_background()
                if (_TRAVEL_RUN.get("state") or "") == "traveling" and _TRAVEL_RUN.get("arrive_at"):
                    left = int(_TRAVEL_RUN["arrive_at"]) - int(time.time()) + 60
                    wait = max(60, min(left, default_wait))
                    print("[travel] 旅行中，%d 秒后再巡检" % wait)
        except Exception as e:
            print("[travel] 轮询异常: %s" % e)
        try:
            _sched_wake_travel.wait(wait)
            _sched_wake_travel.clear()
        except Exception:
            time.sleep(wait)

ADAPTERS = {
    "workbuddy": get_wb_card,
    "qianfan": get_qf_card,
    "minimax": get_mm_card,
    "qoder": get_qd_card,
    "linkai": get_lk_card,
    # ↓ 凭据短效或依赖本机，失效后需人工处理
    "lingxi": get_lx_card,
    "trae": get_trae_card,
    "huawei": get_hw_card,
}

# 卡片分组标签（与上面顺序一致）：auto = 全自动；其余 = 需偶尔维护凭据
AUTO_PLATFORMS = ("workbuddy", "qianfan", "minimax", "qoder", "linkai", "lingxi", "trae")
# 「派猫猫旅行」不再单独成卡，它作为 WorkBuddy 卡内的入口（弹窗），但仍是全自动项目：
# 每天派出 + 到点自动领奖，所以「立即全部签到」/每日自动要把 travel 一起带上。
AUTO_RUN = AUTO_PLATFORMS + ("travel",)


def _load_json_records(path, limit=30):
    """读取本地 JSON 历史记录文件（列表），返回最近 limit 条（倒序，最新在前）。"""
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            # 正序文件：尾部是最新；反转后最新在前
            data = data[-limit:]
            return list(reversed(data))
        if isinstance(data, dict):
            return [data]
        return []
    except Exception:
        return []


def get_detail(name):
    """返回某个平台的详细数据（签到历史 + 消耗/余额详情）。"""
    if name == "workbuddy":
        st = get_status()
        history = _load_json_records(os.path.join(BASE_DIR, "last_run.json"), 30)
        return {
            "ok": True,
            "name": name,
            "title": "WorkBuddy 加油站",
            "signin": {
                "total": st.get("total"),
                "today": st.get("today"),
                "streak": st.get("streak"),
                "checked": st.get("checked"),
                "activity": st.get("activity"),
                "end_time": st.get("end_time"),
                "history": history,
            },
            "consumption": {
                "remaining": st.get("remaining"),
                "usage_yesterday": st.get("usage"),
                "packages": st.get("packages", []),
            },
        }

    if name == "qianfan":
        if not QIANFAN_TOKEN or not QIANFAN_BASE:
            raise RuntimeError("未配置千帆（请设置 QF_BASE_URL 与 QF_ACCESS_TOKEN）")
        # 拉取最近 7 天签到历史
        h = _http_json(
            "%s/api/history?days=30&token=%s" % (QIANFAN_BASE, QIANFAN_TOKEN)
        )
        hs = h.get("data") or []
        d = _http_json("%s/api/status?token=%s" % (QIANFAN_BASE, QIANFAN_TOKEN))
        data = d.get("data") or {}
        points = data.get("points") or {}
        signin = data.get("signin") or {}
        # 千帆远程历史是正序旧→新，统一反转成最新在前
        return {
            "ok": True,
            "name": name,
            "title": "百度千帆",
            "signin": {
                "total_days": signin.get("totalTimes"),
                "signed_today": signin.get("signedToday"),
                "history": [
                    {
                        "date": x.get("date"),
                        "status": x.get("status"),
                        "message": x.get("message"),
                    }
                    for x in hs
                ],
            },
            "consumption": {
                "total_points": points.get("totalPoints"),
                "available": points.get("available"),
                "used": points.get("usedPoints"),
            },
        }

    if name == "minimax":
        p = _mm_panel()
        history = _load_json_records(MM_STATE_FILE, 30)
        days = p.get("days", [])
        return {
            "ok": True,
            "name": name,
            "title": "MiniMax Code",
            "signin": {
                "cycle_claimed": p.get("claimed_count"),
                "cycle_total": len(days),
                "cycle_points": p.get("cycle_points"),
                "today_points": (p.get("today") or {}).get("points"),
                "today_claimed": p.get("claimed_today"),
                "history": history,
            },
            "consumption": {
                "note": "MiniMax 暂未提供资源消耗查询接口",
            },
        }

    if name == "trae":
        history = _load_json_records(TRAE_STATE_FILE, 30)
        # 获取当前 token 状态
        credits = extra = checked = None
        try:
            d = _trae_api("status")
            checked = d.get("checked_in")
            credits = d.get("credits")
            extra = d.get("extra_credits")
        except Exception:
            pass
        return {
            "ok": True,
            "name": name,
            "title": "Trae Work",
            "signin": {
                "checked_today": checked,
                "daily_credits": credits,
                "extra_credits": extra,
                "history": history,
            },
            "consumption": {
                "note": "Trae 暂未提供资源消耗查询接口",
            },
        }

    if name == "lingxi":
        history = _load_json_records(LX_STATE_FILE, 30)
        today = datetime.date.today().isoformat()
        d = _lx_api("/?date=%s" % today)
        data = d.get("data") or {}
        tasks = data.get("tasks") or []
        daily = next((t for t in tasks if t.get("task_key") == "daily_check_in"), {})
        all_tasks = [
            {
                "key": t.get("task_key"),
                "title": t.get("title"),
                "reward": t.get("reward_amount"),
                "status": t.get("status"),
            }
            for t in tasks
        ]
        return {
            "ok": True,
            "name": name,
            "title": "WPS 灵犀",
            "signin": {
                "checked_today": daily.get("status") == "claimed",
                "reward": daily.get("reward_amount", 100),
                "history": history,
                "tasks": all_tasks,
            },
            "consumption": {
                "total_claimed": daily.get("total_claimed_credits"),
            },
        }

    if name == "linkai":
        return get_lk_detail()

    if name == "huawei":
        history = _load_json_records(HW_STATE_FILE, 30)
        d = _hw_api("/v1/ops/delivery?channel=WEB")
        items = (d.get("data") or {}).get("items") or []
        camp = _hw_find_daily(items) or {}
        checked = camp.get("status") in ("CLAIMED", "CONFIRMED", "CONSUMED")
        return {
            "ok": True,
            "name": name,
            "title": "华为码道每日签到",
            "signin": {
                "checked_today": checked,
                "campaign_id": camp.get("campaignId"),
                "benefit": "%s %s"
                % (camp.get("benefitAmount"), camp.get("benefitUnit") or "CREDIT"),
                "status": camp.get("status"),
                "history": history,
            },
            "consumption": {
                "note": "华为码道暂未提供资源消耗查询接口",
            },
        }

    if name == "qoder":
        history = _load_json_records(QD_STATE_FILE, 30)
        d = _qd_api(QD_CAMPAIGN_PATH)
        camp = _qd_find_daily(d) or {}
        in_window, window_txt = _qd_window(camp)
        return {
            "ok": True,
            "name": name,
            "title": "Qoder 每日领 100 Credits",
            "signin": {
                "checked_today": camp.get("claimStatus") == "CLAIMED",
                "benefit": _qd_benefit_text(camp),
                "validity": _qd_validity_text(camp),
                "window": window_txt if not in_window else "每日 10:00 刷新",
                "campaign_id": camp.get("campaignId"),
                "history": history,
            },
            "consumption": {
                "note": "Qoder Credits 余额请在客户端用量面板查看",
            },
        }

    raise RuntimeError("未知平台：%s" % name)


# ============================ 成长中心（一键完成任务） ============================
# 复用 wb_growth 模块（纯标准库）。需要本地会话 token；服务端用 WB_TOKEN_FILE 指向明文 token.info。
_GROWTH_RUN = {"running": False, "results": None, "updated": None, "error": None}


def _load_session_safe():
    try:
        return load_session(find_token_file())
    except Exception:
        return None


def get_growth_card():
    """成长中心卡片（供签到中心网格展示）。失败返回错误卡，绝不抛异常。"""
    if wb_growth is None:
        return {"name": "growth", "title": "WorkBuddy 成长中心", "brand": "#7C5CFF",
                "brand2": "#9D7BFF", "icon": "growth", "growth": True, "checked": False,
                "metric_label": "已完成任务", "metric_value": "--", "rows": [],
                "error": "成长中心模块未加载（wb_growth.py 缺失）"}
    sess = _load_session_safe()
    if not sess or not sess.get("access_token"):
        return {"name": "growth", "title": "WorkBuddy 成长中心", "brand": "#7C5CFF",
                "brand2": "#9D7BFF", "icon": "growth", "growth": True, "checked": False,
                "metric_label": "已完成任务", "metric_value": "--", "rows": [],
                "error": "未找到本地会话 token（服务器需 WB_TOKEN_FILE 指向明文 token.info）"}
    card = wb_growth.get_growth_card(sess)
    card["growth"] = True
    return card


def run_growth_background():
    """后台执行一键完成任务，避免长连接被 nginx 代理超时打断。"""
    global _GROWTH_RUN
    _GROWTH_RUN["running"] = True
    _GROWTH_RUN["error"] = None
    try:
        sess = _load_session_safe()
        if not sess or not sess.get("access_token"):
            _GROWTH_RUN["error"] = "未找到本地会话 token（WB_TOKEN_FILE 需指向明文 token.info）"
            return
        _GROWTH_RUN["results"] = wb_growth.run_all(sess)
    except Exception as e:
        _GROWTH_RUN["error"] = str(e)
    finally:
        _GROWTH_RUN["running"] = False
        _GROWTH_RUN["updated"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


# ================== 成长中心 · 每日任务（每天刷新的动作：签到/兑换/补登/抽奖/盲盒） ==================
_DAILY_RUN = {"running": False, "results": None, "updated": None, "error": None}


def get_daily_card():
    """每日任务卡片。失败返回错误卡，绝不抛异常。"""
    base = {"name": "daily", "title": "成长中心 · 每日任务", "brand": "#F79009",
            "brand2": "#FDB022", "icon": "daily", "daily": True, "checked": False,
            "metric_label": "今日可做", "metric_value": "--", "claimable": 0, "rows": []}
    if wb_growth is None:
        base["error"] = "成长中心模块未加载（wb_growth.py 缺失）"
        return base
    sess = _load_session_safe()
    if not sess or not sess.get("access_token"):
        base["error"] = "未找到本地会话 token（服务器需 WB_TOKEN_FILE 指向明文 token.info）"
        return base
    card = wb_growth.get_daily_card(sess)
    card["daily"] = True
    return card


def run_daily_background():
    """后台执行「一键做完每日任务」，避免长连接被 nginx 代理超时打断。"""
    global _DAILY_RUN
    _DAILY_RUN["running"] = True
    _DAILY_RUN["error"] = None
    try:
        sess = _load_session_safe()
        if not sess or not sess.get("access_token"):
            _DAILY_RUN["error"] = "未找到本地会话 token（WB_TOKEN_FILE 需指向明文 token.info）"
            return
        _DAILY_RUN["results"] = wb_growth.run_daily(sess)
    except Exception as e:
        _DAILY_RUN["error"] = str(e)
    finally:
        _DAILY_RUN["running"] = False
        _DAILY_RUN["updated"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")





def _manual_guide(name, it):
    """为「手动签到」分组的平台生成友好的恢复指引（仅 needs_auth / 未就绪时前端展示）。"""
    auth = it.get("auth_url") or ""
    if name == "trae":
        return {
            "title": "Trae 已支持自动签到（仅需维护 Cookie）",
            "note": "服务端已按客户端通道（req_source=2 + 设备头）发起签到，无需你手动操作；"
                    "若提示 Cookie 过期，重新登录 work.trae.cn 后导出 trae_cookie.txt 即可。",
            "steps": [
                "打开 work.trae.cn 并登录你的账号",
                "若卡片提示 Cookie 过期，重新登录后导出 trae_cookie.txt 推到服务器",
                "点「立即签到」或等每日定时自动签",
            ],
            "cta_label": "在浏览器签到",
            "cta_url": auth,
        }
    if name == "huawei":
        return {
            "title": "服务器登录态已过期",
            "note": "签到用的是服务器自己那份 Cookie；你在本人浏览器登录华为云，服务器拿不到（HttpOnly）。需在本机重新登录一次。",
            "steps": [
                "在电脑上双击 relogin_huawei.bat",
                "弹出的 Edge 窗口里登录华为云（一次性）",
                "登录态会自动推送到服务器，点「重新检查签到状态」",
            ],
            "cta_label": None,
            "cta_url": None,
        }
    if name == "lingxi":
        return {
            "title": "登录 Cookie 已失效",
            "note": "WPS 灵犀用的是浏览器 Cookie，过期后需要重新导出。",
            "steps": [
                "在浏览器登录 lingxi.wps.cn",
                "重新导出 lx_cookie.txt 并部署到服务器",
                "回来点「重新检查签到状态」同步最新结果",
            ],
            "cta_label": None,
            "cta_url": None,
        }
    return None


def get_center():
    items = [fn() for fn in ADAPTERS.values()]
    for it in items:
        it["disabled"] = not platform_enabled(it.get("name"))
    signed = sum(1 for it in items if it.get("checked") and not it.get("disabled"))
    # 成长中心 / 每日任务 都属于 WorkBuddy：作为 WorkBuddy 卡片内的入口，不单独成卡
    g_entry = d_entry = None
    try:
        g = get_growth_card()
        g_entry = ({"ok": False, "error": g.get("error")} if g.get("error")
                   else {"ok": True, "completed": g.get("completed"), "total": g.get("total"),
                         "claimable": g.get("claimable"), "level": g.get("level")})
    except Exception as e:
        g_entry = {"ok": False, "error": str(e)}
    try:
        dy = get_daily_card()
        d_entry = ({"ok": False, "error": dy.get("error")} if dy.get("error")
                   else {"ok": True, "todo": dy.get("claimable"), "streak_days": dy.get("streak_days"),
                         "energy": dy.get("energy")})
    except Exception as e:
        d_entry = {"ok": False, "error": str(e)}
    # 「派猫猫旅行」也属于 WorkBuddy：作为 WorkBuddy 卡内的入口（弹窗），不单独成卡
    t_entry = None
    try:
        tc = get_travel_card()
        if tc.get("needs_auth") or tc.get("error"):
            t_entry = {"ok": False, "error": tc.get("error") or "需要处理"}
        else:
            t_entry = {
                "ok": True,
                "state": tc.get("travel_state"), "state_cn": tc.get("state_cn"),
                "metric": tc.get("metric_value"), "checked": bool(tc.get("checked")),
                "can_depart": bool(tc.get("can_depart")), "can_claim": bool(tc.get("can_claim")),
                "remain": tc.get("remain"), "location": tc.get("location"),
            }
    except Exception as e:
        t_entry = {"ok": False, "error": str(e)}
    for it in items:
        it["group"] = "auto" if it.get("name") in AUTO_PLATFORMS else "manual"
        if it.get("group") == "manual":
            g = _manual_guide(it.get("name"), it)
            if g:
                it["manual_guide"] = g
        if it.get("name") == "workbuddy":
            it["growth_entry"] = g_entry
            it["daily_entry"] = d_entry
            it["travel_entry"] = t_entry
    return {
        "ok": True,
        "server_time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "signed_count": signed,
        "total_count": len(ADAPTERS),
        "items": items,
    }


def run_checkin_for(name):
    """执行某个平台的签到，返回该平台最新卡片（已含本次结果）。"""
    if name == "workbuddy":
        do_checkin()  # 会写 last_run；失败抛异常
        return get_wb_card()
    if name == "qianfan":
        if not QIANFAN_TOKEN or not QIANFAN_BASE:
            raise RuntimeError("未配置千帆（请设置 QF_BASE_URL 与 QF_ACCESS_TOKEN）")
        d = _http_json(
            "%s/api/checkin/run?token=%s" % (QIANFAN_BASE, QIANFAN_TOKEN),
            method="POST",
            retries=1,
        )
        if not d.get("ok"):
            raise RuntimeError(_qf_friendly_error(d.get("error") or "千帆签到失败"))
        return get_qf_card()
    if name == "minimax":
        return run_mm_checkin()
    if name == "trae":
        return run_trae_checkin()
    if name == "lingxi":
        return run_lx_checkin()
    if name == "linkai":
        return run_lk_checkin()
    if name == "huawei":
        return run_hw_checkin()
    if name == "qoder":
        return run_qd_checkin()
    if name == "travel":
        run_travel_background()
        return get_travel_card()
    raise RuntimeError("未知签到平台：%s" % name)


def get_card_for(name, force_live=False):
    """只取某个平台的最新卡片（不执行签到），用于「重新检查签到状态」。

    force_live=True 时绕过「当日已签」本地短路（华为等短效会话平台），
    供用户显式点「重新检查」时做一次真实查询；但若真实查询因会话失效而报错，
    仍回落到本地已签标记（避免把「今天其实签成功了」误报成过期）。
    """
    fn = ADAPTERS.get(name)
    if not fn:
        return {"name": name, "title": name, "checked": False, "error": "未知平台"}
    try:
        if force_live and name == "huawei":
            done = _hw_today_done()
            try:
                card = _hw_live_card()
            except Exception:
                card = None
            if card is not None:
                return card
            if done:
                return _hw_done_card(done)
            return _auth_fail_card(
                "huawei", "华为码道每日签到", "#804FED", "#6A35D6", "huawei",
                RuntimeError("华为会话已失效（HTTP 401/403）"),
                [("如何恢复", "在电脑上双击 relogin_huawei.bat，弹出的窗口里登录一次华为云（一次性）")],
            )
        return fn()
    except Exception as e:
        return {"name": name, "title": name, "checked": False, "error": str(e)}


# ============================ 手机页面 ============================
PAGE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#00C29A">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E📋%3C/text%3E%3C/svg%3E">
<title>签到中心</title>
<style>
:root{
  --wb-brand-8:#00C29A;--wb-grad-a:#0EC7A8;--wb-grad-b:#00C885;
  --bg1:#f7fcfa;--bg2:#e6f5f0;--card:#fff;
  --ink:#0f172a;--sub:#6b7c8f;--line:#f0f4f3;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;min-height:100%;}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  background:linear-gradient(165deg,var(--bg1) 0%,var(--bg2) 100%);color:var(--ink);
  -webkit-font-smoothing:antialiased;
  display:flex;justify-content:center;padding:24px 14px 46px;}
.wrap{width:100%;max-width:440px;}
.brand{display:flex;align-items:center;gap:12px;margin:0 4px 16px;}
.logo{width:44px;height:44px;flex:0 0 44px;border-radius:14px;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,var(--wb-grad-a),var(--wb-grad-b));
  box-shadow:0 9px 20px -9px rgba(0,194,154,.95);}
.logo svg{width:25px;height:25px;display:block;}
.brand h1{font-size:17px;margin:0;font-weight:800;letter-spacing:-.3px;}
.brand p{margin:3px 0 0;font-size:12px;color:var(--sub);}
.summary{background:#fff;border-radius:16px;padding:14px 16px 15px;margin-bottom:12px;
  box-shadow:0 1px 2px rgba(15,23,42,.03),0 18px 34px -26px rgba(0,97,77,.85);
  border:1px solid rgba(0,194,154,.1);}
.summary .top{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:700;}
.summary .top .n{color:var(--wb-brand-8);font-variant-numeric:tabular-nums;}
.bar{height:7px;border-radius:999px;background:#edf3f1;margin-top:11px;overflow:hidden;}
.bar > i{display:block;height:100%;width:0;border-radius:999px;
  background:linear-gradient(90deg,var(--wb-grad-a),var(--wb-grad-b));
  transition:width .6s cubic-bezier(.22,.8,.28,1);}
#cards{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;}
/* ===== 自动/手动 双 Tab ===== */
#tabs{display:flex;gap:10px;margin-bottom:12px;}
.tabs-spacer{height:0;}
.tab{flex:1;border:1px solid var(--line);background:var(--card);border-radius:14px;padding:12px 14px;cursor:pointer;
  display:flex;flex-direction:column;gap:2px;font-weight:800;font-size:14px;color:var(--sub);
  transition:border-color .15s,background .15s,box-shadow .15s;text-align:left;min-width:0;}
.tab:hover{border-color:rgba(0,194,154,.4);}
.tab .tc{display:flex;align-items:center;justify-content:space-between;gap:8px;}
.tab .cnt{font-size:12px;font-weight:600;opacity:.85;font-variant-numeric:tabular-nums;padding:2px 9px;border-radius:999px;background:rgba(15,23,42,.05);}
.tab.on{color:#00614D;border-color:#00C29A;background:rgba(0,194,154,.07);box-shadow:0 10px 20px -14px rgba(0,194,154,.9);}
.tab.on .cnt{color:#00614D;background:rgba(0,194,154,.16);}
.tab-actions{display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap;grid-column:1/-1;}
.cta.ghost.slim{width:auto;margin-top:0;padding:11px 18px;}
.tab-hint{font-size:12px;color:var(--sub);line-height:1.5;flex:1;min-width:160px;}
.tab-hint.block{display:block;flex:none;width:100%;margin-bottom:14px;padding:11px 14px;border-radius:12px;grid-column:1/-1;}
  background:rgba(247,144,9,.08);color:#b54708;border:1px solid rgba(247,144,9,.18);}
.badge.manual{color:#b54708;background:rgba(247,144,9,.13);}
.card.manual-card{cursor:default;}
.mguide{background:rgba(247,144,9,.07);border:1px solid rgba(247,144,9,.18);border-radius:12px;padding:12px 14px;margin-top:2px;}
.mguide .mg-title{font-size:14px;font-weight:800;color:#b54708;margin-bottom:4px;}
.mguide .mg-note{font-size:12.5px;color:#9a6a2f;line-height:1.55;margin-bottom:9px;}
.mguide .mg-steps{margin:0;padding-left:20px;font-size:13px;color:#7a5224;line-height:1.7;}
.mguide .mg-steps li{margin-bottom:2px;min-width:0;overflow-wrap:anywhere;}
.card{background:var(--card);border-radius:16px;padding:16px;
  box-shadow:0 1px 2px rgba(15,23,42,.03),0 18px 34px -26px rgba(15,23,42,.75);
  border:1px solid rgba(15,23,42,.045);
  border-top:3px solid var(--c,#00C29A);
  display:flex;flex-direction:column;min-width:0;}
.card-main{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0;gap:9px;}
/* 底部动作组：整组贴住卡片底部；等高网格里短卡片不会把按钮浮在中间 */
.card-acts{margin-top:auto;display:flex;flex-direction:column;gap:9px;}
.card-main .card-acts > *{margin-top:0;}
.card-top{display:flex;align-items:center;gap:11px;}
.cicon{width:38px;height:38px;flex:0 0 38px;border-radius:11px;overflow:hidden;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,var(--c,#00C29A),var(--c2,#00C885));
  box-shadow:0 7px 15px -9px var(--c,#00C29A);}
.cicon svg{display:block;width:100%;height:100%;}
.ctitle{font-size:15px;font-weight:700;letter-spacing:-.1px;line-height:1.35;flex:1;}
.badge{font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap;}
.badge.done{color:#00614D;background:rgba(0,194,154,.13);}
.badge.todo{color:#b54708;background:rgba(247,144,9,.13);}
.metric{margin:11px 0 2px;}
.metric .mlabel{font-size:11.5px;color:#9dabba;letter-spacing:.4px;}
.metric .mval{display:block;font-size:26px;font-weight:800;line-height:1.25;letter-spacing:-.6px;
  font-variant-numeric:tabular-nums;
  background:linear-gradient(135deg,var(--c,#00C29A),var(--c2,#00C885));
  -webkit-background-clip:text;background-clip:text;color:transparent;}
.rows{margin-top:6px;border-top:1px solid var(--line);}
.row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 1px;
  border-bottom:1px solid var(--line);font-size:13px;}
.row:last-child{border-bottom:0;}
.row .k{color:var(--sub);white-space:nowrap;}
.row .v{font-weight:600;text-align:right;font-variant-numeric:tabular-nums;min-width:0;overflow-wrap:anywhere;}
.last{font-size:11.5px;color:#94a3b8;margin-top:9px;}
button.cta{width:100%;margin-top:14px;border:0;border-radius:12px;padding:13px;font-size:15px;font-weight:700;color:#fff;
  background:linear-gradient(135deg,var(--c,#00C29A),var(--c2,#00C885));
  box-shadow:0 10px 20px -11px var(--c,rgba(0,194,154,.9));
  transition:transform .08s ease,filter .2s ease;cursor:pointer;}
button.cta:active{transform:scale(.985);filter:brightness(.96);}
button.cta[disabled]{background:#eef2f1;color:#9faead;box-shadow:none;}
/* 轻量次要按钮：已签到卡片的「重新检查」 */
button.cta.ghost{width:auto;flex:0 0 auto;margin-top:0;padding:8px 14px;border-radius:999px;
  font-size:12.5px;font-weight:700;color:#5b6b7c;background:#f5f8f7;border:1px solid var(--line);box-shadow:none;}
button.cta.ghost:active{background:#eaf0ef;filter:none;}
button.cta.ghost .spin{width:12px;height:12px;margin-right:5px;border-color:rgba(15,23,42,.15);border-top-color:#5b6b7c;}
.foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;
  padding-top:12px;border-top:1px solid var(--line);
  font-size:12.5px;font-weight:600;color:#94a3b8;}
.foot .ftxt{display:flex;align-items:center;gap:7px;min-width:0;}
.foot .ftxt .tick{width:16px;height:16px;flex:0 0 16px;border-radius:50%;display:inline-flex;align-items:center;
  justify-content:center;font-size:10px;font-style:normal;background:rgba(0,194,154,.16);}
.cta-link{display:block;width:100%;margin-top:12px;border-radius:12px;padding:13px;font-size:15px;font-weight:700;color:#fff;
  background:linear-gradient(135deg,#64748b,#94a3b8);box-shadow:0 10px 20px -13px rgba(71,85,105,.95);
  text-align:center;text-decoration:none;cursor:pointer;}
.card{cursor:pointer;transition:box-shadow .2s ease,transform .15s ease;}
.card:hover{box-shadow:0 2px 4px rgba(15,23,42,.04),0 22px 40px -26px rgba(15,23,42,.85);transform:translateY(-1px);}
.card-err{margin-top:12px;padding:10px 12px;border-radius:11px;font-size:12.5px;line-height:1.55;
  color:#912018;background:rgba(240,68,56,.07);border:1px solid rgba(240,68,56,.16);}
.dtab{display:flex;gap:18px;margin-bottom:14px;font-size:13px;font-weight:700;color:var(--sub);}
.dtab span{cursor:pointer;padding:4px 2px;border-bottom:2px solid transparent;}
.dtab span.on{color:var(--mc,#00C29A);border-color:var(--mc,#00C29A);}
.dsec{display:none;}
.dsec.on{display:block;}
.drow{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--line);font-size:12.5px;}
.drow:last-child{border-bottom:0;}
.drow .dk{color:var(--sub);}
.drow .dv{font-weight:600;text-align:right;}
.dsec h4{margin:0 0 8px;font-size:13px;color:var(--mc,var(--c,#00C29A));opacity:.85;}
.dempty{text-align:center;padding:20px 0;color:var(--sub);font-size:12px;}
.dloading{display:flex;align-items:center;justify-content:center;padding:24px 0;color:var(--sub);font-size:13px;}
.dloading .spin{margin-right:8px;border-color:rgba(0,0,0,.15);border-top-color:var(--c,#00C29A);}
.loading{display:flex;align-items:center;justify-content:center;gap:8px;color:var(--sub);padding:40px 0;font-size:14px;width:100%;grid-column:1 / -1;}
.loading .spin{margin-right:0;border-color:rgba(0,0,0,.12);border-top-color:var(--wb-brand-8);}
.msg{margin-top:14px;padding:11px 14px;border-radius:12px;font-size:14px;display:none;}
.msg.show{display:block;}
.msg.ok{background:rgba(0,194,154,.12);color:#00614D;}
.msg.err{background:rgba(240,68,56,.1);color:#912018;}
.keybox{display:none;margin-top:14px;}
.keybox.show{display:block;}
.keybox input{width:100%;padding:13px;border-radius:12px;border:1px solid #dfe3ec;font-size:16px;}
.keybox input:focus{outline:none;border-color:var(--wb-brand-8);box-shadow:0 0 0 3px rgba(0,194,154,.15);}
.hint{text-align:center;font-size:12px;color:var(--sub);margin-top:16px;line-height:1.6;}
.spin{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.45);border-top-color:#fff;
  border-radius:50%;animation:sp .7s linear infinite;vertical-align:-2px;margin-right:7px;}
@keyframes sp{to{transform:rotate(360deg)}}
/* ===== 响应式栅格：手机 1 列 → 平板 2 → 小桌面 3 → 宽屏 4 ===== */
@media (min-width:600px){
  .wrap{max-width:680px;}
  #cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
}
@media (min-width:920px){
  .wrap{max-width:1040px;}
  #cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}
}
@media (min-width:1240px){
  .wrap{max-width:1320px;}
  #cards{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;}
}
@media (min-width:760px){
  .brand h1{font-size:20px;}
  .brand p{font-size:13px;}
  .brand .logo{width:48px;height:48px;flex-basis:48px;border-radius:15px;}
  .brand .logo svg{width:27px;height:27px;}
  .summary .top{font-size:15px;}
}
/* ===== 详情模态浮层（替代原绝对定位弹窗，彻底杜绝卡片重叠）===== */
#modal{position:fixed;inset:0;z-index:1000;display:none;align-items:flex-start;justify-content:center;
  padding:max(24px,env(safe-area-inset-top)) 14px 40px;overflow-y:auto;-webkit-overflow-scrolling:touch;}
#modal.show{display:flex;}
#modal .mbg{position:fixed;inset:0;background:rgba(15,23,42,.42);
  -webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);}
#modal .mpanel{position:relative;z-index:1;width:100%;max-width:430px;margin:auto;background:#fff;
  border-radius:22px;overflow:hidden;display:flex;flex-direction:column;
  max-height:calc(100vh - 72px);
  box-shadow:0 30px 70px -22px rgba(15,23,42,.55);border-top:4px solid var(--mc,#00C29A);
  animation:mpop .22s cubic-bezier(.22,.8,.28,1);}
@keyframes mpop{from{opacity:0;transform:translateY(10px) scale(.98);}to{opacity:1;transform:none;}}
#modal .mhead{display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:15px 18px;border-bottom:1px solid var(--line);}
#modal .mhead h3{margin:0;font-size:16px;font-weight:800;letter-spacing:-.2px;}
#modal .mclose{width:32px;height:32px;flex:0 0 32px;border:0;border-radius:50%;background:#f1f5f4;
  color:#64748b;font-size:19px;line-height:1;cursor:pointer;transition:background .15s;}
#modal .mclose:hover{background:#e4ebea;}
#modal .mbody{padding:16px 18px 20px;overflow-y:auto;}
#modal .detail{margin-top:0;padding-top:0;border-top:0;}
@media (prefers-reduced-motion: reduce){
  #modal .mpanel{animation:none;}
  .card,.entry,button.cta,.bar > i{transition:none;}
}
/* 成长中心 / 每日任务 入口（嵌在 WorkBuddy 卡片内，两个并排小胶囊，点击新开页） */
.entries{display:flex;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line);}
.entry{flex:1;min-width:0;display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:11px;
  background:#f7fbfa;border:1px solid var(--line);text-decoration:none;color:inherit;}
.entry .eic{font-size:15px;line-height:1;flex:0 0 auto;}
.entry .etx{flex:1;min-width:0;}
.entry .etx b{font-size:12.5px;font-weight:700;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.entry .etx small{display:block;font-size:11px;color:var(--sub);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.entry .earrow{color:#cbd5d2;font-size:15px;font-weight:700;line-height:1;flex:0 0 auto;}
.entry:hover{background:#eef7f4;}
.entry:active{opacity:.7;}
/* 旅行入口是 <button>（弹窗），需抹掉浏览器默认按钮样式，视觉与两个 <a> 入口一致 */
button.entry{font:inherit;cursor:pointer;text-align:left;color:inherit;background:#f7fbfa;}
button.entry:hover{background:#eef7f4;}
/* 派猫猫旅行弹窗（WorkBuddy 卡内入口） */
.tmeta{display:flex;align-items:baseline;gap:10px;padding:2px 0 10px;border-bottom:1px solid var(--line);margin-bottom:4px;}
.tmeta .tmetric{font-size:22px;font-weight:800;background:linear-gradient(135deg,#F59E0B,#FBBF24);
  -webkit-background-clip:text;background-clip:text;color:transparent;}
.tmeta .tstate{font-size:12px;font-weight:700;color:#b45309;background:rgba(245,158,11,.16);
  border-radius:999px;padding:3px 10px;white-space:nowrap;}
.tletter{font-size:12.5px;line-height:1.7;color:#6b5f43;background:#fffbeb;border:1px dashed #f2d98a;
  border-radius:14px;padding:12px 14px;margin:12px 0;white-space:pre-wrap;word-break:break-word;}
.tacts{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;}
.tacts .cta{flex:1 1 46%;width:auto;min-width:110px;margin-top:0;}
.tres{margin-top:10px;font-size:12.5px;line-height:1.6;border-radius:12px;padding:9px 12px;display:none;}
.tres.ok{display:block;color:#00614D;background:rgba(0,194,154,.12);}
.tres.err{display:block;color:#912018;background:rgba(217,45,32,.10);}
/* 设置页 */
.gear{margin-left:auto;flex:0 0 auto;width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.4);
  background:rgba(255,255,255,.15);color:#fff;font-size:20px;display:flex;align-items:center;justify-content:center;
  text-decoration:none;cursor:pointer;}
.gear:active{transform:scale(.94);}
.settings{max-width:680px;margin:0 auto;}
.settings .fgroup h4{display:flex;align-items:center;gap:6px;}
.fld{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid var(--line);}
.fld.col{flex-direction:column;align-items:stretch;}
.fld > span{font-size:14px;font-weight:600;}
.fld input[type=time],.fld input[type=text],.fld input[type=password]{margin-top:8px;padding:9px 11px;border:1px solid var(--line);border-radius:10px;font-size:14px;width:100%;box-sizing:border-box;background:#fbfdfc;}
.fld input[type=checkbox]{width:20px;height:20px;accent-color:var(--c,#00C29A);}
.fval{font-size:13px;color:var(--sub);}
.ftip{font-size:12px;color:var(--sub);line-height:1.6;margin:10px 0 2px;}
.row-toggle{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--line);font-size:14px;font-weight:600;}
.row-toggle input{width:20px;height:20px;accent-color:var(--c,#00C29A);}
.card.disabled{opacity:.58;filter:grayscale(.5);}

/* 独立功能页（?view=growth / ?view=daily） */
.back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--sub);
  text-decoration:none;background:#fff;border:1px solid var(--line);border-radius:999px;padding:7px 14px;margin-bottom:12px;cursor:pointer;}
.fhead{background:#fff;border-radius:20px;padding:18px;box-shadow:0 10px 30px rgba(15,23,42,.07);
  border:1px solid rgba(15,23,42,.04);border-top:4px solid var(--c,#00C29A);margin-bottom:14px;}
.fhead h2{margin:0 0 6px;font-size:18px;font-weight:800;}
.fhead .fmeta{font-size:13px;color:var(--sub);}
.fhead .fstat{font-size:16px;font-weight:800;margin-top:8px;
  background:linear-gradient(135deg,var(--c,#00C29A),var(--c2,#00C885));-webkit-background-clip:text;background-clip:text;color:transparent;}
.fnote{font-size:12px;color:var(--sub);line-height:1.6;background:#fff;border:1px dashed #dfe6e3;
  border-radius:14px;padding:11px 13px;margin:12px 0;}
.fgroup{background:#fff;border-radius:18px;padding:4px 16px 10px;box-shadow:0 10px 30px rgba(15,23,42,.06);
  border:1px solid rgba(15,23,42,.04);margin-bottom:14px;}
.fgroup > h4{margin:14px 0 2px;font-size:13px;font-weight:800;color:var(--sub);letter-spacing:.3px;}
.task{display:flex;align-items:flex-start;gap:10px;padding:12px 0;border-bottom:1px solid var(--line);}
.task:last-child{border-bottom:0;}
.task .tt{flex:1;min-width:0;}
.task .tt .t1{font-size:14px;font-weight:600;line-height:1.35;}
.task .tt .t2{font-size:12px;color:var(--sub);margin-top:3px;line-height:1.5;}
.task .tr{flex:0 0 auto;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px;}
.st{font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;white-space:nowrap;display:inline-block;}
.st.claimed{color:#00614D;background:rgba(0,194,154,.14);}
.st.todo{color:#b54708;background:rgba(247,144,9,.14);}
.st.locked{color:#64748b;background:rgba(100,116,139,.12);}
.rew{font-size:12px;font-weight:700;color:#b54708;white-space:nowrap;}
.rew.done{color:#00614D;}
.btn-mini{border:0;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:700;color:#fff;
  background:linear-gradient(135deg,var(--c,#00C29A),var(--c2,#00C885));cursor:pointer;white-space:nowrap;}
.btn-mini[disabled]{background:#cbd5d2;}
.btn-mini:active{transform:scale(.97);}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand">
    <div class="logo"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.6" y="5.2" width="14.8" height="15.6" rx="3.2" stroke="#fff" stroke-width="1.7"/><rect x="9.1" y="2.6" width="5.8" height="4.4" rx="1.6" fill="#fff"/><path d="m8.7 13.4 2.3 2.3 4.4-4.7" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <div>
      <h1>签到中心</h1>
      <p>多个签到一目了然 · 一键完成</p>
    </div>
    <a class="gear" href="?view=settings" title="设置" aria-label="设置">⚙️</a>
  </div>

  <div class="summary">
    <div class="top"><span>今日签到进度</span><span class="n" id="summary">-- / --</span></div>
    <div class="bar"><i id="prog"></i></div>
  </div>

  <div id="tabs"></div>

  <div id="cards"><div class="loading">加载中…</div></div>
  <div id="focus" style="display:none"></div>

  <div id="modal">
    <div class="mbg" data-close="1"></div>
    <div class="mpanel" id="modal-panel">
      <div class="mhead"><h3 id="modal-title">签到详情</h3><button class="mclose" id="modal-close" type="button" aria-label="关闭">×</button></div>
      <div class="mbody" id="modal-body"></div>
    </div>
  </div>

  <div id="msg" class="msg"></div>
  <div id="keybox" class="keybox">
    <input id="key" type="password" inputmode="numeric" placeholder="输入访问口令后回车">
  </div>

  <div class="hint">页面分「自动签到 / 手动签到」两个标签：自动标签里的平台每天到点自动签；手动标签里的平台凭据短效或服务端拒绝自动签到，按卡面提示维护即可。<br>所有签到均在服务端执行，数据来自各平台官方接口</div>
  <div class="vtag" id="vtag" style="margin-top:14px;font-size:12px;color:var(--sub);text-align:center;opacity:.8">v20260921-4</div>
</div>

<script>
var KEY_STORE = "wb_center_key";
function $(id){ return document.getElementById(id); }
function getKey(){ try { return localStorage.getItem(KEY_STORE) || ""; } catch(e){ return ""; } }
function nz(v,d){ return (v===null||v===undefined)?d:v; }
function esc(s){ s=String(s==null?"":s); return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

var ICON_WB = `__WB_SVG__`;
var ICON_QF = `__QF_SVG__`;
var ICON_MM = `__MM_SVG__`;
var ICON_TRAE = `__TRAE_SVG__`;
var ICON_LK = `__LK_SVG__`;
var ICON_LX = `__LX_SVG__`;
var ICON_HW = `__HW_SVG__`;
var ICON_QD = `__QD_SVG__`;
var ICON_GROWTH = `__GROWTH_SVG__`;
var ICON_DAILY = `__DAILY_SVG__`;
function iconFor(it){
  if(it.icon==="wb") return ICON_WB;
  if(it.icon==="qf") return ICON_QF;
  if(it.icon==="mm") return ICON_MM;
  if(it.icon==="trae") return ICON_TRAE;
  if(it.icon==="lk") return ICON_LK;
  if(it.icon==="lx") return ICON_LX;
  if(it.icon==="huawei") return ICON_HW;
  if(it.icon==="qd") return ICON_QD;
  if(it.icon==="growth") return ICON_GROWTH;
  if(it.icon==="daily") return ICON_DAILY;
  if(it.icon==="travel") return '<div style="font-size:20px">🧳</div>';
  return '<div style="font-size:20px">🪙</div>';
}
function fmtLast(lr){
  if(lr&&lr.ts){
    var tag = (lr.source==="web")?"手动":(lr.source==="qianfan")?"百度千帆":"自动";
    return (lr.ok?"✅ ":"⚠️ ")+tag+" "+String(lr.ts).slice(5,16);
  }
  return "暂无记录";
}
function cardHTML(it){
  var manualTag = it.group==='manual' ? '<span class="badge manual">✋ 手动</span>' : '';
  if(it.disabled){
    var drows = (it.rows||[]).map(function(r){return '<div class="row"><span class="k">'+esc(r.k)+'</span><span class="v">'+esc(r.v)+'</span></div>';}).join("");
    var dentries = entriesHTML(it);
    return ''+
      '<div class="card disabled" data-name="'+esc(it.name)+'" style="--c:'+it.brand+';--c2:'+it.brand2+'">'+
        '<div class="card-main">'+
          '<div class="card-top"><div class="cicon">'+iconFor(it)+'</div><div class="ctitle">'+esc(it.title)+'</div>'+manualTag+'<span class="badge todo">已停用</span></div>'+
          '<div class="rows">'+drows+'</div>'+
          '<div class="card-acts"><button class="cta ghost recheck" data-name="'+esc(it.name)+'">重新检查</button>'+dentries+'</div>'+
        '</div>'+
      '</div>';
  }
  var needsAuth = it.needs_auth;
  var badge;
  if(it.checked) badge = '<span class="badge done">今天已签到 ✅</span>';
  else if(it.badge) badge = '<span class="badge todo">'+esc(it.badge)+'</span>';
  else if(needsAuth) badge = '<span class="badge todo">未配置</span>';
  else badge = '<span class="badge todo">今天还没签</span>';
  var rows = (it.rows||[]).map(function(r){return '<div class="row"><span class="k">'+esc(r.k)+'</span><span class="v">'+esc(r.v)+'</span></div>';}).join("");
  var last = it.last_run ? fmtLast(it.last_run) : "暂无记录";
  var lastTs = (it.last_run && it.last_run.ts) ? String(it.last_run.ts).slice(5,16) : "";
  var btn;
  if(needsAuth){
    // cookie 类平台：签到用「服务器自己那份 Cookie」，在本人浏览器登录并不会推给服务器，
    // 所以这里不摆「去登录」死路（hide_auth_link），只留一个诚实的「重新检查」。
    var retry = '<button class="cta recheck" data-name="'+esc(it.name)+'" style="margin-top:'+(it.hide_auth_link?'0px':'8px')+'">🔄 重新检查签到状态</button>';
    btn = it.hide_auth_link
      ? retry
      : ('<a class="cta-link" href="'+esc(it.auth_url)+'" target="_blank" rel="noopener">🔑 前往登录</a>' + retry);
  } else if(it.checked){
    // 已签到：顶部徽标已说明状态，底部只留一行「上次签到 + 重新检查」，不再重复「今日已签到」
    btn = '<div class="foot"><span class="ftxt">'+(lastTs?('上次签到 '+lastTs):'暂无签到记录')+'</span>'
        + '<button class="cta ghost recheck" data-name="'+esc(it.name)+'">重新检查</button></div>';
  } else {
    btn = '<button class="cta" data-name="'+esc(it.name)+'">立即签到</button>';
  }
  // 注：派猫猫旅行已不再是独立卡片，改为 WorkBuddy 卡内的入口 + 弹窗（见 entriesHTML/openTravel）
  var entries = entriesHTML(it);
  var extraLink = it.extra_link
    ? '<a class="cta-link" style="margin-top:8px;background:linear-gradient(135deg,#64748b,#94a3b8)" href="'+esc(it.extra_link.url)+'" target="_blank" rel="noopener">'+esc(it.extra_link.text)+'</a>'
    : '';
  var err = it.error ? '<div class="card-err">⚠️ '+esc(it.error)+'</div>' : '';
  return ''+
    '<div class="card" data-name="'+esc(it.name)+'" style="--c:'+it.brand+';--c2:'+it.brand2+'">'+
      '<div class="card-main">'+
        '<div class="card-top">'+
          '<div class="cicon">'+iconFor(it)+'</div>'+
          '<div class="ctitle">'+esc(it.title)+'</div>'+ manualTag + badge +
        '</div>'+
        '<div class="metric"><span class="mlabel">'+esc(it.metric_label)+'</span><br><span class="mval">'+esc(it.metric_value)+'</span></div>'+
        '<div class="rows">'+rows+'</div>'+
        (it.checked ? '' : '<div class="last">上次签到：'+last+'</div>')+
        '<div class="card-acts">'+btn + extraLink + entries + err +'</div>'+
      '</div>'+
    '</div>';
}
// WorkBuddy 卡片内的入口：成长中心 / 每日任务（新标签页）+ 派猫猫旅行（弹窗）
function entriesHTML(it){
  var ge = it.growth_entry, de = it.daily_entry, te = it.travel_entry;
  if(!ge && !de && !te) return '';
  var e = '';
  if(ge){
    var g = ge.ok
      ? ((ge.completed||0)+'/'+(ge.total||0)+' 已完成'+(ge.claimable>0?(' · 可领 '+ge.claimable+' 项'):' · 暂无待领'))
      : '暂不可用';
    e += '<a class="entry" href="?view=growth" target="_blank" rel="noopener">'
       + '<span class="eic">🌱</span><span class="etx"><b>成长中心</b><small>'+esc(g)+'</small></span><span class="earrow">›</span></a>';
  }
  if(de){
    var d = de.ok
      ? ((de.todo>0?('今日可做 '+de.todo+' 项'):'今日已全部完成')+(de.streak_days?(' · 连登 '+de.streak_days+' 天'):''))
      : '暂不可用';
    e += '<a class="entry" href="?view=daily" target="_blank" rel="noopener">'
       + '<span class="eic">🎯</span><span class="etx"><b>每日任务</b><small>'+esc(d)+'</small></span><span class="earrow">›</span></a>';
  }
  var html = e ? ('<div class="entries">'+e+'</div>') : '';
  // 派猫猫旅行：同样属于 WorkBuddy，但改成弹窗（数据量大、含明信片与操作按钮），独占一行
  if(te){
    var tt;
    if(!te.ok) tt = '暂不可用';
    else if(te.can_claim) tt = '可领 '+(te.metric||'奖励')+'，点开领取';
    else if(te.can_depart) tt = '今日还没派出，点开派出';
    else if(te.checked) tt = te.metric || '今日已完成';
    else if(te.remain) tt = te.remain;
    else tt = te.state_cn || '--';
    html += '<div class="entries">'
          + '<button class="entry" type="button" id="travelEntry" data-travel="1">'
          + '<span class="eic">🧳</span><span class="etx"><b>派猫猫旅行</b><small>'+esc(tt)+'</small></span>'
          + '<span class="earrow">›</span></button></div>';
  }
  return html;
}
// 派猫猫旅行操作按钮（状态驱动：可派/可领/巡检）—— 只在弹窗里用
function travelActionsHTML(c){
  if(c && c.needs_auth){
    return '<button class="cta recheck travel-act" type="button" data-act="poll">🔄 重新检查</button>';
  }
  var b = '';
  if(c && c.can_depart){
    b += '<button class="cta travel-act" type="button" data-act="depart">🚀 派出旅行</button>';
  }
  if(c && c.can_claim){
    b += '<button class="cta travel-act" type="button" data-act="claim">🎁 领取积分</button>';
  }
  b += '<button class="cta ghost travel-act" type="button" data-act="poll">🔄 巡检状态</button>';
  return b;
}
// ===== 派猫猫旅行弹窗（从 WorkBuddy 卡片内的入口打开，不再单独成卡）=====
var TRAVEL_MSG = null;   // 弹窗内的一次性结果条 {msg, ok}（跨刷新保留，重新打开时清空）
function openTravel(){
  TRAVEL_MSG = null;
  var panel = $('modal-panel'); if(panel) panel.style.setProperty('--mc','#F59E0B');
  var t = $('modal-title'); if(t) t.textContent = '🧳 派猫猫旅行';
  var m = $('modal'); if(m){ m.classList.add('show'); document.body.style.overflow = 'hidden'; }
  var b = $('modal-body'); if(b) b.innerHTML = '<div class="dloading"><span class="spin"></span> 加载中…</div>';
  loadTravelModal();
}
function loadTravelModal(){
  api('api/travel').then(function(d){ renderTravelModal(d); }).catch(function(e){
    var b = $('modal-body');
    if(b) b.innerHTML = '<div class="card-err">⚠️ '+esc((e&&e.message)||e||'加载失败')+'</div>';
  });
}
function renderTravelModal(d){
  var b = $('modal-body'); if(!b) return;
  if(!d || !d.ok){ b.innerHTML = '<div class="card-err">⚠️ '+esc((d&&d.error)||'加载失败')+'</div>'; return; }
  var c = d.card || {};
  if(c.error && !c.travel_state){ b.innerHTML = '<div class="card-err">⚠️ '+esc(c.error)+'</div>'; return; }
  var rows = (c.rows||[]).map(function(r){
    return '<div class="drow"><span class="dk">'+esc(r.k)+'</span><span class="dv">'+esc(r.v)+'</span></div>';
  }).join('');
  var res = TRAVEL_MSG ? ('<div class="tres '+(TRAVEL_MSG.ok?'ok':'err')+'">'+esc(TRAVEL_MSG.msg)+'</div>') : '';
  var letter = c.letter_text ? '<div class="tletter">'+esc(c.letter_text)+'</div>' : '';
  var runnote = d.running ? '<div class="fnote" style="text-align:center">⏳ 正在巡检，稍后自动刷新…</div>' : '';
  var results = '';
  if(!d.running && d.results && d.results.length){
    // 过滤掉纯技术态（status 那条），只留人话，并标上成功/失败符号
    var rs = d.results.filter(function(r){ return r.code !== 'status'; })
      .map(function(r){ return (r.ok ? '✅ ' : '⚠️ ') + (r.msg || r.code || ''); });
    if(rs.length) results = '<div class="fnote">上次巡检：'+esc(rs.join('　'))+'</div>';
  } else if(d.run_error){
    results = '<div class="fnote" style="color:#912018">⚠️ '+esc(d.run_error)+'</div>';
  }
  b.innerHTML = ''
    + '<div class="tmeta"><span class="tmetric">'+esc(c.metric_value||'--')+'</span>'
    +   '<span class="tstate">'+esc(c.state_cn||'—')+'</span></div>'
    + '<div class="drows">'+rows+'</div>'
    + res
    + letter
    + '<div class="tacts">'+travelActionsHTML(c)+'</div>'
    + runnote + results
    + '<div class="fnote">每天可把小猫派去 4 个地点之一，旅行 1~4 小时后回来领 5~10 积分。'
    + '「派出」只在今天还没派时出现；「领取」只在猫咪已回来、奖还没领时出现。'
    + '<b>自动流程</b>：每天定时签到自动派出，之后系统定时巡查、到点自动领奖，你什么都不用点。</div>';
  bindTravelModal(b);
  if(d.running) setTimeout(loadTravelModal, 3000);
}
function bindTravelModal(el){
  Array.prototype.forEach.call(el.querySelectorAll('button.travel-act[data-act]'), function(btn){
    btn.addEventListener('click', function(){ travelModalAction(btn.getAttribute('data-act'), btn); });
  });
}
function travelModalAction(act, btn){
  if(btn){ btn.disabled = true; btn.innerHTML = '<span class="spin"></span>处理中…'; }
  var url = (act==='depart') ? 'api/travel/depart' : (act==='claim' ? 'api/travel/claim' : 'api/travel/poll');
  if(act === 'poll'){
    TRAVEL_MSG = {msg:'已发起巡检，稍后自动刷新结果…', ok:true};
    api(url,{method:'POST'}).then(function(){ loadTravelModal(); }).catch(function(e){
      TRAVEL_MSG = {msg:'巡检失败：'+((e&&e.message)||e), ok:false};
      loadTravelModal();
    });
    return;
  }
  api(url,{method:'POST'}).then(function(d){
    var ok = !!d.ok;
    TRAVEL_MSG = {msg: ok ? ('✅ '+(d.msg||'操作成功')) : ('⚠️ '+(d.error||d.msg||'操作失败')), ok: ok};
    load();                 // 顺便刷新卡片上旅行入口的小字（不弹提示、不关弹窗）
    loadTravelModal();
  }).catch(function(e){
    if(e && e.needKey){
      $('keybox').className = 'keybox show';
      TRAVEL_MSG = {msg:'需要访问口令，请在下方输入后回车重试', ok:false};
    } else {
      TRAVEL_MSG = {msg:'网络错误：'+((e&&e.message)||e), ok:false};
    }
    loadTravelModal();
  });
}
function openDetail(name){
  var card = document.querySelector('.card[data-name="'+name+'"]');
  var brand = card ? (card.style.getPropertyValue('--c')||'').trim() : '';
  var panel = $('modal-panel');
  if(panel) panel.style.setProperty('--mc', brand || '#00C29A');
  var titleEl = $('modal-title');
  if(titleEl){
    var t = card && card.querySelector('.ctitle') ? card.querySelector('.ctitle').textContent : '签到详情';
    titleEl.textContent = t || '签到详情';
  }
  var m = $('modal');
  if(m){ m.classList.add('show'); document.body.style.overflow = 'hidden'; }
  loadDetail(name);
}
function closeModal(){
  var m = $('modal');
  if(m){ m.classList.remove('show'); document.body.style.overflow = ''; }
  var b = $('modal-body'); if(b) b.innerHTML = '';
}
function renderDetail(d, name){
  var detail = $('modal-body');
  if(!detail) return;
  if(!d.ok){
    detail.innerHTML = '<div class="card-err">⚠️ '+esc(d.error||'加载失败')+'</div>';
    return;
  }
  var signin = d.signin || {};
  var consumption = d.consumption || {};
  var signinHTML = '';
  if(d.name === 'workbuddy'){
    signinHTML += '<div class="drow"><span class="dk">累计积分</span><span class="dv">'+esc(signin.total||'--')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">今日已得</span><span class="dv">+'+esc(signin.today||'0')+' 分</span></div>';
    signinHTML += '<div class="drow"><span class="dk">连续签到</span><span class="dv">'+esc(signin.streak||'0')+' 天</span></div>';
    signinHTML += '<div class="drow"><span class="dk">当前活动</span><span class="dv">'+esc(signin.activity||'--')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">活动截止</span><span class="dv">'+esc(signin.end_time||'--')+'</span></div>';
  } else if(d.name === 'qianfan'){
    signinHTML += '<div class="drow"><span class="dk">累计签到天数</span><span class="dv">'+esc(signin.total_days||'--')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">今日已签</span><span class="dv">'+(signin.signed_today?'✅ 已签':'❌ 未签')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">积分总量</span><span class="dv">'+esc(consumption.total_points||'--')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">可用积分</span><span class="dv">'+esc(consumption.available||'--')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">已用积分</span><span class="dv">'+esc(consumption.used||'--')+'</span></div>';
  } else if(d.name === 'minimax'){
    signinHTML += '<div class="drow"><span class="dk">本轮签到</span><span class="dv">'+esc(signin.cycle_claimed||'0')+' / '+esc(signin.cycle_total||'7')+' 天</span></div>';
    signinHTML += '<div class="drow"><span class="dk">本轮总奖励</span><span class="dv">'+esc(signin.cycle_points||'0')+' 积分</span></div>';
    signinHTML += '<div class="drow"><span class="dk">今日奖励</span><span class="dv">+'+esc(signin.today_points||'--')+' 积分</span></div>';
    signinHTML += '<div class="drow"><span class="dk">今日状态</span><span class="dv">'+(signin.today_claimed?'✅ 已签':'❌ 未签')+'</span></div>';
  } else if(d.name === 'trae'){
    signinHTML += '<div class="drow"><span class="dk">今日状态</span><span class="dv">'+(signin.checked_today?'✅ 已签':'❌ 未签')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">每日奖励</span><span class="dv">+'+esc(signin.daily_credits||'--')+' 积分</span></div>';
    signinHTML += '<div class="drow"><span class="dk">会员额外</span><span class="dv">+'+esc(signin.extra_credits||'--')+' 积分</span></div>';
  } else if(d.name === 'lingxi'){
    signinHTML += '<div class="drow"><span class="dk">今日状态</span><span class="dv">'+(signin.checked_today?'✅ 已签':'❌ 未签')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">每日奖励</span><span class="dv">+'+esc(signin.reward||'100')+' 智点</span></div>';
    var tasks = signin.tasks || [];
    if(tasks.length){
      signinHTML += '<div class="drow"><span class="dk">可用任务</span><span class="dv">'+tasks.length+' 个</span></div>';
    }
    if(consumption.total_claimed != null){
      signinHTML += '<div class="drow"><span class="dk">累计签到</span><span class="dv">'+esc(consumption.total_claimed)+' 次</span></div>';
    }
  } else if(d.name === 'qoder'){
    signinHTML += '<div class="drow"><span class="dk">今日状态</span><span class="dv">'+(signin.checked_today?'✅ 已领':'❌ 未领')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">今日福利</span><span class="dv">'+esc(signin.benefit||'--')+'</span></div>';
    signinHTML += '<div class="drow"><span class="dk">有效期限</span><span class="dv">'+esc(signin.validity||'--')+'</span></div>';
    if(signin.window){ signinHTML += '<div class="drow"><span class="dk">领取窗口</span><span class="dv">'+esc(signin.window)+'</span></div>'; }
  }
  var history = signin.history || [];
  var historyHTML = '';
  if(history.length){
historyHTML = '<h4>签到历史</h4>';
historyHTML += history.slice(0,5).map(function(h){
      var ok = h.ok===true || h.ok===1 || h.status==="signed" || h.status==="success" || h.status==="ok" || h.status===1 || h.status==="1";
      return '<div class="drow"><span class="dk">'+esc(h.ts||h.date||'--')+'</span><span class="dv">'+(ok?'✅ ':'⚠️ ')+esc(h.message||(ok?'签到成功':'未签到'))+'</span></div>';
    }).join('');
  } else {
    historyHTML = '<div class="dempty">暂无签到历史记录</div>';
  }
  var consumeHTML = '';
  if(d.name === 'workbuddy'){
    consumeHTML += '<div class="drow"><span class="dk">资源余额</span><span class="dv">'+esc(consumption.remaining||'--')+' 分</span></div>';
    consumeHTML += '<div class="drow"><span class="dk">昨日消耗</span><span class="dv">'+esc(consumption.usage_yesterday||'--')+' 分</span></div>';
    var pkgs = consumption.packages || [];
    if(pkgs.length){
      consumeHTML += '<h4>资源包</h4>';
consumeHTML += pkgs.map(function(p){
        return '<div class="drow"><span class="dk">'+esc(p.name||'资源包')+'</span><span class="dv">剩 '+esc(nz(p.remain,'--'))+' / 共 '+esc(nz(p.capacity,'--'))+'</span></div>';
      }).join('');
    }
  } else if(d.name === 'qianfan'){
    consumeHTML += '<div class="drow"><span class="dk">总积分</span><span class="dv">'+esc(consumption.total_points||'--')+'</span></div>';
    consumeHTML += '<div class="drow"><span class="dk">可用积分</span><span class="dv">'+esc(consumption.available||'--')+'</span></div>';
    consumeHTML += '<div class="drow"><span class="dk">已用积分</span><span class="dv">'+esc(consumption.used||'--')+'</span></div>';
  } else if(d.name === 'minimax' || d.name === 'trae' || d.name === 'qoder'){
    consumeHTML += '<div class="dempty">'+esc(consumption.note||'暂无消耗数据')+'</div>';
  } else if(d.name === 'lingxi'){
    if(consumption.total_claimed != null){
      consumeHTML += '<div class="drow"><span class="dk">累计智点</span><span class="dv">'+esc(consumption.total_claimed)+'</span></div>';
    } else {
      consumeHTML += '<div class="dempty">暂无消耗数据</div>';
    }
  }
detail.innerHTML = ''+
    '<div class="dtab"><span class="on" data-tab="signin">签到详情</span><span data-tab="consume">消耗详情</span></div>'+
    '<div class="dsec on" id="dsec-'+name+'-signin">'+signinHTML+historyHTML+'</div>'+
    '<div class="dsec" id="dsec-'+name+'-consume">'+consumeHTML+'</div>';
  var tabs = detail.querySelectorAll('.dtab span');
  Array.prototype.forEach.call(tabs, function(t){
    t.addEventListener('click', function(){ switchTab(t, name, t.getAttribute('data-tab')); });
  });
}
function switchTab(el, name, tab){
  var tabs = el.parentElement.querySelectorAll('span');
  Array.prototype.forEach.call(tabs, function(t){ t.className = ''; });
  el.className = 'on';
  var secs = $('modal-body').querySelectorAll('.dsec');
  Array.prototype.forEach.call(secs, function(s){ s.className = 'dsec'; });
  var t = $('dsec-'+name+'-'+tab); if(t) t.className = 'dsec on';
}
function loadDetail(name){
  var body = $('modal-body');
  if(!body) return;
  body.innerHTML = '<div class="dloading"><span class="spin"></span> 加载中…</div>';
  api('api/detail?name='+encodeURIComponent(name)).then(function(d){
    renderDetail(d, name);
  }).catch(function(e){
    body.innerHTML = '<div class="card-err">⚠️ '+(e&&e.message||'加载失败')+'</div>';
  });
}
// ===== 成长中心独立页（?view=growth）=====
function focusBody(){ return $('fbody') || $('focus'); }
function focusErr(e){
  if(e&&e.needKey){ var kb=$("keybox"); if(kb) kb.className="keybox show"; return '<div class="fnote" style="color:#912018">需要访问口令，请在下方输入后回车</div>'; }
  return '<div class="fnote" style="color:#912018">⚠️ '+esc((e&&e.message)||e||'加载失败')+'</div>';
}
function taskRow(t, right){
  var meta = [];
  if(t.target) meta.push('进度 '+t.current+'/'+t.target);
  if(t.reward) meta.push('+'+t.reward+' 分');
  if(t.energy) meta.push('+'+t.energy+' 能量');
  var sub = meta.length ? ('<div class="t2">'+esc(meta.join(' · '))+'</div>') : '';
  var hint = t.hint ? ('<div class="t2">💡 '+esc(t.hint)+'</div>') : '';
  return '<div class="task"><div class="tt"><div class="t1">'+esc(t.title)+'</div>'+sub+hint+'</div><div class="tr">'+right+'</div></div>';
}
function focusGrowth(){
  var el = focusBody();
  el.innerHTML = '<div class="dloading" style="padding:40px 0"><span class="spin"></span> 加载成长中心…</div>';
  api("api/growth").then(function(d){ renderGrowthFocus(d); }).catch(function(e){ el.innerHTML = focusErr(e); });
}
function renderGrowthFocus(d){
  var el = focusBody();
  if(!d.ok){ el.innerHTML = focusErr(d.error); return; }
  var c = d.card||{};
  var rows = c.rows||[];
  var claim = rows.filter(function(t){ return t.status==="completed"; });
  var pending = rows.filter(function(t){ return t.status!=="completed" && t.status!=="claimed"; });
  var done = rows.filter(function(t){ return t.status==="claimed"; });
  var html = ''
    + '<div class="fhead" style="--c:#7C5CFF;--c2:#9D7BFF">'
    +   '<h2>🌱 WorkBuddy 成长中心</h2>'
    +   '<div class="fmeta">一次性成长任务 · 完成后领积分 / 能量</div>'
    +   '<div class="fstat">已完成 '+(c.completed||0)+' / '+(c.total||0)+'　·　Lv.'+(c.level==null?'-':c.level)+'　·　待领 '+claim.length+' 项</div>'
    + '</div>'
    + (d.running ? '<div class="fnote" style="text-align:center">⏳ 正在后台执行，完成后自动刷新…</div>' : '')
    + '<button class="btn-mini growth-run" style="width:100%;padding:14px;font-size:15px;--c:#7C5CFF;--c2:#9D7BFF">🚀 一键完成 / 领取</button>'
    + '<div class="fnote">「一键」会自动尝试上报进度并领取<b>已完成</b>任务的奖励；但服务端会校验真实操作，'
    + '<b>标 🔒 / 💡 的任务必须在 WorkBuddy 客户端真实操作</b>（召唤专家、打开应用、用模板、夜间访问等）后才会记功，接口上报不会推进进度。</div>';
  if(claim.length){
    html += '<div class="fgroup"><h4>🎁 可领取（'+claim.length+'）</h4>'
      + claim.map(function(t){ return taskRow(t, '<button class="btn-mini claim" data-code="'+esc(t.code)+'">领取 +'+(t.reward||0)+'</button>'); }).join('')
      + '</div>';
  }
  if(pending.length){
    html += '<div class="fgroup"><h4>⏳ 待完成（'+pending.length+'）</h4>'
      + pending.map(function(t){ return taskRow(t, '<span class="st '+(t.not_auto?'locked':'todo')+'">'+(t.not_auto?'🔒 需手动':'待完成')+'</span>'); }).join('')
      + '</div>';
  }
  if(done.length){
    html += '<div class="fgroup"><h4>✅ 已领取（'+done.length+'）</h4>'
      + done.map(function(t){ return taskRow(t, '<span class="st claimed">已领</span>'); }).join('')
      + '</div>';
  }
  if(d.results && d.results.length){
    var ok=0; d.results.forEach(function(r){ if(r.ok) ok++; });
    html += '<div class="fnote">上次一键执行：成功 '+ok+' / '+d.results.length+(d.updated?(' · '+esc(d.updated.slice(5))):'')+'</div>';
  } else if(d.run_error){
    html += '<div class="fnote" style="color:#912018">⚠️ '+esc(d.run_error)+'</div>';
  }
  el.innerHTML = html;
  bindFocusButtons(el);
}
function runGrowth(btn){
  if(btn){ btn.disabled=true; btn.innerHTML='<span class="spin"></span>执行中…'; }
  showMsg("成长中心任务正在后台执行，请稍候…","ok");
  api("api/growth/run",{method:"POST"}).then(function(d){
    if(!d.ok){ showMsg(d.error||"启动失败","err"); if(btn){ btn.disabled=false; btn.innerHTML="🚀 一键完成 / 领取"; } return; }
    pollGrowth();
  }).catch(function(e){
    if(e&&e.needKey){ $("keybox").className="keybox show"; showMsg("请输入访问口令后回车","err"); }
    else showMsg("网络错误："+(e&&e.message),"err");
    if(btn){ btn.disabled=false; btn.innerHTML="🚀 一键完成 / 领取"; }
  });
}
function pollGrowth(){
  api("api/growth").then(function(d){
    if(d.running){ setTimeout(pollGrowth, 2500); return; }
    var ok=0, tot=(d.results||[]).length;
    (d.results||[]).forEach(function(r){ if(r.ok) ok++; });
    if(tot) showMsg("成长中心：成功 "+ok+" / "+tot+" 项 ✅","ok");
    else if(d.run_error) showMsg("执行出错："+d.run_error,"err");
    renderGrowthFocus(d);
  }).catch(function(e){ showMsg("刷新失败："+(e&&e.message),"err"); });
}
function claimTask(code, btn){
  if(btn){ btn.disabled=true; btn.innerHTML='<span class="spin"></span>'; }
  api("api/growth/claim?code="+encodeURIComponent(code),{method:"POST"}).then(function(d){
    if(d.ok) showMsg(d.msg||"领取成功 ✅","ok"); else showMsg(d.msg||d.error||"领取失败","err");
    focusGrowth();
  }).catch(function(e){
    if(e&&e.needKey){ $("keybox").className="keybox show"; showMsg("请输入访问口令后回车","err"); }
    else showMsg("网络错误："+(e&&e.message),"err");
    if(btn){ btn.disabled=false; }
  });
}
// ===== 每日任务独立页（?view=daily）=====
function focusDaily(){
  var el = focusBody();
  el.innerHTML = '<div class="dloading" style="padding:40px 0"><span class="spin"></span> 加载每日任务…</div>';
  api("api/daily").then(function(d){ renderDailyFocus(d); }).catch(function(e){ el.innerHTML = focusErr(e); });
}
function renderDailyFocus(d){
  var el = focusBody();
  if(!d.ok){ el.innerHTML = focusErr(d.error); return; }
  var c = d.card||{};
  var rows = c.rows||[];
  var html = ''
    + '<div class="fhead" style="--c:#F79009;--c2:#FDB022">'
    +   '<h2>🎯 成长中心 · 每日任务</h2>'
    +   '<div class="fmeta">成长中心里「每天刷新」的部分，与上面的一次性成长任务互补，二者不重复</div>'
    +   '<div class="fstat">连登 '+(c.streak_days||0)+' 天　·　能量 '+(c.energy==null?'--':c.energy)+'　·　今日可做 '+(c.claimable||0)+' 项</div>'
    + '</div>'
    + (d.running ? '<div class="fnote" style="text-align:center">⏳ 正在后台执行，完成后自动刷新…</div>' : '')
    + '<button class="btn-mini daily-run" style="width:100%;padding:14px;font-size:15px;--c:#F79009;--c2:#FDB022">🎯 一键做完每日任务</button>'
    + '<div class="fnote">每日动作：<b>每日签到</b>（领积分）、<b>连登兑换</b>（7/14/28 天档，每月各 1 次，给积分+能量+补登卡+抽奖次数）、'
    + '<b>补登卡</b>（补当月断登、保住连登天数）、<b>任务轮盘</b>（抽奖）、<b>Buddy 盲盒</b>（消耗能量开盒）。已完成的会自动跳过。</div>'
    + '<div class="fgroup"><h4>今日动作</h4>';
  if(rows.length){
    html += rows.map(function(t){
      var st = t.status==="done" ? '<span class="st claimed">✅ 已完成</span>'
             : t.status==="locked" ? '<span class="st locked">🔒 未解锁</span>'
             : '<span class="st todo">⏳ 待做</span>';
      var meta = [];
      if(t.reward) meta.push(t.reward);
      if(t.note) meta.push(t.note);
      return '<div class="task"><div class="tt"><div class="t1">'+esc(t.title)+'</div>'
        + (meta.length?('<div class="t2">'+esc(meta.join(' · '))+'</div>'):'')
        + (t.detail?('<div class="t2">'+esc(t.detail)+'</div>'):'')
        + '</div><div class="tr">'+st+'</div></div>';
    }).join('');
  } else {
    html += '<div class="dempty">暂无任务数据</div>';
  }
  html += '</div>';
  if(d.results && d.results.length){
    var ok=0; d.results.forEach(function(r){ if(r.ok) ok++; });
    html += '<div class="fnote">上次一键执行：成功 '+ok+' / '+d.results.length+(d.updated?(' · '+esc(d.updated.slice(5))):'')+'</div>';
  } else if(d.run_error){
    html += '<div class="fnote" style="color:#912018">⚠️ '+esc(d.run_error)+'</div>';
  }
  el.innerHTML = html;
  bindFocusButtons(el);
}
function runDaily(btn){
  if(btn){ btn.disabled=true; btn.innerHTML='<span class="spin"></span>执行中…'; }
  showMsg("每日任务正在后台执行，请稍候…","ok");
  api("api/daily/run",{method:"POST"}).then(function(d){
    if(!d.ok){ showMsg(d.error||"启动失败","err"); if(btn){ btn.disabled=false; btn.innerHTML="🎯 一键做完每日任务"; } return; }
    pollDaily();
  }).catch(function(e){
    if(e&&e.needKey){ $("keybox").className="keybox show"; showMsg("请输入访问口令后回车","err"); }
    else showMsg("网络错误："+(e&&e.message),"err");
    if(btn){ btn.disabled=false; btn.innerHTML="🎯 一键做完每日任务"; }
  });
}
function pollDaily(){
  api("api/daily").then(function(d){
    if(d.running){ setTimeout(pollDaily, 2500); return; }
    var ok=0, tot=(d.results||[]).length;
    (d.results||[]).forEach(function(r){ if(r.ok) ok++; });
    if(tot) showMsg("每日任务：成功 "+ok+" / "+tot+" 项 ✅","ok");
    else if(d.run_error) showMsg("执行出错："+d.run_error,"err");
    renderDailyFocus(d);
  }).catch(function(e){ showMsg("刷新失败："+(e&&e.message),"err"); });
}
function bindFocusButtons(el){
  Array.prototype.forEach.call(el.querySelectorAll('button.growth-run'), function(b){ b.addEventListener('click', function(){ runGrowth(b); }); });
  Array.prototype.forEach.call(el.querySelectorAll('button.daily-run'), function(b){ b.addEventListener('click', function(){ runDaily(b); }); });
  Array.prototype.forEach.call(el.querySelectorAll('button.claim'), function(b){ b.addEventListener('click', function(){ claimTask(b.getAttribute('data-code'), b); }); });
}
function showFocus(view){
  var sum=document.querySelector('.summary'); if(sum) sum.style.display='none';
  var cards=$('cards'); if(cards) cards.style.display='none';
  var hint=document.querySelector('.hint'); if(hint) hint.style.display='none';
  var h1=document.querySelector('.brand h1'); if(h1) h1.textContent = (view==='growth'?'成长中心':(view==='settings'?'设置':'每日任务'));
  var p=document.querySelector('.brand p'); if(p) p.textContent = (view==='settings'?'傻瓜式配置你的签到中心':'WorkBuddy 成长中心');
  var el=$('focus'); el.style.display='block';
  el.innerHTML = '<a class="back" id="backBtn">‹ 返回签到中心</a><div id="fbody"></div>';
  $('backBtn').addEventListener('click', function(){ location.href = location.pathname; });
  if(view==='growth') focusGrowth();
  else if(view==='settings') focusSettings();
  else focusDaily();
}
var PLATFORMS = {workbuddy:"WorkBuddy",qianfan:"百度千帆",minimax:"MiniMax Code",qoder:"Qoder",linkai:"Link AI",travel:"派猫猫旅行",lingxi:"WPS 灵犀",trae:"Trae Work",huawei:"华为码道"};
function focusSettings(){
  var el=$('focus');
  el.innerHTML='<a class="back" id="backBtn">‹ 返回签到中心</a><div id="fbody" class="settings"></div>';
  $('backBtn').addEventListener('click', function(){ location.href = location.pathname; });
  renderSettings();
}
function renderSettings(){
  api("api/settings").then(function(s){
    var plat=s.platforms||{};
    var ph='';
    Object.keys(PLATFORMS).forEach(function(k){
      var on = (k in plat)? (!!plat[k]) : true;
      ph+='<label class="row-toggle"><span>'+esc(PLATFORMS[k])+'</span><input type="checkbox" data-plat="'+k+'" '+(on?'checked':'')+'></label>';
    });
    var html=''
      +'<div class="fgroup"><h4>⏰ 定时签到</h4>'
      +'<label class="fld"><span>启用自动签到</span><input type="checkbox" id="schedOn" '+((s.schedule_enabled===false)?'':'checked')+'></label>'
      +'<label class="fld"><span>每日签到时间</span><input type="time" id="schedTime" value="'+esc(s.schedule_time||"08:35")+'"></label>'
      +'<p class="ftip">到点后自动跑全部已启用平台。若服务器另有 systemd 定时任务未关闭，会再跑一次，结果幂等无副作用。</p>'
      +'</div>'
      +'<div class="fgroup"><h4>🔑 中心访问口令</h4>'
      +'<label class="fld"><span>当前状态</span><span class="fval">'+(s.key_set?'页面已单独设置':'沿用服务器环境变量')+'</span></label>'
      +'<label class="fld col"><span>新口令（留空=不变）</span><input type="password" id="newKey" placeholder="输入新口令"></label>'
      +'<p class="ftip">修改后立即生效；保存后本机需用新口令访问。</p>'
      +'</div>'
      +'<div class="fgroup"><h4>🎚 平台开关</h4>'+ph+'</div>'
      +'<div class="fgroup"><h4>🔔 完成通知</h4>'
      +'<label class="fld"><span>启用通知</span><input type="checkbox" id="notifyOn" '+(s.notify_on?'checked':'')+'></label>'
      +'<label class="fld col"><span>Webhook 地址</span><input type="text" id="webhook" value="'+esc(s.notify_webhook||"")+'" placeholder="https://.../webhook"></label>'
      +'<button class="btn-mini" id="testWebhook" type="button">测试推送</button>'
      +'<p class="ftip">支持「推送到个人微信」的地址：<br>· PushPlus：<code>https://www.pushplus.plus/send/你的token</code>（需先在 pushplus.plus 绑定微信）<br>· Server酱：<code>https://sctapi.ftqq.com/你的SendKey.send</code>（免费 5 条/天）<br>· 企业微信群机器人：<code>https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx</code>（消息进企业微信，非个人微信）<br>填好点「测试推送」验证，每天签到跑完自动发摘要。</p>'
      +'</div>'
      +'<div style="text-align:center;padding:6px 0 18px"><button class="cta" id="saveSettings" type="button">💾 保存设置</button></div>';
    $('fbody').innerHTML=html;
    $('saveSettings').addEventListener('click', saveSettings);
    $('testWebhook').addEventListener('click', testWebhook);
  }).catch(function(e){ showMsg("读取设置失败："+(e&&e.message),"err"); });
}
function saveSettings(){
  var plat={};
  Array.prototype.forEach.call(document.querySelectorAll('input[data-plat]'), function(c){ plat[c.getAttribute('data-plat')]=c.checked; });
  var body={
    schedule_enabled: $('schedOn').checked,
    schedule_time: $('schedTime').value || '08:35',
    access_key: $('newKey').value || '',
    platforms: plat,
    notify_on: $('notifyOn').checked,
    notify_webhook: ($('webhook').value||'').trim(),
  };
  api("api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}).then(function(r){
    if(r.ok){
      var nk=($('newKey').value||'').trim();
      if(nk){ try{ localStorage.setItem(KEY_STORE, nk); }catch(e){} }
      showMsg("设置已保存 ✅","ok");
    } else showMsg("保存失败："+(r.error||"未知错误"),"err");
  }).catch(function(e){ showMsg("保存失败："+(e&&e.message),"err"); });
}
function testWebhook(){
  var url=($('webhook').value||'').trim();
  if(!url){ showMsg("请先填写 Webhook 地址","err"); return; }
  api("api/settings/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({webhook:url})}).then(function(r){
    showMsg(r.ok?"测试推送已发送 ✅":("推送失败："+(r.error||"")),"ok");
  }).catch(function(e){ showMsg("测试失败："+(e&&e.message),"err"); });
}
function showMsg(t,kind){ var m=$("msg"); m.textContent=t; m.className="msg show "+(kind||"ok"); }
function hideMsg(){ $("msg").className="msg"; }
function api(path,opts){
  var k=getKey();
  var url=path+(k?(path.indexOf("?")>=0?"&":"?")+"k="+encodeURIComponent(k):"");
  return fetch(url,opts||{}).then(function(r){ if(r.status===401){var e=new Error("need key");e.needKey=true;throw e;} return r.json(); });
}
var LAST_CENTER = null;
var TAB = (function(){ try { return localStorage.getItem('wb_tab') || 'auto'; } catch(e){ return 'auto'; } })();

function manualCardHTML(it){
  var g = it.manual_guide || {};
  var steps = (g.steps||[]).map(function(s){ return '<li>'+esc(s)+'</li>'; }).join("");
  var badge = it.badge ? '<span class="badge todo">'+esc(it.badge)+'</span>' : '<span class="badge todo">待处理</span>';
  var rows = (it.rows||[]).map(function(r){return '<div class="row"><span class="k">'+esc(r.k)+'</span><span class="v">'+esc(r.v)+'</span></div>';}).join("");
  var retry = '<button class="cta recheck" data-name="'+esc(it.name)+'">🔄 重新检查签到状态</button>';
  var browserLink = (g.cta_url) ? '<a class="cta-link" style="margin-top:8px;background:linear-gradient(135deg,#64748b,#94a3b8)" href="'+esc(g.cta_url)+'" target="_blank" rel="noopener">🔗 '+esc(g.cta_label||'在浏览器打开')+'</a>' : '';
  var guide = (g.title||g.note||steps) ? '<div class="mguide">'
      + (g.title?'<div class="mg-title">'+esc(g.title)+'</div>':'')
      + (g.note?'<div class="mg-note">'+esc(g.note)+'</div>':'')
      + (steps?'<ol class="mg-steps">'+steps+'</ol>':'')
    + '</div>' : '';
  return ''
    + '<div class="card manual-card" data-name="'+esc(it.name)+'" style="--c:'+it.brand+';--c2:'+it.brand2+'">'
    +   '<div class="card-main">'
    +     '<div class="card-top"><div class="cicon">'+iconFor(it)+'</div><div class="ctitle">'+esc(it.title)+'</div>'+badge+'</div>'
    +     guide
    +     '<div class="rows">'+rows+'</div>'
    +     '<div class="card-acts">'+retry + browserLink+'</div>'
    +   '</div>'
    + '</div>';
}

function renderTabs(aN, aD, mN, mT){
  var el = $('tabs'); if(!el) return;
  el.innerHTML =
    '<button class="tab '+(TAB==='auto'?'on':'')+'" data-tab="auto"><span class="tc"><span>🤖 自动签到</span><span class="cnt">'+aD+'/'+aN+'</span></span></button>'
    + '<button class="tab '+(TAB==='manual'?'on':'')+'" data-tab="manual"><span class="tc"><span>✋ 手动签到</span><span class="cnt">'+mT+' 待处理</span></span></button>';
  Array.prototype.forEach.call(el.querySelectorAll('.tab'), function(t){
    t.addEventListener('click', function(){
      TAB = t.getAttribute('data-tab');
      try { localStorage.setItem('wb_tab', TAB); } catch(e){}
      renderCenter(LAST_CENTER);
    });
  });
}

function renderCenter(d){
  if(!d.ok){ $("summary").textContent="读取失败"; showMsg(d.error||"读取失败","err"); return; }
  LAST_CENTER = d;
  $("summary").textContent = "已签 "+d.signed_count+" / "+d.total_count;
  var pct = d.total_count ? Math.round(d.signed_count/d.total_count*100) : 0;
  $("prog").style.width = pct+"%";
  var auto = d.items.filter(function(it){ return it.group!=='manual'; });
  var manual = d.items.filter(function(it){ return it.group==='manual'; });
  var autoDone = auto.filter(function(it){ return it.checked && !it.disabled; }).length;
  var manualTodo = manual.filter(function(it){ return !it.checked || it.needs_auth; }).length;
  renderTabs(auto.length, autoDone, manual.length, manualTodo);
  var items = (TAB==='manual') ? manual : auto;
  var html = "";
  if(TAB==='auto'){
    html += '<div class="tab-actions"><button class="cta ghost slim" id="runAll">🔄 立即全部签到</button>'
          + '<span class="tab-hint">全自动平台，到点（设置里的时间）也会自动签；此按钮可随时手动触发一次</span></div>';
  } else {
    html += '<div class="tab-hint block">以下平台的凭据短效或服务端拒绝自动签到，需你偶尔手动维护。按卡面提示操作即可，完成后点「重新检查签到状态」同步。</div>';
  }
  if(!items.length){ html += '<div class="dempty">该分组暂无平台</div>'; }
  items.forEach(function(it){
    if(TAB==='manual' && it.needs_auth && it.manual_guide){ html += manualCardHTML(it); }
    else { html += cardHTML(it); }
  });
  $("cards").innerHTML = html;
  // 卡片点击打开详情模态（手动卡不弹详情，聚焦指引）
  Array.prototype.forEach.call(document.querySelectorAll('.card'), function(c){
    if(c.classList.contains('manual-card')) return;
    c.addEventListener('click', function(e){
      var name = c.getAttribute('data-name');
      if(!name) return;
      if(e.target.closest('button.cta') || e.target.closest('.cta-link') || e.target.closest('.entry')) return;
      openDetail(name);
    });
  });
  // 立即签到（排除成长/每日任务、重新检查、旅行专属按钮）
  Array.prototype.forEach.call(document.querySelectorAll("button.cta[data-name]:not(.recheck):not(.growth-run):not(.daily-run):not(.travel-act)"), function(b){
    b.addEventListener("click", function(){ doCheckin(b.getAttribute("data-name"), b); });
  });
  // WorkBuddy 卡内的「派猫猫旅行」入口 → 打开弹窗
  // 注意：弹窗里的按钮由 bindTravelModal() 单独绑定；这里只绑卡片内的入口，避免重复触发。
  Array.prototype.forEach.call(document.querySelectorAll('button.entry[data-travel]'), function(b){
    b.addEventListener('click', function(ev){ if(ev && ev.stopPropagation) ev.stopPropagation(); openTravel(); });
  });
  // 重新检查签到状态（只刷新、不执行签到）
  Array.prototype.forEach.call(document.querySelectorAll("button.cta.recheck[data-name]"), function(b){
    b.addEventListener("click", function(){ recheck(b.getAttribute("data-name"), b); });
  });
  // 自动 Tab 的「立即全部签到」
  var ra = $('runAll'); if(ra) ra.addEventListener('click', runAllAuto);
}

function recheck(name, btn){
  if(btn){ btn.disabled=true; btn.innerHTML='<span class="spin"></span>检查中…'; }
  api("api/center/checkin?name="+encodeURIComponent(name)+"&mode=refresh",{method:"POST"}).then(function(d){
    load(function(){ showMsg((d.card&&d.card.title?d.card.title:"")+" 状态已刷新 ✅","ok"); });
  }).catch(function(e){
    if(e&&e.needKey){ $("keybox").className="keybox show"; showMsg("请输入访问口令后回车","err"); if(btn){btn.disabled=false;btn.textContent="重试";} return; }
    var msg="网络错误："+((e&&e.message)||e); load(function(){ showMsg(msg,"err"); });
  });
}

function runAllAuto(){
  var b=$('runAll'); if(b){ b.disabled=true; b.innerHTML='<span class="spin"></span>签到中…'; }
  api("api/center/checkin/all?scope=auto",{method:"POST"}).then(function(d){
    if(d.ok){
      showMsg("已启动自动签到，稍后自动刷新…","ok");
      setTimeout(function(){ load(); }, 6000);
    } else {
      showMsg(d.error||"启动失败","err");
      if(b){ b.disabled=false; b.textContent="🔄 立即全部签到"; }
    }
  }).catch(function(e){
    showMsg("网络错误："+((e&&e.message)||e),"err");
    if(b){ b.disabled=false; b.textContent="🔄 立即全部签到"; }
  });
}
function load(cb){
  hideMsg();
  $("cards").innerHTML = '<div class="loading"><span class="spin"></span><span class="ld">加载中…</span></div>';
  api("api/center").then(function(d){ renderCenter(d); if(cb) cb(); }).catch(function(e){
    if(e&&e.needKey){ $("keybox").className="keybox show"; showMsg("请输入访问口令后回车","err"); }
    else { showMsg("连接失败："+(e&&e.message),"err"); }
  });
}
// 在卡片内部留一条持久错误提示（不随 load 刷新消失，方便回看失败原因）
function markCardErr(name,msg){
  var c = document.querySelector('.card[data-name="'+name+'"]');
  if(!c) return;
  var cm = c.querySelector('.card-main');
  if(!cm || cm.querySelector('.card-err.js')) return;
  var d = document.createElement('div');
  d.className = 'card-err js';
  d.textContent = '⚠️ ' + msg;
  cm.appendChild(d);
}
function doCheckin(name,btn){
  if(btn){ btn.disabled=true; btn.innerHTML='<span class="spin"></span>签到中…'; }
  api("api/center/checkin?name="+encodeURIComponent(name),{method:"POST"}).then(function(d){
    var ok = !!d.ok;
    var msg = ok ? ((d.card&&d.card.title?d.card.title:"签到")+" 已更新 ✅") : (d.error||"签到失败");
    // 注意：load() 内部第一件事就是 hideMsg()，所以提示必须在刷新「之后」再显示。
    // 旧写法先 showMsg 再 load，提示被瞬间清掉 —— 这就是「点了没反应」的根因。
    load(function(){ showMsg(msg, ok?"ok":"err"); if(!ok) markCardErr(name,msg); });
  }).catch(function(e){
    if(e&&e.needKey){
      $("keybox").className="keybox show";
      showMsg("请输入访问口令后回车","err");
      if(btn){ btn.disabled=false; btn.textContent="重试"; }
      return;
    }
    var msg = "网络错误："+((e&&e.message)||e);
    load(function(){ showMsg(msg,"err"); markCardErr(name,msg); });
  });
}
// （原 travelAction 已废弃：旅行动作改在弹窗内由 travelModalAction 处理）
var VIEW = null;
try { VIEW = new URLSearchParams(location.search).get("view"); } catch(e){}
$("key").addEventListener("change", function(e){
  try { localStorage.setItem(KEY_STORE, e.target.value.trim()); } catch(err){}
  if(VIEW==="growth") focusGrowth(); else if(VIEW==="daily") focusDaily(); else load();
});
(function bindModal(){
  var m = $('modal'); if(!m) return;
  var close = $('modal-close'); if(close) close.addEventListener('click', closeModal);
  var bg = m.querySelector('.mbg'); if(bg) bg.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && m.classList.contains('show')) closeModal();
  });
})();
if(VIEW==="growth" || VIEW==="daily" || VIEW==="settings"){ showFocus(VIEW); } else { load(); }
</script>
</body>
</html>
"""
PAGE = PAGE.replace("__WB_SVG__", WB_SVG)
PAGE = PAGE.replace("__QF_SVG__", QF_SVG)
PAGE = PAGE.replace("__MM_SVG__", MM_SVG)
PAGE = PAGE.replace("__TRAE_SVG__", TRAE_SVG)
PAGE = PAGE.replace("__LK_SVG__", LK_SVG)
PAGE = PAGE.replace("__LX_SVG__", LX_SVG)
PAGE = PAGE.replace("__HW_SVG__", HW_SVG)
PAGE = PAGE.replace("__QD_SVG__", QD_SVG)
PAGE = PAGE.replace("__GROWTH_SVG__", GROWTH_SVG)
PAGE = PAGE.replace("__DAILY_SVG__", DAILY_SVG)


# ============================ HTTP 服务 ============================
class Handler(BaseHTTPRequestHandler):
    server_version = "WBCheckinWeb/1.0"

    def _send(self, code, body, ctype):
        data = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        try:
            self.wfile.write(data)
        except Exception:
            pass

    def _json(self, code, obj):
        self._send(
            code, json.dumps(obj, ensure_ascii=False), "application/json; charset=utf-8"
        )

    def _key_ok(self, query):
        if not current_key():
            return True
        got = (query.get("k", [""])[0]) or self.headers.get("X-Access-Key", "")
        return got == current_key()

    def do_GET(self):
        u = urlparse(self.path)
        if u.path in ("/", "/index.html"):
            self._send(200, PAGE, "text/html; charset=utf-8")
            return
        if u.path == "/api/status":
            if not self._key_ok(parse_qs(u.query)):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                r = get_status()
                r["ok"] = True
                r["last_run"] = read_last_run()
                r["server_time"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                self._json(200, r)
            except Exception as e:
                self._json(
                    200, {"ok": False, "error": str(e), "last_run": read_last_run()}
                )
            return
        if u.path == "/api/center":
            if not self._key_ok(parse_qs(u.query)):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                self._json(200, get_center())
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/growth":
            if not self._key_ok(parse_qs(u.query)):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                card = get_growth_card()
                self._json(200, {
                    "ok": True,
                    "card": card,
                    "running": _GROWTH_RUN["running"],
                    "results": _GROWTH_RUN["results"],
                    "updated": _GROWTH_RUN["updated"],
                    "run_error": _GROWTH_RUN["error"],
                })
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/daily":
            if not self._key_ok(parse_qs(u.query)):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                self._json(200, {
                    "ok": True,
                    "card": get_daily_card(),
                    "running": _DAILY_RUN["running"],
                    "results": _DAILY_RUN["results"],
                    "updated": _DAILY_RUN["updated"],
                    "run_error": _DAILY_RUN["error"],
                })
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/detail":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            name = (q.get("name") or [""])[0]
            try:
                self._json(200, get_detail(name))
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/travel":
            if not self._key_ok(parse_qs(u.query)):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                self._json(200, {
                    "ok": True,
                    "card": get_travel_card(),
                    "running": _TRAVEL_RUN["running"],
                    "results": _TRAVEL_RUN["results"],
                    "updated": _TRAVEL_RUN["updated"],
                    "run_error": _TRAVEL_RUN["error"],
                })
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/settings":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            self._json(200, {
                "ok": True,
                "schedule_enabled": bool(SETTINGS.get("schedule_enabled", True)),
                "schedule_time": SETTINGS.get("schedule_time", "08:35"),
                "key_set": bool(SETTINGS.get("access_key")),
                "platforms": SETTINGS.get("platforms", {}),
                "notify_on": bool(SETTINGS.get("notify_on", False)),
                "notify_webhook": SETTINGS.get("notify_webhook", ""),
            })
            return
        self._send(404, "not found", "text/plain; charset=utf-8")

    def do_POST(self):
        u = urlparse(self.path)
        if u.path == "/api/checkin":
            if not self._key_ok(parse_qs(u.query)):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                r = do_checkin()
                r["ok"] = True
                r["last_run"] = read_last_run()
                # 让响应结构与 /api/status 对齐：把 last_run 一并塞进 status，
                # 这样前端 render(d.status) 也能正确显示「上次签到」（否则签到后显示暂无记录）
                if isinstance(r.get("status"), dict):
                    r["status"]["last_run"] = r["last_run"]
                self._json(200, r)
            except Exception as e:
                self._json(
                    200, {"ok": False, "error": str(e), "last_run": read_last_run()}
                )
            return
        if u.path == "/api/center/checkin":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            name = (q.get("name") or [""])[0]
            mode = (q.get("mode") or ["sign"])[0]
            try:
                if mode == "refresh":
                    # 仅刷新状态，不执行签到（用于「重新检查签到状态」）
                    # force_live：华为等短效会话平台做一次真实查询，而非读当日缓存
                    card = get_card_for(name, force_live=True)
                else:
                    card = run_checkin_for(name)
                self._json(200, {"ok": True, "name": name, "card": card})
            except Exception as e:
                self._json(200, {"ok": False, "name": name, "error": str(e)})
            return
        if u.path == "/api/center/checkin/all":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            scope = (q.get("scope") or ["all"])[0]
            try:
                t = threading.Thread(
                    target=run_daily_all, kwargs={"scope": scope}, daemon=True
                )
                t.start()
                self._json(200, {"ok": True, "started": True, "scope": scope})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/growth/run":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                if wb_growth is None:
                    self._json(200, {"ok": False, "error": "成长中心模块未加载"})
                    return
                if _GROWTH_RUN["running"]:
                    self._json(200, {"ok": True, "started": True, "running": True})
                    return
                t = threading.Thread(target=run_growth_background, daemon=True)
                t.start()
                self._json(200, {"ok": True, "started": True, "running": True})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/growth/claim":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            code = (q.get("code") or [""])[0]
            if not code:
                self._json(200, {"ok": False, "error": "缺少 code 参数"})
                return
            try:
                if wb_growth is None:
                    self._json(200, {"ok": False, "error": "成长中心模块未加载"})
                    return
                sess = _load_session_safe()
                if not sess or not sess.get("access_token"):
                    self._json(200, {"ok": False, "error": "未找到本地会话 token（WB_TOKEN_FILE 需指向明文 token.info）"})
                    return
                ok, msg = wb_growth.claim_one(sess, code)
                self._json(200, {"ok": ok, "code": code, "msg": msg})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/daily/run":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                if wb_growth is None:
                    self._json(200, {"ok": False, "error": "成长中心模块未加载"})
                    return
                if _DAILY_RUN["running"]:
                    self._json(200, {"ok": True, "started": True, "running": True})
                    return
                t = threading.Thread(target=run_daily_background, daemon=True)
                t.start()
                self._json(200, {"ok": True, "started": True, "running": True})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/settings":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                length = int(self.headers.get("Content-Length", "0") or "0")
                body = json.loads(self.rfile.read(length) or b"{}")
                saved = save_settings(body)
                SETTINGS.clear()
                SETTINGS.update(saved)
                reschedule()
                self._json(200, {"ok": True})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/settings/test":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                length = int(self.headers.get("Content-Length", "0") or "0")
                body = json.loads(self.rfile.read(length) or b"{}")
                url = (body.get("webhook") or "").strip()
                if not url:
                    self._json(200, {"ok": False, "error": "缺少 webhook 地址"})
                    return
                _send_webhook(url, "【签到中心】Webhook 测试推送成功 ✅")
                self._json(200, {"ok": True})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path == "/api/travel/poll":
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                if wb_travel is None:
                    self._json(200, {"ok": False, "error": "旅行模块未加载"})
                    return
                if _TRAVEL_RUN["running"]:
                    self._json(200, {"ok": True, "started": True, "running": True})
                    return
                t = threading.Thread(target=run_travel_background, daemon=True)
                t.start()
                self._json(200, {"ok": True, "started": True, "running": True})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        if u.path in ("/api/travel/depart", "/api/travel/claim"):
            q = parse_qs(u.query)
            if not self._key_ok(q):
                self._json(401, {"ok": False, "error": "需要访问口令", "needKey": True})
                return
            try:
                if wb_travel is None:
                    self._json(200, {"ok": False, "error": "旅行模块未加载"})
                    return
                sess = _load_session_safe()
                if not sess or not sess.get("access_token"):
                    self._json(200, {"ok": False,
                                     "error": "未找到本地会话 token（WB_TOKEN_FILE 需指向明文 token.info）"})
                    return
                cookie = _travel_cookie()
                if u.path == "/api/travel/depart":
                    loc = (q.get("loc") or [""])[0]
                    loc_id = int(loc) if loc.isdigit() else None
                    ok, res, used = wb_travel.depart(sess, cookie=cookie, loc_id=loc_id)
                    self._json(200, {"ok": ok, "data": res,
                                     "msg": ("派出成功" if ok else "派出失败")})
                else:
                    # 领取前先读一次状态拿到 record_id（若服务端需要）
                    st = wb_travel.get_status(sess, cookie=cookie)
                    rec = st.get("record_id") if isinstance(st, dict) else None
                    ok, res, used = wb_travel.claim(sess, cookie=cookie, record_id=rec)
                    self._json(200, {"ok": ok, "data": res,
                                     "msg": ("领取成功" if ok else "领取失败")})
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e)})
            return
        self._send(404, "not found", "text/plain; charset=utf-8")

    def log_message(self, fmt, *args):
        ts = datetime.datetime.now().strftime("%H:%M:%S")
        sys.stdout.write("[%s] %s\n" % (ts, fmt % args))


def lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def main():
    if "--daily" in sys.argv:
        run_daily_all()
        return
    threading.Thread(target=_scheduler_loop, daemon=True).start()
    threading.Thread(target=_travel_poll_loop, daemon=True).start()
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    ip = lan_ip()
    line = "=" * 58
    print(line)
    print("  WorkBuddy 签到 · 手机网页版 已启动")
    print("  监听: %s:%d" % (HOST, PORT))
    print("  电脑本机测试:  http://127.0.0.1:%d" % PORT)
    if HOST == "0.0.0.0":
        print("  手机访问地址:  http://%s:%d   (需连同一 WiFi)" % (ip, PORT))
    if ACCESS_KEY:
        print("  访问口令:      %s" % ACCESS_KEY)
    print("  停止服务: 按 Ctrl+C")
    print(line)
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止。")
    finally:
        httpd.server_close()


def run_daily_all(scope=None):
    """--daily：按固定顺序执行签到（顺序与首页卡片一致，最省心的在前）。
    scope="auto" 只跑全自动平台；scope=None/"all" 跑全部。
    每个平台失败不中断后续平台；逐项输出结果，供 systemd journal 查看。"""
    banner = "=" * 56
    print(banner)
    print("多平台每日签到  %s" % datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    print(banner)
    order = [
        ("workbuddy", "WorkBuddy"),
        ("travel", "派猫猫旅行"),
        ("qianfan", "百度千帆"),
        ("minimax", "MiniMax Code"),
        ("qoder", "Qoder"),
        ("linkai", "Link AI"),
        ("lingxi", "WPS 灵犀"),
        ("trae", "Trae Work"),
        ("huawei", "华为码道"),
    ]
    if scope == "auto":
        order = [(k, l) for (k, l) in order if k in AUTO_RUN]
    results = []
    for key, label in order:
        if not platform_enabled(key):
            print("[%s] 已在设置中停用，跳过" % label)
            continue
        try:
            card = run_checkin_for(key)
            checked = bool(card.get("checked"))
            row = next(
                (r for r in (card.get("rows") or []) if r.get("k") == "签到状态"), None
            )
            note = row.get("v", "") if row else ""
            s = "ok" if checked else "warn"
            results.append({"label": label, "s": s, "note": note})
            print("[%s] %s %s" % (label, "✅ 已签到" if checked else "⚠️ 未签到", note))
        except Exception as e:
            results.append({"label": label, "s": "fail", "note": str(e)})
            print("[%s] 失败: %s" % (label, e))
    print(banner)
    for r in results:
        print("%s [%s] %s" % (r["label"], r["s"], r.get("note", "")))
    print(banner)
    try:
        notify_summary(results)
    except Exception:
        pass
    sys.stdout.flush()


if __name__ == "__main__":
    main()
