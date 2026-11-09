# -*- coding: utf-8 -*-
"""把本机 lx_cookie.txt 推到 112，并实测服务器侧接口是否恢复。

只动一个凭据文件，不碰 web_server.py；web_server.py 已改为「现读盘」，
所以推送后无需 systemctl restart。

用法： python push_lx_cookie.py
"""
import datetime
import os
import sys

import paramiko

from envconf import load_local_env

load_local_env()
BASE = os.path.dirname(os.path.abspath(__file__))
LOCAL = os.path.join(BASE, "lx_cookie.txt")
REMOTE = "/opt/wb-checkin/lx_cookie.txt"
BACKUP_DIR = os.path.join(BASE, "cred_backup")

VERIFY = """import datetime, urllib.error, sys
sys.path.insert(0, '/opt/wb-checkin')   # -c/脚本目录是 /tmp，cwd 不在 sys.path
import web_server as w
d = datetime.date.today().isoformat()
try:
    r = w._lx_api('?date=' + d)
    print('OK ' + str(r)[:180])
except urllib.error.HTTPError as e:
    print('HTTP %s' % e.code)
except Exception as e:
    print('ERR %s' % e)
"""


def main():
    try:
        with open(LOCAL, "r", encoding="utf-8") as f:
            cookie = f.read().strip()
    except Exception as e:
        print("FAIL 读不到本地 lx_cookie.txt: %s" % e)
        return 1
    if not cookie or "wps_sid=" not in cookie:
        print("FAIL lx_cookie.txt 里没有 wps_sid，说明还没登录灵犀")
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

    # 先把服务器旧凭据备份到本地 cred_backup（可回滚）
    try:
        os.makedirs(BACKUP_DIR, exist_ok=True)
        with sftp.open(REMOTE, "r") as f:
            old = f.read().decode("utf-8", "replace")
        ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        bak = os.path.join(BACKUP_DIR, "lx_cookie.remote.%s.txt" % ts)
        with open(bak, "w", encoding="utf-8") as f:
            f.write(old)
        print("[backup] 服务器旧 Cookie -> %s" % bak)
    except Exception as e:
        print("[backup] 跳过（%s）" % e)

    sftp.put(LOCAL, REMOTE)

    # 在服务器上实测新 Cookie（不是只看文件写没写进去）
    with sftp.open("/tmp/_lx_verify.py", "w") as f:
        f.write(VERIFY)
    sftp.close()
    i, o, e = c.exec_command(
        "cd /opt/wb-checkin && /usr/bin/python3.11 /tmp/_lx_verify.py", timeout=60
    )
    out = o.read().decode("utf-8", "replace").strip()
    err = e.read().decode("utf-8", "replace").strip()
    c.close()
    print("[verify] " + (out or "(空)"))
    if err:
        print("[verify:stderr] " + err[:300])
    if out.startswith("OK "):
        print("OK 服务器 Cookie 已生效，无需重启；明天自动签到会用它。")
        return 0
    print("WARN 服务器仍不可用（%s）。确认已登录 lingxi.wps.cn 后重试；若仍失败可能是上游临时故障。" % (out or "无输出"))
    return 1


if __name__ == "__main__":
    sys.exit(main())
