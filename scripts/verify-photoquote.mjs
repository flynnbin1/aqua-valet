import puppeteer from "puppeteer";
const url = process.argv[2] ?? "http://localhost:5173";
const b = await puppeteer.launch({timeout:120000}).catch(()=>puppeteer.launch({browser:"chrome",channel:"msedge",timeout:120000}));
const p = await b.newPage();
p.on("pageerror", e=>console.log("[pageerror]", e.message));
await p.setViewport({width:1440,height:900});
await p.goto(url, {waitUntil:"load", timeout:60000});
await new Promise(r=>setTimeout(r,2500));

const quoteButtons = await p.evaluate(() =>
  [...document.querySelectorAll("a")]
    .filter(a => /get a photo quote/i.test(a.textContent))
    .map(a => ({ text: a.textContent.trim(), href: a.getAttribute("href"), section: a.closest("section")?.getAttribute("aria-label") || a.closest("header") ? "header" : "?" }))
);
console.log(`"Get a Photo Quote" buttons found: ${quoteButtons.length}`);
quoteButtons.forEach(b => console.log(`  [${b.href === "#book" ? "OK" : "WRONG"}] "${b.text}" -> ${b.href}`));

// header CTA text + target
const headerCta = await p.evaluate(() => {
  const nav = document.querySelector("header nav");
  const a = [...nav.querySelectorAll("a")].find(a => a.textContent.includes("Photo Quote"));
  return a ? { text: a.textContent.trim(), href: a.getAttribute("href") } : null;
});
console.log("\nheader CTA:", JSON.stringify(headerCta));

// tabs: exactly 3, no "seven"
const tabInfo = await p.evaluate(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  return tabs.map(t => t.id);
});
console.log("\npricing tabs:", tabInfo.join(", "), tabInfo.length === 3 ? "OK (3 tabs)" : `MISMATCH (${tabInfo.length})`);

// click each tab, confirm prices update and images swap opacity
await p.evaluate(()=>document.querySelector("#pricing").scrollIntoView({block:"start"}));
await new Promise(r=>setTimeout(r,1000));
for (const id of ["tab-small","tab-big","tab-suv"]) {
  await p.click(`#${id}`);
  await new Promise(r=>setTimeout(r,300));
  const info = await p.evaluate((id) => {
    const btn = document.getElementById(id);
    const img = btn.querySelector("img");
    const prices = [...document.querySelectorAll("#plan-panel p.font-display")].map(x=>x.textContent.trim());
    return { selected: btn.getAttribute("aria-selected"), imgOpacity: getComputedStyle(img).opacity, prices };
  }, id);
  console.log(`${id}: selected=${info.selected} imgOpacity=${info.imgOpacity} prices=[${info.prices.join(" | ")}]`);
}
await b.close();
