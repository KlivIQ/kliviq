import { useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { faqSchema, ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import { IndustryCard, ProductCard } from "@/components/site/Cards";
import { FinalCta } from "./Index";
import NotFound from "./NotFound";
import TryOnPhoneDemo from "@/components/products/TryOnPhoneDemo";
import ProductHeroDemo from "@/components/products/ProductHeroDemo";
import { glowStyle } from "@/components/site/Cards";
import { useLang } from "@/i18n/LanguageContext";
import { useBooking } from "@/components/booking/BookingContext";
import { catalogProducts, getCatalogProduct, SITE_URL, STATUS_LABEL } from "@/data/catalog";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const p = getCatalogProduct(slug);
  const { openBooking } = useBooking();
  const { tr, loc } = useLang();
  if (!p) return <NotFound />;
  const lp = loc(p);

  const path = `/products/${p.slug}`;
  const crumbs = [
    { name: "Products", path: "/products" },
    { name: p.name, path },
  ];

  const cta = p.primaryCta.href ? (
    <a href={p.primaryCta.href} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3.5 text-base">
      {lp.primaryCta.label} <ArrowUpRight className="h-4 w-4" />
    </a>
  ) : (
    <button
      type="button"
      onClick={() => openBooking(p.primaryCta.action === "waitlist" ? `waitlist-${p.slug}` : `product-${p.slug}`)}
      className="btn-primary px-7 py-3.5 text-base"
    >
      {lp.primaryCta.label} <ArrowRight className="h-4 w-4" />
    </button>
  );

  const others = catalogProducts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <SiteShell>
      <Seo
        title={`${p.name} | ${p.tagline.replace(/\.$/, "")} | KlivIQ`}
        description={p.summary}
        path={path}
        type="product"
        crumbs={crumbs}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.name,
            description: p.summary,
            applicationCategory: p.appCategory,
            operatingSystem: "Web",
            url: `${SITE_URL}${path}`,
            ...(p.externalUrl ? { sameAs: [p.externalUrl] } : {}),
            keywords: p.keywords.join(", "),
            publisher: ORG_REF,
            brand: { "@type": "Brand", name: "KlivIQ" },
          },
          faqSchema(p.faqs),
        ]}
      />
      <PageHero
        eyebrow={`${tr(STATUS_LABEL[p.status])} · ${tr("Product")}`}
        title={
          <span className="flex flex-col gap-6">
            <img src={p.logo} alt={`${p.name} logo`} className="h-16 w-16 rounded-2xl object-cover md:h-20 md:w-20" />
            <span>{p.name}</span>
          </span>
        }
        lede={<><span className="block font-semibold text-foreground">{lp.tagline}</span><span className="mt-3 block">{lp.summary}</span></>}
        crumbs={crumbs}
        aside={p.slug === "tryon" ? <TryOnPhoneDemo /> : <ProductHeroDemo slug={p.slug} hue={p.hue} />}
      >
        {p.hidePrimaryCta ? null : cta}
      </PageHero>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x grid gap-5 sm:grid-cols-2">
          {lp.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="h-full rounded-[1.75rem] border border-border bg-card p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="mt-6 text-2xl font-bold">{f.title}</h2>
                <p className="mt-2 text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">{tr("How it works")}</p>
            <h2 className="text-3xl font-bold md:text-5xl">{tr("Three steps to value.")}</h2>
            <ol className="mt-10 space-y-6">
              {lp.howItWorks.map((s, i) => (
                <li key={s} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border font-display font-semibold">{i + 1}</span>
                  <p className="pt-2 text-lg">{s}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">{tr("Who it is for")}</p>
            <ul className="mt-6 space-y-3">
              {lp.forWho.map((w) => (
                <li key={w} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 font-medium">
                  <Check className="h-4 w-4 text-brand" /> {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {p.industries.length > 0 && (
        <section className="bg-surface py-20 md:py-28">
          <div className="container-x">
            <Reveal><p className="eyebrow mb-4">{tr("Industries")}</p><h2 className="mb-10 text-3xl font-bold md:text-5xl">{tr("Where {name} fits.").replace("{name}", p.name)}</h2></Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {p.industries.map((s) => <IndustryCard key={s} slug={s} />)}
            </div>
          </div>
        </section>
      )}

      <Faq items={p.faqs} />

      <section className="pb-20">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">{tr("More from KlivIQ")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => <ProductCard key={o.slug} slug={o.slug} />)}
          </div>
        </div>
      </section>
      <FinalCta source={`product-${p.slug}-cta`} />
    </SiteShell>
  );
};

export default ProductDetail;
