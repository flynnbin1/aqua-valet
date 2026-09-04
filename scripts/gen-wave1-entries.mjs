// One-shot generator for the Wave 1 page entries: for each page in the
// sitemap plan it writes (a) the URL-matching index.html with its own
// title/description/schema and the noindex lockdown, and (b) the Vite
// entry module that mounts the page component. Re-run after editing PAGES.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const PAGES = [
  {
    url: "services/",
    component: "ServicesHub",
    title: "Services | Car Wash, Valeting & Detailing | Aqua Valet Cork",
    description:
      "Car washing, valeting and deep cleaning at New Park, Centre Park Road, Cork. Book the service that fits — we assess your vehicle on arrival.",
    schema: { type: "Service", name: "Car Valeting & Detailing Services" },
  },
  {
    url: "services/car-valeting/",
    component: "CarValeting",
    title: "Car Valeting | Interior & Exterior Cleaning | Aqua Valet Cork",
    description:
      "Visit our Cork car valeting depot for an interior and exterior clean. We are located just outside the city on New Park, Centre Park Road. Quoted from your photos before you arrive.",
    schema: { type: "Service", name: "Car Valeting" },
  },
  {
    url: "services/car-wash/",
    component: "CarWash",
    title: "Car Wash in Cork | Professional Hand Wash | Aqua Valet Cork",
    description:
      "A regular car wash helps hold your vehicle's value by keeping the exterior clean. We use ultra-soft hand mitts that are gentle on your paintwork and will leave your car shining.",
    schema: { type: "Service", name: "Car Wash" },
  },
  {
    url: "services/pickup-mobile-valeting/",
    component: "PickupMobile",
    title: "Mobile Valeting Cork City | Pickup & Drop-off | Aqua Valet Cork",
    description:
      "Valeting pickup and drop-off around Cork — Douglas, Wilton or Blackpool, we collect your car, valet it and return it finished so you can enjoy your busy schedule.",
    schema: { type: "Service", name: "Pickup & Mobile Valeting" },
  },
  {
    url: "packages/",
    component: "PackagesHub",
    title: "Valeting Packages & Prices | Aqua Valet Cork",
    description:
      "The Deep Clean Reset, the Maintenance Plan that keeps it that way, and our wash valets — honestly priced on your car's size and condition.",
    schema: null,
  },
  {
    url: "packages/essential-clean/",
    component: "EssentialClean",
    title: "The Maintenance Plan | Keep Your Deep Clean | Aqua Valet Cork",
    description:
      "Had your Deep Clean? Keep it that way. The Maintenance Clean from €100 and the Express Valet from €80 — exclusive to customers who completed a Deep Clean Reset in the last 4–6 weeks.",
    schema: { type: "Service", name: "The Maintenance Plan" },
  },
  {
    url: "packages/full-valet/",
    component: "FullValet",
    title: "Full Valet | Aqua Valet Cork",
    description:
      "Our packages have a new shape — the Full Valet's work now lives across the Deep Clean Reset and the Maintenance Plan, priced on your car's size and condition.",
    schema: null,
  },
  {
    url: "product/deep-clean-valet/",
    component: "DeepClean",
    // KEEP EXACTLY — this title ranks #1 for "car deep clean cork"
    title: "Deep Clean Valet 6-7 hrs - Aqua Valet Cork",
    description:
      "Our Flagship 6-Hour Full Vehicle Reset — steam cleaned, wet-vac extracted, ozone treated, exterior decontaminated. From €199 for a car, from €250 for an SUV, priced on condition.",
    schema: { type: "Service", name: "Deep Clean Valet" },
  },
  {
    url: "about-us/",
    component: "AboutUs",
    title: "About Us | Car Cleaning Service | Aqua Valet Cork",
    description:
      "Eight years of car valeting and cleaning at New Park, Centre Park Road, Cork — still just the two of us, on every single car. Open Monday to Saturday, 9am–5pm, by appointment.",
    schema: null,
  },
  {
    url: "contact/",
    component: "Contact",
    title: "Contact | Car Valet on New Park, Centre Park Road | Aqua Valet Cork",
    description:
      "Get in touch to book a valeting service in Cork. Open Monday to Saturday, 9am–5pm, by appointment, at New Park, Centre Park Road — opposite the Marina Market.",
    schema: { type: "LocalBusiness" },
  },
  {
    url: "book-now/",
    component: "BookNow",
    title: "Book Now | Car Valeting in Cork | Aqua Valet Cork",
    description:
      "Book your car valet in Cork — a €25 deposit secures your slot and we assess your vehicle on arrival. Not sure what it needs? Send us photos and we'll point you right.",
    schema: null,
  },
  {
    url: "your-feedback/",
    component: "YourFeedback",
    title: "Your Feedback | Aqua Valet Cork Reviews",
    description:
      "Real reviews from Aqua Valet customers on Google — the most reviewed valeting business in Cork.",
    schema: null,
  },
  {
    url: "valeting-work/",
    component: "ValetingWork",
    title: "Our Work | Car Detailing | Aqua Valet Cork",
    description:
      "Before-and-after photos of completed car detailing and valets — a personal, courtesy valeting and cleaning service in Cork city and suburbs.",
    schema: null,
  },
];

const LOCAL_BUSINESS = {
  "@type": "LocalBusiness",
  name: "Aqua Valet",
  address: {
    "@type": "PostalAddress",
    streetAddress: "New Park, Centre Park Road",
    addressLocality: "Cork",
    addressCountry: "IE",
  },
  telephone: "+353834618226",
  sameAs: [
    "https://www.facebook.com/aquavaletcork/",
    "https://x.com/AquaValetCork",
  ],
};

function schemaFor(page) {
  if (!page.schema) return "";
  const obj =
    page.schema.type === "LocalBusiness"
      ? { "@context": "https://schema.org", ...LOCAL_BUSINESS, openingHours: ["Mo-Sa 09:00-17:00"] }
      : {
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.schema.name,
          serviceType: page.schema.name,
          areaServed: "Cork, Ireland",
          provider: LOCAL_BUSINESS,
        };
  return `\n    <script type="application/ld+json">\n      ${JSON.stringify(obj, null, 2).replaceAll("\n", "\n      ")}\n    </script>`;
}

for (const page of PAGES) {
  const depth = page.url.split("/").filter(Boolean).length;
  const up = "../".repeat(depth);
  const slug = page.url.replace(/\/$/, "").replaceAll("/", "-");

  const html = `<!doctype html>
<html lang="en-IE">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" sizes="32x32" href="${up}favicon-32.png" />
    <link rel="icon" type="image/png" sizes="64x64" href="${up}favicon-64.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="${up}favicon-192.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="${up}favicon-192.png" />

    <!-- SEO lockdown — preview stays hidden from Google. Remove ONLY when
         Niall says "we are launching" (docs/seo-lockdown.md). -->
    <meta name="robots" content="noindex, nofollow" />

    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />${schemaFor(page)}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/pages/entry/${slug}.tsx"></script>
  </body>
</html>
`;

  const entry = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import ${page.component} from "../content/${page.component}";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <${page.component} root="${up}" />
  </StrictMode>,
);
`;

  const htmlPath = join(process.cwd(), page.url, "index.html");
  mkdirSync(dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, html);

  const entryPath = join(process.cwd(), "src", "pages", "entry", `${slug}.tsx`);
  mkdirSync(dirname(entryPath), { recursive: true });
  writeFileSync(entryPath, entry);
  console.log(`${page.url} → ${slug}`);
}
console.log(`${PAGES.length} pages generated`);
