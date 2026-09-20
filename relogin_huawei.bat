@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
set "NODE=C:\Users\54004\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
set "PY=D:\Dev\python.exe"

echo ================================================================
echo   华为码道签到 . 一次性重新授权
echo ================================================================
echo.
echo   1) 稍后会自动弹出一个 Edge 窗口（专用配置，不影响你日常浏览器）
echo   2) 在窗口里登录华为云，进到「码道」首页
echo   3) 本窗口会自动检测，并把会话推到服务器
echo      看到「抓到有效会话，已推送」就成功了
echo.
echo   成功后 Edge 窗口可以手动关掉，本窗口直接关掉也行。
echo ================================================================
echo.

echo [1/3] 清理可能残留的守护/浏览器进程 ...
wmic process where "name='node.exe' and commandline like '%%hw_keeper%%'" delete >nul 2>&1
wmic process where "name='python.exe' and commandline like '%%hw_autopush%%'" delete >nul 2>&1
wmic process where "name='msedge.exe' and commandline like '%%hw_profile%%'" delete >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] 打开登录窗口 ...
start "HW Capture" /min "%NODE%" hw_capture.js
timeout /t 6 /nobreak >nul

echo [3/3] 等待登录并推送（最长 40 分钟）...
"%PY%" -X utf8 hw_watch_login.py 40
set RC=%ERRORLEVEL%

echo.
if "%RC%"=="0" goto OK
echo [X] 没检测到有效登录。请重跑本脚本，并确认已在弹出的 Edge 窗口里登录华为云。
echo.
pause
exit /b 1

:OK
echo [OK] 会话已推送到服务器，签到卡片约 10 秒后变绿。
echo.
echo      下面在本机后台启动会话守护，保持长期自动续期 ...
start "HW Keeper"   /min cmd /c run_keeper.bat
start "HW Autopush" /min cmd /c run_autopush.bat
echo      已启动（两个最小化窗口，别关它们）。只要电脑开着，卡片就会一直绿。
echo.
echo      想开机自动启动：双击 install_keeper.bat 装一次即可。
echo.
pause
exit /b 0
