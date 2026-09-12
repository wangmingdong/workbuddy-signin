import sys; sys.path.insert(0,".")
import urllib.request, json
from workbuddy_checkin import load_session, find_token_file, UA
sess=load_session(find_token_file())
tok=sess["access_token"]; uid=sess["uid"]; dom=sess["domain"]
host="https://www.workbuddy.cn"
body={"startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59","pageNum":1,"pageSize":50}
for ep in ["get-user-request-usage","get-user-daily-usage"]:
    url=host+"/billing/meter/"+ep
    req=urllib.request.Request(url, data=json.dumps(body).encode(), method="POST")
    req.add_header("Authorization", f"Bearer {tok}")
    req.add_header("X-User-Id", uid); req.add_header("X-Domain", dom)
    req.add_header("Content-Type","application/json"); req.add_header("User-Agent",UA)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            t=r.read().decode('utf-8','replace')
            print(f"[{r.status}] {ep}  >> {t[:500]}")
    except urllib.error.HTTPError as e:
        print(f"[{e.code}] {ep}  >> {(e.read().decode('utf-8','replace')[:200]).replace(chr(10),' ')}")
    except Exception as e:
        print(f"[ERR ] {ep}: {type(e).__name__}: {e}")
