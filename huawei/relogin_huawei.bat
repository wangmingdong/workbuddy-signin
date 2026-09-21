@echo off
chcp 936 >nul
setlocal
cd /d "%~dp0"
title 华为码道签到 - 重新授权

set "NODE=C:\Users\54004\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
set "PY=D:\Dev\python.exe"
set "WIN=%SystemRoot%\System32"

echo ================================================================
echo    华为码道签到 / 一次性重新授权
echo ================================================================
echo.
echo  【重要】马上会弹出一个 Edge 窗口，那是本工具的专用窗口，
echo          和您平时用的浏览器【不是同一个】。
echo          所以：即使您平时浏览器里已经登录过华为云，
echo          也必须在这个新窗口里【再登录一次】。
echo.
echo  操作步骤：
echo    1) 在弹出的 Edge 窗口里登录华为云（可能要收一次短信验证码）
echo    2) 登录后停在「码道」首页即可，不需要手动点签到
echo    3) 本窗口会自动检测登录态并推送到服务器，
echo       看到「抓到有效会话，已推送」就是成功了
echo.
echo  成功后会妥善关闭专用窗口，并自动拉起常驻守护。
echo ================================================================
echo.

rem ---------- 前置检查 ----------
if not exist "%NODE%" goto NO_NODE
if not exist "%PY%" goto NO_PY
for %%F in (hw_capture.js hw_watch_login.py run_keeper.bat run_autopush.bat) do (
  if not exist "%%F" goto NO_FILE
)

echo [1/3] 清理残留的守护与浏览器进程 ...
call :KILL hw_keeper   node.exe
call :KILL hw_autopush python.exe
call :KILL hw_capture  node.exe
call :KILL hw_profile  msedge.exe
call :CLEANLOCK
"%WIN%\timeout.exe" /t 3 /nobreak >nul 2>&1

echo [2/3] 打开专用登录窗口 ...
start "HW Capture" /min "%NODE%" hw_capture.js
"%WIN%\timeout.exe" /t 8 /nobreak >nul 2>&1

echo [3/3] 等待登录并推送（最长 40 分钟，每 20 秒检查一次）...
echo.
"%PY%" -X utf8 hw_watch_login.py 40
set "RC=%ERRORLEVEL%"
echo.
if not "%RC%"=="0" goto NOTYET

echo [OK] 会话已推送到服务器，签到卡片约 10 秒后变绿。
echo.
echo      关闭专用浏览器窗口（它占着配置，不关会挡住常驻守护）...
call :KILL hw_capture node.exe
call :KILL hw_profile msedge.exe
call :CLEANLOCK
"%WIN%\timeout.exe" /t 4 /nobreak >nul 2>&1
echo.
echo      拉起常驻守护（保持长期自动续期）...
start "HW Keeper"   /min cmd /c run_keeper.bat
"%WIN%\timeout.exe" /t 4 /nobreak >nul 2>&1
start "HW Autopush" /min cmd /c run_autopush.bat
echo.
echo      已启动两个最小化窗口，请不要关闭它们。
echo      只要电脑开着，签到卡片就会一直保持绿色。
echo.
echo      想每次开机自动启动：双击 install_keeper.bat 装一次即可。
echo.
echo ================================================================
echo    完成，可以关掉本窗口了。
echo ================================================================
pause
exit /b 0

:NOTYET
echo [X] 40 分钟内没有检测到有效登录。
echo.
echo     常见原因：
echo       1) 忘了在弹出的新窗口里登录（它和平时浏览器不是一个）
echo       2) 登录了但没走到「码道」首页
echo       3) 卡在短信验证码页面没填完
echo.
echo     专用窗口还开着的话，就在里面继续登录，然后重跑本脚本。
echo     排查线索见抓取日志：hw_capture.log
echo.
pause
exit /b 1

:NO_NODE
echo [X] 找不到 node.exe
echo     路径：%NODE%
echo     WorkBuddy 可能更新过版本，请把本脚本里 NODE 一行改成现有路径。
echo.
pause
exit /b 1

:NO_PY
echo [X] 找不到 python：%PY%
echo.
pause
exit /b 1

:NO_FILE
echo [X] 缺少本工具依赖的文件（hw_capture.js / hw_watch_login.py /
echo     run_keeper.bat / run_autopush.bat），请确认它们与本脚本在同一目录。
echo     当前目录：%~dp0
echo.
pause
exit /b 1

:CLEANLOCK
for %%L in (SingletonLock SingletonCookie SingletonSocket) do (
  if exist "hw_profile\%%L" del /f /q "hw_profile\%%L" >nul 2>&1
)
exit /b 0

:KILL
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq '%~2' -and $_.CommandLine -match '%~1' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }" >nul 2>&1
exit /b 0
