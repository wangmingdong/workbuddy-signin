@echo off
rem Resolve the host-designated Node and run it (Windows).
rem
rem The MCP stdio launcher resolves "bin/run-node" to this .cmd via PATHEXT.
rem WorkBuddy does NOT put its managed Node on PATH — it exports the containing
rem directory through WORKBUDDY_EXTRA_PATHS (';'-separated) — so a bare
rem `node %*` fails with "node is not recognized". Trust the host's answer
rem first, fall back to PATH, else fail loudly. We deliberately do NOT dig into
rem the host's internal binaries dir — that layout is the host's business, and
rem guessing there can pick a stale or partially-extracted install.
setlocal
set "NODE_BIN="

rem 1. WORKBUDDY_EXTRA_PATHS: ';'-separated dirs that directly contain node.exe.
if defined WORKBUDDY_EXTRA_PATHS (
  for %%D in ("%WORKBUDDY_EXTRA_PATHS:;=" "%") do (
    if not defined NODE_BIN if exist "%%~D\node.exe" set "NODE_BIN=%%~D\node.exe"
  )
)

rem 2. PATH fallback.
if not defined NODE_BIN (
  for %%N in (node.exe) do if not defined NODE_BIN if not "%%~$PATH:N"=="" set "NODE_BIN=%%~$PATH:N"
)

if not defined NODE_BIN (
  echo [weixinpay] FATAL: cannot locate node ^(checked WORKBUDDY_EXTRA_PATHS and PATH^) 1>&2
  exit /b 127
)

"%NODE_BIN%" %*
exit /b %ERRORLEVEL%
