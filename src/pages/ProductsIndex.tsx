import SiteShell from "@/components/site/SiteShell";
import Seo, { ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/Cards";
import { FinalCta } from "./Index";
import { catalogProducts, SITE_URL } from "@/data/catalog";

const ProductsIndex = () => (
  <SiteShell>
    <Seo
      title="Products | Seenzo, KlivIQ Connect, KlivIQ TryOn, ClinicPing & Aacharam"
      description="KlivIQ's AI products: Seenzo AI visibility score, KlivIQ Connect WhatsApp automation in 7 Indian languages, KlivIQ TryOn saree virtual try-on, ClinicPing no-show prediction and the Aacharam Tamil ancestry app."
      path="/products"
      crumbs={[{ name: "Products", path: "/products" }]}
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "KlivIQ products",
          url: `${SITE_URL}/products`,
          publisher: ORG_REF,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: catalogProducts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/products/${p.slug}` })),
          },
        },
      ]}
    />
    <PageHero
      eyebrow="Products"
      title={<>AI products for <span className="gradient-text">real Indian problems.</span></>}
      lede="Built in Chennai, used by businesses and families. Three are live, one is in pilot and one is on the way."
      crumbs={[{ name: "Products", path: "/products" }]}
    />
    <section className="pb-24">
      <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalogProducts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06} className="h-full">
            <ProductCard slug={p.slug} />
          </Reveal>
        ))}
      </div>
    </section>
    <FinalCta source="products-index" />
  </SiteShell>
);

export default ProductsIndex;
