import { useEffect, useRef } from "react";
import gsap from "gsap";
import Star from "./Star";

const SERVICES = [
  "Car Valeting",
  "Deep Clean Reset",
  "Interior Detailing",
  "Pet Hair Removal",
  "Pickup & Drop-off",
];

/**
 * Slow horizontal marquee of service names under the hero (structure from
 * vwash-ref-2). Static row when the user prefers reduced motion.
 */
export default function ServicesMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 55,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const row = Array.from({ length: 4 }, () => SERVICES).flat();

  return (
    <aside
      aria-label="Our services"
      className="overflow-hidden border-b border-stroke bg-surface/40"
    >
      {/* Screen-reader friendly static list */}
      <p className="sr-only">{SERVICES.join(", ")}</p>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap py-4"
      >
        <div ref={trackRef} className="inline-block">
          {[0, 1].map((half) => (
            <span key={half} className="inline-block">
              {row.map((service, i) => (
                <span
                  key={`${half}-${i}`}
                  className="text-sm uppercase tracking-[0.25em] text-text-primary"
                >
                  <span className="mx-7">{service}</span>
                  <Star className="size-3 text-accent" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
