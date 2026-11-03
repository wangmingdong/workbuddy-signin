#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorkBuddy 明文会话令牌自动刷新（Windows 端）。

背景
----
新版 WorkBuddy 客户端把本地会话文件
  %LOCALAPPDATA%\\CodeBuddyExtension\\Data\\Public\\auth\\workbuddy-desktop.info
里的 accessToken / refreshToken 等字段做了静态加密（{"$wbEncrypted":1,...}），
所以 workbuddy_checkin.py 再也不能直接读明文；而明文副本 token.info 又不会自动更新，
token 一过期签到就断。

本脚本做的事
------------
1) 用 WorkBuddy 自带的二进制以 Node 模式运行 wb_token_dump.js，
   通过原生模块 electron_browser_workbuddy_storage.loggerGet() 取到主密钥，
   把会话文件整体解密成明文；
2) 原子写入脚本同目录的 token.info（先写 .tmp 再替换，失败不动旧文件）；
3) 校验令牌（解析 JWT exp、确认 domain、有效期不足 3 天时告警）；
4) 可选：通过 SFTP 把 token.info 推到 112 的 /opt/wb-checkin/token.info，
   让服务器上的 web_server.py / workbuddy_checkin.py 同步用上新令牌。

特点：不需要附加调试器、不需要 --inspect、不需要管理员权限，
      只用应用自己的二进制 + 纯标准库（上传额外需要 paramiko）。

用法
----
  python wb_token_sync.py                 # 刷新 + 上传到 112
  python wb_token_sync.py --no-upload     # 只刷新本地 token.info
  python wb_token_sync.py --exe "<WorkBuddy 安装目录>\\WorkBuddy.exe"
  python wb_token_sync.py --file "<某个会话文件>"
  python wb_token_sync.py --print         # 额外打印令牌前 40 字符（排障用）

