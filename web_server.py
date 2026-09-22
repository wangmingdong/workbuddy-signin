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
        elif k == "notify_webhook":
            # 前端未提供该字段 -> 保留原值；提供空串 -> 显式清除
            out[k] = (d.get(k) or "").strip() if (k in d) else SETTINGS.get(k, base[k])
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
    # 派猫猫旅行已并入 WorkBuddy（共用登录态 + 卡片内弹窗入口），不再独立配置，
    # 其开关随 WorkBuddy 走：关 WorkBuddy 即关 travel。
    if name == "travel":
        name = "workbuddy"
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
# 伪客户端设备头：服务端无真实设备。device-id 必须「稳定」——原实现每次进程启动都生成新
# uuid，等于每次重启/部署后都拿一个陌生设备去 claim，更容易撞 Trae 的设备风控（9074 限流）。
# 现改为持久化到 trae_device_id.txt，首次生成后一直复用；环境变量 TRAE_DEVICE_ID 仍可覆盖。
TRAE_DEVICE_ID_FILE = os.path.join(BASE_DIR, "trae_device_id.txt")


def _trae_device_id():
    """稳定的伪设备 id：env 覆盖 > 本地文件 > 首次生成并落盘。"""
    env = os.environ.get("TRAE_DEVICE_ID")
    if env:
        return env
    try:
        with open(TRAE_DEVICE_ID_FILE, "r", encoding="utf-8") as f:
            v = f.read().strip()
        if v:
            return v
    except Exception:
        pass
    v = "wb-%s" % uuid.uuid4().hex[:16]
    try:
        with open(TRAE_DEVICE_ID_FILE, "w", encoding="utf-8") as f:
            f.write(v)
    except Exception:
        pass
    return v


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
            "x-device-id": _trae_device_id(),
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


# ---- 9074 限流的「稍后自动再试」 -------------------------------------------
# 9074（当前参与用户太多）是 Trae 服务端的并发限流：请求本身合法（同通道 status 正常、
# 活动 Enabled=true，且已验证与设备指纹/UA/客户端版本无关——换设备 ID 与版本号同样返回 9074，
# 而 req_source=3/4/0 会返回 9004 参数错，说明 1/2 是正确的通道），只是被排队容量挡下。
# 用常驻后台线程按递增间隔持续重试，直到签到成功或当天 23:59（跨天停）；状态落盘，
# 服务重启后自动恢复，彻底消除"重试窗口太短"与"重启丢队列导致假排队"两个问题。
TRAE_RETRY_WAITS = [600, 900, 1800, 3600, 3600, 7200]  # 10 分 / 15 分 / 30 分 / 1 小时 / 1 小时 / 2 小时（之后封顶 2 小时）
_TRAE_RETRY_LOCK = threading.Lock()
_TRAE_RETRY_PENDING = [False]
# 并发互斥：避免"重试线程"与"手动点/定时任务"同时 claim，导致重复请求与重复记录
_TRAE_CLAIM_LOCK = threading.Lock()
TRAE_RETRY_STATE_FILE = os.path.join(BASE_DIR, "trae_retry_state.json")


def _trae_retry_state():
    """读取限流重试持久化状态：{active, attempt, started_at, last_try}。"""
    try:
        with open(TRAE_RETRY_STATE_FILE, "r", encoding="utf-8") as f:
            d = json.load(f)
        if isinstance(d, dict):
            return d
    except Exception:
        pass
    return {"active": False, "attempt": 0, "started_at": 0, "last_try": 0}


def _trae_save_retry_state(d):
    try:
        tmp = TRAE_RETRY_STATE_FILE + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(d, f)
        os.replace(tmp, TRAE_RETRY_STATE_FILE)
    except Exception:
        pass


def _end_of_today():
    now = datetime.datetime.now()
    eod = now.replace(hour=23, minute=59, second=59, microsecond=0)
    return time.mktime(eod.timetuple())


def _trae_mark_signed(source=""):
    """确认签到成功后：停掉重试、修正状态记录（把尾部的限流记录改写成成功，避免卡片误报）。"""
    _trae_save_retry_state({"active": False})
    lr = _trae_read_last()
    if not lr or not lr.get("ok") or "9074" in (lr.get("message") or ""):
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        _trae_record(True, "签到成功（%s）" % (source or "checkin_credits/claim"))
    print("[trae] 已确认今日签到成功，停止重试（来源：%s）" % (source or "claim"))


