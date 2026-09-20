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


# ==================== 每日任务（每天刷新的成长中心动作） ====================
# 官方成长中心里「每天重置 / 每天可领」的部分，与上面一次性成长任务分开：
#   1) 每日签到（+100 积分，连签累计）
#   2) 连登兑换（7 / 14 / 28 天三档，每月每档限兑 1 次；给积分+能量+补登卡+抽奖次数）
#   3) 补登卡补断登（修当月断登，保连登天数）
#   4) 每日任务轮盘（抽奖，次数每日刷新、由连登兑换获得）
#   5) Buddy 盲盒（消耗能量开盒）
# 接口与请求体均按官方网页版前端（growthSpace chunk）对齐。
METER_BASE = "/v2/billing/meter"
GROWTH_BASE = "/v2/activity/growth"

TIER_META = {
    "7d": {"name": "入门档", "days": 7},
    "14d": {"name": "进阶档", "days": 14},
    "28d": {"name": "巅峰档", "days": 28},
}
TIERS = [
    {"tier": "7d", "days": 7, "credit": 0, "energy": 2, "cards": 1, "chances": 1},
    {"tier": "14d", "days": 14, "credit": 50, "energy": 3, "cards": 1, "chances": 1},
    {"tier": "28d", "days": 28, "credit": 150, "energy": 5, "cards": 1, "chances": 1},
]


def _uuid_token(prefix="u"):
    """官方前端用 `${prefix}-${randomUUID()}` 作为幂等 client_token。"""
    import uuid
    return "%s-%s" % (prefix, uuid.uuid4())


def _get(sess, path):
    s, b = _req("GET", CHAT_BASE + path, sess["access_token"], sess["uid"], sess["domain"])
    if s != 200:
        raise RuntimeError("%s http=%s %s" % (path, s, _brief(b)))
    return (b.get("data") or {}) if isinstance(b, dict) else {}


def _post(sess, path, body):
    return _req("POST", CHAT_BASE + path, sess["access_token"], sess["uid"], sess["domain"], body=body)


def _brief(b, n=200):
    if isinstance(b, dict):
        d = b.get("data")
        if isinstance(d, dict):
            return json.dumps(d, ensure_ascii=False)[:n]
        return json.dumps(b, ensure_ascii=False)[:n]
    return str(b)[:n]


def checkin_status(sess):
    """加油站每日签到状态（today_checked_in / daily_credit / streak_days…）。"""
    s, b = _post(sess, METER_BASE + "/checkin-activity-status", {})
    if s != 200:
        return {}
    d = b.get("data") if isinstance(b, dict) else None
    if isinstance(d, str):  # 服务端偶发双层编码，兜底再解一次
        try:
            d = json.loads(d)
        except Exception:
            return {}
    return d or {}


def do_daily_checkin(sess):
    s, b = _post(sess, METER_BASE + "/daily-checkin", {})
    return s, b


def get_streak(sess):
    """连登信息：streak{ days, month_total_days, next_tier, makeup_dates }、redemption_status.tiers。"""
    return _get(sess, GROWTH_BASE + "/streak")


def get_energy(sess):
    return _get(sess, GROWTH_BASE + "/energy")


def get_lottery(sess):
    """{"chances": n, "module": {"enabled": true}}"""
    return _get(sess, GROWTH_BASE + "/lottery/summary")


def get_buddy_quota(sess):
    """{"affordable": n, "balance": 能量, "cost_per_open": 10, "max_open_count": 5}"""
    return _get(sess, GROWTH_BASE + "/buddy/quota")


def redeem_tier(sess, tier):
    """兑换连登档位（7d/14d/28d）。返回 (http, body)。"""
    return _post(sess, GROWTH_BASE + "/redeem",
                 {"tier": tier, "client_token": _uuid_token("redeem-%s" % tier)})


def makeup_use(sess, target_date):
    """用补登卡补某天（target_date: YYYY-MM-DD，仅当月断登日）。"""
    return _post(sess, GROWTH_BASE + "/makeup-cards/use", {"target_date": target_date})


def lottery_draw(sess):
    """抽奖轮盘抽一次（每日任务轮盘）。返回 (http, body)，body.data 含 prize_name。"""
    return _post(sess, GROWTH_BASE + "/lottery/draw", {"client_token": _uuid_token("draw")})


def buddy_open(sess, count=1):
    """开 Buddy 盲盒 count 次（消耗能量，每次 cost_per_open）。"""
    return _post(sess, GROWTH_BASE + "/buddy/open", {"count": int(count)})


