# -*- coding: utf-8 -*-
"""打包签到中心为 Windows 桌面应用（onedir，双击 exe 即用）。

用法： D:/Dev/python.exe build_exe.py
产物： dist/签到中心/  （整个目录分发给用户，用户双击里面的 签到中心.exe）
"""
import os
import sys
import shutil
import subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")
APP = os.path.join(DIST, "签到中心")
RUNTIME = os.path.join(APP, "runtime")
BUILD = os.path.join(ROOT, "build_pyinstaller")

NODE_EXE = r"C:/Users/54004/.workbuddy/binaries/node/versions/22.22.2/node.exe"
PLAYWRIGHT = os.path.join(ROOT, "node_modules", "playwright-core")
CAPTURE_SCRIPTS = [
    "trae_capture.js", "lx_capture.js", "doubao_capture.js", "qoder_capture.js",
    "runtime_env.js", "wb_token_dump.js",
]
PY_MODULES = ["wb_icon.py", "wb_travel.py", "wb_growth.py", "workbuddy_checkin.py"]


def main():
    print("[1/5] 准备产物目录（PyInstaller --noconfirm 自动覆盖旧文件）")
    os.makedirs(DIST, exist_ok=True)

    print("[2/5] 严格安全校验：绝不打包任何凭据/登录态")
    banned = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        rel = os.path.relpath(dirpath, ROOT)
        if rel.split(os.sep)[0] in ("dist", "build_pyinstaller", ".git", "__pycache__"):
            dirnames[:] = []
            continue
        # profile 目录 = 浏览器登录态，绝不能分发
        dirnames[:] = [d for d in dirnames if not d.endswith("_profile") and d != "cred_backup"]
        for f in filenames:
            low = f.lower()
            if any(k in low for k in ("cookie", "token", "credential", "session", ".env")):
                if f not in ("workbuddy_checkin.py",):  # 源码里含 token 字样但非凭据
                    banned.append(os.path.join(rel, f))
    if banned:
        print("  ⚠ 发现疑似凭据文件（这些不会被打包，仅提示核查）:")
        for b in banned[:20]:
            print("   ", b)
    else:
        print("  OK：无凭据文件进入打包范围")

    print("[3/5] PyInstaller 打包主程序")
    cmd = [
        sys.executable, "-m", "PyInstaller", "--noconfirm", "--onedir",
        "--distpath", DIST, "--workpath", BUILD, "--specpath", BUILD,
        "--name", "签到中心", "--windowed",
        "--hidden-import", "workbuddy_checkin",
        "--hidden-import", "wb_growth", "--hidden-import", "wb_travel", "--hidden-import", "wb_icon",
        os.path.join(ROOT, "web_server.py"),
    ]
    subprocess.check_call(cmd, cwd=ROOT)

    print("[4/5] 放入采集运行环境（node + playwright-core + 采集脚本）")
    os.makedirs(RUNTIME, exist_ok=True)
    if not os.path.exists(NODE_EXE):
        raise SystemExit("找不到 node.exe: %s" % NODE_EXE)
    shutil.copy2(NODE_EXE, os.path.join(RUNTIME, "node.exe"))
    if not os.path.exists(PLAYWRIGHT):
        raise SystemExit("找不到 playwright-core: %s" % PLAYWRIGHT)
    shutil.copytree(PLAYWRIGHT, os.path.join(RUNTIME, "playwright-core"), dirs_exist_ok=True)
    for f in CAPTURE_SCRIPTS + PY_MODULES:
        src = os.path.join(ROOT, f)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(APP, f))

    print("[5/5] 生成双击启动器与说明")
    # onedir 的 exe 本身即可双击（windowed），无需额外 bat
    # 首启引导：写进 README
    with open(os.path.join(APP, "使用说明.txt"), "w", encoding="utf-8-sig") as f:
        f.write(
            "签到中心 · 本机版使用说明\n"
            "========================\n\n"
            "1) 双击「签到中心.exe」——程序在后台启动，浏览器会自动打开签到页面。\n"
            "   首次会要求设置访问口令，请记牢。\n\n"
            "2) 更新凭据（傻瓜式）：点每张卡上的「🔑 更新凭据」：\n"
            "   - WorkBuddy：点「🔄 一键自动更新」→ 自动解密本机客户端登录态写入凭据，\n"
            "     全程不用复制（需本机已安装并登录过 WorkBuddy 客户端）。\n"
            "   - Trae/灵犀/豆包/Qoder/华为：点绿色大按钮 → 弹出浏览器/登录窗 → 登录一次，\n"
            "     凭据自动写回，本页自动刷新。\n"
            "   - 其余平台：登录后按 F12/控制台复制 Cookie/token，展开「手动粘贴」保存。\n\n"
            "3) 回到设置页设定每日签到时间、开启通知，完成。\n\n"
            "常见问题：\n"
            "- Windows Defender 可能误报（PyInstaller 未签名），选「允许/添加排除项」即可。\n"
            "- 关闭浏览器不影响签到，程序在后台常驻；重启电脑后需双击一次 exe（或自行加开机自启）。\n"
            "- 日志见同目录 local_server.log。\n"
        )
    size = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(APP) for f in fs)
    print("\n完成：%s" % APP)
    print("总计 %.1f MB" % (size / 1024 / 1024))


if __name__ == "__main__":
    main()
