import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { CtaBand, PageHero, PageShell, PhotoPlaceholder, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /valeting-work/ — KEEP URL (sitemap-plan.md). Old H1 "Recent Car
   Cleaning" kept exactly. The four before/after pairs are the real result
   photos already used on the homepage; the prestige-car examples the plan
   asks for are clearly-marked placeholders until Lou supplies them. */
const PAIRS = [1, 2, 3, 4];

export default function ValetingWork({ root }: { root: string }) {
  return (
    <PageShell root={root} path="valeting-work/">
      <PageHero
        eyebrow="Our work — Cork"
        title="Recent Car Cleaning"
        accentWord="Car Cleaning"
        intro="Real cars from the unit — dragged-back interiors, finished exteriors, and the difference a proper valet makes."
      />

      <Section eyebrow="Before & after" title="The difference, side by side" accentWord="difference">
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PAIRS.map((n) => (
            <motion.figure {...sectionReveal} key={n} className="overflow-hidden rounded-3xl border border-stroke">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img
                    src={`${root}images/result-${n}-before.jpg`}
                    alt="Car before valeting at Aqua Valet Cork"
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
                    alt="The same car after valeting at Aqua Valet Cork"
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
      </Section>

      <Section eyebrow="More to come" title="Prestige cars, coming soon" accentWord="Prestige" tone="surface">
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <PhotoPlaceholder label="BMW / Audi deep-clean examples — photography coming from the client." />
          <PhotoPlaceholder label="More before/after pairs from Lou's photo archive — being selected." />
        </div>
        <motion.p {...sectionReveal} className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
          The heavy transformations here are mostly{" "}
          <a
            href={`${root}product/deep-clean-valet/`}
            className={`font-medium text-accent-strong hover:underline ${FOCUS}`}
          >
            Deep Clean Resets
          </a>{" "}
          — if your car looks like a &ldquo;before&rdquo;, that&rsquo;s the
          page to read next.
        </motion.p>
      </Section>

      <CtaBand root={root} />
    </PageShell>
  );
}
