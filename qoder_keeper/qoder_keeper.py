# -*- coding: utf-8 -*-
"""Qoder 每日 100 Credits 本机自动领取守护

原理（2026-09-27 GitHub 摸路结论，推翻旧「桌面端独占」误判）：
- 领取走 Campaign 体系：GET /sash/api/v1/me/campaigns → 筛今日 CLAIM_BENEFIT 且
  claimStatus==CLAIMABLE 的项 → POST /sash/api/v1/me/campaigns/{id}/claim（replayed 幂等）。
- 真正卡点 = 设备指纹头 Cosy-Machine*，由本机 Qoder 客户端自带的
  resources/umid/runtime-info.exe 实时生成（阿里 securityguard SDK）。
  不带指纹 → GET 返回空数组（看似「没活动」）；伪造指纹 → 503 风控。
- 服务器（112）没有 Qoder 客户端出不了指纹 → 只能在装了客户端的本机跑本守护，
  领取完成后把结果推送给服务器签到卡片（诚实映射，服务端不代领不伪报）。

用法：
    python qoder_keeper.py probe     # 探测：找 runtime-info.exe / token / 指纹自检 / 指纹对比实验
    python qoder_keeper.py run       # 跑一轮：指纹→领取(未领时)→余额→推送服务器
    python qoder_keeper.py --loop    # 常驻：每 15 分钟自检，10:05 后未领则领取并推送

凭据（优先级从高到低）：
    token: 环境变量 QODER_TOKEN > qoder_keeper/qoder_token.txt > 仓库根 qoder_token.txt
    推送:  qoder_keeper/config.json > 环境变量（.env 经 envconf 加载：ACCESS_KEY / ECS_*）
"""
import json
import os
import platform
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

# ⚠️ 本脚本在 qoder_keeper/ 子目录，envconf.py 在仓库根目录 → 补 sys.path 兜底
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from envconf import load_local_env  # noqa: E402

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)
LOG = os.path.join(BASE, "qoder_keeper.log")
STATE_FILE = os.path.join(BASE, "qoder_state.json")
CONFIG_FILE = os.path.join(BASE, "config.json")

load_local_env()

# ---- 常量 ----
BASE_SH = "https://openapi.qoder.sh"          # 国际版（少爷账号属国际版）
BASE_CN = "https://openapi.qoder.com.cn"      # 国内版
CAMPAIGNS_PATH = "/sash/api/v1/me/campaigns"
QUOTA_PATH = "/api/v2/quota/usage"
CLAIM_AFTER = (10, 5)      # 每天 10:00(UTC+8) 刷新，留 5 分钟缓冲
LOOP_SEC = 15 * 60         # 常驻循环节奏

_SSL_CTX = None
try:
    import ssl
    _SSL_CTX = ssl.create_default_context()
    _SSL_CTX.check_hostname = False
    _SSL_CTX.verify_mode = ssl.CERT_NONE
except Exception:
    pass


def log(m):
    line = "[%s] %s" % (time.strftime("%Y-%m-%d %H:%M:%S"), m)
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
        ls = open(LOG, encoding="utf-8", errors="replace").readlines()
        if len(ls) > 800:
            open(LOG, "w", encoding="utf-8").writelines(ls[-800:])
    except Exception:
        pass
    try:
        print(line, flush=True)
    except Exception:
        pass


def load_config():
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            d = json.load(f)
        return d if isinstance(d, dict) else {}
    except Exception:
        return {}


def utc8_now():
    return time.gmtime(time.time() + 8 * 3600)


def today_str():
    return time.strftime("%Y-%m-%d", utc8_now())


# ---------------- token ----------------

