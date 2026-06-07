import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { JsonLd } from "@/components/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { GlossaryTerm } from "@/data/glossary";

const SITE = "https://www.kliviq.com";

const glossarySchemas: Record<string, object> = {
  "fractional-cto": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "Fractional CTO",
    "description": "A Fractional CTO is a senior technology leader who works with a company part-time — typically 10 to 20 hours per week on a monthly retainer — providing CTO-level strategy, architecture decisions, team guidance, and hands-on execution without the cost of a full-time hire.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/fractional-cto"
  },
  "ai-consulting": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "AI Consulting",
    "description": "AI consulting is the practice of helping businesses identify, plan, and implement artificial intelligence solutions. An AI consultant analyses existing processes, recommends where AI creates the most value, and builds or integrates the tools to make it happen.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/ai-consulting"
  },
  "ai-implementation": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "AI Implementation",
    "description": "AI implementation is the process of deploying artificial intelligence tools into a business's existing workflows — including integration with current software, staff training, and ongoing monitoring. It is the execution phase that follows AI strategy.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/ai-implementation"
  },
  "mvp-development": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "MVP Development",
    "description": "MVP (Minimum Viable Product) development is the process of building the smallest functional version of a product that delivers core value to early users and generates learning for the next iteration.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/mvp-development"
  },
  "rag": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "RAG (Retrieval-Augmented Generation)",
    "alternateName": "Retrieval-Augmented Generation",
    "description": "RAG is an AI architecture pattern where a language model is given access to an external knowledge base at inference time. Instead of relying solely on its training data, the model retrieves relevant documents and uses them to generate more accurate, up-to-date responses.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/rag"
  },
  "ai-strategy": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "AI Strategy",
    "description": "An AI strategy is a structured plan that defines how an organisation will adopt, deploy, and govern artificial intelligence to achieve its business goals. It covers use case prioritisation, build-vs-buy decisions, data readiness, team capability, and success metrics.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/ai-strategy"
  },
  "llm": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "LLM (Large Language Model)",
    "alternateName": "Large Language Model",
    "description": "A Large Language Model (LLM) is a type of AI model trained on vast amounts of text data to understand and generate human language. LLMs like GPT-4, Claude, and Gemini power chatbots, code generation, document summarisation, and content creation.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/llm"
  },
  "workflow-automation": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "Workflow Automation",
    "description": "Workflow automation is the use of software to perform repetitive business tasks with minimal human intervention. Modern AI-powered workflow automation uses LLMs and intelligent agents to handle variable, judgment-requiring tasks.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/workflow-automation"
  },
  "custom-software-development": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "Custom Software Development",
    "description": "Custom software development is the process of designing and building software specifically for a client's unique requirements, rather than using off-the-shelf solutions.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/custom-software-development"
  },
  "digital-transformation": {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    "name": "Digital Transformation",
    "description": "Digital transformation is the process of integrating digital technology into all areas of a business to fundamentally change how it operates and delivers value to customers — including cloud infrastructure, process automation, and AI implementation.",
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "KlivIQ AI & Tech Glossary", "url": "https://www.kliviq.com/glossary" },
    "url": "https://www.kliviq.com/glossary/digital-transformation"
  }
};

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
      {glossarySchemas[term.slug] && <JsonLd data={glossarySchemas[term.slug]} />}

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
