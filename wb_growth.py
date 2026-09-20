# -*- coding: utf-8 -*-
"""WorkBuddy 成长中心「一键完成任务」模块（纯标准库，零依赖）。

官方接口来源（实测 + 上游 workbuddy2api-panel 源码对齐）：
  列表   GET  https://copilot.tencent.com/v2/activity/growth/tasks
  资料   GET  https://copilot.tencent.com/v2/activity/growth/profile
  接受   POST https://copilot.tencent.com/v2/activity/growth/tasks/accept   {"task_codes":[...]}
  领奖   POST https://www.workbuddy.cn/activity/growth/tasks/<code>/claim  (task_code 在路径, 无 body)
         头: x-client-platform: web, Origin/Referer -> www.workbuddy.cn
         响应 data: {"already_claimed":bool,"credit":n,"energy":n}
  桌面上报 POST https://copilot.tencent.com/v2/report   (JSON 数组; UA=WorkBuddy/5.5.6 CLI/2.137.1; 指纹 extName=workbuddy-desktop)
  Web上报 POST https://www.workbuddy.cn/v2/report       (x-client-platform: web)
  Buddy  POST https://copilot.tencent.com/activity/growth/buddy/agreement {"agree":true}
         POST https://copilot.tencent.com/activity/growth/buddy/first {}
  主题   POST https://copilot.tencent.com/v2/user-asset/appearance/set {"themeKey":...}
  对话   POST https://copilot.tencent.com/v2/chat/completions (stream) 模型 glm-5.2

说明：
- 服务端 token 来自明文 token.info（与现有签到一致）；本机桌面文件已加密，本地跑需 WB_TOKEN_FILE 指向明文。
- 行为与「成长计划」由服务端计分：多数任务只需上报对应 eventCode 事件即可点亮进度，再 claim 领奖。
- 个别任务需真实动作（真实 GLM-5.2 对话 / 真实专家对话 / 真实捐赠），按官方口径尽力模拟，仍可能需人工兜底。
"""
import json
import os
import sys
import time
import hashlib
import urllib.request
import urllib.error

CHAT_BASE = "https://copilot.tencent.com"
WEB_BASE = "https://www.workbuddy.cn"
DESKTOP_UA = "WorkBuddy/5.5.6 WorkBuddy/5.5.6 CLI/2.137.1"
WEB_UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
          "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36")

# 不可自动化（需真实动作）：关注公众号 / 真实捐款
NOT_AUTO = {"wb_wechat_oa_subscribe_task", "Expert_Philanthropy"}


def _derive_id(uid, salt):
    h = hashlib.sha256(("%s:%s" % (salt, uid)).encode("utf-8")).digest()
    return h.hex()[:36]


def _req(method, url, token, uid, domain, body=None, headers=None, timeout=30):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    base = {
        "Authorization": "Bearer %s" % token,
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-User-Id": uid,
    }
    if domain:
        base["X-Domain"] = domain
    base.update(headers or {})
    for k, v in base.items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as e:
        t = e.read().decode("utf-8", "replace")
        try:
            return e.code, json.loads(t)
        except Exception:
            return e.code, {"raw": t[:400]}
    except Exception as e:
        return -1, {"err": repr(e)}


# ---------------- 只读 ----------------
def list_tasks(sess):
    s, b = _req("GET", CHAT_BASE + "/v2/activity/growth/tasks",
                sess["access_token"], sess["uid"], sess["domain"])
    if s != 200:
        raise RuntimeError("list_tasks http=%s %s" % (s, b))
    return (b.get("data") or {}).get("tasks") or []


def get_profile(sess):
    s, b = _req("GET", CHAT_BASE + "/v2/activity/growth/profile",
                sess["access_token"], sess["uid"], sess["domain"])
    if s != 200:
        raise RuntimeError("get_profile http=%s %s" % (s, b))
    return (b.get("data") or {})


# ---------------- 写操作 ----------------
def accept_tasks(sess, codes):
    if not codes:
        return None
    return _req("POST", CHAT_BASE + "/v2/activity/growth/tasks/accept",
                sess["access_token"], sess["uid"], sess["domain"],
                {"task_codes": codes})


