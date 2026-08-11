// Rasterize downloaded SVG brand boards for visual review.
// Usage: node scripts/rasterize-svg.mjs <dir-with-board1.svg,board2.svg>
import puppeteer from "puppeteer";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dir = resolve(process.argv[2]);
const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
for (const n of ["board1", "board2"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1200 });
  await page.goto(pathToFileURL(join(dir, `${n}.svg`)).href, {
    waitUntil: "networkidle0",
  });
  const out = join(dir, `${n}.png`);
  await page.screenshot({ path: out, fullPage: true });
  console.log(`wrote ${out}`);
  await page.close();
}
await browser.close();
