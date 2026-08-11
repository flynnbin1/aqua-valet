import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const STEPS = [
  {
    number: "01",
    title: "Send photos",
    copy: "WhatsApp us a few photos of your car, inside and out.",
  },
  {
    number: "02",
    title: "Get your quote",
    copy: "We price on condition, not guesswork.",
  },
  {
    number: "03",
    title: "Book your slot",
    copy: "Wednesday, Friday or Saturday at our Centre Park Road unit.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-label="How it works" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <SectionHeader
          eyebrow="How it works"
          heading={
            <>
              Quoted before you <em className="not-italic text-accent-strong">arrive</em>
            </>
          }
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p
                className="font-display text-6xl font-extrabold text-text-primary/25 md:text-7xl"
                aria-hidden="true"
              >
                {step.number}
              </p>
              <h3 className="font-display mt-4 text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {step.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
