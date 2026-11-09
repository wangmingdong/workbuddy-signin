# -*- coding: utf-8 -*-
"""把本机 qoder_cookie.txt 推到 112，并实测服务器的逐包到期接口是否恢复。

只动一个凭据文件，不碰 web_server.py；web_server.py 已是「现读盘 + 失败不缓存」，
推送后无需 systemctl restart，手机端下一次刷新就能看到「将过期积分」。

用法：
    python push_qoder_cookie.py
"""
import datetime
import os
import sys

import paramiko

from envconf import load_local_env

load_local_env()
BASE = os.path.dirname(os.path.abspath(__file__))
LOCAL = os.path.join(BASE, "qoder_cookie.txt")
REMOTE = "/opt/wb-checkin/qoder_cookie.txt"
BACKUP_DIR = os.path.join(BASE, "cred_backup")

VERIFY = """import json, sys, urllib.error, urllib.request
sys.path.insert(0, '/opt/wb-checkin')
import web_server as w
w._QD_USAGE_CACHE.update({"ts": 0, "data": None})
w._QD_CSRF_CACHE.update({"ts": 0, "token": ""})
headers = w._qd_web_headers()
headers["X-Requested-With"] = "XMLHttpRequest"
csrf = w._qd_web_csrf()
if csrf:
    headers["X-CSRF-TOKEN"] = csrf
try:
    req = urllib.request.Request(
        w.QD_WEB_BASE + "/api/v2/me/usages/big_model_credits", headers=headers)
    with urllib.request.urlopen(req, timeout=20, context=w._SSL_CTX) as r:
        d = json.loads(r.read().decode("utf-8", "replace"))
    ex = w._qd_parse_pack_expiry(d)
    q = w._qd_quota_info() or {}
    print("OK " + json.dumps(
        {"expiring": ex, "balance": q.get("balance"), "csrf": bool(csrf)},
        ensure_ascii=False))
except urllib.error.HTTPError as e:
    print("HTTP %s" % e.code)
except Exception as e:
    print("ERR %s" % e)
"""


def main():
    try:
        with open(LOCAL, "r", encoding="utf-8") as f:
            cookie = f.read().strip()
    except Exception as e:
        print("FAIL 读不到本地 qoder_cookie.txt: %s" % e)
        return 1
    if not cookie or "=" not in cookie:
        print("FAIL qoder_cookie.txt 为空，说明还没登录 qoder.com")
        return 1

    host = os.environ.get("ECS_HOST", "")
    user = os.environ.get("ECS_USER", "")
    pw = os.environ.get("ECS_PASS", "")
    if not (host and user and pw):
        print("FAIL .env 缺 ECS_HOST / ECS_USER / ECS_PASS")
        return 2

    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(host, username=user, password=pw, timeout=20)
    sftp = c.open_sftp()

    try:
        os.makedirs(BACKUP_DIR, exist_ok=True)
        with sftp.open(REMOTE, "r") as f:
            old = f.read().decode("utf-8", "replace")
        ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        bak = os.path.join(BACKUP_DIR, "qoder_cookie.remote.%s.txt" % ts)
        with open(bak, "w", encoding="utf-8") as f:
            f.write(old)
        print("[backup] 服务器旧 Cookie -> %s" % bak)
    except Exception as e:
        print("[backup] 跳过（%s）" % e)

    sftp.put(LOCAL, REMOTE)

    with sftp.open("/tmp/_qd_verify.py", "w") as f:
        f.write(VERIFY)
    sftp.close()
    i, o, e = c.exec_command(
        "cd /opt/wb-checkin && /usr/bin/python3.11 /tmp/_qd_verify.py", timeout=60
    )
    out = o.read().decode("utf-8", "replace").strip()
    err = e.read().decode("utf-8", "replace").strip()
    c.close()
    print("[verify] " + (out or "(空)"))
    if err:
        print("[verify:stderr] " + err[:300])
    if out.startswith("OK "):
        import json

        try:
            info = json.loads(out[3:])
        except Exception:
            info = {}
        if info.get("expiring"):
            print("OK 服务器的逐包到期数据已生效，刷新手机网页即可看到「将过期积分」。")
        else:
            print("WARN Cookie 有效，但该账号当前没有带到期日的积分包（或明细为空），卡片只显示余额。")
        return 0
    if out == "HTTP 401":
        print("WARN Cookie 仍被拒绝（401）。请在弹窗里确认已登录 qoder.com 后重试。")
        return 1
    print("WARN 服务器验证未通过（%s）。" % (out or "无输出"))
    return 1


if __name__ == "__main__":
    sys.exit(main())
