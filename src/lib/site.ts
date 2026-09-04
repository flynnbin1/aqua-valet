// Single source of truth for contact details and shared content.
// NAP must match the Google Business Profile character-for-character
// (CLAUDE.md rule 5).

export const site = {
  name: "Aqua Valet",
  addressLines: ["New Park, Centre Park Road", "Cork"],
  phoneDisplay: "083-4618226",
  phoneHref: "tel:+353834618226",
  whatsappHref:
    "https://wa.me/353834618226?text=Hi%20Aqua%20Valet%2C%20I%27d%20like%20a%20quote%20%E2%80%94%20I%27ll%20send%20a%20few%20photos%20of%20the%20car.",
  email: "info@aquavaletcork.com",
  openDays: "Mon–Sat, 9am–5pm — By Appointment Only",
  // Matches Google exactly — also mirrored in index.html's LocalBusiness
  // aggregateRating. Update both together if the Google figure changes.
  rating: "4.1",
  reviewCount: "179",
  facebook: "https://www.facebook.com/aquavaletcork/",
  instagram: "#", // TODO: Instagram link
};

/* ═══════════════════════════════════════════════════════════════════════
   BOOKING CTA DESTINATION — one shared constant so repointing every
   BOOK NOW button at the real booking link later is a ONE-LINE change.
   Site-root-relative values get the page's depth prefix; a full URL
   (https://…) is used as-is.
   ═══════════════════════════════════════════════════════════════════════ */
export const BOOKING_URL = "book-now/";
export const bookHref = (root: string) =>
  BOOKING_URL.startsWith("http") ? BOOKING_URL : `${root}${BOOKING_URL}`;

// Lou's standard lines — verbatim, used wherever they apply.
export const fromDisclaimer =
  "All prices are offered From. Final Price may vary depending on the Size & Condition of each vehicle.";
export const assessNote =
  "Not sure which service your vehicle needs? Don't worry — we'll assess your vehicle on arrival and advise you if a different service would be more suitable. No additional work will be carried out without your approval.";
export const surchargeClause =
  "Our online prices cover standard heavy use. If your vehicle has excessive pet hair, heavy commercial mud, mould, or biohazards, an extra €30–€50 detailing surcharge may apply based on the extra time needed. We will always assess this and confirm it with you face-to-face before we start.";
export const twoBucketNote =
  "We use the two bucket method for all of our wash packages & refill these regularly to ensure that the wash mitts, buckets, water and shampoo are clean.";
export const depositNote =
  "A €25 booking deposit secures your Deep Clean Reset. Cancellations need 1–2 days' notice or the deposit is forfeited.";

/* ═══════════════════════════════════════════════════════════════════════
   NEW SERVICE STRUCTURE — Lou's real prices (2026-08). These are LIVE
   figures, not placeholders. The old VEHICLE_PRICING below is superseded
   and kept only because unused legacy components still import it.
   ═══════════════════════════════════════════════════════════════════════ */
export const deepCleanReset = {
  name: "The Deep Clean Reset",
  strap: "Our Flagship 6-Hour Full Vehicle Reset",
  positioning:
    "Your car doesn't have to be this dirty to benefit from a Deep Clean. Our Deep Clean Reset is designed to restore your vehicle and bring it back to its best.",
  prices: [
    { label: "Car", price: "from €199" },
    { label: "SUV & Jeep", price: "from €250" },
    { label: "Heavy condition or mould", price: "up to €350" },
  ],
  ozoneNote:
    "The ozone machine runs for 1 hour on a standard Deep Clean, and 2 hours where there's mould (the €350 tier).",
  exterior: [
    "Pre-wash and safe snow foam",
    "Wheels and tyres",
    "Inner arches",
    "Safe hand wash",
    "Paint decontamination",
    "Iron fallout & tar removal",
    "Door shuts cleaned and polished",
    "Soft towel dry",
    "Blow dry",
    "Tyres dressed",
  ],
  interior: [
    "Full vacuum of carpets, seats and boot",
    "All surfaces deep cleaned and dressed",
    "Upholstery shampooed",
    "Steam cleaned",
    "Wet-vacuum extracted",
  ],
};

