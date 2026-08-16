import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import { site } from "../lib/site";

// Real Google reviews. None needed trimming — all already end on a natural
// sentence within a couple of lines. Individual star ratings aren't exposed
// by the source, so each card shows 5 — every quote here reads as a 5-star
// review; update the `rating` field per-card if a source ever gives less.
const REVIEWS = [
  {
    name: "Frank Brennan",
    rating: 5,
    quote:
      "I had a bad milk spill in my car and brought it to Aqua Valet. They were very helpful and informative. They did a great job — the smell has been eliminated. I heartily recommend their service and I will be back.",
  },
  {
    name: "Catherine Gaudino",
    rating: 5,
    quote:
      "Fantastic job on my car. It looks like new — better than when I bought it. Really impressed with the attention to detail and the staff were very friendly. Will definitely use again!",
  },
  {
    name: "Camilla Monroe",
    rating: 5,
    quote:
      "Well worth the price. Car came back looking like new, which isn't easy with kids, dogs and beach trips. By far the best valeting job I've paid for.",
  },
  {
    name: "Barry McCarthy",
    rating: 5,
    quote:
      "I brought my car in for a deep clean — it was really dirty and had developed a bad smell. The team did an incredible job, it came back looking and smelling like new.",
  },
  {
    name: "Timothy Bowen",
    rating: 5,
    quote:
      "We had both our cars in with Aqua Valet. Top class service and a brilliant finish on both. One is light, one is dark — really reflective. Will be booking again.",
  },
  {
    name: "John Tynan",
    rating: 5,
    quote:
      "Really pleased with the outcome. Just bought the car and the previous owner must have had a dog. Really nice feel and scent to the car now. Would recommend.",
  },
  {
    name: "Jeanne O'Hare",
    rating: 5,
    quote:
      "Got my car back after the pick up and drop off service and I'm so impressed. With 2 small kids, 2 white shepherds and a fisherman husband, our Hilux was in dire need of a deep clean. The level of care was fantastic.",
  },
  {
    name: "Shauna Nolan",
    rating: 5,
    quote:
      "Couldn't recommend these guys enough. The job they did is impeccable and meticulous. My car flooded over the weekend and they were very accommodating fitting me in. The car is like a showroom.",
  },
  {
    name: "Ciara Curling",
    rating: 5,
    quote:
      "5 star service from Lou and the team at Aqua Valet. My car is sparkling. Thanks so much for the help today Lou, looking forward to bringing my car back again.",
  },
  {
    name: "Elaine O'Brien",
    rating: 5,
    quote:
      "Such a thorough job on my Audi which was quite dirty and full of dog hair! It was like a new car when we picked it up.",
  },
  {
    name: "Donal Ryan",
    rating: 5,
    quote:
      "Was selling my car and they did a fantastic job, completely bringing it to that like-new look and smell. Incredibly happy and the car sold straight away. Highly recommend.",
  },
  {
    name: "Terry Mckenzie",
    rating: 5,
    quote:
      "My Skoda was in a bad way and I didn't have much hope for the alloys or seats. The people looking after me were great, and the results were brilliant.",
  },
];

// A single well-formed star path (Heroicons "star", solid), reused filled
// or as an outline — crisper and better-aligned than relying on the
// system font's ★/☆ glyphs, which render inconsistently across platforms.
const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z";

const StarRow = ({
  count,
  half = false,
  className = "size-4",
}: {
  count: number;
  /** Render the star after the last full one as a half-filled star. */
  half?: boolean;
  className?: string;
}) => (
  <span className="inline-flex gap-0.5" aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) =>
      half && i === count ? (
        <svg key={i} viewBox="0 0 20 20" className={className}>
          <defs>
            <linearGradient id="star-half-fill" x1="0" x2="1" y1="0" y2="0">
              <stop
                offset="50%"
                style={{ stopColor: "hsl(var(--accent-strong))" }}
              />
              <stop offset="50%" style={{ stopColor: "hsl(var(--stroke))" }} />
            </linearGradient>
          </defs>
          <path d={STAR_PATH} fill="url(#star-half-fill)" />
        </svg>
      ) : (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={i < count ? `${className} fill-accent-strong` : `${className} fill-stroke`}
        >
          <path d={STAR_PATH} />
        </svg>
      ),
    )}
  </span>
);

// The official Google "G" mark — signals these are genuine Google reviews
// rather than site-collected testimonials.
const GoogleG = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 18 18" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
    />
  </svg>
);

