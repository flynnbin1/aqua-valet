import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { BookCta } from "../../components/ServiceMenu";
import Enquiry from "../../components/Enquiry";
import { deepCleanReset, maintenancePlan } from "../../lib/site";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /services/car-valeting/ — KEEP URL, ranks for the core term
   (sitemap-plan.md). Old H1 "Car Valeting" kept exactly. Updated to the
   new agreed structure (Lou 2026-08): valeting here starts with the Deep
   Clean Reset and is kept up on the Maintenance Plan — the old Full Valet
   package framing is gone. */
export default function CarValeting({ root }: { root: string }) {
  return (
    <PageShell root={root} path="services/car-valeting/">
      <PageHero
        eyebrow="Services — Cork"
        title="Car Valeting"
        accentWord="Valeting"
        intro="Interior and exterior cleaning, done properly by the two of us at our depot on New Park, Centre Park Road — just outside the city."
      />

      <Section eyebrow="How valeting works here" title="Reset first, then maintain" accentWord="Reset">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <p className="text-base leading-relaxed text-muted">
              A valet here isn&rsquo;t a quick wash with the hoover run round.
              Every car starts with{" "}
              <a
                href={`${root}product/deep-clean-valet/`}
                className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
              >
                the Deep Clean Reset
              </a>{" "}
              — {deepCleanReset.strap.toLowerCase()}, from €199 — so the
              interior and exterior are genuinely brought back, not skimmed
              over.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Once it&rsquo;s reset,{" "}
              <a
                href={`${root}packages/essential-clean/`}
                className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
              >
                the Maintenance Plan
              </a>{" "}
              keeps it that way — the Maintenance Clean from €100 and, for
              cars we maintain, the 45–60 minute Express Valet.{" "}
              {maintenancePlan.exclusiveNote}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Exterior only?{" "}
              <a
                href={`${root}services/car-wash/`}
                className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
              >
                Our wash valets
              </a>{" "}
              cover everything from a maintenance decontamination wash to a
              hand wash, wax and tyre shine.
            </p>
            <motion.div {...sectionReveal}>
              <BookCta root={root} />
            </motion.div>
          </motion.div>
          <motion.div {...sectionReveal}>
            <img
              src={`${root}images/detail-clean-interior.jpg`}
              alt="A car interior after a full valet at Aqua Valet Cork"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl border border-stroke object-cover"
            />
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
