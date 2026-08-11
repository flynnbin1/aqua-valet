# Aqua Valet Cork — Premium Homepage Build

## Objective
Build the homepage for Aqua Valet Cork — a premium car valeting and deep-clean specialist repositioning upmarket. The site must feel cinematic, expensive, and art-directed, not like a generic AI template. This is the homepage bones only; further pages come later once this is locked.

## Context
- Client: Aqua Valet Cork, 8 years trading, based at New Park, Centre Park Road, Cork (opposite Marina Market). Open Wednesday, Friday, Saturday only.
- Repositioning: away from cheap €35–60 washes, towards premium deep cleans for BMW/Audi-class owners. Everything on the page should signal "specialist", not "car wash".
- Booking flow: no online checkout, no e-commerce. The conversion action is a WhatsApp photo-quote — customer sends photos of their car, gets a condition-based quote.
- Real before/after photos are coming from the client later. Use clearly named placeholder images for now.

## Stack
React + Vite + TypeScript + Tailwind CSS + GSAP (with ScrollTrigger) + Framer Motion. No other dependencies without asking. No hls.js, no video — the hero uses a scroll-driven image effect instead.

---

## Global Design System

### Fonts
Google Fonts import: Inter (300–700) and Instrument Serif (italic, 400).
- --font-body: 'Inter', sans-serif → Tailwind `font-body`
- --font-display: 'Instrument Serif', serif → Tailwind `font-display` (used italic for display words)

### CSS Custom Properties (HSL values only — Tailwind adds the hsl() wrapper)
```
--bg: 210 20% 4%;        /* near-black with a cold blue cast */
--surface: 210 18% 8%;
--text: 200 20% 96%;
--muted: 205 10% 55%;
--stroke: 210 15% 13%;
--accent: 195 70% 60%;
```

### Tailwind Custom Colors
```
bg: "hsl(var(--bg))",
surface: "hsl(var(--surface))",
"text-primary": "hsl(var(--text))",
muted: "hsl(var(--muted))",
stroke: "hsl(var(--stroke))",
```

### Accent Gradient — "aqua"
`linear-gradient(90deg, #7FD4E8 0%, #2E86C1 100%)` — used on logo ring, hover borders, progress bars, and the scroll-clean progress indicator. CSS utility class `.aqua-gradient`.

### Custom Animations (index.css)
- `@keyframes scroll-down` — translateY(-100%) → translateY(200%), 1.5s ease-in-out infinite
- `@keyframes word-fade-in` — opacity 0 + translateY(8px) → opacity 1 + translateY(0), 0.4s ease-out
- `@keyframes gradient-shift` — background-position 0% 50% → 100% 50% → 0% 50%, 6s ease infinite (animated gradient borders)

### Forced dark theme — no light mode toggle. `body` gets `bg-bg text-text-primary`.

---

## Page Structure

```
{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
<Navbar />
<Hero />
<TrustBar />
<Packages />
<BeforeAfter />
<HowItWorks />
<ServiceAreas />
<Contact / Footer />
```

---

## Section 1: Loading Screen (brief — max 1.8s total)

Full-screen overlay (fixed inset-0 z-[9999] bg-bg). requestAnimationFrame counter 000→100 over 1500ms.
- Top-left: "Aqua Valet" — text-xs text-muted uppercase tracking-[0.3em].
- Center: Rotating words ["Deep Clean", "Detail", "Restore"] cycling every 600ms, AnimatePresence mode="wait", y:20→0→-20. text-4xl md:text-6xl font-display italic text-text-primary/80.
- Bottom-right: counter — font-display tabular-nums, String(count).padStart(3, "0").
- Bottom progress bar: h-[3px] bg-stroke/50, inner .aqua-gradient scaleX(count/100), soft aqua glow shadow.
- On complete: 300ms delay then onComplete. Keep it fast — this is a local service business, not an art portfolio.

## Section 2: Navbar

