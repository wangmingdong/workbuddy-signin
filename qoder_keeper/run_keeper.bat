@echo off
chcp 936 >nul
cd /d "%~dp0"
title Qoder Keeper 守护 - 请勿关闭
"D:\Dev\python.exe" -X utf8 qoder_keeper.py --loop >> qoder_keeper.out.log 2>&1
echo [keeper exited] >> qoder_keeper.out.log
