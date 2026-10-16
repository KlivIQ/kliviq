// Single source of truth for products, services and industries.
// Pages, navigation, structured data and the sitemap all read from here.
import { seenzoLogo, connectLogo, tryonLogo, aacharamLogo } from "./productLogos";
const clinicpingThumb = "/products/clinicping.webp";

export const SITE_URL = "https://www.kliviq.com";

export type QA = { q: string; a: string };

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type ProductStatus = "live" | "pilot" | "soon";

export interface CatalogProduct {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProductStatus;
  logo: string;
  /** HSL triple, used for small accents only */
  hue: string;
  externalUrl?: string;
  primaryCta: { label: string; href?: string; action?: "booking" | "waitlist" };
  features: { title: string; body: string }[];
  howItWorks: string[];
  forWho: string[];
  industries: string[];
  appCategory: string;
  keywords: string[];
  faqs: QA[];
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  pilot: "Pilot",
  soon: "Coming soon",
};

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "seenzo",
    name: "Seenzo",
    tagline: "Your AI visibility score.",
    summary:
      "Seenzo checks how ChatGPT, Gemini and Perplexity talk about your business, gives you a score from 0 to 100 across six areas, and hands you a ranked list of fixes.",
    status: "live",
    logo: seenzoLogo,
    hue: "38 92% 50%",
    externalUrl: "https://seenzo.in",
    primaryCta: { label: "Open Seenzo", href: "https://seenzo.in" },
    features: [
      { title: "One clear score", body: "A 0–100 visibility score across six categories, so you know exactly where you stand." },
      { title: "Fixes, not a PDF", body: "A ranked list of changes you can ship this week, ordered by impact." },
      { title: "Every major assistant", body: "Checks answers from ChatGPT, Gemini and Perplexity side by side." },
      { title: "Minutes, not weeks", body: "No install and no setup. Enter your site and get results the same session." },
    ],
    howItWorks: [
      "Enter your website and the questions your customers actually ask.",
      "Seenzo asks the AI assistants and reads how they describe you and your competitors.",
      "You get a score, the gaps behind it and a prioritised fix list.",
    ],
    forWho: ["Clinics and healthcare practices", "CA and professional firms", "D2C and retail brands", "Agencies and SaaS teams"],
    industries: ["healthcare-clinics", "ca-professional-services", "retail-sarees-d2c", "manufacturing"],
    appCategory: "BusinessApplication",
    keywords: ["AI visibility score", "generative engine optimisation tool", "GEO tool India", "ChatGPT visibility check"],
    faqs: [
      { q: "What is Seenzo?", a: "Seenzo is KlivIQ's AI visibility tool. It scores how visible and accurately described your business is inside ChatGPT, Gemini and Perplexity, and lists the fixes that will move the score." },
      { q: "How is this different from SEO?", a: "SEO is about ranking in search results. Seenzo measures whether AI assistants mention and recommend you when someone asks them directly. The two overlap, but the signals are different." },
      { q: "Where can I try it?", a: "Seenzo is live at seenzo.in." },
    ],
  },
  {
    slug: "connect",
    name: "KlivIQ Connect",
    tagline: "WhatsApp automation and an AI assistant that speaks your customer's language.",
    summary:
      "KlivIQ Connect puts an AI assistant on your WhatsApp number. It answers questions, takes bookings, sends reminders and runs broadcasts in seven Indian languages, trained on your own business.",
    status: "live",
    logo: connectLogo,
    hue: "217 91% 55%",
    primaryCta: { label: "Book a Connect demo", action: "booking" },
    features: [
      { title: "Seven Indian languages", body: "Tamil, Hindi, English and more, so customers can write the way they speak." },
      { title: "Bookings and reminders", body: "Appointments, confirmations and follow-ups handled end to end inside WhatsApp." },
      { title: "Trained on your business", body: "Answers come from your prices, policies and FAQs, not generic internet text." },
      { title: "Broadcasts that get read", body: "Offers and updates sent on the app your customers already open every day." },
    ],
    howItWorks: [
      "We map your common customer questions, bookings and follow-ups.",
      "We train the assistant on your business and connect it to your WhatsApp number.",
      "You go live, review conversations and we tune it as you grow.",
    ],
    forWho: ["Clinics and diagnostic centres", "CA firms and consultants", "Saree stores and D2C brands", "Manufacturers handling dealer queries"],
    industries: ["healthcare-clinics", "ca-professional-services", "retail-sarees-d2c", "manufacturing"],
    appCategory: "BusinessApplication",
    keywords: ["WhatsApp AI chatbot India", "WhatsApp automation for business", "Tamil WhatsApp chatbot", "AI customer support WhatsApp"],
    faqs: [
      { q: "What is KlivIQ Connect?", a: "KlivIQ Connect is a WhatsApp automation platform with an AI assistant for Indian businesses. It handles customer questions, bookings, reminders and broadcasts in seven Indian languages." },
      { q: "Does it use my existing WhatsApp number?", a: "It runs on an official WhatsApp Business number. We help you set it up, including moving an existing business number where possible." },
      { q: "Which languages does it support?", a: "Seven Indian languages, including Tamil, Hindi and English." },
    ],
  },
  {
    slug: "tryon",
    name: "KlivIQ TryOn",
    tagline: "An AI trial room for online saree stores.",
    summary:
      "KlivIQ TryOn lets a shopper upload one photo and see how a saree looks on them before they buy. It plugs into any online store and respects drape, fall and pleats.",
    status: "live",
    logo: tryonLogo,
    hue: "345 65% 42%",
    externalUrl: "https://kliviq-tryon.vercel.app",
    primaryCta: { label: "Try KlivIQ TryOn", href: "https://kliviq-tryon.vercel.app" },
    features: [
      { title: "One photo, instant preview", body: "No app download and no studio shoot. The shopper sees the saree on themselves in seconds." },
      { title: "Built for sarees first", body: "Tuned for drape, fall and pleats rather than generic western garments." },
      { title: "Works with your store", body: "Embeds into Shopify, WooCommerce or a custom storefront." },
      { title: "Confidence before checkout", body: "Shoppers can judge colour and drape on themselves instead of guessing." },
    ],
    howItWorks: [
      "Add the TryOn button to your product pages.",
      "The shopper uploads a photo and picks a saree.",
      "They see a realistic preview and continue to checkout.",
    ],
    forWho: ["Online saree stores", "Handloom and silk brands", "Boutiques selling on Shopify or WooCommerce"],
    industries: ["retail-sarees-d2c"],
    appCategory: "WebApplication",
    keywords: ["AI saree try on", "virtual try on for ecommerce", "online trial room India", "saree virtual try on Shopify"],
    faqs: [
      { q: "What is KlivIQ TryOn?", a: "KlivIQ TryOn is an AI virtual trial room for online saree stores. Shoppers upload a photo and preview the saree on themselves before buying." },
      { q: "Can I add it to my Shopify store?", a: "Yes. It embeds into Shopify, WooCommerce and custom-built storefronts." },
    ],
  },
  {
    slug: "clinicping",
    name: "ClinicPing",
    tagline: "A clinic dashboard that predicts no-shows before they happen.",
    summary:
      "ClinicPing gives the front desk one view of the day, flags appointments likely to be missed using AI, and sends reminders in the patient's own language.",
    status: "pilot",
    logo: clinicpingThumb,
    hue: "174 60% 36%",
    primaryCta: { label: "Join the pilot", action: "booking" },
    features: [
      { title: "No-show risk per booking", body: "Each appointment gets a risk flag so staff know who to call first." },
      { title: "One screen for the front desk", body: "Today's schedule, confirmations and follow-ups in a single dashboard." },
      { title: "Reminders in the patient's language", body: "Multilingual WhatsApp and SMS reminders that patients actually read." },
      { title: "Built with clinics", body: "Shaped during the pilot with working front-desk teams." },
    ],
    howItWorks: [
      "Connect your appointment list or upload it daily.",
      "ClinicPing scores each booking for no-show risk.",
      "Staff confirm high-risk slots early and refill gaps.",
    ],
    forWho: ["Dental and specialty clinics", "Physiotherapy and diagnostic centres", "Multi-doctor practices"],
    industries: ["healthcare-clinics"],
    appCategory: "MedicalApplication",
    keywords: ["clinic no-show prediction", "clinic management dashboard India", "patient reminder software", "AI for clinics"],
    faqs: [
      { q: "What is ClinicPing?", a: "ClinicPing is a clinic operations dashboard from KlivIQ with AI no-show prediction and multilingual patient reminders. It is currently in pilot." },
      { q: "Can my clinic join the pilot?", a: "Yes. Book a call and we will check fit and set up a pilot for your clinic." },
    ],
  },
  {
    slug: "aacharam",
    name: "Aacharam",
    tagline: "Find your roots. Keep your traditions.",
    summary:
      "Aacharam is a roots and ancestry app for the Tamil community. Record your family, village, kovil and kulam, and let AI surface relatives who are already on the platform.",
    status: "soon",
    logo: aacharamLogo,
    hue: "28 80% 45%",
    primaryCta: { label: "Join the waitlist", action: "waitlist" },
    features: [
      { title: "Your family tree", body: "Names, places, kovil and kulam, recorded the way Tamil families remember them." },
      { title: "AI relative matching", body: "Suggests possible relatives already on Aacharam based on shared details." },
      { title: "Search by village or temple", body: "Find family by native place, kula deivam or lineage." },
      { title: "Traditions kept properly", body: "Space for customs, rituals and stories alongside the tree." },
    ],
    howItWorks: [
      "Join the waitlist.",
      "Get an invite when the first release opens.",
      "Build your tree and see who you are connected to.",
    ],
    forWho: ["Tamil families in India and abroad", "Anyone tracing native place or lineage"],
    industries: [],
    appCategory: "LifestyleApplication",
    keywords: ["Tamil ancestry app", "Tamil family tree", "find relatives by native place", "kulam and kovil family tree"],
    faqs: [
      { q: "What is Aacharam?", a: "Aacharam is an upcoming ancestry app for the Tamil community. You record family details and AI matching suggests relatives already on the platform." },
      { q: "When does it launch?", a: "Aacharam is in build. Join the waitlist to be invited when the first release opens." },
    ],
  },
];

