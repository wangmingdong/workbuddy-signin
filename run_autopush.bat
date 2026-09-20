@echo off
REM 常驻：每 5 分钟校验并推送华为会话 + 看护 keeper
cd /d "%~dp0"
"D:\Dev\python.exe" -X utf8 hw_autopush.py --loop >> hw_autopush.out.log 2>&1
