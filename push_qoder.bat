@echo off
setlocal
cd /d "%~dp0"
set "PYC=%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe"
if not exist "%PYC%" set "PYC=%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe"
if not exist "%PYC%" for /f "delims=" %%P in ('where python 2^>nul') do set "PYC=%%P"
if not exist "%PYC%" (
  echo [ERROR] Python not found. Install Python 3 or set PYC in this script.
  pause
  exit /b 1
)
echo [Qoder] Extracting token from local Qoder client...
"%PYC%" "%~dp0refresh_qoder_from_local.py" --claim
echo.
echo Done. Press any key to exit.
pause >nul