def claim_task(sess, code):
    hdr = {
        "x-client-platform": "web",
        "Origin": WEB_BASE,
        "Referer": WEB_BASE + "/profile/growth-center",
    }
    s, b = _req("POST", WEB_BASE + "/activity/growth/tasks/%s/claim" % code,
                sess["access_token"], sess["uid"], sess["domain"], headers=hdr)
    d = (b.get("data") or {}) if isinstance(b, dict) else {}
    return s, b, d.get("already_claimed", False), d.get("credit", 0), d.get("energy", 0)


# ---------------- 行为上报 ----------------
def _desktop_fp(sess):
    now = int(time.time() * 1000)
    return {
        "extName": "workbuddy-desktop",
        "ideName": "WorkBuddy",
        "appVersion": "5.5.6",
        "os": "Win32",
        "arch": "x64",
        "osVersion": "10.0",
        "userAgent": DESKTOP_UA,
        "machineId": _derive_id(sess["uid"], "machine"),
        "userId": sess["uid"],
        "locale": "zh-CN",
        "timestamp": now,
        "reportDelay": 0,
    }


def report_desktop(sess, events):
    """events: list[dict]（业务字段）；自动注入桌面指纹。"""
    fp = _desktop_fp(sess)
    arr = []
    for ev in events:
        m = dict(fp)
        m.update(ev)
        if "timestamp" not in m:
            m["timestamp"] = fp["timestamp"]
        arr.append(m)
    return _req("POST", CHAT_BASE + "/v2/report", sess["access_token"],
                sess["uid"], sess["domain"], arr,
                {"User-Agent": DESKTOP_UA, "X-Product": "SaaS",
                 "X-Request-ID": _derive_id(sess["uid"], "req") + str(int(time.time() * 1e6) % 1000000)})


def report_web(sess, event_code, page_url, element_id, element_name):
    ev = {
        "eventCode": event_code,
        "timestamp": int(time.time() * 1000),
        "reportDelay": 0,
        "pageURL": page_url,
        "elementId": element_id,
        "elementName": element_name,
        "os": "Win32", "arch": "", "osVersion": "10.0",
        "userAgent": WEB_UA,
        "machineId": _derive_id(sess["uid"], "webmachine"),
        "userId": sess["uid"],
    }
    return _req("POST", WEB_BASE + "/v2/report", sess["access_token"], sess["uid"],
                sess["domain"], [ev],
                {"x-client-platform": "web", "Origin": WEB_BASE,
                 "Referer": page_url, "User-Agent": WEB_UA,
                 "Accept": "application/json"})


def buddy_agreement(sess):
    return _req("POST", CHAT_BASE + "/activity/growth/buddy/agreement",
                sess["access_token"], sess["uid"], sess["domain"], {"agree": True})


def buddy_first(sess):
    return _req("POST", CHAT_BASE + "/activity/growth/buddy/first",
                sess["access_token"], sess["uid"], sess["domain"], {})


def appearance_set(sess, theme_key):
    return _req("POST", CHAT_BASE + "/v2/user-asset/appearance/set",
                sess["access_token"], sess["uid"], sess["domain"],
                {"themeKey": theme_key})


def chat_completion(sess, model_id="glm-5.2", prompt="hi", max_tokens=32, timeout=45):
    """真实对话一次（stream）。返回 (status, first_content)。"""
    body = {"model": model_id, "messages": [{"role": "user", "content": prompt}],
            "stream": True, "max_tokens": max_tokens}
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(CHAT_BASE + "/v2/chat/completions", data=data, method="POST")
    for k, v in {"Authorization": "Bearer %s" % sess["access_token"],
                 "Content-Type": "application/json",
                 "Accept": "text/event-stream",
                 "X-User-Id": sess["uid"], "X-Domain": sess["domain"],
                 "User-Agent": DESKTOP_UA}.items():
        req.add_header(k, v)
    first = ""
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            status = r.status
            for raw in r:
                line = raw.decode("utf-8", "replace")
                if line.startswith("data: "):
                    payload = line[6:].strip()
                    if payload in ("[DONE]", ""):
                        continue
                    try:
                        obj = json.loads(payload)
                        delta = (obj.get("choices") or [{}])[0].get("delta") or {}
                        c = delta.get("content") or ""
                        if c and not first:
                            first = c
                    except Exception:
                        pass
            return status, first
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")[:200]
    except Exception as e:
        return -1, repr(e)[:200]


