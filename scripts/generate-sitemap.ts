// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { serviceLandingPages } from "../src/data/serviceLandingPages";
import { glossaryTerms } from "../src/data/glossary";
import { blogPosts } from "../src/data/blog";

const BASE_URL = "https://www.kliviq.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  ...serviceLandingPages.map((s) => ({
    path: s.path,
    changefreq: "monthly" as const,
    priority: "0.9",
  })),
  { path: "/products", changefreq: "monthly", priority: "0.9" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.9" },
  { path: "/scopesnap", changefreq: "monthly", priority: "0.8" },
  { path: "/clinicping", changefreq: "monthly", priority: "0.8" },
  { path: "/pitchdeck", changefreq: "monthly", priority: "0.8" },
  { path: "/glossary", changefreq: "monthly", priority: "0.7" },
  ...glossaryTerms.map((t) => ({
    path: t.path,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  ...blogPosts.map((p) => ({
    path: p.path,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
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
