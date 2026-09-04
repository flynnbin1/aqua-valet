import type { ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sectionReveal } from "../components/SectionHeader";
import { bookHref, site } from "../lib/site";

/* Shared shell + section primitives for the Wave 1 subpages
   (sitemap-plan.md). Same design system as the homepage: white page,
   ink dark bands, aqua as FILL / accent-strong as text (see
   docs/BRAND-GUIDELINES.md), Montserrat, sectionReveal motion. Subpages
   scroll natively — the Lenis glide is a hero-pin-only behaviour and the
   pinned hero lives on the homepage. */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function PageShell({
  root,
  path,
  children,
}: {
  /** Relative prefix back to the site root, e.g. "" | "../" | "../../" */
  root: string;
  /** Site-root-relative URL of this page, e.g. "services/car-valeting/" */
  path: string;
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar root={root} currentPath={path} />
      <main>{children}</main>
      <Footer root={root} />
    </MotionConfig>
  );
}

/* Dark ink hero band — sits under the fixed header (pt clears it). The h1
   is the page's ONLY h1 (CLAUDE.md rule 6). */
export function PageHero({
  eyebrow,
  title,
  accentWord,
  intro,
}: {
  eyebrow: string;
  title: string;
  /** Optional word within `title` to set in accent — must appear in title. */
  accentWord?: string;
  intro?: string;
}) {
  const heading =
    accentWord && title.includes(accentWord) ? (
      <>
        {title.slice(0, title.indexOf(accentWord))}
        <em className="not-italic text-accent">{accentWord}</em>
        {title.slice(title.indexOf(accentWord) + accentWord.length)}
      </>
    ) : (
      title
    );
  return (
    <section className="bg-ink pb-16 pt-40 text-ink-text md:pb-20 md:pt-48">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...sectionReveal}>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
            <span className="h-px w-8 bg-ink-stroke" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {heading}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* Standard light content section with the homepage's eyebrow/heading motif. */
export function Section({
  eyebrow,
  title,
  accentWord,
  children,
  tone = "light",
}: {
  eyebrow?: string;
  title?: string;
  accentWord?: string;
  children: ReactNode;
  tone?: "light" | "surface";
}) {
  const heading =
    title && accentWord && title.includes(accentWord) ? (
      <>
        {title.slice(0, title.indexOf(accentWord))}
        <em className="not-italic text-accent-strong">{accentWord}</em>
        {title.slice(title.indexOf(accentWord) + accentWord.length)}
      </>
    ) : (
      title
    );
  return (
    <section
      className={`${tone === "surface" ? "bg-surface" : "bg-bg"} py-14 md:py-20`}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {(eyebrow || title) && (
          <motion.div {...sectionReveal} className="max-w-3xl">
            {eyebrow && (
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
                <span className="h-px w-8 bg-stroke" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display mt-4 text-balance text-2xl font-extrabold tracking-tight md:text-4xl">
                {heading}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

/* Closing CTA band — Book Now first, phone fallback. Same Range Rover
   background + scrim treatment as the homepage's FinalCta so the
   pre-footer banner reads identically sitewide. */
export function CtaBand({ root }: { root: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-ink-text md:py-20">
      <picture>
        <source media="(min-width: 768px)" srcSet={`${root}images/cta-banner.jpg`} />
        <img
          src={`${root}images/cta-banner-mobile.jpg`}
          alt="A gleaming black Range Rover in the Aqua Valet studio"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {/* Dark scrim for legibility — uniform tint plus a bottom-weighted
          gradient so the buttons always sit on the darkest part. */}
      <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <motion.div {...sectionReveal}>
          <h2 className="font-display text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
            Ready to <em className="not-italic text-accent">book</em> your car
            in?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted">
            Book the service you think fits — we&rsquo;ll assess your vehicle
            on arrival and advise if a different one suits better.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={bookHref(root)}
              className={`inline-flex min-h-13 items-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
            >
              Book Now
            </a>
            <a
              href={site.phoneHref}
              className={`inline-flex min-h-13 items-center rounded-full border border-white/25 px-8 py-3.5 text-base font-medium text-ink-text transition-colors hover:border-accent ${FOCUS}`}
            >
              Call {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-sm text-ink-muted">{site.openDays}.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* Clearly-marked placeholder media block — used wherever real photography
   hasn't been supplied yet. Deliberately obvious so it can't ship unnoticed. */
export function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-48 items-center justify-center rounded-2xl border-2 border-dashed border-stroke bg-surface p-6 text-center ${className}`}
    >
      <p className="max-w-xs text-sm text-muted">
        <span className="font-semibold text-text-primary">Photo to come</span>
        <br />
        {label}
      </p>
    </div>
  );
}

/* ⚠️ Placeholder prices — figures come straight from VEHICLE_PRICING in
   src/lib/site.ts, which is itself under a loud PLACEHOLDER banner. Do not
   quote these to customers; swap the values there and every page updates. */
export function PriceTable({
  prices,
}: {
  prices: { small: number; big: number; suv: number };
}) {
  const rows = [
    { label: "Small car", note: "Hatchbacks, superminis", price: prices.small },
    { label: "Big car", note: "Saloons, estates", price: prices.big },
    { label: "SUV & jeep", note: "4x4s and crossovers", price: prices.suv },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke">
      <table className="w-full text-left">
        <caption className="sr-only">Indicative prices by vehicle size</caption>
        <thead>
          <tr className="border-b border-stroke bg-surface text-sm text-muted">
            <th scope="col" className="px-5 py-3 font-medium">
              Vehicle size
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              Indicative price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-stroke last:border-0">
              <td className="px-5 py-4">
                <p className="font-medium text-text-primary">{r.label}</p>
                <p className="text-sm text-muted">{r.note}</p>
              </td>
              <td className="px-5 py-4 text-right">
                <span className="text-sm text-muted">from </span>
                <span className="font-display text-xl font-extrabold">
                  €{r.price}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
