import HeroSlider from "@/components/common/hero-slider";
import StatsSection from "@/components/common/stats-section";
import ServicesSection from "@/components/common/services-section";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      
      {/* Stats section */}
      <StatsSection />

      {/* Services section */}
      <ServicesSection />
    </main>
  );
}
