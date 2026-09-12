import sys; sys.path.insert(0,".")
import urllib.request, json
from workbuddy_checkin import load_session, find_token_file, UA
sess=load_session(find_token_file())
tok=sess["access_token"]; uid=sess["uid"]; dom=sess["domain"]
body={"startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59","productCode":"p_tcaca"}
hosts=["https://www.workbuddy.cn","https://copilot.tencent.com"]
pres=["","/api","/v2","/api/v2"]
for host in hosts:
    for pre in pres:
        path=pre+"/billing/meter/get-user-daily-usage"
        url=host+path
        req=urllib.request.Request(url, data=json.dumps(body).encode(), method="POST")
        req.add_header("Authorization", f"Bearer {tok}")
        req.add_header("X-User-Id", uid); req.add_header("X-Domain", dom)
        req.add_header("Content-Type","application/json"); req.add_header("User-Agent",UA)
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
                print(f"[{r.status}] {url}")
        except urllib.error.HTTPError as e:
            print(f"[{e.code}] {url}  >> {(e.read().decode('utf-8','replace')[:120]).replace(chr(10),' ')}")
        except Exception as e:
            print(f"[ERR ] {url}: {type(e).__name__}")
