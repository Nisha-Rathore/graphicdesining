import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeLogos from "@/components/MarqueeLogos";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <MarqueeLogos />
      <ServicesSection />
      <SectionDivider />
      <PortfolioSection />
      <SectionDivider />
      <ShowcaseGallery />
      <SectionDivider />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default Index;
