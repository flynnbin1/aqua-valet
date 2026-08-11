# Aqua Valet Cork — Brand Guidelines

What the website actually uses, as built. Every value here was read out of the
running site (`scripts/extract-tokens.mjs`), not copied from a spec — so this
file and the build agree.

Source of truth for the brand itself: `aqua-valet-brand-brief.pdf` (project
root). Where the site and the brief disagree, the brief wins and this file
gets corrected.

---

## 1. The positioning

**A detailing studio, not a car wash.** Everything on the site is built to
attract deep-clean customers with cars worth caring about, and to filter out
people looking for a cheap express hoover.

| Do | Don't |
|---|---|
| Dark, cinematic, restrained | Bright, busy, discount-forecourt |
| Aqua used sparingly, as punctuation | Aqua everywhere, or a second accent colour |
| "Deep-clean specialists", "by appointment" | "Cheap", "while you wait", starburst offers |
| Real work, real reviews, real people | Stock imagery, invented claims |
| Prices always "from €…" with a condition caveat | Fixed prices, or any price under €120 |

Tone: premium but warm — a husband-and-wife team with eight years' standards,
not a faceless chain. Irish English throughout (colour, tyre, valeting).

---

## 2. Colour

**The site is light: a white page with dark type, punctuated by aqua and by
three deliberately dark zones.** The palette is stored as HSL custom
properties in `src/index.css` and exposed to Tailwind in
`tailwind.config.ts`. Decimals in those HSL values are deliberate: rounded
HSL drifts 1–2 points off the locked hexes below.

### The light page

| Role | Hex | Token | Tailwind class | Used for |
|---|---|---|---|---|
| Page | `#FFFFFF` | `--bg` | `bg-bg` | Page background, form fields |
| Surface | `#F2F6FA` | `--surface` | `bg-surface` | Cards, panels, quiet section bands |
| Text primary | `#0A0E14` | `--text` | `text-text-primary` | Headings and body copy — 19.3:1 |
| Text muted | `#53616E` | `--muted` | `text-muted` | Sublines, supporting copy — 6.4:1 |
| Line | `#DCE4EC` | `--stroke` | `border-stroke` | Hairline borders, dividers |
| Navy | `#0E2A47` | `--navy` | `bg-navy` | Structural depth (reserved) |

### Aqua — two tones, and they are not interchangeable

| Role | Hex | Token | Use it for |
|---|---|---|---|
| **Aqua (brand)** | **`#29ABE2`** | `--accent` | **Fills only** — buttons, the info strip, star motifs, borders. Dark text on aqua is 7.4:1 |
| **Aqua strong** | **`#106C97`** | `--accent-strong` | **Text on white** — accent words in headings, links, prices. 5.8:1 |
| Aqua light | `#7FD4E8` | `--accent-light` | Gradient partner, hover states |

> The brand aqua `#29ABE2` is only **2.6:1 on white** — it fails WCAG for text.
> Never set copy, links or accent words in it on a light background; use
> `--accent-strong`. As a *fill* behind dark text it is perfect, and it stays
> the brand colour everywhere it appears as a shape.

### The dark zones

Three areas stay dark, because the logo artwork is baked on black and only
works there — and because the hero is a dark cinematic film.

| Role | Hex | Token | Where |
|---|---|---|---|
| Ink | `#0A0E14` | `--ink` | Footer, hero scrims, mobile menu |
| Ink surface | `#121722` | `--ink-surface` | Panels inside dark zones |
| Ink text | `#F2F6FA` | `--ink-text` | Type on dark |
| Ink muted | `#8A97A6` | `--ink-muted` | Supporting type on dark |
| Ink line | `#162733` | `--ink-stroke` | Borders on dark |
| Pure black | `#000000` | — | The main header bar |

**Brand gradient** — `linear-gradient(90deg, #7FD4E8 0%, #29ABE2 100%)`,
available as the `.aqua-gradient` utility. Used on gradient button borders and
bars. Not used on text.

### Rules
- **One accent colour.** Aqua is the only accent. No red, green, purple or
  secondary accent anywhere.
- **Use aqua sparingly** — CTAs, links, and one or two highlights per section.
  If a section has three aqua things in it, one of them is wrong.
- **Pick the right aqua**: fills get `--accent`, text gets `--accent-strong`.
- **Never gradient text.** Gradients are for borders and bars, not type.
- Every text/background pair on the light page is verified against WCAG AA by
  `scripts/contrast-audit.mjs`. Run it after any colour change.

---

## 3. Typography

**Montserrat, everywhere** — headings and body are the same family, separated
by weight. Self-hosted (variable, weights 400–800, latin subset) and embedded
in the stylesheet as a data URI, so it loads with the CSS: no third-party
request, no round trip, no flash of fallback text.

