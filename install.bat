@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title WB Checkin Center - local setup

echo ==============================================
echo  Multi-Platform Checkin Center - local setup
echo ==============================================
echo.

REM ---- 1. locate python ----
set "PY="
for /f "delims=" %%i in ('where python 2^>nul') do ( if not defined PY set "PY=%%i" )
if not defined PY (
  echo [X] Python not found in PATH.
  echo     Install from https://www.python.org/downloads/
  echo     IMPORTANT: check "Add Python to PATH" during setup, then re-run this file.
  pause
  exit /b 1
)
"%PY%" -c "import sys; assert sys.version_info >= (3,8)" 2>nul
if errorlevel 1 (
  echo [X] Python 3.8+ is required. Current version:
  "%PY%" --version
  pause
  exit /b 1
)
echo [1/3] Python OK: %PY%

REM ---- 2. write autostart VBS into Startup folder ----
for %%i in ("%PY%") do set "PDIR=%%~dpi"
if exist "%PDIR%pythonw.exe" ( set "RUNNER=%PDIR%pythonw.exe" ) else ( set "RUNNER=%PY%" )
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "VBS=%STARTUP%\wb-checkin-local.vbs"
> "%VBS%" echo Set ws = CreateObject("WScript.Shell")
>>"%VBS%" echo ws.Run """%RUNNER%"" ""%~dp0web_server.py""", 0, False
echo [2/3] Autostart written: %VBS%

REM ---- 3. start service now and open browser ----
echo [3/3] Starting service on http://localhost:8765 ...
start "" "%RUNNER%" "%~dp0web_server.py"
echo     waiting for service to come up ...
set TRY=0
:waitloop
ping -n 2 127.0.0.1 >nul
set /a TRY+=1
netstat -ano -p TCP | findstr ":8765" | findstr "LISTENING" >nul 2>nul
if errorlevel 1 goto check_port
goto service_up
:check_port
if %TRY% geq 15 goto service_fail
goto waitloop
:service_fail
echo [!] Service did not start within 30 seconds.
echo     To see the error, open a terminal in this folder and run:
echo         python web_server.py
pause
exit /b 1
:service_up
start "" http://localhost:8765

echo.
echo Done. If the page did not open, visit http://localhost:8765 manually.
echo - Default access key: 19921010   (change it in Settings, top-right gear)
echo - Settings page: schedule time, credentials wizard, platform toggles, notification.
echo - To remove autostart: delete %VBS%
echo.
pause
