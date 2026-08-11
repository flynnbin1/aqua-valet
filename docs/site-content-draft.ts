// Single source of truth for contact details and shared content.
// NAP must match the Google Business Profile character-for-character
// (CLAUDE.md rule 5). Phone from the old site: tel:+353834618226,
// displayed as 083-4618226 — confirm display format against GBP.

export const site = {
  name: "Aqua Valet",
  addressLines: ["New Park, Centre Park Road", "Cork"],
  phoneDisplay: "083-4618226",
  phoneHref: "tel:+353834618226",
  whatsappHref:
    "https://wa.me/353834618226?text=Hi%20Aqua%20Valet%20%E2%80%94%20I%27d%20like%20a%20quote%20for%20my%20car.",
  openDays: "Wednesday, Friday & Saturday",
  rating: "4.4",
  reviewCount: "114",
  facebook: "https://www.facebook.com/aquavaletcork/",
  x: "https://x.com/AquaValetCork",
};

export const navLinks = [
  { label: "Packages", href: "/packages/" },
  { label: "Services", href: "/services/" },
  { label: "Our Work", href: "/valeting-work/" },
  { label: "Reviews", href: "/your-feedback/" },
  { label: "About", href: "/about-us/" },
  { label: "Contact", href: "/contact/" },
];

export const packages = [
  {
    name: "Essential Clean",
    tagline: "The maintenance valet",
    price: "from €150",
    href: "/packages/essential-clean/",
    popular: false,
    points: [
      "The 4–5 week return clean that keeps a deep-cleaned car showroom-fresh",
      "Full interior & exterior refresh",
      "For existing deep-clean customers",
    ],
  },
  {
    name: "Full Valet",
    tagline: "Inside & out, done properly",
    price: "from €120",
    href: "/packages/full-valet/",
    popular: true,
    points: [
      "Complete interior & exterior valet",
      "From €150 for SUVs & jeeps",
      "The right starting point for most cars",
    ],
  },
  {
    name: "The Deep Clean Reset",
    tagline: "The flagship",
    price: "from €200",
    href: "/product/deep-clean-valet/",
    popular: false,
    points: [
      "A full six-hour reset, inside and out",
      "Ozone & steam treatment",
      "Condition-based pricing — up to €450 for a heavily soiled 7-seater",
    ],
  },
];

export const priceCaveat =
  "Final price depends on the size and condition of your vehicle.";

// Genuine customer reviews carried over from the current site's
// "What our Customers Have to Say" section — not placeholder copy.
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
    quote:
      "Car was as new after valeting. No hesitation in recommending.",
    name: "Michael O'Driscoll",
  },
];
