import Enquiry from "../../components/Enquiry";
import { CtaBand, PageHero, PageShell } from "../shell";

/* /book-now/ — KEEP URL (sitemap-plan.md). Replaces the old WooCommerce
   checkout with the enquiry → WhatsApp photo-quote flow. Old H1 "Book Now"
   kept; the old title/description advertised "€10" prices and is rewritten
   in the page head (benchmark finding 4). Reuses the homepage Enquiry
   section wholesale — same form, same steps. */
export default function BookNow({ root }: { root: string }) {
  return (
    <PageShell root={root} path="book-now/">
      <PageHero
        eyebrow="Get a quote — Cork"
        title="Book Now"
        accentWord="Book"
        intro="No payment and no checkout — leave your details, we WhatsApp you for 3–4 photos, and you get an exact price before you drive over."
      />
      <Enquiry />
      <CtaBand root={root} />
    </PageShell>
  );
}
