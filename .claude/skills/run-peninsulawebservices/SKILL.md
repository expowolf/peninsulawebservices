---
name: run-peninsulawebservices
description: Build, launch, and screenshot the Peninsula Web Services marketing site (Vite + React SPA). Use when asked to run, start, preview, build, or take screenshots of the website, or to visually verify UI/animation changes (hero build animation, spinning globe, scroll reveals, colors).
---

# Run: Peninsula Web Services

Single-page React site (Vite + Tailwind, hash-routed: Home / Services / About /
Contact). It is **visual-first** — looping CSS animations (a browser window
"building a website", a spinning globe pinned on Door County) and
IntersectionObserver scroll-reveals. The way to actually *see* a change is the
driver below: it builds, serves `dist/` statically, drives Playwright's bundled
Chromium, and writes full-page PNGs to `screenshots/`.

All paths below are relative to the repo root (`<unit>/`).

## Prerequisites

Node 22 is present. The only extra dependency is a headless browser binding.
Playwright's Chromium is already on disk at `/opt/pw-browsers/chromium-1194`;
install the matching client library (already in `devDependencies`):

```bash
npm install
```

If `playwright-core` is somehow missing:

```bash
npm install -D playwright-core@1.49
```

No `apt-get` packages were needed — the bundled Chromium runs headless with
`--no-sandbox` (the driver sets this).

## Build

```bash
npm run build
```

Produces `dist/` (~55 kB gzipped JS). The driver requires this — it serves the
production build, not the dev server.

## Run (agent path) — screenshot every page

```bash
node .claude/skills/run-peninsulawebservices/driver.mjs
```

Writes `screenshots/home.png`, `services.png`, `about.png`, `contact.png`.
Then **open the PNGs and look at them** — `home.png` is the one to check for the
hero build-animation and the globe.

Screenshot a single route:

```bash
node .claude/skills/run-peninsulawebservices/driver.mjs /#/services
```

The driver starts its own static server on port 4399 and shuts it down when
done — nothing to clean up. Point it elsewhere with `CHROME_BIN=/path/to/chrome`
if the bundled Chromium moves.

## Run (human path) — live dev server

```bash
npm run dev      # http://localhost:5173  (Ctrl-C to stop)
```

Useful for hot-reload while editing; useless headless (no one's watching the
port). Verified it returns HTTP 200. Prefer the driver for verification.

## Gotchas

- **Scroll-reveals need a real scroll.** Sections wrap in `<Reveal>` (opacity:0
  until `IntersectionObserver` fires). A `fullPage` screenshot does **not**
  scroll, so below-the-fold sections come out blank. The driver step-scrolls the
  whole page (dwelling ~350 ms per step so the observer fires) before returning
  to top — fast scrolling outruns the observer and leaves gaps. If you see blank
  bands mid-page, the dwell time is too short.
- **First animation frame is empty.** The hero "build" animation and globe loop
  on a 7 s / 12 s cycle starting from hidden. The driver waits ~2.2 s post-scroll
  so the capture lands on a lively frame, not frame 0.
- **Chromium version pin.** `playwright-core@1.49` expects a different Chromium
  revision than the on-disk `chromium-1194`. The driver bypasses the version
  check by passing `executablePath` directly — do not call
  `chromium.launch()` without it, or you get "executable doesn't exist".
- **Hash routing.** Routes are `/#/`, `/#/services`, etc. (not `/services`).
  Plain-path URLs all serve the SPA shell and render Home.
- **Reduced motion.** With `prefers-reduced-motion`, all animations collapse to a
  static frame by design — a "frozen" screenshot under that setting is correct.

## Troubleshooting

- `dist/ not found` → run `npm run build` first.
- `No Chromium found` → set `CHROME_BIN` to a chrome/headless_shell binary
  (e.g. `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
- Blank middle sections in a screenshot → scroll dwell too short; the driver
  already handles this, but custom routes with very tall content may need a
  larger dwell in the `page.evaluate` scroll loop.
