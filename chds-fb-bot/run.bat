@echo off
cd /d "%~dp0"
echo 🛡️  CHDS Autoreport Bot — auto setup

where node >nul 2>nul
if errorlevel 1 (
  echo 📥 Installing Node.js...
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
  set "PATH=%PATH%;C:\Program Files\nodejs"
)

node launcher.js
pause
