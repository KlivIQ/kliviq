import { useState, useEffect } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { JsonLd } from "@/components/JsonLd";
import { generalFaqs } from "@/data/generalFaqs";
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
import DeferredSection from "@/components/DeferredSection";
import TrustRow from "@/components/TrustRow";
import ExitIntentCTA from "@/components/ExitIntentCTA";

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
        <link rel="canonical" href="https://www.kliviq.com/" />
        <meta property="og:title" content="KlivIQ | AI Consulting, Fractional CTO, AI Visibility & WhatsApp AI Chatbots" />
        <meta property="og:description" content="KlivIQ helps businesses adopt AI and build high-performance software. AI consulting, fractional CTO, AI Visibility Scoring, WhatsApp AI Chatbots, web, mobile & AI tools." />
        <meta property="og:url" content="https://www.kliviq.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KlivIQ",
        "url": "https://www.kliviq.com/",
        "logo": "https://www.kliviq.com/kliviq-og.png",
        "description": "KlivIQ helps businesses adopt AI and build high-performance software. AI consulting, fractional CTO, AI Visibility Scoring (Seenzo), WhatsApp AI Chatbots (KlivIQ Connect), web, mobile, and AI tools.",
        "sameAs": ["https://twitter.com/kliviq", "https://www.linkedin.com/company/117713997"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "KlivIQ Products & Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Seenzo",
                "url": "https://seenzo.in",
                "brand": { "@type": "Brand", "name": "KlivIQ" },
                "description": "AI Visibility scoring platform that scans and scores how visible your business is to ChatGPT, Gemini, and Perplexity across 6 categories, 0–100."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "KlivIQ Connect",
                "url": "https://www.kliviq.com/#contact",
                "brand": { "@type": "Brand", "name": "KlivIQ" },
                "description": "Customizable WhatsApp AI chatbot platform for Indian SMBs — bookings, reminders, broadcasts, and AI answers in 7 Indian languages including Tamil, Hindi, and Sanskrit."
              }
            }
          ]
        }
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KlivIQ",
        "url": "https://www.kliviq.com/"
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "KlivIQ Technologies",
        "url": "https://www.kliviq.com",
        "description": "KlivIQ helps businesses adopt AI and build high-performance software. AI consulting that actually ships, fractional CTO services, web, mobile, and AI tools. India-based, globally positioned.",
        "founder": { "@type": "Person", "name": "Sriram Ramkumar" },
        "areaServed": ["India", "Global"],
        "serviceType": ["AI Consulting", "Fractional CTO", "AI Visibility Scoring", "WhatsApp AI Chatbot Development", "Generative Engine Optimisation (GEO)", "Web Development", "Mobile App Development", "AI Tools"],
        "priceRange": "$$",
        "email": "hello@kliviq.com"
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": generalFaqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      }} />
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      {!isLoading && (
        <>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <div className="section-bg"><AboutSection /></div>
            <DeferredSection className="section-bg-alt"><ServicesSection /></DeferredSection>
            <DeferredSection className="section-bg"><ProductsSection /></DeferredSection>
            <DeferredSection className="section-bg-alt"><WhyKliviqSection /></DeferredSection>
            <DeferredSection className="section-bg-alt"><ProjectsSection /></DeferredSection>
            <DeferredSection className="section-bg-alt" minHeight={220}><TrustRow /></DeferredSection>
            <DeferredSection className="section-bg"><TestimonialsSection /></DeferredSection>
            <DeferredSection className="section-bg"><ProcessSection /></DeferredSection>
            <DeferredSection className="section-bg-alt"><PricingSection /></DeferredSection>
            <DeferredSection className="section-bg"><FaqSection /></DeferredSection>
            <DeferredSection className="section-bg-alt"><ContactSection /></DeferredSection>
            <DeferredSection className="section-bg"><FooterSection /></DeferredSection>
          </main>
          <ExitIntentCTA />
          <FloatingActions />
          <MobileBottomNav />
        </>
      )}
    </>
  );
};

export default Index;
