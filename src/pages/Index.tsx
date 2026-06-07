import { useState, useEffect } from "react";
import { Head as Helmet } from "vite-react-ssg";
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
  // SSR-safe: render content immediately. Loading screen is skipped on
  // statically-rendered pages so crawlers and first-paint see real HTML.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const hash = window.location.hash;
    if (!hash) return;
    // Wait a tick for sections to mount
    const id = hash.replace("#", "");
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempt < 10) {
        setTimeout(() => tryScroll(attempt + 1), 100);
      }
    };
    tryScroll();
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <title>KlivIQ | AI Consulting & Fractional CTO — India & Global</title>
        <meta name="description" content="KlivIQ helps businesses adopt AI and build high-performance software. AI consulting that actually ships, fractional CTO services, web, mobile, and AI tools. Delivered in weeks, not months." />
        <link rel="canonical" href="https://www.kliviq.com/" />
        <meta property="og:title" content="KlivIQ | AI Consulting & Fractional CTO — India & Global" />
        <meta property="og:description" content="KlivIQ helps businesses adopt AI and build high-performance software. AI consulting that actually ships, fractional CTO services, web, mobile, and AI tools. Delivered in weeks, not months." />
        <meta property="og:url" content="https://www.kliviq.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      {!isLoading && (
        <>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <div className="section-bg"><AboutSection /></div>
            <div className="section-bg-alt"><ServicesSection /></div>
            <div className="section-bg"><ProductsSection /></div>
            <div className="section-bg-alt"><WhyKliviqSection /></div>
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
