@echo off
setlocal
set "SCRIPT=%~dp0workbuddy_checkin.py"
set "LOG=%~dp0checkin.log"

REM Force UTF-8 IO so the log stays readable and Python never crashes on encoding
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"

REM Pick an available Python interpreter (prefer WorkBuddy bundled, then system)
set "PYC="
if exist "C:\Users\54004\.workbuddy\binaries\python\versions\3.13.12\python.exe" (
    set "PYC=C:\Users\54004\.workbuddy\binaries\python\versions\3.13.12\python.exe"
)
if not defined PYC if exist "D:\Dev\python.exe" set "PYC=D:\Dev\python.exe"
if not defined PYC set "PYC=python"

REM NOTE: keep this file ASCII-only. %DATE% would inject localized bytes (e.g. GBK)
REM and corrupt the UTF-8 log written by Python. Python already prints the full timestamp.
echo [%TIME%] ===== WorkBuddy checkin START =====>> "%LOG%"
"%PYC%" "%SCRIPT%" >> "%LOG%" 2>&1
echo [%TIME%] ===== WorkBuddy checkin END (exit=%errorlevel%) =====>> "%LOG%"
endlocal
