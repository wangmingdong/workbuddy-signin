# -*- coding: utf-8 -*-
"""WorkBuddy 成长中心「派猫猫旅行」自动化（纯标准库，零依赖）。

官方接口（2026-09-01 实测 + 头条文章对齐）：
  域名     https://www.workbuddy.cn
  前缀     /activity/growth/buddy/travel/   （注意：不带 /v2/）
  鉴权     优先 Bearer（与现有成长中心 claim 一致，复用 accessToken）；
           若 Bearer 返回 401/403，则回退到浏览器 HttpOnly Cookie
           （session / session_2 / tgw_l7_route），Cookie 放 wb_travel_cookie.txt
           或环境变量 WB_TRAVEL_COOKIE 指向的文件。
  状态     data.state: idle / traveling / arrived（⭐ 唯一权威状态机）
           data.daily_limit_reached: 今日是否已「派出」过（= 不能再派，≠ 已领奖！）
           data.record_id: 本次旅行记录 id（claim 时可能需要）
           data.arrive_at: 预计到达（领取）时间戳（秒）
           data.reward_credit: 本次奖励积分数
           data.location.name: 当前/上次旅行地点名
           data.server_now: 服务端当前时间戳（用于算剩余时间）

玩法：每天把小猫派去 4 个地点之一，旅行 1~4 小时后回来领 5~10 积分，每日限一次。
因旅行耗时数小时，本模块做成「状态机 + 幂等巡检」：每次只读取服务端真实状态，
再决定一个动作（arrived→claim / traveling→跳过 / idle→depart / limit→跳过），
天然幂等，重复调用不会重复派或重复领。

用法（本地调试）：
  python wb_travel.py status        # 查状态
  python wb_travel.py poll          # 跑一轮状态机（depart/claim）
  python wb_travel.py depart [1-4]  # 手动派出（1咖啡馆 2商场 3健身房 4古镇客栈）
  python wb_travel.py claim         # 手动领取
需 WB_TOKEN_FILE 指向明文 token.info（与 wb_growth 一致）。
"""
import os
import sys
import json
import time
import random
import datetime
import urllib.request
import urllib.error

WEB_BASE = "https://www.workbuddy.cn"
TRAVEL_PREFIX = WEB_BASE + "/activity/growth/buddy/travel"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36")
LOCATIONS = {1: "咖啡馆", 2: "商场店铺", 3: "健身房", 4: "古镇客栈"}
LOC_CODES = {1: "coffee", 2: "mall", 3: "gym", 4: "inn"}

STATE_FILE_ENV = "WB_TRAVEL_STATE"
COOKIE_FILE_ENV = "WB_TRAVEL_COOKIE"

# 最近一次巡检读到的原始 status（供调用方决定「下次多久再来」）：
# 若 traveling 且知道 arrive_at，调用方可精确睡到到达后再巡检，无需死等固定间隔。
LAST_STATUS = {}


def _state_path():
    return os.environ.get(STATE_FILE_ENV) or os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "travel_state.json")


def _cookie_path():
    return os.environ.get(COOKIE_FILE_ENV) or os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "wb_travel_cookie.txt")


