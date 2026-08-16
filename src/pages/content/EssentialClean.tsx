import { VEHICLE_PRICING } from "../../lib/site";
import PackagePage from "./PackagePage";

/* /packages/essential-clean/ — NEW URL (sitemap-plan.md). Maintenance
   valet, from €150. Prices = VEHICLE_PRICING placeholders. */
export default function EssentialClean({ root }: { root: string }) {
  const pkg = VEHICLE_PRICING[0]; // Essential Clean
  return (
    <PackagePage
      root={root}
      path="packages/essential-clean/"
      eyebrow="Packages — Cork"
      title="Essential Clean"
      accentWord="Essential"
      intro="The maintenance valet — a 4–5 week return clean that keeps a deep-cleaned car showroom-fresh."
      story={[
        "The Essential Clean exists for one reason: once a car has had a proper deep clean, the cheapest way to keep it that way is a regular return visit before the grime gets established again.",
        "It's a full interior and exterior refresh — not a quick wash — sized for cars that are already in good order. Most Essential Clean customers are on a four-to-five week cycle with us.",
        "If your car hasn't been valeted in a while, start with the Full Valet or the Deep Clean Reset instead — this package assumes a recently cleaned baseline.",
      ]}
      includes={[...pkg.includes, "Door shuts & sills"]}
      prices={pkg.prices}
      crossLinks={[
        { label: "Full Valet", href: "packages/full-valet/", primary: true },
        { label: "The Deep Clean Reset", href: "product/deep-clean-valet/" },
      ]}
    />
  );
}
