# Aqua Valet Cork — Build Brief

## The client

Lucia "Lou" Ecker and her partner. Husband-and-wife valeting business, 8 years
trading. New Park, Centre Park Road, Cork — directly opposite the Marina Market,
near Páirc Uí Chaoimh. Open Wednesday, Friday and Saturday only. Just the two of
them — capacity is the constraint, which is why the whole site pushes toward
fewer, higher-value jobs.

★ 4.4 · 114 Google reviews — the most reviews of any valeter in Cork, currently
invisible on their own website.

## The repositioning (the point of the whole site)

Old site: "Valet 1–6" menu, prices from €10, WooCommerce checkout. It attracts
€35–€60 jobs and people who book a cheap express valet on a car that needs a
6-hour deep clean — then leave bad reviews when expectations aren't met.

New site: **premium deep-clean specialists.** Three named packages, "from €"
condition-based pricing, targeting BMW/Audi/high-end owners in Cork's affluent
suburbs. The deep clean is the star of the show. Nobody in Cork owns this
position online — the research in `research/` proves it page by page.

## The packages

| Package | Price | Notes |
|---|---|---|
| Essential Clean (maintenance valet) | from €150 | The 4–5 week return clean for existing deep-clean customers |
| Full Valet | from €120 (from €150 for SUVs/jeeps) | Mark this one "Most popular" — the middle anchor |
| The Deep Clean Reset | from €200 (up to €450 for a bad 7-seater) | The flagship. 6-hour full reset, ozone/steam treatment, condition-based pricing |

Add-ons: pet & dog hair removal, stain & odour removal, pickup & drop-off.

Every package card: what's included, benefits (not just features), duration
guide, "from €" price, and the caveat "final price depends on the size and
condition of your vehicle".

## The booking flow (replaces the broken WooCommerce checkout)

Simple enquiry form: name, phone, email, car type, "when was your car last
valeted?". On submit → confirmation screen: "Thanks — you'll get a WhatsApp
from us shortly asking for 3–4 photos of your car so we can give you an
accurate quote before you arrive."

The form posts to a webhook (endpoint supplied later — build it with a
placeholder). The WhatsApp sequence itself is handled outside the site.

Why it works this way: photos before arrival kills the mismatched-expectations
problem that causes every bad review, and it filters out the time-wasters.
There is a FAQ entry explaining "Why do we ask for photos first?" — it turns
the qualifying step into a selling point.

## The hero

Scroll-driven effect: a dirty Range Rover-style SUV that gets cleaned as the
visitor scrolls. Desktop only; phones get a lightweight fallback (see
CLAUDE.md hero rules). Placeholder image until the effect session.

Below/within the hero: "Cork's Premium Car Valeting & Deep Clean Specialists",
★ 4.4 · 114 Google reviews, two buttons: [WhatsApp us] [See packages].

## Sitewide elements

- Sticky WhatsApp + Call buttons on every screen height
- Live Google reviews embedded on the Reviews page and a review strip on Home
- LocalBusiness schema (CarWash type) with geo, Wed/Fri/Sat opening hours,
  aggregateRating (4.4, 114) — plus Service and FAQ schema on relevant pages
- FAQ section targeting real queries: "How much does a full valet cost in
  Cork?", "How long does a deep clean take?", "Do you remove dog hair?",
  "Why do you ask for photos first?"
- Footer NAP identical to the Google Business Profile

## Two-wave launch

**Wave 1 (this build first):** 1:1 swap of the existing site — Home, Packages
(x3), Book/Enquire, Services silo (x3, old URLs), About, Contact, Reviews,
Our Work gallery. Launch, watch Search Console 2–3 weeks, confirm "valet cork"
is stable.

**Wave 2 (only after Wave 1 proves stable):** the four gap pages (pet hair,
odour removal, interior cleaning, pre-NCT), five area pages (Cork City,
Douglas, Blackrock/Ballintemple, Rochestown/Carrigaline, Mahon), three blog
cost guides. Full detail in `docs/sitemap-plan.md`.

## Design direction

- Premium, glossy, aqua/teal palette from the existing brand (logo in
  `brand_assets/` — a refresh may come later, build with the current one)
- Real before/after photography from Lou wherever possible — real work beats
  stock. Photos land in `brand_assets/photos/`
- The comparison bar: Valet Deluxe (valetdeluxe.com) for premium feel and
  conversion layout, The Valeters (thevaleters.co.uk) for package presentation.
  Research teardowns of both are in `research/`
- Named, human, local — the opposite of the faceless chain competitors

## Reference research

`research/competitor-research.md` — 15-site teardown: who to copy for CRO, SEO
and local SEO, and the verified search gaps.
`research/site-plan.md` — the original research and site plan, including the
SEO protection commitments made to the client in writing.
