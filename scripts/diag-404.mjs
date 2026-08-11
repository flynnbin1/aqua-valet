// List every resource that fails to load on a given URL (used to chase
// missing files in the portable dist build).
import puppeteer from "puppeteer";

const url = process.argv[2];
const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on("requestfailed", (req) =>
  console.log(`FAILED: ${req.url()} — ${req.failure()?.errorText}`),
);
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));
await page.evaluate(async () => {
  const step = window.innerHeight;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
});
await new Promise((r) => setTimeout(r, 1500));
await browser.close();
console.log("diag done");
