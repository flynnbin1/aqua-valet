import { VEHICLE_PRICING } from "../../lib/site";
import PackagePage from "./PackagePage";

/* /packages/full-valet/ — NEW URL (sitemap-plan.md). From €120, €150 for
   SUVs & jeeps. NOTE (per the plan): /services/car-valeting/ deliberately
   does NOT redirect here — both stay live, the service page links forward.
   Prices = VEHICLE_PRICING placeholders. */
export default function FullValet({ root }: { root: string }) {
  const pkg = VEHICLE_PRICING[1]; // Full Valet
  return (
    <PackagePage
      root={root}
      path="packages/full-valet/"
      eyebrow="Packages — Cork · Most popular"
      title="Full Valet"
      accentWord="Full"
      intro="Inside and out, done properly — the right starting point for most cars, from €120 for a small car and €150 for SUVs and jeeps."
      story={[
        "The Full Valet is the package most cars actually need: a complete interior and exterior valet, done by the two of us, with the hours the car genuinely takes.",
        "Every job is photo-quoted first, so if the interior turns out to need more than a valet can fix — years of grime, pet hair, odours — we'll say so before you drive over, not after.",
        "Cars in a really bad way should look at the Deep Clean Reset; cars we've already deep-cleaned keep their finish with the Essential Clean cycle.",
      ]}
      includes={pkg.includes}
      prices={pkg.prices}
      crossLinks={[
        { label: "The Deep Clean Reset", href: "product/deep-clean-valet/", primary: true },
        { label: "Essential Clean", href: "packages/essential-clean/" },
      ]}
    />
  );
}
