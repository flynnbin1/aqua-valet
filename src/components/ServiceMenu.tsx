import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import Star from "./Star";
import {
  assessNote,
  bookHref,
  deepCleanReset,
  fromDisclaimer,
  maintenancePlan,
  site,
  twoBucketNote,
  washPackages,
} from "../lib/site";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * The agreed service structure (Lou, 2026-08), shared by the homepage
 * (below the hero) and the /packages/ hub:
 *   1. The Deep Clean Reset — flagship, leads.
 *   2. The Maintenance Plan — exclusive to recent Deep Clean customers.
 *   3. Wash valets — secondary, lower.
 * Prices here are Lou's real figures from src/lib/site.ts (NOT the old
 * placeholders). BOOK NOW routes through bookHref()/BOOKING_URL so the
 * later switch to a real booking link is a one-line change.
 */

/* BOOK NOW primary + assess note + WhatsApp secondary — the standard
   booking block under every service/package. */
export function BookCta({
  root,
  compact = false,
}: {
  root: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mt-6" : "mt-8"}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={bookHref(root)}
          className={`inline-flex min-h-13 items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
        >
          BOOK NOW
        </a>
        <a
          href={site.whatsappHref}
          className={`inline-flex min-h-13 items-center justify-center rounded-full border border-current/25 px-6 py-3 text-sm font-semibold uppercase tracking-wide opacity-90 transition-opacity hover:opacity-100 ${FOCUS}`}
        >
          Not sure what to book? Send us photos
        </a>
      </div>
      <p className={`mt-4 max-w-2xl text-sm leading-relaxed opacity-80`}>
        {assessNote}
      </p>
    </div>
  );
}

const PriceRows = ({
  rows,
}: {
  rows: { label: string; price: string }[];
}) => (
  <ul className="divide-y divide-stroke rounded-2xl border border-stroke">
    {rows.map((r) => (
      <li key={r.label} className="flex items-center justify-between px-5 py-3">
        <span className="text-sm text-muted">{r.label}</span>
        <span className="font-display text-lg font-extrabold">{r.price}</span>
      </li>
    ))}
  </ul>
);

/* Clearly-marked pending-copy block — same convention as the photo
   placeholders; impossible to ship unnoticed. */
const ListPlaceholder = ({ label }: { label: string }) => (
  <div className="rounded-2xl border-2 border-dashed border-stroke bg-bg p-5 text-sm text-muted">
    <span className="font-semibold text-text-primary">Full list to come</span>
    <br />
    {label}
  </div>
);

/* The two Maintenance Plan cards — shared by the homepage/hub ServiceMenu
   and the dedicated Maintenance Plan page (/packages/essential-clean/). */
export function MaintenancePlanCards({ root }: { root: string }) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {maintenancePlan.plans.map((plan) => (
        <motion.article
          {...sectionReveal}
          key={plan.name}
          className="flex flex-col rounded-3xl border border-stroke bg-surface p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-strong">
              {plan.duration}
            </span>
          </div>
          <p className="mt-2 text-base text-muted">{plan.description}</p>
          <div className="mt-5">
            <PriceRows rows={plan.prices} />
          </div>
          {plan.addOn && (
            <p className="mt-4 flex gap-2 text-sm text-text-primary">
              <Star className="mt-1 size-3 shrink-0 text-accent-strong" />
              {plan.addOn}
            </p>
          )}
          {plan.restriction && (
            <p className="mt-4 rounded-xl border border-stroke bg-bg p-4 text-sm leading-relaxed text-muted">
              {plan.restriction}
            </p>
          )}
          <div className="mt-5">
            <ListPlaceholder label={`What's included in the ${plan.name} — Lou is sending the final list.`} />
          </div>
          <p className="mt-4 text-sm text-muted">{fromDisclaimer}</p>
          <div className="mt-auto">
            <BookCta root={root} compact />
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function ServiceMenu({ root = "" }: { root?: string }) {
  return (
    <section id="pricing" aria-label="Our services and pricing" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* ── 1. Flagship — The Deep Clean Reset ─────────────────────── */}
        <motion.div {...sectionReveal} className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            The flagship
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
            The <em className="not-italic text-accent-strong">Deep Clean</em>{" "}
            Reset
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {deepCleanReset.strap} — {deepCleanReset.positioning}
          </p>
        </motion.div>

        <motion.div
          {...sectionReveal}
          className="mx-auto mt-10 max-w-3xl rounded-3xl border border-accent/60 bg-surface p-8 md:p-10"
        >
          <PriceRows rows={deepCleanReset.prices} />
          <p className="mt-4 text-sm text-muted">{fromDisclaimer}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`${root}product/deep-clean-valet/`}
              className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
            >
              Everything that&rsquo;s included →
            </a>
          </div>
          <BookCta root={root} compact />
        </motion.div>

        {/* ── 2. The Maintenance Plan ────────────────────────────────── */}
        <motion.div {...sectionReveal} className="mt-20 text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            The Maintenance Plan
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-4 text-balance text-2xl font-extrabold tracking-tight md:text-4xl">
            Had your Deep Clean?{" "}
            <em className="not-italic text-accent-strong">Keep it that way.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold uppercase tracking-wide text-accent-strong">
            {maintenancePlan.exclusiveNote}
          </p>
        </motion.div>

        <MaintenancePlanCards root={root} />

        {/* ── 3. Wash valets — secondary ─────────────────────────────── */}
        <motion.div {...sectionReveal} className="mt-20">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            Our wash services
          </p>
          <h2 className="font-display mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">
            Wash <em className="not-italic text-accent-strong">valets</em>
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {washPackages.map((wash) => (
            <motion.article
              {...sectionReveal}
              key={wash.name}
              className="flex flex-col rounded-3xl border border-stroke bg-bg p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-bold">{wash.name}</h3>
                <span className="font-display shrink-0 text-xl font-extrabold">
                  {wash.price}
                </span>
              </div>
              {wash.includes.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {wash.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-text-primary">
                      <Star className="mt-1 size-3 shrink-0 text-accent-strong" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted">{wash.note}</p>
              <p className="mt-3 text-sm text-muted">{fromDisclaimer}</p>
              <div className="mt-auto">
                <BookCta root={root} compact />
              </div>
            </motion.article>
          ))}
        </div>
        <motion.p
          {...sectionReveal}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-muted"
        >
          {twoBucketNote}
        </motion.p>
      </div>
    </section>
  );
}
