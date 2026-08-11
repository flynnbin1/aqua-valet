// Verify: no dead anchor links anywhere on the page, and the FinalCta
// mobile-only Call button toggles visibility correctly by breakpoint.
import puppeteer from "puppeteer";

const url = process.argv[2] ?? "http://localhost:5173";
const b = await puppeteer.launch({timeout:120000}).catch(()=>puppeteer.launch({browser:"chrome",channel:"msedge",timeout:120000}));

const desktop = await b.newPage();
await desktop.setViewport({width:1440,height:900});
desktop.on("pageerror", e=>console.log("[pageerror]", e.message));
await desktop.goto(url, {waitUntil:"load", timeout:60000});
await new Promise(r=>setTimeout(r,2500));

const anchorCheck = await desktop.evaluate(() => {
  const ids = new Set([...document.querySelectorAll("[id]")].map(e => e.id));
  const links = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute("href"));
  const unique = [...new Set(links)];
  const dead = unique.filter(h => h !== "#" && !ids.has(h.slice(1)));
  return { unique, dead };
});
console.log("all unique #anchor hrefs on page:", anchorCheck.unique.join(", "));
console.log("DEAD anchors:", anchorCheck.dead.length ? anchorCheck.dead.join(", ") : "none — all resolve");

// Desktop: Call now button should be hidden (sm:hidden)
const desktopCallVisible = await desktop.evaluate(() => {
  const el = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === "Call now");
  return el ? getComputedStyle(el).display !== "none" : null;
});
console.log("desktop: Call now visible?", desktopCallVisible, desktopCallVisible === false ? "OK (correctly hidden)" : "CHECK");
await desktop.close();

const mobile = await b.newPage();
await mobile.setViewport({width:375,height:812,isMobile:true,hasTouch:true});
await mobile.goto(url, {waitUntil:"load", timeout:60000});
await new Promise(r=>setTimeout(r,2500));
const mobileCall = await mobile.evaluate(() => {
  const el = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === "Call now");
  return el ? { visible: getComputedStyle(el).display !== "none", href: el.getAttribute("href") } : null;
});
console.log("mobile: Call now ->", JSON.stringify(mobileCall), mobileCall?.visible ? "OK (visible)" : "CHECK");
await mobile.close();
await b.close();
