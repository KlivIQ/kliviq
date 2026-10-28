import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle, Quote } from "lucide-react";
import Seo, { ORG_REF } from "@/components/site/Seo";
import SiteShell from "@/components/site/SiteShell";
import Reveal from "@/components/site/Reveal";
import LivingCircuit from "@/components/hero/LivingCircuit";
import { useLang } from "@/i18n/LanguageContext";
import { useBooking } from "@/components/booking/BookingContext";
import { catalogIndustries, catalogProducts, catalogServices, SITE_URL, STATUS_LABEL } from "@/data/catalog";
import { portfolioItems } from "@/data/portfolio";
import { BUSINESS_PROFILES, professionalServiceSchema } from "@/data/business";
import { trackEvent } from "@/lib/analytics";

const WA = "https://wa.me/919840497937?text=Hi%20KlivIQ%2C%20I%27d%20like%20to%20discuss%20a%20project.";

const Hero = () => {
  const { t } = useLang();
  const { openBooking } = useBooking();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="container-x relative z-10 grid items-center gap-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {t.home.heroEyebrow}
          </p>
          <h1 className="max-w-5xl text-[2.6rem] font-bold leading-[0.98] sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem]">
            <span className="block pb-2">{t.home.heroTitle1}</span>
            <span className="gradient-text block pb-2">{t.home.heroTitle2}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t.home.heroLede}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={() => openBooking("home-hero")} className="btn-primary px-7 py-3.5 text-base">
              {t.home.heroPrimary} <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/products" className="btn-ghost px-7 py-3.5 text-base">
              {t.home.heroSecondary}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <LivingCircuit />
        </div>
      </div>
    </section>
  );
};

const SectionHead = ({ eyebrow, title, lede, action }: { eyebrow: string; title: string; lede?: string; action?: React.ReactNode }) => (
  <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
    <div className="max-w-3xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">{title}</h2>
      {lede && <p className="mt-5 max-w-xl text-lg text-muted-foreground">{lede}</p>}
    </div>
    {action}
  </Reveal>
);

