// Read the REAL rendered values out of the running site: resolved colour
// tokens as hex, font families/weights actually in use, and whether the
// webfont loaded. Used to write docs/BRAND-GUIDELINES.md from fact.
// Usage: node scripts/extract-tokens.mjs [url]
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
await new Promise((r) => setTimeout(r, 2500));

const out = await page.evaluate(async () => {
  await document.fonts.ready;
  const toHex = (rgb) => {
    const m = rgb.match(/\d+(\.\d+)?/g);
    if (!m) return rgb;
    return (
      "#" +
      m.slice(0, 3)
        .map((n) => Math.round(+n).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  };
  // Resolve each CSS variable by painting it on a probe element
  const probe = document.createElement("div");
  document.body.appendChild(probe);
  const vars = ["bg", "surface", "navy", "text", "muted", "stroke", "accent", "accent-light"];
  const tokens = {};
  for (const v of vars) {
    probe.style.color = `hsl(var(--${v}))`;
    tokens[v] = toHex(getComputedStyle(probe).color);
  }
  probe.remove();

  const cs = (sel, prop) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el)[prop] : null;
  };
  const fontsLoaded = [...document.fonts].map(
    (f) => `${f.family} ${f.weight} ${f.status}`,
  );

  return {
    tokens,
    fonts: {
      bodyFamily: cs("body", "fontFamily"),
      bodyWeight: cs("body", "fontWeight"),
      bodySize: cs("p", "fontSize"),
      h1Family: cs("h1", "fontFamily"),
      h1Weight: cs("h1", "fontWeight"),
      h1Size: cs("h1", "fontSize"),
      h2Weight: cs("h2", "fontWeight"),
      h2Size: cs("h2", "fontSize"),
      h3Weight: cs("h3", "fontWeight"),
      loaded: fontsLoaded,
      montserratLoaded: document.fonts.check('16px Montserrat'),
    },
    samples: {
      bodyBg: toHex(cs("body", "backgroundColor")),
      bodyColor: toHex(cs("body", "color")),
      accentText: toHex(cs("h1 em", "color")),
      mutedText: toHex(cs("#home p", "color")),
      headerBg: toHex(cs("header > div:nth-child(2)", "backgroundColor")),
      infoStripBg: toHex(cs("header > div:first-child", "backgroundColor")),
      cardBg: toHex(cs("#packages article", "backgroundColor")),
      cardBorder: toHex(cs("#packages article", "borderTopColor")),
    },
  };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
