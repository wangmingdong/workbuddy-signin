@echo off
chcp 936 >nul
setlocal
cd /d "%~dp0"
title 安装开机自启

echo ================================================================
echo    Install auto-start for Huawei session keepers
echo    (per-user, no admin needed)
echo ================================================================
echo.

set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "DIR=%~dp0"

if not exist "run_keeper.bat"   goto MISS
if not exist "run_autopush.bat" goto MISS

> "%STARTUP%\WbHwKeeper.vbs" echo Set s = CreateObject("WScript.Shell")
>>"%STARTUP%\WbHwKeeper.vbs" echo s.Run "cmd /c ""%DIR%run_keeper.bat""", 0, False

> "%STARTUP%\WbHwAutopush.vbs" echo Set s = CreateObject("WScript.Shell")
>>"%STARTUP%\WbHwAutopush.vbs" echo s.Run "cmd /c ""%DIR%run_autopush.bat""", 0, False

if not exist "%STARTUP%\WbHwKeeper.vbs"   goto FAIL
if not exist "%STARTUP%\WbHwAutopush.vbs" goto FAIL

echo [OK] Startup entries created:
echo      %STARTUP%\WbHwKeeper.vbs
echo      %STARTUP%\WbHwAutopush.vbs
echo.
echo Starting them right now (hidden)...
start "" "%SystemRoot%\System32\wscript.exe" "%STARTUP%\WbHwKeeper.vbs"
"%SystemRoot%\System32\timeout.exe" /t 3 /nobreak >nul 2>&1
start "" "%SystemRoot%\System32\wscript.exe" "%STARTUP%\WbHwAutopush.vbs"
echo.
echo Done.
echo   * Keepers now run hidden in the background.
echo   * They will auto-start every time you log in.
echo   * To cancel: delete the two .vbs files in the Startup folder above.
echo.
echo NOTE: if the sign-in card still goes stale after a reboot, your
echo       security software may be blocking the Startup folder.
echo.
pause
exit /b 0

:MISS
echo [X] run_keeper.bat / run_autopush.bat not found next to this script.
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
