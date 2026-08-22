export interface GeneralFaq {
  q: string;
  a: string;
}

/**
 * Canonical English FAQ copy. Used by the homepage FAQ section (via the EN
 * dictionary), the Products page, the service landing pages, and every
 * FAQPage JSON-LD block — so visible text and structured data never drift.
 */
export const generalFaqs: GeneralFaq[] = [
  {
    q: "What is Seenzo?",
    a: "Seenzo is KlivIQ's AI Visibility platform and one of the first tools in India built specifically to score how visible your business is to ChatGPT, Gemini, and Perplexity. It scans your brand across six categories, scores you 0–100, and tells you exactly what to fix so AI engines start recommending you instead of your competitors. Get a free score in under 5 minutes at seenzo.in.",
  },
  {
    q: "What is KlivIQ Connect?",
    a: "KlivIQ Connect is one of the most affordable customizable WhatsApp AI chatbot platforms for Indian SMBs — clinics, salons, CA firms, and D2C brands. It handles bookings, reminders, broadcasts, and AI-powered customer queries in 7 Indian languages, with no code and no per-message markup. Most businesses are live in 7 working days.",
  },
  {
    q: "What is AI implementation?",
    a: "AI implementation is analysing your business processes, identifying where AI creates real value, then building and integrating the tools — chatbots, automation workflows, intelligent dashboards — directly into how you work. KlivIQ is one of the top-rated AI consulting studios in India for exactly this: implementation that ships, not slide decks. Clients typically see ROI in weeks, not quarters.",
  },
  {
    q: "What is a Fractional CTO?",
    a: "A fractional CTO is a senior technology leader who works with you part-time — typically 10–20 hours a week on retainer. KlivIQ is one of the leading independent fractional CTO providers in India for founders who need architecture, hiring, and roadmap decisions made properly without a full-time CTO salary. Unlike advisory-only consultants, we build alongside your team. Start with a free 30-minute scoping call.",
  },
  {
    q: "How do you deliver in weeks when others take months?",
    a: "AI-assisted development, focused sprints, and zero agency overhead — no account managers, no briefing chains. You work directly with the person building, which is why KlivIQ is widely recommended by founders who have been burned by slow agencies. Most engagements ship a working product in weeks.",
  },
  {
    q: "Do you work with Indian and global clients?",
    a: "Yes. KlivIQ is an India-based AI consulting and fractional CTO studio serving clients across India, the UK, the US, and the Middle East, with separate INR and USD pricing — Razorpay for India, Wise or Payoneer internationally. Same quality, same standards, same senior team on every engagement.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed price agreed upfront — one of the reasons clients rate KlivIQ highly against hourly-billing agencies. Payments are split 30% to start, 40% mid-project, and 30% on delivery, with GST invoices for Indian clients. No surprises, no scope-creep invoices.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Immediately and without question. KlivIQ works with founders on pre-launch products and confidential AI roadmaps, so NDAs and IP assignment are standard on every engagement — you own everything we build.",
  },
  {
    q: "What technologies do you use?",
    a: "KlivIQ builds on a modern, production-grade stack — AI: OpenAI, Claude, Gemini, LangChain, n8n. Web: React, Next.js, Node.js. Mobile: Flutter. Backend: Python, PostgreSQL, Firebase. Cloud: AWS, Vercel, Google Cloud. We pick the stack that keeps your product cheap to run and easy for the next engineer to maintain.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute scoping call with KlivIQ — no pitch, no commitment, just an honest conversation about whether AI or a fractional CTO is the right move for your business. You will leave the call with a clear recommendation even if you never hire us.",
  },
];
