import { motion } from "framer-motion";
import { site } from "../lib/site";

const ITEMS = [
  "8 Years in Cork",
  "Opposite Marina Market",
  `★★★★★ ${site.rating} · ${site.reviewCount} Google Reviews`,
  site.openDays,
];

export default function TrustBar() {
  return (
    <motion.section
      aria-label="Why Aqua Valet"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="border-y border-stroke bg-surface/40"
    >
      <ul className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-3 px-6 py-6 text-sm text-muted md:flex-row md:gap-0">
        {ITEMS.map((item, i) => (
          <li key={item} className="flex items-center">
            {i > 0 && (
              <span
                className="mx-6 hidden h-4 w-px bg-stroke md:block"
                aria-hidden="true"
              />
            )}
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
