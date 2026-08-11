// Verify the MOBILE hero scrub: at 375px the portrait clip must load and
// scrub with scroll, and reduced-motion / save-data must fall back to a
// static poster with no video at all.
// Usage: node scripts/verify-mobile-scrub.mjs [url]
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:5173";
const outDir = join(process.cwd(), "temp_screenshots");
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );

try {
  // ---- 1. Mobile scrub ----
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  page.on("console", (m) => {
    if (m.type() === "error") console.log(`[console.error] ${m.text()}`);
  });
  page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(
    () => (document.querySelector("#home video")?.readyState ?? 0) >= 1,
    { timeout: 30000 },
  );

  const info = await page.evaluate(() => {
    const v = document.querySelector("#home video");
    return { src: v.getAttribute("src"), w: v.videoWidth, h: v.videoHeight, dur: +v.duration.toFixed(2) };
  });
  console.log(`mobile video: ${info.src} ${info.w}x${info.h} ${info.dur}s`);

  for (const f of [0, 0.25, 0.5, 0.75, 1]) {
    await page.evaluate((frac) => {
      window.scrollTo(0, Math.round(window.innerHeight * 2 * frac));
    }, f);
    await new Promise((r) => setTimeout(r, 900));
    const t = await page.evaluate(
      () => +document.querySelector("#home video").currentTime.toFixed(2),
    );
    console.log(`  scroll ${String(Math.round(f * 100)).padStart(3)}% -> currentTime ${t}s`);
    await page.screenshot({ path: join(outDir, `mobscrub-${Math.round(f * 100)}pct.png`) });
  }
  await page.close();

  // ---- 2. Reduced-motion fallback ----
  const rm = await browser.newPage();
  await rm.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await rm.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await rm.goto(url, { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));
  const rmState = await rm.evaluate(() => ({
    video: !!document.querySelector("#home video"),
    poster: !!document.querySelector("#home picture img"),
  }));
  console.log(
    `reduced-motion: video=${rmState.video} poster=${rmState.poster} ${!rmState.video && rmState.poster ? "OK" : "FAIL"}`,
  );
  await rm.screenshot({ path: join(outDir, "mobscrub-reduced-motion.png") });
  await rm.close();
} finally {
  await browser.close();
}