// Exclusive to customers who completed a Deep Clean Reset in the last
// 4–6 weeks — both plans.
export const maintenancePlan = {
  exclusiveNote:
    "Exclusive to customers who have completed a Deep Clean Reset in the last 4–6 weeks.",
  plans: [
    {
      name: "Maintenance Clean",
      duration: "2–3 hrs",
      description: "Keep your showroom look alive.",
      prices: [
        { label: "Small", price: "€100" },
        { label: "Medium", price: "€120" },
        { label: "Estate / SUV", price: "€150" },
        { label: "7-seater", price: "€175" },
      ],
      addOn: "Add-on: Deep Interior Seat Steaming +€60",
      restriction: null,
    },
    {
      name: "Express Valet",
      duration: "45–60 min",
      description: "Strictly for maintained cars only.",
      prices: [
        { label: "Small", price: "€80" },
        { label: "Medium", price: "€100" },
        { label: "Estate / SUV", price: "€120" },
        { label: "7-seater", price: "€140" },
      ],
      addOn: null,
      // Lou's note — verbatim.
      restriction:
        "Does NOT include stain removal, pet hair extraction, deep carpet vacuuming, or heavy mud cleaning — heavily soiled vehicles will be upgraded to a Deep Clean Reset or rescheduled.",
    },
  ],
};

export const washPackages = [
  {
    name: "Maintenance Wash",
    price: "from €120",
    includes: [
      "Hand wash with pH-neutral shampoo",
      "Tar and sap removal",
      "Decontaminate paintwork & wheels",
      "Microfibre towel dry",
      "Spray wax sealant",
    ],
    note: "For vehicles that have not been washed regularly or have tar spots, tree sap, moss, algae etc.",
  },
  {
    name: "Hand Wash, Wax, Towel Dry & Tyre Shine",
    price: "€25–35",
    includes: [],
    note: "For vehicles that are washed regularly and looking to maintain that new car look.",
  },
];

// Wave 1 pages — hrefs are site-root-relative WITHOUT the leading slash so
// each page can prefix its own depth ("" on /, "../" one level down, etc.).
// URLs must match sitemap-plan.md exactly — KEEP URLs protect live rankings.
// `children` power the header dropdowns (desktop) / expanders (mobile);
// the top-level label stays a link to the hub page either way. Note the
// Deep Clean Reset lives under /product/ (its ranking KEEP URL), so parent
// highlighting must come from this children list, not URL prefixes.
export type NavPage = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};
export const navPages: NavPage[] = [
  {
    label: "Packages",
    href: "packages/",
    children: [
      { label: "The Deep Clean Reset", href: "product/deep-clean-valet/" },
      { label: "The Maintenance Plan", href: "packages/essential-clean/" },
      { label: "Wash Valets", href: "services/car-wash/" },
    ],
  },
  {
    label: "Services",
    href: "services/",
    children: [
      { label: "Car Valeting", href: "services/car-valeting/" },
      { label: "Car Wash", href: "services/car-wash/" },
      { label: "Pickup & Mobile Valeting", href: "services/pickup-mobile-valeting/" },
    ],
  },
  { label: "Our Work", href: "valeting-work/" },
  { label: "Reviews", href: "your-feedback/" },
  { label: "About", href: "about-us/" },
  { label: "Contact", href: "contact/" },
];

