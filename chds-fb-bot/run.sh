#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
if [ "$(id -u)" = "0" ]; then SUDO=""; else SUDO="sudo"; fi

if ! command -v node >/dev/null 2>&1; then
  echo "📥 Installing Node.js..."
  if [ "$(uname)" = "Darwin" ]; then
    command -v brew >/dev/null 2>&1 || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install node
  elif command -v apt-get >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | $SUDO -E bash -
    $SUDO apt-get install -y nodejs
  fi
fi
node launcher.js
