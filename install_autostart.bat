@echo off
setlocal
REM Add WorkBuddy checkin web server to Windows startup (per-user, no admin needed).
REM Creates a hidden launcher in the Startup folder; the server starts silently at logon.

set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET=%~dp0start_web.bat"
set "VBS=%STARTUP%\WorkBuddyCheckinWeb.vbs"

> "%VBS%" echo Set s = CreateObject("WScript.Shell")
>> "%VBS%" echo s.Run "cmd /c ""%TARGET%""", 0, False

echo [OK] Startup entry created:
echo      %VBS%
echo.
echo The web server will now auto-start (hidden) every time you log in.
echo To cancel: just delete that .vbs file.
echo.
echo Starting it right now (hidden)...
start "" wscript.exe "%VBS%"
echo Done. Open the page on your phone (see URL printed by start_web.bat).
pause
