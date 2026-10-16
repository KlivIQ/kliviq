import thumbSelfsame from "@/assets/thumb-selfsame.webp";
import shotSelfsame from "@/assets/portfolio-selfsame.webp";
import thumbFaco from "@/assets/thumb-faco.webp";
import thumbZeroRupees from "@/assets/thumb-zero-rupees.webp";
import thumbClinicPing from "@/assets/thumb-clinicping.webp";
import thumbMathavanTraders from "@/assets/thumb-mathavan-traders.webp";
import thumbSriAishwarya from "@/assets/thumb-sri-aishwarya.webp";

export type WorkKind = "ai" | "web";

export type PortfolioItem = {
  slug: string;
  kind: WorkKind;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  category: string;
  year: string;
  stack: string[];
  href: string;
  external: boolean;
  ctaLabel: string;
  thumb: string;
  shot: string;
  accent: string;
  /** Only verified facts. */
  metrics?: { value: string; label: string }[];
  experiment?: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "mathavan-traders",
    kind: "web",
    metrics: [{ value: "2 days", label: "Designed and delivered" }],
    name: "Mathavan Traders",
    tagline: "A bilingual fireworks catalogue built and launched in two days.",
    summary:
      "A fast, mobile-first catalogue for a Sivakasi fireworks business. Customers browse searchable categories, compare current prices, build a selection and enquire directly in Tamil or English.",
    highlights: [
      "Designed, developed and delivered in two days",
      "Tamil and English browsing for local customers",
      "Searchable categories with current catalogue pricing",
      "Cart-style selection and direct enquiry flow",
    ],
    category: "Web Design · Ecommerce Catalogue",
    year: "2026",
    stack: ["React", "Vite", "Tailwind", "i18n"],
    href: "https://www.mathavantraders.com",
    external: true,
    ctaLabel: "Visit mathavantraders.com",
    thumb: thumbMathavanTraders,
    shot: thumbMathavanTraders,
    accent: "45 95% 50%",
  },
  {
    slug: "sri-aishwarya-sarees",
    kind: "web",
    name: "Sri Aishwarya Sarees",
    tagline: "An online home for a handloom saree house.",
    summary:
      "An ecommerce store for a 'temple of silk cottons' selling Kanjivaram silks, silk cottons, 10-yard sarees and dance sarees to customers in India and abroad, with multi-currency browsing and festive campaigns.",
    highlights: [
      "Category-led storefront for a large handloom range",
      "Multi-currency shopping for overseas customers",
      "Campaign banners for festive sales",
      "WhatsApp chat for quick customer questions",
    ],
    category: "Web Design · Ecommerce Store",
    year: "2025",
    stack: ["WooCommerce", "WordPress", "Payments"],
    href: "https://sriaishwaryasarees.com",
    external: true,
    ctaLabel: "Visit sriaishwaryasarees.com",
    thumb: thumbSriAishwarya,
    shot: thumbSriAishwarya,
    accent: "12 80% 52%",
  },
  {
    slug: "selfsame-therapy",
    kind: "web",
    name: "Selfsame Therapy",
    tagline: "A calm home for a counselling practice built for NRIs.",
    summary:
      "An online counselling practice for Indians living abroad. A warm, culturally aware brand site that explains the work without jargon and turns quiet visitors into free intro calls.",
    highlights: [
      "Brand-led design system with a soft, unhurried tone",
      "Services, approach, testimonials and about pages",
      "Free intro call booking as the single conversion path",
      "Fast, accessible, responsive and search-ready",
    ],
    category: "Web Design · Brand Website",
    year: "2026",
    stack: ["React", "Vite", "Tailwind", "SEO"],
    href: "https://selfsametherapy.com",
    external: true,
    ctaLabel: "Visit selfsametherapy.com",
    thumb: thumbSelfsame,
    shot: shotSelfsame,
    accent: "160 60% 40%",
  },
  {
    slug: "faco",
    kind: "web",
    name: "FACO Coffee",
    tagline: "A Kodaikanal coffee roastery, online.",
    summary:
      "A landing page for a speciality coffee store: product story, roast range and a clean path to enquire, designed to look as good on a phone in the hills as on a desktop.",
    highlights: [
      "Product-first storytelling for a small roastery",
      "Mobile-first layout with fast image delivery",
      "Direct enquiry and ordering path",
    ],
    category: "Web Design · Landing Page",
    year: "2025",
    stack: ["React", "Tailwind", "Vercel"],
    href: "https://facocoffee.com",
    external: true,
    ctaLabel: "Visit facocoffee.com",
    thumb: thumbFaco,
    shot: thumbFaco,
    accent: "28 80% 50%",
  },
  {
    slug: "zero-rupees",
    kind: "web",
    experiment: true,
    name: "Zero Rupees",
    tagline: "All the fun of online shopping. None of the bill.",
    summary:
      "A playful fake-shopping site: add to cart, check out and get the 'Order placed' moment while spending zero rupees. No card and no signup.",
    highlights: [
      "Full cart and checkout simulation",
      "No signup and no payment",
      "Built as a weekend experiment and shipped publicly",
    ],
    category: "Experiment",
    year: "2026",
    stack: ["React", "Vercel"],
    href: "https://zero-rupees.vercel.app/",
    external: true,
    ctaLabel: "Open Zero Rupees",
    thumb: thumbZeroRupees,
    shot: thumbZeroRupees,
    accent: "150 40% 40%",
  },
  {
    slug: "clinicping",
    kind: "ai",
    name: "ClinicPing",
    tagline: "Fewer no-shows, in the patient's own language.",
    summary:
      "A clinic operations dashboard with AI no-show prediction and multilingual patient reminders, so small practices stop losing revenue to empty slots. Currently in pilot.",
    highlights: [
      "AI no-show risk flag per appointment",
      "Multilingual reminders and follow-ups",
      "One dashboard for front-desk teams",
    ],
    category: "AI & Products · Pilot",
    year: "2025",
    stack: ["React", "Python", "AI"],
    href: "/products/clinicping",
    external: false,
    ctaLabel: "See ClinicPing",
    thumb: thumbClinicPing,
    shot: thumbClinicPing,
    accent: "174 60% 36%",
  },
];
