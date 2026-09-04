import { useState } from "react";
import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import Star from "./Star";
import { bookHref } from "../lib/site";

// Same locked-off studio frame at both ends of the hero film, so the car's
// body lines carry straight across the divider.
const BEFORE = "hero/hero-scrub-poster-start.jpg";
const AFTER = "hero/hero-scrub-poster.jpg";

const PROOF = [
  "The same car, the same six-hour reset",
  "Wheels, arches and sills, not just the panels",
  "Interior steam-cleaned and deodorised to match",
];

/**
 * Before/after reveal slider. Layout follows vwash-ref-2's process block
 * (copy panel one side, visual the other); the visual is a draggable
 * comparison instead of a static car.
 *
 * The control is a real <input type="range"> laid over the image, so drag,
 * touch and keyboard (arrow keys) all work and screen readers announce it
 * as a slider.
 */
export default function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <section
      aria-label="Before and after a deep clean"
      className="bg-ink py-16 text-ink-text md:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-14 md:px-10">
        {/* Copy */}
        <motion.div {...sectionReveal} className="md:col-span-5">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
            <span className="h-px w-8 bg-ink-stroke" aria-hidden="true" />
            The proof
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Drag it. That&rsquo;s the{" "}
            <em className="not-italic text-accent">difference</em>.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            One car, one deep clean. Slide the handle to see what six hours of
            proper work actually looks like — and why we quote on condition
            rather than guessing from a menu.
          </p>

          <ul className="mt-8 space-y-3">
            {PROOF.map((point) => (
              <li key={point} className="flex gap-3 text-base text-ink-text">
                <Star className="mt-1.5 size-3.5 shrink-0 text-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a
            href={bookHref("")}
            className="mt-9 inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book Now
          </a>
        </motion.div>

        {/* Slider */}
        <motion.div {...sectionReveal} className="md:col-span-7">
          <div className="relative select-none overflow-hidden rounded-3xl border border-ink-stroke">
            {/* AFTER sits underneath, full width */}
            <img
              src={AFTER}
              alt="The same Range Rover after an Aqua Valet deep clean — paintwork gleaming, wheels spotless"
              width={1536}
              height={854}
              loading="lazy"
              className="block w-full"
            />
            {/* BEFORE clipped to the handle position */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              aria-hidden="true"
            >
              <img
                src={BEFORE}
                alt=""
                width={1536}
                height={854}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>

            {/* Corner labels */}
            <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-ink/70 px-3 py-1 text-xs uppercase tracking-[0.15em] text-ink-text backdrop-blur-sm">
              Before
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-accent/40 bg-ink/70 px-3 py-1 text-xs uppercase tracking-[0.15em] text-accent backdrop-blur-sm">
              After
            </span>

            {/* Divider + handle (visual only; the range input drives it) */}
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-ink shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
                </svg>
              </span>
            </div>

            {/* The actual control */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Reveal the car before or after its deep clean"
              className="ba-range absolute inset-0 h-full w-full cursor-ew-resize bg-transparent opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </div>
          <p className="mt-4 text-center text-sm text-ink-muted md:hidden">
            Drag the handle to compare
          </p>
        </motion.div>
      </div>
    </section>
  );
}
