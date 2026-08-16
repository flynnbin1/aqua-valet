import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import Star from "../../components/Star";
import { VEHICLE_PRICING, cardCaveat, faqs } from "../../lib/site";
import { CtaBand, PageHero, PageShell, PriceTable, Section } from "../shell";
import Enquiry from "../../components/Enquiry";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /product/deep-clean-valet/ — KEEP URL EXACTLY (sitemap-plan.md). This
   page already ranks #1 for "car deep clean cork". Old H1 "Deep Clean
   Valet 6-7 hrs" kept verbatim; content upgraded around it. Prices are
   the VEHICLE_PRICING placeholders; the €200–€450 condition band comes
   from the build brief. */
const deepClean = VEHICLE_PRICING[2];

const PAGE_FAQS = faqs.filter((f) =>
  ["How long does a deep clean take?", "Do you remove dog hair?", "Why do you ask for photos first?"].includes(f.q),
);

export default function DeepClean({ root }: { root: string }) {
  return (
    <PageShell root={root} path="product/deep-clean-valet/">
      <PageHero
        eyebrow="The flagship — Cork"
        title="Deep Clean Valet 6-7 hrs"
        accentWord="Deep Clean"
        intro="Our specialty: a full-day reset for cars that need bringing back. Steam and ozone treatment, pet hair and stain removal, priced on the car's actual condition — from €200, up to €450 for a heavily soiled 7-seater."
      />

      <Section eyebrow="What's included" title="A reset, not a valet" accentWord="reset">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <ul className="space-y-3">
              {[
                ...deepClean.includes,
                "Pet hair & stain removal",
                "Interior detailing — dash, console & trim",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-base text-text-primary">
                  <Star className="mt-1.5 size-3 shrink-0 text-accent-strong" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...sectionReveal}>
            <p className="text-base leading-relaxed text-muted">
              A deep clean here is a six-to-seven hour job, and we only take a
              couple of them a day — deliberately. Both of us work on every
              car, and the ozone and steam stages can&rsquo;t be rushed
              without cutting corners.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              It&rsquo;s the right call for cars that have gone years without
              proper attention: ingrained grime, pet hair through the carpets,
              odours that a normal valet won&rsquo;t shift. That&rsquo;s also
              why it&rsquo;s priced on condition — a lightly-lived-in saloon
              and a heavily soiled 7-seater are not the same job.
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
        <motion.p {...sectionReveal} className="mt-6 text-sm text-muted">
          Real cars from the unit — more in{" "}
          <a href={`${root}valeting-work/`} className={`font-medium text-accent-strong hover:underline ${FOCUS}`}>
            our recent work
          </a>
          .
        </motion.p>
      </Section>

      <Section eyebrow="Pricing" title="Priced on condition, quoted from photos" accentWord="condition">
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div {...sectionReveal}>
            <PriceTable prices={deepClean.prices} />
            <p className="mt-4 text-sm text-muted">
              {cardCaveat} Heavily soiled interiors run higher — up to €450 for
              a 7-seater in a bad way. Your photos set the exact price before
              you commit to anything.
            </p>
          </motion.div>
          <motion.div {...sectionReveal} className="space-y-4">
            {PAGE_FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-stroke bg-surface p-6">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
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
