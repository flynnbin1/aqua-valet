// Walk every visible text element and report WCAG AA failures against its
// effective background. Used to verify the light theme didn't leave any
// unreadable pairs behind.
// Usage: node scripts/contrast-audit.mjs [url]
import puppeteer from "puppeteer";

const url = process.argv[2] ?? "http://localhost:5173";
const browser = await puppeteer
  .launch({ timeout: 120000 })
  .catch(() =>
    puppeteer.launch({ browser: "chrome", channel: "msedge", timeout: 120000 }),
  );
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));
// Fire all scroll reveals so nothing is skipped for being at opacity 0
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 800));

const results = await page.evaluate(() => {
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [la, lb] = [lum(a), lum(b)];
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c.length >= 3 && (c[3] === undefined || c[3] > 0.85)) return c;
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  const hex = (c) =>
    "#" + c.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, "0")).join("").toUpperCase();

  const out = [];
  for (const el of document.querySelectorAll("p,h1,h2,h3,a,span,li,dt,dd,label,button")) {
    const txt = (el.textContent || "").trim();
    if (!txt || el.children.length > 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (parseFloat(cs.opacity) < 0.6) continue;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    // Skip anything sitting over the hero video — measured separately
    if (el.closest("#home")) continue;

    const fg = parse(cs.color);
    const bg = bgOf(el);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    const r = ratio(fg, bg);
    if (r < need) {
      out.push({
        text: txt.slice(0, 48),
        fg: hex(fg),
        bg: hex(bg),
        ratio: +r.toFixed(2),
        need,
        size: Math.round(size),
      });
    }
  }
  return out;
});

if (!results.length) {
  console.log("PASS — no WCAG AA contrast failures on the light theme.");
} else {
  console.log(`${results.length} failure(s):`);
  for (const r of results) {
    console.log(`  ${r.ratio}:1 (needs ${r.need}) ${r.fg} on ${r.bg} @${r.size}px — "${r.text}"`);
  }
}
await browser.close();