const Products = () => {
  const { t } = useLang();
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead eyebrow={t.home.productsEyebrow} title={t.home.productsTitle} lede={t.home.productsLede} />
            <Link to="/products" className="btn-ghost -mt-4">
              {t.nav.allProducts} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="space-y-6 lg:col-span-7">
          {catalogProducts.filter((p) => p.slug !== "paramparai").map((p, i) => (
            <div key={p.slug} className="sticky [top:var(--stack-top-m)] lg:[top:var(--stack-top)]" style={{ "--stack-top-m": `${80 + i * 12}px`, "--stack-top": `${110 + i * 18}px` } as React.CSSProperties}>
              <Reveal delay={0.05}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group relative block overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-7 transition-all hover:-translate-y-1 hover:shadow-lift md:p-10"
                >
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.12] blur-3xl transition-opacity group-hover:opacity-25"
                    style={{ background: `hsl(${p.hue})` }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <img src={p.logo} alt={`${p.name} logo`} loading="lazy" className="h-14 w-14 rounded-2xl object-cover md:h-16 md:w-16" />
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.home.status[p.status] ?? STATUS_LABEL[p.status]}
                    </span>
                  </div>
                  <h3 className="relative mt-8 text-2xl font-bold md:text-4xl">{p.name}</h3>
                  <p className="relative mt-2 text-lg font-medium text-foreground/80">{t.home.productCards[p.slug]?.tagline ?? p.tagline}</p>
                  <p className="relative mt-4 max-w-xl text-muted-foreground">{t.home.productCards[p.slug]?.summary ?? p.summary}</p>
                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {t.home.learnMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const { t } = useLang();
  return (
    <section className="bg-surface py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow={t.home.industriesEyebrow}
          title={t.home.industriesTitle}
          action={<Link to="/industries" className="btn-ghost">{t.nav.allIndustries} <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {catalogIndustries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.06}>
              <Link
                to={`/industries/${ind.slug}`}
                className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-card p-8 transition-all hover:shadow-lift"
              >
                <div className="pointer-events-none absolute inset-0 kolam-grid opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                <span className="relative font-display text-sm font-semibold text-muted-foreground">0{i + 1}</span>
                <div className="relative">
                  <h3 className="text-2xl font-bold md:text-3xl">{ind.name}</h3>
                  <p className="mt-2 text-muted-foreground">{ind.short}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {ind.products.map((slug) => {
                      const p = catalogProducts.find((x) => x.slug === slug);
                      return p ? (
                        <span key={slug} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{p.name}</span>
                      ) : null;
                    })}
                  </div>
                </div>
                <ArrowUpRight className="absolute right-8 top-8 h-6 w-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useLang();
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow={t.home.servicesEyebrow}
          title={t.home.servicesTitle}
          action={<Link to="/services" className="btn-ghost">{t.nav.services} <ArrowRight className="h-4 w-4" /></Link>}
        />
        <ul className="border-t border-border">
          {catalogServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <li className="border-b border-border">
                <Link to={`/services/${s.slug}`} className="group grid items-center gap-3 py-8 md:grid-cols-12 md:gap-6 md:py-10">
                  <span className="font-display text-sm text-muted-foreground md:col-span-1">0{i + 1}</span>
                  <h3 className="text-2xl font-bold transition-colors group-hover:text-brand md:col-span-5 md:text-4xl">{s.name}</h3>
                  <p className="text-muted-foreground md:col-span-6">{s.short}</p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Work = () => {
  const { t } = useLang();
  const picks = portfolioItems.filter((p) => ["mathavan-traders", "sri-aishwarya-sarees", "selfsame-therapy"].includes(p.slug));
  return (
    <section className="bg-surface py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow={t.home.workEyebrow}
          title={t.home.workTitle}
          action={<Link to="/work" className="btn-ghost">{t.home.viewAllWork} <ArrowRight className="h-4 w-4" /></Link>}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {picks.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08}>
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
                  <img
                    src={w.thumb}
                    alt={`${w.name} website`}
                    loading="lazy"
                    width={1200}
                    height={720}
                    className="aspect-[5/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">{w.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{w.tagline}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="py-24 md:py-36">
      <div className="container-x" ref={ref}>
        <SectionHead eyebrow={t.home.processEyebrow} title={t.home.processTitle} />
        <div className="relative">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
          <motion.div style={{ scaleX }} className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-primary md:block" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {t.home.processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <li className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-display text-sm font-semibold">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

const QuoteBlock = () => {
  const { t } = useLang();
  const item = t.testimonials.items[1] ?? t.testimonials.items[0];
  if (!item) return null;
  return (
    <section className="pb-24 md:pb-36">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto h-10 w-10 text-brand" />
          <p className="eyebrow mt-6 justify-center">{t.home.quoteEyebrow}</p>
          <blockquote className="mt-6 line-clamp-5 font-display text-2xl font-medium leading-snug md:text-3xl">
            {item.quote}
          </blockquote>
          <p className="mt-6 font-semibold">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.title}</p>
          <Link to="/about#recommendations" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            {t.home.readMore} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export const FinalCta = ({ source = "final-cta" }: { source?: string }) => {
  const { t } = useLang();
  const { openBooking } = useBooking();
  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-20 text-center text-background md:px-16 md:py-28">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
          <h2 className="relative mx-auto max-w-3xl text-4xl font-bold leading-[1.02] md:text-6xl">{t.home.ctaTitle}</h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg opacity-75">{t.home.ctaLede}</p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => openBooking(source)} className="btn-brand px-7 py-3.5 text-base">
              {t.nav.bookCall} <ArrowRight className="h-4 w-4" />
            </button>
            <a href={WA} onClick={() => trackEvent("whatsapp_click", { location: source })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-7 py-3.5 text-base font-semibold transition-colors hover:border-background/70">
              <MessageCircle className="h-4 w-4" /> {t.home.ctaWhatsapp}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const Index = () => (
  <SiteShell>
    <Seo
      title="KlivIQ | AI Products & Implementation in India"
      description="KlivIQ builds AI products (Seenzo, KlivIQ Connect, KlivIQ TryOn, ClinicPing, Paramparai) and delivers AI implementation, AI visibility (GEO), web and mobile development and fractional CTO services for growing businesses."
      path="/"
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "KlivIQ Technologies",
          alternateName: "KlivIQ",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/kliviq-og.png`,
          email: "hello@kliviq.com",
          founder: { "@type": "Person", name: "Sriram Ramkumar" },
          address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
          sameAs: BUSINESS_PROFILES,
          makesOffer: catalogServices.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}` },
          })),
        },
        professionalServiceSchema(ORG_REF),
        { "@context": "https://schema.org", "@type": "WebSite", name: "KlivIQ", url: `${SITE_URL}/`, publisher: ORG_REF },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "KlivIQ products",
          itemListElement: catalogProducts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/products/${p.slug}`,
            name: p.name,
          })),
        },
      ]}
    />
    <Hero />
    <Products />
    <Industries />
    <Services />
    <Work />
    <Process />
    <QuoteBlock />
    <FinalCta />
  </SiteShell>
);

export default Index;
