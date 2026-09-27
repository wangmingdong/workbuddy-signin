@echo off
setlocal
cd /d "%~dp0"
title Install auto-start for Qoder keeper

echo ================================================================
echo    Install auto-start for Qoder daily 100 Credits keeper
echo    (per-user, no admin needed)
echo ================================================================
echo.

set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "DIR=%~dp0"

if not exist "run_keeper.bat" goto MISS

> "%STARTUP%\WbQoderKeeper.vbs" echo Set s = CreateObject("WScript.Shell")
>>"%STARTUP%\WbQoderKeeper.vbs" echo s.Run "cmd /c ""%DIR%run_keeper.bat""", 0, False

if not exist "%STARTUP%\WbQoderKeeper.vbs" goto FAIL

echo [OK] Startup entry created:
echo      %STARTUP%\WbQoderKeeper.vbs
echo.
echo Starting it right now (hidden)...
start "" "%SystemRoot%\System32\wscript.exe" "%STARTUP%\WbQoderKeeper.vbs"
echo.
echo Done.
echo   * Keeper now runs hidden in the background.
echo   * It auto-starts every time you log in.
echo   * Every day after 10:05 it claims Qoder 100 Credits and
echo     pushes the result to the checkin center card.
echo   * To cancel: delete WbQoderKeeper.vbs in the Startup folder above.
echo.
echo NOTE: first run "probe" once to verify:
echo       D:\Dev\python.exe -X utf8 qoder_keeper.py probe
echo.
pause
exit /b 0

:MISS
echo [X] run_keeper.bat not found next to this script.
echo     Dir: %DIR%
echo.
pause
exit /b 1

:FAIL
echo [X] Could not write to the Startup folder - it may be blocked.
echo     Folder: %STARTUP%
echo.
pause
exit /b 1
