import SiteShell from "@/components/site/SiteShell";
import Seo, { ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { IndustryCard } from "@/components/site/Cards";
import { FinalCta } from "./Index";
import { catalogIndustries, SITE_URL } from "@/data/catalog";

const IndustriesIndex = () => (
  <SiteShell>
    <Seo
      title="Industries | AI for Clinics, CA Firms, Saree & D2C Retail and Manufacturing | KlivIQ"
      description="How KlivIQ helps healthcare clinics, CA and professional services firms, saree and D2C retailers and manufacturers with AI products, WhatsApp automation, AI visibility and web development."
      path="/industries"
      crumbs={[{ name: "Industries", path: "/industries" }]}
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Industries KlivIQ serves",
          url: `${SITE_URL}/industries`,
          publisher: ORG_REF,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: catalogIndustries.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: `${SITE_URL}/industries/${x.slug}` })),
          },
        },
      ]}
    />
    <PageHero
      eyebrow="Industries"
      title={<>Deep in a few industries, <span className="gradient-text">not shallow in all.</span></>}
      lede="We focus on sectors where we know the daily work, the customers and the languages they speak."
      crumbs={[{ name: "Industries", path: "/industries" }]}
    />
    <section className="pb-24">
      <div className="container-x grid gap-5 sm:grid-cols-2">
        {catalogIndustries.map((x, i) => (
          <Reveal key={x.slug} delay={i * 0.06} className="h-full"><IndustryCard slug={x.slug} /></Reveal>
        ))}
      </div>
    </section>
    <FinalCta source="industries-index" />
  </SiteShell>
);

export default IndustriesIndex;
