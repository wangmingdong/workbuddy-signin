#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""探测 WorkBuddy 积分消耗明细接口。"""
import json, os, sys
from workbuddy_checkin import load_session, find_token_file, call

paths = [
    "/get-credit-usage-list",
    "/get-credit-usage-detail",
    "/get-credit-usage-records",
    "/query-credit-usage",
    "/list-credit-usage",
    "/get-credit-bill",
    "/get-user-credit-usage",
    "/get-credit-usage",
    "/get-usage-record",
    "/get-usage-records",
    "/get-credit-usage-log",
    "/get-credit-logs",
    "/get-billing-usage",
]

bodies = [
    {"PageNumber": 1, "PageSize": 10},
    {"PageNumber": 1, "PageSize": 10, "TimeRange": "7d"},
    {"PageNumber": 1, "PageSize": 10, "StartTime": "2026-09-05 00:00:00", "EndTime": "2026-09-12 23:59:59"},
    {"Page": 1, "PageSize": 10},
    {},
]

if __name__ == "__main__":
    tok = find_token_file()
    if not tok:
        print("找不到 token 文件")
        sys.exit(2)
    sess = load_session(tok)
    base = f"https://{sess['domain']}/v2/billing/meter"
    print(f"uid={sess['uid']} domain={sess['domain']}\n")
    for path in paths:
        for idx, body in enumerate(bodies):
            try:
                s, b = call(base, path, sess, body, allow_direct=False)
                if s == 200:
                    data = json.loads(b)
                    print(f"✅ {path} body#{idx} -> {s}")
                    print(json.dumps(data, ensure_ascii=False, indent=2)[:1200])
                    print("-" * 40)
                    break
                elif s in (400, 404, 405, 500):
                    # 记录，但不一定错
                    print(f"🟡 {path} body#{idx} -> {s} {b[:120]}")
                else:
                    print(f"⚪ {path} body#{idx} -> {s} {b[:120]}")
            except Exception as e:
                err = str(e)
                if "HTTP Error" in err:
                    print(f"❌ {path} body#{idx} -> {err[:160]}")
                else:
                    print(f"❌ {path} body#{idx} -> {err[:160]}")
