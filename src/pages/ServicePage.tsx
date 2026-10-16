import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { faqSchema, ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import { ProductCard } from "@/components/site/Cards";
import { FinalCta } from "./Index";
import NotFound from "./NotFound";
import { useBooking } from "@/components/booking/BookingContext";
import { getCatalogService, SITE_URL } from "@/data/catalog";

const toNumber = (s: string) => Number(s.replace(/[^0-9]/g, "")) || undefined;

const ServicePage = () => {
  const { slug = "" } = useParams();
  const s = getCatalogService(slug);
  const { openBooking } = useBooking();
  if (!s) return <NotFound />;
  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];

  return (
    <SiteShell>
      <Seo
        title={`${s.name} | From ${s.priceInr} | KlivIQ`}
        description={`${s.summary} Starting from ${s.priceInr}.`}
        path={path}
        crumbs={crumbs}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.summary,
            serviceType: s.name,
            url: `${SITE_URL}${path}`,
            provider: ORG_REF,
            areaServed: ["IN", "Worldwide"],
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              ...(toNumber(s.priceInr) ? { price: toNumber(s.priceInr) } : {}),
              description: `Starting from ${s.priceInr}${s.priceNote ? `. ${s.priceNote}` : ""}`,
            },
          },
          faqSchema(s.faqs),
        ]}
      />
      <PageHero eyebrow="Service" title={s.tagline} lede={s.summary} crumbs={crumbs}>
        <button type="button" onClick={() => openBooking(`service-${s.slug}`)} className="btn-primary px-7 py-3.5 text-base">
          Book a call <ArrowRight className="h-4 w-4" />
        </button>
        <Link to="/pricing" className="btn-ghost px-7 py-3.5 text-base">See pricing</Link>
      </PageHero>

      <section className="pb-8">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">Starting from</p>
                <p className="mt-2 font-display text-4xl font-bold md:text-5xl">{s.priceInr}</p>
                <p className="mt-1 text-muted-foreground">International: {s.priceUsd}</p>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                {s.priceNote ? `${s.priceNote} ` : ""}Fixed price after scoping. 30/40/30 milestone payments with GST invoices.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">What you get</p>
            <h2 className="text-3xl font-bold md:text-5xl">Deliverables.</h2>
            <ul className="mt-8 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-lg"><Check className="mt-1.5 h-4 w-4 shrink-0 text-brand" />{d}</li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-5">
            {s.outcomes.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <div className="rounded-[1.75rem] border border-border bg-card p-7">
                  <h3 className="text-xl font-bold">{o.title}</h3>
                  <p className="mt-2 text-muted-foreground">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-4">Process</p><h2 className="mb-12 text-3xl font-bold md:text-5xl">How it runs.</h2></Reveal>
          <ol className={`grid gap-8 sm:grid-cols-2 ${s.process.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <li>
                  <span className="font-display text-5xl font-bold text-brand">0{i + 1}</span>
                  <h3 className="mt-4 text-xl font-bold">{p.step}</h3>
                  <p className="mt-2 text-muted-foreground">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {s.relatedProducts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container-x">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Related products</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {s.relatedProducts.map((p) => <ProductCard key={p} slug={p} />)}
            </div>
          </div>
        </section>
      )}

      <Faq items={s.faqs} />
      <FinalCta source={`service-${s.slug}-cta`} />
    </SiteShell>
  );
};

export default ServicePage;
