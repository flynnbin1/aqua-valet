import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import Star from "./Star";
import {
  VEHICLE_PRICING,
  cardCaveat,
  site,
  vehicleSizes,
  type VehicleSizeId,
} from "../lib/site";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* ═══════════════════════════════════════════════════════════════════════
   ⚠️  PLACEHOLDER VEHICLE ART — swap for real photography when available.
   ═══════════════════════════════════════════════════════════════════════
   These are generated silhouette icons (scripts/gen-vehicle-icons.mjs +
   the HTML source it renders), not photos — there's no real "small car" /
   "big car" photography yet, only the Range Rover set. Each is a
   transparent PNG, 480×280 source (icon-only, no card background baked
   in), rendered from an original ~240×140 vector.

   RECOMMENDED SIZE FOR REAL PHOTOS: side-profile crop, ~5:3 landscape
   (e.g. 480×280 or 600×360), on a plain/transparent background so it
   drops into the same card treatment below. Keep each under ~40KB.
   To replace: drop the new file in public/images/ and update the src
   below — no other changes needed.
   ═══════════════════════════════════════════════════════════════════════ */
const VEHICLE_ICON: Record<VehicleSizeId, string> = {
  small: "images/vehicle-small.png",
  big: "images/vehicle-big.png",
  suv: "images/vehicle-suv.png",
};

/**
 * "Choose your plan" — vehicle-size tabs that re-price the three packages.
 * Structure from vwash-ref-2's plan block; styling and content ours.
 *
 * Light section: aqua is used as a FILL (tabs, badges, buttons) and
 * accent-strong for anything set as text — see docs/BRAND-GUIDELINES.md.
 *
 * NOTE: the figures come from VEHICLE_PRICING in lib/site.ts and are
 * PLACEHOLDERS — see the banner comment there before quoting anything.
 */
export default function PricingPlans() {
  const [size, setSize] = useState<VehicleSizeId>("small");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving arrow-key navigation across the tabs
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + vehicleSizes.length) % vehicleSizes.length;
    setSize(vehicleSizes[next].id);
    tabRefs.current[next]?.focus();
  };

  const active = vehicleSizes.find((v) => v.id === size)!;

  return (
    <section
      id="pricing"
      aria-label="Choose your plan"
      className="bg-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...sectionReveal} className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            Pricing
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
            Choose your <em className="not-italic text-accent-strong">plan</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Pick your vehicle size to see indicative pricing. Every job is
            quoted from your photos before you arrive.
          </p>
        </motion.div>

        {/* Vehicle size tabs */}
        <motion.div
          {...sectionReveal}
          role="tablist"
          aria-label="Vehicle size"
          className="mt-10 flex items-stretch justify-center gap-3 sm:gap-5"
        >
          {vehicleSizes.map((v, i) => {
            const selected = v.id === size;
            return (
              <button
                key={v.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`tab-${v.id}`}
                aria-selected={selected}
                aria-controls="plan-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setSize(v.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-3 transition-colors sm:px-5 sm:py-4 ${FOCUS} ${
                  selected
                    ? "border-accent bg-accent/10"
                    : "border-stroke hover:border-accent/50"
                }`}
              >
                <img
                  src={VEHICLE_ICON[v.id]}
                  alt=""
                  width={480}
                  height={280}
                  className={`h-12 w-auto transition-opacity sm:h-16 ${
                    selected ? "opacity-100" : "opacity-45"
                  }`}
                />
                <span
                  className={`text-sm transition-colors ${
                    selected ? "font-semibold text-accent-strong" : "text-muted"
                  }`}
                >
                  {v.label}
                </span>
              </button>
            );
          })}
        </motion.div>
        <p className="mt-3 text-center text-sm text-muted">{active.note}</p>

        {/* Package cards */}
        <div
          id="plan-panel"
          role="tabpanel"
          aria-labelledby={`tab-${size}`}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {VEHICLE_PRICING.map((pkg) => (
            <motion.article
              key={pkg.name}
              {...sectionReveal}
              className={`relative flex flex-col rounded-3xl border bg-surface p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,42,71,0.13)] ${
                pkg.popular ? "border-accent/60" : "border-stroke"
              }`}
            >
              {pkg.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
              <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>

              <p className="font-display mt-6 text-3xl font-extrabold">
                <span className="align-top text-base font-bold text-muted">
                  from{" "}
                </span>
                €{pkg.prices[size]}
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-stroke pt-6">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base text-text-primary"
                  >
                    <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted">{cardCaveat}</p>

              <a
                href={site.whatsappHref}
                className={`mt-6 inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full text-base transition-colors ${FOCUS} ${
                  pkg.popular
                    ? "bg-accent font-semibold text-ink hover:bg-accent-light"
                    : "border border-stroke font-medium text-text-primary hover:border-accent"
                }`}
              >
                Get exact quote <span aria-hidden="true">↗</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
