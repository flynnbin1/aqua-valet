# Session 1 — paste this into Claude Code

Copy everything below the line into your first Claude Code message, from inside
the project folder.

---

Read CLAUDE.md, docs/BUILD-BRIEF.md and docs/sitemap-plan.md in full before
doing anything.

This session has two jobs only — do not build any other pages yet:

1. **Project setup.** Create a Next.js project (static export, ready for
   Vercel), install Puppeteer for the screenshot workflow, set up the folder
   structure, and add noindex meta + a robots.txt that disallows everything —
   this site must stay hidden from Google until launch day. Confirm the
   frontend-design skill is active before writing any frontend code.

2. **Homepage bones.** Build the homepage structure only, mobile-first:
   - Nav with logo (brand_assets/) and links per the Wave 1 sitemap
   - Hero section with a placeholder image where the scroll effect will go
     later, the headline "Cork's Premium Car Valeting & Deep Clean
     Specialists", the ★ 4.4 · 114 Google reviews line, and two buttons:
     WhatsApp us / See packages
   - Three-package strip (Essential Clean from €150 · Full Valet from €120,
     marked "Most popular" · The Deep Clean Reset from €200) with the
     condition-pricing caveat on each card
   - Review strip
   - Footer with the exact NAP and Wed/Fri/Sat opening hours from CLAUDE.md
   - Sticky WhatsApp + Call buttons

Design direction is in the brief — premium, glossy, aqua/teal, Irish English.
When the bones are built, run the dev server, take screenshots at 375px and
1440px of every section, review them yourself against the brief, fix what's
off, then show me the screenshots and stop. Do not build the hero effect, do
not build other pages, do not push to GitHub.
