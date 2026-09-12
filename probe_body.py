import sys; sys.path.insert(0,".")
import urllib.request, json
from workbuddy_checkin import load_session, find_token_file, UA
sess=load_session(find_token_file())
tok=sess["access_token"]; uid=sess["uid"]; dom=sess["domain"]
host="https://www.workbuddy.cn"
endpoint="/billing/meter/get-user-daily-usage"
bodies=[
  {},
  {"date":"2026-09-12"},
  {"startDate":"2026-09-11","endDate":"2026-09-12"},
  {"startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59"},
  {"pageNum":1,"pageSize":30,"startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59"},
  {"productCode":"p_tcaca","startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59"},
  {"timeStart":"2026-09-11","timeEnd":"2026-09-12"},
  {"periodType":"day","date":"2026-09-12"},
  {"type":"daily","startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59"},
  {"dateRange":["2026-09-11","2026-09-12"],"pageNum":1,"pageSize":30},
]
for i,b in enumerate(bodies):
    url=host+endpoint
    req=urllib.request.Request(url, data=json.dumps(b).encode(), method="POST")
    req.add_header("Authorization", f"Bearer {tok}")
    req.add_header("X-User-Id", uid); req.add_header("X-Domain", dom)
    req.add_header("Content-Type","application/json"); req.add_header("User-Agent",UA)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            t=r.read().decode('utf-8','replace')
            print(f"[{r.status}] body#{i} {b}  >> {t[:200]}")
    except urllib.error.HTTPError as e:
        t=e.read().decode('utf-8','replace')
        print(f"[{e.code}] body#{i} {b}  >> {t[:120]}")
    except Exception as e:
        print(f"[ERR ] body#{i} {b}: {type(e).__name__}")
