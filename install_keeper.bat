@echo off
setlocal
REM 安装开机自启：华为会话守护(keeper) + 自动推送(autopush)，隐藏窗口启动，免管理员
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "DIR=%~dp0"

> "%STARTUP%\WbHwKeeper.vbs" echo Set s = CreateObject("WScript.Shell")
>>"%STARTUP%\WbHwKeeper.vbs" echo s.Run "cmd /c ""%DIR%run_keeper.bat""", 0, False

> "%STARTUP%\WbHwAutopush.vbs" echo Set s = CreateObject("WScript.Shell")
>>"%STARTUP%\WbHwAutopush.vbs" echo s.Run "cmd /c ""%DIR%run_autopush.bat""", 0, False

echo [OK] Startup entries created:
echo      %STARTUP%\WbHwKeeper.vbs
echo      %STARTUP%\WbHwAutopush.vbs
echo.
echo Starting now (hidden)...
start "" wscript.exe "%STARTUP%\WbHwKeeper.vbs"
timeout /t 3 /nobreak >nul
start "" wscript.exe "%STARTUP%\WbHwAutopush.vbs"
echo Done. To cancel: delete the two .vbs files in the Startup folder.
