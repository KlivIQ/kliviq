import { Head } from "vite-react-ssg";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/data/catalog";

type Crumb = { name: string; path: string };

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  crumbs?: Crumb[];
  schema?: object[];
}

/** Per-page head + JSON-LD. Rendered into static HTML at build time. */
const Seo = ({ title, description, path, type = "website", crumbs, schema = [] }: SeoProps) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const breadcrumb =
    crumbs && crumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.path}`,
          })),
        }
      : null;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      {breadcrumb && <JsonLd data={breadcrumb} />}
      {schema.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
    </>
  );
};

export default Seo;

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const ORG_REF = { "@type": "Organization", name: "KlivIQ Technologies", url: `${SITE_URL}/` };