export const packages = [
  {
    name: "Essential Clean",
    price: "from €150",
    blurb:
      "The maintenance valet — a 4–5 week return clean that keeps a deep-cleaned car showroom-fresh.",
    included: [
      "Full exterior hand wash & dry",
      "Interior hoover & wipe-down",
      "Glass inside & out",
      "Tyre & trim dressing",
      "Door shuts & sills",
    ],
    popular: false,
  },
  {
    name: "Full Valet",
    price: "from €120–150",
    blurb:
      "Inside and out, done properly. The right starting point for most cars — from €150 for SUVs & jeeps.",
    included: [
      "Everything in Essential Clean",
      "Shampooed carpets & mats",
      "Seats deep-vacuumed & treated",
      "Dash, console & trim detailed",
      "Exterior polish finish",
    ],
    popular: true,
  },
  {
    name: "Deep Clean Reset",
    price: "from €200–450",
    blurb:
      "The flagship — for cars that need bringing back. A full six-hour reset with ozone & steam treatment.",
    included: [
      "Everything in Full Valet",
      "Steam-cleaned upholstery & headlining",
      "Ozone odour treatment",
      "Pet hair & stain removal",
      "Machine polish & protective seal",
    ],
    popular: false,
  },
];

export const priceCaveat =
  "Every car is different. Prices are from-prices — send photos on WhatsApp for an exact quote.";

export const cardCaveat =
  "Final price depends on the size and condition of your vehicle.";

export const addOns =
  "Add-ons: pet & dog hair removal, stain & odour removal, pickup & drop-off.";

