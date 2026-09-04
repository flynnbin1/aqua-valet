import ServiceMenu from "../../components/ServiceMenu";
import Enquiry from "../../components/Enquiry";
import { CtaBand, PageHero, PageShell } from "../shell";

/* /packages/ — NEW URL (sitemap-plan.md), repurposed as the hub for the
   new agreed service structure (Lou 2026-08): Deep Clean Reset flagship →
   Maintenance Plan → wash valets, all through the shared ServiceMenu (the
   same section the homepage shows below its hero). */
export default function PackagesHub({ root }: { root: string }) {
  return (
    <PageShell root={root} path="packages/">
      <PageHero
        eyebrow="Packages — Cork"
        title="Valeting Packages"
        accentWord="Packages"
        intro="The Deep Clean Reset, the Maintenance Plan that keeps it that way, and our wash services — priced honestly on your car's size and condition."
      />

      <ServiceMenu root={root} />

      {/* Same enquiry form as the homepage — one shared component,
          one webhook to wire later. Sits before the CTA band, matching
          the homepage flow. */}
      <Enquiry root={root} />

      <CtaBand root={root} />
    </PageShell>
  );
}
