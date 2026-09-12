#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""继续探测积分消耗明细接口（第二批候选路径）。"""
import json, sys
from workbuddy_checkin import load_session, find_token_file, call

paths = [
    "/get-user-bill-detail",
    "/get-user-bill-list",
    "/get-credit-bill-list",
    "/get-account-bill",
    "/get-credit-flow",
    "/get-credit-account-flow",
    "/get-flow-list",
    "/get-credit-flow-list",
    "/get-user-usage-list",
    "/get-billing-detail",
    "/get-billing-list",
    "/get-meter-list",
    "/get-meter-usage-list",
    "/get-meter-usage-detail",
    "/get-credit-meter-list",
    "/get-user-meter-list",
]

body = {"PageNumber": 1, "PageSize": 10, "StartTime": "2026-09-11 00:00:00", "EndTime": "2026-09-12 23:59:59"}

if __name__ == "__main__":
    tok = find_token_file()
    if not tok:
        print("找不到 token 文件")
        sys.exit(2)
    sess = load_session(tok)
    base = f"https://{sess['domain']}/v2/billing/meter"
    print(f"uid={sess['uid']}\n")
    for path in paths:
        try:
            s, b = call(base, path, sess, body, allow_direct=False)
            data = json.loads(b)
            print(f"[{s}] {path}")
            print(json.dumps(data, ensure_ascii=False, indent=2)[:800])
            print("-" * 40)
        except Exception as e:
            err = str(e)
            print(f"[{err[:60]}] {path}")
