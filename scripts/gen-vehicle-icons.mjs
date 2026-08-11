// Render the 3 vehicle-size placeholder silhouettes to transparent PNGs.
import puppeteer from "puppeteer";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const htmlPath = process.argv[2];
const outDir = join(process.cwd(), "public", "images");

const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
const page = await browser.newPage();
await page.setViewport({ width: 500, height: 300, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });

for (const id of ["small", "big", "suv"]) {
  const el = await page.$(`#${id}`);
  const out = join(outDir, `vehicle-${id}.png`);
  await el.screenshot({ path: out, omitBackground: true });
  console.log(`wrote ${out}`);
}
await browser.close();