退出码：0 成功；2 取密钥失败；3 会话文件问题；4 解密/写入失败；5 上传失败（本地已成功）
"""

import argparse
import base64
import datetime
import json
import os
import subprocess
import sys
import tempfile

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DUMP_JS = os.path.join(BASE_DIR, "wb_token_dump.js")


def _load_dotenv():
    """把同目录 .env 里的键值对读进 os.environ（已存在的环境变量优先，不覆盖）。

    本文件早先把服务器地址/密码/访问口令硬编码在源码里，那会导致凭据随仓库外泄
    （拿到 root 密码即可直接 SSH 登录服务器）。现已统一改为从环境变量读取，
    与项目既有惯例（web_server.py 的 WB_* / .env.example）保持一致：
      · 真实值放同目录 .env（已被 .gitignore 忽略，不入库）
      · 模板见 .env.example（入库，供他人照填）
    没有 .env 也不报错——留空时上传步骤会明确提示缺失哪一项。
    """
    path = os.path.join(BASE_DIR, ".env")
    if not os.path.isfile(path):
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            for raw in f:
                line = raw.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, _, v = line.partition("=")
                k, v = k.strip(), v.strip().strip('"').strip("'")
                if k and k not in os.environ:   # 真实环境变量优先
                    os.environ[k] = v
    except Exception:
        pass


_load_dotenv()
TOKEN_INFO = os.path.join(BASE_DIR, "token.info")
LOG_FILE = os.path.join(BASE_DIR, "token_sync.log")

# 优先国内版（签到活动在 www.workbuddy.cn），其次国际版。
# 可用 WORKBUDDY_EXE 环境变量显式指定；否则在常见安装根与盘符根下自动发现。
def _find_workbuddy():
    explicit = os.environ.get("WORKBUDDY_EXE", "").strip()
    if explicit and os.path.isfile(explicit):
        return explicit

    roots = []
    for env in ("LOCALAPPDATA", "ProgramFiles", "ProgramFiles(x86)"):
        v = os.environ.get(env)
        if v and os.path.isdir(v):
            roots.append(v)
    for drive in "CDEFGH":
        root = drive + ":\\"
        if os.path.isdir(root):
            roots.append(root)

    seen = set()
    for base in roots:
        try:
            names = os.listdir(base)
        except Exception:
            continue
        for name in names:
            if "workbuddy" not in name.lower():
                continue
            root = os.path.join(base, name)
            if root in seen or not os.path.isdir(root):
                continue
            seen.add(root)
            for dirpath, dirnames, filenames in os.walk(root):
                rel = os.path.relpath(dirpath, root)
                if rel.count(os.sep) >= 4:
                    dirnames[:] = []
                    continue
                for exe in ("WorkBuddy.exe", "WorkBuddyAI.exe"):
                    if exe in filenames:
                        return os.path.join(dirpath, exe)
    return ""

# 远端凭据一律从环境变量读取（真实值放本机 .env，模板见 .env.example）。
# 早先这里硬编码了服务器 root 密码，会随仓库外泄——已移除，切勿再写回源码。
REMOTE_HOST = os.environ.get("ECS_HOST", "")
REMOTE_PORT = int(os.environ.get("ECS_PORT", "22") or 22)
REMOTE_USER = os.environ.get("ECS_USER", "root")
REMOTE_PASS = os.environ.get("ECS_PASS", "")
REMOTE_TOKEN = os.environ.get("WB_REMOTE_TOKEN_PATH", "/opt/wb-checkin/token.info")
# HTTP 兜底通道：SFTP 不通时直接 POST 给服务器（走 nginx 的 /checkin/）
REMOTE_HTTP = os.environ.get("WB_REMOTE_HTTP", "")
REMOTE_ACCESS_KEY = os.environ.get("ACCESS_KEY", "")

# token 剩余有效期低于这个天数就告警（提醒用户开一次 WorkBuddy 让它自动续期）
WARN_DAYS = 3


def log(msg, also_print=True):
    line = "[%s] %s" % (datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), msg)
    if also_print:
        print(line)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def find_exe(explicit=None):
    if explicit:
        return explicit if os.path.isfile(explicit) else None
    return _find_workbuddy() or None


def run_dump(exe, session_file=None, config_dir=None):
    """调用 WorkBuddy.exe（Node 模式）执行 wb_token_dump.js。

    返回 (ok, stdout, stderr)。解密结果直接写进 token.info。
    """
    env = dict(os.environ)
    env["ELECTRON_RUN_AS_NODE"] = "1"
    # 用临时文件当输出目标，成功后再原子替换，避免半截文件覆盖好数据
    fd, tmp = tempfile.mkstemp(prefix="token_", suffix=".info", dir=BASE_DIR)
    os.close(fd)
    cmd = [exe, DUMP_JS, "--out", tmp]
    if session_file:
        cmd += ["--file", session_file]
    if config_dir:
        cmd += ["--config-dir", config_dir]
    try:
        p = subprocess.run(
            cmd, env=env, cwd=BASE_DIR, capture_output=True, timeout=120
        )
    except Exception as e:
        try:
            os.unlink(tmp)
        except Exception:
            pass
        return False, "", "启动 %s 失败: %s" % (exe, e)

    out = p.stdout.decode("utf-8", "replace")
    err = p.stderr.decode("utf-8", "replace")
    if p.returncode != 0:
        try:
            os.unlink(tmp)
        except Exception:
            pass
        return False, out, err or ("退出码 %d" % p.returncode)

    # 校验产物可用再落盘
    try:
        with open(tmp, "r", encoding="utf-8") as f:
            data = json.load(f)
        tok = (data.get("auth") or {}).get("accessToken")
        if not isinstance(tok, str) or not tok:
            raise ValueError("解密结果里没有明文 accessToken")
    except Exception as e:
        try:
            os.unlink(tmp)
        except Exception:
            pass
        return False, out, "解密产物校验失败: %s" % e

    os.replace(tmp, TOKEN_INFO)
    return True, out, err


def jwt_exp(token):
    try:
        part = token.split(".")[1]
        part += "=" * (-len(part) % 4)
        payload = json.loads(base64.urlsafe_b64decode(part))
        return payload.get("exp")
    except Exception:
        return None


def inspect_token(path):
    with open(path, "r", encoding="utf-8") as f:
        d = json.load(f)
    auth = d.get("auth") or {}
    acc = d.get("account") or {}
    tok = auth.get("accessToken")
    exp = jwt_exp(tok) if isinstance(tok, str) else None
    exp_dt = datetime.datetime.fromtimestamp(exp) if exp else None
    days = (exp_dt - datetime.datetime.now()).days if exp_dt else None
    return {
        "uid": acc.get("uid"),
        "domain": auth.get("domain"),
        "token": tok,
        "exp": exp_dt,
        "days": days,
    }


def upload(path):
    """把明文 token.info 推到 112。

    优先走 SSH/SFTP（不依赖服务是否在跑）；SSH 不可用时回退到 HTTP 上传接口
    /api/wb/upload-token（复用签到中心访问口令），两条路都失败才算失败。
    """
    ok, detail = _upload_sftp(path)
    if ok:
        return True, "[sftp] " + detail
    sftp_err = detail
    ok2, detail2 = _upload_http(path)
    if ok2:
        return True, "[http] " + detail2
    return False, "SSH: %s ； HTTP: %s" % (sftp_err, detail2)


def _upload_sftp(path):
    # 凭据已改为环境变量注入，缺失时要给出可操作的提示，而不是让 paramiko
    # 去连一台空主机名再抛一个难懂的错误。
    if not REMOTE_HOST or not REMOTE_PASS:
        miss = " / ".join(
            n for n, v in (("ECS_HOST", REMOTE_HOST), ("ECS_PASS", REMOTE_PASS)) if not v
        )
        return False, ("缺少远端配置 %s：请在本目录 .env 里填写"
                       "（模板见 .env.example）。凭据不再硬编码在源码中" % miss)
    try:
        import paramiko
    except Exception as e:
        return False, "未安装 paramiko: %s" % e
    try:
        c = paramiko.SSHClient()
        c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        c.connect(
            REMOTE_HOST,
            port=REMOTE_PORT,
            username=REMOTE_USER,
            password=REMOTE_PASS,
            look_for_keys=False,
            allow_agent=False,
            timeout=25,
        )
    except Exception as e:
        return False, "SSH 连接 %s 失败: %s" % (REMOTE_HOST, e)
    try:
        sftp = c.open_sftp()
        sftp.put(path, REMOTE_TOKEN)
        sftp.chmod(REMOTE_TOKEN, 0o600)
        sftp.close()
        _, out, _ = c.exec_command(
            "ls -l %s; md5sum %s" % (REMOTE_TOKEN, REMOTE_TOKEN), timeout=20
        )
        info = out.read().decode("utf-8", "replace").strip()
        c.close()
        return True, info
    except Exception as e:
        try:
            c.close()
        except Exception:
            pass
        return False, "上传失败: %s" % e


def _upload_http(path):
    """HTTP 兜底：POST 整份 token.info 给服务器的 /api/wb/upload-token。

    服务端就是按「整份会话文件」落盘的（和 SFTP 上传的文件完全同构），
    所以请求体直接是文件原文，不再二次包装。
    """
    import urllib.request
    try:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()
        d0 = json.loads(raw)
    except Exception as e:
        return False, "读取 %s 失败: %s" % (path, e)
    tok = ((d0.get("auth") or {}).get("accessToken"))
    if not isinstance(tok, str) or not tok:
        return False, "会话文件里没有明文 accessToken，拒绝上传"
    if not REMOTE_HTTP or not REMOTE_ACCESS_KEY:
        miss = " / ".join(
            n for n, v in (("WB_REMOTE_HTTP", REMOTE_HTTP),
                           ("ACCESS_KEY", REMOTE_ACCESS_KEY)) if not v
        )
        return False, ("缺少 HTTP 兜底配置 %s：请在本目录 .env 里填写"
                       "（模板见 .env.example）" % miss)
    url = "%s/api/wb/upload-token?k=%s" % (REMOTE_HTTP, REMOTE_ACCESS_KEY)
    req = urllib.request.Request(url, data=raw.encode("utf-8"), method="POST")
    req.add_header("Content-Type", "application/json")
    try:
        op = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        with op.open(req, timeout=30) as r:
            d = json.loads(r.read().decode("utf-8", "replace"))
    except Exception as e:
        return False, "HTTP 上传失败: %s" % e
    if not d.get("ok"):
        return False, "服务端拒绝: %s" % d.get("error")
    return True, "token_len=%s uid=%s" % (d.get("token_len"), d.get("uid"))


def main():
    ap = argparse.ArgumentParser(description="刷新 WorkBuddy 明文会话令牌")
    ap.add_argument("--exe", help="WorkBuddy 主程序路径（默认自动探测）")
    ap.add_argument("--file", help="指定会话文件 workbuddy-desktop.info")
    ap.add_argument("--config-dir", help="WorkBuddy 配置目录（默认 ~/.workbuddy）")
    ap.add_argument("--no-upload", action="store_true", help="不上传服务器")
    ap.add_argument("--print", dest="show", action="store_true", help="打印令牌片段")
    args = ap.parse_args()

    exe = find_exe(args.exe)
    if not exe:
        log("[失败] 找不到 WorkBuddy 主程序，请用 --exe 指定")
        return 2
    if not os.path.isfile(DUMP_JS):
        log("[失败] 缺少 %s" % DUMP_JS)
        return 2
    log("[信息] WorkBuddy: %s" % exe)

    ok, out, err = run_dump(exe, args.file, args.config_dir)
    for line in (out or "").splitlines():
        if line.strip():
            log("  " + line.strip())
    if not ok:
        for line in (err or "").splitlines():
            if line.strip():
                log("  ! " + line.strip())
        log("[失败] 解密会话失败，token.info 保持原样")
        return 4 if "校验" in (err or "") else 3

    try:
        info = inspect_token(TOKEN_INFO)
    except Exception as e:
        log("[失败] 读取 token.info 失败: %s" % e)
        return 4

    log("[令牌] uid=%s domain=%s 有效期至=%s（剩 %s 天）" % (
        info["uid"], info["domain"],
        info["exp"].strftime("%Y-%m-%d %H:%M:%S") if info["exp"] else "?",
        info["days"] if info["days"] is not None else "?",
    ))
    if args.show and info["token"]:
        log("[令牌] %s..." % info["token"][:40])

    if info["days"] is not None and info["days"] < WARN_DAYS:
        log("[告警] 令牌 %s 天后过期，请打开一次 WorkBuddy 让它自动续期" % info["days"])

    if args.no_upload:
        log("[完成] 已刷新本地 token.info（未上传）")
        return 0

    ok, detail = upload(TOKEN_INFO)
    if ok:
        log("[上传] 已同步到 %s:%s" % (REMOTE_HOST, REMOTE_TOKEN))
        for line in detail.splitlines():
            log("  " + line)
        log("[完成] 本地 + 服务器令牌均已刷新")
        return 0
    log("[告警] %s（本地 token.info 已刷新，服务器仍是旧值）" % detail)
    return 5


if __name__ == "__main__":
    sys.exit(main())
