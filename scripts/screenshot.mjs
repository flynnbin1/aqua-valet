// Screenshot workflow (CLAUDE.md): capture the page at mobile (375px) and
// desktop (1440px) into temp_screenshots/ with descriptive names.
//
// Usage: node scripts/screenshot.mjs [url] [prefix]
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:5173";
const prefix = process.argv[3] ?? "home";
const outDir = join(process.cwd(), "temp_screenshots");
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

async function launchBrowser() {
  try {
    return await puppeteer.launch({ timeout: 120000 });
  } catch (err) {
    console.warn(`bundled Chrome failed (${err.message}); trying system Edge`);
    return await puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 });
  }
}

const browser = await launchBrowser();
try {
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    page.on("console", (msg) => {
      if (msg.type() === "error") console.log(`[console.error][${vp.name}] ${msg.text()}`);
    });
    page.on("pageerror", (err) => console.log(`[pageerror][${vp.name}] ${err.message}`));
    // "load" not networkidle0 — the hero scrub video streams and keeps the
    // network busy indefinitely on desktop viewports.
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    // Let the loading screen finish (1.5s + 300ms) and entrance animations settle.
    await new Promise((r) => setTimeout(r, 3200));

    await page.screenshot({
      path: join(outDir, `${prefix}-top-${vp.name}.png`),
    });

    // Scroll through the pinned hero so the wipe completes, then capture the
    // full page below the hero.
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.3));
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: join(outDir, `${prefix}-wiped-${vp.name}.png`),
    });

    // Scroll stepwise to the bottom so every whileInView reveal fires
    // (they use viewport.once, so they stay visible afterwards).
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = window.scrollY; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((r) => setTimeout(r, 1200));

    await page.screenshot({
      path: join(outDir, `${prefix}-full-${vp.name}.png`),
      fullPage: true,
    });
    await page.close();
    console.log(`captured ${vp.name}`);
  }
} finally {
  await browser.close();
}
