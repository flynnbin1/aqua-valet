import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import Star from "../../components/Star";
import { VEHICLE_PRICING, cardCaveat } from "../../lib/site";
import { CtaBand, PageHero, PageShell, PriceTable, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /services/car-valeting/ — KEEP URL, ranks for the core term
   (sitemap-plan.md). Old H1 "Car Valeting" kept exactly; content
   strengthened and linked forward to the Full Valet package per the plan.
   Prices shown are the Full Valet placeholders from VEHICLE_PRICING. */
const fullValet = VEHICLE_PRICING[1];

export default function CarValeting({ root }: { root: string }) {
  return (
    <PageShell root={root} path="services/car-valeting/">
      <PageHero
        eyebrow="Services — Cork"
        title="Car Valeting"
        accentWord="Valeting"
        intro="Interior and exterior cleaning, done properly by the two of us at our depot on New Park, Centre Park Road — just outside the city."
      />

      <Section eyebrow="What's included" title="Inside and out, done properly" accentWord="properly">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <ul className="space-y-3">
              {fullValet.includes.map((item) => (
                <li key={item} className="flex gap-3 text-base text-text-primary">
                  <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex gap-3 text-base text-text-primary">
                <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                <span>Glass inside &amp; out, door shuts &amp; sills</span>
              </li>
              <li className="flex gap-3 text-base text-text-primary">
                <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                <span>Tyre &amp; trim dressing</span>
              </li>
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted">
              A valet here isn&rsquo;t a quick wash with the hoover run round —
              it&rsquo;s a proper interior and exterior clean, quoted from your
              photos so the price matches the car&rsquo;s condition, not a
              one-size menu.
            </p>
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

      <Section eyebrow="Pricing" title="Full Valet pricing" accentWord="pricing" tone="surface">
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div {...sectionReveal}>
            <PriceTable prices={fullValet.prices} />
            <p className="mt-4 text-sm text-muted">{cardCaveat}</p>
          </motion.div>
          <motion.div {...sectionReveal} className="rounded-3xl border border-stroke bg-bg p-8">
            <h3 className="font-display text-xl font-bold">
              This is our Full Valet package
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              The full breakdown of what&rsquo;s included — and how it compares
              to the Essential Clean and the Deep Clean Reset — lives on the
              package page.
            </p>
            <a
              href={`${root}packages/full-valet/`}
              className={`mt-6 inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
            >
              See the Full Valet package
            </a>
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
