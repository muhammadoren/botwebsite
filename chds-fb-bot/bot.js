/**
 * CHDS Facebook Autoreport — Telegram Bot
 * Webhook-ready (Render / Railway / Koyeb).
 * Runs the UNCHANGED CHDS Autoreport content script inside a headless browser.
 * Made By CHDS Nico Adajar
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const { Telegraf, Markup } = require('telegraf');
const puppeteer = require('puppeteer');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('❌ Missing BOT_TOKEN');
  process.exit(1);
}

// Your exact function, injected as-is
const CONTENT_SCRIPT = fs.readFileSync(path.join(__dirname, 'content.js'), 'utf8');

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const bot = new Telegraf(BOT_TOKEN);
bot.catch((err) => console.error('Bot error:', err));

/* ----------------------------- sessions ----------------------------- */
const sessions = new Map();
function S(chatId) {
  if (!sessions.has(chatId)) {
    sessions.set(chatId, {
      cookies: null,
      waiting: null, // 'cookies' | 'target' | null
      running: false,
      stopRequested: false,
      browser: null,
      page: null,
      timer: null
    });
  }
  return sessions.get(chatId);
}

const menu = Markup.keyboard([
  ['📥 Set Cookies'],
  ['🎯 Report Target', '📊 Status'],
  ['🛑 Stop']
]).resize();

/* --------------------------- cookie parsing -------------------------- */
function mapSameSite(v) {
  if (!v) return 'Lax';
  v = String(v).toLowerCase();
  if (v === 'no_restriction' || v === 'none') return 'None';
  if (v === 'strict') return 'Strict';
  return 'Lax';
}

function parseCookies(input) {
  input = String(input).trim();
  let arr;
  if (input.startsWith('[')) {
    arr = JSON.parse(input); // EditThisCookie JSON array
  } else if (input.startsWith('{')) {
    const obj = JSON.parse(input); // { name: value, ... }
    arr = Object.entries(obj).map(([name, value]) => ({ name, value }));
  } else {
    arr = input
      .split(';')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((pair) => {
        const i = pair.indexOf('=');
        return { name: pair.slice(0, i).trim(), value: pair.slice(i + 1).trim() };
      });
  }

  return arr
    .filter((c) => c.name && c.value !== undefined)
    .map((c) => {
      const sameSite = mapSameSite(c.sameSite);
      return {
        name: c.name,
        value: String(c.value),
        domain: c.domain || '.facebook.com',
        path: c.path || '/',
        secure: sameSite === 'None' ? true : c.secure !== undefined ? !!c.secure : true,
        httpOnly: !!c.httpOnly,
        sameSite,
        ...(c.expirationDate ? { expires: Math.floor(c.expirationDate) } : {})
      };
    });
}

function normalizeTarget(t) {
  t = t.trim();
  if (/^https?:\/\//i.test(t)) return /facebook\.com/i.test(t) ? t : null;
  if (t.includes('profile.php')) return 'https://www.facebook.com/' + t;
  if (/^[a-zA-Z0-9.\-_]+$/.test(t)) return 'https://www.facebook.com/' + t;
  return null;
}

/* ------------------------------ commands ----------------------------- */
bot.start((ctx) => {
  ctx.reply(
    '🛡️ *CHDS Facebook Autoreport Bot*\n\n' +
      '1. Tap *📥 Set Cookies* at i-paste ang Facebook cookies mo\n' +
      '2. Tap *🎯 Report Target* at ipadala ang profile URL o username\n' +
      '3. Automatic na magre-report ang bot\n\n' +
      '_Developed by CHDS Nico Adajar_',
    { parse_mode: 'Markdown', ...menu }
  );
});

bot.hears('📥 Set Cookies', (ctx) => {
  S(ctx.chat.id).waiting = 'cookies';
  ctx.reply(
    'Paste your Facebook cookies now.\n\n' +
      'Accepted formats:\n' +
      '• EditThisCookie JSON export\n' +
      '• `name=value; name2=value2` string\n\n' +
      'Must contain `c_user` and `xs`.'
  );
});

bot.hears('🎯 Report Target', (ctx) => {
  const s = S(ctx.chat.id);
  if (!s.cookies) return ctx.reply('⚠️ Send cookies first (📥 Set Cookies).');
  s.waiting = 'target';
  ctx.reply('Send the target Facebook profile URL or username.');
});

bot.hears('📊 Status', (ctx) => {
  const s = S(ctx.chat.id);
  ctx.reply(
    `Cookies: ${s.cookies ? `✅ set (${s.cookies.length})` : '❌ none'}\n` +
      `Running: ${s.running ? '🟢 yes' : '⚪ no'}`
  );
});

bot.hears('🛑 Stop', (ctx) => stopRun(ctx));
bot.command('stop', (ctx) => stopRun(ctx));

/* --------------------------- text / files ---------------------------- */
bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const s = S(chatId);
  const text = ctx.message.text.trim();
  if (text.startsWith('/')) return;

  if (s.waiting === 'cookies') {
    try {
      const cookies = parseCookies(text);
      if (!cookies.length) throw new Error('No cookies parsed');
      const names = cookies.map((c) => c.name);
      s.cookies = cookies;
      s.waiting = null;
      const warn =
        names.includes('c_user') && names.includes('xs')
          ? ''
          : '\n⚠️ `c_user` / `xs` missing — account may not be logged in.';
      ctx.reply(`✅ Saved ${cookies.length} cookies.${warn}\nNow send 🎯 Report Target.`, menu);
    } catch (e) {
      ctx.reply('❌ Could not parse cookies: ' + e.message);
    }
    return;
  }

  if (s.waiting === 'target') {
    s.waiting = null;
    const url = normalizeTarget(text);
    if (!url) return ctx.reply('❌ Not a valid Facebook profile.');
    return runReport(ctx, url);
  }

  const url = normalizeTarget(text);
  if (url) {
    if (!s.cookies) return ctx.reply('⚠️ Send cookies first (📥 Set Cookies).');
    runReport(ctx, url);
  }
});

