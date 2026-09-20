import { useEffect, useRef, useState } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { JsonLd } from "@/components/JsonLd";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

const SITE = "https://www.kliviq.com";

const PortfolioPanel = ({ item, index }: { item: PortfolioItem; index: number }) => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const reversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={item.slug}
      className="relative scroll-mt-28 py-20 md:py-28"
      aria-labelledby={`${item.slug}-title`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background: `radial-gradient(60% 45% at ${reversed ? "80%" : "20%"} 40%, hsl(${item.accent} / 0.18), transparent 70%)`,
        }}
      />
      <div
        className={`relative max-w-6xl mx-auto px-6 grid gap-10 lg:gap-16 items-center lg:grid-cols-2 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          className="relative rounded-3xl overflow-hidden glass"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: `0 30px 90px -40px hsl(${item.accent} / 0.55)` }}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              src={item.shot}
              alt={`${item.name} — ${item.tagline}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-top"
              style={{ scale, y }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border"
              style={{ color: `hsl(${item.accent})`, borderColor: `hsl(${item.accent} / 0.4)` }}
            >
              {item.category}
            </span>
            <span className="text-xs text-muted-foreground">{item.year}</span>
          </div>

          <h2 id={`${item.slug}-title`} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
            {item.name}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-5">{item.tagline}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">{item.summary}</p>

          <ul className="space-y-2.5 mb-7">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-foreground/80">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: `hsl(${item.accent})` }}
                />
                {h}
              </li>
            ))}
          </ul>

          {item.metrics && (
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {item.metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl px-4 py-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span
                      className="block text-xl md:text-2xl font-extrabold tracking-tight"
                      style={{ color: `hsl(${item.accent})` }}
                    >
                      {m.value}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {item.stack.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full glass text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm md:text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              style={{ background: `linear-gradient(90deg, hsl(${item.accent}), hsl(var(--secondary)))` }}
            >
              {item.ctaLabel}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              to={item.href}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm md:text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              style={{ background: `linear-gradient(90deg, hsl(${item.accent}), hsl(var(--secondary)))` }}
            >
              {item.ctaLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const canonical = `${SITE}/portfolio`;
  const title = "KlivIQ Portfolio | AI Products, Client Websites & Web App Projects";
  const description =
    "Selected KlivIQ work — Mathavan Traders, Selfsame Therapy, FACO, Zero Rupees, PitchDeckAI and ClinicPing. AI products, web apps and brand websites delivered in days or weeks.";

  const [active, setActive] = useState(portfolioItems[0].slug);

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
    portfolioItems.forEach((p) => {
      const el = document.getElementById(p.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
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

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "KlivIQ Portfolio",
          url: canonical,
          description,
          isPartOf: { "@type": "WebSite", name: "KlivIQ", url: `${SITE}/` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "KlivIQ Portfolio",
          itemListElement: portfolioItems.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            description: p.summary,
            url: p.external ? p.href : `${SITE}${p.href}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: canonical },
          ],
        }}
      />

      <Navbar />

      <main className="relative pt-32 md:pt-40">
        {/* Hero */}
        <section className="relative px-6 pb-10 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Portfolio
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Work that shipped.
              <br />
              <span className="gradient-text">Not slides about work.</span>
            </motion.h1>
            <motion.p
              className="mt-7 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Client websites, AI products and experiments — each one designed, built and delivered
              by the same senior team you talk to.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {portfolioItems.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm border transition-all duration-300 ${
                    active === p.slug
                      ? "text-foreground border-foreground/40 glass-strong"
                      : "text-muted-foreground border-foreground/10 hover:text-foreground"
                  }`}
                >
                  {p.name.split(" — ")[0]}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {portfolioItems.map((item, i) => (
          <PortfolioPanel key={item.slug} item={item} index={i} />
        ))}

        {/* CTA */}
        <section className="relative px-6 py-24">
          <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-10 md:p-14">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Want your project here next?</h2>
            <p className="text-muted-foreground mb-8">
              Fixed scope, fixed price, delivered in weeks. Start with a free 30-minute scoping call.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#contact"
                className="px-7 py-3.5 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
              >
                Book a Free Consultation
              </Link>
              <Link
                to="/products"
                className="px-7 py-3.5 rounded-full text-sm font-semibold glass hover:border-secondary/40 transition-colors"
              >
                Explore our products
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </>
  );
};

export default Portfolio;
