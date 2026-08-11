import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesMarquee from "./components/ServicesMarquee";
import ProfessionalWash from "./components/ProfessionalWash";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import PricingPlans from "./components/PricingPlans";
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
        <PricingPlans />
        <AddOns />
        <Enquiry />
        <ReviewsCarousel />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
