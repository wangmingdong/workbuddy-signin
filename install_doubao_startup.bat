@echo off
setlocal
REM Register Doubao local signer to run at user logon (per-user Startup, no admin needed).
REM The signer owns the official Doubao client CDP path; without it auto checkin fails.

set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET=%~dp0start_doubao_signer.bat"
set "VBS=%STARTUP%\DoubaoSigner.vbs"

> "%VBS%" echo Set s = CreateObject("WScript.Shell")
>> "%VBS%" echo s.Run "cmd /c ""%TARGET%""", 0, False

echo [OK] Doubao signer autostart created:
echo      %VBS%
echo.
echo To disable: just delete that .vbs file.
echo Starting signer now (hidden)...
start "" wscript.exe "%VBS%"
echo Done.
pause
