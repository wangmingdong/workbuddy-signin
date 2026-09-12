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
import socket
import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

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

PORT = int(os.environ.get("WB_PORT", "8765"))
HOST = os.environ.get("WB_HOST", "0.0.0.0")
ACCESS_KEY = os.environ.get("WB_ACCESS_KEY", "")   # 留空 = 不校验口令；非空则手机首次访问需输入一次（生产环境由 systemd service 的 WB_ACCESS_KEY 注入）

# 最近一次签到结果（由 workbuddy_checkin.py 写入；自动定时与手动点击都会记）
STATE_FILE = os.environ.get("WB_STATE_FILE", os.path.join(BASE_DIR, "last_run.json"))
# 余额采样历史（用于推算每日用量）：{ "YYYY-MM-DD": 剩余积分 }
HISTORY_FILE = os.environ.get("WB_BALANCE_HISTORY", os.path.join(BASE_DIR, "balance_history.json"))


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
    """读取最近一次签到结果（自动定时 / 手动点击都记在这里）。"""
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def _record_state(ok, message, st, source="web"):
    """把本页手动签到的结果也记进状态文件，保证页面记录统一。"""
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
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(rec, f, ensure_ascii=False)
    except Exception:
        pass


def get_remaining():
    """查询账户资源余额（资源包 CapacityRemainPrecise 之和）。独立接口，失败不影响主流程。"""
    sess = _session()
    base = _base(sess)
    body = {
        "PageNumber": 1, "PageSize": 100, "ProductCode": "p_tcaca",
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
        pkgs.append({
            "name": a.get("PackageName"),
            "remain": round(rem, 2),
            "used": round(float(a.get("CapacityUsedPrecise") or 0), 2),
            "capacity": round(float(a.get("CapacitySizePrecise") or 0), 2),
        })
    return {"remaining": round(total, 2), "packages": pkgs}


def record_balance(remaining):
    """把今日余额记进历史文件（按天去重，保留最近 60 天）。"""
    try:
        today = datetime.date.today().isoformat()
        hist = {}
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                hist = json.load(f)
        except Exception:
            hist = {}
        hist[today] = remaining
        keys = sorted(hist.keys())
        if len(keys) > 60:
            for k in keys[:-60]:
                hist.pop(k, None)
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(hist, f, ensure_ascii=False)
    except Exception:
        pass


def daily_usage():
    """每日用量 = 昨日余额 - 今日余额（正数=消耗）。无历史返回 None。"""
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            hist = json.load(f)
        days = sorted(hist.keys())
        today = datetime.date.today().isoformat()
        if today in hist and len(days) >= 2:
            prev_days = [d for d in days if d < today]
            if prev_days:
                return round(hist[prev_days[-1]] - hist[today], 2)
    except Exception:
        pass
    return None


def get_status():
    sess = _session()
    s, b = call(_base(sess), "/checkin-activity-status", sess, {})
    if s != 200:
        raise RuntimeError("查询签到状态返回 HTTP %s" % s)
    d = (json.loads(b).get("data") or {})
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
    # 余额与每日用量（独立接口，失败不影响签到主流程）
    try:
        res = get_remaining()
        st["remaining"] = res["remaining"]
        st["packages"] = res["packages"]
        record_balance(res["remaining"])
        st["usage"] = daily_usage()
    except Exception:
        pass
    return st


def do_checkin():
    sess = _session()
    st = get_status()
    if st["checked"]:
        _record_state(True, "今天已经签到过了", st, "web")
        return {"already": True, "message": "今天已经签到过了，无需重复操作", "status": st}

    s, b = call(_base(sess), "/daily-checkin", sess, {})
    try:
        resp = json.loads(b)
    except Exception:
        resp = {}
    code = resp.get("code")
    if code in (0, 10001):
        already = (code == 10001)
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


# ============================ 手机页面 ============================
PAGE = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#6366f1">
<title>Buddy 加油站 · 签到</title>
<style>
:root{--bg1:#f6f7fb;--bg2:#eef1ff;--card:#fff;--ink:#1f2430;--sub:#7b8496;--line:#eceef4;--accent:#6366f1;--accent2:#8b5cf6;--ok:#12b76a;}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{margin:0;min-height:100%;}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  background:linear-gradient(160deg,var(--bg1),var(--bg2));color:var(--ink);
  display:flex;justify-content:center;padding:24px 16px 40px;}
.wrap{width:100%;max-width:420px;}
.brand{display:flex;align-items:center;gap:10px;margin:4px 4px 18px;}
.logo{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent2));
  display:flex;align-items:center;justify-content:center;font-size:21px;box-shadow:0 6px 16px rgba(99,102,241,.35);}
