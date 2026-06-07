import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { glossaryTerms } from "@/data/glossary";

const SITE = "https://www.kliviq.com";

const GlossaryIndex = () => {
  const canonical = `${SITE}/glossary`;
  const title = "AI & Tech Glossary | KlivIQ";
  const description =
    "Plain-English definitions of AI, software, and startup terms — written by the team that builds with them.";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Glossary", item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Glossary</span>
          </nav>

          <motion.p
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: "#4ADE80" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Resources
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            KlivIQ Glossary
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-14">
            Plain-English definitions of the AI, software, and digital transformation terms we use every day — written for business leaders, not engineers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {glossaryTerms.map((t) => (
              <Link
                key={t.slug}
                to={t.path}
                className="group glass rounded-2xl p-6 hover:bg-foreground/5 transition-colors flex flex-col"
              >
                <h2 className="text-lg font-semibold mb-2 text-foreground">{t.term}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.shortDef}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                  Read definition <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default GlossaryIndex;