- File: `src/assets/fonts/montserrat-latin.woff2` (37 KB)
- Declared in: `src/fonts.css`
- Tailwind: both `font-body` and `font-display` map to Montserrat

| Weight | Name | Where it's used |
|---|---|---|
| 800 | ExtraBold | `<h1>`, `<h2>`, section headings, step numbers, footer marquee |
| 700 | Bold | `<h3>`, card titles, FAQ questions, prices |
| 600 | SemiBold | The solid aqua "WhatsApp us" button |
| 500 | Medium | Buttons, nav links, info-strip text |
| 400 | Regular | Body copy, sublines, supporting text |

### Scale (as built)
| Element | Mobile | Desktop |
|---|---|---|
| `<h1>` | 41.6px (2.6rem) | 96px |
| `<h2>` | 30px | 48px |
| `<h3>` | 20px | 20px |
| Body | 16px | 16px |
| Eyebrow label | 12px, uppercase, `0.3em` tracking | same |

### Rules
- Display headings are **tight**: `leading-[0.95]`, `tracking-tight`.
- Headings are sentence case, never Title Case.
- One word per heading may be set in aqua for emphasis (`restored.`, `clean`,
  `difference`) — upright, never italic.
- Eyebrow labels are uppercase with wide tracking; nothing else is uppercase.
- Body copy never goes below 16px on mobile.

---

## 4. Logo

Assets live in `assets/`. All logo artwork is **baked on black**, which is why
it is only ever placed on the dark background.

| Asset | File | Where |
|---|---|---|
| Chrome wordmark | `aquavalet-wordmark.png` | Site header, mobile menu, footer |
| Full lockup (car + wordmark) | `aquavalet-lockup-car.png` | Not currently placed on the homepage — available for other collateral (email signature, socials) |
| AV monogram | `aquavalet-av-icon.png`, `favicon-32/64/192/512.png` | Favicon and social avatars **only** |
| Business card art | `new-logo.png` | Print |
| Social profiles | `instagram-profile-1080.png`, `facebook-profile-1080.png` | Platform uploads |

### Rules
- **The AV monogram is never the site logo.** It is favicon and social avatar
  only. The wordmark carries the brand on the site.
- Logo art is placed with `mix-blend-screen` so its baked black background
  disappears into the page. Critical: never put a CSS stacking context (a
  `z-index`) between the logo and what it must blend with.
- **The logo can only sit on a dark zone.** This is not a preference, it's a
  property of the files: the artwork is light chrome baked onto black. With
  `mix-blend-screen` on white it disappears completely; without the blend it
  is a black rectangle. This is why the header and footer are dark on an
  otherwise white site.
- To place the brand on white, we would need re-cut assets: transparent
  background *and* a dark recolour of the wordmark (light chrome does not read
  on white). Until those exist, dark zones stay.
- Do not recolour, stretch, rotate, or add effects.
- Keep clear space around the wordmark of at least the height of the "A".
- Header wordmark renders at 20px tall (mobile) / 24px (desktop).

---

## 5. Look and feel

- **A white, editorial page with dark cinematic anchors.** The content reads
  as light and clean; the header, hero and footer are dark, which is where the
  premium, filmic quality lives. The contrast between the two is the look —
  it is not an accident, and single stray dark sections in the middle of the
  white run are not allowed.
- **The moving strip** under the hero carries the service names in uppercase
  with the four-point aqua star between each. Same star is used as the bullet
  in checklists.
- **Full-bleed hero video** that scrubs with scroll — dirty car to clean
  reveal — with a portrait clip on phones and a static still for reduced-motion
  or save-data visitors. The reveal is the brand's core promise, shown not told.
- **Generous space.** Sections breathe at `py-16` / `md:py-24`, content is
  capped at 1200–1320px.
- **Soft geometry.** Cards use `rounded-3xl`, buttons are full pills, borders
  are hairline `#162733`.
- **Motion is quiet and meaningful**: 150–300ms transitions, staggered scroll
  reveals, subtle lift on card hover. All motion respects
  `prefers-reduced-motion`.
- **SVG icons only** — never emoji as interface icons.

---

## 6. Voice — a few fixed phrases

- "Cork's premium car valeting and deep clean specialists"
- "Your car, restored."
- "Quoted before you arrive" / "We price on condition, not guesswork"
- Prices: always **"from €…"**, always with "final price depends on the size
  and condition of your vehicle"
- NAP, character-for-character with the Google Business Profile:
  **Aqua Valet, New Park, Centre Park Road, Cork** — open **Wednesday, Friday
  and Saturday, by appointment**
