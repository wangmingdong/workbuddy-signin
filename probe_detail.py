#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, sys
sys.path.insert(0, ".")
from workbuddy_checkin import load_session, find_token_file, call

sess = load_session(find_token_file())
base = f"https://{sess['domain']}/v2/billing/meter"

today = "2026-09-12"
yest = "2026-09-11"
bodies = {
    "get-user-daily-usage":   {"startTime": f"{yest} 00:00:00", "endTime": f"{today} 23:59:59", "productCode": "p_tcaca"},
    "get-user-request-usage": {"pageNum": 1, "pageSize": 20, "startTime": f"{yest} 00:00:00", "endTime": f"{today} 23:59:59", "productCode": "p_tcaca"},
    "get-user-resource-summary": {},
    "get-user-resource-free-packages": {},
    "get-user-resource-paid-packages": {},
    "get-user-resource": {"PageNumber":1,"PageSize":100,"ProductCode":"p_tcaca","Status":[0,3],
                          "PackageStartTimeRangeBegin":"2024-12-01 21:25:00","PackageStartTimeRangeEnd":"2026-12-31 23:59:59"},
}

for name, body in bodies.items():
    try:
        st, b = call(base, "/" + name, sess, body)
    except Exception as e:
        print(f"[ERR ] {name}: {type(e).__name__}: {str(e)[:90]}")
        continue
    # 打印关键结构
    try:
        j = json.loads(b)
        keys = list(j.keys())
        data = j.get("data") or {}
        dkeys = list(data.keys())[:12] if isinstance(data, dict) else type(data).__name__
    except Exception:
        keys = "parse-fail"; dkeys = ""
    print(f"[{st}] {name}  topkeys={keys}  datakeys={dkeys}")
    print("    body>>", b[:300].replace("\n"," "))
