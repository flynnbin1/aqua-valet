import { site } from "../lib/site";
import wordmark from "../../assets/aquavalet-wordmark.png";

// Real Wave 1 pages (sitemap-plan.md URLs), site-root-relative — prefixed
// with the page's `root` at render time so they resolve from any depth.
const QUICK_LINKS = [
  { label: "Packages", href: "packages/" },
  { label: "Services", href: "services/" },
  { label: "Book", href: "book-now/" },
  { label: "Our Work", href: "valeting-work/" },
  { label: "Reviews", href: "your-feedback/" },
  { label: "About", href: "about-us/" },
  { label: "Contact", href: "contact/" },
];

// Interior detailing and pet hair removal don't get their own pages until
// Wave 2 — both live on the Deep Clean Reset page for now.
const FOOTER_SERVICES = [
  { label: "Car Valeting", href: "services/car-valeting/" },
  { label: "Car Wash", href: "services/car-wash/" },
  { label: "Deep Clean Reset", href: "product/deep-clean-valet/" },
  { label: "Pet Hair Removal", href: "product/deep-clean-valet/" },
  { label: "Pickup & Drop-off", href: "services/pickup-mobile-valeting/" },
];

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const LINK = `text-sm text-ink-text/85 transition-colors hover:text-accent rounded ${FOCUS}`;
const HEADING = "text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted";

const FacebookIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.8 1.8-1.8H16.5V3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.6H7v3.5h2.5V21h4z" />
  </svg>
);

const InstagramIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const ICON_BUTTON =
  `grid size-10 place-items-center rounded-full border border-ink-stroke text-ink-muted transition-colors hover:border-accent hover:text-accent ${FOCUS}`;

export default function Footer({ root = "" }: { root?: string }) {
  return (
    <footer id="contact" className="bg-ink text-ink-text">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-10">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <a
              href={root === "" ? "#home" : root}
              aria-label="AquaValet — home"
              className={`inline-block rounded ${FOCUS}`}
            >
              <img
                src={wordmark}
                alt="AquaValet"
                width={1260}
                height={160}
                className="h-7 w-auto mix-blend-screen"
              />
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className={HEADING}>Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={`${root}${link.href}`} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className={HEADING}>Services</h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((link) => (
                <li key={link.label}>
                  <a href={`${root}${link.href}`} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className={HEADING}>Contact</h3>
            <address className="mt-5 space-y-2 text-sm not-italic text-ink-text/85">
              <p>{site.name}</p>
              <p>{site.addressLines.join(", ")}</p>
              <p className="text-ink-muted">{site.openDays}</p>
              <p>
                <a href={site.phoneHref} className={LINK}>
                  {site.phoneDisplay}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Social icons */}
        <div className="mt-14 flex items-center gap-3">
          <a
            href={site.facebook}
            aria-label="Aqua Valet on Facebook"
            className={ICON_BUTTON}
          >
            <FacebookIcon />
          </a>
          {/* TODO: real Instagram URL — site.instagram in lib/site.ts is
              still a placeholder ("#") until Lou supplies the handle. */}
          <a
            href={site.instagram}
            aria-label="Aqua Valet on Instagram"
            className={ICON_BUTTON}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-stroke">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-ink-muted sm:flex-row md:px-10">
          <p>© Aqua Valet {new Date().getFullYear()}. All rights reserved.</p>
          <p>
            Site by{" "}
            <a
              href="https://flowdagency.ai"
              className={`text-ink-muted underline-offset-4 hover:text-ink-text hover:underline rounded ${FOCUS}`}
            >
              Flowd Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
