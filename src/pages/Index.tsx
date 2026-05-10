import { useState, useEffect, lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

const ThreeBackground = lazy(() => import("@/components/ThreeBackground"));

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
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <TestimonialsSection />
            <ProcessSection />
            <PricingSection />
            <FaqSection />
            <ContactSection />
            <FooterSection />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
