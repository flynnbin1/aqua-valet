// Verify the scroll-scrubbed hero: at several scroll offsets, record the
// hero video's currentTime and capture a screenshot. Also confirms the
// mobile fallback renders a poster (no <video>) and logs console errors.
//
// Usage: node scripts/verify-scrub.mjs [url]
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:5173";
const outDir = join(process.cwd(), "temp_screenshots");
mkdirSync(outDir, { recursive: true });

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
  // Desktop scrub check
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  page.on("console", (m) => {
    if (m.type() === "error") console.log(`[console.error] ${m.text()}`);
  });
  page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3500)); // loading screen
  // Wait until the video has metadata (readyState >= 1)
  await page.waitForFunction(
    () => (document.querySelector("video")?.readyState ?? 0) >= 1,
    { timeout: 30000 },
  );

  const duration = await page.evaluate(
    () => document.querySelector("video")?.duration ?? null,
  );
  console.log(`video duration: ${duration}`);

  // The pin is 200% of viewport => scrub range ≈ 2 * 900px
  const fractions = [0, 0.25, 0.5, 0.75, 1];
  for (const f of fractions) {
    await page.evaluate((frac) => {
      window.scrollTo(0, Math.round(window.innerHeight * 2 * frac));
    }, f);
    await new Promise((r) => setTimeout(r, 900));
    const t = await page.evaluate(
      () => document.querySelector("video")?.currentTime ?? null,
    );
    const hintOpacity = await page.evaluate(() => {
      const el = document.querySelector("[aria-hidden][class*='bottom-8']");
      return el ? getComputedStyle(el).opacity : "n/a";
    });
    console.log(
      `scroll ${Math.round(f * 100)}% -> currentTime ${t?.toFixed(2)}s, scroll-cue opacity ${hintOpacity}`,
    );
    await page.screenshot({
      path: join(outDir, `scrub-${Math.round(f * 100)}pct-desktop.png`),
    });
  }
  await page.close();

  // Mobile fallback check
  const mob = await browser.newPage();
  await mob.setViewport({ width: 375, height: 812 });
  mob.on("console", (m) => {
    if (m.type() === "error") console.log(`[mobile console.error] ${m.text()}`);
  });
  await mob.goto(url, { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3500));
  const mobileHasVideo = await mob.evaluate(
    () => !!document.querySelector("#home video"),
  );
  const mobileHasPoster = await mob.evaluate(
    () => !!document.querySelector("#home picture img"),
  );
  console.log(
    `mobile: video element present = ${mobileHasVideo}, poster present = ${mobileHasPoster}`,
  );
  await mob.screenshot({ path: join(outDir, "scrub-mobile-fallback.png") });
  await mob.close();
} finally {
  await browser.close();
}
