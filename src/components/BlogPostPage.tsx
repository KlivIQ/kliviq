import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { JsonLd } from "@/components/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedResources from "@/components/blog/RelatedResources";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleCTA from "@/components/blog/ArticleCTA";
import { blogPosts, type BlogPost } from "@/data/blog";
import { shareImageTags } from "@/components/site/ShareImageMeta";

const SITE = "https://www.kliviq.com";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  const canonical = post.seo.canonical;
  const heroAbs = post.heroImage.startsWith("http") ? post.heroImage : `${SITE}${post.heroImage}`;
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    image: [heroAbs],
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: post.author.schemaName,
      jobTitle: post.author.jobTitle,
      url: post.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: "KlivIQ Technologies",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/kliviq-og.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: post.title,
    url: canonical,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable"],
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{post.seo.title}</title>
        <meta name="description" content={post.seo.description} />
        <link rel="canonical" href={canonical} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content={post.author.schemaName} />
        <meta property="article:published_time" content={post.publishDate} />
        {post.updatedDate && <meta property="article:modified_time" content={post.updatedDate} />}
        <meta property="article:author" content={post.author.schemaName} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.seo.ogTitle} />
        <meta property="og:description" content={post.seo.ogDescription} />
        <meta property="og:url" content={canonical} />
        {shareImageTags(post.path, post.seo.title)}
        <meta property="og:site_name" content="KlivIQ Technologies" />
        <meta name="twitter:site" content="@kliviq" />
        <meta name="twitter:title" content={post.seo.ogTitle} />
        <meta name="twitter:description" content={post.seo.ogDescription} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      </Helmet>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "KlivIQ Technologies",
          url: SITE,
          sameAs: ["https://twitter.com/kliviq", "https://www.linkedin.com/company/117713997"],
        }}
      />

      <Navbar />

      <main className="pt-28 pb-24">
        {/* Hero */}
        <header className="px-6">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground truncate max-w-[60vw]">{post.title}</span>
            </nav>

            <motion.p
              className="text-sm uppercase tracking-widest mb-5"
              style={{ color: "#4ADE80" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {post.category}
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-8 leading-[1.05] tracking-tight max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {post.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground mb-10">
              <span className="text-foreground font-medium">{post.author.displayName}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTimeMin} min read
              </span>
              <span className="ml-auto">
                <ShareButtons url={canonical} title={post.title} />
              </span>
            </div>

            <div className="rounded-3xl overflow-hidden glass-strong mb-12">
              <img
                src={post.heroImage}
                alt={post.heroAlt}
                width={1920}
                height={1080}
                loading="eager"
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </header>

        {/* Body + TOC */}
        <div className="px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_240px] gap-12">
            <article className="min-w-0">
              {post.body.map((block, i) => {
                if (block.type === "intro") {
                  return (
                    <p
                      key={i}
                      className={`text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none ${block.speakable ? "speakable" : ""}`}
                      style={block.speakable ? { /* speakable marker */ } : undefined}
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      id={block.id}
                      className="text-2xl md:text-3xl font-bold mt-12 mb-5 scroll-mt-28 leading-tight"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "p") {
                  return (
                    <p
                      key={i}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5"
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul key={i} className="list-disc pl-6 mb-6 space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed">
                      {block.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <blockquote
                      key={i}
                      className={`my-8 border-l-4 pl-6 py-2 italic text-lg md:text-xl text-foreground/90 leading-relaxed ${block.speakable ? "speakable" : ""}`}
                      style={{ borderColor: "#4ADE80" }}
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }
                return null;
              })}

              {/* Tags */}
              <div className="mt-12 mb-12 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full glass text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* FAQs */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {post.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <AuthorBio author={post.author} />

              <div className="mt-16">
                {post.relatedResources && <RelatedResources items={post.relatedResources} />}
              </div>

              <RelatedArticles posts={related} />

              <ArticleCTA />
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={post.toc} />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default BlogPostPage;
