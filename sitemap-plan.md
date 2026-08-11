# Sitemap Plan — URL by URL

Status meanings:
- **KEEP** — this URL exists on the old site and must exist on the new one. Never rename.
- **REDIRECT** — old URL 301s to the new address shown. Record in the redirects config.
- **NEW** — page that doesn't exist yet.

## Wave 1 — the core swap (build first)

| Page | URL | Status | Notes |
|---|---|---|---|
| Home | `/` | KEEP | Rebuilt around premium positioning. Targets: valet cork, car valeting cork |
| About Us | `/about-us/` | KEEP | 8-year story, husband-and-wife team, real faces |
| Contact | `/contact/` | KEEP | Map embed, Wed/Fri/Sat hours, NAP matching GBP exactly |
| Book / Enquire | `/book-now/` | KEEP | Enquiry form → WhatsApp photo sequence. Replaces WooCommerce checkout |
| Reviews | `/your-feedback/` | KEEP | Live Google reviews embedded, review QR link |
| Our Work | `/valeting-work/` | KEEP | Before/after gallery from Lou's photos; add prestige-car (BMW/Audi) examples |
| Packages hub | `/packages/` | NEW | Three tiers + add-ons, middle tier starred "Most popular" |
| Essential Clean | `/packages/essential-clean/` | NEW | Maintenance valet, from €150 |
| Full Valet | `/packages/full-valet/` | NEW | From €120/€150. **Old `/services/car-valeting/` does NOT redirect here — see below** |
| The Deep Clean Reset | `/product/deep-clean-valet/` | KEEP | Flagship. Already ranks #1 for "car deep clean cork" — upgrade content, keep URL exactly |
| Services hub | `/services/` | KEEP | The silo that's earning rankings |
| Car Valeting | `/services/car-valeting/` | KEEP | Ranks for the core term. Strengthen content, link forward to the Full Valet package |
| Car Wash | `/services/car-wash/` | KEEP | Kept for "car wash cork" ranking; de-emphasised in nav, steers up to valet/deep clean |
| Pickup & Mobile | `/services/pickup-mobile-valeting/` | KEEP | Collection & drop-off — premium differentiator |

**Important:** the draft sitemap sent to the client marked `/services/car-valeting/`
as redirecting to `/packages/full-valet/`. Safer approach for Wave 1: **keep both
live** — the service page keeps its ranking and links to the package page. Revisit
consolidation only after rankings are proven stable.

Also: any other URL discovered in `docs/benchmark.md` (old WooCommerce product
pages, category pages, etc.) gets a 301 to the closest equivalent page. Nothing 404s.

## Wave 2 — growth pages (only after Wave 1 is stable)

| Page | URL | Status | Target searches |
|---|---|---|---|
| Pet & Dog Hair Removal | `/pet-hair-removal-cork/` | NEW | dog hair removal car cork — no Irish business has a page |
| Car Odour Removal | `/car-odour-removal-cork/` | NEW | car odour removal cork — ties to ozone treatment |
| Interior Deep Cleaning | `/car-interior-cleaning-cork/` | NEW | car interior cleaning cork — no Cork page exists |
| Pre-NCT & Pre-Sale Valet | `/pre-nct-valet-cork/` | NEW | pre-nct valet cork — nothing in Munster |
| Areas hub | `/areas/` | NEW | Links to each area page |
| Cork City | `/areas/car-valeting-cork-city/` | NEW | Mention Marina Market / Páirc Uí Chaoimh naturally |
| Douglas | `/areas/car-valeting-douglas/` | NEW | Affluent-suburb targeting |
| Blackrock & Ballintemple | `/areas/car-valeting-blackrock/` | NEW | |
| Rochestown & Carrigaline | `/areas/car-valeting-rochestown/` | NEW | |
| Mahon | `/areas/car-valeting-mahon/` | NEW | |
| Blog hub | `/blog/` | NEW | |
| Valet cost guide | `/blog/car-valeting-cost-cork/` | NEW | The cost-guide format ranks nationally for competitors |
| Deep clean cost guide | `/blog/deep-clean-cost-cork/` | NEW | |
| How to choose guide | `/blog/choose-valeting-cork/` | NEW | |

Every area page needs genuinely unique local copy — no near-duplicate doorway
pages. If a page can't be written properly, it doesn't ship.

## Technical (both waves)

- `sitemap.xml` regenerated per wave, submitted to Search Console at launch
- 301 redirect map maintained in the repo, tested before every deploy
- `noindex` + robots Disallow on every preview deployment until launch day
