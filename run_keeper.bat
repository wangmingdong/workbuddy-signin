@echo off
REM 启动华为会话守护进程（headless 无窗口）
cd /d "%~dp0"
set HW_HEADLESS=1
set HW_INTERVAL_MIN=5
"C:\Users\54004\.workbuddy\binaries\node\versions\22.22.2-3\node.exe" hw_keeper.js >> hw_keeper.out.log 2>&1
