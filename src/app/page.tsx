import HeroSlider from "@/components/common/hero-slider";
import StatsSection from "@/components/common/stats-section";
import ServicesSection from "@/components/common/services-section";
import CompanyOverviewSection from "@/components/common/company-overview-section";
import AdvantagesSection from "@/components/common/advantages-section";
import FeaturedProjectSection from "@/components/common/featured-project-section";
import TestimonialsSection from "@/components/common/testimonials-section";
import CtaSection from "@/components/common/cta-section";

export const metadata = {
  title: "Home",
  description:
    "Capital Engineering Ceylon delivers commercial, residential, and industrial construction projects across Sri Lanka.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSlider />

      {/* Stats section */}
      <StatsSection />

      {/* Services section */}
      <ServicesSection />

      {/* Company overview section */}
      <CompanyOverviewSection />

      {/* Advantages section */}
      <AdvantagesSection />

      {/* Featured project section */}
      <FeaturedProjectSection />

      {/* Testimonials section */}
      <TestimonialsSection />

      {/* Call to action (Contact) */}
      <CtaSection />
    </main>
  );
}
