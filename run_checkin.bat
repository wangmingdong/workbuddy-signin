@echo off
setlocal
set "SCRIPT=%~dp0workbuddy_checkin.py"
set "LOG=%~dp0checkin.log"

REM Force UTF-8 IO so the log stays readable and Python never crashes on encoding
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
        exit /b 1
    )
)

REM NOTE: keep this file ASCII-only. %DATE% would inject localized bytes (e.g. GBK)
REM and corrupt the UTF-8 log written by Python. Python already prints the full timestamp.

REM --- Step 0: refresh the plaintext session token ---------------------------
REM New WorkBuddy builds encrypt workbuddy-desktop.info, so token.info has to be
REM regenerated from the app's own binary before the check-in reads it.
REM Non-fatal on purpose: if the refresh fails we still try with the old token.
REM The refresh also pushes token.info to 112, which needs paramiko - so probe
REM for an interpreter that has it and fall back to the check-in one.
set "PYCS="
for %%P in (
    "%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe"
    "%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe"
) do (
    if not defined PYCS if exist %%P (
        %%P -c "import paramiko" >nul 2>&1 && set "PYCS=%%P"
    )
)
if not defined PYCS (
    python -c "import paramiko" >nul 2>&1 && set "PYCS=python"
)
if not defined PYCS set "PYCS=%PYC%"

set "SYNC=%~dp0wb_token_sync.py"
if exist "%SYNC%" (
    echo [%TIME%] ----- token refresh ----->> "%LOG%"
    "%PYCS%" "%SYNC%" >> "%LOG%" 2>&1
    echo [%TIME%] ----- token refresh done (exit=%errorlevel%) ----->> "%LOG%"
)

echo [%TIME%] ===== WorkBuddy checkin START =====>> "%LOG%"
"%PYC%" "%SCRIPT%" >> "%LOG%" 2>&1
echo [%TIME%] ===== WorkBuddy checkin END (exit=%errorlevel%) =====>> "%LOG%"
endlocal
