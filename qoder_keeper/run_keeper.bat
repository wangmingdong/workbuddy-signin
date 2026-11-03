@echo off
cd /d "%~dp0"
title Qoder Keeper - do not close
set "PYC=%USERPROFILE%\.workbuddy\binaries\python\versions\3.13.12\python.exe"
if not exist "%PYC%" set "PYC=%USERPROFILE%\.workbuddy-ai\binaries\python\versions\3.13.12\python.exe"
if not exist "%PYC%" for /f "delims=" %%P in ('where python 2^>nul') do set "PYC=%%P"
if not exist "%PYC%" (
  echo [ERROR] Python not found. Install Python 3 or set PYC in this script. >> qoder_keeper.out.log
  exit /b 1
)
"%PYC%" -X utf8 qoder_keeper.py --loop >> qoder_keeper.out.log 2>&1
echo [keeper exited] >> qoder_keeper.out.log
