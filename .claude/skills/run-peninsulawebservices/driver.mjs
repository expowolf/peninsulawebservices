#!/usr/bin/env node
/**
 * Driver for the Peninsula Web Services site (Vite + React SPA).
 *
 * Launches a static preview server against the production build and drives
 * it with Playwright's bundled Chromium — navigating each hash route and
 * saving full-page screenshots. Because the homepage has looping CSS
 * animations (build-a-website browser, spinning globe), we pause briefly so
 * the captured frame lands mid-animation rather than on an empty first frame.
 *
 * Usage (from repo root, after `npm run build`):
 *   node .claude/skills/run-peninsulawebservices/driver.mjs            # all routes
 *   node .claude/skills/run-peninsulawebservices/driver.mjs /#/services
 *
 * Output: ./screenshots/<route>.png
 */
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'screenshots');
const PORT = 4399;

// Locate the bundled Chromium (skip Playwright's version-pinned lookup).
const CHROME =
  process.env.CHROME_BIN ||
  ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(existsSync);
if (!CHROME) {
  console.error('No Chromium found. Set CHROME_BIN to a chrome executable.');
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

// Tiny static file server with SPA fallback to index.html.
function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let file = join(DIST, urlPath === '/' ? 'index.html' : urlPath);
      if (!existsSync(file) || !extname(file)) file = join(DIST, 'index.html');
      try {
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404).end('not found');
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/#/', '/#/services', '/#/about', '/#/contact'];

const server = await serve();
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

for (const route of routes) {
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });

  // GOTCHA: content uses IntersectionObserver scroll-reveals (opacity:0 until
  // seen). A fullPage screenshot does NOT scroll, so below-the-fold sections
  // stay invisible. Step-scroll the whole page to trip every observer, then
  // return to top before capturing.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.5);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(350); // > the 700ms reveal? no — but slow enough for the observer to fire
    }
    await sleep(400);
    window.scrollTo(0, 0);
    await sleep(300);
  });
  await page.waitForTimeout(2200); // let reveals settle + looping animation reach a lively frame
  const name = route.replace(/[/#]+/g, '_').replace(/^_+|_+$/g, '') || 'home';
  const path = join(OUT, `${name}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(`✓ ${route}  →  screenshots/${name}.png`);
}

await browser.close();
server.close();
console.log('Done.');
