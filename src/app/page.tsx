import HeroSlider from "@/components/common/hero-slider";
import StatsSection from "@/components/common/stats-section";
import ServicesSection from "@/components/common/services-section";
import CompanyOverviewSection from "@/components/common/company-overview-section";

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
    </main>
  );
}
