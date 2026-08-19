import { useEffect, useState } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { JsonLd } from "@/components/JsonLd";
import { products } from "@/data/products";

const SITE = "https://www.kliviq.com";

const hexToRgba = (hex: string, alpha: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const Products = () => {
  const canonical = `${SITE}/products`;
  const title = "KlivIQ Products | AI Visibility, WhatsApp AI Chatbot, Virtual Try-On";
  const description =
    "KlivIQ's AI products: Seenzo AI visibility scoring, KlivIQ Connect WhatsApp AI chatbot, KlivIQ TryOn virtual saree try-on, and Aacharam Tamil ancestry app.";

  const [active, setActive] = useState(products[0].slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    products.forEach((p) => {
      const el = document.getElementById(p.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const activeAccent = products.find((p) => p.slug === active)?.accent ?? products[0].accent;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "KlivIQ Products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: p.href.startsWith("http") ? p.href : `${canonical}#${p.slug}`,
    })),
  };

  const softwareSchemas = products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: p.appCategory,
    operatingSystem: "Web",
    url: p.href.startsWith("http") ? p.href : `${canonical}#${p.slug}`,
    description: p.value,
    brand: { "@type": "Brand", name: "KlivIQ" },
    keywords: p.keywords.join(", "),
    featureList: p.benefits.map((b) => `${b.label} — ${b.detail}`),
    offers: { "@type": "Offer", availability: p.status === "live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder" },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: products.flatMap((p) =>
      p.qa.map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      })),
    ),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: canonical },
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      {softwareSchemas.map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}
      <JsonLd data={faqSchema} />

      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[420px] pointer-events-none transition-colors duration-700"
            style={{ background: `radial-gradient(60% 60% at 50% 0%, ${hexToRgba(activeAccent, 0.16)} 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto text-center">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8 flex items-center gap-2 justify-center">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Products</span>
            </nav>
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: "#4ADE80" }}>
              KlivIQ Products
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              AI products that ship,
              <span className="block" style={{ color: "#4ADE80" }}>not AI that sits in a slide deck</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI visibility scoring, WhatsApp AI chatbots, virtual try-on for ecommerce, and a roots app for the Tamil community.
            </p>
          </div>
        </section>

        {/* Sticky product switcher */}
        <div className="sticky top-16 md:top-20 z-30 px-4 py-3 glass-strong border-y border-border/40">
          <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto no-scrollbar justify-start md:justify-center">
            {products.map((p) => {
              const isActive = p.slug === active;
              return (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="flex items-center gap-2 shrink-0 px-3.5 py-2 rounded-full text-sm font-semibold border transition-all duration-300"
                  style={{
                    borderColor: isActive ? p.accent : "transparent",
                    background: isActive ? hexToRgba(p.accent, 0.14) : "transparent",
                    color: isActive ? p.accent : undefined,
                  }}
                >
                  <img src={p.logo} alt="" width={20} height={20} className="w-5 h-5 rounded-md" loading="lazy" decoding="async" />
                  {p.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Product panels */}
        {products.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            className="scroll-mt-32 px-6 py-20 md:py-28 border-b border-border/30 relative overflow-hidden"
          >
            <div
              className="absolute pointer-events-none rounded-full blur-[130px] opacity-40"
              style={{
                background: p.accent,
                width: 480,
                height: 480,
                top: i % 2 === 0 ? -120 : "auto",
                bottom: i % 2 === 0 ? "auto" : -160,
                left: i % 2 === 0 ? -120 : "auto",
                right: i % 2 === 0 ? "auto" : -120,
              }}
              aria-hidden="true"
            />
            <motion.div
              className="relative max-w-5xl mx-auto grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 md:gap-14 items-center"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={72}
                    height={72}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl transition-transform duration-500 hover:scale-105"
                    style={{ boxShadow: `0 0 40px ${hexToRgba(p.accent, 0.45)}` }}
                  />
                  <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">{p.name}</h2>
                    <p className="text-sm text-muted-foreground">{p.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border"
                    style={{ color: p.accent, borderColor: hexToRgba(p.accent, 0.5), background: hexToRgba(p.accent, 0.1) }}
                  >
                    {p.statusLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border border-border/60 text-muted-foreground">
                    {p.category}
                  </span>
                </div>

                <p className="text-lg md:text-xl font-medium mb-8">{p.value}</p>

                {p.href.startsWith("http") ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-bold text-background transition-transform duration-300 hover:scale-[1.04]"
                    style={{ background: p.accent, boxShadow: `0 0 36px ${hexToRgba(p.accent, 0.5)}` }}
                  >
                    {p.cta}
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                ) : (
                  <Link
                    to={p.href}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-bold text-background transition-transform duration-300 hover:scale-[1.04]"
                    style={{ background: p.accent, boxShadow: `0 0 36px ${hexToRgba(p.accent, 0.5)}` }}
                  >
                    {p.cta}
                    <Sparkles className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {p.benefits.map((b) => (
                  <div
                    key={b.label}
                    className="glass rounded-2xl p-4 border transition-colors duration-300"
                    style={{ borderColor: hexToRgba(p.accent, 0.25) }}
                  >
                    <p className="font-semibold mb-1">{b.label}</p>
                    <p className="text-sm text-muted-foreground">{b.detail}</p>
                  </div>
                ))}
                <div className="sm:col-span-2 space-y-3 mt-1">
                  {p.qa.map((qa) => (
                    <div key={qa.q}>
                      <h3 className="text-sm font-semibold">{qa.q}</h3>
                      <p className="text-sm text-muted-foreground">{qa.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        ))}

        <section className="px-6 py-20 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Want one of these built for your business?</h2>
          <p className="text-muted-foreground mb-8">Book a free 30-minute scoping call. No pitch, no commitment.</p>
          <Link
            to="/#contact"
            className="inline-block px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
          >
            Book a free consultation
          </Link>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Products;