export const getCatalogProduct = (slug: string) => catalogProducts.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Services (Fractional CTO intentionally last)                        */
/* ------------------------------------------------------------------ */

export interface CatalogService {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  priceInr: string;
  priceUsd: string;
  priceNote?: string;
  deliverables: string[];
  outcomes: { title: string; body: string }[];
  process: { step: string; body: string }[];
  relatedProducts: string[];
  keywords: string[];
  faqs: QA[];
}

export const catalogServices: CatalogService[] = [
  {
    slug: "ai-implementation",
    name: "AI Implementation",
    short: "Put AI to work inside your business.",
    tagline: "From idea to a working AI system in weeks.",
    summary:
      "We find the processes where AI saves real time or money, then build and launch the assistants, automations and internal tools that do the work. Fixed scope, fixed price.",
    priceInr: "₹75,000",
    priceUsd: "$2,000",
    deliverables: [
      "AI assistants and chatbots trained on your data",
      "Workflow automation across email, WhatsApp, sheets and CRMs",
      "Document reading, summarising and data extraction",
      "Integrations with OpenAI, Gemini and Claude",
      "Knowledge bases your team can search in plain language",
    ],
    outcomes: [
      { title: "Less manual work", body: "Repetitive steps handed to software that runs every day without reminders." },
      { title: "Faster replies", body: "Customers and staff get answers in seconds instead of waiting in a queue." },
      { title: "Clear ownership", body: "You own the code, the prompts and the data. No lock-in." },
    ],
    process: [
      { step: "Discover", body: "One working session to map the processes worth automating." },
      { step: "Scope", body: "A fixed-price proposal with a clear list of what ships." },
      { step: "Build", body: "Weekly demos so you see progress, not status reports." },
      { step: "Launch", body: "Go live, train your team and hand over documentation." },
    ],
    relatedProducts: ["connect", "clinicping"],
    keywords: ["AI implementation services India", "AI automation for business", "AI consulting India", "custom AI chatbot development"],
    faqs: [
      { q: "How long does an AI implementation take?", a: "Most projects go live in four to six weeks, depending on scope and integrations." },
      { q: "What does it cost?", a: "AI implementation projects start from ₹75,000 in India or $2,000 for international clients, quoted as a fixed price after scoping." },
      { q: "Do we own what you build?", a: "Yes. Code, prompts and data belong to you." },
    ],
  },
  {
    slug: "ai-visibility",
    name: "AI Visibility (GEO)",
    short: "Get recommended by ChatGPT, Gemini and Perplexity.",
    tagline: "Make AI assistants know, trust and recommend you.",
    summary:
      "Generative engine optimisation (GEO) makes sure AI assistants describe your business accurately and mention you when customers ask. We audit with Seenzo, fix your site, content and structured data, and track the change.",
    priceInr: "₹25,000",
    priceUsd: "On request",
    priceNote: "Ongoing monitoring, subscriptions and third-party tools are billed separately.",
    deliverables: [
      "Seenzo visibility audit across the major AI assistants",
      "Structured data and metadata fixes on every key page",
      "Answer-ready content for the questions customers ask",
      "Entity and citation clean-up across listings and profiles",
      "Before and after visibility report",
    ],
    outcomes: [
      { title: "Accurate answers", body: "AI assistants describe what you do, where and for whom, correctly." },
      { title: "More mentions", body: "Clearer signals make it easier for assistants to cite and recommend you." },
      { title: "Measured, not guessed", body: "Seenzo scores before and after so you can see what changed." },
    ],
    process: [
      { step: "Audit", body: "Run Seenzo and review how assistants currently describe you." },
      { step: "Fix", body: "Ship the technical, content and listing changes in priority order." },
      { step: "Re-score", body: "Measure again and report the difference." },
    ],
    relatedProducts: ["seenzo"],
    keywords: ["generative engine optimisation India", "GEO services", "AI visibility agency", "get recommended by ChatGPT"],
    faqs: [
      { q: "What is GEO?", a: "Generative engine optimisation (GEO) is the work of making AI assistants like ChatGPT, Gemini and Perplexity understand, trust and recommend your business." },
      { q: "How much does AI visibility work cost?", a: "AI visibility projects start from ₹25,000. Ongoing monitoring, subscriptions and third-party tools are charged separately." },
      { q: "Is this the same as SEO?", a: "It builds on good SEO, but focuses on the signals AI assistants use when they answer questions directly." },
    ],
  },
  {
    slug: "web-mobile-development",
    name: "Web & Mobile Development",
    short: "Fast, beautiful websites and apps that convert.",
    tagline: "Websites and apps designed to load fast and sell.",
    summary:
      "We design and build marketing sites, catalogues, web platforms and mobile apps. Every build is mobile-first, multilingual where it matters, and ready for search and AI assistants from day one.",
    priceInr: "₹75,000",
    priceUsd: "$2,000",
    priceNote: "Mobile app MVPs start from ₹2,50,000 / $5,000.",
    deliverables: [
      "Brand websites and landing pages",
      "Product catalogues in Tamil, Hindi and English",
      "Web platforms and customer portals",
      "iOS and Android app MVPs",
      "SEO, structured data and analytics set up at launch",
    ],
    outcomes: [
      { title: "Looks premium on a phone", body: "Designed for the screen most of your customers use." },
      { title: "Found by search and AI", body: "Clean metadata and structured data built in, not bolted on." },
      { title: "Easy to grow", body: "Modern stack your next developer will thank you for." },
    ],
    process: [
      { step: "Brief", body: "Understand the business, the audience and the one action that matters." },
      { step: "Design", body: "A clear visual direction before a line of code." },
      { step: "Build", body: "Weekly previews on a live link." },
      { step: "Launch", body: "Domain, analytics, search setup and handover." },
    ],
    relatedProducts: ["tryon"],
    keywords: ["website design company India", "web development Chennai", "mobile app MVP development", "multilingual website Tamil"],
    faqs: [
      { q: "How much does a website cost?", a: "Websites and web platforms start from ₹75,000 in India or $2,000 internationally. Mobile app MVPs start from ₹2,50,000 or $5,000." },
      { q: "How fast can you deliver?", a: "Focused sites can go live in days. Mathavan Traders, a bilingual catalogue, was designed and delivered in two days." },
    ],
  },
  {
    slug: "fractional-cto",
    name: "Fractional CTO",
    short: "Senior tech leadership without a full-time hire.",
    tagline: "A senior technology leader, part-time.",
    summary:
      "Get 20+ years of enterprise technology leadership on a monthly retainer. We set the technical direction, choose the stack, manage vendors and developers, and keep delivery honest.",
    priceInr: "₹40,000 / month",
    priceUsd: "$800 / month",
    deliverables: [
      "Technology roadmap and architecture decisions",
      "Vendor, freelancer and team oversight",
      "Code and delivery reviews",
      "AI adoption strategy",
      "Board and investor technical support",
    ],
    outcomes: [
      { title: "Fewer expensive mistakes", body: "Decisions made by someone who has seen them go wrong before." },
      { title: "Delivery you can trust", body: "Clear milestones and honest status from vendors and teams." },
      { title: "Cost of a fraction", body: "Senior leadership for a part of the cost of a full-time CTO." },
    ],
    process: [
      { step: "Assess", body: "Review your product, team, code and vendors." },
      { step: "Plan", body: "Agree priorities and a 90-day roadmap." },
      { step: "Lead", body: "Weekly cadence with your team and partners." },
    ],
    relatedProducts: [],
    keywords: ["fractional CTO India", "part-time CTO for startups", "virtual CTO services", "technology leadership consulting"],
    faqs: [
      { q: "What does a fractional CTO do?", a: "A fractional CTO provides senior technology leadership part-time: roadmap, architecture, hiring and vendor oversight, without a full-time salary." },
      { q: "What does it cost?", a: "KlivIQ's fractional CTO retainer starts from ₹40,000 per month in India or $800 per month internationally." },
    ],
  },
];

