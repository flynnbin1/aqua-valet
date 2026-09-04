import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { MaintenancePlanCards } from "../../components/ServiceMenu";
import Enquiry from "../../components/Enquiry";
import { maintenancePlan } from "../../lib/site";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /packages/essential-clean/ — URL kept live (sitemap-plan.md: nothing
   404s), REPURPOSED as The Maintenance Plan page under the new agreed
   structure (Lou 2026-08). The old "Essential Clean" package this URL was
   built for maps directly onto the new Maintenance Plan concept ("had
   your Deep Clean? Keep it that way"), so the URL keeps its meaning. Not
   a protected old-site URL — the H1 is free to change. */
export default function EssentialClean({ root }: { root: string }) {
  return (
    <PageShell root={root} path="packages/essential-clean/">
      <PageHero
        eyebrow="Packages — Cork"
        title="The Maintenance Plan"
        accentWord="Maintenance"
        intro="Had your Deep Clean? Keep it that way."
      />

      <Section
        eyebrow="Who it's for"
        title="Exclusive to Deep Clean customers"
        accentWord="Exclusive"
      >
        <motion.p
          {...sectionReveal}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted"
        >
          {maintenancePlan.exclusiveNote} A freshly reset car is easy to keep
          that way — these two plans exist so you never need a second Deep
          Clean.{" "}
          <a
            href={`${root}product/deep-clean-valet/`}
            className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
          >
            Not had your Deep Clean Reset yet? Start there →
          </a>
        </motion.p>
        <MaintenancePlanCards root={root} />
      </Section>

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry root={root} />

      <CtaBand root={root} />
    </PageShell>
  );
}