# ---------------- 事件构造 ----------------
def _chat_event(sess, conv_id=None, model_id="deepseek-v4-flash", model_name="DeepSeek V4 Flash",
                request_id=None):
    now = int(time.time() * 1000)
    cid = conv_id or ("wb2api-%d" % now)
    rid = request_id or cid
    return {
        "eventCode": "chat_request_send", "timestamp": now, "reportDelay": 0,
        "mode": "craft", "conversationId": cid, "requestId": rid,
        "inputLength": 12, "requestModelId": model_id, "requestModelName": model_name,
        "isPlan": False, "isAutoExecuteTerminal": False, "isAutoModify": False,
        "codebaseEnable": False, "maxToken": 0, "maxSteps": 0, "temperature": 0,
        "maxRetries": 0, "mentionContexts": [], "knowledgeId": [], "knowledgeName": [],
        "codebaseId": "", "mentionContextCount": 0, "command": "", "expertId": "",
        "recommendId": "", "skillId": "", "skillCount": 0, "totalCount": 0, "fileUri": "",
        "presentAt": now, "traceId": "", "rootRequestId": rid, "parentConversationID": cid,
        "agentName": "default", "agentType": "conversation", "userId": sess["uid"],
    }


# ---------------- 单任务驱动 ----------------
def run_task(sess, code):
    """执行单个任务的「上报进度 + 领奖」。返回 (ok, msg)。"""
    try:
        if code in NOT_AUTO:
            return False, "需真实动作（%s），无法自动化" % code

        # 先 accept（not_accepted -> accepted，幂等）
        accept_tasks(sess, [code])
        now = int(time.time() * 1000)
        cid = "wb2api-%d" % now

        if code == "chat_5":
            for i in range(5):
                report_desktop(sess, [_chat_event(sess, "%s-%d" % (cid, i))])
                time.sleep(1.0)
        elif code == "first_buddy":
            report_desktop(sess, [_chat_event(sess, cid)])
            time.sleep(2)
            buddy_agreement(sess)
            buddy_first(sess)
        elif code == "template_5":
            tps = [("1", "深度研究"), ("2", "周报生成"), ("3", "竞品分析"),
                   ("4", "活动策划"), ("5", "代码评审")]
            for tid, tname in tps:
                report_desktop(sess, [
                    {"eventCode": "agent_task_created_with_template",
                     "templateId": tid, "templateName": tname,
                     "conversationId": cid, "requestId": cid + tid,
                     "userId": sess["uid"]},
                    {"eventCode": "template_used", "templateId": tid,
                     "templateName": tname, "conversationId": cid,
                     "requestId": cid + tid, "userId": sess["uid"]},
                ])
                time.sleep(0.8)
        elif code == "create_canvas":
            report_desktop(sess, [{"eventCode": "wbx_design_canvas_task_create/open",
                                   "conversationId": cid, "requestId": cid,
                                   "userId": sess["uid"]}])
        elif code == "playbook_prompt":
            report_desktop(sess, [
                {"eventCode": "playbook_cta_click", "conversationId": cid,
                 "requestId": cid, "userId": sess["uid"]},
                {"eventCode": "playbook_prompt_send", "promptId": "pm-gtm-launch-plan",
                 "promptName": "新产品上市 GTM 发布计划一页纸", "conversationId": cid,
                 "requestId": cid, "userId": sess["uid"]},
            ])
        elif code == "RichMeow_Chat":
            report_desktop(sess, [
                {"eventCode": "agent_task_created", "conversationId": cid,
                 "requestId": cid, "userId": sess["uid"], "extName": "workbuddy-desktop"},
                {"eventCode": "chat_message_response", "conversationId": cid,
                 "requestId": cid, "userId": sess["uid"], "isSuccessful": True},
            ])
        elif code == "Library_read":
            report_web(sess, "web_element_click",
                        "https://www.workbuddy.cn/space/d/o0KWYeynteVv06UnAZqIFm",
                        "library_doc_intro_click", "WorkBuddy资料库介绍")
        elif code == "Hp_Appearance":
            theme_key = "theme-tkmw7j"
            appearance_set(sess, theme_key)
            report_desktop(sess, [{"eventCode": "appearance_skin_apply",
                                   "action": "apply", "source": "settings_close",
                                   "id": theme_key, "vipLevel": 0, "series": "",
                                   "type": "unknown", "conversationId": cid,
                                   "requestId": cid, "userId": sess["uid"]}])
        elif code == "Buddy_App":
            report_desktop(sess, [{"eventCode": "buddy_app_event",
                                   "stage": "discover", "appId": "cb_y5Dy46tPQGGWtueMxXbe",
                                   "conversationId": cid, "requestId": cid,
                                   "userId": sess["uid"]}])
        elif code == "Buddy_App_QQ":
            report_desktop(sess, [{"eventCode": "buddy_app_event",
                                   "stage": "discover", "appId": "cb_y5Dy46tPQGGWtueMxXbe",
                                   "conversationId": cid, "requestId": cid,
                                   "userId": sess["uid"]}])
        elif code == "automation_1":
            report_desktop(sess, [{"eventCode": "automated_task_create_suc",
                                   "taskName": "wb2api 自动化", "conversationId": cid,
                                   "requestId": cid, "userId": sess["uid"]}])
        elif code == "Model_chat_GLM5.2":
            st, _ = chat_completion(sess, "glm-5.2", "hi")
            report_desktop(sess, [_chat_event(sess, cid, "glm-5.2", "GLM-5.2")])
        elif code == "skill_1":
            report_desktop(sess, [
                {"eventCode": "chat_message_response", "finishReason": "tool_calls",
                 "conversationId": cid, "requestId": cid, "userId": sess["uid"]},
                {"eventCode": "skill_info", "id": "润泽小馆·日报撰写",
                 "skillId": "skill_2097350077599879168", "skillVersion": "1.0.0",
                 "toolStatus": "success", "fileCount": 56, "source": "workbuddy-desktop",
                 "conversationId": cid, "requestId": cid, "messageId": cid,
                 "requestModelId": "fast-model", "requestModelName": "fast-model",
                 "traceId": cid, "userId": sess["uid"]},
            ])
        elif code == "expert_5":
            _run_expert(sess, cid, "agent", 5)
        elif code == "Expert_team_use_3":
            _run_expert(sess, cid, "team", 3)
        elif code == "Expert_lighthouse":
            _run_expert(sess, cid, "lh", 1, expert_id="ex_2cvvUZQhDyeJ")
        elif code == "black_cat":
            # 仅在 23:00-08:00 窗口内上报（官方限制）
            h = time.localtime().tm_hour
            if not (h >= 23 or h < 8):
                return False, "black_cat 仅在 23:00-08:00 夜间窗口可完成"
            report_desktop(sess, [_chat_event(sess, cid)])
        else:
            return False, "未知任务 %s，未实现驱动" % code

        # 领奖（进度达标才发奖；重复领 already_claimed 安全）
        time.sleep(2)
        s, b, already, credit, energy = claim_task(sess, code)
        msg_raw = (b.get("msg") or "")
        if s == 200 and (credit or already):
            return True, ("已领 +%s分/%s能量" % (credit, energy)) if credit else "已领过(幂等)"
        if s == 200:
            return False, "已上报但暂未达标领奖: %s" % msg_raw
        if s == 400 and "task not completed" in str(msg_raw):
            return False, "进度未满：需先在 WorkBuddy 真实使用对应功能（如召唤专家/打开 Buddy 应用/用模板），再回来领奖"
        return False, "领奖失败 http=%s %s" % (s, b)
    except Exception as e:
        return False, "异常: %s" % e


