// Post-build step: inline the built JS and CSS into dist/index.html so the
// site runs when index.html is double-clicked straight from disk (file://).
// Browsers block fetching external module scripts over file://, but inline
// ones run fine. Media (video/images) load as plain resources, which file://
// allows.
import { copyFileSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const htmlPath = join(dist, "index.html");
let html = readFileSync(htmlPath, "utf8");

// Inline the stylesheet(s)
html = html.replace(
  /<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/g,
  (_, cssFile) => {
    const css = readFileSync(join(dist, cssFile), "utf8");
    return `<style>${css}</style>`;
  },
);

// Inline the module script(s); escape any literal </script> inside the code
html = html.replace(
  /<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/g,
  (_, jsFile) => {
    const js = readFileSync(join(dist, jsFile), "utf8").replaceAll(
      "</script",
      "<\\/script",
    );
    return `<script type="module">${js}</script>`;
  },
);

writeFileSync(htmlPath, html);

// Inlining moves the script's URL base from dist/assets/ to dist/, so
// bundled media (the brand PNGs) resolve against dist/. Copy them up.
for (const file of readdirSync(join(dist, "assets"))) {
  if (!/\.(js|css)$/.test(file)) {
    copyFileSync(join(dist, "assets", file), join(dist, file));
  }
}

console.log("dist/index.html is now portable (JS/CSS inlined) — double-click it to view.");