def _load_state():
    try:
        with open(_state_path(), "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def _save_state(d):
    try:
        with open(_state_path(), "w", encoding="utf-8") as f:
            json.dump(d, f, ensure_ascii=False)
    except Exception:
        pass


def _load_cookie():
    p = _cookie_path()
    if os.path.isfile(p):
        try:
            with open(p, "r", encoding="utf-8") as f:
                raw = f.read().strip()
                return raw or None
        except Exception:
            return None
    return None


def _brief(b, n=200):
    if isinstance(b, dict):
        d = b.get("data")
        if isinstance(d, dict):
            return json.dumps(d, ensure_ascii=False)[:n]
        return json.dumps(b, ensure_ascii=False)[:n]
    return str(b)[:n]


def _req(sess, path, method="GET", payload=None, cookie=None, timeout=25):
    url = TRAVEL_PREFIX + path
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    hdrs = {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": UA,
        "x-client-platform": "web",
        "Origin": WEB_BASE,
        "Referer": WEB_BASE + "/profile/growth-center",
    }
    if cookie:
        hdrs["Cookie"] = cookie
    else:
        hdrs["Authorization"] = "Bearer %s" % sess["access_token"]
        hdrs["X-User-Id"] = sess["uid"]
        if sess.get("domain"):
            hdrs["X-Domain"] = sess["domain"]
        hdrs["Content-Type"] = "application/json"
    for k, v in hdrs.items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as e:
        t = e.read().decode("utf-8", "replace")
        try:
            return e.code, json.loads(t)
        except Exception:
            return e.code, {"raw": t[:300]}
    except Exception as e:
        return -1, {"err": repr(e)}


def get_status(sess, cookie=None):
    """返回 status data 字典；鉴权失败返回 {'_auth':'expired','http':s}；
    其它错误返回 {'_err': '...'}。"""
    s, b = _req(sess, "/status", cookie=cookie)
    if s in (401, 403):
        # Bearer 失败：若没传 cookie，尝试用本地 cookie 文件再探一次
        if not cookie:
            ck = _load_cookie()
            if ck:
                return get_status(sess, cookie=ck)
        return {"_auth": "expired", "http": s}
    if s != 200:
        return {"_err": "http=%s %s" % (s, _brief(b))}
    if isinstance(b, dict) and b.get("code") not in (0, None):
        return {"_err": "业务码异常 code=%s %s" % (b.get("code"), _brief(b))}
    d = (b.get("data") or {}) if isinstance(b, dict) else {}
    if cookie is None and not _load_cookie():
        # 仅记录这次实际用的是 Bearer
        d["_auth_used"] = "bearer"
    return d


def depart(sess, cookie=None, loc_id=None):
    """派出旅行。loc_id 为 1-4，None 表示随机。返回 (ok, data, used_payload)。"""
    if loc_id is None or loc_id not in LOCATIONS:
        loc_id = random.choice(list(LOCATIONS.keys()))
    attempts = [
        {"location_id": loc_id},
        {"locationId": loc_id},
        {"location": loc_id},
        {"location_code": LOC_CODES.get(loc_id)},
    ]
    last = None
    for pl in attempts:
        s, b = _req(sess, "/depart", method="POST", payload=pl, cookie=cookie)
        obj = b if isinstance(b, dict) else {}
        if s == 200 and obj.get("code") == 0:
            return True, (obj.get("data") or {}), pl
        last = (s, b)
        if s in (401, 403):
            break
    return False, {}, None


def claim(sess, cookie=None, record_id=None):
    """领取旅行积分。返回 (ok, data, used_payload)。

    ⚠️ 实测（2026-09-21）：官方客户端就是发**空 body** `{"code":0,"msg":"OK"}` 即成功，
    服务端靠权威 state 判断该领哪一次的奖，**不需要 record_id**。
    先试空 body（与官方一致、最稳），失败再退 record_id 变体。"""
    attempts = [{}]
    if record_id:
        attempts.append({"record_id": record_id})
        attempts.append({"recordId": record_id})
    last = None
    for pl in attempts:
        s, b = _req(sess, "/claim", method="POST", payload=pl, cookie=cookie)
        obj = b if isinstance(b, dict) else {}
        if s == 200 and obj.get("code") == 0:
            return True, (obj.get("data") or {}), pl
        last = (s, b)
        if s in (401, 403):
            break
    return False, {}, None


def run_poll(sess, cookie=None, prefer_loc=None):
    """状态机巡检一轮：arrived→claim / traveling→跳过 / idle→depart / limit→跳过。
    返回结果列表（每项 {code, ok, msg}），并把关键动作写入本地状态文件。"""
    out = []
    st = get_status(sess, cookie=cookie)
    if st.get("_auth") == "expired":
        out.append({"code": "auth", "ok": False,
                    "msg": "登录态失效：Bearer 401 且未配置 Cookie，请将浏览器 Cookie 写入 wb_travel_cookie.txt"})
        return out
    if st.get("_err"):
        out.append({"code": "err", "ok": False, "msg": st["_err"]})
        return out

    state = (st.get("state") or "").lower()
    limit = bool(st.get("daily_limit_reached"))
    loc = (st.get("location") or {}).get("name") or "-"
    rec = st.get("record_id")
    arrive = st.get("arrive_at")
    reward = st.get("reward_credit")
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    state_rec = _load_state()

    global LAST_STATUS
    LAST_STATUS = dict(st)

    # 服务端在 idle（今日结束）后会清掉 location，所以路上/到达时见到就记下来，
    # 供「今日已完成」状态下回显「今天去了哪儿」。
    if state in ("traveling", "arrived") and loc and loc != "-":
        state_rec["last_depart_loc"] = loc

    out.append({"code": "status", "ok": True,
                "msg": "状态=%s 地点=%s 今日已派=%s" % (state, loc, limit)})

    # ⚠️ 语义更正（2026-09-21 实测）：daily_limit_reached 是「今天已经派过一次、不能再派」，
    # 与「奖励是否已领」无关！绝不能拿它当"已领"来短路，否则 arrived（有奖待领）会被跳过，
    # 奖励永远领不到 —— 这正是「卡片说已领 +6 分、官方页面说旅行完毕但没领奖」的根因。
    # 权威判断只看 state：arrived=待领 → 领；traveling=路上 → 等；idle+未派 → 派；
    # idle+已派 = 今日完成（服务端没有待领奖励）。
    if state == "arrived":
        ok, res, used = claim(sess, cookie=cookie, record_id=rec)
        if ok:
            got = res.get("reward_credit", reward)
            state_rec["last_claim_date"] = datetime.date.today().isoformat()
            state_rec["last_reward"] = got
            state_rec["last_action"] = "领取成功 +%s 分" % got
            out.append({"code": "claim", "ok": True, "msg": "领取成功 +%s 积分" % got})
        else:
            out.append({"code": "claim", "ok": False,
                        "msg": "领取失败：%s" % _brief(res or {})})
    elif state == "traveling":
        out.append({"code": "traveling", "ok": True, "msg": "旅行中，暂不重复派出（到点自动领）"})
    elif state == "idle" and not limit:
        ok, res, used = depart(sess, cookie=cookie, loc_id=prefer_loc)
        if ok:
            state_rec["last_depart_loc"] = LOCATIONS.get(prefer_loc or 0, loc)
            state_rec["last_action"] = "已派出 地点=%s" % state_rec["last_depart_loc"]
            out.append({"code": "depart", "ok": True,
                        "msg": "已派出 地点=%s record_id=%s" % (state_rec["last_depart_loc"], res.get("record_id"))})
        else:
            out.append({"code": "depart", "ok": False,
                        "msg": "派出失败：%s" % _brief(res or {})})
    else:
        out.append({"code": "done", "ok": True, "msg": "今日已完成（已派出且无待领奖励）"})

    state_rec["last_poll"] = now
    _save_state(state_rec)
    return out


def get_travel_card(sess, cookie=None):
    """供 web_server 的签到中心网格展示。失败/鉴权失效返回错误卡，绝不抛异常。"""
    base = {
        "name": "travel", "title": "派猫猫旅行",
        "brand": "#F59E0B", "brand2": "#FBBF24", "icon": "travel",
        "checked": False, "metric_label": "今日奖励", "metric_value": "--",
        "rows": [], "error": None,
    }
    try:
        st = get_status(sess, cookie=cookie)
        if st.get("_auth") == "expired":
            base["needs_auth"] = True
            base["error"] = ("登录态失效：travel 接口仅接受 www.workbuddy.cn 浏览器 Cookie。"
                             "请把 Cookie 写入 wb_travel_cookie.txt（或设 WB_TRAVEL_COOKIE 环境变量）后重新检查。")
            return base
        if st.get("_err"):
            base["error"] = st["_err"]
            return base

        state = (st.get("state") or "").lower()
        limit = bool(st.get("daily_limit_reached"))   # = 今天已派过一次（≠ 已领奖！）
        loc = (st.get("location") or {}).get("name") or "-"
        arrive = st.get("arrive_at")
        reward = st.get("reward_credit")
        server_now = st.get("server_now") or int(time.time())
        letter = st.get("letter") or {}
        letter_text = letter.get("text") or ""
        letter_guide = letter.get("guide_text") or ""

        remain = ""
        remain_secs = 0
        if state == "traveling" and arrive:
            secs = max(0, int(arrive) - int(server_now))
            remain_secs = secs
            h = secs // 3600
            m = (secs % 3600) // 60
            remain = ("%d 小时 %d 分后到达" % (h, m)) if h else ("%d 分后到达" % m)

        state_rec = _load_state()
        today = datetime.date.today().isoformat()
        claimed_today = bool(state_rec.get("last_claim_date") == today)
        last_reward = state_rec.get("last_reward")
        # 服务端 idle 后不再给 location，用巡检时记下的地点回显
        loc_show = loc if (loc and loc != "-") else (state_rec.get("last_depart_loc") or "-")

        # ⚠️ 只有「猫咪已回 + 奖已领」（服务端 state=idle 且今天派过）才算今日完成。
        # arrived = 猫咪回来了但奖励还挂在门口 → 绝不能算「已签」！这是本卡此前的谎报根因。
        if state == "arrived":
            state_cn = "已到达 · 待领取"
            checked = False
            metric = ("可领 +%s 分" % reward) if reward else "可领取"
        elif state == "traveling":
            state_cn = "旅行中"
            checked = False
            metric = "旅行中"
        elif state == "idle" and limit:
            state_cn = "今日已完成"
            checked = True
            metric = ("今日已领 +%s 分" % last_reward) if (claimed_today and last_reward) else "今日已完成"
        else:
            state_cn = "待派出"
            checked = False
            metric = "待派出"

        can_depart = (state == "idle" and not limit)
        can_claim = (state == "arrived")   # 权威只看 state：arrived 就有奖可领，与 limit 无关

        if state == "arrived" and reward:
            reward_text = "+%s 分" % reward
        elif claimed_today and last_reward:
            reward_text = "+%s 分" % last_reward
        else:
            reward_text = "--"

        last_run = None
        if state_rec.get("last_poll"):
            last_run = {
                "ts": state_rec.get("last_poll"),
                "ok": True,
                "message": state_rec.get("last_action") or "已巡检",
                "source": "auto",
            }

        rows = [
            {"k": "签到状态", "v": state_cn},
            {"k": "旅行地点", "v": loc_show},
            {"k": "到达倒计时", "v": remain or "--"},
            {"k": "本次奖励", "v": reward_text},
        ]

        base.update({
            "checked": checked,
            "metric_label": "今日奖励",
            "metric_value": metric,
            "rows": rows,
            "last_run": last_run,
            "travel_state": state,
            "state_cn": state_cn,
            "can_depart": can_depart,
            "can_claim": can_claim,
            "location": loc_show,
            "remain": remain,
            "remain_secs": remain_secs,
            "reward": reward,
            "daily_limit": limit,
            "letter_text": letter_text,
            "letter_guide": letter_guide,
            "done_today": bool(state == "idle" and limit),
        })
        return base
    except Exception as e:
        base["error"] = str(e)
        return base


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "status"
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import workbuddy_checkin as w
    sess = w.load_session(w.find_token_file())
    if mode == "status":
        d = get_status(sess)
        print("STATUS:", json.dumps(d, ensure_ascii=False)[:600])
    elif mode == "poll":
        for r in run_poll(sess):
            print(r)
    elif mode == "depart":
        loc = int(sys.argv[2]) if len(sys.argv) > 2 else None
        print(depart(sess, loc_id=loc))
    elif mode == "claim":
        print(claim(sess))
