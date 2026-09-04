import { bookHref, site } from "../lib/site";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * The single closing CTA before the footer. Full-bleed photo (a clean Range
 * Rover, badging softened per HERO-VIDEO-SPEC.md's branding rule) with a
 * dark scrim for legibility. This replaced an earlier marquee+lockup
 * version — see git history / memory notes if that treatment is wanted
 * back; this is deliberately the ONE closing CTA now, not an addition.
 *
 * The primary action is Book Now (via bookHref/BOOKING_URL, same as the
 * header) — the photo route lives in the enquiry section above as the
 * secondary "not sure?" path.
 */
export default function FinalCta() {
  return (
    <section
      aria-label="Book your car in"
      className="relative isolate flex min-h-[26rem] items-center overflow-hidden bg-ink py-24 text-ink-text md:min-h-[32rem] md:py-32"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet="images/cta-banner.jpg" />
        <img
          src="images/cta-banner-mobile.jpg"
          alt="A gleaming black Range Rover in the Aqua Valet studio"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {/* Dark scrim for legibility — uniform tint plus a bottom-weighted
          gradient so the buttons always sit on the darkest part. */}
      <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 text-center md:px-10">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          Ready when you <em className="not-italic text-accent">are</em>.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-ink-muted">
          Book the service you think fits — we&rsquo;ll assess your vehicle on
          arrival and advise if a different one suits better.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={bookHref("")}
            className={`inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
          >
            Book Now
          </a>
          {/* Mobile only — a phone is already in hand, so a direct call is
              often faster than scrolling back up to the form. */}
          <a
            href={site.phoneHref}
            className={`inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-ink-stroke px-8 text-base font-medium text-ink-text transition-colors hover:border-accent sm:hidden ${FOCUS}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
            </svg>
            Call now
          </a>
        </div>
      </div>
    </section>
  );
}
