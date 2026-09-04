import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { site, whyPoints } from "../../lib/site";
import { CtaBand, PageHero, PageShell, PhotoPlaceholder, Section } from "../shell";

/* /about-us/ — KEEP URL (sitemap-plan.md). Old H1 "About Us" kept. The
   8-year story and two-person setup come from the build brief; the
   real-faces photography is a clearly-marked placeholder until the client
   supplies it. No names are used beyond Lou (who appears in the genuine
   reviews and the brief). */
export default function AboutUs({ root }: { root: string }) {
  return (
    <PageShell root={root} path="about-us/">
      <PageHero
        eyebrow="Aqua Valet — Cork"
        title="About Us"
        accentWord="Us"
        intro="Eight years at New Park, Centre Park Road — and still just the two of us, on every single car."
      />

      <Section eyebrow="The story" title="Just the two of us. On purpose." accentWord="two of us">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <p className="text-base leading-relaxed text-muted">
              Aqua Valet has been valeting Cork&rsquo;s cars from the unit on
              Centre Park Road — directly opposite the Marina Market — for
              eight years. No staff, no rushed handovers: the two of us do the
              work on every car that comes through the door.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              That&rsquo;s also why we book fewer cars than we could. A proper
              deep clean takes six or seven hours, and we&rsquo;d rather do a
              handful of cars right than a queue of them quickly. It&rsquo;s
              made us the most reviewed valeting business in Cork — ★{" "}
              {site.rating} from {site.reviewCount} Google reviews.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We open {site.openDays.toLowerCase()}, and every car is assessed
              with you on arrival — so the price reflects the car&rsquo;s
              actual condition, and nothing extra is ever done without your
              approval.
            </p>
          </motion.div>
          <motion.div {...sectionReveal}>
            <PhotoPlaceholder
              label="Lou and the team at the Centre Park Road unit — photography coming from the client."
              className="h-full min-h-72"
            />
          </motion.div>
        </div>
      </Section>

      <Section eyebrow="How we work" title="What that means for your car" accentWord="your car" tone="surface">
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <motion.div
              {...sectionReveal}
              key={point.title}
              className="rounded-3xl border border-stroke bg-bg p-8"
            >
              <h3 className="font-display text-lg font-bold">{point.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{point.copy}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <CtaBand root={root} />
    </PageShell>
  );
}