def _run_expert(sess, cid, kind, n, expert_id=None):
    """专家召唤+使用链（best-effort：上报 eventCode 序列，不依赖真实专家市场返回）。"""
    for i in range(n):
        rid = "%s-%d" % (cid, i)
        seq = [
            {"eventCode": "summon_click", "kind": kind, "conversationId": rid,
             "requestId": rid, "userId": sess["uid"]},
            {"eventCode": "summoned", "kind": kind, "conversationId": rid,
             "requestId": rid, "userId": sess["uid"]},
            {"eventCode": "agent_task_created", "has_expert": True,
             "expert_id": expert_id or "wb2api-exp", "expert_name": "轻量云专家",
             "conversationId": rid, "requestId": rid, "userId": sess["uid"]},
            {"eventCode": "chat_message_response", "conversationId": rid,
             "requestId": rid, "userId": sess["uid"]},
            {"eventCode": "expert_actual_use", "type": kind,
             "conversationId": rid, "requestId": rid, "userId": sess["uid"]},
        ]
        report_desktop(sess, seq)
        time.sleep(1.0)


# ---------------- 批量 ----------------
def run_all(sess, only_claim=False):
    """一键完成：先 accept 全部，再逐个驱动 + 领奖。返回结果列表。"""
    tasks = list_tasks(sess)
    codes = [t.get("task_code") for t in tasks]
    # accept 全部未报名的
    if not only_claim:
        accept_tasks(sess, [c for c in codes])
    results = []
    for t in tasks:
        code = t.get("task_code")
        ast = t.get("accept_status")
        if ast == "claimed" and (t.get("progress") or {}).get("current") and \
           (t.get("progress") or {}).get("current") >= (t.get("progress") or {}).get("target", 0):
            # 已完成且已领：跳过
            results.append({"code": code, "ok": True, "msg": "已完成已领", "skipped": True})
            continue
        if code in NOT_AUTO:
            results.append({"code": code, "ok": False, "msg": "需真实动作", "skipped": True})
            continue
        if only_claim:
            # 仅领奖：先查最新进度
            cur = list_tasks(sess)
            tt = next((x for x in cur if x.get("task_code") == code), t)
            p = tt.get("progress") or {}
            if not (p.get("current", 0) >= p.get("target", 0) and p.get("target")):
                results.append({"code": code, "ok": False, "msg": "进度未达标", "skipped": True})
                continue
        ok, msg = run_task(sess, code)
        results.append({"code": code, "ok": ok, "msg": msg})
        time.sleep(0.5)
    return results


