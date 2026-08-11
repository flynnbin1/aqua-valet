import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        navy: "hsl(var(--navy))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        accent: "hsl(var(--accent))",
        "accent-strong": "hsl(var(--accent-strong))",
        "accent-light": "hsl(var(--accent-light))",
        // Dark zones (header, footer, hero) — the logo art requires them
        ink: "hsl(var(--ink))",
        "ink-surface": "hsl(var(--ink-surface))",
        "ink-text": "hsl(var(--ink-text))",
        "ink-muted": "hsl(var(--ink-muted))",
        "ink-stroke": "hsl(var(--ink-stroke))",
      },
      // Montserrat throughout — display and body are the same family,
      // separated by weight (see docs/BRAND-GUIDELINES.md).
      fontFamily: {
        body: ["Montserrat", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