export const getCatalogService = (slug: string) => catalogServices.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export interface CatalogIndustry {
  slug: string;
  name: string;
  short: string;
  headline: string;
  summary: string;
  challenges: string[];
  solutions: { title: string; body: string }[];
  products: string[];
  services: string[];
  keywords: string[];
  faqs: QA[];
}

export const catalogIndustries: CatalogIndustry[] = [
  {
    slug: "healthcare-clinics",
    name: "Healthcare & Clinics",
    short: "Fewer no-shows, calmer front desks.",
    headline: "Technology that gives clinics their time back.",
    summary:
      "Clinics lose revenue to missed appointments and staff time to repeated phone calls. We help practices predict no-shows, automate reminders in the patient's language and get found when patients ask AI assistants for a doctor.",
    challenges: [
      "Empty slots from patients who do not turn up",
      "Front-desk staff answering the same questions all day",
      "Patients more comfortable in Tamil or Hindi than English",
      "New patients asking ChatGPT, not just Google, for a clinic",
    ],
    solutions: [
      { title: "Predict and prevent no-shows", body: "ClinicPing flags risky appointments so staff confirm them early." },
      { title: "Answer on WhatsApp", body: "KlivIQ Connect handles bookings, directions and timings in seven languages." },
      { title: "Be the clinic AI recommends", body: "Seenzo shows how assistants describe your clinic and what to fix." },
    ],
    products: ["clinicping", "connect", "seenzo"],
    services: ["ai-visibility", "ai-implementation"],
    keywords: ["AI for clinics India", "clinic WhatsApp automation", "reduce patient no-shows", "healthcare AI consulting"],
    faqs: [
      { q: "How can AI help a clinic?", a: "AI can predict likely no-shows, automate reminders and booking on WhatsApp, and make sure AI assistants recommend the clinic accurately." },
    ],
  },
  {
    slug: "ca-professional-services",
    name: "CA & Professional Services",
    short: "Client queries handled, partners freed up.",
    headline: "Less chasing, more advising.",
    summary:
      "CA firms and consultancies spend hours collecting documents and answering status questions. We automate the chasing, put an assistant on WhatsApp and make sure your firm is the one AI assistants suggest.",
    challenges: [
      "Chasing clients for documents every filing season",
      "Repeated status and deadline questions",
      "Knowledge stuck in senior partners' heads",
      "Low visibility outside word of mouth",
    ],
    solutions: [
      { title: "Document reminders on WhatsApp", body: "KlivIQ Connect nudges clients and collects files automatically." },
      { title: "Internal AI assistant", body: "AI implementation that lets juniors search firm knowledge in plain language." },
      { title: "Show up in AI answers", body: "Seenzo audit and GEO fixes so assistants mention your firm." },
    ],
    products: ["connect", "seenzo"],
    services: ["ai-implementation", "ai-visibility"],
    keywords: ["AI for CA firms", "WhatsApp automation for accountants", "professional services AI India", "CA firm marketing AI"],
    faqs: [
      { q: "Is client data safe?", a: "We design every system so your data stays in accounts you control, with access limited to what each workflow needs." },
    ],
  },
  {
    slug: "retail-sarees-d2c",
    name: "Retail, Sarees & D2C",
    short: "Online stores that sell like the showroom.",
    headline: "Bring the trial room online.",
    summary:
      "Saree and D2C brands compete on trust: will it look right, will it arrive, will someone answer? We build fast multilingual stores, add AI try-on and run customer conversations on WhatsApp.",
    challenges: [
      "Shoppers unsure how a saree will look on them",
      "Customer questions arriving at all hours on WhatsApp",
      "Slow, generic store templates",
      "Competing with big marketplaces for attention",
    ],
    solutions: [
      { title: "AI saree try-on", body: "KlivIQ TryOn lets shoppers preview the drape on themselves." },
      { title: "WhatsApp sales assistant", body: "KlivIQ Connect answers stock, price and delivery questions instantly." },
      { title: "Stores built to sell", body: "Fast, mobile-first web and app builds in Tamil, Hindi and English." },
      { title: "Get recommended", body: "Seenzo shows whether AI assistants suggest your brand." },
    ],
    products: ["tryon", "connect", "seenzo"],
    services: ["web-mobile-development", "ai-visibility"],
    keywords: ["saree ecommerce website", "AI try on for sarees", "D2C website India", "WhatsApp commerce India"],
    faqs: [
      { q: "Can you add try-on to my existing store?", a: "Yes. KlivIQ TryOn embeds into Shopify, WooCommerce and custom stores." },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    short: "Dealers, orders and quotes on autopilot.",
    headline: "Run the paperwork at machine speed.",
    summary:
      "Manufacturers juggle dealer enquiries, quotes and order updates across calls, email and WhatsApp. We automate the routine, connect it to your existing systems and help buyers find you through AI search.",
    challenges: [
      "Dealer and distributor queries spread across channels",
      "Manual quotes and order status updates",
      "Data locked in spreadsheets and ERPs",
      "Buyers researching suppliers through AI assistants",
    ],
    solutions: [
      { title: "Dealer assistant on WhatsApp", body: "KlivIQ Connect answers stock, price and order-status questions." },
      { title: "Automate quotes and reports", body: "AI implementation that turns spreadsheets and ERPs into instant answers." },
      { title: "Be visible to buyers", body: "Seenzo checks how AI assistants describe your capabilities." },
    ],
    products: ["connect", "seenzo"],
    services: ["ai-implementation", "ai-visibility"],
    keywords: ["AI for manufacturing India", "dealer WhatsApp automation", "manufacturing process automation", "B2B AI visibility"],
    faqs: [
      { q: "Will this work with our ERP?", a: "In most cases, yes. We connect to ERPs, spreadsheets and email rather than replacing them." },
    ],
  },
];

export const getCatalogIndustry = (slug: string) => catalogIndustries.find((i) => i.slug === slug);

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const pricingRows: { name: string; inr: string; usd: string; note?: string; service?: string }[] = [
  { name: "AI Visibility (GEO)", inr: "from ₹25,000", usd: "On request", note: "Subscriptions and tools billed separately", service: "ai-visibility" },
  { name: "AI Chatbot / Automation", inr: "from ₹60,000", usd: "from $1,500", service: "ai-implementation" },
  { name: "AI Implementation", inr: "from ₹75,000", usd: "from $2,000", service: "ai-implementation" },
  { name: "Website / Web Platform", inr: "from ₹75,000", usd: "from $2,000", service: "web-mobile-development" },
  { name: "Custom AI Tool", inr: "from ₹2,00,000", usd: "from $5,000", service: "ai-implementation" },
  { name: "Mobile App MVP", inr: "from ₹2,50,000", usd: "from $5,000", service: "web-mobile-development" },
  { name: "Fractional CTO", inr: "from ₹40,000 / month", usd: "from $800 / month", service: "fractional-cto" },
];

export const pricingFaqs: QA[] = [
  { q: "How do payments work?", a: "Projects are billed in three milestones: 30% to start, 40% at the mid-project demo and 30% at launch." },
  { q: "Do you issue GST invoices?", a: "Yes. Indian clients receive GST-compliant tax invoices for every payment." },
  { q: "Are prices fixed?", a: "Yes. After scoping you get a fixed price for a clearly listed set of deliverables. Changes are quoted before work starts." },
  { q: "Which currencies do you accept?", a: "Indian clients pay in rupees. International clients are billed in US dollars." },
  { q: "What is not included?", a: "Third-party costs such as hosting, domains, WhatsApp messaging fees, AI usage and paid subscriptions are billed at cost or paid directly by you." },
];
