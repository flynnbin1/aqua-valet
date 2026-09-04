import Enquiry from "../../components/Enquiry";
import { CtaBand, PageHero, PageShell } from "../shell";

/* /book-now/ — KEEP URL (sitemap-plan.md). The booking destination under
   the Book-Now-first model: a €25 deposit secures the slot (Stripe link
   sent on WhatsApp — the online booking link will replace BOOKING_URL
   later), we assess on arrival, photos are the secondary "unsure?" path.
   Old H1 "Book Now" kept; the old title/description advertised "€10"
   prices and is rewritten in the page head (benchmark finding 4). */
export default function BookNow({ root }: { root: string }) {
  return (
    <PageShell root={root} path="book-now/">
      <PageHero
        eyebrow="Book your car in — Cork"
        title="Book Now"
        accentWord="Book"
        intro="Book the service you think fits — a €25 deposit secures your slot, and we'll assess your vehicle on arrival before any work starts. Not sure? Leave your details or send photos and we'll point you right."
      />
      <Enquiry root={root} />
      <CtaBand root={root} />
    </PageShell>
  );
}
