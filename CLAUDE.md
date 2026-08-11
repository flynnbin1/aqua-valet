# Project: Aqua Valet Cork — Website Rebuild

Premium car valeting site for aquavaletcork.com. The client ranks #1 organic for
"valet cork" and #1 in the Google Maps pack. **Protecting those rankings is the
top priority of this entire project — above design, above features.**

Read `docs/BUILD-BRIEF.md` and `docs/sitemap-plan.md` before doing anything.

## Rules — always

- Always invoke the frontend-design skill before writing any frontend code. No exceptions.
- Read `brand_assets/` (logo, photos, brand notes) before generating any UI.
- Use the Puppeteer screenshot workflow to visually verify every build iteration. Store screenshots in `temp_screenshots/` with descriptive names (e.g. `hero-v2-mobile.png`).
- Mobile-first. Most traffic is on phones. Check every section at 375px before 1440px.
- Only make changes directly requested. Do not add features, pages, or refactors beyond what was asked.

## SEO non-negotiables — never break these

1. **Never delete or rename a URL** listed as KEEP in `docs/sitemap-plan.md`. Any URL that must change gets a 301 redirect recorded in the redirects config. Nothing 404s.
2. **The site stays hidden from Google until launch day.** `noindex` meta on every page + `Disallow: /` in robots.txt on all preview deployments. Removing this happens only when Niall explicitly says "we are launching".
3. **Titles and H1s evolve, never get replaced.** Current homepage title "Aqua Valet Cork | Professional Car Valeting & Wash" and H1 "Corks Most Professional Valeting Service" are earning the #1 spot — strengthen the wording, keep the keywords.
4. **Never write "from €10" or any low price anywhere.** All pricing is "from €X" with a condition caveat ("final price depends on the size and condition of your vehicle"). Lowest visible package price is €120.
5. **Footer NAP** (name, address, phone) must match the Google Business Profile character-for-character: Aqua Valet, New Park, Centre Park Road, Cork. Opening hours: Wednesday, Friday, Saturday only.
6. Every page ships with: unique title tag, meta description, one H1, LocalBusiness/Service/FAQ schema where specified in the brief.
7. Before declaring any page done, check it against `docs/benchmark.md` (the crawl of the old site) — nothing that was ranking gets lost.

## Hero section rules

- The scroll-driven "dirty car gets cleaned" hero runs on desktop AND mobile,
  as a WebP frame-sequence canvas scrub (scripts/gen-hero-frames.mjs) — NOT
  video.currentTime seeking, which iOS throttles during touch scroll.
- **Mobile is conditional: the scrub is allowed on mobile only while mobile
  Lighthouse stays ≥90.** If it drops below, revert mobile to the static
  fallback. Niall verifies via PageSpeed Insights after deploys.
- The prefers-reduced-motion / save-data static path (clean-frame still, no
  sequence downloaded) stays exactly as-is. Test it first, not last.
- Hero is animated — skip screenshot comparison on it; Niall reviews it manually in the browser.

## Pipeline & git rules

- Local dev → GitHub → Vercel auto-deploy on push.
- Always test on localhost first.
- **Never push to GitHub unless Niall explicitly says "push" or "commit".**
- Never run destructive commands, delete files outside this project, or add dependencies without asking first.
- Descriptive commit messages (e.g. "add packages page with three-tier pricing").

## Build sequence (do not skip ahead)

1. Project setup + global shell (nav, footer with NAP, sticky WhatsApp + Call buttons)
2. Homepage bones with placeholder hero image — screenshot, stop, wait for Niall's review
3. Hero effect as its own focused task after homepage sign-off
4. Remaining Wave 1 pages per `docs/sitemap-plan.md`
5. Wave 2 pages only when Niall says Wave 1 has launched and rankings are stable

## Language & tone

- Irish English throughout (colour, tyre, kerb; "car park" not "parking lot").
- Premium but warm — a husband-and-wife team with 8 years' standards, not a faceless chain.
- Every price is "from €X". Every package card carries the condition caveat.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
