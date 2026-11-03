@echo off
setlocal
cd /d "%~dp0"
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"

REM Pick an available Python interpreter (prefer WorkBuddy bundled, then system)
set "PYC="
if exist "%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe" (
    set "PYC=%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe"
)
if not defined PYC if exist "%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe" (
    set "PYC=%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe"
)
if not defined PYC set "PYC=python"
if /i "%PYC%"=="python" (
    where python >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] Python not found. Install Python 3 or set PYC in this script.
        pause
        exit /b 1
    )
)

title WorkBuddy Checkin Web Server
echo Starting WorkBuddy checkin web server...
echo (Keep this window open. Press Ctrl+C to stop.)
echo.
"%PYC%" "%~dp0web_server.py"
echo.
echo Server stopped.
pause
