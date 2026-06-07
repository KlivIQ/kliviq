import { Head as Helmet } from "vite-react-ssg";
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
import type { GlossaryTerm } from "@/data/glossary";

const SITE = "https://www.kliviq.com";

const GlossaryTermPage = ({ term }: { term: GlossaryTerm }) => {
  const canonical = `${SITE}${term.path}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: term.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE}/glossary` },
      { "@type": "ListItem", position: 3, name: term.term, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{term.metaTitle}</title>
        <meta name="description" content={term.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={term.metaTitle} />
        <meta property="og:description" content={term.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={term.metaTitle} />
        <meta name="twitter:description" content={term.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/glossary" className="hover:text-foreground transition-colors">Glossary</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{term.term}</span>
          </nav>

          <motion.p
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: "#4ADE80" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Glossary
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {term.h1}
          </motion.h1>

          <article className="space-y-5 mb-12">
            {term.definition.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {p}
              </p>
            ))}
          </article>

          <section className="glass rounded-2xl p-7 md:p-9 mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>
              How KlivIQ uses this
            </p>
            <p className="text-foreground/90 leading-relaxed mb-5 text-lg">{term.kliviqUse}</p>
            <Link
              to={term.kliviqLink.path}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80"
            >
              {term.kliviqLink.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {term.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-lg">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="text-center glass-strong rounded-2xl p-10 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need help with {term.term.toLowerCase()}?</h2>
            <p className="text-muted-foreground mb-7 max-w-xl mx-auto">
              Talk to a senior KlivIQ engineer about how this applies to your business.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
            >
              Talk to a KlivIQ expert <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default GlossaryTermPage;
