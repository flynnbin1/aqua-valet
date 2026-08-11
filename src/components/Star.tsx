/**
 * Four-point sparkle used as the separator in the services marquee and as the
 * bullet in checklists. Brand accent (aqua) by default — see
 * docs/BRAND-GUIDELINES.md.
 */
export default function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`inline-block fill-current ${className}`}
    >
      <path d="M12 0c.5 5.9 6.1 11.5 12 12-5.9.5-11.5 6.1-12 12-.5-5.9-6.1-11.5-12-12C5.9 11.5 11.5 5.9 12 0Z" />
    </svg>
  );
}
