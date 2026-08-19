import { seenzoLogo, connectLogo, tryonLogo, aacharamLogo } from "./productLogos";

export interface ProductQA {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  value: string;
  category: string;
  status: "live" | "waitlist";
  statusLabel: string;
  accent: string;
  logo: string;
  href: string;
  cta: string;
  benefits: { label: string; detail: string }[];
  keywords: string[];
  appCategory: string;
  qa: ProductQA[];
}

export const products: Product[] = [
  {
    slug: "seenzo",
    name: "Seenzo",
    tagline: "AI Visibility scoring",
    value: "See exactly how visible your business is to ChatGPT, Gemini and Perplexity.",
    category: "AI Visibility / GEO",
    status: "live",
    statusLabel: "Live",
    accent: "#F59E0B",
    logo: seenzoLogo,
    href: "https://seenzo.in",
    cta: "Open Seenzo",
    benefits: [
      { label: "0–100 visibility score", detail: "Across 6 scoring categories" },
      { label: "Scan in under 5 minutes", detail: "No setup, no install" },
      { label: "Fix list, not a report", detail: "Ranked actions you can ship" },
      { label: "Tracks every major engine", detail: "ChatGPT, Gemini, Perplexity" },
    ],
    keywords: ["AI visibility scoring", "generative engine optimisation", "GEO tool", "ChatGPT visibility"],
    appCategory: "BusinessApplication",
    qa: [
      {
        q: "What is Seenzo?",
        a: "Seenzo is KlivIQ's AI Visibility platform. It scans how ChatGPT, Gemini and Perplexity describe your business, scores it 0–100 across six categories, and gives you a ranked list of fixes.",
      },
      {
        q: "Who is Seenzo for?",
        a: "Any business that wants to be recommended by AI assistants — agencies, SaaS companies, clinics, D2C brands and local service businesses.",
      },
    ],
  },
  {
    slug: "kliviq-connect",
    name: "KlivIQ Connect",
    tagline: "WhatsApp AI chatbot",
    value: "Your own AI chatbot on WhatsApp, trained on your business, live in 7 days.",
    category: "Conversational AI",
    status: "live",
    statusLabel: "Live",
    accent: "#3B82F6",
    logo: connectLogo,
    href: "/#contact",
    cta: "Book a Connect demo",
    benefits: [
      { label: "Bookings & reminders", detail: "Handled end to end on WhatsApp" },
      { label: "7 Indian languages", detail: "Tamil, Hindi, Sanskrit and more" },
      { label: "Broadcasts that convert", detail: "Offers, updates, follow-ups" },
      { label: "Live in 7 working days", detail: "Fully set up for your business" },
    ],
    keywords: ["WhatsApp AI chatbot India", "WhatsApp automation for SMB", "AI customer support chatbot"],
    appCategory: "BusinessApplication",
    qa: [
      {
        q: "What is KlivIQ Connect?",
        a: "KlivIQ Connect is a customisable WhatsApp AI chatbot for Indian SMBs. It answers customer questions, takes bookings, sends reminders and runs broadcasts in seven Indian languages.",
      },
      {
        q: "Who is KlivIQ Connect for?",
        a: "Clinics, salons, CA firms, coaching centres and D2C brands that run most of their customer conversations on WhatsApp.",
      },
    ],
  },
  {
    slug: "kliviq-tryon",
    name: "KlivIQ TryOn",
    tagline: "AI virtual try-on for sarees",
    value: "An online trial room for saree stores — customers see it on themselves before they buy.",
    category: "AI for Ecommerce",
    status: "live",
    statusLabel: "Live",
    accent: "#A855F7",
    logo: tryonLogo,
    href: "https://kliviq-tryon.vercel.app",
    cta: "Try KlivIQ TryOn",
    benefits: [
      { label: "One photo, instant try-on", detail: "No app, no studio shoot" },
      { label: "Fewer returns", detail: "Buyers stop guessing the drape" },
      { label: "Drops into any store", detail: "Shopify, WooCommerce, custom" },
      { label: "Built for sarees first", detail: "Drape, fall and pleats respected" },
    ],
    keywords: ["AI saree try on", "virtual try on for ecommerce", "online trial room", "AI fashion try on India"],
    appCategory: "WebApplication",
    qa: [
      {
        q: "What is KlivIQ TryOn?",
        a: "KlivIQ TryOn is an AI virtual trial room for online saree stores. A shopper uploads one photo and sees how the saree looks on them before buying.",
      },
      {
        q: "Can KlivIQ TryOn be added to my store?",
        a: "Yes — it embeds into any ecommerce store, including Shopify, WooCommerce and custom-built storefronts.",
      },
    ],
  },
  {
    slug: "aacharam",
    name: "Aacharam",
    tagline: "Find your roots",
    value: "A roots and ancestry app for the Tamil community, with AI that finds your relatives for you.",
    category: "Community / Ancestry",
    status: "waitlist",
    statusLabel: "Waitlist",
    accent: "#D97706",
    logo: aacharamLogo,
    href: "/#contact",
    cta: "Join the waitlist",
    benefits: [
      { label: "Build your family tree", detail: "Names, places, kovil, kulam" },
      { label: "AI relative matching", detail: "Surfaces relatives already inside" },
      { label: "Search long-lost family", detail: "By village, temple or lineage" },
      { label: "Made for Tamil families", detail: "Traditions recorded properly" },
    ],
    keywords: ["Tamil ancestry app", "family tree India", "find long lost relatives", "Tamil roots and lineage"],
    appCategory: "LifestyleApplication",
    qa: [
      {
        q: "What is Aacharam?",
        a: "Aacharam is an ancestry app built for the Tamil community. You record your family details, search for relatives by village, temple or lineage, and AI matching surfaces relatives already on the platform.",
      },
      {
        q: "When does Aacharam launch?",
        a: "Aacharam is in build. Join the waitlist and you'll be invited as soon as the first release opens.",
      },
    ],
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