def get_growth_card(sess):
    """供 web_server 的成长中心卡片数据。"""
    try:
        prof = get_profile(sess)
        tasks = list_tasks(sess)
        rows = []
        claimable = 0
        for t in tasks:
            p = t.get("progress") or {}
            cur, tgt = p.get("current", 0), p.get("target", 0)
            done = (t.get("accept_status") == "claimed") and (tgt and cur >= tgt)
            if done and t.get("has_reward"):
                claimable += 1
            rows.append({
                "code": t.get("task_code"),
                "title": t.get("title"),
                "reward": t.get("reward_credit"),
                "energy": t.get("reward_energy"),
                "accept_status": t.get("accept_status"),
                "current": cur, "target": tgt,
                "done": done,
                "not_auto": t.get("task_code") in NOT_AUTO,
            })
        return {
            "name": "growth",
            "title": "WorkBuddy 成长中心",
            "brand": "#7C5CFF", "brand2": "#9D7BFF",
            "icon": "growth",
            "checked": claimable == 0,
            "metric_label": "已完成任务",
            "metric_value": "%s / %s" % (prof.get("completed", 0), prof.get("total", 0)),
            "level": prof.get("level"),
            "claimable": claimable,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return {"name": "growth", "title": "WorkBuddy 成长中心",
                "brand": "#7C5CFF", "brand2": "#9D7BFF", "icon": "growth",
                "checked": False, "metric_label": "已完成任务", "metric_value": "--",
                "rows": [], "error": str(e)}


if __name__ == "__main__":
    # 本地调试：python wb_growth.py list|claim|run  （需 WB_TOKEN_FILE 指向明文 token.info）
    mode = sys.argv[1] if len(sys.argv) > 1 else "list"
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import workbuddy_checkin as w
    sess = w.load_session(w.find_token_file())
    if mode == "list":
        for t in list_tasks(sess):
            p = t.get("progress") or {}
            print(t.get("task_code"), t.get("accept_status"),
                  "%s/%s" % (p.get("current"), p.get("target")),
                  "奖励", t.get("reward_credit"))
    elif mode == "claim":
        for r in run_all(sess, only_claim=True):
            print(r)
    elif mode == "run":
        for r in run_all(sess):
            print(r)
