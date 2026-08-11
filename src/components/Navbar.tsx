import { useEffect, useState } from "react";
import { site } from "../lib/site";
import wordmark from "../../assets/aquavalet-wordmark.png";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Book", href: "#book" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Full-width header per the vwash-ref-2 structure (structure only):
 * a thin info strip (hours | address + phone) above the main bar with
 * logo left, nav centre, phone + solid WhatsApp CTA right.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Info strip — aqua band */}
      <div className="bg-accent">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-2 text-xs text-ink sm:px-6 md:text-sm lg:px-10">
          <p className="whitespace-nowrap font-medium">{site.openDays}</p>
          <p className="flex items-center gap-3 whitespace-nowrap font-medium">
            <span className="hidden sm:inline">Centre Park Road, Cork City</span>
            <span className="hidden sm:inline text-ink/40" aria-hidden="true">
              |
            </span>
            <a
              href={site.phoneHref}
              className={`rounded transition-opacity hover:opacity-70 ${FOCUS}`}
            >
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b border-ink-stroke bg-black transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10"
        >
          {/* Logo left */}
          <a
            href="#home"
            aria-label="AquaValet — home"
            className={`flex min-h-11 shrink-0 items-center rounded ${FOCUS}`}
          >
            <img
              src={wordmark}
              alt="AquaValet"
              width={1260}
              height={160}
              className="h-5 w-auto mix-blend-screen md:h-6"
            />
          </a>

          {/* Nav centre */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors hover:text-accent-strong ${FOCUS} ${
                    active === link.href
                      ? "bg-white/10 text-ink-text"
                      : "text-ink-text"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Phone + CTA right */}
          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={`hidden items-center gap-2 rounded text-sm text-ink-text transition-colors hover:text-accent lg:flex ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
              </svg>
              {site.phoneDisplay}
            </a>
            <a
              href="#book"
              className={`hidden min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent-light sm:flex ${FOCUS}`}
            >
              Get a Photo Quote
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={`grid size-11 place-items-center rounded-full text-ink-text transition-colors hover:bg-white/10 md:hidden ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <img
              src={wordmark}
              alt="AquaValet"
              width={1260}
              height={160}
              className="h-5 w-auto mix-blend-screen"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className={`grid size-11 place-items-center rounded-full text-ink-text transition-colors hover:bg-white/10 ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActive(link.href);
                    setMenuOpen(false);
                  }}
                  className={`font-display block rounded-xl px-3 py-3 text-3xl font-extrabold tracking-tight transition-colors ${FOCUS} ${
                    active === link.href ? "text-ink-text" : "text-ink-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-3 px-8 pb-12">
            <a
              href={site.phoneHref}
              className={`block rounded-full border border-ink-stroke py-3 text-center text-base text-ink-text ${FOCUS}`}
            >
              Call {site.phoneDisplay}
            </a>
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-full bg-accent py-3 text-center text-base font-semibold text-ink ${FOCUS}`}
            >
              Get a Photo Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
