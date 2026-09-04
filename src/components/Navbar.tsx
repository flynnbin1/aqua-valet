import { useEffect, useState } from "react";
import { bookHref, navPages, site, type NavPage } from "../lib/site";
import wordmark from "../../assets/aquavalet-wordmark.png";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const Chevron = ({ className = "size-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * Full-width header per the vwash-ref-2 structure (structure only):
 * a thin info strip (hours | address + phone) above the main bar with
 * logo left, nav centre, phone + solid WhatsApp CTA right.
 *
 * Nav links point at the real Wave 1 pages (sitemap-plan.md URLs).
 * `root` is the relative prefix back to the site root from the current
 * page ("" on the homepage, "../" one level down, "../../" two levels)
 * so links resolve from any depth under any web root. `currentPath` is
 * the page's site-root-relative URL (e.g. "services/car-valeting/") used
 * to highlight the current section of the site.
 */
export default function Navbar({
  root = "",
  currentPath = "",
}: {
  root?: string;
  currentPath?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Which mobile section (by href) is expanded to show its sub-links
  const [expanded, setExpanded] = useState<string | null>(null);
  const isCurrent = (href: string) =>
    currentPath === href ||
    (href !== "" && currentPath.startsWith(href.replace(/\/$/, "/")));
  // A page counts as "inside" a nav item if it matches the item's own URL
  // prefix OR any of its dropdown children — needed because the Deep Clean
  // Reset (a Packages child) lives under /product/, not /packages/.
  const isCurrentSection = (link: NavPage) =>
    isCurrent(link.href) ||
    (link.children ?? []).some((c) => isCurrent(c.href));

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
      {/* Info strip — aqua band. Not sticky: collapses away once the page
          scrolls, so only the main bar below stays pinned at the top. */}
      <div
        aria-hidden={scrolled}
        className={`overflow-hidden bg-accent transition-[max-height,opacity] duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-2 text-xs text-ink sm:px-6 md:text-sm lg:px-10">
          <p className="whitespace-nowrap font-medium">{site.openDays}</p>
          <p className="flex items-center gap-3 whitespace-nowrap font-medium">
            <span className="hidden sm:inline">Centre Park Road, Cork City</span>
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
            href={root === "" ? "#home" : root}
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

          {/* Nav centre. Items with children get a hover/focus dropdown —
              CSS-only (group-hover + focus-within), so the top-level label
              stays a plain link to the hub page, the panel opens the moment
              anything inside receives keyboard focus, and tabbing onward
              moves through the child links in order. */}
          <ul className="hidden items-center gap-1 xl:flex">
            {navPages.map((link) => (
              <li key={link.href} className="group relative">
                <a
                  href={`${root}${link.href}`}
                  aria-current={isCurrentSection(link) ? "page" : undefined}
                  aria-haspopup={link.children ? "menu" : undefined}
                  className={`inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-sm transition-colors hover:text-accent-strong ${FOCUS} ${
                    isCurrentSection(link)
                      ? "bg-white/10 text-ink-text"
                      : "text-ink-text"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <Chevron className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                </a>
                {link.children && (
                  <ul
                    className="invisible absolute left-0 top-full z-50 mt-1 min-w-56 translate-y-1 rounded-2xl border border-ink-stroke bg-ink py-2 opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.5)] transition duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={`${root}${child.href}`}
                          aria-current={isCurrent(child.href) ? "page" : undefined}
                          className={`block px-5 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-accent ${FOCUS} ${
                            isCurrent(child.href)
                              ? "text-accent"
                              : "text-ink-text"
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Phone + CTA right */}
          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={`hidden items-center gap-2 rounded text-sm text-ink-text transition-colors hover:text-accent xl:flex ${FOCUS}`}
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
              href={bookHref(root)}
              className={`hidden min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent-light sm:flex ${FOCUS}`}
            >
              Book Now
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={`grid size-12 place-items-center rounded-full text-ink-text transition duration-150 hover:bg-accent hover:text-ink active:scale-90 xl:hidden ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
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
          className="fixed inset-0 z-50 flex flex-col bg-black xl:hidden"
        >
          <div className="flex shrink-0 items-center justify-between px-6 pb-2 pt-6">
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
              className={`grid size-12 place-items-center rounded-full text-ink-text transition duration-150 hover:bg-accent hover:text-ink active:scale-90 ${FOCUS}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
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
          {/* Scroll architecture: this wrapper owns the scrolling; the ul
              uses my-auto so short content still sits vertically centred,
              but tall content (a section expanded on a small phone) scrolls
              from an in-reach top instead of justify-center clipping it. */}
          <div className="min-h-0 flex-1 overflow-y-auto px-8">
          <ul className="my-auto flex min-h-full flex-col justify-center gap-2 py-6">
            {navPages.map((link) => (
              <li key={link.href}>
                <div className="flex items-center justify-between">
                  <a
                    href={`${root}${link.href}`}
                    aria-current={isCurrentSection(link) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display block rounded-xl px-3 py-2.5 text-3xl font-extrabold tracking-tight transition-colors ${FOCUS} ${
                      isCurrentSection(link) ? "text-accent" : "text-ink-text"
                    }`}
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(expanded === link.href ? null : link.href)
                      }
                      aria-expanded={expanded === link.href}
                      aria-label={`${
                        expanded === link.href ? "Collapse" : "Expand"
                      } ${link.label}`}
                      className={`grid size-11 place-items-center rounded-full text-ink-muted transition hover:bg-white/10 hover:text-ink-text ${FOCUS}`}
                    >
                      <Chevron
                        className={`size-5 transition-transform ${
                          expanded === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {link.children && expanded === link.href && (
                  <ul className="mb-3 ml-4 mt-1 space-y-1 border-l border-ink-stroke pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={`${root}${child.href}`}
                          aria-current={
                            isCurrent(child.href) ? "page" : undefined
                          }
                          onClick={() => setMenuOpen(false)}
                          className={`flex min-h-12 items-center rounded-lg px-3 text-lg font-medium transition-colors ${FOCUS} ${
                            isCurrent(child.href)
                              ? "text-accent"
                              : "text-ink-muted hover:text-ink-text"
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          </div>
          {/* CTA block: pinned below the scrolling list (shrink-0) with a
              hairline so the last nav item never crowds the buttons. */}
          <div className="shrink-0 space-y-3 border-t border-ink-stroke px-8 pb-8 pt-6">
            <a
              href={site.phoneHref}
              className={`block rounded-full border border-white/25 py-3 text-center text-base text-ink-text transition-colors hover:border-accent hover:text-accent ${FOCUS}`}
            >
              Call {site.phoneDisplay}
            </a>
            <a
              href={bookHref(root)}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-full bg-accent py-3 text-center text-base font-semibold text-ink transition-colors hover:bg-accent-light ${FOCUS}`}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
