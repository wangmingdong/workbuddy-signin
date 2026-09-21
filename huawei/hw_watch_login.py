# -*- coding: utf-8 -*-
"""本机守望：等王大少在 Edge 里登录华为云 → 自动抓取有效会话 → 推到服务器 → 重启保活

后台跑，检测到有效会话就退出（并打印结论）。
    python hw_watch_login.py [最长等待分钟，默认 40]
"""
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request

import paramiko

from envconf import load_local_env
load_local_env()

# 服务器地址/路径均可通过环境变量覆盖（见 .env.example）：
#   ECS_HOST / ECS_PORT / ECS_USER / ECS_PASS —— SSH 登录信息
#   ECS_REMOTE                                —— 服务器上的部署目录
#   WEB_PORT                                 —— 网页服务端口（健康检查用）
HOST = os.environ.get("ECS_HOST", "your_server_ip")
PORT = int(os.environ.get("ECS_PORT", "22"))
USER = os.environ.get("ECS_USER", "root")
PASS = os.environ.get("ECS_PASS", "")
REMOTE = os.environ.get("ECS_REMOTE", "/opt/wb-checkin")
WEB_PORT = os.environ.get("WEB_PORT", "8790")
LOCAL = os.path.dirname(os.path.abspath(__file__))
COOKIES = os.path.join(LOCAL, "hw_cookies.json")
OUT = os.path.join(LOCAL, "hw_cookie.txt")
NEEDED = ["HWWAFSESTIME", "HWWAFSESID", "devclouddevuibjtcftk",
          "devclouddevuibjJ_SESSION_ID", "devclouddevuibjagencyID", "BENSESSCC_TAG"]
URL = ("https://devcloud.cn-north-4.huaweicloud.com"
       "/chat/PromptCenterService/v1/ops/delivery?channel=WEB")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0")

_CTX = ssl.create_default_context()
_CTX.check_hostname = False
_CTX.verify_mode = ssl.CERT_NONE


def cv(c):
    return (c.get("value") or "").replace("\r", "").replace("\n", "")


def try_session():
    """返回 (ok, cookie串, 摘要)"""
    if not os.path.exists(COOKIES):
        return False, "", "no dump"
    try:
        cj = json.load(open(COOKIES, encoding="utf-8"))
    except Exception as e:
        return False, "", "dump parse err %s" % e
    dev = [c for c in cj if "devcloud.cn-north-4" in (c.get("domain") or "")]
    if not dev:
        return False, "", "no devcloud cookie"
    cftk = ""
    for c in dev:
        if c.get("name") == "devclouddevuibjtcftk":
            cftk = cv(c)
    headers = {
        "Cookie": "; ".join("%s=%s" % (c.get("name"), cv(c)) for c in dev),
        "cftk": cftk,
        "language": "zh-cn",
        "x-language": "zh-cn",
        "x-requested-with": "XMLHttpRequest",
        "agent-type": "PromptCenter",
        "accept": "application/json, text/plain, */*",
        "referer": "https://devcloud.cn-north-4.huaweicloud.com/chat/home",
        "user-agent": UA,
    }
    url = "%s&_=%d" % (URL, int(time.time() * 1000))
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=headers),
                                    timeout=20, context=_CTX) as r:
            body = r.read().decode("utf-8", "replace")
        if '"campaigns"' in body or "benefitAmount" in body or "campaignId" in body:
            vals = {}
            for c in dev:
                if c.get("name") in NEEDED:
                    vals[c.get("name")] = cv(c)
            out = "; ".join("%s=%s" % (n, vals[n]) for n in NEEDED if vals.get(n))
            return True, out, "JSON ok"
        return False, "", "HTML (not logged in yet)"
    except urllib.error.HTTPError as e:
        # 读响应体，区分「根本没登录」和「登录了但会话过期」
        try:
            b = e.read().decode("utf-8", "replace")
        except Exception:
            b = ""
        if "Token missing" in b or "DEV.00000001" in b:
            return False, "", "HTTP %s NOT-LOGGED-IN (Token missing)" % e.code
        return False, "", "HTTP %s %s" % (e.code, b[:120].replace("\n", " "))
    except Exception as e:
        return False, "", "ERR %s" % e


def push(cookie):
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
        "systemctl restart wb-hw-keepalive.service; sleep 3; "
        "tail -3 %s/hw_keepalive.log 2>/dev/null" % REMOTE)
    log = out.read().decode("utf-8", "replace")
    _, out2, _ = c.exec_command("curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:%s/" % WEB_PORT)
    code = out2.read().decode("utf-8", "replace")
    c.close()
    return log, code


def main():
    minutes = int(sys.argv[1]) if len(sys.argv) > 1 else 40
    deadline = time.time() + minutes * 60
    n = 0
    while time.time() < deadline:
        n += 1
        ok, cookie, why = try_session()
        print("[%s] #%d %s" % (time.strftime("%H:%M:%S"), n, why), flush=True)
        if ok:
            log, code = push(cookie)
            print("\n=== 抓到有效会话，已推送 ===", flush=True)
            print("server web:", code, flush=True)
            print("keepalive log:\n" + log, flush=True)
            return 0
        time.sleep(20)
    print("TIMEOUT: %d 分钟内未检测到有效会话" % minutes, flush=True)
    return 1


if __name__ == "__main__":
    sys.exit(main())
