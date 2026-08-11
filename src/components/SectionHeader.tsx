import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  subtext?: string;
};

export const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" as const },
};

export default function SectionHeader({
  eyebrow,
  heading,
  subtext,
}: SectionHeaderProps) {
  return (
    <motion.div {...sectionReveal} className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
        <span className="h-px w-8 bg-stroke" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
        {heading}
      </h2>
      {subtext && <p className="mt-4 max-w-xl text-sm text-muted md:text-base">{subtext}</p>}
    </motion.div>
  );
}
