// Screenshot the page at a given scroll depth (in viewport-heights).
// Usage: node scripts/scroll-shot.mjs <url> <viewports-down> <out.png>
import puppeteer from "puppeteer";
import { join } from "node:path";

const [url, vhs, out] = process.argv.slice(2);
const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));
await page.evaluate((n) => window.scrollTo(0, window.innerHeight * n), Number(vhs));
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: join(process.cwd(), "temp_screenshots", out) });
await browser.close();
console.log(`wrote temp_screenshots/${out}`);
