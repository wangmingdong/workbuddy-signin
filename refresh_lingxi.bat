@echo off
title WPS LingXi Cookie Refresh
cd /d "%~dp0"
set "PYTHON_PATH=D:/Dev/python.exe"
set "NODE_EXE=node"
where node >nul 2>nul || set "NODE_EXE=C:\Users\54004\.workbuddy\binaries\node\versions\22.22.2\node.exe"
echo.
echo [1/2] Edge will open. Please log in to lingxi.wps.cn in that window.
echo [2/2] The script checks the cookie and uploads it to the server automatically.
echo        Do NOT close the Edge window before you see "OK".
echo.
"%NODE_EXE%" lx_capture.js
echo.
echo Finished. You can close this window now.
pause >nul
