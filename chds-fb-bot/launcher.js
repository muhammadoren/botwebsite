/**
 * Auto-bootstrap: installs deps, reads BOT_TOKEN from env, then starts the bot.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = __dirname;

function hasDeps() {
  try {
    require.resolve('telegraf', { paths: [ROOT] });
    require.resolve('puppeteer', { paths: [ROOT] });
    require.resolve('express', { paths: [ROOT] });
    require.resolve('dotenv', { paths: [ROOT] });
    return true;
  } catch (_) {
    return false;
  }
}

function ask(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) =>
    rl.question(q, (a) => {
      rl.close();
      res(a.trim());
    })
  );
}

(async () => {
  // 1. Dependencies
  if (!hasDeps()) {
    console.log('📦 Installing dependencies...');
    execSync('npm install --no-audit --no-fund', { cwd: ROOT, stdio: 'inherit' });
  }

  // 2. BOT_TOKEN (env first, then .env, then interactive)
  const envPath = path.join(ROOT, '.env');
  let token = process.env.BOT_TOKEN || '';
  if (!token && fs.existsSync(envPath)) {
    const m = fs.readFileSync(envPath, 'utf8').match(/BOT_TOKEN\s*=\s*(.+)/);
    if (m) token = m[1].trim();
  }
  if (!token && process.stdin.isTTY) {
    console.log('\nKailangan ng Telegram bot token mula kay @BotFather.');
    token = await ask('🤖 Paste BOT_TOKEN: ');
    fs.writeFileSync(envPath, `BOT_TOKEN=${token}\n`);
    console.log('✅ Naka-save sa .env\n');
  }
  if (token) process.env.BOT_TOKEN = token;

  // 3. Start bot
  require('./bot.js');
})();
