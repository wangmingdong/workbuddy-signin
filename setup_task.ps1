# 一键注册 Windows 计划任务：每天 09:10 自动签到（无需打开 WorkBuddy）
# 用法：在【管理员】PowerShell 中执行  .\setup_task.ps1
$taskName = "WorkBuddyDailyCheckin"
$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Definition }
$bat = Join-Path $scriptDir "run_checkin.bat"

Write-Host "任务名称 : $taskName"
Write-Host "运行程序 : cmd.exe /c `"$bat`""
Write-Host ""

# 1) 先删旧的同名任务。首次安装时任务不存在，schtasks 会提示"系统找不到指定的文件"，
#    这是正常现象，用 2>&1 | Out-Null 吞掉即可（不要让它中断脚本）。
& schtasks /delete /tn $taskName /f 2>&1 | Out-Null

# 2) 创建：每天 09:10 触发，最高权限，当前用户
$action = 'cmd.exe /c "' + $bat + '"'
& schtasks /create /tn $taskName /tr $action /sc daily /st 09:10 /rl highest /f 2>&1 | ForEach-Object { Write-Host $_ }

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] 计划任务 '$taskName' 已创建，每天 09:10 自动运行。" -ForegroundColor Green
    Write-Host "     日志文件：$(Join-Path $scriptDir 'checkin.log')" -ForegroundColor Green
    Write-Host "     立即测试：schtasks /run /tn $taskName" -ForegroundColor Cyan
} else {
    Write-Host "[失败] 计划任务创建失败 (exit=$LASTEXITCODE)。请确认以管理员身份运行本脚本。" -ForegroundColor Red
}