Fixed, floating pill at top center: inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2. Shadow appears past scrollY 100.
1. Logo: 9×9 circle with aqua gradient border, inner bg-bg circle with "AV" in font-display italic. Scales 110% on hover.
2. Divider (hidden mobile)
3. Nav links: ["Home", "Packages", "Results", "Contact"] — anchor scroll to sections. Active pill styling as per system.
4. Divider
5. "Get a Quote" button with WhatsApp deep link — gradient hover border ring, ↗ arrow.

## Section 3: Hero — Scroll-Clean Effect

Full-viewport, min-h-[200vh] wrapper so the scroll effect has room. The centrepiece: a dirty premium SUV (Range Rover-class) that visibly cleans itself as the user scrolls.

### Implementation
- Two stacked full-bleed images, absolutely positioned: `hero-dirty.jpg` (bottom layer) and `hero-clean.jpg` (top layer). Placeholders for now — same framing, one desaturated/muddy treatment, one glossy. Name them exactly so they're easy to swap.
- GSAP ScrollTrigger with `scrub: true` pinned over the first ~120vh: animate a `clip-path: inset()` wipe (left → right) on the clean layer so the car "wipes clean" with scroll. Add a thin vertical aqua-gradient line at the wipe edge with a subtle glow, like a squeegee edge.
- A small progress indicator bottom-center: "SCROLL TO REVEAL" in text-xs uppercase tracking-[0.2em], with the animated scroll-down line.
- Dark overlay bg-black/30 behind content, bottom fade h-48 bg-gradient-to-t from-bg.

### Hero Content (z-10, centered)
- Eyebrow: "PREMIUM VALETING — CORK" — text-xs text-muted uppercase tracking-[0.3em], class `blur-in`.
- Headline: "Your car, *restored*." — restored in font-display italic. text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight, class `name-reveal`.
- Subline: "Deep-clean specialists for people who care about their car. Eight years in Cork. By appointment only." text-sm md:text-base text-muted max-w-md.
- CTAs (gap-4):
  - "Get a Photo Quote" — solid: bg-text-primary text-bg, hover inverts with aqua gradient ring. Links to WhatsApp with a prefilled message: "Hi Aqua Valet, I'd like a quote — I'll send a few photos of the car."
  - "View Packages" — outlined, gradient hover ring, anchor-scrolls to Packages.
- GSAP entrance timeline, ease "power3.out": `.name-reveal` opacity 0→1 / y 50→0 / 1.2s; `.blur-in` opacity 0→1 / blur(10px)→0 / y 20→0 / stagger 0.1.

## Section 4: Trust Bar

Slim strip under the hero: 3–4 items in a row (stacked on mobile), text-muted, separated by w-px bg-stroke dividers:
- "8 Years in Cork"
- "Opposite Marina Market"
- "★★★★★ Google Reviews" (placeholder count)
- "Wed / Fri / Sat — By Appointment"
Framer Motion whileInView fade-up, viewport once.

## Section 5: Packages

bg-bg py-16 md:py-24. max-w-[1200px] mx-auto px-6 md:px-10.

### Header (same pattern reused across sections)
Framer Motion whileInView — opacity 0→1, y 30→0, 1s, ease [0.25,0.1,0.25,1], once, margin "-100px".
- Eyebrow: w-8 h-px bg-stroke + "Packages" text-xs text-muted uppercase tracking-[0.3em]
- Heading: "Three levels of *clean*" — italic word in font-display italic
- Subtext: "Every car is different. Prices are from-prices — send photos on WhatsApp for an exact quote."

### Cards — grid md:grid-cols-3 gap-6
Each: bg-surface border border-stroke rounded-3xl p-8, hover lifts with aqua gradient border ring.
1. **Essential Clean** — from €150. Short blurb + 4–5 included items as a simple list (checkmark-free, just clean text lines with stroke dividers).
2. **Full Valet** — from €120–150. Tag pill top-right: "Most Popular" with aqua gradient border. Slightly elevated styling (border-white/20).
3. **Deep Clean Reset** — from €200–450. Positioned as the flagship — "for cars that need bringing back".
Every card CTA: "Get exact quote ↗" → WhatsApp link.
MUST always show "from €" — never fixed prices. Condition-based pricing is the model.

## Section 6: Before / After — Results

