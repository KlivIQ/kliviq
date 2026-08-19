import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import { serviceLandingPages } from "./data/serviceLandingPages";
import { glossaryTerms } from "./data/glossary";
import { blogPosts } from "./data/blog";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const m = await import("./pages/Index");
          return { Component: m.default };
        },
        entry: "src/pages/Index.tsx",
      },
      {
        path: "products",
        lazy: async () => {
          const m = await import("./pages/Products");
          return { Component: m.default };
        },
        entry: "src/pages/Products.tsx",
      },
      {
        path: "scopesnap",
        lazy: async () => {
          const m = await import("./pages/ScopeSnap");
          return { Component: m.default };
        },
        entry: "src/pages/ScopeSnap.tsx",
      },
      {
        path: "clinicping",
        lazy: async () => {
          const m = await import("./pages/ClinicPing");
          return { Component: m.default };
        },
        entry: "src/pages/ClinicPing.tsx",
      },
      {
        path: "pitchdeck",
        lazy: async () => {
          const m = await import("./pages/PitchDeckAI");
          return { Component: m.default };
        },
        entry: "src/pages/PitchDeckAI.tsx",
      },
      {
        path: "services/:slug",
        lazy: async () => {
          const m = await import("./pages/ServicePage");
          return { Component: m.default };
        },
        entry: "src/pages/ServicePage.tsx",
        getStaticPaths: () =>
          serviceLandingPages.map((s) => `services/${s.slug}`),
      },
      {
        path: "glossary",
        lazy: async () => {
          const m = await import("./pages/GlossaryIndex");
          return { Component: m.default };
        },
        entry: "src/pages/GlossaryIndex.tsx",
      },
      {
        path: "glossary/:slug",
        lazy: async () => {
          const m = await import("./pages/GlossaryTerm");
          return { Component: m.default };
        },
        entry: "src/pages/GlossaryTerm.tsx",
        getStaticPaths: () => glossaryTerms.map((t) => `glossary/${t.slug}`),
      },
      {
        path: "blog",
        lazy: async () => {
          const m = await import("./pages/BlogIndex");
          return { Component: m.default };
        },
        entry: "src/pages/BlogIndex.tsx",
      },
      {
        path: "blog/:slug",
        lazy: async () => {
          const m = await import("./pages/BlogPost");
          return { Component: m.default };
        },
        entry: "src/pages/BlogPost.tsx",
        getStaticPaths: () => blogPosts.map((p) => `blog/${p.slug}`),
      },
      {
        path: "*",
        lazy: async () => {
          const m = await import("./pages/NotFound");
          return { Component: m.default };
        },
        entry: "src/pages/NotFound.tsx",
      },
    ],
  },
];
