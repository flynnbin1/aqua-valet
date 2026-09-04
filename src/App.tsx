import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesMarquee from "./components/ServicesMarquee";
import ProfessionalWash from "./components/ProfessionalWash";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ServiceMenu from "./components/ServiceMenu";
import AddOns from "./components/AddOns";
import Enquiry from "./components/Enquiry";
import ReviewsCarousel from "./components/ReviewsCarousel";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

// Page order: hero → services marquee → professional washing (#services) →
// before/after (dark) → choose your plan (#pricing, light) →
// add-ons (#add-ons, dark) → enquiry (#book, light) → reviews (#reviews,
// light) → final CTA, image banner (dark) → footer (#contact, dark).
//
// No FAQ section — removed. TrustBar and ServiceAreas are still on disk
// but not mounted. Re-add the import + tag to bring either back.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <ServicesMarquee />
        <ProfessionalWash />
        <BeforeAfterSlider />
        {/* New agreed service structure (Lou 2026-08): Deep Clean Reset
            flagship → Maintenance Plan → wash valets. Replaces the old
            three-package PricingPlans section (component kept on disk). */}
        <ServiceMenu />
        <AddOns />
        <Enquiry />
        <ReviewsCarousel />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
