// Probe the hero entrance animation over time at a given viewport, to catch
// elements that never become visible (or get reset mid-flight).
// Usage: node scripts/hero-timing.mjs <url> <width> <height>
import puppeteer from "puppeteer";

const [url, w, h] = process.argv.slice(2);
const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
const page = await browser.newPage();
await page.setViewport({ width: Number(w), height: Number(h) });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.goto(url, { waitUntil: "load", timeout: 60000 });

for (const t of [500, 1200, 2500, 4000, 6000]) {
  await new Promise((r) => setTimeout(r, t === 500 ? 500 : 0));
  if (t !== 500) await new Promise((r) => setTimeout(r, 0));
  const snap = await page.evaluate(() => {
    const read = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return "missing";
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return `op=${(+cs.opacity).toFixed(2)} y=${Math.round(r.top)} h=${Math.round(r.height)}`;
    };
    return {
      eyebrow: read(".blur-in"),
      h1: read("h1"),
      buttons: read("#home a[href^='https://wa.me']"),
    };
  });
  console.log(`t=${t}ms  eyebrow[${snap.eyebrow}]  h1[${snap.h1}]  cta[${snap.buttons}]`);
  await new Promise((r) => setTimeout(r, 1000));
}
await browser.close();