.brand h1{font-size:17px;margin:0;font-weight:700;}
.brand p{margin:3px 0 0;font-size:12px;color:var(--sub);}
.card{background:var(--card);border-radius:20px;padding:20px;box-shadow:0 10px 30px rgba(31,36,48,.08);}
.hero{text-align:center;padding:6px 0 2px;}
.hero .label{font-size:13px;color:var(--sub);}
.hero .num{font-size:46px;font-weight:800;line-height:1.1;margin:6px 0 8px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.hero .unit{font-size:15px;color:var(--sub);margin-left:4px;-webkit-text-fill-color:var(--sub);}
.badge{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;padding:5px 13px;border-radius:999px;}
.badge.done{color:var(--ok);background:rgba(18,183,106,.1);}
.badge.todo{color:#b54708;background:rgba(247,144,9,.14);}
.rows{margin-top:16px;border-top:1px solid var(--line);}
.row{display:flex;justify-content:space-between;align-items:center;padding:12px 2px;border-bottom:1px solid var(--line);font-size:14px;}
.row:last-child{border-bottom:0;}
.row .k{color:var(--sub);}
.row .v{font-weight:600;}
button.cta{width:100%;margin-top:18px;border:0;border-radius:16px;padding:17px;font-size:17px;font-weight:700;color:#fff;
  background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 10px 22px rgba(99,102,241,.35);
  transition:transform .08s ease,opacity .2s ease;cursor:pointer;}
button.cta:active{transform:scale(.985);}
button.cta[disabled]{background:#c7cbd6;box-shadow:none;opacity:.9;}
.hint{text-align:center;font-size:12px;color:var(--sub);margin-top:14px;line-height:1.6;}
.msg{margin-top:14px;padding:12px 14px;border-radius:12px;font-size:14px;display:none;}
.msg.show{display:block;}
.msg.ok{background:rgba(18,183,106,.1);color:#05603a;}
.msg.err{background:rgba(240,68,56,.1);color:#912018;}
.keybox{display:none;margin-top:14px;}
.keybox.show{display:block;}
.keybox input{width:100%;padding:13px;border-radius:12px;border:1px solid #dfe3ec;font-size:16px;}
.spin{display:inline-block;width:15px;height:15px;border:2px solid rgba(255,255,255,.45);border-top-color:#fff;
  border-radius:50%;animation:sp .7s linear infinite;vertical-align:-2px;margin-right:8px;}
@keyframes sp{to{transform:rotate(360deg)}}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand">
    <div class="logo">🐵</div>
    <div>
      <h1>Buddy 加油站 · 每日签到</h1>
      <p id="sub">正在读取活动状态…</p>
    </div>
  </div>

  <div class="card">
    <div class="hero">
      <div class="label">当前累计积分</div>
      <div class="num"><span id="total">--</span><span class="unit">分</span></div>
      <div id="badge" class="badge todo">读取中…</div>
    </div>
    <div class="rows">
      <div class="row"><span class="k">今日已得</span><span class="v" id="today">--</span></div>
      <div class="row"><span class="k">资源余额</span><span class="v" id="remaining">--</span></div>
      <div class="row"><span class="k">昨日用量</span><span class="v" id="usage">--</span></div>
      <div class="row"><span class="k">连续签到</span><span class="v" id="streak">--</span></div>
      <div class="row"><span class="k">活动截止</span><span class="v" id="end">--</span></div>
      <div class="row"><span class="k">上次签到</span><span class="v" id="last">--</span></div>
    </div>
    <button id="btn" class="cta" disabled>读取中…</button>
    <div id="msg" class="msg"></div>
    <div id="keybox" class="keybox">
      <input id="key" type="password" inputmode="numeric" placeholder="输入访问口令后回车">
    </div>
  </div>
  <div class="hint">服务器已开启 <b>每天 09:10 自动签到</b><br>你随时来看看记录就行 · 下方按钮是手动备用</div>
</div>

<script>
var KEY_STORE = "wb_checkin_key";
function $(id){ return document.getElementById(id); }
function getKey(){ try { return localStorage.getItem(KEY_STORE) || ""; } catch(e){ return ""; } }
function setSub(t){ $("sub").textContent = t; }
function showMsg(t, kind){ var m=$("msg"); m.textContent=t; m.className="msg show "+(kind||"ok"); }
function hideMsg(){ $("msg").className = "msg"; }
function nz(v, d){ return (v===null || v===undefined) ? d : v; }

function api(path, opts){
  // 用相对路径（不带开头 /），这样无论挂在 http://ip:8765/ 还是 https://域名/buddy/ 下都能正确请求
  var k = getKey();
  var url = path + (k ? (path.indexOf("?")>=0 ? "&" : "?") + "k=" + encodeURIComponent(k) : "");
  return fetch(url, opts || {}).then(function(r){
    if (r.status === 401){ var e = new Error("need key"); e.needKey = true; throw e; }
    return r.json();
  });
}

function render(s){
  if (!s) return;
  $("total").textContent = nz(s.total, "--");
  $("today").textContent = (s.today != null ? "+" + s.today : "--") + " 分";
  $("remaining").textContent = (s.remaining != null ? s.remaining : "--") + " 分";
  $("usage").textContent = (s.usage != null ? s.usage : "--") + " 分";
  $("streak").textContent = nz(s.streak, "--") + " 天";
  $("end").textContent = nz(s.end_time, "--");
  var lr = s.last_run;
  if (lr && lr.ts){
    var tag = (lr.source === "web") ? "手动" : "自动";
    $("last").textContent = (lr.ok ? "✅ " : "⚠️ ") + tag + " " + lr.ts.slice(5, 16);
    $("last").title = lr.message || "";
  } else {
    $("last").textContent = "暂无记录";
  }
  var b = $("badge"), btn = $("btn");
  if (s.checked){
    b.className = "badge done"; b.textContent = "今天已签到 ✅";
    btn.disabled = true; btn.textContent = "今日已签到";
  } else {
    b.className = "badge todo"; b.textContent = "今天还没签";
    btn.disabled = false; btn.textContent = "立即签到";
  }
  var parts = [];
  if (s.activity) parts.push(s.activity);
  if (s.theme) parts.push("· " + s.theme);
  if (s.season) parts.push("第" + s.season + "期");
  setSub(parts.join(" ") || "WorkBuddy 签到活动");
}

function load(){
  hideMsg();
  api("api/status").then(function(d){
    if (!d.ok){ setSub("读取失败"); showMsg(d.error || "读取失败", "err"); return; }
    render(d);
  }).catch(function(e){
    if (e && e.needKey){ $("keybox").className = "keybox show"; setSub("需要访问口令"); showMsg("请输入访问口令后回车", "err"); }
    else { setSub("网络错误"); showMsg("连接失败：" + (e && e.message), "err"); }
  });
}

function checkin(){
  var btn = $("btn");
  hideMsg();
  btn.disabled = true;
  btn.innerHTML = '<span class="spin"></span>签到中…';
  api("api/checkin", {method:"POST"}).then(function(d){
    if (!d.ok){ showMsg(d.error || "签到失败", "err"); if (d.status) render(d.status); else btn.disabled=false, btn.textContent="立即签到"; }
    else { showMsg(d.message, "ok"); render(d.status); }
  }).catch(function(e){
    if (e && e.needKey){ $("keybox").className = "keybox show"; showMsg("请输入访问口令后回车", "err"); }
    else { showMsg("网络错误：" + (e && e.message), "err"); }
    btn.disabled = false; btn.textContent = "立即签到";
  });
}

$("btn").addEventListener("click", checkin);
$("key").addEventListener("change", function(e){
  try { localStorage.setItem(KEY_STORE, e.target.value.trim()); } catch(err){}
  load();
});
load();
</script>
</body>
</html>
"""


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
        self._send(code, json.dumps(obj, ensure_ascii=False), "application/json; charset=utf-8")

    def _key_ok(self, query):
        if not ACCESS_KEY:
            return True
        got = (query.get("k", [""])[0]) or self.headers.get("X-Access-Key", "")
        return got == ACCESS_KEY

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
                self._json(200, {"ok": False, "error": str(e), "last_run": read_last_run()})
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
                self._json(200, r)
            except Exception as e:
                self._json(200, {"ok": False, "error": str(e), "last_run": read_last_run()})
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


if __name__ == "__main__":
    main()
