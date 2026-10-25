import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import RedirectTo from "./pages/RedirectTo";
import { glossaryTerms } from "./data/glossary";
import { blogPosts } from "./data/blog";
import { catalogIndustries, catalogProducts, catalogServices } from "./data/catalog";

const page = (path: string | undefined, loader: () => Promise<{ default: React.ComponentType }>, entry: string, extra: Partial<RouteRecord> = {}): RouteRecord => ({
  ...(path === undefined ? { index: true } : { path }),
  lazy: async () => ({ Component: (await loader()).default }),
  entry,
  ...extra,
} as RouteRecord);

/** Old URL -> new URL. Mirrored as 301s in vercel.json. */
export const redirects: Record<string, string> = {
  portfolio: "/work",
  clinicping: "/products/clinicping",
  scopesnap: "/work",
  pitchdeck: "/work",
  "services/ai-consulting": "/services/ai-implementation",
  "services/ai-strategy": "/services/ai-implementation",
  "services/custom-app-development": "/services/web-mobile-development",
  "services/mvp-development": "/services/web-mobile-development",
};

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      page(undefined, () => import("./pages/Index"), "src/pages/Index.tsx"),
      page("products", () => import("./pages/ProductsIndex"), "src/pages/ProductsIndex.tsx"),
      page("products/:slug", () => import("./pages/ProductDetail"), "src/pages/ProductDetail.tsx", {
        getStaticPaths: () => catalogProducts.map((p) => `products/${p.slug}`),
      }),
      page("industries", () => import("./pages/IndustriesIndex"), "src/pages/IndustriesIndex.tsx"),
      page("industries/:slug", () => import("./pages/IndustryDetail"), "src/pages/IndustryDetail.tsx", {
        getStaticPaths: () => catalogIndustries.map((i) => `industries/${i.slug}`),
      }),
      page("services", () => import("./pages/ServicesIndex"), "src/pages/ServicesIndex.tsx"),
      page("services/:slug", () => import("./pages/ServicePage"), "src/pages/ServicePage.tsx", {
        getStaticPaths: () => catalogServices.map((s) => `services/${s.slug}`),
      }),
      page("pricing", () => import("./pages/Pricing"), "src/pages/Pricing.tsx"),
      page("work", () => import("./pages/Work"), "src/pages/Work.tsx"),
      page("about", () => import("./pages/About"), "src/pages/About.tsx"),
      page("contact", () => import("./pages/Contact"), "src/pages/Contact.tsx"),
      page("privacy-policy", () => import("./pages/PrivacyPolicy"), "src/pages/PrivacyPolicy.tsx"),
      page("terms", () => import("./pages/Terms"), "src/pages/Terms.tsx"),
      page("glossary", () => import("./pages/GlossaryIndex"), "src/pages/GlossaryIndex.tsx"),
      page("glossary/:slug", () => import("./pages/GlossaryTerm"), "src/pages/GlossaryTerm.tsx", {
        getStaticPaths: () => glossaryTerms.map((t) => `glossary/${t.slug}`),
      }),
      page("blog", () => import("./pages/BlogIndex"), "src/pages/BlogIndex.tsx"),
      page("blog/:slug", () => import("./pages/BlogPost"), "src/pages/BlogPost.tsx", {
        getStaticPaths: () => blogPosts.map((p) => `blog/${p.slug}`),
      }),
      ...Object.entries(redirects).map(([from, to]) => ({ path: from, element: <RedirectTo to={to} /> }) as RouteRecord),
      page("*", () => import("./pages/NotFound"), "src/pages/NotFound.tsx"),
    ],
  },
];
