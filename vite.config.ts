import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// One entry per Wave 1 URL (sitemap-plan.md) — the source html files live
// at their URL paths so the build emits e.g. dist/services/car-valeting/
// index.html and every KEEP URL resolves exactly on any static host.
const pages = [
  "services",
  "services/car-valeting",
  "services/car-wash",
  "services/pickup-mobile-valeting",
  "packages",
  "packages/essential-clean",
  "packages/full-valet",
  "product/deep-clean-valet",
  "about-us",
  "contact",
  "book-now",
  "your-feedback",
  "valeting-work",
];

export default defineConfig({
  plugins: [react()],
  // Relative base so the built dist/ folder works from any web root (GitHub
  // Pages project path today, the real domain later). The homepage also
  // still opens straight from disk; subpages need a server that resolves
  // directory indexes — use View Website.bat / vite preview for those.
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...Object.fromEntries(
          pages.map((p) => [
            p.replaceAll("/", "-"),
            resolve(__dirname, p, "index.html"),
          ]),
        ),
      },
    },
  },
});
