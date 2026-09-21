#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""华为码道 · 登录态保活探针

背景：华为云 devcloud 的会话 cookie（devclouddevuibjJ_SESSION_ID）是「会话级」凭据，
闲置约 30~60 分钟就会被服务端判失效（表现为接口返回 401 DEV.00000001 Token missing），
导致每天 08:35 的自动签到几乎必然失败。

做法：由 systemd timer 每 3 分钟打一次只读的 delivery 接口，让服务端会话保持活跃。
同时把结果写入 hw_keepalive_state.json，供签到中心 / 巡检脚本读取。

注意：本脚本只读，不领取、不确认，幂等无副作用。
"""
import datetime
import json
import os
import ssl
import time
import urllib.error
import urllib.request

BASE = os.path.dirname(os.path.abspath(__file__))
COOKIE_FILE = os.path.join(BASE, "hw_cookie.txt")
LOG_FILE = os.path.join(BASE, "hw_keepalive.log")
STATE_FILE = os.path.join(BASE, "hw_keepalive_state.json")
URL = (
    "https://devcloud.cn-north-4.huaweicloud.com"
    "/chat/PromptCenterService/v1/ops/delivery?channel=WEB"
)
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0"
)

_CTX = ssl.create_default_context()
_CTX.check_hostname = False
_CTX.verify_mode = ssl.CERT_NONE


def _now():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def _log(line):
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
        # 只保留最近 500 行
        with open(LOG_FILE, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
        if len(lines) > 500:
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                f.writelines(lines[-500:])
    except Exception:
        pass


def _state(rec):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(rec, f, ensure_ascii=False, indent=2)
    except Exception:
        pass


def main():
    cookie = ""
    try:
        if os.path.exists(COOKIE_FILE):
            cookie = open(COOKIE_FILE, encoding="utf-8").read().strip()
    except Exception:
        cookie = ""

    if not cookie:
        rec = {"ts": _now(), "ok": False, "status": 0, "msg": "no cookie"}
        _log("%s  NOCOOKIE" % _now())
        _state(rec)
        return

    cftk = ""
    for part in cookie.split(";"):
        part = part.strip()
        if part.startswith("devclouddevuibjtcftk="):
            cftk = part.split("=", 1)[1]
            break

    headers = {
        "Cookie": cookie,
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

    status, ok, msg = 0, False, ""
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20, context=_CTX) as r:
            status = r.status
            body = r.read().decode("utf-8", "replace")
        if status == 200 and (
            '"campaigns"' in body or "benefitAmount" in body or "campaignId" in body
        ):
            ok = True
            msg = "alive"
        else:
            msg = "html/other"
    except urllib.error.HTTPError as e:
        status = e.code
        try:
            body = e.read().decode("utf-8", "replace")
        except Exception:
            body = ""
        if status in (401, 403):
            msg = "EXPIRED(need re-login)"
        else:
            msg = "HTTP %s %s" % (status, body[:80])
    except Exception as e:
        status = -1
        msg = "ERR %s" % e

    _log("%s  STATUS=%s  %s" % (_now(), status, msg))
    _state({"ts": _now(), "ok": ok, "status": status, "msg": msg})


if __name__ == "__main__":
    main()
