import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { faqSchema, ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import { ProductCard, ServiceCard } from "@/components/site/Cards";
import { FinalCta } from "./Index";
import NotFound from "./NotFound";
import { useBooking } from "@/components/booking/BookingContext";
import { getCatalogIndustry, SITE_URL } from "@/data/catalog";

const IndustryDetail = () => {
  const { slug = "" } = useParams();
  const ind = getCatalogIndustry(slug);
  const { openBooking } = useBooking();
  if (!ind) return <NotFound />;
  const path = `/industries/${ind.slug}`;
  const crumbs = [
    { name: "Industries", path: "/industries" },
    { name: ind.name, path },
  ];

  return (
    <SiteShell>
      <Seo
        title={`AI & Technology for ${ind.name} | KlivIQ`}
        description={ind.summary}
        path={path}
        crumbs={crumbs}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `KlivIQ for ${ind.name}`,
            description: ind.summary,
            url: `${SITE_URL}${path}`,
            publisher: ORG_REF,
            about: { "@type": "Thing", name: ind.name },
            keywords: ind.keywords.join(", "),
            mentions: [
              ...ind.products.map((p) => ({ "@type": "SoftwareApplication", url: `${SITE_URL}/products/${p}` })),
              ...ind.services.map((s) => ({ "@type": "Service", url: `${SITE_URL}/services/${s}` })),
            ],
          },
          faqSchema(ind.faqs),
        ]}
      />
      <PageHero eyebrow={ind.name} title={ind.headline} lede={ind.summary} crumbs={crumbs}>
        <button type="button" onClick={() => openBooking(`industry-${ind.slug}`)} className="btn-primary px-7 py-3.5 text-base">
          Talk to us <ArrowRight className="h-4 w-4" />
        </button>
      </PageHero>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">The everyday problems</p>
            <h2 className="text-3xl font-bold md:text-5xl">What slows {ind.name.split(" ")[0].toLowerCase() === "ca" ? "firms" : "teams"} down.</h2>
            <ul className="mt-8 space-y-4">
              {ind.challenges.map((c) => (
                <li key={c} className="border-l-2 border-primary pl-4 text-lg">{c}</li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-5 lg:col-span-7">
            {ind.solutions.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="rounded-[1.75rem] border border-border bg-card p-7">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-4">Products</p><h2 className="mb-10 text-3xl font-bold md:text-5xl">Products that fit.</h2></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ind.products.map((p) => <ProductCard key={p} slug={p} />)}
          </div>
          <Reveal><p className="eyebrow mb-4 mt-20">Services</p><h2 className="mb-10 text-3xl font-bold md:text-5xl">Services that help.</h2></Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {ind.services.map((s) => <ServiceCard key={s} slug={s} />)}
          </div>
        </div>
      </section>

      <Faq items={ind.faqs} />
      <FinalCta source={`industry-${ind.slug}-cta`} />
    </SiteShell>
  );
};

export default IndustryDetail;
