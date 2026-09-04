import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import Star from "../../components/Star";
import { cardCaveat } from "../../lib/site";
import { CtaBand, PageHero, PageShell, PriceTable, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* Shared layout for the two NEW package pages (sitemap-plan.md):
   /packages/essential-clean/ and /packages/full-valet/. Prices are the
   VEHICLE_PRICING placeholders passed in by each page — see the banner
   comment in src/lib/site.ts before quoting anything. */
export default function PackagePage({
  root,
  path,
  eyebrow,
  title,
  accentWord,
  intro,
  story,
  includes,
  prices,
  crossLinks,
}: {
  root: string;
  path: string;
  eyebrow: string;
  title: string;
  accentWord: string;
  intro: string;
  story: string[];
  includes: string[];
  prices: { small: number; big: number; suv: number };
  crossLinks: { label: string; href: string; primary?: boolean }[];
}) {
  return (
    <PageShell root={root} path={path}>
      <PageHero eyebrow={eyebrow} title={title} accentWord={accentWord} intro={intro} />

      <Section eyebrow="What's included" title="Everything in the package" accentWord="package">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex gap-3 text-base text-text-primary">
                  <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...sectionReveal}>
            {story.map((p) => (
              <p key={p.slice(0, 32)} className="mt-4 text-base leading-relaxed text-muted first:mt-0">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section eyebrow="Pricing" title="Priced by size, quoted on condition" accentWord="condition" tone="surface">
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div {...sectionReveal}>
            <PriceTable prices={prices} />
            <p className="mt-4 text-sm text-muted">{cardCaveat}</p>
          </motion.div>
          <motion.div {...sectionReveal} className="rounded-3xl border border-stroke bg-bg p-8">
            <h3 className="font-display text-xl font-bold">Not sure it's the right tier?</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Send the photos anyway — we look at the actual car and tell you
              honestly which package it needs. No upselling a deep clean to a
              car that only needs a valet.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {crossLinks.map((l) => (
                <a
                  key={l.href}
                  href={`${root}${l.href}`}
                  className={
                    l.primary
                      ? `inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`
                      : `inline-flex min-h-12 items-center rounded-full border border-stroke px-7 text-base font-medium text-text-primary transition-colors hover:border-accent ${FOCUS}`
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry root={root} />

      <CtaBand root={root} />
    </PageShell>
  );
}
