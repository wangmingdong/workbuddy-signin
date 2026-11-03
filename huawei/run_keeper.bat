@echo off
chcp 936 >nul
cd /d "%~dp0"
title HW Keeper ÊØ»¤ - ÇëÎð¹Ø±Õ
set HW_HEADLESS=1
set HW_INTERVAL_MIN=5
for %%L in (SingletonLock SingletonCookie SingletonSocket) do (
  if exist "hw_profile\%%L" del /f /q "hw_profile\%%L" >nul 2>&1
)
set "NODE=%USERPROFILE%\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
if not exist "%NODE%" for /f "delims=" %%N in ('where node 2^>nul') do set "NODE=%%N"
if not exist "%NODE%" (
  echo [ERROR] Node.js not found. Install Node.js or set NODE in this script. >> hw_keeper.out.log
  exit /b 1
)
"%NODE%" hw_keeper.js >> hw_keeper.out.log 2>&1
echo [keeper exited] >> hw_keeper.out.log