// Large decorative quote mark behind each review — a quiet premium
// testimonial cue, not competing with the text (low opacity, sits behind).
const QuoteMark = () => (
  <svg
    viewBox="0 0 32 24"
    className="absolute right-6 top-6 size-10 fill-accent-strong/10"
    aria-hidden="true"
  >
    <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 4.4C9.2 5.6 7.2 8.4 6.8 12H14V24H0Zm18 0V14.4C18 6.4 22.8 1.2 30.8 0l1.6 4.4c-5.2 1.2-7.2 4-7.6 7.6H32V24H18Z" />
  </svg>
);

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// The one testimonial card design, shared by the homepage carousel and the
// /your-feedback/ grid — extra classes (snap/sizing) come from the caller.
type Review = { name: string; rating: number; quote: string };
const ReviewCard = ({
  review,
  className = "",
}: {
  review: Review;
  className?: string;
}) => (
  <article
    className={`relative flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface p-8 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_rgba(14,42,71,0.13)] ${className}`}
  >
    <QuoteMark />
    <StarRow count={review.rating} />
    <p className="relative mt-4 flex-1 text-base leading-relaxed text-text-primary">
      &ldquo;{review.quote}&rdquo;
    </p>
    <div className="mt-6 flex items-center gap-2">
      <p className="text-sm font-medium text-muted">{review.name}</p>
      <GoogleG className="size-3.5" />
    </div>
  </article>
);

// The ten strongest genuine reviews for the /your-feedback/ grid — eight
// from the Google set above plus two carried over from the old site's
// testimonials (see docs/site-content-draft.ts). All real; none invented.
const BEST_REVIEWS: Review[] = [
  ...REVIEWS.filter((r) =>
    [
      "Frank Brennan",
      "Catherine Gaudino",
      "Jeanne O'Hare",
      "Shauna Nolan",
      "Camilla Monroe",
      "Barry McCarthy",
      "Donal Ryan",
      "Elaine O'Brien",
    ].includes(r.name),
  ),
  {
    name: "Carol O'Regan",
    rating: 5,
    quote:
      "My car came back spotless inside and out — like new. Very competitive prices and they do a pick up and delivery if you don't have time to drop it off. I would highly recommend Aqua Valet to anyone.",
  },
  {
    name: "Suzanne Hastings",
    rating: 5,
    quote:
      "The attention to detail is excellent and great value for money. Lou, who came to collect, was extremely professional. I will definitely be going back and would not hesitate to recommend this service to friends.",
  },
];

/**
 * Elegant testimonial carousel — one card visible on phones, two on tablet
 * and up. Native horizontal scroll-snap drives both swipe and the arrow
 * buttons, so touch, trackpad and keyboard (focus the track, use ←/→) all
 * work without any drag-gesture logic to maintain.
 *
 * layout="grid" (the /your-feedback/ page) swaps the slider for a static
 * two-across grid of the ten best genuine reviews — same heading, badge
 * and card design, no controls.
 *
 * Light section (white, like Pricing/Enquiry): placing this dark would sit
 * it directly between white Enquiry and the dark footer, recreating the
 * dark-into-dark seam already fixed once. Aqua text here uses
 * --accent-strong for contrast on white — see docs/BRAND-GUIDELINES.md.
 */
export default function ReviewsCarousel({
  layout = "carousel",
}: {
  layout?: "carousel" | "grid";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setProgress(0);
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    const pct = (el.scrollLeft / max) * 100;
    setProgress(pct);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      id="reviews"
      aria-label="Reviews"
      className="bg-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...sectionReveal} className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            Reviews
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
            The most reviewed valeter in{" "}
            <em className="not-italic text-accent-strong">Cork</em>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Real reviews from Aqua Valet customers on Google.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-stroke bg-surface py-2 pl-4 pr-5 shadow-[0_1px_2px_rgba(14,42,71,0.06)]">
            <GoogleG />
            <span className="h-5 w-px bg-stroke" aria-hidden="true" />
            <StarRow count={4} half className="size-4" />
            <span className="text-muted">
              · {site.reviewCount} Google reviews
            </span>
          </div>
        </motion.div>

        {layout === "grid" ? (
          <motion.div
            {...sectionReveal}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {BEST_REVIEWS.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </motion.div>
        ) : (
        <motion.div {...sectionReveal} className="mt-12">
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            tabIndex={0}
            onScroll={updateEdges}
            className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth rounded-3xl ${FOCUS}`}
          >
            {REVIEWS.map((review) => (
              <ReviewCard
                key={review.name}
                review={review}
                className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)]"
              />
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
              className={`grid size-11 shrink-0 place-items-center rounded-full border border-accent/50 text-accent-strong transition-colors hover:border-accent hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-strong ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>

            <div className="h-0.5 w-24 overflow-hidden rounded-full bg-stroke sm:w-40">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-300"
                style={{ width: `${Math.max(8, progress)}%` }}
              />
            </div>

            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={atEnd}
              aria-label="Next reviews"
              className={`grid size-11 shrink-0 place-items-center rounded-full border border-accent/50 text-accent-strong transition-colors hover:border-accent hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-strong ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
