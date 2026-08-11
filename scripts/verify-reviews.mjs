// Verify the reviews carousel: rating text matches site.ts, arrow buttons
// actually scroll the track, edge buttons disable correctly, and the hero +
// schema rating figures agree.
import puppeteer from "puppeteer";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:5173";
const b = await puppeteer.launch({timeout:120000}).catch(()=>puppeteer.launch({browser:"chrome",channel:"msedge",timeout:120000}));
const p = await b.newPage();
p.on("pageerror", e=>console.log("[pageerror]", e.message));
p.on("console", m=>{ if(m.type()==="error") console.log("[console.error]", m.text()); });
await p.setViewport({width:1440,height:900});
await p.goto(url, {waitUntil:"load", timeout:60000});
await new Promise(r=>setTimeout(r,2500));
await p.evaluate(async()=>{const s=window.innerHeight*0.6;for(let y=0;y<document.body.scrollHeight;y+=s){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,110));}});

const heroRating = await p.evaluate(()=>document.querySelector("#home")?.textContent.match(/[\d.]+\s*·\s*\d+\s*Google reviews/)?.[0] ?? null);
console.log("hero rating text:", heroRating);

const cardCount = await p.evaluate(()=>document.querySelectorAll('#reviews article').length);
console.log("review cards rendered:", cardCount, cardCount===12?"OK":"MISMATCH (expected 12)");

const summary = await p.evaluate(()=>document.querySelector("#reviews")?.textContent.match(/[\d.]+\s*·\s*\d+\s*Google reviews/)?.[0] ?? null);
console.log("reviews section rating summary:", summary);

// Schema check
const html = readFileSync(join(process.cwd(),"index.html"),"utf8");
const schemaMatch = html.match(/"ratingValue":\s*"([\d.]+)"[\s\S]*?"reviewCount":\s*"(\d+)"/);
console.log("schema aggregateRating:", schemaMatch ? `${schemaMatch[1]} / ${schemaMatch[2]}` : "NOT FOUND");

// Carousel interaction
await p.evaluate(()=>document.querySelector("#reviews").scrollIntoView({block:"start"}));
await new Promise(r=>setTimeout(r,1500));

const before = await p.evaluate(()=>{
  const t=document.querySelector('#reviews [role="region"]');
  return {scrollLeft:t.scrollLeft, prevDisabled: document.querySelector('[aria-label="Previous reviews"]').disabled};
});
console.log("\nbefore click -> scrollLeft:", before.scrollLeft, "| prev disabled:", before.prevDisabled);

await p.click('[aria-label="Next reviews"]');
await new Promise(r=>setTimeout(r,900));
const afterNext = await p.evaluate(()=>{
  const t=document.querySelector('#reviews [role="region"]');
  return {scrollLeft:t.scrollLeft, prevDisabled: document.querySelector('[aria-label="Previous reviews"]').disabled};
});
console.log("after 1x next  -> scrollLeft:", afterNext.scrollLeft, "| prev disabled:", afterNext.prevDisabled,
  afterNext.scrollLeft > before.scrollLeft ? "OK (moved)" : "FAIL (did not move)");

// Click next until it disables itself, then confirm it actually reached the end
let clicks = 0;
let atEnd = false;
for (let i=0;i<12 && !atEnd;i++) {
  atEnd = await p.evaluate(()=>document.querySelector('[aria-label="Next reviews"]').disabled);
  if (atEnd) break;
  await p.click('[aria-label="Next reviews"]');
  await new Promise(r=>setTimeout(r,700));
  clicks++;
}
const endState = await p.evaluate(()=>{
  const t=document.querySelector('#reviews [role="region"]');
  return {scrollLeft:t.scrollLeft, max: t.scrollWidth - t.clientWidth, nextDisabled: document.querySelector('[aria-label="Next reviews"]').disabled};
});
console.log(`after ${clicks} more clicks -> scrollLeft: ${endState.scrollLeft} / max ${endState.max} | next disabled: ${endState.nextDisabled}`,
  Math.abs(endState.scrollLeft-endState.max)<=4 ? "OK (reached end)" : "FAIL (not at end)");

await b.close();
