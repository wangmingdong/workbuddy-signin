@echo off
chcp 936 >nul
cd /d "%~dp0"
title HW Autopush ÊØ»¤ - ÇëÎð¹Ø±Õ
"D:\Dev\python.exe" -X utf8 hw_autopush.py --loop >> hw_autopush.out.log 2>&1
echo [autopush exited] >> hw_autopush.out.log
