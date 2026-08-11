import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import { faqs, site } from "../lib/site";

/**
 * The human story and the FAQ, side by side. The FAQ is laid out in full —
 * no accordion — because these four answers do the customer-qualifying work
 * (photos first, condition pricing, deep-clean expectations).
 */
export default function StoryFaq() {
  return (
    <section
      aria-label="About Aqua Valet and common questions"
      className="border-t border-stroke bg-surface/40 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <motion.div {...sectionReveal} className="md:col-span-5">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            About
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
            Just the <em className="not-italic text-accent-strong">two</em> of us.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              Aqua Valet is a husband-and-wife team, eight years at the same
              unit on Centre Park Road, opposite the Marina Market. No staff,
              no rush jobs — every car that comes in gets both of us.
            </p>
            <p>
              That's why we only take a handful of cars a day, three days a
              week, and why we quote from photos before you arrive. Fewer
              cars, done properly, is the whole point.
            </p>
            <p className="text-text-primary">{site.openDays}.</p>
          </div>
        </motion.div>

        <div className="md:col-span-7">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <dt className="font-display text-lg font-bold text-text-primary">
                  {faq.q}
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-muted">
                  {faq.a}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
