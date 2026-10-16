import SiteShell from "@/components/site/SiteShell";
import Seo, { ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/Cards";
import { FinalCta } from "./Index";
import { catalogServices, SITE_URL } from "@/data/catalog";

const ServicesIndex = () => (
  <SiteShell>
    <Seo
      title="Services | AI Implementation, AI Visibility (GEO), Web & Mobile, Fractional CTO | KlivIQ"
      description="KlivIQ services with clear starting prices: AI implementation from ₹75,000, AI visibility (GEO) from ₹25,000, web and mobile development from ₹75,000, and fractional CTO from ₹40,000 a month."
      path="/services"
      crumbs={[{ name: "Services", path: "/services" }]}
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "KlivIQ services",
          url: `${SITE_URL}/services`,
          publisher: ORG_REF,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: catalogServices.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `${SITE_URL}/services/${s.slug}` })),
          },
        },
      ]}
    />
    <PageHero
      eyebrow="Services"
      title={<>Built by senior hands, <span className="gradient-text">priced up front.</span></>}
      lede="Four ways to work with us. Every engagement has a fixed scope and a clear starting price."
      crumbs={[{ name: "Services", path: "/services" }]}
    />
    <section className="pb-24">
      <div className="container-x grid gap-5 sm:grid-cols-2">
        {catalogServices.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06} className="h-full"><ServiceCard slug={s.slug} /></Reveal>
        ))}
      </div>
    </section>
    <FinalCta source="services-index" />
  </SiteShell>
);

export default ServicesIndex;
