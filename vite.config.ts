import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the built dist/ folder works opened straight from disk
  // (double-click dist/index.html) as well as from any web root. Revisit if
  // the site gains real routes — nested URLs will want base "/" again.
  base: "./",
});
