import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import ReviewsCarousel from "../../components/ReviewsCarousel";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /your-feedback/ — marked KEEP in sitemap-plan.md, but the benchmark
   found it 404s on the live site (finding 1) — so this is effectively a
   NEW page and there's no ranking to protect. Reuses the homepage reviews
   carousel (all genuine Google reviews, none invented). */
export default function YourFeedback({ root }: { root: string }) {
  return (
    <PageShell root={root} path="your-feedback/">
      <PageHero
        eyebrow="Reviews — Cork"
        title="Your Feedback"
        accentWord="Feedback"
        intro="Real reviews from Aqua Valet customers on Google — the most reviewed valeting business in Cork."
      />

      {/* Static two-across grid of the ten best genuine reviews — the
          homepage keeps the carousel; this page shows them all at once. */}
      <ReviewsCarousel layout="grid" />

      <Section eyebrow="Been in with us?" title="Leave us a review" accentWord="review" tone="surface">
        <motion.div {...sectionReveal} className="mt-6 max-w-2xl">
          <p className="text-base leading-relaxed text-muted">
            Reviews are how a two-person business competes with the big
            operators — if we&rsquo;ve valeted your car, a quick Google review
            genuinely helps.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Aqua%20Valet%2C%20New%20Park%2C%20Centre%20Park%20Road%2C%20Cork"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
          >
            Review us on Google ↗
          </a>
        </motion.div>
      </Section>

      <CtaBand root={root} />
    </PageShell>
  );
}
