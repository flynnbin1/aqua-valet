import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { CtaBand, PageHero, PageShell, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

/* /services/pickup-mobile-valeting/ — KEEP URL (sitemap-plan.md), the
   premium differentiator. Old H1 "Mobile Valeting for Pickup and Drop off"
   kept exactly. Areas named (Douglas, Wilton, Blackpool) come from the old
   page's own meta description — not invented. */
const STEPS = [
  {
    n: "1",
    title: "Book your collection",
    copy: "Send your details and photos, get your quote, and agree a pickup time on WhatsApp.",
  },
  {
    n: "2",
    title: "We collect your car",
    copy: "One of us drives out, collects the car, and brings it back to the depot on Centre Park Road.",
  },
  {
    n: "3",
    title: "Returned finished",
    copy: "The car comes back to your door valeted — you get on with your day.",
  },
];

export default function PickupMobile({ root }: { root: string }) {
  return (
    <PageShell root={root} path="services/pickup-mobile-valeting/">
      <PageHero
        eyebrow="Services — Cork"
        title="Mobile Valeting for Pickup and Drop off"
        accentWord="Pickup and Drop off"
        intro="Whether you're in Douglas, Wilton or Blackpool, we collect your car, valet it at the depot, and return it finished — so your day carries on uninterrupted."
      />

      <Section eyebrow="How it works" title="Collection in three steps" accentWord="three steps">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <motion.div
              {...sectionReveal}
              key={step.n}
              className="rounded-3xl border border-stroke bg-surface p-8"
            >
              <span
                className="font-display grid size-10 place-items-center rounded-full border border-accent/40 text-base font-bold text-accent-strong"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <h3 className="font-display mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{step.copy}</p>
            </motion.div>
          ))}
        </div>
        <motion.p {...sectionReveal} className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
          Collection and drop-off covers Cork city and the near suburbs. It
          pairs with any package — most collection customers are booking the
          Deep Clean Reset or a Maintenance Clean. Ask about collection when
          you send your photos and we&rsquo;ll confirm your area and time.
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
