@echo off
setlocal
cd /d "%~dp0"
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"

REM Pick an available Python interpreter (prefer WorkBuddy bundled, then system)
set "PYC="
if exist "C:\Users\54004\.workbuddy\binaries\python\versions\3.13.12\python.exe" (
    set "PYC=C:\Users\54004\.workbuddy\binaries\python\versions\3.13.12\python.exe"
)
if not defined PYC if exist "D:\Dev\python.exe" set "PYC=D:\Dev\python.exe"
if not defined PYC set "PYC=python"

title WorkBuddy Checkin Web Server
echo Starting WorkBuddy checkin web server...
echo (Keep this window open. Press Ctrl+C to stop.)
echo.
"%PYC%" "%~dp0web_server.py"
echo.
echo Server stopped.
pause