def read_token():
    tok = os.environ.get("QODER_TOKEN", "").strip()
    if tok:
        return tok, None
    for cand in (os.path.join(BASE, "qoder_token.txt"), os.path.join(ROOT, "qoder_token.txt")):
        try:
            tok, exp = "", None
            with open(cand, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    if line.lower().startswith("# expiresat="):
                        exp = line.split("=", 1)[1].strip()
                    elif not line.startswith("#") and not tok:
                        tok = line
            if tok:
                return tok, exp
        except Exception:
            continue
    return "", None


# ---------------- runtime-info.exe 发现与指纹 ----------------

def find_umid(cfg):
    """定位 Qoder 客户端自带的 runtime-info.exe（阿里 securityguard 指纹 SDK）。

    顺序：config.umid_path > 环境变量 QODER_UMID_PATH > 已知安装根下扫描。
    已知位置：桌面端 <安装目录>/resources/umid/（含 D:\\Qoder 这类自定义盘）、
    CLI 端 ~/.qoder/.bin/umid-*/runtime-info.exe。
    """
    for cand in (cfg.get("umid_path"), os.environ.get("QODER_UMID_PATH")):
        if cand and os.path.isfile(cand):
            return cand
    # 1) CLI 家目录 ~/.qoder/.bin/umid-*/runtime-info.exe
    home = os.path.expanduser("~")
    cli_bin = os.path.join(home, ".qoder", ".bin")
    try:
        if os.path.isdir(cli_bin):
            for name in sorted(os.listdir(cli_bin), reverse=True):
                cand = os.path.join(cli_bin, name, "runtime-info.exe")
                if name.startswith("umid-") and os.path.isfile(cand):
                    return cand
    except Exception:
        pass
    # 2) 桌面端安装根（LOCALAPPDATA\Programs、Program Files、APPDATA、盘符根的 Qoder 目录）
    roots = []
    for env in ("LOCALAPPDATA", "ProgramFiles", "ProgramFiles(x86)", "APPDATA"):
        v = os.environ.get(env)
        if v and os.path.isdir(v):
            roots.append(v)
    for drive in ("C:", "D:", "E:", "F:"):
        if os.path.isdir(drive + "\\"):
            roots.append(drive + "\\")
    seen = set()
    for base in roots:
        try:
            names = os.listdir(base)
        except Exception:
            continue
        for name in names:
            if "qoder" not in name.lower():
                continue
            root = os.path.join(base, name)
            if root in seen or not os.path.isdir(root):
                continue
            seen.add(root)
            for dirpath, dirnames, filenames in os.walk(root):
                rel = os.path.relpath(dirpath, root)
                # 桌面端版本目录形如 .qoder-versions/0.4.1/resources/umid/
                if rel.count(os.sep) >= 5:
                    dirnames[:] = []
                    continue
                if "runtime-info.exe" in filenames:
                    return os.path.join(dirpath, "runtime-info.exe")
    return None


def read_machine_id(cfg):
    """读本机 Qoder machineid 文件（Cosy-MachineId 头的候选来源）。"""
    cands = [cfg.get("machine_id_path"),
             os.path.join(os.path.expanduser("~"), ".qoder", ".auth", "machine_id"),
             os.path.join(os.environ.get("APPDATA", ""), "Qoder", "machineid")]
    for cand in cands:
        if cand:
            try:
                with open(cand, "r", encoding="utf-8") as f:
                    v = f.read().strip()
                if v:
                    return v
            except Exception:
                continue
    return None


def read_client_version(cfg):
    """从 CLI 状态文件读客户端版本（Cosy-Version 头），读不到用 0.4.1。"""
    if cfg.get("cosy_version"):
        return str(cfg["cosy_version"])
    try:
        p = os.path.join(os.path.expanduser("~"), ".qoder", ".qoder-app-status.json")
        with open(p, "r", encoding="utf-8") as f:
            v = (json.load(f) or {}).get("version")
        if v:
            return str(v)
    except Exception:
        pass
    return "0.4.1"


def gen_fingerprint(umid_exe, account=""):
    """调 runtime-info.exe 生成设备指纹。

    stdout 首行「第一个空格前」的 JSON = {machineToken, machineType, machineCode, vmInfo, ...}
    兼容两种调用方式（x 子命令 / 直传 --account-stdin），以先成功者为准。
    """
    if not umid_exe or not os.path.isfile(umid_exe):
        return None, "runtime-info.exe 未找到"
    payload = json.dumps({"account": account}) + " "
    errs = []
    for args in (["x", "--account-stdin"], ["--account-stdin"]):
        try:
            p = subprocess.run([umid_exe] + args, input=payload, capture_output=True,
                               text=True, timeout=20)
            out = (p.stdout or "").strip()
            if out:
                first = out.splitlines()[0]
                js = first.split(" ", 1)[0]
                d = json.loads(js)
                if isinstance(d, dict) and (d.get("machineToken") or d.get("machineCode")):
                    return d, "args=%s" % " ".join(args)
            errs.append("args=%s rc=%s out=%r err=%r" % (
                " ".join(args), p.returncode, (p.stdout or "")[:120], (p.stderr or "")[:120]))
        except Exception as e:
            errs.append("args=%s exc=%r" % (" ".join(args), e))
    return None, "两种调用方式均失败: " + " | ".join(errs)


def guess_os_type():
    if platform.system() == "Windows":
        return "win32", "windows_x64" if platform.machine().endswith("64") else "windows_x86"
    return platform.system().lower(), platform.machine().lower()


def build_headers(tok, fp, cfg, machine_id=None):
    machine_os, machine_type_guess = guess_os_type()
    h = {
        "Authorization": "Bearer %s" % tok,
        "User-Agent": "Qoder",
        "Cosy-ClientType": "10",
        "Cosy-Version": read_client_version(cfg),
        "Accept": "application/json",
    }
    if fp:
        h["Cosy-MachineToken"] = fp.get("machineToken") or ""
        h["Cosy-MachineType"] = fp.get("machineType") or machine_type_guess
        h["Cosy-MachineCode"] = fp.get("machineCode") or ""
        h["Cosy-MachineOS"] = fp.get("machineOS") or machine_os
        h["Cosy-MachineId"] = fp.get("machineId") or machine_id or fp.get("machineCode") or ""
    if cfg.get("extra_headers") and isinstance(cfg.get("extra_headers"), dict):
        h.update(cfg["extra_headers"])
    return h


def fingerprint_payload(fp, machine_id=None, cfg=None):
    """把设备指纹浓缩成可跨机重放的数据（随状态推给服务器，服务端代领用）。

    2026-09-27 实验验证：Cosy-Machine* 指纹不绑 IP，本机生成的指纹在服务器上
    重放同样能看到 CLAIM_BENEFIT 活动——服务端（网页版）代领因此可行。
    """
    if not fp:
        return None
    machine_os, machine_type_guess = guess_os_type()
    return {
        "machineToken": fp.get("machineToken") or "",
        "machineType": fp.get("machineType") or machine_type_guess,
        "machineCode": fp.get("machineCode") or "",
        "machineOS": fp.get("machineOS") or machine_os,
        "machineId": fp.get("machineId") or machine_id or fp.get("machineCode") or "",
        "cosyVersion": read_client_version(cfg or {}),
        "machine_id": machine_id or "",
    }


# ---------------- API ----------------

def api_base(cfg):
    dom = (cfg.get("domain") or os.environ.get("QODER_DOMAIN") or "sh").lower()
    return BASE_CN if dom in ("cn", "com.cn", "comcn") else BASE_SH


def qd_api(base, path, headers, method="GET", body=None, timeout=25):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(base + path, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=_SSL_CTX) as r:
            return r.status, json.loads(r.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as e:
        try:
            detail = e.read().decode("utf-8", "replace")[:300]
        except Exception:
            detail = ""
        return e.code, {"_http_error": e.code, "_detail": detail}


def find_addon_remaining(obj):
    """在 quota/usage 响应里递归找 addOnQuota.remaining（签到 Credits 落在资源包）。"""
    if isinstance(obj, dict):
        aq = obj.get("addOnQuota")
        if isinstance(aq, dict) and isinstance(aq.get("remaining"), (int, float)):
            return aq["remaining"]
        for v in obj.values():
            r = find_addon_remaining(v)
            if r is not None:
                return r
    elif isinstance(obj, list):
        for v in obj:
            r = find_addon_remaining(v)
            if r is not None:
                return r
    return None


def pick_today_campaign(payload):
    """（保留备用）挑「今日」的 CLAIM_BENEFIT 活动。

    ⚠️ 2026-09-27 实测：活动 key 不按天变（act-20260923-252 而轮次每日刷新），
    领取逻辑已改为「领任何 CLAIMABLE 项」，本函数不再被主流程使用。
    """
    items = (payload or {}).get("campaigns") or []
    benefits = [c for c in items
                if isinstance(c, dict) and c.get("actionType") == "CLAIM_BENEFIT"]
    today_key = "act-" + time.strftime("%Y%m%d", utc8_now())
    for c in benefits:
        if today_key in (c.get("campaignKey") or ""):
            return c
    for c in benefits:
        sa = c.get("startAt")
        if isinstance(sa, (int, float)):
            try:
                if time.strftime("%Y-%m-%d", time.gmtime(sa + 8 * 3600)) == today_str():
                    return c
            except Exception:
                pass
    return None


# ---------------- 状态与推送 ----------------

def load_state():
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def save_state(st):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(st, f, ensure_ascii=False, indent=1)


def push_payload(st):
    return {k: v for k, v in st.items() if k != "last_push"}


def push_to_server(st, cfg):
    """把本机领取状态推给服务器卡片。HTTP（?k=口令）优先，失败回落 SFTP 直推。"""
    payload = push_payload(st)
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")

    key = cfg.get("access_key") or os.environ.get("ACCESS_KEY") or os.environ.get("WB_ACCESS_KEY") or ""
    host = os.environ.get("ECS_HOST", "")
    base = (cfg.get("server_base")
            or os.environ.get("QODER_SERVER_BASE")
            or ("http://%s/checkin" % host if host else ""))
    if key and base:
        url = base.rstrip("/") + "/api/qoder/local-status?k=" + urllib.parse.quote(key)
        req = urllib.request.Request(url, data=body, method="POST",
                                     headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=25, context=_SSL_CTX) as r:
                resp = json.loads(r.read().decode("utf-8", "replace"))
            if resp.get("ok"):
                return "http", None
            return None, "HTTP 推送被拒: %s" % (resp.get("error") or resp)
        except Exception as e:
            log("[push] HTTP 失败，回落 SFTP: %r" % e)

    # SFTP 兜底：直推状态文件到 /opt/wb-checkin/（服务端每次读盘，无需重启）
    try:
        import paramiko
        c = paramiko.SSHClient()
        c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        c.connect(os.environ.get("ECS_HOST", ""), port=int(os.environ.get("ECS_PORT", "22")),
                  username=os.environ.get("ECS_USER", "root"),
                  password=os.environ.get("ECS_PASS", ""),
                  look_for_keys=False, allow_agent=False, timeout=25)
        sftp = c.open_sftp()
        with sftp.open("/opt/wb-checkin/qoder_local_status.json", "w") as f:
            f.write(json.dumps(payload, ensure_ascii=False, indent=1))
        sftp.close()
        c.close()
        return "sftp", None
    except Exception as e:
        return None, "HTTP/SFTP 均失败: %r" % e


# ---------------- 主流程 ----------------

def run_round(cfg, force=False):
    """跑一轮：指纹 → 查活动 → 领取 → 余额 → 推送。返回 state dict。"""
    st = load_state()
    tok, exp = read_token()
    if not tok:
        st.update({"date": today_str(), "checked": False,
                   "message": "未找到 Qoder token（qoder_keeper/qoder_token.txt 或根目录）",
                   "ts": time.strftime("%Y-%m-%d %H:%M:%S"), "source": "local_keeper"})
        save_state(st)
        return st

    umid = find_umid(cfg)
    fp, fp_note = gen_fingerprint(umid) if umid else (None, "未找到 runtime-info.exe（先跑 probe）")
    machine_id = read_machine_id(cfg)
    fp_dict = fingerprint_payload(fp, machine_id, cfg)  # 随状态推送，服务端代领靠它
    headers = build_headers(tok, fp, cfg, machine_id)
    base = api_base(cfg)

    code, d = qd_api(base, CAMPAIGNS_PATH, headers)
    if code in (401, 403):
        st.update({"date": today_str(), "checked": False, "token_expired": True,
                   "fingerprint": fp_dict,
                   "message": "Qoder 登录态已过期(HTTP %s)，请更新 token" % code,
                   "ts": time.strftime("%Y-%m-%d %H:%M:%S"), "source": "local_keeper"})
        save_state(st)
        return st
    if code != 200:
        st.update({"date": today_str(), "checked": False, "fingerprint": fp_dict,
                   "message": "campaigns 接口异常 HTTP %s" % code,
                   "ts": time.strftime("%Y-%m-%d %H:%M:%S"), "source": "local_keeper"})
        save_state(st)
        return st

    camp = None
    camps = [c for c in (d.get("campaigns") or [])
             if isinstance(c, dict) and c.get("actionType") == "CLAIM_BENEFIT"]
    claimable = [c for c in camps if (c.get("claimStatus") or "").upper() == "CLAIMABLE"]
    checked, message = False, ""
    if not camps:
        if fp is None:
            message = "接口看不到任何可领活动——大概率缺设备指纹（runtime-info.exe 未找到/调用失败）"
        else:
            message = "当前无 CLAIM_BENEFIT 活动（活动未开放或已调整）"
    elif claimable:
        # ⚠️ 不按「今天的日期 key」筛选：实测活动 key 固定（act-20260923-252）而轮次每天 10:00 刷新，
        # 只要出现 CLAIMABLE 就可领；重复领取由服务端 replayed 幂等兜底，不会重复发放。
        camp = claimable[0]
        cid = camp.get("campaignId") or ""
        ccode, cres = qd_api(base, "%s/%s/claim" % (CAMPAIGNS_PATH, cid),
                             headers, method="POST", body={})
        if ccode == 200 and (cres.get("status") or "").upper() == "CLAIMED":
            checked = True
            if cres.get("replayed"):
                message = "今日已领取（幂等重放）"
            else:
                message = "领取成功 +100 Credits（%s）" % (camp.get("campaignKey") or cid)
        else:
            message = "claim 失败 HTTP %s %s" % (ccode, json.dumps(cres, ensure_ascii=False)[:200])
    else:
        # 有 CLAIM_BENEFIT 但全部 CLAIMED → 本轮已领（每日 10:00 刷新下一轮）
        checked = True
        message = "今日已领取（活动状态 CLAIMED）"

    balance = None
    if checked:
        qcode, q = qd_api(base, QUOTA_PATH, headers)
        if qcode == 200:
            balance = find_addon_remaining(q)

    prev = st if st.get("date") == today_str() else {}
    st.update({
        "date": today_str(),
        "checked": checked,
        "message": message,
        "balance": balance,
        "claimed_at": ((prev.get("claimed_at") or time.strftime("%Y-%m-%d %H:%M:%S"))
                       if checked else prev.get("claimed_at")),
        "token_expired": False,
        "fingerprint": fp_dict,
        "machine": (fp.get("machineCode") or "")[:12] if fp else "",
        "fp_note": fp_note,
        "umid": umid or "",
        "base": base,
        "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
        "source": "local_keeper",
        "exp": exp,
    })
    save_state(st)
    return st


def ensure_fingerprint_push(cfg):
    """把最新设备指纹推给服务器（不依赖领取流程）——服务端代领就靠它。

    在守护循环每轮开头调用：指纹没变化时不推送，避免每 15 分钟空转；
    指纹变化（或服务器刚部署还没拿到指纹）时立刻推。这样即使本机 10:05 前
    关机，服务端也早有指纹可用。
    """
    try:
        st = load_state()
        old = st.get("fingerprint") or {}
        umid = find_umid(cfg)
        if not umid:
            return
        fp, _ = gen_fingerprint(umid)
        if not fp:
            return
        fp_dict = fingerprint_payload(fp, read_machine_id(cfg), cfg)
        if not fp_dict:
            return
        if (old.get("machineToken") == fp_dict.get("machineToken")
                and old.get("machineCode") == fp_dict.get("machineCode")
                and st.get("fingerprint_pushed_at")):
            return  # 指纹没变且推过，跳过
        st["fingerprint"] = fp_dict
        st["fingerprint_pushed_at"] = time.strftime("%Y-%m-%d %H:%M:%S")
        save_state(st)
        push_if_changed(st, cfg)
        log("[fp] 已保持服务器侧指纹最新")
    except Exception as e:
        log("[fp] 指纹推送异常: %r" % e)


def push_if_changed(st, cfg):
    payload = push_payload(st)
    if st.get("last_push") == json.dumps(payload, ensure_ascii=False, sort_keys=True):
        log("[push] 状态无变化，跳过推送")
        return True
    how, err = push_to_server(st, cfg)
    if how:
        st["last_push"] = json.dumps(payload, ensure_ascii=False, sort_keys=True)
        st["last_push_via"] = how
        st["last_push_at"] = time.strftime("%Y-%m-%d %H:%M:%S")
        save_state(st)
        log("[push] 已通过 %s 推送服务器" % how)
        return True
    log("[push] %s" % err)
    return False


def cmd_run(cfg):
    st = run_round(cfg, force=True)
    log("[run] checked=%s message=%s balance=%s" % (st.get("checked"), st.get("message"), st.get("balance")))
    push_if_changed(st, cfg)
    return 0 if st.get("checked") else 1


def cmd_loop(cfg):
    log("[loop] 守护启动，每 %d 秒自检一轮" % LOOP_SEC)
    while True:
        try:
            ensure_fingerprint_push(cfg)  # 每轮先保持服务器侧指纹最新（服务端代领依赖）
            st = load_state()
            done_today = st.get("date") == today_str() and st.get("checked")
            now = utc8_now()
            h, m = now.tm_hour, now.tm_min
            if done_today:
                log("[loop] 今日已领，跳过")
            elif (h, m) < CLAIM_AFTER:
                log("[loop] 未到 %02d:%02d（活动 10:00 刷新），跳过" % CLAIM_AFTER)
            else:
                st2 = run_round(cfg)
                log("[loop] checked=%s message=%s" % (st2.get("checked"), st2.get("message")))
                push_if_changed(st2, cfg)
        except Exception as e:
            log("[loop] 异常: %r" % e)
        time.sleep(LOOP_SEC)


def cmd_probe(cfg):
    """探测：token / runtime-info.exe / 指纹 / 有无指纹的 campaigns 对比实验。"""
    print("== Qoder keeper probe ==")
    tok, exp = read_token()
    print("token: %s (len=%d, expiresAt=%s)" % (
        (tok[:8] + "...") if tok else "(未找到)", len(tok), exp or "?"))
    umid = find_umid(cfg)
    print("runtime-info.exe: %s" % (umid or "未找到（请检查 Qoder 桌面端是否安装，或 config.json 填 umid_path）"))
    machine_id = read_machine_id(cfg)
    print("machineid 文件: %s" % ((machine_id[:16] + "...") if machine_id else "未找到"))
    fp, note = gen_fingerprint(umid) if umid else (None, "跳过")
    print("指纹: %s" % (json.dumps({k: (str(v)[:24] + "...") for k, v in fp.items()}, ensure_ascii=False)
                        if fp else "失败 — %s" % note))
    base = api_base(cfg)
    print("API base: %s" % base)
    if not tok:
        return 1
    # 对比实验：无指纹（=服务器侧视角） vs 带指纹（=本机视角）
    h_plain = build_headers(tok, None, cfg)
    h_fp = build_headers(tok, fp, cfg, machine_id)
    c1, d1 = qd_api(base, CAMPAIGNS_PATH, h_plain)
    b1 = [c for c in (d1.get("campaigns") or []) if isinstance(c, dict) and c.get("actionType") == "CLAIM_BENEFIT"]
    print("无指纹 GET: HTTP %s, CLAIM_BENEFIT 数=%d" % (c1, len(b1)))
    c2, d2 = qd_api(base, CAMPAIGNS_PATH, h_fp)
    b2 = [c for c in (d2.get("campaigns") or []) if isinstance(c, dict) and c.get("actionType") == "CLAIM_BENEFIT"]
    print("带指纹 GET: HTTP %s, CLAIM_BENEFIT 数=%d" % (c2, len(b2)))
    for c in b2[:3]:
        print("  - %s %s %s benefit=%s" % (
            c.get("campaignKey"), c.get("actionType"), c.get("claimStatus"),
            json.dumps(c.get("benefit"), ensure_ascii=False)[:80]))
    if len(b2) > len(b1):
        print(">>> 结论：指纹生效！带指纹能看到更多可领活动，本机领取路径可行。")
    elif len(b2) == len(b1) and b2:
        print(">>> 结论：无指纹也能看到 CLAIM_BENEFIT（活动可能无需指纹门控），直接 run 试试。")
    else:
        print(">>> 结论：带/无指纹结果相同。若均为 0：今天活动未开放(10:00前)或指纹头细节仍不对，"
              "把本输出发给小B继续排查。")
    return 0


def main():
    cfg = load_config()
    argv = [a for a in sys.argv[1:]]
    if argv and argv[0] == "probe":
        return cmd_probe(cfg)
    if argv and argv[0] == "run":
        return cmd_run(cfg)
    if argv and argv[0] in ("--loop", "loop"):
        return cmd_loop(cfg)
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main())
