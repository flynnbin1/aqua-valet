import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import Star from "../../components/Star";
import { CtaBand, PageHero, PageShell, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /services/car-wash/ — KEEP URL, held for the "car wash cork" ranking
   (sitemap-plan.md). Old H1 "Looking for Car Wash in Cork?" kept exactly.
   Deliberately de-emphasised in the nav; the page steers up to valeting
   and the deep clean. No wash price is stated anywhere — no price for it
   exists in the placeholder data and inventing one is forbidden. */
export default function CarWash({ root }: { root: string }) {
  return (
    <PageShell root={root} path="services/car-wash/">
      <PageHero
        eyebrow="Services — Cork"
        title="Looking for Car Wash in Cork?"
        accentWord="Car Wash"
        intro="A professional hand wash at New Park, Centre Park Road — ultra-soft mitts, gentle on your paintwork, and a proper dry-off before you're handed back the keys."
      />

      <Section eyebrow="Why hand wash" title="Kind to paintwork, hard on grime" accentWord="paintwork">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <ul className="space-y-3">
              {[
                "Hand wash with ultra-soft wash mitts — no brushes, no swirl marks",
                "Wheels, arches and door shuts included",
                "Hand dried, glass finished",
                "Regular washing helps hold your car's value",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-base text-text-primary">
                  <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted">
              A wash keeps a clean car clean. If the inside needs attention too
              — or the car hasn&rsquo;t been touched in a while — a valet or
              deep clean is the better-value starting point, and we&rsquo;ll
              tell you honestly which one your photos call for.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`${root}services/car-valeting/`}
                className={`inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
              >
                Car Valeting
              </a>
              <a
                href={`${root}product/deep-clean-valet/`}
                className={`inline-flex min-h-12 items-center rounded-full border border-stroke px-7 text-base font-medium text-text-primary transition-colors hover:border-accent ${FOCUS}`}
              >
                The Deep Clean Reset
              </a>
            </div>
          </motion.div>
          <motion.div {...sectionReveal}>
            <img
              src={`${root}images/result-2-after.jpg`}
              alt="A hand-washed car finished at Aqua Valet Cork"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl border border-stroke object-cover"
            />
          </motion.div>
        </div>
      </Section>

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry />

      <CtaBand root={root} />
    </PageShell>
  );
}
