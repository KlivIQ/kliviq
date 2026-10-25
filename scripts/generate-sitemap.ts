// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { catalogProducts, catalogServices, catalogIndustries } from "../src/data/catalog";
import { glossaryTerms } from "../src/data/glossary";
import { blogPosts } from "../src/data/blog";

const BASE_URL = "https://kliviq.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "monthly", priority: "0.9" },
  ...catalogProducts.map((p) => ({ path: `/products/${p.slug}`, changefreq: "monthly" as const, priority: "0.9" })),
  { path: "/industries", changefreq: "monthly", priority: "0.8" },
  ...catalogIndustries.map((i) => ({ path: `/industries/${i.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  ...catalogServices.map((s) => ({ path: `/services/${s.slug}`, changefreq: "monthly" as const, priority: "0.9" })),
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/work", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "yearly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/glossary", changefreq: "monthly", priority: "0.6" },
  ...glossaryTerms.map((t) => ({ path: t.path, changefreq: "monthly" as const, priority: "0.5" })),
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  ...blogPosts.map((p) => ({ path: p.path, changefreq: "monthly" as const, priority: "0.6" })),
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
