import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import Star from "./Star";

const POINTS = [
  "Carpets, mats and upholstery shampooed and steam-cleaned, not just vacuumed",
  "Ozone treatment for odours that have settled into the fabric",
  "Machine polish and a protective seal on the paintwork",
];

/**
 * "Professional washing of your car" — layered image pair (the before, and
 * the result) beside the deep-clean explainer. Structure follows
 * vwash-ref-3; styling and copy are ours.
 */
export default function ProfessionalWash() {
  return (
    <section
      id="services"
      aria-label="Professional washing of your car"
      className="bg-bg py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        {/* Layered images */}
        <motion.div {...sectionReveal} className="relative pb-16 md:pb-20">
          <img
            src="images/detail-clean-interior.jpg"
            alt="The cabin of a Range Rover after an Aqua Valet deep clean — spotless leather and trim"
            width={880}
            height={1100}
            loading="lazy"
            className="w-full rounded-3xl object-cover"
          />
          <img
            src="images/detail-dirty-interior.jpg"
            alt="The same style of cabin before cleaning, with ground-in dirt across the mats and console"
            width={560}
            height={467}
            loading="lazy"
            className="absolute bottom-0 right-0 w-1/2 rounded-2xl border-4 border-bg object-cover shadow-[0_18px_40px_rgba(14,42,71,0.18)]"
          />
        </motion.div>

        {/* Copy */}
        <motion.div {...sectionReveal}>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            Deep clean
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Professional washing of your{" "}
            <em className="not-italic text-accent-strong">car</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-primary">
            A deep clean is a full reset of the car, inside and out — four to
            six hours of work by the two of us, not a quick pass with a hoover.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            It's the difference between a car that looks tidy and one that
            feels new again: the ground-in grime, the pet hair, the smell that
            never quite lifted.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-base text-text-primary">
                <Star className="mt-1.5 size-3.5 shrink-0 text-accent-strong" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a
            href="#book"
            className="mt-9 inline-flex min-h-12 items-center rounded-full bg-text-primary px-7 text-base font-medium text-bg ring-2 ring-transparent transition hover:bg-bg hover:text-text-primary hover:ring-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get a photo quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
