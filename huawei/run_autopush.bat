@echo off
chcp 936 >nul
cd /d "%~dp0"
title HW Autopush ÊØ»¤ - ÇëÎð¹Ø±Õ
set "PYC=%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe"
if not exist "%PYC%" set "PYC=%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe"
if not exist "%PYC%" for /f "delims=" %%P in ('where python 2^>nul') do set "PYC=%%P"
if not exist "%PYC%" (
  echo [ERROR] Python not found. Install Python 3 or set PYC in this script. >> hw_autopush.out.log
  exit /b 1
)
"%PYC%" -X utf8 hw_autopush.py --loop >> hw_autopush.out.log 2>&1
echo [autopush exited] >> hw_autopush.out.log