def _trae_retry_loop():
    """常驻后台：按递增间隔反复尝试，直到签到成功或当日 23:59（跨天停）。

    每轮先查 status（已签则直接收尾，省掉无谓请求）；未签才 claim。
    """
    try:
        while True:
            st = _trae_retry_state()
            if not st.get("active"):
                break
            waits = TRAE_RETRY_WAITS
            idx = min(int(st.get("attempt", 0)), len(waits) - 1)
            time.sleep(waits[idx])
            st = _trae_retry_state()
            if not st.get("active"):
                break
            # 先看服务端真实状态：已签则收尾（关键：避免"其实已签却仍在重试"）
            try:
                if _trae_api("status").get("checked_in"):
                    _trae_mark_signed("status.checked_in")
                    break
            except Exception:
                pass
            # 未签 → 发一次 claim（run_trae_checkin 内部 9074 只记录、不自调度，避免递归）
            card = run_trae_checkin()
            if card and card.get("checked"):
                _trae_mark_signed("claim code=0")
                break
            # claim 返回 code=0 也算成功（run_trae_checkin 已记录，这里再兜一次）
            lr = _trae_read_last()
            if lr and lr.get("ok"):
                _trae_mark_signed("claim ok")
                break
            st = _trae_retry_state()
            st["attempt"] = int(st.get("attempt", 0)) + 1
            st["last_try"] = time.time()
            if time.time() > _end_of_today():
                _trae_save_retry_state({"active": False})
                print("[trae] 已到当日 23:59，停止重试（次日重新触发）")
                break
            _trae_save_retry_state(st)
            nxt = waits[min(int(st["attempt"]), len(waits) - 1)]
            print("[trae] 限流重试 #%d 仍失败，继续（下次 %ds 后）" % (st["attempt"], nxt))
    finally:
        with _TRAE_RETRY_LOCK:
            _TRAE_RETRY_PENDING[0] = False


def _trae_ensure_retry():
    """确保后台重试线程在跑（单飞：内存锁 + 文件状态），无则启动。"""
    with _TRAE_RETRY_LOCK:
        if _TRAE_RETRY_PENDING[0]:
            return
        _TRAE_RETRY_PENDING[0] = True
    st = _trae_retry_state()
    if not st.get("active"):
        _trae_save_retry_state(
            {"active": True, "attempt": 0, "started_at": time.time(), "last_try": 0}
        )
    threading.Thread(target=_trae_retry_loop, daemon=True).start()
    print("[trae] 已启动/恢复限流自动重试线程")


