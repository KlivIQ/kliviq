import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServiceLandingContent } from "@/data/serviceLandingPages";

const SITE = "https://kliviq.lovable.app";

interface Props {
  content: ServiceLandingContent;
}

const ServiceLandingPage = ({ content }: Props) => {
  const canonical = `${SITE}${content.path}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/#services` },
      { "@type": "ListItem", position: 3, name: content.navLabel, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={content.metaTitle} />
        <meta name="twitter:description" content={content.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#services" className="hover:text-foreground transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{content.navLabel}</span>
          </nav>

          {/* Hero */}
          <motion.p
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: "#4ADE80" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {content.eyebrow}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {content.h1}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {content.intro}
          </motion.p>

          {/* Body sections */}
          <article className="space-y-14">
            {content.sections.map((sec, i) => (
              <section key={i}>
                <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-foreground">
                  {sec.h}
                </h2>
                <div className="space-y-4">
                  {sec.body.map((p, j) => (
                    <p key={j} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          {/* Proof block */}
          <section className="mt-20 glass rounded-2xl p-8 md:p-10">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>
              {content.proof.title}
            </p>
            <p className="text-foreground/90 leading-relaxed mb-8 text-lg">
              {content.proof.body}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.proof.metrics.map((m, i) => (
                <div key={i} className="rounded-xl border border-glass-border/40 p-5 bg-glass/30">
                  <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "#4ADE80" }}>
                    {m.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {content.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-lg">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="mt-20 text-center glass-strong rounded-2xl p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta.headline}</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">{content.cta.body}</p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
            >
              Book a free scoping call <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ServiceLandingPage;
