@echo off
chcp 65001 >nul
REM Doubao local signer service (self-healing): serves http://127.0.0.1:8791
REM Resolve Node once, then run it in a restart loop.
set "NODE=%USERPROFILE%\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
if not exist "%NODE%" for /f "delims=" %%N in ('where node 2^>nul') do set "NODE=%%N"
if not exist "%NODE%" (
  echo [ERROR] Node.js not found. Install Node.js or set NODE in this script.
  pause
  exit /b 1
)

:loop
REM Kill any process holding port 8791 to avoid EADDRINUSE.
powershell -NoProfile -Command "try { Get-NetTCPConnection -LocalPort 8791 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } } catch {}"
timeout /t 1 >nul
"%NODE%" "%~dp0doubao_sign.js"
echo [doubao_signer] node exited, restart in 5s...
timeout /t 5 >nul
goto loop
