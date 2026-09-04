import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { CtaBand, PageHero, PageShell, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /services/ — KEEP URL (sitemap-plan.md). The silo that's earning
   rankings. Old H1 "Our Services" kept. */
const SERVICES = (root: string) => [
  {
    title: "Car Valeting",
    href: `${root}services/car-valeting/`,
    copy: "Interior and exterior cleaning at our Centre Park Road depot — the right starting point for most cars.",
    img: `${root}images/detail-clean-interior.jpg`,
    alt: "A deep-cleaned car interior after a full valet",
  },
  {
    title: "Car Wash",
    href: `${root}services/car-wash/`,
    copy: "A professional hand wash with ultra-soft mitts that are gentle on your paintwork.",
    img: `${root}images/result-2-after.jpg`,
    alt: "A freshly hand-washed car exterior",
  },
  {
    title: "Pickup & Mobile Valeting",
    href: `${root}services/pickup-mobile-valeting/`,
    copy: "No time to drop in? We collect your car, valet it, and return it finished.",
    img: `${root}images/result-3-after.jpg`,
    alt: "A valeted car ready for return to its owner",
  },
];

export default function ServicesHub({ root }: { root: string }) {
  return (
    <PageShell root={root} path="services/">
      <PageHero
        eyebrow="Aqua Valet — Cork"
        title="Our Services"
        accentWord="Services"
        intro="Car washing, valeting and deep cleaning at New Park, Centre Park Road — book the service that fits and we'll assess your vehicle on arrival."
      />

      <Section eyebrow="What we do" title="Pick the service, we price the car" accentWord="price">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES(root).map((s) => (
            <motion.a
              {...sectionReveal}
              key={s.title}
              href={s.href}
              className={`group flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(14,42,71,0.13)] ${FOCUS}`}
            >
              <img
                src={s.img}
                alt={s.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-base text-muted">{s.copy}</p>
                <p className="mt-4 font-medium text-accent-strong group-hover:underline">
                  See {s.title.toLowerCase()} →
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="The flagship"
        title="Need more than a valet? The Deep Clean Reset"
        accentWord="Deep Clean Reset"
        tone="surface"
      >
        <motion.div {...sectionReveal} className="mt-6 max-w-3xl">
          <p className="text-base leading-relaxed text-muted">
            Our flagship 6-hour full vehicle reset — steam cleaned, ozone
            treated, exterior decontaminated. From €199 for a car, from €250
            for an SUV or jeep, priced on the car&rsquo;s actual condition.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`${root}product/deep-clean-valet/`}
              className={`inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
            >
              Deep Clean Valet
            </a>
            <a
              href={`${root}packages/`}
              className={`inline-flex min-h-12 items-center rounded-full border border-stroke px-7 text-base font-medium text-text-primary transition-colors hover:border-accent ${FOCUS}`}
            >
              Compare all packages
            </a>
          </div>
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
