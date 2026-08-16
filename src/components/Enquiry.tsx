import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { sectionReveal } from "./SectionHeader";
import { lastValeted, site } from "../lib/site";
import { WhatsAppGlyph } from "./icons";

/* ═══════════════════════════════════════════════════════════════════════
   ⚠️  TODO — ENQUIRY WEBHOOK NOT WIRED YET
   ═══════════════════════════════════════════════════════════════════════
   Paste the automation endpoint here and the form will POST to it as JSON:

     { name, phone, vehicle, lastValeted, source: "website-enquiry" }

   While this is empty the form still validates and shows the success state,
   so the page is fully testable — it just doesn't send anywhere.

   This form must NEVER take payment or run a checkout. It exists only to
   capture a lead and hand over to the WhatsApp photo-quote flow.
   ═══════════════════════════════════════════════════════════════════════ */
const ENQUIRY_WEBHOOK_URL = "";

const STEPS = [
  {
    n: "1",
    title: "Fill in the form",
    copy: "Your name, number and what you drive — about thirty seconds.",
  },
  {
    n: "2",
    title: "We WhatsApp you for photos",
    copy: "We'll ask for 3–4 photos or a quick video of the car as it looks now. No tidying up first.",
  },
  {
    n: "3",
    title: "You get an exact quote",
    copy: "Priced on the car's actual condition, so you know exactly what it'll cost before you drive over.",
  },
];

// The two cards below are dark "ink" zone brand cards sitting on the
// otherwise white section — matching the header/footer/hero dark tokens,
// not a plain black. Aqua is a FILL on the button, plain text-accent for
// anything set as text on these dark cards — see docs/BRAND-GUIDELINES.md.
const FIELD =
  "mt-2 min-h-12 w-full rounded-xl border border-ink-stroke bg-ink px-4 text-base text-ink-text placeholder:text-ink-muted/70 focus:border-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const LABEL = "text-sm font-medium text-ink-text";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Enquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setError("We just need your name and a phone number to get back to you.");
      const firstInvalid = form.querySelector<HTMLInputElement>(":invalid");
      firstInvalid?.focus();
      return;
    }
    setError(null);
    setStatus("sending");

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      vehicle: String(data.get("vehicle") ?? ""),
      lastValeted: String(data.get("lastValeted") ?? ""),
      source: "website-enquiry",
    };

    try {
      if (ENQUIRY_WEBHOOK_URL) {
        await fetch(ENQUIRY_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setStatus("sent");
    } catch {
      // Never strand the customer: point them at WhatsApp instead.
      setStatus("idle");
      setError(
        "That didn't send — message us on WhatsApp and we'll pick it up straight away.",
      );
    }
  };

  return (
    <section
      id="book"
      aria-label="Get a photo quote"
      className="bg-bg py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div {...sectionReveal} className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
            Get a quote
            <span className="h-px w-8 bg-stroke" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
            Quoted before you{" "}
            <em className="not-italic text-accent-strong">arrive</em>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Send us a few details, we&rsquo;ll WhatsApp you to grab a few photos
            of your car, and you get an accurate price back. No payment, no
            checkout.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* PRIMARY — WhatsApp */}
          <motion.div {...sectionReveal} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-3xl border border-ink-stroke bg-ink p-8 text-ink-text">
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                Fastest way
              </p>
              <h3 className="font-display mt-3 text-2xl font-extrabold leading-tight md:text-3xl">
                Message us on WhatsApp
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Straight through to us. Send the photos there and then, and
                we&rsquo;ll come back with a price.
              </p>

              <p className="mt-4 text-sm text-ink-muted">
                Or call{" "}
                <a
                  href={site.phoneHref}
                  className={`rounded font-medium text-ink-text underline-offset-4 hover:underline ${FOCUS}`}
                >
                  {site.phoneDisplay}
                </a>{" "}
                — {site.openDays}.
              </p>

              {/* How it works */}
              <ol className="mt-8 space-y-5 border-t border-ink-stroke pt-8">
                {STEPS.map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span
                      className="font-display grid size-8 shrink-0 place-items-center rounded-full border border-accent/40 text-sm font-bold text-accent"
                      aria-hidden="true"
                    >
                      {step.n}
                    </span>
                    <div>
                      <h4 className="font-display text-base font-bold">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* ALTERNATIVE — short form. id anchors the quote CTAs directly to
              the form card (not the section top) so a scroll-to-form lands
              on the fields even on mobile, where this card stacks BELOW the
              WhatsApp card. */}
          <motion.div {...sectionReveal} id="enquiry-form" className="scroll-mt-32 lg:col-span-7">
            <div className="h-full rounded-3xl border border-ink-stroke bg-ink p-8 text-ink-text md:p-10">
              {status === "sent" ? (
                <div
                  aria-live="polite"
                  className="flex h-full flex-col items-center justify-center py-10 text-center"
                >
                  <span
                    className="grid size-14 place-items-center rounded-full bg-accent/15 text-accent"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m4.5 12.5 5 5 10-11" />
                    </svg>
                  </span>
                  <p className="font-display mt-6 text-2xl font-extrabold">
                    Thanks — talk soon.
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted">
                    You&rsquo;ll get a WhatsApp from us shortly asking for 3–4
                    photos of your car so we can give you an accurate quote.
                  </p>
                  <a
                    href={site.whatsappHref}
                    className={`mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full border border-ink-stroke px-6 text-base font-medium text-ink-text transition-colors hover:border-accent ${FOCUS}`}
                  >
                    <WhatsAppGlyph className="size-5" />
                    Message us now instead
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold">
                    Rather type it out?
                  </h3>
                  <p className="mt-2 text-base text-ink-muted">
                    Leave your details and we&rsquo;ll start the WhatsApp from
                    our end.
                  </p>

                  <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-7">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="enq-name" className={LABEL}>
                          Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="enq-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Your name"
                          className={FIELD}
                        />
                      </div>
                      <div>
                        <label htmlFor="enq-phone" className={LABEL}>
                          Phone <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="enq-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="083 123 4567"
                          className={FIELD}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="enq-vehicle" className={LABEL}>
                          Car make &amp; model
                        </label>
                        <input
                          id="enq-vehicle"
                          name="vehicle"
                          type="text"
                          placeholder="e.g. BMW 3 Series, or just “7-seater”"
                          className={FIELD}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="enq-last" className={LABEL}>
                          When was it last valeted?
                        </label>
                        <select id="enq-last" name="lastValeted" className={FIELD}>
                          {lastValeted.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="mt-5 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-base text-ink-text"
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={`mt-7 min-h-14 w-full rounded-full bg-ink-text px-8 text-base font-semibold text-ink transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS}`}
                    >
                      {status === "sending"
                        ? "Sending…"
                        : "Request my photo quote"}
                    </button>
                    <p className="mt-4 text-center text-sm text-ink-muted">
                      No payment and no checkout — this just starts the
                      conversation.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