// Genuine customer reviews carried over from the old site — not placeholders.
export const reviews = [
  {
    title: "Excellent service",
    quote:
      "My car came back spotless inside and out — like new. Very competitive prices and they do a pick up and delivery if you don't have time to drop it off. I would highly recommend Aqua Valet to anyone.",
    name: "Carol O'Regan",
  },
  {
    title: "Top class valeting",
    quote:
      "The attention to detail is excellent and great value for money. Lou, who came to collect, was extremely professional. I will definitely be going back and would not hesitate to recommend this service to friends.",
    name: "Suzanne Hastings",
  },
  {
    title: "Delighted with my car",
    quote: "Car was as new after valeting. No hesitation in recommending.",
    name: "Michael O'Driscoll",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   ⚠️  PLACEHOLDER PRICES — NOT FINAL. DO NOT QUOTE THESE TO CUSTOMERS.
   ═══════════════════════════════════════════════════════════════════════
   Only the "Small Car" column and the Deep Clean ceiling come from the
   build brief (Full Valet from €120 / €150 for SUVs, Essential from €150,
   Deep Clean from €200 up to €450 for a bad 7-seater). Every other number
   below is a plausible stand-in invented to demonstrate the size toggle.

   TO REPLACE: edit the `prices` values in VEHICLE_PRICING below with Lou's
   confirmed figures, then delete this banner. Nothing else needs changing.
   Rules that must hold: every visible price stays "from €", and the lowest
   visible price never drops below €120.
   ═══════════════════════════════════════════════════════════════════════ */
export const vehicleSizes = [
  { id: "small", label: "Small Car", note: "Hatchbacks, superminis" },
  { id: "big", label: "Big Car", note: "Saloons, estates" },
  { id: "suv", label: "SUV & Jeep", note: "4x4s and crossovers" },
] as const;

export type VehicleSizeId = (typeof vehicleSizes)[number]["id"];

export const VEHICLE_PRICING: {
  name: string;
  tagline: string;
  popular?: boolean;
  includes: string[];
  prices: Record<VehicleSizeId, number>; // ⚠️ placeholders — see banner above
}[] = [
  {
    name: "Essential Clean",
    tagline: "The 4–5 week maintenance valet",
    includes: [
      "Full exterior hand wash & dry",
      "Interior hoover & wipe-down",
      "Glass inside & out",
      "Tyre & trim dressing",
    ],
    prices: { small: 150, big: 165, suv: 180 },
  },
  {
    name: "Full Valet",
    tagline: "Inside and out, done properly",
    popular: true,
    includes: [
      "Everything in Essential Clean",
      "Shampooed carpets & mats",
      "Seats deep-vacuumed & treated",
      "Exterior polish finish",
    ],
    prices: { small: 120, big: 135, suv: 150 },
  },
  {
    name: "The Deep Clean Reset",
    tagline: "The flagship — a full six-hour reset",
    includes: [
      "Everything in Full Valet",
      "Steam-cleaned upholstery & headlining",
      "Ozone odour treatment",
      "Machine polish & protective seal",
    ],
    prices: { small: 200, big: 230, suv: 270 },
  },
];

// Services (homepage cards — full service pages come in Wave 1)
export const services = [
  {
    name: "Car Valeting",
    price: "from €120",
    copy: "Full interior and exterior valets, done properly by the two of us. The right call for cars that get regular care.",
  },
  {
    name: "Deep Cleaning",
    price: "from €200",
    copy: "Our specialty — a four-to-six-hour reset with steam and ozone treatment for cars that need bringing back.",
    flagship: true,
  },
  {
    name: "Pickup & Mobile",
    price: "collection & drop-off",
    copy: "No time to drop the car in? We collect from you and return it finished — Cork city and the near suburbs.",
  },
];

// Why-choose-us differentiators
export const whyPoints = [
  {
    title: "Both of us, every car",
    copy: "No staff, no rushed handovers — the owners do the work on every single car.",
  },
  {
    title: "Assessed on arrival",
    copy: "Book the service you think fits — we'll check the car with you and confirm everything before any work starts.",
  },
  {
    title: "Eight years at Centre Park Road",
    copy: "The most reviewed valeting business in Cork — ★ 4.1 from 179 Google reviews.",
  },
  {
    title: "A handful of cars a day",
    copy: "We book fewer cars on purpose, so yours gets the hours it actually needs.",
  },
];

// Blog/guides teasers — real articles land in Wave 2, no links until then.
export const guides = [
  {
    title: "What does car valeting cost in Cork?",
    teaser: "Every package priced honestly, and what changes the price.",
  },
  {
    title: "Deep clean pricing, explained",
    teaser: "Why one car is €200 and another is €450 — condition, size, and hours.",
  },
  {
    title: "How to choose a valeter in Cork",
    teaser: "The questions worth asking before you hand over your keys.",
  },
];

// Booking form options
export const carTypes = ["Car", "SUV / Jeep", "7-seater", "Van"];
export const lastValeted = [
  "Within the last 3 months",
  "Earlier this year",
  "Over a year ago",
  "Honestly can't remember",
];

// FAQ copy does the qualifying work: photos-first, condition-based pricing,
// and realistic deep-clean expectations (the mismatch that causes bad reviews).
export const faqs = [
  {
    q: "Why do you ask for photos first?",
    a: "Because condition decides the price. A quick look at three or four photos means you get an accurate quote before you arrive — no surprises at the unit, no disappointment when you collect the car.",
  },
  {
    q: "How much does a full valet cost in Cork?",
    a: "Our Full Valet starts from €120, or from €150 for SUVs and jeeps. The final price depends on the size and condition of your vehicle — that's why we quote from your photos first.",
  },
  {
    q: "How long does a deep clean take?",
    a: "A proper deep clean is a four-to-six-hour reset of your car, sometimes longer for heavily soiled interiors. We only take a couple of deep cleans a day, so every car gets the hours it needs.",
  },
  {
    q: "Do you remove dog hair?",
    a: "Yes — pet hair removal is part of the Deep Clean Reset and available as an add-on. Even a carpet of dog hair comes out; it just takes time, which is why we price on condition.",
  },
  {
    q: "When are you open?",
    a: "Monday to Saturday, 9am–5pm, by appointment only — so every booking gets our full attention.",
  },
  {
    q: "Where do I find you?",
    a: "New Park, Centre Park Road, Cork — directly opposite the Marina Market, a few minutes from Páirc Uí Chaoimh. Collection and drop-off available if that's easier.",
  },
];
