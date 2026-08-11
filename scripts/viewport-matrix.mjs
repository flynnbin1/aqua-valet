// Screenshot the hero across a matrix of real device sizes so layout
// problems (cramped laptops, over-cropped phones) are visible side by side.
// Usage: node scripts/viewport-matrix.mjs <url> <prefix>
import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:5173";
const prefix = process.argv[3] ?? "vp";
const outDir = join(process.cwd(), "temp_screenshots");
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = [
  { name: "laptop-1280x800", width: 1280, height: 800 },
  { name: "laptop-1366x768", width: 1366, height: 768 },
  { name: "laptop-1440x900", width: 1440, height: 900 },
  { name: "laptop-1536x864", width: 1536, height: 864 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "desktop-2560x1440", width: 2560, height: 1440 },
  // Short browser windows (bookmarks bar / smaller laptops) — worst case
  { name: "short-1440x700", width: 1440, height: 700 },
  { name: "short-1280x640", width: 1280, height: 640 },
  { name: "tablet-834x1112", width: 834, height: 1112 },
  { name: "phone-375x667", width: 375, height: 667 },
  { name: "phone-390x844", width: 390, height: 844 },
];

const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 4500));

    // Work out whether the WHOLE car is on screen. The car occupies 20.5%
    // (roof) to 85.5% (tyres) of the source frame; replicate object-fit:cover
    // maths against the media box to project those onto the viewport.
    const metrics = await page.evaluate(() => {
      const CAR_TOP = 0.205;
      const CAR_BOTTOM = 0.855;
      const header = document.querySelector("header");
      const media = document.querySelector("#home video, #home img");
      if (!media) return { error: "no media" };
      const box = media.getBoundingClientRect();
      const natW = media.tagName === "VIDEO" ? media.videoWidth : media.naturalWidth;
      const natH = media.tagName === "VIDEO" ? media.videoHeight : media.naturalHeight;
      if (!natW || !natH) return { error: "media not ready" };

      // cover: scale so both dims fill the box
      const scale = Math.max(box.width / natW, box.height / natH);
      const drawnH = natH * scale;
      const overflowY = drawnH - box.height;
      // object-position Y (percentage of the overflow taken off the top)
      const posY = parseFloat(
        (getComputedStyle(media).objectPosition.split(" ")[1] || "50%").replace("%", ""),
      );
      const topCrop = overflowY * (posY / 100);
      const roofY = box.top + CAR_TOP * drawnH - topCrop;
      const tyreY = box.top + CAR_BOTTOM * drawnH - topCrop;
      const headerH = header ? header.getBoundingClientRect().height : 0;
      return {
        headerH: Math.round(headerH),
        roofY: Math.round(roofY),
        tyreY: Math.round(tyreY),
        roofClearsHeader: roofY >= headerH,
        tyresOnScreen: tyreY <= window.innerHeight,
      };
    });
    const ok = metrics.roofClearsHeader && metrics.tyresOnScreen ? "OK  " : "FAIL";
    console.log(`${ok} ${vp.name}: ${JSON.stringify(metrics)}`);

    await page.screenshot({ path: join(outDir, `${prefix}-${vp.name}.png`) });
    await page.close();
  }
} finally {
  await browser.close();
}
