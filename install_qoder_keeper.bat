@echo off
setlocal
REM Register Qoder local keeper (qoder_keeper --loop) to run at user logon (no admin needed).
REM It self-checks every 15 min; after 10:05 UTC+8 it claims 100 Credits and pushes to server.

set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET=%~dp0start_qoder_keeper.bat"
set "VBS=%STARTUP%\QoderKeeper.vbs"

> "%VBS%" echo Set s = CreateObject("WScript.Shell")
>> "%VBS%" echo s.Run "cmd /c ""%TARGET%""", 0, False

echo [OK] Qoder keeper autostart created:
echo      %VBS%
echo.
echo It will claim 100 Credits daily after 10:05 UTC+8 and push to server.
echo To disable: just delete that .vbs file.
echo.
echo Starting keeper now (hidden)...
start "" wscript.exe "%VBS%"
echo Done.
pause
