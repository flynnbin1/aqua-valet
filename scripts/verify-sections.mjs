// Verify the two new sections behave: the before/after slider responds to
// drag + keyboard, and the pricing tabs actually re-price the cards.
// Usage: node scripts/verify-sections.mjs [url]
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
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") console.log(`[console.error] ${m.text()}`);
});
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// Reveal everything so the lazy sections mount
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
});
await new Promise((r) => setTimeout(r, 800));

// ---- Slider ----
const clipAt = () =>
  page.evaluate(() => {
    const sec = document.querySelector('[aria-label="Before and after a deep clean"]');
    const clipped = sec?.querySelector('[style*="clip"]');
    const input = sec?.querySelector('input[type="range"]');
    const divider = sec?.querySelector('[style*="left"]');
    return `value=${input?.value} clip=${clipped ? getComputedStyle(clipped).clipPath : "?"} dividerLeft=${divider ? divider.style.left : "?"}`;
  });

// Bring it into view BEFORE interacting, or the coordinates are off-screen
await page.evaluate(() => {
  document
    .querySelector('[aria-label="Before and after a deep clean"]')
    .scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 1500)); // html has scroll-behavior:smooth

const range = await page.$('input[type="range"]');
const dbgBox = await range.boundingBox();
console.log("slider input found:", !!range, "box:", JSON.stringify(dbgBox));
console.log("  clip @default:", await clipAt());

// Drag the handle — incremental moves, as a real pointer would
const box = await range.boundingBox();
const y = box.y + box.height / 2;
await page.mouse.move(box.x + box.width * 0.5, y);
await page.mouse.down();
for (let f = 0.52; f <= 0.85; f += 0.03) {
  await page.mouse.move(box.x + box.width * f, y);
  await new Promise((r) => setTimeout(r, 25));
}
await page.mouse.up();
await new Promise((r) => setTimeout(r, 400));
console.log("  clip after drag right:", await clipAt());

// Tap-to-position (how most people use it on touch)
await page.mouse.click(box.x + box.width * 0.2, y);
await new Promise((r) => setTimeout(r, 300));
console.log("  clip after tap at 20%:", await clipAt());

// Keyboard
await range.focus();
for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowLeft");
await new Promise((r) => setTimeout(r, 400));
console.log("  clip after 10x ArrowLeft:", await clipAt());

await page.evaluate(() => {
  document
    .querySelector('[aria-label="Before and after a deep clean"]')
    .scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: join(outDir, "section-slider.png") });

// ---- Pricing tabs ----
const priceOf = () =>
  page.evaluate(() =>
    [...document.querySelectorAll("#plan-panel article p.font-display")]
      .map((p) => p.textContent.replace(/\s+/g, " ").trim())
      .join("  |  "),
  );

console.log("\npricing tabs:");
for (const id of ["small", "big", "suv", "seven"]) {
  await page.click(`#tab-${id}`);
  await new Promise((r) => setTimeout(r, 250));
  const selected = await page.$eval(`#tab-${id}`, (el) => el.getAttribute("aria-selected"));
  console.log(`  ${id.padEnd(6)} aria-selected=${selected}  ${await priceOf()}`);
}

await page.evaluate(() => {
  document.querySelector("#plans").scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: join(outDir, "section-pricing.png") });

await browser.close();
