import thumbSelfsame from "@/assets/thumb-selfsame.webp";
import shotSelfsame from "@/assets/portfolio-selfsame.webp";
import thumbFaco from "@/assets/thumb-faco.webp";
import thumbZeroRupees from "@/assets/thumb-zero-rupees.webp";
import thumbPitchDeck from "@/assets/thumb-pitchdeck.webp";
import thumbClinicPing from "@/assets/thumb-clinicping.webp";
import thumbMathavanTraders from "@/assets/thumb-mathavan-traders.asset.json";

export type PortfolioItem = {
  slug: string;
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
  metrics?: { value: string; label: string }[];
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "mathavan-traders",
    metrics: [
      { value: "2 days", label: "Designed and delivered" },
      { value: "2 languages", label: "Tamil and English" },
      { value: "2026", label: "Catalogue pricing" },
    ],
    name: "Mathavan Traders",
    tagline: "A bilingual fireworks catalogue built and launched in two days.",
    summary:
      "A fast, mobile-first catalogue for a Sivakasi fireworks business, helping customers browse searchable product categories, compare current pricing, build a cart-style selection and enquire directly in Tamil or English.",
    highlights: [
      "Designed, developed and delivered in two days",
      "Tamil and English browsing for local customers",
      "Searchable categories with current catalogue pricing",
      "Cart-style selection and direct enquiry flow",
    ],
    category: "Client Work · Ecommerce Catalogue",
    year: "2026",
    stack: ["React", "Vite", "Tailwind", "i18n"],
    href: "https://www.mathavantraders.com",
    external: true,
    ctaLabel: "Visit mathavantraders.com",
    thumb: thumbMathavanTraders.url,
    shot: thumbMathavanTraders.url,
    accent: "45 95% 55%",
  },
  {
    slug: "selfsame-therapy",
    metrics: [
      { value: "3 weeks", label: "Concept to live site" },
      { value: "6 pages", label: "Shipped with SEO" },
      { value: "100%", label: "Mobile-first responsive" },
    ],
    name: "Selfsame Therapy",
    tagline: "A calm home for a counselling practice built for NRIs.",
    summary:
      "Online counselling practice for Indians living abroad. We built a warm, culturally-aware brand site that explains the work without jargon and turns quiet visitors into free intro calls.",
    highlights: [
      "Brand-led design system with a soft, unhurried tone",
      "Services, approach, testimonials and about pages",
      "Free 15-minute call booking as the single conversion path",
      "Fast, accessible, fully responsive and SEO-ready",
    ],
    category: "Client Work · Brand Website",
    year: "2026",
    stack: ["React", "Vite", "Tailwind", "SEO"],
    href: "https://selfsametherapy.com",
    external: true,
    ctaLabel: "Visit selfsametherapy.com",
    thumb: thumbSelfsame,
    shot: shotSelfsame,
    accent: "160 60% 45%",
  },
  {
    slug: "faco",
    metrics: [
      { value: "1 week", label: "Design to launch" },
      { value: "<1s", label: "Mobile load time" },
      { value: "1 path", label: "Direct enquiry funnel" },
    ],
    name: "FACO — Fathima Coffee Works",
    tagline: "A Kodaikanal coffee roastery, online.",
    summary:
      "A real landing page for a speciality coffee store — product story, roast range and a clean path to enquire, designed to look as good on a phone in the hills as on a desktop.",
    highlights: [
      "Product-first storytelling for a small roastery",
      "Mobile-first layout with fast image delivery",
      "Direct enquiry and ordering path",
    ],
    category: "Client Work · Landing Page",
    year: "2025",
    stack: ["React", "Tailwind", "Vercel"],
    href: "https://facocoffee.com",
    external: true,
    ctaLabel: "Visit facocoffee.com",
    thumb: thumbFaco,
    shot: thumbFaco,
    accent: "28 80% 55%",
  },
  {
    slug: "zero-rupees",
    metrics: [
      { value: "1 weekend", label: "Idea to public launch" },
      { value: "0", label: "Signup steps to first order" },
    ],
    name: "Zero Rupees",
    tagline: "All the dopamine of online shopping. None of the bill.",
    summary:
      "A free fake-shopping experience built for the scroll-and-cart generation. Add to cart, check out, get the 'Order Placed' hit — spend zero rupees. No card, no signup friction.",
    highlights: [
      "Full cart and checkout simulation",
      "Zero-friction: no signup, no payment",
      "Built as a weekend experiment, shipped publicly",
    ],
    category: "Experiment",
    year: "2026",
    stack: ["React", "Vercel"],
    href: "https://zero-rupees.vercel.app/",
    external: true,
    ctaLabel: "Open Zero Rupees",
    thumb: thumbZeroRupees,
    shot: thumbZeroRupees,
    accent: "265 70% 60%",
  },
  {
    slug: "pitchdeck-ai",
    metrics: [
      { value: "10 slides", label: "Generated per idea" },
      { value: "6", label: "Indian languages" },
    ],
    name: "PitchDeckAI",
    tagline: "Investor-ready decks in six Indian languages.",
    summary:
      "Turns a single idea into a structured 10-slide investor pitch deck, generated in six Indian languages. Concept work exploring how far AI can take founder storytelling.",
    highlights: [
      "One-line idea to 10-slide narrative",
      "Six Indian languages out of the box",
      "Structured slide model, not freeform text",
    ],
    category: "Concept",
    year: "2025",
    stack: ["React", "OpenAI", "Tailwind"],
    href: "/pitchdeck",
    external: false,
    ctaLabel: "Open the prototype",
    thumb: thumbPitchDeck,
    shot: thumbPitchDeck,
    accent: "200 80% 55%",
  },
  {
    slug: "clinicping",
    metrics: [
      { value: "AI scoring", label: "No-show risk per booking" },
      { value: "1 dashboard", label: "For the whole front desk" },
    ],
    name: "ClinicPing",
    tagline: "Fewer no-shows, in the patient's own language.",
    summary:
      "A clinic operations dashboard with AI no-show prediction and multilingual patient messaging, so small practices stop losing revenue to empty appointment slots.",
    highlights: [
      "AI no-show risk scoring per appointment",
      "Multilingual reminders and follow-ups",
      "Single dashboard for front-desk teams",
    ],
    category: "Client Work · Product",
    year: "2025",
    stack: ["React", "Python", "AI"],
    href: "/clinicping",
    external: false,
    ctaLabel: "Open the prototype",
    thumb: thumbClinicPing,
    shot: thumbClinicPing,
    accent: "340 70% 58%",
  },
];