def _trae_restore_retry():
    """服务启动时调用：若上次有未完成的重试，则恢复线程（消除重启丢队列假排队）。"""
    if _trae_retry_state().get("active"):
        _trae_ensure_retry()


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
        # 自动签到失败时明确提示真实原因，避免"账户已签但没跑成"或"cookie 过期"的误判。
        # 关键：以服务端 checked_in 为准 —— 已签则一切"限流/重试"状态都作废（防误报）。
        retry_state = _trae_retry_state()
        if checked:
            if retry_state.get("active"):
                _trae_mark_signed("card 交叉校验")
            throttled = False
        else:
            throttled = bool(retry_state.get("active"))
        if lr and not lr.get("ok"):
            last_msg = (lr.get("message") or "")[:60]
            if checked:
                # 已签但尾部遗留失败记录：纠正展示，不再吓人
                rows.insert(
                    0,
                    {"k": "✅ 今日已签", "v": "服务端已确认签到成功（尾部失败记录为历史重试残留，已作废）"},
                )
            else:
                rows.insert(
                    0,
                    {
                        "k": "⏳ 服务端限流中" if throttled else "⚠️ 自动签到",
                        "v": (
                            ("服务端持续限流，后台自动重试中（已重试 %d 次，将一直尝试到今日 24:00）：%s"
                             % (int(retry_state.get("attempt", 0)), last_msg))
                            if throttled
                            else (
                                ("上次失败：%s" % last_msg)
                                if last_msg
                                else "上次失败（原因未记录）"
                            )
                        ),
                    },
                )
        return {
            "name": "trae",
            "title": "Trae Work 每日签到",
            "brand": "#111827",
            "brand2": "#374151",
            "icon": "trae",
            "checked": checked,
            "badge": ("限流·重试中" if (throttled and not checked) else None),
            "metric_label": "今日状态",
            "metric_value": (
                "已签到" if checked else ("限流重试中" if throttled else "待签到")
            ),
            "last_run": lr,
            "rows": rows,
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
    9004 = "submitted order parameters are incorrect"：表示请求被后端拒绝（参数/通道不符）。
    9074 = "当前参与用户太多，请稍后再试"：服务端并发限流（早高峰最易触发），请求本身合法、
           同通道 status 正常、活动 Enabled=true —— 属可自愈的临时状态，故自动安排稍后重试。
    此前服务端用 req_source=3（网页通道）且缺设备头，正是 9004 的诱因；现改 2 + 补设备头。
    """
    if not (TRAE_COOKIE or TRAE_JWT):
        raise RuntimeError(
            "未配置 Trae 凭据（trae_cookie.txt / TRAE_JWT 或 trae_jwt.txt）"
        )
    # 并发互斥：同一时刻只允许一个 claim 流程（后台重试 / 手动点 / 定时任务共用）
    if not _TRAE_CLAIM_LOCK.acquire(blocking=False):
        print("[trae] 已有一次签到流程在执行，跳过本次重复触发")
        return get_trae_card()
    try:
        return _run_trae_checkin_locked()
    finally:
        _TRAE_CLAIM_LOCK.release()


def _run_trae_checkin_locked():
    """run_trae_checkin 的实际执行体（已持有 _TRAE_CLAIM_LOCK）。"""
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
    throttled = False
    # 前置：先看服务端真实状态，已签则直接收尾（避免"其实已签却仍 claim 撞限流"的误报）
    try:
        if _trae_api("status").get("checked_in"):
            results.append("今日已签到（status.checked_in，幂等跳过）")
            _trae_record(True, "；".join(results))
            _trae_mark_signed("status.checked_in")
            return get_trae_card()
    except Exception:
        pass
    try:
        d = _trae_api("claim")
        if isinstance(d, dict):
            br = d.get("code")
            if br == 0:
                claimed = True
                results.append("签到成功（checkin_credits/claim）")
            elif br == 9074:
                # 9074 = 服务端并发限流（"当前参与用户太多"）：请求合法但被排队容量挡下，
                # 属可自愈的临时状态（早高峰最易触发），非账户问题、非参数错误 → 安排稍后重试。
                throttled = True
                results.append(
                    "服务端限流(code=9074 当前参与用户太多)，已安排稍后自动重试"
                )
            elif br == 9004:
                results.append(
                    "claim 被拒:code=9004 参数/通道不符（需进一步对齐客户端校验）"
                )
            else:
                msg = d.get("message") or br
                results.append("claim 被拒:code=%s %s" % (br, msg))
        else:
            results.append("未知响应")
    except Exception as e:
        results.append("claim 调用异常:%s" % e)
    # 防误报：仅有接口明确返回 code=0 才算签到成功；否则一律记为失败
    ok = claimed
    _trae_record(ok, "；".join(results))
    if ok:
        # 成功即收尾：停掉重试、修正尾部记录（防"其实已签却仍显示限流重试中"）
        _trae_mark_signed("claim code=0")
    elif throttled:
        _trae_ensure_retry()
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
#   无验证码时返回 code:870 message="签到失败"（服务端要求图片验证码），自动签到不可行；870 非"已签"
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

# Qoder 每日 100 Credits 活动每天 10:00(UTC+8) 才开放（活动 key 带日期 act-YYYYMMDD-xxx），
# 而主定时任务在 08:35 跑、早于开放时间，会看到昨天期 CLAIMED 直接幂等跳过、漏掉当天额度。
# 故起一个常驻线程，每天 10:30 起每 30 分钟补签一次，直到当日已领或 13:00 停止。
_qoder_wake = threading.Event()


def _qoder_topup_loop():
    while True:
        now = datetime.datetime.now()
        start = now.replace(hour=10, minute=30, second=0, microsecond=0)
        if now < start:
            if _qoder_wake.wait((start - now).total_seconds()):
                _qoder_wake.clear()
                continue
        done_today = False
        while not done_today:
            now = datetime.datetime.now()
            if now.hour >= 13:
                break
            try:
                run_qd_checkin()
            except Exception as e:
                print("[qoder-topup] 补签异常: %s" % e)
            lr = _qd_read_last()
            today = now.strftime("%Y-%m-%d")
            if lr and lr.get("ok") and str(lr.get("ts", "")).startswith(today):
                done_today = True
                print("[qoder-topup] %s 今日已签，停止补签" % today)
                break
            if _qoder_wake.wait(1800):
                _qoder_wake.clear()
                break
        now = datetime.datetime.now()
        nxt = (now + datetime.timedelta(days=1)).replace(hour=10, minute=30, second=0, microsecond=0)
        if _qoder_wake.wait((nxt - now).total_seconds()):
            _qoder_wake.clear()
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
    """返回 (是否在领取窗口内, 状态文案)。

    注意：Qoder 的每日额度由服务端控制刷新，每天 10:00(UTC+8) 开放领取（以官方公告为准）。
    这里的 startAt/endAt 来自活动接口，仅当接口明确给出且当前不在区间内时才拦，
    绝大多数情况下接口不返回这两个字段或已落在活动期内，因此默认放行。
    """
    now = time.time()
    start_at = (camp or {}).get("startAt")
    end_at = (camp or {}).get("endAt")
    if isinstance(start_at, (int, float)) and now < start_at:
        return False, "暂未到开放时间（以 Qoder 服务端为准）"
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
            # 服务端当前未下发「每日领取」活动：可能是每日 10:00(UTC+8) 才开放领取窗口、
            # 活动改版（领取入口已迁至桌面端 Usage 面板）、或账号暂未纳入。
            # 不视为故障，降级为中性卡片；若今天已成功领取过则标记为已领。
            lr = _qd_read_last()
            rows = [
                {"k": "状态", "v": "服务端当前未返回今日可领取活动（每日 10:00(UTC+8) 才开放新一轮）"},
                {"k": "自动领取", "v": "系统每日 10:30 起自动补签（每 30 分钟一次，直到当日领到），无需手动去桌面端"},
                {"k": "领取窗口", "v": "每天 10:00(UTC+8)开放，至次日 10:00 前可领（以 Qoder 官方公告为准）"},
            ]
            if lr:
                rows.append(
                    {"k": "上次执行", "v": "%s %s" % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️")}
                )
            return {
                "name": "qoder",
                "title": "Qoder 每日领 100 Credits",
                "brand": "#141414",
                "brand2": "#4A4A4A",
                "icon": "qd",
                "checked": False,
                "badge": "活动未开放",
                "metric_label": "今日 Credits",
                "metric_value": "待领取",
                "last_run": lr,
                "rows": rows,
                "error": None,
            }
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
            {"k": "领取窗口", "v": "每天 10:00(UTC+8)开放领取，至次日 10:00 前可领（以 Qoder 官方公告为准）"},
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
        needs_captcha = False
        if d.get("success"):
            # 真正签到成功（服务端返回积分）才认可
            checked = True
        elif d.get("code") == 870:
            # 870 真实 message 是「签到失败」：服务端要求图片验证码(captchaVerification)，
            # 脚本无验证码、自动签到不可行；且无法确认用户是否已在网页手动签，故诚实标「需手动」
            needs_captcha = True
        else:
            raise RuntimeError(d.get("message") or "状态查询失败")
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
                "v": "✅ 今日已签" if checked else "需网页手动签到",
            },
        ]
        if needs_captcha:
            rows.append(
                {
                    "k": "说明",
                    "v": "自动签到不可用：服务端要求图片验证码，脚本无法自动完成；请在网页手动签到",
                }
            )
        if lr:
            rows.append(
                {
                    "k": "上次执行",
                    "v": "%s %s"
                    % (
                        str(lr.get("ts"))[5:16],
                        "✅" if lr.get("ok") else "⚠️",
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
            "badge": "需手动" if needs_captcha else None,
            "metric_label": "可用积分",
            "metric_value": bal,
            "last_run": lr,
            "rows": rows,
            "error": ("需网页手动签到（图片验证码）" if needs_captcha else None),
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
        # 服务端要求图片验证码，自动签到不可行，如实记录失败，不谎报成功
        _lk_record(False, "自动签到失败：服务端要求图片验证码(captchaVerification)，脚本无法完成，请网页手动签到")
        raise RuntimeError(
            "Link AI 自动签到需网页图片验证码，暂不支持自动；请前往 link-ai.tech 手动签到"
        )
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

# ============================ 通用小工具（状态卡读写） ============================
def _read_json_last(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list) and data:
            return data[-1]
        if isinstance(data, dict):
            return data
    except Exception:
        pass
    return None


def _generic_record(path, ok, msg):
    rec = {"ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
           "ok": bool(ok), "msg": msg}
    try:
        hist = []
        try:
            with open(path, "r", encoding="utf-8") as f:
                hist = json.load(f)
            if not isinstance(hist, list):
                hist = []
        except Exception:
            hist = []
        hist.append(rec)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(hist[-30:], f, ensure_ascii=False, indent=2)
    except Exception:
        pass
    return rec


# ============================ Coze 扣子（字节）每日登录适配器 ============================
# 扣子活动积分「每日登录自动发放 1500」（无需手动领取），与 Trae 同属字节体系。
# 本适配器为**状态卡**：展示每日福利 + 会话 Cookie 是否有效；不假报「领取」（无显式领取接口）。
COZE_COOKIE = os.environ.get("COZE_COOKIE", "")
if not COZE_COOKIE:
    try:
        with open(os.path.join(BASE_DIR, "coze_cookie.txt"), "r", encoding="utf-8") as _f:
            COZE_COOKIE = _f.read().strip()
    except Exception:
        COZE_COOKIE = ""
COZE_STATE_FILE = os.path.join(BASE_DIR, "coze_last_run.json")
COZE_LOGO_B64 = "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"


def get_coze_card():
    if not COZE_COOKIE:
        return {"name": "coze", "title": "Coze 扣子 每日登录", "brand": "#4D6BFE",
                "brand2": "#7C4DFF", "icon": "coze", "checked": False, "needs_auth": True,
                "auth_url": "https://www.coze.cn/", "metric_label": "每日福利",
                "metric_value": "1500 活动分",
                "last_run": None,
                "rows": [{"k": "说明",
                          "v": "每日登录自动发放 1500 活动分（无需手动领取）；配置会话 Cookie 后显示状态"}],
                "error": None}
    lr = _read_json_last(COZE_STATE_FILE)
    rows = [
        {"k": "每日福利", "v": "登录自动发放 1500 活动分"},
        {"k": "领取方式", "v": "每日登录即到账，无需手动领取"},
        {"k": "会话状态", "v": "✅ Cookie 已配置"},
    ]
    if lr:
        rows.append({"k": "上次检查",
                     "v": "%s %s" % (str(lr.get("ts"))[5:16], "✅" if lr.get("ok") else "⚠️")})
    return {"name": "coze", "title": "Coze 扣子 每日登录", "brand": "#4D6BFE",
            "brand2": "#7C4DFF", "icon": "coze", "checked": True,
            "metric_label": "每日福利", "metric_value": "1500 活动分",
            "last_run": lr, "rows": rows, "error": None,
            "auto_note": "每日登录自动发放，无需手动领取"}


def _coze_record_daily():
    # 扣子无显式领取接口：每日登录即自动发放 1500 活动分。
    # 这里每天只落一条「会话有效 → 当日福利已确认」记录，作为签到历史（避免重复点击刷屏）。
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    rec = {"ts": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
           "date": today, "ok": True, "message": "每日福利已确认：自动发放 1500 活动分"}
    try:
        hist = []
        try:
            with open(COZE_STATE_FILE, "r", encoding="utf-8") as _f:
                hist = json.load(_f)
            if not isinstance(hist, list):
                hist = []
        except Exception:
            hist = []
        if hist and hist[-1].get("date") == today:
            hist[-1] = rec          # 同一天重复检查 → 更新而非追加
        else:
            hist.append(rec)
        with open(COZE_STATE_FILE, "w", encoding="utf-8") as _f:
            json.dump(hist[-30:], _f, ensure_ascii=False, indent=2)
    except Exception:
        pass
    return rec


def run_coze_checkin():
    if not COZE_COOKIE:
        raise RuntimeError("未配置 Coze 会话 Cookie（coze_cookie.txt 或 COZE_COOKIE）")
    _coze_record_daily()
    return get_coze_card()


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
    "coze": get_coze_card,
}

# 卡片分组标签（与上面顺序一致）：auto = 全自动；其余 = 需偶尔维护凭据
AUTO_PLATFORMS = ("workbuddy", "qianfan", "minimax", "qoder", "linkai", "lingxi", "trae", "coze")
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

    if name == "coze":
        history = _load_json_records(COZE_STATE_FILE, 30)
        return {
            "ok": True, "name": name, "title": "Coze 扣子 每日登录",
            "signin": {"history": history, "checked": bool(COZE_COOKIE),
                       "note": "每日登录自动发放 1500 活动分（无需手动领取）；配置会话后显示真实状态"},
            "consumption": {"note": "活动积分当日有效，过期清零"},
        }

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
                "window": window_txt if not in_window else "由 Qoder 服务端控制每日刷新（实测清晨即开放）",
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


# 各平台官网 / 登录入口（详情弹窗里统一提供「前往官网登录」链接，风格与其他卡片一致）
OFFICIAL_SITES = {
    "workbuddy": ("https://www.workbuddy.cn/", "WorkBuddy 官网"),
    "qianfan":   ("https://qianfan.baidu.com/", "百度智能云千帆"),
    "minimax":   ("https://platform.minimax.io/", "MiniMax 开放平台"),
    "qoder":     ("https://qoder.com/", "Qoder 官网"),
    "linkai":    ("https://console.link-ai.tech/", "Link AI 控制台"),
    "lingxi":    ("https://lingxi.wps.cn/", "WPS 灵犀"),
    "huawei":    ("https://devcloud.cn-north-4.huaweicloud.com/", "华为云 DevCloud"),
    "trae":      ("https://work.trae.cn/", "Trae 官网"),
    "coze":      ("https://www.coze.cn/", "扣子 Coze 官网"),
}


def get_center():
    items = [fn() for fn in ADAPTERS.values()]
    for it in items:
        it["disabled"] = not platform_enabled(it.get("name"))
        # 统一挂载官网入口（详情弹窗用），覆盖成长/每日任务等无官网的子卡
        _oname = it.get("name")
        if _oname in OFFICIAL_SITES:
            it["official_url"], it["official_label"] = OFFICIAL_SITES[_oname]
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
    if name == "coze":
        return run_coze_checkin()
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
.cicon img{display:block;width:100%;height:100%;object-fit:contain;background:#fff;border-radius:11px;}
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
.dfoot{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);text-align:center;}
.olink{display:inline-block;width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;font-size:13.5px;font-weight:600;
  color:var(--sub);background:rgba(120,130,150,.08);border:1px solid var(--line);text-decoration:none;
  transition:background .15s,color .15s;}
.olink:hover{background:rgba(120,130,150,.16);color:var(--mc,var(--c,#00C29A));}
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
    <a class="gear" href="?view=settings" title="设置" aria-label="设置" onclick="event.preventDefault(); showFocus('settings'); return false;">⚙️</a>
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
  <div class="vtag" id="vtag" style="margin-top:14px;font-size:12px;color:var(--sub);text-align:center;opacity:.8">v20260922-1</div>
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
  if(it.icon==="coze") return '<img class="cilogo" src="data:image/png;base64,__COZE_LOGO_B64__">';
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
        '<div class="card-acts">'+btn + entries + err +'</div>'+
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
  if(!signinHTML){
    var _note = (signin && signin.note) ? signin.note : "该平台为状态卡，详情见卡片。";
    signinHTML = '<div class="drow"><span class="dk">说明</span><span class="dv">'+esc(_note)+'</span></div>';
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
  // 统一官网登录入口：从已加载的 center 数据里取该卡的 official_url
  var off = null;
  if(LAST_CENTER && LAST_CENTER.items){
    for(var oi=0; oi<LAST_CENTER.items.length; oi++){
      if(LAST_CENTER.items[oi].name===name){ off = LAST_CENTER.items[oi].official_url; break; }
    }
  }
  var offFoot = off
    ? '<div class="dfoot"><a class="olink" href="'+esc(off)+'" target="_blank" rel="noopener">🌐 前往官网登录 / 账号管理</a></div>'
    : '';
  detail.innerHTML = ''+
    '<div class="dtab"><span class="on" data-tab="signin">签到详情</span><span data-tab="consume">消耗详情</span></div>'+
    '<div class="dsec on" id="dsec-'+name+'-signin">'+signinHTML+historyHTML+'</div>'+
    '<div class="dsec" id="dsec-'+name+'-consume">'+consumeHTML+'</div>'+
    offFoot;
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
  $('backBtn').addEventListener('click', function(){ showMain(); });
  if(view==='growth') focusGrowth();
  else if(view==='settings') focusSettings();
  else focusDaily();
}
function showMain(){
  var sum=document.querySelector('.summary'); if(sum) sum.style.display='';
  var cards=$('cards'); if(cards) cards.style.display='';
  var hint=document.querySelector('.hint'); if(hint) hint.style.display='';
  var h1=document.querySelector('.brand h1'); if(h1) h1.textContent='签到中心';
  var p=document.querySelector('.brand p'); if(p) p.textContent='多个签到一目了然 · 一键完成';
  var el=$('focus'); if(el){ el.style.display='none'; el.innerHTML=''; }
  load();
}
var PLATFORMS = {workbuddy:"WorkBuddy",qianfan:"百度千帆",minimax:"MiniMax Code",qoder:"Qoder",linkai:"Link AI",lingxi:"WPS 灵犀",trae:"Trae Work",huawei:"华为码道",coze:"Coze 扣子",};
function focusSettings(){
  var el=$('focus');
  el.innerHTML='<a class="back" id="backBtn">‹ 返回签到中心</a><div id="fbody" class="settings"></div>';
  $('backBtn').addEventListener('click', function(){ showMain(); });
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
      +'<label class="fld col"><span>Webhook 地址</span><input type="password" id="webhook" placeholder="留空=保持当前配置；填新地址即覆盖"></label>'
      +'<label class="fld col" style="margin-top:4px"><input type="checkbox" id="clearWebhook"> <span>清除已配置的 Webhook</span></label>'
      +'<button class="btn-mini" id="testWebhook" type="button">测试推送</button>'
      +'<p class="ftip">支持「推送到个人微信」的地址：<br>· PushPlus：<code>https://www.pushplus.plus/send/你的token</code><br>· Server酱：<code>https://sctapi.ftqq.com/你的SendKey.send</code><br>· 企业微信群机器人：<code>https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx</code><br>当前状态：<b>'+(s.has_webhook?'已配置 ✅（出于安全不显示明文）':'未配置')+'</b>。测试时填入地址点「测试推送」即可，保存后同样不显示明文。</p>'
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
  };
  var wh = ($('webhook').value||'').trim();
  if ($('clearWebhook').checked) { body.notify_webhook = ""; }
  else if (wh) { body.notify_webhook = wh; }
  // 都不满足则不传该字段 -> 后端保留原值（修复「打开设置页保存即清空 webhook」的 bug）
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
  var offLink = it.official_url ? '<a class="olink" style="margin-top:8px" href="'+esc(it.official_url)+'" target="_blank" rel="noopener">🌐 前往官网登录 / 账号管理</a>' : '';
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
    +     '<div class="card-acts">'+retry + browserLink + offLink+'</div>'
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
PAGE = PAGE.replace("__COZE_LOGO_B64__", COZE_LOGO_B64)


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
                "has_webhook": bool(SETTINGS.get("notify_webhook", "")),
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
    # 服务启动即恢复 Trae 限流重试（若上次未完成，避免重启丢队列假排队）
    _trae_restore_retry()
    # Qoder 每日 10:00 开放，08:35 主定时会漏掉，起常驻补签线程（10:30 起每 30 分）
    threading.Thread(target=_qoder_topup_loop, daemon=True).start()
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
        ("coze", "Coze 扣子"),
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
