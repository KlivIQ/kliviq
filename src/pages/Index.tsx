import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import FloatingActions from "@/components/FloatingActions";
import MobileBottomNav from "@/components/MobileBottomNav";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WhyKliviqSection from "@/components/sections/WhyKliviqSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      {!isLoading && (
        <>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <div className="section-bg"><AboutSection /></div>
            <div className="section-bg-alt"><ServicesSection /></div>
            <div className="section-bg"><WhyKliviqSection /></div>
            <div className="section-bg-alt"><ProjectsSection /></div>
            <div className="section-bg"><TestimonialsSection /></div>
            <div className="section-bg"><ProcessSection /></div>
            <div className="section-bg-alt"><PricingSection /></div>
            <div className="section-bg"><FaqSection /></div>
            <div className="section-bg-alt"><ContactSection /></div>
            <div className="section-bg"><FooterSection /></div>
          </main>
          <FloatingActions />
          <MobileBottomNav />
        </>
      )}
    </>
  );
};

export default Index;
