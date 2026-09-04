import { motion } from "framer-motion";
import { sectionReveal } from "../../components/SectionHeader";
import { site } from "../../lib/site";
import { CtaBand, PageHero, PageShell, Section } from "../shell";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* /contact/ — KEEP URL (sitemap-plan.md). Old H1 "Contact" kept. NAP
   matches the GBP character-for-character (CLAUDE.md rule 5); hours are
   Wed/Fri/Sat only — the old page's "Monday to Saturday" was wrong
   (benchmark finding 7). Map is a live Google Maps embed of the address. */
export default function Contact({ root }: { root: string }) {
  return (
    <PageShell root={root} path="contact/">
      <PageHero
        eyebrow="Aqua Valet — Cork"
        title="Contact"
        accentWord="Contact"
        intro="New Park, Centre Park Road — directly opposite the Marina Market, a few minutes from Páirc Uí Chaoimh."
      />

      <Section eyebrow="Find us" title="The unit on Centre Park Road" accentWord="Centre Park Road">
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div {...sectionReveal}>
            <address className="space-y-1 text-base not-italic text-text-primary">
              <p className="font-display text-lg font-bold">{site.name}</p>
              {site.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  Opening days
                </dt>
                <dd className="mt-1 text-base text-text-primary">{site.openDays}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.phoneHref}
                    className={`rounded text-base font-medium text-accent-strong hover:underline ${FOCUS}`}
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className={`rounded text-base font-medium text-accent-strong hover:underline ${FOCUS}`}
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`${root}book-now/`}
                className={`inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
              >
                Book Now
              </a>
              <a
                href={site.whatsappHref}
                className={`inline-flex min-h-12 items-center rounded-full border border-stroke px-7 text-base font-medium text-text-primary transition-colors hover:border-accent ${FOCUS}`}
              >
                WhatsApp us
              </a>
            </div>
          </motion.div>
          <motion.div {...sectionReveal}>
            <iframe
              title="Map — Aqua Valet, New Park, Centre Park Road, Cork"
              src="https://www.google.com/maps?q=Aqua%20Valet%2C%20New%20Park%2C%20Centre%20Park%20Road%2C%20Cork&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-96 w-full rounded-3xl border border-stroke"
            />
          </motion.div>
        </div>
      </Section>

      <CtaBand root={root} />
    </PageShell>
  );
}
