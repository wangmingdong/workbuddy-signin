# -*- coding: utf-8 -*-
"""把华为保活探针 + systemd timer 装上 SERVER_IP_112

用法:
    python install_hw_keepalive.py            # 安装/更新并启动
    python install_hw_keepalive.py stop       # 停用 timer
"""
import os
import sys

# ⚠️ envconf.py 在仓库根目录，本脚本在 huawei/ 子目录 → 补 sys.path 兜底
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import paramiko

from envconf import load_local_env
load_local_env()

HOST = os.environ.get("ECS_HOST", "SERVER_IP_112")
PORT = int(os.environ.get("ECS_PORT", "22"))
USER = os.environ.get("ECS_USER", "root")
PASS = os.environ.get("ECS_PASS", "")
REMOTE = "/opt/wb-checkin"
LOCAL = os.path.dirname(os.path.abspath(__file__))

SERVICE = """[Unit]
Description=Huawei CodeArts session keepalive (single run)
After=network-online.target

[Service]
Type=oneshot
WorkingDirectory=/opt/wb-checkin
ExecStart=/usr/bin/python3 /opt/wb-checkin/hw_keepalive.py
"""

TIMER = """[Unit]
Description=Huawei CodeArts session keepalive timer
After=network-online.target

[Timer]
OnBootSec=2min
OnUnitActiveSec=3min
AccuracySec=10s
Unit=wb-hw-keepalive.service

[Install]
WantedBy=timers.target
"""


def connect():
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(HOST, port=PORT, username=USER, password=PASS,
              look_for_keys=False, allow_agent=False, timeout=25)
    return c


def sh(c, cmd, timeout=90):
    _, out, err = c.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", "replace")
    e = err.read().decode("utf-8", "replace")
    return o + (("\n[stderr] " + e) if e.strip() else "")


def main():
    action = sys.argv[1] if len(sys.argv) > 1 else "install"
    c = connect()

    if action == "stop":
        print(sh(c, "systemctl disable --now wb-hw-keepalive.timer 2>&1 | tail -3"))
        c.close()
        return

    sftp = c.open_sftp()
    sftp.put(os.path.join(LOCAL, "hw_keepalive.py"), REMOTE + "/hw_keepalive.py")
    sftp.chmod(REMOTE + "/hw_keepalive.py", 0o755)
    for path, content in (
        ("/etc/systemd/system/wb-hw-keepalive.service", SERVICE),
        ("/etc/systemd/system/wb-hw-keepalive.timer", TIMER),
    ):
        with sftp.open(path, "w") as f:
            f.write(content)
    sftp.close()
    print("[ok] 已上传 hw_keepalive.py + systemd units")

    print(sh(c, "systemctl daemon-reload && systemctl enable --now wb-hw-keepalive.timer"))
    print(sh(c, "systemctl start wb-hw-keepalive.service; sleep 2; echo '--- keepalive log ---'; tail -3 /opt/wb-checkin/hw_keepalive.log 2>/dev/null; echo '--- timers ---'; systemctl list-timers wb-hw-keepalive.timer --no-pager | head -3"))
    c.close()


if __name__ == "__main__":
    main()