def get_daily_card(sess):
    """每日任务卡片：汇总当天可做/可领的刷新项。"""
    try:
        ci = checkin_status(sess)
        st = get_streak(sess)
        streak = st.get("streak") or {}
        mk = st.get("makeup_cards") or {}
        rs = st.get("redemption_status") or {}
        en = get_energy(sess)
        lo = get_lottery(sess)
        bq = get_buddy_quota(sess)

        days = streak.get("days") or ci.get("streak_days") or 0
        rows = []
        todo = 0

        # 1) 每日签到
        done = bool(ci.get("today_checked_in"))
        rows.append({
            "code": "checkin", "title": "每日签到",
            "reward": "+%s 积分" % (ci.get("daily_credit") or 100),
            "detail": "连续签到 %s 天" % days,
            "status": "done" if done else "todo",
            "note": "今日已签" if done else "可签到",
        })
        if not done:
            todo += 1

        # 2) 连登兑换（三档，每月各限 1 次）
        for t in (rs.get("tiers") or TIERS):
            tier = t.get("tier")
            if not tier:
                continue
            meta = TIER_META.get(tier, {"name": tier, "days": t.get("days") or 0})
            status = rs.get("tier_%s_status" % tier)
            can = days >= (meta["days"] or 0) and status != "claimed"
            rows.append({
                "code": "redeem_%s" % tier,
                "title": "连登兑换 · %s（%s 天）" % (meta["name"], meta["days"]),
                "reward": "+%s 积分 / +%s 能量" % (t.get("credit") or 0, t.get("energy") or 0),
                "detail": "补登卡 +%s · 抽奖次数 +%s" % (t.get("cards") or 0, t.get("chances") or 0),
                "status": "done" if status == "claimed" else ("todo" if can else "locked"),
                "note": {"claimed": "本月已兑", "locked": "连登差 %s 天" % max(0, (meta["days"] or 0) - days)}
                        .get(status, "可兑换" if can else "未达成"),
            })
            if can:
                todo += 1

        # 3) 补登卡
        md = streak.get("makeup_dates") or []
        rows.append({
            "code": "makeup", "title": "补登卡补断登",
            "reward": "保住连登天数",
            "detail": "持有 %s / %s 张" % (mk.get("balance") or 0, mk.get("max") or 4),
            "status": "todo" if md else "done",
            "note": ("待补 %s 天：%s" % (len(md), "、".join(str(x)[5:] for x in md[:5]))) if md else "本月无断登",
        })
        if md:
            todo += 1

        # 4) 抽奖轮盘
        ch = int(lo.get("chances") or 0)
        rows.append({
            "code": "lottery", "title": "每日任务轮盘（抽奖）",
            "reward": "10~100 积分 / 周边",
            "detail": "次数每日刷新，由连登兑换获得",
            "status": "todo" if ch > 0 else "done",
            "note": ("剩 %s 次，可抽" % ch) if ch else "暂无次数",
        })
        if ch > 0:
            todo += 1

        # 5) Buddy 盲盒
        aff = int(bq.get("affordable") or 0)
        rows.append({
            "code": "buddy", "title": "Buddy 盲盒",
            "reward": "随机 Buddy",
            "detail": "每次 %s 能量 · 当前能量 %s" % (bq.get("cost_per_open") or 10, bq.get("balance") or 0),
            "status": "todo" if aff > 0 else "done",
            "note": ("可开 %s 次" % aff) if aff else "能量不足",
        })
        if aff > 0:
            todo += 1

        return {
            "name": "daily",
            "title": "成长中心 · 每日任务",
            "brand": "#F79009", "brand2": "#FDB022",
            "icon": "daily", "daily": True,
            "checked": todo == 0,
            "metric_label": "今日可做",
            "metric_value": ("%d 项" % todo) if todo else "已全部完成",
            "claimable": todo,
            "streak_days": days,
            "energy": en.get("balance"),
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return {"name": "daily", "title": "成长中心 · 每日任务",
                "brand": "#F79009", "brand2": "#FDB022",
                "icon": "daily", "daily": True, "checked": False,
                "metric_label": "今日可做", "metric_value": "--",
                "claimable": 0, "rows": [], "error": str(e)}


def run_daily(sess):
    """一键做完当日所有动作：签到 → 连登兑换 → 补登断登 → 抽奖 → 开盒。"""
    out = []

    def add(code, ok, msg, skipped=False):
        out.append({"code": code, "ok": bool(ok), "msg": msg, "skipped": skipped})

    # 1) 每日签到
    try:
        ci = checkin_status(sess)
        if ci.get("today_checked_in"):
            add("checkin", True, "今日已签到", skipped=True)
        else:
            s, b = do_daily_checkin(sess)
            add("checkin", s == 200, "签到成功" if s == 200 else "签到失败 http=%s %s" % (s, _brief(b)))
    except Exception as e:
        add("checkin", False, repr(e))

    # 2) 连登兑换
    try:
        st = get_streak(sess)
        streak = st.get("streak") or {}
        rs = st.get("redemption_status") or {}
        days = streak.get("days") or 0
        for t in (rs.get("tiers") or TIERS):
            tier = t.get("tier")
            if not tier:
                continue
            status = rs.get("tier_%s_status" % tier)
            need = t.get("days") or (TIER_META.get(tier) or {}).get("days") or 0
            if status == "claimed":
                add("redeem_%s" % tier, True, "本月已兑换过", skipped=True)
                continue
            if days < need:
                add("redeem_%s" % tier, False, "连登 %s 天 < %s 天，未达标" % (days, need), skipped=True)
                continue
            s, b = redeem_tier(sess, tier)
            add("redeem_%s" % tier, s == 200,
                "兑换成功" if s == 200 else "兑换失败 http=%s %s" % (s, _brief(b)))
            time.sleep(0.4)
    except Exception as e:
        add("redeem", False, repr(e))

    # 3) 补登断登
    try:
        st2 = get_streak(sess)
        md = (st2.get("streak") or {}).get("makeup_dates") or []
        if not md:
            add("makeup", True, "本月无断登，无需补", skipped=True)
        else:
            for d in md:
                s, b = makeup_use(sess, d)
                add("makeup_%s" % d, s == 200,
                    ("补登 %s 成功" % d) if s == 200 else "补登 %s 失败 http=%s %s" % (d, s, _brief(b)))
                time.sleep(0.4)
    except Exception as e:
        add("makeup", False, repr(e))

    # 4) 抽奖（把当天次数抽完，上限 10 次防失控）
    try:
        drew = 0
        for _ in range(10):
            lo = get_lottery(sess)
            if int(lo.get("chances") or 0) <= 0:
                if drew == 0:
                    add("lottery", True, "暂无抽奖次数（可靠连登兑换获得）", skipped=True)
                break
            s, b = lottery_draw(sess)
            prize = ""
            if isinstance(b, dict):
                prize = (b.get("data") or {}).get("prize_name") or ""
            add("lottery", s == 200,
                ("抽中 %s" % prize) if (s == 200 and prize) else ("抽奖成功" if s == 200 else "抽奖失败 http=%s %s" % (s, _brief(b))))
            if s != 200:
                break
            drew += 1
            time.sleep(0.4)
    except Exception as e:
        add("lottery", False, repr(e))

    # 5) 开盲盒（能量够几次开几次，上限 5）
    try:
        bq = get_buddy_quota(sess)
        n = min(int(bq.get("affordable") or 0), 5)
        if n <= 0:
            add("buddy", True, "能量不足（需 %s，现有 %s）" % (bq.get("cost_per_open") or 10, bq.get("balance") or 0),
                skipped=True)
        else:
            s, b = buddy_open(sess, n)
            add("buddy", s == 200, ("开盒 %s 次成功" % n) if s == 200 else "开盒失败 http=%s %s" % (s, _brief(b)))
    except Exception as e:
        add("buddy", False, repr(e))

    return out


# accept_status 语义（实测）：
#   claimed      已完成且**奖励已领**（已领取）
#   completed    进度达标、**奖励待领**（可领取）← 真正"可领"的就是这一类
#   in_progress / accepted  进行中 / 待完成（进度未达）
#   not_accepted 未开始
STATUS_CN = {
    "claimed": "已领取",
    "completed": "待领取",
    "in_progress": "进行中",
    "accepted": "待完成",
    "not_accepted": "未开始",
}

# 各任务「为何无法自动完成」的人话说明（服务器只校验真实产品交互，合成事件不推进进度）
TASK_HINT = {
    "wb_wechat_oa_subscribe_task": "需在微信里真实关注「腾讯 WorkBuddy」官方公众号",
    "Expert_Philanthropy": "需真实参与公益捐赠（账户级动作，无法代做）",
    "black_cat": "夜间限定活动，仅在 23:00–08:00 窗口可完成",
    "expert_5": "需在客户端真实召唤并对话 5 次专家",
    "Expert_team_use_3": "需在客户端真实使用 3 次专家团",
    "Expert_lighthouse": "需在客户端真实召唤并使用「腾讯轻量云」专家",
    "Buddy_App": "需在客户端打开「发现应用」并体验",
    "Buddy_App_QQ": "需在客户端打开「企鹅教师助手」应用",
    "template_5": "需在客户端真实使用 5 个模板",
    "Model_chat_GLM5.2": "需真实调用 GLM-5.2 模型对话",
    "create_canvas": "需「设计创意模式」里真实创建画布",
    "Library_read": "需在网页端真实访问「资料库」文档",
    "Hp_Appearance": "需在设置里真实应用主题",
    "RichMeow_Chat": "需与 RichMeow 真实对话",
    "chat_5": "需与 AI 真实聊天 5 次",
    "first_buddy": "需真实领取一只 Buddy",
    "skill_1": "需真实使用热门技能",
    "automation_1": "需真实创建自动化任务",
    "playbook_prompt": "需真实使用 Playbook 提示词",
}
GEN_HINT = "需在 WorkBuddy 客户端真实使用该功能后才会记功（服务端校验真实交互，接口上报不推进进度）"


def claim_one(sess, code):
    """按单个任务领奖（供成长中心页面「领取」按钮）。返回 (ok, msg)。"""
    try:
        s, b, already, credit, energy = claim_task(sess, code)
        if s == 200 and already:
            return True, "已领过（幂等）"
        if s == 200 and (credit or energy):
            return True, "领取成功 +%s 分 / +%s 能量" % (credit, energy)
        if s == 200:
            return True, "已领取"
        raw = (b.get("msg") if isinstance(b, dict) else b) or ""
        if s == 400 and "not completed" in str(raw):
            return False, "进度未达标，需先在客户端完成该任务"
        return False, "领取失败 http=%s %s" % (s, str(raw)[:80])
    except Exception as e:
        return False, "异常: %s" % e


def get_growth_card(sess):
    """供 web_server 的成长中心页面数据（一次性成长任务）。"""
    try:
        prof = get_profile(sess)
        tasks = list_tasks(sess)
        rows = []
        claimable = 0
        for t in tasks:
            code = t.get("task_code")
            p = t.get("progress") or {}
            cur, tgt = p.get("current", 0), p.get("target", 0)
            ast = t.get("accept_status")
            prog_done = bool(tgt) and cur >= tgt
            # 归一化状态
            if ast == "claimed":
                status = "claimed"
            elif ast == "completed" or (prog_done and ast != "claimed"):
                status = "completed"     # 进度达标但奖励未领 = 可领取
            elif ast == "in_progress":
                status = "in_progress"
            elif ast == "accepted":
                status = "accepted"
            else:
                status = "not_accepted"
            if status == "completed":
                claimable += 1
            hint = ""
            if status not in ("claimed", "completed"):
                hint = TASK_HINT.get(code) or GEN_HINT
            rows.append({
                "code": code,
                "title": t.get("title"),
                "reward": t.get("reward_credit"),
                "energy": t.get("reward_energy"),
                "accept_status": ast,
                "status": status,
                "status_cn": STATUS_CN.get(status, status),
                "current": cur, "target": tgt,
                "can_claim": status == "completed",
                "done": status == "claimed",
                "not_auto": code in NOT_AUTO,
                "hint": hint,
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
            "completed": prof.get("completed", 0),
            "total": prof.get("total", 0),
            "claimable": claimable,
            "rows": rows,
            "error": None,
        }
    except Exception as e:
        return {"name": "growth", "title": "WorkBuddy 成长中心",
                "brand": "#7C5CFF", "brand2": "#9D7BFF", "icon": "growth",
                "checked": False, "metric_label": "已完成任务", "metric_value": "--",
                "claimable": 0, "rows": [], "error": str(e)}


if __name__ == "__main__":
    # 本地调试：python wb_growth.py list|claim|run|daily|dailyrun  （需 WB_TOKEN_FILE 指向明文 token.info）
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
    elif mode == "daily":
        c = get_daily_card(sess)
        print("== %s | %s: %s | 连登 %s 天 | 能量 %s" % (
            c["title"], c["metric_label"], c["metric_value"], c.get("streak_days"), c.get("energy")))
        for r in c.get("rows") or []:
            print("  [%-8s] %-26s %-22s %s" % (r.get("status"), r.get("title"), r.get("reward"), r.get("note")))
        if c.get("error"):
            print("  ERROR:", c["error"])
    elif mode == "dailyrun":
        for r in run_daily(sess):
            print(r)
