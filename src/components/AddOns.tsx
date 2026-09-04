import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";

/**
 * Add-ons grid. Layout from vwash-ref-4's "Why Choose Us" block: centred
 * label + heading, then cards with a circular icon badge beside a title and
 * a single supporting line. Styling and copy ours.
 *
 * Icons are stroked line drawings sharing one weight (1.6) so the set reads
 * as a family — see docs/BRAND-GUIDELINES.md on icon consistency.
 */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PawIcon = () => (
  <svg {...iconProps} className="size-6">
    <circle cx="7" cy="9.5" r="1.9" />
    <circle cx="11.4" cy="6.6" r="1.9" />
    <circle cx="16.2" cy="7.6" r="1.9" />
    <circle cx="19" cy="11.6" r="1.7" />
    <path d="M12.4 12.4c2.6 0 4.8 1.9 4.8 4.3 0 1.9-1.5 3.1-3.4 3.1-1 0-1.5-.3-2.4-.3s-1.4.3-2.4.3c-1.9 0-3.4-1.2-3.4-3.1 0-2.4 2.2-4.3 4.8-4.3Z" />
  </svg>
);

const DropletIcon = () => (
  <svg {...iconProps} className="size-6">
    <path d="M11.5 3.8s5.3 5.7 5.3 9.2a5.3 5.3 0 1 1-10.6 0c0-3.5 5.3-9.2 5.3-9.2Z" />
    <path d="M9.2 13.6c0 1.7 1.1 2.9 2.5 3.2" />
    <path d="M19.5 4v2.6M18.2 5.3h2.6" />
  </svg>
);

const SteamIcon = () => (
  <svg {...iconProps} className="size-6">
    <path d="M7 18.5c0-2.6 2-2.6 2-5.2S7 10.7 7 8.1" />
    <path d="M12 19.5c0-2.9 2-2.9 2-5.7s-2-2.8-2-5.7" />
    <path d="M17 18.5c0-2.6 2-2.6 2-5.2s-2-2.6-2-5.2" />
    <path d="M4.5 4.6h15" />
  </svg>
);

const SeatIcon = () => (
  <svg {...iconProps} className="size-6">
    <path d="M8.6 3.8h4.6a3 3 0 0 1 3 3v8.4H8.6z" />
    <path d="M6.4 15.2h11.2a2.5 2.5 0 0 1 2.5 2.5v2.1H8.9a2.5 2.5 0 0 1-2.5-2.5z" />
    <path d="M11 7.2v4.4" />
  </svg>
);

// The agreed add-on list (Lou 2026-08) — exactly these four. Prices only
// where she gave one; the rest are priced on condition, never invented.
const ADD_ONS = [
  {
    title: "Pet & Dog Hair Removal",
    copy: "Every last hair lifted out of the carpets, boot and upholstery. From-priced on the car's condition.",
    Icon: PawIcon,
  },
  {
    title: "Stain & Odour Removal",
    copy: "Spills and smells treated at the source rather than masked over.",
    Icon: DropletIcon,
  },
  {
    title: "Leather Clean & Condition — €60",
    copy: "Cleaned, fed and protected so the seats stay supple, not cracked.",
    Icon: SeatIcon,
  },
  {
    title: "Ozone / Mould Treatment",
    copy: "Deep sanitising that reaches where a cloth and hoover cannot.",
    Icon: SteamIcon,
  },
];

export default function AddOns() {
  return (
    <section
      id="add-ons"
      aria-label="Add-ons"
      className="bg-ink py-16 text-ink-text md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...sectionReveal} className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
            <span className="h-px w-8 bg-ink-stroke" aria-hidden="true" />
            Extra services
            <span className="h-px w-8 bg-ink-stroke" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Add-<em className="not-italic text-accent">ons</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted">
            Extras that attach to any package above. Mention what you need when
            you send your photos and we&rsquo;ll price it in. All prices are
            offered From. Final Price may vary depending on the Size &amp;
            Condition of each vehicle.
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADD_ONS.map(({ title, copy, Icon }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex gap-4 rounded-2xl border border-ink-stroke bg-ink-surface p-6 transition-colors hover:border-accent/50"
            >
              <span
                className="grid size-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"
                aria-hidden="true"
              >
                <Icon />
              </span>
              <div>
                <h3 className="font-display text-base font-bold leading-snug">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {copy}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
