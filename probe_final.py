import sys; sys.path.insert(0,".")
import urllib.request, json, datetime
from workbuddy_checkin import load_session, find_token_file, UA
sess=load_session(find_token_file())
tok=sess["access_token"]; uid=sess["uid"]; dom=sess["domain"]

def call_usage(host, path, body):
    url=host+path
    req=urllib.request.Request(url, data=json.dumps(body).encode(), method="POST")
    req.add_header("Authorization", f"Bearer {tok}")
    req.add_header("X-User-Id", uid); req.add_header("X-Domain", dom)
    req.add_header("Content-Type","application/json"); req.add_header("User-Agent",UA)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, r.read().decode('utf-8','replace')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8','replace')

# 1) 确认 host/prefix
for host in ["https://www.workbuddy.cn","https://copilot.tencent.com"]:
    for pre in ["/billing/meter","/v2/billing/meter"]:
        st,b=call_usage(host, pre+"/get-user-request-usage",
            {"startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59","pageNum":1,"pageSize":10})
        print(f"[{st}] {host}{pre}/get-user-request-usage")

# 2) 取 7 天明细，按日聚合
end=datetime.date(2026,9,12)
start=end-datetime.timedelta(days=6)
body={"startTime":f"{start} 00:00:00","endTime":f"{end} 23:59:59","pageNum":1,"pageSize":500}
st,b=call_usage("https://www.workbuddy.cn","/billing/meter/get-user-request-usage",body)
print("\n--- 7天聚合 ---")
j=json.loads(b)
recs=j.get("data",{}).get("data",[])
print("total records:", j.get("data",{}).get("total"), "returned:", len(recs))
from collections import defaultdict
daily=defaultdict(float)
for r in recs:
    d=r.get("requestTime","")[:10]
    try: daily[d]+=float(r.get("credit") or 0)
    except: pass
for d in sorted(daily):
    print(f"  {d}: {daily[d]:.2f} 分")
yesterday=(end-datetime.timedelta(days=1)).strftime("%Y-%m-%d")
print(f"\n昨日({yesterday})用量 = {daily.get(yesterday,0):.2f} 分")
