// Verify the enquiry form: validation, success state, and that nothing
// navigates away or attempts a payment/checkout request.
import puppeteer from "puppeteer";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:5173";
const b = await puppeteer.launch({timeout:120000}).catch(()=>puppeteer.launch({browser:"chrome",channel:"msedge",timeout:120000}));
const p = await b.newPage();
await p.setViewport({width:1440,height:900});
const requests = [];
p.on("request", r => { if (r.method() !== "GET") requests.push(`${r.method()} ${r.url()}`); });
p.on("pageerror", e => console.log("[pageerror]", e.message));
p.on("console", m => { if (m.type()==="error") console.log("[console.error]", m.text()); });

await p.goto(url, {waitUntil:"load", timeout:60000});
await new Promise(r=>setTimeout(r,2500));
await p.evaluate(async()=>{const s=window.innerHeight*0.6;for(let y=0;y<document.body.scrollHeight;y+=s){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}});
await p.evaluate(()=>document.querySelector("#book").scrollIntoView({block:"start"}));
await new Promise(r=>setTimeout(r,1500));

const urlBefore = p.url();

// 1) Empty submit should be blocked
await p.click('#book button[type="submit"]');
await new Promise(r=>setTimeout(r,500));
const afterEmpty = await p.evaluate(()=>({
  alert: document.querySelector('#book [role="alert"]')?.textContent?.trim() ?? null,
  stillForm: !!document.querySelector('#book form'),
  focused: document.activeElement?.id ?? null,
}));
console.log("empty submit -> blocked:", afterEmpty.stillForm, "| focus moved to:", afterEmpty.focused);
console.log("  message:", afterEmpty.alert);
await p.screenshot({path: join(process.cwd(),"temp_screenshots","enquiry-validation.png")});

// 2) Fill and submit
await p.type("#enq-name", "Lou Ecker");
await p.type("#enq-phone", "083 461 8226");
await p.type("#enq-vehicle", "BMW 3 Series");
await p.select("#enq-last", (await p.$$eval('#enq-last option', o=>o.map(x=>x.value)))[2]);
await p.click('#book button[type="submit"]');
await new Promise(r=>setTimeout(r,900));

const success = await p.evaluate(()=>{
  const live = document.querySelector('#book [aria-live="polite"]');
  return { shown: !!live, text: live?.textContent?.replace(/\s+/g," ").trim().slice(0,140) ?? null,
           formGone: !document.querySelector("#book form") };
});
console.log("\nafter valid submit -> success shown:", success.shown, "| form replaced:", success.formGone);
console.log("  copy:", success.text);
console.log("  navigated away:", p.url() !== urlBefore);
console.log("  non-GET requests made:", requests.length ? requests.join(", ") : "none (webhook not wired)");
await p.evaluate(()=>document.querySelector("#book").scrollIntoView({block:"start"}));
await new Promise(r=>setTimeout(r,800));
await p.screenshot({path: join(process.cwd(),"temp_screenshots","enquiry-success.png")});
await b.close();
