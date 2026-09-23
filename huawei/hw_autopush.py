# -*- coding: utf-8 -*-
"""华为会话自动推送 + keeper 看护

- 校验浏览器最新 dump 的 devcloud 会话是否有效（打 delivery 只读接口）
- 有效、且与服务器现有 cookie 不同 → SFTP 推到 112 并重启服务/保活
- keeper 心跳超时（>15 分钟）→ 自动拉起 hw_keeper.js

用法：
    python hw_autopush.py           # 跑一次
    python hw_autopush.py --loop    # 常驻，每 5 分钟一次
"""
import json
import os
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.request

# ⚠️ envconf.py 在仓库根目录，本脚本在 huawei/ 子目录；
# run_autopush.bat 先 cd 到本目录再启动，根目录不在 sys.path 上会
# `ModuleNotFoundError: No module named 'envconf'` 秒退（常驻推送静默失效）。
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

BASE = os.path.dirname(os.path.abspath(__file__))
COOKIES = os.path.join(BASE, "hw_cookies.json")
OUT = os.path.join(BASE, "hw_cookie.txt")
LOG = os.path.join(BASE, "hw_autopush.log")
HEARTBEAT = os.path.join(BASE, "hw_keeper.heartbeat")
KEEPER_JS = os.path.join(BASE, "hw_keeper.js")
NODE = r"C:\Users\54004\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"

KEEPER_STALE_SEC = 15 * 60
INTERVAL_SEC = 300

from envconf import load_local_env
load_local_env()

HOST = os.environ.get("ECS_HOST", "SERVER_IP_112")
PORT = int(os.environ.get("ECS_PORT", "22"))
USER = os.environ.get("ECS_USER", "root")
PASS = os.environ.get("ECS_PASS", "")
REMOTE = "/opt/wb-checkin"
NEEDED = ["HWWAFSESTIME", "HWWAFSESID", "devclouddevuibjtcftk",
          "devclouddevuibjJ_SESSION_ID", "devclouddevuibjagencyID", "BENSESSCC_TAG"]
URL = ("https://devcloud.cn-north-4.huaweicloud.com"
       "/chat/PromptCenterService/v1/ops/delivery?channel=WEB")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0")

_CTX = ssl.create_default_context()
_CTX.check_hostname = False
_CTX.verify_mode = ssl.CERT_NONE


def log(m):
    line = "[%s] %s" % (time.strftime("%Y-%m-%d %H:%M:%S"), m)
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
        ls = open(LOG, encoding="utf-8", errors="replace").readlines()
        if len(ls) > 800:
            open(LOG, "w", encoding="utf-8").writelines(ls[-800:])
    except Exception:
        pass
    print(line, flush=True)


def cv(c):
    return (c.get("value") or "").replace("\r", "").replace("\n", "")


def load_cookie():
    try:
        cj = json.load(open(COOKIES, encoding="utf-8"))
    except Exception as e:
        return None, None, "dump err %s" % e
    dev = [c for c in cj if "devcloud.cn-north-4" in (c.get("domain") or "")]
    if not dev:
        return None, None, "no devcloud cookie"
    vals = {c.get("name"): cv(c) for c in dev}
    cftk = vals.get("devclouddevuibjtcftk", "")
    out = "; ".join("%s=%s" % (n, vals[n]) for n in NEEDED if vals.get(n))
    return out, cftk, "ok"


def check(cookie, cftk):
    headers = {
        "Cookie": cookie, "cftk": cftk,
        "language": "zh-cn", "x-language": "zh-cn",
        "x-requested-with": "XMLHttpRequest", "agent-type": "PromptCenter",
        "accept": "application/json, text/plain, */*",
        "referer": "https://devcloud.cn-north-4.huaweicloud.com/chat/home",
        "user-agent": UA,
    }
    url = "%s&_=%d" % (URL, int(time.time() * 1000))
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=headers),
                                    timeout=20, context=_CTX) as r:
            b = r.read().decode("utf-8", "replace")
        ok = ("campaigns" in b or "benefitAmount" in b or "campaignId" in b)
        return ok, "HTTP %s %s" % (r.status, "JSON ok" if ok else "html")
    except urllib.error.HTTPError as e:
        try:
            b = e.read().decode("utf-8", "replace")
        except Exception:
            b = ""
        return False, "HTTP %s %s" % (e.code, b[:80].replace("\n", " "))
    except Exception as e:
        return False, "ERR %s" % e


def push(cookie):
    import paramiko
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(cookie)
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(HOST, port=PORT, username=USER, password=PASS,
              look_for_keys=False, allow_agent=False, timeout=25)
    sftp = c.open_sftp()
    sftp.put(OUT, REMOTE + "/hw_cookie.txt")
    sftp.close()
    _, out, _ = c.exec_command(
        "systemctl restart wb-checkin >/dev/null 2>&1; "
        "systemctl restart wb-hw-keepalive.service; sleep 2; "
        "tail -2 /opt/wb-checkin/hw_keepalive.log")
    logtxt = out.read().decode("utf-8", "replace").strip().replace("\n", " | ")
    c.close()
    return logtxt


def keeper_alive():
    try:
        return (time.time() - os.path.getmtime(HEARTBEAT)) < KEEPER_STALE_SEC
    except Exception:
        return False


def start_keeper():
    try:
        logf = open(os.path.join(BASE, "hw_keeper.out.log"), "ab")
        subprocess.Popen([NODE, KEEPER_JS], cwd=BASE,
                         creationflags=0x00000008 | 0x00000200,
                         stdout=logf, stderr=subprocess.STDOUT)
        log("keeper launched")
    except Exception as e:
        log("keeper launch err %s" % e)


def once():
    if not keeper_alive():
        log("keeper heartbeat stale -> relaunch")
        start_keeper()
    cookie, cftk, why = load_cookie()
    if not cookie:
        log("skip: %s" % why)
        return
    ok, msg = check(cookie, cftk)
    log("check: %s -> %s" % (msg, "VALID" if ok else "invalid"))
    if not ok:
        return
    old = ""
    try:
        if os.path.exists(OUT):
            old = open(OUT, encoding="utf-8").read().strip()
    except Exception:
        pass
    if old == cookie:
        log("cookie unchanged, skip push")
        return
    r = push(cookie)
    log("pushed new session -> %s" % r)


def main():
    if "--loop" in sys.argv:
        log("autopush loop start (interval %ss)" % INTERVAL_SEC)
        while True:
            try:
                once()
            except Exception as e:
                log("loop err %s" % e)
            time.sleep(INTERVAL_SEC)
    else:
        once()


if __name__ == "__main__":
    main()
