import { useState, useEffect } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { JsonLd } from "@/components/JsonLd";
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
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KlivIQ",
        "url": "https://www.kliviq.com/",
        "logo": "https://www.kliviq.com/kliviq-og.png",
        "description": "KlivIQ helps businesses adopt AI and build high-performance software. AI consulting that actually ships, fractional CTO services, web, mobile, and AI tools.",
        "sameAs": ["https://twitter.com/kliviq", "https://www.linkedin.com/company/kliviq"]
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
        "serviceType": ["AI Consulting", "Fractional CTO", "Web Development", "Mobile App Development", "AI Tools"],
        "priceRange": "$$",
        "email": "hello@kliviq.com"
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"What is AI implementation?","acceptedAnswer":{"@type":"Answer","text":"We analyse your business processes, identify where AI creates the most value, then build and integrate the tools — chatbots, automation workflows, intelligent dashboards — directly into how you work. You see ROI in weeks, not quarters."}},
          {"@type":"Question","name":"What is a Fractional CTO?","acceptedAnswer":{"@type":"Answer","text":"A senior technology leader who works with you part-time — typically 10–20 hours/week on retainer. If you're making technology decisions without a senior tech person in the room, you need one. We strategy and build — not just advise."}},
          {"@type":"Question","name":"How do you deliver in weeks when others take months?","acceptedAnswer":{"@type":"Answer","text":"AI-assisted development, focused sprints, no agency overhead. No account managers, no briefing chains. You work directly with the person building."}},
          {"@type":"Question","name":"Do you work with Indian and global clients?","acceptedAnswer":{"@type":"Answer","text":"Yes — separate INR and USD pricing, Razorpay for India, Wise/Payoneer internationally. Same quality, same standards."}},
          {"@type":"Question","name":"How does pricing work?","acceptedAnswer":{"@type":"Answer","text":"Fixed price agreed upfront. 30% to start, 40% mid-project, 30% on delivery. No surprises."}},
          {"@type":"Question","name":"Do you sign NDAs?","acceptedAnswer":{"@type":"Answer","text":"Immediately and without question."}},
          {"@type":"Question","name":"What technologies do you use?","acceptedAnswer":{"@type":"Answer","text":"AI: OpenAI, Claude, Gemini, LangChain, n8n. Web: React, Next.js, Node.js. Mobile: Flutter. Backend: Python, PostgreSQL, Firebase. Cloud: AWS, Vercel, Google Cloud."}},
          {"@type":"Question","name":"How do I get started?","acceptedAnswer":{"@type":"Answer","text":"Book a free 30-minute scoping call. No pitch, no commitment — just an honest conversation."}}
        ]
      }} />
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