Header pattern: eyebrow "Results", heading "The *difference*", subtext about real customer cars.
Bento grid — grid-cols-1 md:grid-cols-12 gap-6, spans alternating 7/5/5/7. 4 cards, each a before/after placeholder pair (`result-1-before.jpg` / `result-1-after.jpg` etc.):
- Simple hover crossfade: before image fades to after on hover (and on tap for mobile).
- Corner label pill: "Before → After".
- Card treatment as per system: bg-surface border border-stroke rounded-3xl, image object-cover group-hover:scale-105, subtle halftone overlay (radial-gradient 1px dots at 4×4px, opacity-20, mix-blend-multiply).

## Section 7: How It Works

3 steps, numbered large in font-display italic (01 / 02 / 03), grid md:grid-cols-3:
1. "Send photos" — WhatsApp us a few photos of your car, inside and out.
2. "Get your quote" — we price on condition, not guesswork.
3. "Book your slot" — Wednesday, Friday or Saturday at our Centre Park Road unit.
Each step fades up on scroll with stagger.

## Section 8: Service Areas

Compact strip, not a full section. Text line: "Serving Cork City, Douglas, Blackrock, Rochestown, Mahon & beyond." — muted, small, mostly there for humans; area landing pages come later.

## Section 9: Contact / Footer

pt-16 md:pt-20 pb-8, overflow-hidden.
- GSAP marquee: "BOOKED BY PEOPLE WHO LOVE THEIR CARS • " repeated 10×, xPercent -50, duration 40, ease "none", repeat -1, large font-display italic outline/low-opacity text.
- CTA block: heading "Ready when you are.", WhatsApp button (primary, gradient ring hover) + mailto:info@aquavaletcork.com as secondary text link.
- Footer bar: address (New Park, Centre Park Road, Cork), opening days, Instagram/Facebook placeholder links, green pulsing dot + "Taking bookings".

---

## SEO & Semantics (non-negotiable)
The current live site ranks #1 for "valet cork" — this build must not be an SEO downgrade.
- Proper semantic HTML: one `<h1>` (hero headline), logical h2 per section, real `<nav>`, `<main>`, `<footer>`.
- `<title>` and meta description placeholders clearly marked `<!-- TODO: final SEO copy -->`.
- JSON-LD LocalBusiness schema stub in index.html: name, address, opening days (We/Fr/Sa), geo placeholder, sameAs placeholders.
- All images with descriptive alt text.
- Lazy-load below-fold images; hero images eager with explicit width/height to avoid layout shift.

## Scope
- Work only in: the project src/ directory, index.html, tailwind.config, index.css.
- Do NOT create additional pages or routes — homepage only. react-router can be installed but with a single route.
- Do NOT touch: package-lock beyond what installs require, any deploy config.

## Constraints
- Only make changes directly requested. Do not add features, pages, abstractions, dark/light toggles, contact forms, or CMS scaffolding beyond what is specified.
- No cookie banners, no chat widgets, no auth.
- Placeholder images: generate simple solid/gradient placeholder files or use local dummy images with the exact filenames specified — never hotlink stock URLs.
- Mobile-first responsive. The scroll-clean hero MUST degrade gracefully on mobile: if performance suffers, fall back to a tap-to-reveal or simple crossfade under 768px.

## Acceptance Criteria
- [ ] Site runs locally with zero console errors and zero TypeScript errors
- [ ] Hero scroll-clean effect works smoothly on desktop, with a graceful mobile fallback
- [ ] All three packages show "from €" pricing and link to WhatsApp
- [ ] Loading screen completes in under 2 seconds
- [ ] Layout verified at 375px and 1440px widths
- [ ] LocalBusiness JSON-LD present and valid
- [ ] No section looks like a generic SaaS template — dark, cinematic, intentional

## Stop Conditions
Stop and ask before:
- Adding any dependency not listed in the Stack section
- Deleting any file
- Creating any page or route beyond the homepage
- Changing the build or deploy configuration

## Progress
After each completed section output: ✅ [section name] — [files affected]

Run the project on localhost when done and give me the exact link to access it.
