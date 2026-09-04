import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import Star from "../../components/Star";
import { BookCta } from "../../components/ServiceMenu";
import Enquiry from "../../components/Enquiry";
import {
  deepCleanReset,
  depositNote,
  fromDisclaimer,
} from "../../lib/site";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

/* /product/deep-clean-valet/ — KEEP URL EXACTLY (sitemap-plan.md). This
   page ranks #1 for "car deep clean cork": the H1 "Deep Clean Valet
   6-7 hrs" stays verbatim; Lou's strap "Our Flagship 6-Hour Full Vehicle
   Reset" leads the content beneath it. All copy, lists and prices on
   this page are Lou's supplied 2026-08 content (src/lib/site.ts →
   deepCleanReset) — real figures, not placeholders. */

// The three FAQ questions Lou wrote answers for. Her answer text hasn't
// been supplied yet — the two answers below are assembled ONLY from lines
// in the agreed spec (the 6-hour/ozone facts and her positioning line);
// the first is a clearly-marked placeholder awaiting her copy.
const FAQS: { q: string; a: string; pending?: boolean }[] = [
  {
    q: "Is this a full valet?",
    a: "Lou's answer to come — copy being supplied.",
    pending: true,
  },
  {
    q: "How long does it take?",
    a: `A full six hours. ${deepCleanReset.ozoneNote}`,
  },
  {
    q: "How do I know if I need one?",
    a: deepCleanReset.positioning,
  },
];

export default function DeepClean({ root }: { root: string }) {
  return (
    <PageShell root={root} path="product/deep-clean-valet/">
      <PageHero
        eyebrow="The flagship — Cork"
        title="Deep Clean Valet 6-7 hrs"
        accentWord="Deep Clean"
        intro={`${deepCleanReset.strap}. From €199 for a car, from €250 for an SUV or jeep, up to €350 for heavy condition or mould.`}
      />

      {/* Lou's positioning line — prominent, verbatim */}
      <section className="bg-surface py-10 md:py-14">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <motion.p
            {...sectionReveal}
            className="font-display mx-auto max-w-3xl text-balance text-center text-xl font-bold leading-relaxed text-text-primary md:text-2xl"
          >
            &ldquo;{deepCleanReset.positioning}&rdquo;
          </motion.p>
        </div>
      </section>

      <Section eyebrow="What's included" title="Exterior and interior, in full" accentWord="in full">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">
              Exterior
            </h3>
            <ul className="mt-4 space-y-2.5">
              {deepCleanReset.exterior.map((item) => (
                <li key={item} className="flex gap-3 text-base text-text-primary">
                  <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...sectionReveal}>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">
              Interior
            </h3>
            <ul className="mt-4 space-y-2.5">
              {deepCleanReset.interior.map((item) => (
                <li key={item} className="flex gap-3 text-base text-text-primary">
                  <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border border-stroke bg-surface p-5 text-sm leading-relaxed text-muted">
              {deepCleanReset.ozoneNote}
            </p>
          </motion.div>
        </div>
      </Section>

      <Section eyebrow="Before & after" title="What bringing a car back looks like" accentWord="back" tone="surface">
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[1, 4].map((n) => (
            <motion.figure {...sectionReveal} key={n} className="overflow-hidden rounded-3xl border border-stroke">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img
                    src={`${root}images/result-${n}-before.jpg`}
                    alt="Car interior before its deep clean"
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-ink-text">
                    Before
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={`${root}images/result-${n}-after.jpg`}
                    alt="The same car interior after its deep clean"
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">
                    After
                  </span>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </Section>

      <Section eyebrow="Pricing" title="Priced on your car's condition" accentWord="condition">
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div {...sectionReveal}>
            <ul className="divide-y divide-stroke rounded-2xl border border-stroke">
              {deepCleanReset.prices.map((r) => (
                <li key={r.label} className="flex items-center justify-between px-5 py-4">
                  <span className="text-base text-muted">{r.label}</span>
                  <span className="font-display text-xl font-extrabold">{r.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{fromDisclaimer}</p>
            <p className="mt-3 rounded-xl border border-stroke bg-surface p-4 text-sm leading-relaxed text-muted">
              {depositNote}
            </p>
            <BookCta root={root} />
          </motion.div>
          <motion.div {...sectionReveal} className="space-y-4">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className={`rounded-2xl border p-6 ${
                  f.pending
                    ? "border-2 border-dashed border-stroke bg-bg"
                    : "border-stroke bg-surface"
                }`}
              >
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${f.pending ? "italic text-muted" : "text-muted"}`}>
                  {f.a}
                </p>
              </div>
            ))}
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
