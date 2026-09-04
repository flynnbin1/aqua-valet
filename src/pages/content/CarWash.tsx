import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import Star from "../../components/Star";
import { BookCta } from "../../components/ServiceMenu";
import Enquiry from "../../components/Enquiry";
import { fromDisclaimer, twoBucketNote, washPackages } from "../../lib/site";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /services/car-wash/ — KEEP URL, held for the "car wash cork" ranking
   (sitemap-plan.md). Old H1 "Looking for Car Wash in Cork?" kept exactly.
   Now the home of the two wash valets from the new agreed structure
   (Lou 2026-08) — her prices, lists and notes verbatim from
   src/lib/site.ts → washPackages. */
export default function CarWash({ root }: { root: string }) {
  return (
    <PageShell root={root} path="services/car-wash/">
      <PageHero
        eyebrow="Our wash services — Cork"
        title="Looking for Car Wash in Cork?"
        accentWord="Car Wash"
        intro="Two wash valets, hand washed the proper way at New Park, Centre Park Road — and if the inside needs attention too, the Deep Clean Reset is where to look."
      />

      <Section eyebrow="Wash valets" title="Pick the wash that fits" accentWord="fits">
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {washPackages.map((wash) => (
            <motion.article
              {...sectionReveal}
              key={wash.name}
              className="flex flex-col rounded-3xl border border-stroke bg-surface p-8"
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
                    <li key={item} className="flex gap-3 text-base text-text-primary">
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
        <motion.p {...sectionReveal} className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          {twoBucketNote}
        </motion.p>
        <motion.p {...sectionReveal} className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
          A wash keeps a clean car clean. If the car hasn&rsquo;t been touched
          in a while — inside or out — start with{" "}
          <a
            href={`${root}product/deep-clean-valet/`}
            className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
          >
            the Deep Clean Reset
          </a>{" "}
          instead, then keep it that way on{" "}
          <a
            href={`${root}packages/essential-clean/`}
            className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
          >
            the Maintenance Plan
          </a>
          .
        </motion.p>
      </Section>

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry root={root} />

      <CtaBand root={root} />
    </PageShell>
  );
}
