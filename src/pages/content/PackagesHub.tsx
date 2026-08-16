import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import PricingPlans from "../../components/PricingPlans";
import { addOns } from "../../lib/site";
import { CtaBand, PageHero, PageShell, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /packages/ — NEW URL (sitemap-plan.md). Three tiers + add-ons; prices
   are the VEHICLE_PRICING placeholders rendered by PricingPlans (see the
   banner comment in src/lib/site.ts — NOT final figures). */
const TIERS = (root: string) => [
  {
    name: "Essential Clean",
    tagline: "The maintenance valet",
    href: `${root}packages/essential-clean/`,
    copy: "The 4–5 week return clean that keeps a deep-cleaned car showroom-fresh.",
  },
  {
    name: "Full Valet",
    tagline: "Most popular",
    href: `${root}packages/full-valet/`,
    copy: "Inside and out, done properly — the right starting point for most cars.",
  },
  {
    name: "The Deep Clean Reset",
    tagline: "The flagship",
    href: `${root}product/deep-clean-valet/`,
    copy: "A full 6–7 hour reset with steam and ozone treatment, for cars that need bringing back.",
  },
];

export default function PackagesHub({ root }: { root: string }) {
  return (
    <PageShell root={root} path="packages/">
      <PageHero
        eyebrow="Packages — Cork"
        title="Valeting Packages"
        accentWord="Packages"
        intro="Three tiers, honestly priced on your car's size and condition — and every job quoted from your photos before you arrive."
      />

      {/* Same size-toggle pricing block as the homepage — placeholder
          prices. The enquiry form now lives on this page too, so the quote
          buttons use the default on-page #enquiry-form anchor. */}
      <PricingPlans root={root} />

      <Section eyebrow="The three tiers" title="Which one is your car?" accentWord="your car" tone="surface">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TIERS(root).map((tier) => (
            <motion.a
              {...sectionReveal}
              key={tier.name}
              href={tier.href}
              className={`group flex flex-col rounded-3xl border border-stroke bg-bg p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,42,71,0.13)] ${FOCUS}`}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-accent-strong">
                {tier.tagline}
              </p>
              <h3 className="font-display mt-3 text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 flex-1 text-base text-muted">{tier.copy}</p>
              <p className="mt-4 font-medium text-accent-strong group-hover:underline">
                See the package →
              </p>
            </motion.a>
          ))}
        </div>
        <motion.p {...sectionReveal} className="mt-8 text-base text-muted">
          {addOns}
        </motion.p>
      </Section>

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry />

      <CtaBand root={root} />
    </PageShell>
  );
}
