@echo off
title Qoder Cookie 一键刷新
cd /d "%~dp0"
where node >NUL 2>NUL
if errorlevel 1 (
  echo [错误] 未找到 Node.js，请先安装或加入 PATH。
  pause
  exit /b 1
)
echo.
echo [1/2] 即将打开 Edge，请在窗口里登录 qoder.com
echo [2/2] 登录成功后自动校验 Cookie 并推送到服务器
echo        看到 OK 之前请不要关闭 Edge 窗口
echo.
node qoder_capture.js
echo.
echo 已结束，可以关闭本窗口。
pause >NUL
