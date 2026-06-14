import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import ArticleCard from "@/components/blog/ArticleCard";
import InsightsCTA from "@/components/blog/InsightsCTA";
import AuthorBio from "@/components/blog/AuthorBio";
import { blogPosts, SRI_RAM } from "@/data/blog";

const SITE = "https://www.kliviq.com";

const BlogListPage = () => {
  const canonical = `${SITE}/blog`;
  const title = "KlivIQ Insights | AI, Technology & Business Strategy";
  const description =
    "Practical insights on AI, automation, technology leadership, business growth, Fractional CTO services and digital transformation.";

  const [featured, ...rest] = blogPosts;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: canonical },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "KlivIQ Insights",
    url: canonical,
    description,
    publisher: {
      "@type": "Organization",
      name: "KlivIQ Technologies",
      url: SITE,
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE}${p.path}`,
      datePublished: p.publishDate,
      author: { "@type": "Person", name: p.author.schemaName },
    })),
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Blog</span>
          </nav>

          <motion.p
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: "#4ADE80" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Insights
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            KlivIQ Insights
          </motion.h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            Technology, AI and business lessons for founders, business owners and growing companies.
          </p>

          {featured && <ArticleCard post={featured} featured />}

          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          {rest.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-muted-foreground">
                More articles coming soon. Subscribe to KlivIQ on LinkedIn for new insights.
              </p>
            </div>
          )}

          <InsightsCTA />

          <div className="mt-4">
            <AuthorBio author={SRI_RAM} />
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogListPage;
