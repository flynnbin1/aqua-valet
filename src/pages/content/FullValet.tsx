import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { BookCta } from "../../components/ServiceMenu";
import Enquiry from "../../components/Enquiry";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /packages/full-valet/ — URL kept live (nothing 404s) but the Full Valet
   package is SUPERSEDED by the new agreed structure (Lou 2026-08). This
   page now points visitors at whichever new service fits, rather than
   selling a package that no longer exists. Not a protected old-site URL. */
const ROUTES = (root: string) => [
  {
    title: "The Deep Clean Reset",
    copy: "The flagship 6-hour full vehicle reset — where every car starts.",
    href: `${root}product/deep-clean-valet/`,
  },
  {
    title: "The Maintenance Plan",
    copy: "Had your Deep Clean? The Maintenance Clean and Express Valet keep it that way.",
    href: `${root}packages/essential-clean/`,
  },
  {
    title: "Wash valets",
    copy: "The Maintenance Wash and our hand wash, wax, towel dry & tyre shine.",
    href: `${root}services/car-wash/`,
  },
];

export default function FullValet({ root }: { root: string }) {
  return (
    <PageShell root={root} path="packages/full-valet/">
      <PageHero
        eyebrow="Packages — Cork"
        title="Full Valet"
        accentWord="Full"
        intro="Our packages have a new shape — the Full Valet's work now lives across the Deep Clean Reset and the Maintenance Plan, priced honestly on your car's size and condition."
      />

      <Section eyebrow="Find your service" title="Which one is your car?" accentWord="your car">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ROUTES(root).map((r) => (
            <motion.a
              {...sectionReveal}
              key={r.title}
              href={r.href}
              className={`group flex flex-col rounded-3xl border border-stroke bg-surface p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,42,71,0.13)] ${FOCUS}`}
            >
              <h3 className="font-display text-xl font-bold">{r.title}</h3>
              <p className="mt-2 flex-1 text-base text-muted">{r.copy}</p>
              <p className="mt-4 font-medium text-accent-strong group-hover:underline">
                See the details →
              </p>
            </motion.a>
          ))}
        </div>
        <motion.div {...sectionReveal}>
          <BookCta root={root} />
        </motion.div>
      </Section>

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry root={root} />

      <CtaBand root={root} />
    </PageShell>
  );
}
