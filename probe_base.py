import sys; sys.path.insert(0,".")
from workbuddy_checkin import load_session, find_token_file, call
sess=load_session(find_token_file())
uid=sess["uid"]; tok=sess["access_token"]; dom=sess["domain"]
bodies={"startTime":"2026-09-11 00:00:00","endTime":"2026-09-12 23:59:59","productCode":"p_tcaca"}
bases=["https://copilot.tencent.com","https://www.workbuddy.cn","https://copilot.tencent.com/api","https://www.workbuddy.cn/api"]
for base in bases:
    for pre in ["/billing/meter","/v2/billing/meter"]:
        path=pre+"/get-user-daily-usage"
        try:
            st,b=call(base,path,sess,bodies)
        except Exception as e:
            print(f"[ERR ] {base}{path}: {type(e).__name__}")
            continue
        print(f"[{st}] {base}{path} >> {b[:160].replace(chr(10),' ')}")
