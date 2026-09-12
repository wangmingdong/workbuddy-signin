#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""探测从 app.asar 里发现的 usage 接口。"""
import json, sys
from workbuddy_checkin import load_session, find_token_file, call

paths = [
    # meter 下
    "/usage-list",
    "/credit-usage",
    "/get-credit-usage",
    "/get-usage-list",
    # billing 下（去掉 meter）
    "/v2/billing/usage-list",
    "/v2/billing/credit-usage",
    "/v2/billing/get-credit-usage",
    "/v2/billing/get-usage-list",
    # 其他
    "/v2/billing/meter/usage-list",
    "/v2/billing/meter/credit-usage",
]

bodies = [
    {"PageNumber": 1, "PageSize": 10, "StartTime": "2026-09-11 00:00:00", "EndTime": "2026-09-12 23:59:59"},
    {"PageNumber": 1, "PageSize": 10, "TimeRange": "7d"},
    {"PageNumber": 1, "PageSize": 10},
    {"StartTime": "2026-09-11 00:00:00", "EndTime": "2026-09-12 23:59:59"},
    {},
]

if __name__ == "__main__":
    tok = find_token_file()
    if not tok:
        print("找不到 token 文件")
        sys.exit(2)
    sess = load_session(tok)
    base = f"https://{sess['domain']}"
    print(f"uid={sess['uid']} domain={sess['domain']}\n")
    for path in paths:
        for idx, body in enumerate(bodies):
            try:
                s, b = call(base, path, sess, body, allow_direct=False)
                data = json.loads(b)
                print(f"✅ [{s}] {path} body#{idx}")
                print(json.dumps(data, ensure_ascii=False, indent=2)[:1200])
                print("-" * 40)
                break
            except Exception as e:
                err = str(e)
                print(f"❌ {path} body#{idx} -> {err[:120]}")
