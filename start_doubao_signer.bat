@echo off
cd /d "%~dp0"
set "NODE=%USERPROFILE%\.workbuddy\binaries\node\versions\22.22.2-6\node.exe"
if not exist "%NODE%" set "NODE=%USERPROFILE%\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
:loop
"%NODE%" doubao_sign.js
ping -n 6 127.0.0.1 >nul
goto loop