bot.on('document', async (ctx) => {
  try {
    const link = await ctx.telegram.getFileLink(ctx.message.document.file_id);
    const res = await fetch(link.href);
    const cookies = parseCookies(await res.text());
    if (!cookies.length) throw new Error('No cookies parsed');
    S(ctx.chat.id).cookies = cookies;
    ctx.reply(`✅ Saved ${cookies.length} cookies from file.`, menu);
  } catch (e) {
    ctx.reply('❌ ' + e.message);
  }
});

/* ------------------------------ runner ------------------------------- */
async function runReport(ctx, targetUrl) {
  const chatId = ctx.chat.id;
  const s = S(chatId);
  if (s.running) return ctx.reply('⏳ Already running. Use 🛑 Stop first.');

  s.running = true;
  s.stopRequested = false;

  const status = await ctx.reply(`🚀 Launching browser...\n🎯 ${targetUrl}`);

  try {
    s.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-blink-features=AutomationControlled'
      ]
    });

    const page = await s.browser.newPage();
    s.page = page;

    await page.setUserAgent(USER_AGENT);
    await page.setViewport({ width: 1366, height: 900 });
    await page.setCookie(...s.cookies);

    await ctx.telegram.editMessageText(
      chatId,
      status.message_id,
      null,
      `🌐 Loading target...\n🎯 ${targetUrl}`
    );

    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 90000 });

    // ── inject the UNCHANGED function ──
    await page.addScriptTag({ content: CONTENT_SCRIPT });
    await page.waitForSelector('#chds-start', { timeout: 20000 });
    await page.click('#chds-start');

    await ctx.telegram.editMessageText(
      chatId,
      status.message_id,
      null,
      `✅ Autoreport started\n🎯 ${targetUrl}`
    );

    let lastReport = '0';
    let lastLoop = '0';

    s.timer = setInterval(async () => {
      if (s.stopRequested || !s.running) return;
      try {
        const data = await page.evaluate(() => ({
          reports: (document.getElementById('chds-reports') || {}).textContent || '0',
          loops: (document.getElementById('chds-loops') || {}).textContent || '0',
          status: (document.getElementById('chds-status') || {}).textContent || '',
          step: (document.getElementById('chds-step-info') || {}).textContent || '',
          title: document.title
        }));

        if (data.reports !== lastReport || data.loops !== lastLoop) {
          lastReport = data.reports;
          lastLoop = data.loops;
          ctx.telegram
            .editMessageText(
              chatId,
              status.message_id,
              null,
              `🛡️ CHDS Autoreport — RUNNING\n🎯 ${targetUrl}\n\n` +
                `📨 Reports: ${data.reports}\n🔁 Loops: ${data.loops}\n📍 ${data.step}`
            )
            .catch(() => {});
        }

        const dead = /Content isn't available|This page isn't available|Page Not Found/i.test(
          data.title
        );
        if (dead) return finish(ctx, status.message_id, targetUrl, data, true);
        if (data.status === 'Stopped') return finish(ctx, status.message_id, targetUrl, data, false);
      } catch (_) {}
    }, 4000);
  } catch (e) {
    s.running = false;
    if (s.browser) {
      try {
        await s.browser.close();
      } catch (_) {}
      s.browser = null;
    }
    ctx.reply('❌ Error: ' + e.message);
  }
}

async function finish(ctx, msgId, target, data, dead) {
  const s = S(ctx.chat.id);
  s.running = false;
  clearInterval(s.timer);

  if (s.page) {
    try {
      const buf = await s.page.screenshot({ fullPage: false });
      await ctx.replyWithPhoto({ source: buf }, { caption: '📸 Final state' });
    } catch (_) {}
  }
  if (s.browser) {
    try {
      await s.browser.close();
    } catch (_) {}
    s.browser = null;
    s.page = null;
  }

  await ctx.telegram
    .editMessageText(
      ctx.chat.id,
      msgId,
      null,
      `${dead ? '🎉 ACCOUNT DEAD / done' : '🏁 Finished'}\n🎯 ${target}\n` +
        `📨 Reports: ${data.reports}\n🔁 Loops: ${data.loops}`
    )
    .catch(() => {});
}

async function stopRun(ctx) {
  const s = S(ctx.chat.id);
  if (!s.running) return ctx.reply('Nothing is running.');

  s.stopRequested = true;
  try {
    await s.page.click('#chds-stop');
  } catch (_) {}

  setTimeout(async () => {
    s.running = false;
    clearInterval(s.timer);
    if (s.browser) {
      try {
        await s.browser.close();
      } catch (_) {}
      s.browser = null;
      s.page = null;
    }
    ctx.reply('🛑 Stopped.');
  }, 1500);
}

/* --------------------- webhook + web server -------------------------- */
const app = express();
const WEBHOOK_PATH = `/telegraf/${bot.secretPathComponent()}`;

app.use(express.json());
app.use(bot.webhookCallback(WEBHOOK_PATH));
app.get('/', (_req, res) => res.send('🛡️ CHDS Autoreport Bot — running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  const publicUrl = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL;
  if (publicUrl) {
    await bot.telegram.setWebhook(`${publicUrl}${WEBHOOK_PATH}`);
    console.log('✅ Webhook set:', `${publicUrl}${WEBHOOK_PATH}`);
  } else {
    console.log('⚠️ No public URL — falling back to long polling');
    bot.launch();
  }
  console.log(`🛡️ Listening on :${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
