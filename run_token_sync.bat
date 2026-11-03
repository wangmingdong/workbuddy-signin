@echo off
setlocal
REM ---------------------------------------------------------------------------
REM Refresh the WorkBuddy plaintext session token and push it to the server.
REM
REM New WorkBuddy builds encrypt workbuddy-desktop.info, so token.info must be
REM regenerated from the app's own binary (see wb_token_sync.py for the details).
REM The script appends its own log to token_sync.log.
REM
REM Usage:
REM   run_token_sync.bat                refresh + upload to 112
REM   run_token_sync.bat --no-upload    refresh locally only
REM ---------------------------------------------------------------------------

set "SCRIPT=%~dp0wb_token_sync.py"
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"

REM Prefer an interpreter that has paramiko (needed for the SFTP upload step).
set "PYC="
for %%P in (
    "%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe"
    "%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe"
) do (
    if not defined PYC if exist %%P (
        %%P -c "import paramiko" >nul 2>&1 && set "PYC=%%P"
    )
)
if not defined PYC (
    python -c "import paramiko" >nul 2>&1 && set "PYC=python"
)
if not defined PYC set "PYC=python"

if not exist "%SCRIPT%" (
    echo [ERROR] not found: "%SCRIPT%"
    exit /b 2
)

"%PYC%" "%SCRIPT%" %*
set "RC=%errorlevel%"
if not "%RC%"=="0" echo [WARN] token sync exit=%RC% (see token_sync.log)
endlocal & exit /b %RC%
