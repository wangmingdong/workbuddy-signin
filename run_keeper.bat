@echo off
chcp 936 >nul
cd /d "%~dp0"
title HW Keeper ÊØ»¤ - ÇëÎð¹Ø±Õ
set HW_HEADLESS=1
set HW_INTERVAL_MIN=5
for %%L in (SingletonLock SingletonCookie SingletonSocket) do (
  if exist "hw_profile\%%L" del /f /q "hw_profile\%%L" >nul 2>&1
)
"C:\Users\54004\.workbuddy\binaries\node\versions\22.22.2-3\node.exe" hw_keeper.js >> hw_keeper.out.log 2>&1
echo [keeper exited] >> hw_keeper.out.log
