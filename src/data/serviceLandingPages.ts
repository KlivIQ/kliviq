export interface ServiceFaq { q: string; a: string }
export interface ServiceSection { h: string; body: string[] }
export interface ServiceLandingContent {
  slug: string;
  path: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: ServiceSection[];
  proof: { title: string; body: string; metrics: { label: string; value: string }[] };
  faqs: ServiceFaq[];
  cta: { headline: string; body: string };
}

export const serviceLandingPages: ServiceLandingContent[] = [
  {
    slug: "ai-consulting",
    path: "/services/ai-consulting",
    navLabel: "AI Consulting",
    metaTitle: "AI Consulting Services for SMEs in India | KlivIQ",
    metaDescription:
      "AI consulting for Indian SMEs and global teams. We turn AI from buzzword to working systems — delivered in weeks, not months.",
    eyebrow: "AI Consulting",
    h1: "AI Consulting Services Built for Small & Medium Businesses",
    intro:
      "Most AI consulting stops at a slide deck. KlivIQ doesn't. We're a senior engineering team that consults and implements — we map the right AI use cases for your business, then build and ship them in weeks. No theory, no enterprise overhead, no waiting six months to see anything live.",
    sections: [
      {
        h: "AI consulting that actually ships",
        body: [
          "The Indian SME market is full of AI noise. Vendors pitch generic chatbots. Big agencies sell ₹50L 'AI transformation' programs that produce a roadmap and nothing else. Meanwhile, your competitors are quietly automating customer support, lead qualification, document processing, and reporting — and pulling ahead.",
          "KlivIQ exists for the gap in the middle: businesses that are serious about adopting AI but don't want a year-long enterprise engagement. Our model is simple. We spend a week deeply understanding your operations. We identify the two or three highest-leverage AI use cases. Then we build them — production-grade, integrated into your existing systems, owned by your team.",
          "Every engagement is led by a senior architect with 20+ years building enterprise software across banking, retail, healthcare, and logistics. You're not handed off to a junior. You work directly with the person who scopes, designs, and ships the system.",
        ],
      },
      {
        h: "What our AI consulting engagements look like",
        body: [
          "Discovery sprint (1 week). We sit with your team, map your workflows, and identify where AI realistically creates value — and where it doesn't. You leave the week with a prioritised, costed plan, not a 60-slide deck.",
          "Implementation (4–8 weeks). We build the systems. Custom AI chatbots trained on your data. Document processing pipelines that read invoices, contracts, or claims. Automation workflows that connect your CRM, accounting, and ops tools. Internal AI dashboards your team actually uses.",
          "Handover and enablement. Code, documentation, runbooks, and a trained internal owner. You're not locked in. If you want to part ways after delivery, everything keeps working — because we build on standards, not on proprietary lock-in.",
        ],
      },
      {
        h: "Use cases we deliver most often",
        body: [
          "AI customer support assistants trained on your product documentation and historical tickets — handling tier-one queries without escalation. Lead qualification and outreach automation that scores inbound leads, personalises follow-ups, and books meetings without an SDR. Document and invoice processing that extracts structured data from PDFs, emails, and forms — feeding it straight into your ERP or accounting stack.",
          "Internal AI search and knowledge bases (RAG pipelines on top of OpenAI, Claude, or Gemini) so your team stops asking the same question in Slack five times a week. AI-assisted reporting and BI dashboards that summarise weekly performance in plain English and flag anomalies before they become problems.",
        ],
      },
      {
        h: "Why KlivIQ instead of a traditional consulting firm",
        body: [
          "Traditional firms separate strategy from delivery — and bill twice. We do both, with the same team. You get one accountable owner, one fixed price, one timeline.",
          "We don't bill by the hour. Every engagement is fixed-scope and fixed-price, agreed upfront. 30% to start, 40% mid-project, 30% on delivery. No surprises, no scope creep games.",
          "We're senior-only. There is no junior team behind the scenes doing the actual work. Sriram, our Co-Founder & CTO, leads every engagement personally.",
        ],
      },
    ],
    proof: {
      title: "Proof",
      body:
        "Two AI projects currently in delivery for FACO and a global enterprise client. 20+ years of prior enterprise software delivery across banking, retail, healthcare, and logistics — including AI/ML systems in production at scale.",
      metrics: [
        { value: "4–8 wks", label: "Typical delivery window" },
        { value: "Fixed", label: "Scope and price" },
        { value: "Senior", label: "Only — no juniors" },
      ],
    },
    faqs: [
      {
        q: "What is AI consulting?",
        a: "AI consulting is the process of identifying where AI can create measurable value in a business, then designing and building the systems that capture that value. At KlivIQ, consulting and implementation are bundled — we don't deliver decks, we deliver working systems integrated into your operations.",
      },
      {
        q: "How much does AI consulting cost in India?",
        a: "Indian AI consulting ranges from ₹2L for small focused engagements to ₹50L+ for enterprise transformation programs. KlivIQ engagements typically fall between ₹3L and ₹15L for SME projects, fixed-price, delivered in 4–8 weeks. We publish indicative pricing on our pricing page and confirm exact numbers after a free 30-minute scoping call.",
      },
      {
        q: "How is KlivIQ different from a traditional agency?",
        a: "Traditional agencies separate strategy, design, and delivery into different teams — and your project gets handed down the chain. KlivIQ is senior-only. The person who scopes your project is the person who architects and builds it. Fixed price, fixed timeline, no account managers, no briefing telephone.",
      },
    ],
    cta: {
      headline: "Ready to put AI to work in your business?",
      body: "Book a free 30-minute scoping call. No pitch — just an honest conversation about where AI fits in your operations.",
    },
  },
  {
    slug: "fractional-cto",
    path: "/services/fractional-cto",
    navLabel: "Fractional CTO",
    metaTitle: "Fractional CTO Services in India & Globally | KlivIQ",
    metaDescription:
      "Hire a fractional CTO with 20+ years of enterprise tech leadership. Strategy, architecture, and team guidance — without a full-time salary.",
    eyebrow: "Fractional CTO",
    h1: "Fractional CTO Services — Senior Tech Leadership On Demand",
    intro:
      "A full-time CTO in India costs ₹60–₹150L per year. Globally, $200K+. Most growing businesses don't need a full-time CTO yet — they need senior judgement, in the room, when the decisions matter. That's what a fractional CTO from KlivIQ is: 10–20 hours a week of senior technology leadership on a monthly retainer.",
    sections: [
      {
        h: "When you need a fractional CTO",
        body: [
          "You're a founder making technology decisions without a senior engineer in the room. You're hiring developers, choosing a stack, picking vendors, signing infrastructure contracts — and you don't know if you're making the right calls. A fractional CTO is the senior voice that sanity-checks those decisions before they become expensive mistakes.",
          "You have a development team but no technical leadership. Maybe the team is competent but junior. Maybe they're external. Either way, no one is owning architecture, code quality, or technical roadmap. Things ship, but they ship inconsistently and the technical debt is compounding.",
          "You're raising or planning to raise. Investors will ask hard technical questions. A fractional CTO sits in due-diligence calls, owns the technical narrative, and gives your raise the credibility it needs.",
        ],
      },
      {
        h: "What a KlivIQ fractional CTO actually does",
        body: [
          "Technology strategy and roadmap. We turn your product ambition into a concrete 6–12 month technical plan — what gets built, in what order, by whom, on what stack.",
          "Architecture decisions. Stack selection, database design, infrastructure choices, AI adoption decisions. We make the calls that are hard to reverse later — and we make them with the experience of having shipped them many times.",
          "Team oversight. Hiring senior engineers. Reviewing code from your existing team. Setting standards. Mentoring leads. Running technical interviews. Replacing under-performing vendors.",
          "Investor and board support. Technical due diligence prep. Architecture walkthroughs. Quarterly board updates. Sitting in investor calls when the technical conversation gets serious.",
        ],
      },
      {
        h: "How the engagement works",
        body: [
          "Monthly retainer, typically 10–20 hours per week. Fixed monthly fee — no hourly billing games. Minimum 3-month engagement so we have time to actually move the needle.",
          "Weekly standing call with you. Daily Slack/WhatsApp availability for urgent decisions. Direct involvement with your engineering team — code reviews, architecture sessions, hiring interviews.",
          "Month one is foundation: audit, roadmap, immediate priorities. Months two onward: execution, oversight, scaling.",
        ],
      },
      {
        h: "What you get that a freelance consultant won't give you",
        body: [
          "20+ years of enterprise software leadership across banking, retail, healthcare, and logistics — including systems that handle millions of transactions a day. We've seen what breaks at scale and we design for it before it breaks.",
          "An accountable owner. Not advice from the sidelines. We own outcomes, sit in your meetings, and answer to your board if needed.",
          "An entire delivery team behind us. If you need engineers to actually build something, we bring them in. You get one engagement, one accountable lead, one bill.",
        ],
      },
    ],
    proof: {
      title: "Proof",
      body:
        "Sriram Ramkumar, Co-Founder & CTO of KlivIQ, has led engineering for enterprise products in banking, healthcare, retail, and logistics over a 20+ year career. KlivIQ currently provides fractional CTO services to clients across India and globally.",
      metrics: [
        { value: "20+ yrs", label: "Enterprise leadership" },
        { value: "10–20 hrs/wk", label: "Monthly retainer" },
        { value: "₹60–150L", label: "FT CTO cost you save" },
      ],
    },
    faqs: [
      {
        q: "What is a fractional CTO?",
        a: "A fractional CTO is a senior technology leader who works with your company part-time on a retainer — typically 10–20 hours per week — owning your technology strategy, architecture, and team oversight without the cost of a full-time hire.",
      },
      {
        q: "How much does a fractional CTO cost?",
        a: "Fractional CTO retainers in India typically range from ₹1.5L to ₹5L per month depending on hours and scope. Globally, $4K–$12K per month is common. KlivIQ retainers are fixed monthly fees with a 3-month minimum and indicative pricing on our pricing page.",
      },
      {
        q: "When does a startup need a fractional CTO?",
        a: "Three triggers: (1) you're making technology decisions without senior input — wrong stack, wrong vendor, wrong hire risk; (2) you have a team but no technical leadership and quality is drifting; (3) you're raising and need a credible technical voice in investor calls. Any of these means a fractional CTO will pay for itself.",
      },
    ],
    cta: {
      headline: "Need senior tech leadership without the full-time hire?",
      body: "Book a free 30-minute call. We'll talk through your situation and tell you honestly whether a fractional CTO is the right fit.",
    },
  },
  {
    slug: "ai-strategy",
    path: "/services/ai-strategy",
    navLabel: "AI Strategy",
    metaTitle: "AI Strategy Consulting for SMEs | KlivIQ",
    metaDescription:
      "Don't know where to start with AI? We map the high-ROI use cases in your business and give you a clear roadmap to implement them.",
    eyebrow: "AI Strategy",
    h1: "AI Strategy Consulting — From \"Where Do We Start?\" to a Plan",
    intro:
      "AI is moving faster than any business can keep up with. You know you should be using it. You're not sure where to start, what's hype, what's real, or which use case in your business will actually pay back. AI strategy consulting from KlivIQ gives you a clear, costed, prioritised roadmap — in two weeks, not two quarters.",
    sections: [
      {
        h: "Why most AI strategy work fails",
        body: [
          "The traditional consulting model produces a 60-slide AI strategy deck. It identifies twelve use cases, ranks them on a 2×2 grid, recommends a centre of excellence, and ends with a multi-year transformation plan. Six months later, nothing has shipped. The deck is in a SharePoint folder no one opens.",
          "The reason is simple: strategy disconnected from implementation is theatre. The team writing the strategy doesn't know what's actually buildable, what it really costs, or how long it takes. The team doing implementation never sees the strategy until it's too late.",
          "KlivIQ does AI strategy differently because we also implement. Every use case in the roadmap is something we could start building tomorrow. The costs are real engineering costs, not consulting estimates. The timelines are real delivery timelines.",
        ],
      },
      {
        h: "What an AI strategy engagement produces",
        body: [
          "Use case map. A prioritised list of the 6–10 AI opportunities specific to your business, scored on impact, feasibility, cost, and time-to-value. No generic 'AI for HR' bullets — concrete workflows like 'auto-categorise inbound support tickets and draft replies for tier-one issues.'",
          "Data and infrastructure audit. What data you have, what shape it's in, what's missing, and what you need to put in place before each use case is buildable. Honest assessment, not vendor-pitched ideal-state nonsense.",
          "Costed roadmap. For each prioritised use case: build cost in INR and USD, delivery timeline, internal team requirement, expected payback. So you can take it to your board and defend it.",
          "Build vs. buy guidance. Where you should adopt an off-the-shelf tool (Notion AI, Intercom Fin, Gong, etc.) and where custom builds make sense. We have no incentive to over-recommend custom work.",
        ],
      },
      {
        h: "How the engagement works",
        body: [
          "Two weeks, fixed price. Week one: discovery interviews with your leadership team, ops leads, and customer-facing teams. Workflow mapping. Data inventory. Tool audit.",
          "Week two: use case scoring workshops, roadmap drafting, costing, and a final read-out with your leadership team.",
          "You leave with a roadmap document, a costed build plan, and clarity on what to do first. If you want us to build the first use case, we can — at a discount when bundled with strategy. If you want to build internally or with another team, the roadmap is yours.",
        ],
      },
      {
        h: "Who this is for",
        body: [
          "Founders and CEOs of SMEs (₹5–500 Cr revenue) who know AI matters and want a real plan, not a deck. Heads of operations or technology at growing companies who've been told to 'do something with AI' and need a credible roadmap to present internally.",
          "Not for: enterprise teams looking for a 12-month transformation program. Not for: businesses with no clear operational data or workflows yet — we'll tell you that honestly on the scoping call.",
        ],
      },
    ],
    proof: {
      title: "Proof",
      body:
        "Strategy and implementation experience across AI/ML systems in banking risk, retail demand forecasting, healthcare claims processing, and logistics route optimisation. We've seen which AI bets pay back and which ones quietly die — and we use that to score your roadmap.",
      metrics: [
        { value: "2 wks", label: "Strategy engagement" },
        { value: "6–10", label: "Use cases mapped" },
        { value: "Costed", label: "INR + USD roadmap" },
      ],
    },
    faqs: [
      {
        q: "What is AI strategy consulting?",
        a: "AI strategy consulting is the process of identifying where AI can create measurable value in a specific business, then producing a prioritised, costed roadmap to capture that value. At KlivIQ the strategy is built by people who also implement — so every recommendation is something we could start building the next day.",
      },
      {
        q: "How long does an AI roadmap take?",
        a: "Two weeks for KlivIQ engagements. Week one is discovery and data audit; week two is scoring, costing, and the final read-out. Traditional consulting firms typically take 8–12 weeks for similar scope.",
      },
      {
        q: "What ROI can I expect from AI adoption?",
        a: "It depends on the use case. Customer support automation typically reduces tier-one ticket volume by 30–60%. Document processing pipelines often pay back in 3–6 months on labour savings alone. We give you specific payback estimates per use case in the roadmap so you can prioritise on real numbers.",
      },
    ],
    cta: {
      headline: "Get a real AI roadmap — in two weeks.",
      body: "Book a free 30-minute call to scope your AI strategy engagement.",
    },
  },
  {
    slug: "custom-app-development",
    path: "/services/custom-app-development",
    navLabel: "Custom App Development",
    metaTitle: "Custom App Development Services India | KlivIQ",
    metaDescription:
      "Custom web and mobile apps engineered by senior architects. Fixed scope, fixed price, delivered in weeks — for SMEs ready to scale.",
    eyebrow: "Custom App Development",
    h1: "Custom Application Development for Growing Businesses",
    intro:
      "Off-the-shelf software stops fitting at some point. Your operations are too specific, your data is too valuable, your workflow doesn't fit anyone else's mould. KlivIQ builds custom web and mobile applications for SMEs that have outgrown SaaS — engineered by senior architects, delivered fixed-price in 6–10 weeks.",
    sections: [
      {
        h: "When custom beats off-the-shelf",
        body: [
          "Your business runs on workflows no SaaS tool fully supports. You're stitching together three or four tools with manual exports and Zapier glue. Each tool charges per-seat. Each one owns part of your data. None of them talks to the others cleanly.",
          "Your competitive advantage lives in process. You serve customers better, dispatch faster, or close more leads because of how you operate. Generic software flattens that advantage. Custom software amplifies it.",
          "You have enough scale to justify the build. Custom app development for SMEs typically starts paying back when you have 10+ internal users, meaningful customer data, or a recurring operational cost (per-seat SaaS, manual data entry, missed leads) that custom software directly removes.",
        ],
      },
      {
        h: "What we build",
        body: [
          "Internal business apps. Custom CRMs, dispatch systems, inventory and order management, field operations tools, dashboards. Built on React and Next.js for web, Flutter for mobile (iOS + Android from a single codebase).",
          "Customer-facing web apps. Marketplaces, booking systems, customer portals, subscription products. Production-grade, SEO-ready, performance-tuned.",
          "API and backend systems. Custom APIs that connect your existing tools. Data pipelines. Integration layers that let your accounting, CRM, ops, and AI systems share data cleanly.",
          "AI-native applications. Apps with AI baked into the core experience — search, summarisation, document understanding, intelligent automation — not bolted on as an afterthought.",
        ],
      },
      {
        h: "How we deliver in weeks, not months",
        body: [
          "AI-assisted development. Our team uses Claude, Cursor, and GitHub Copilot throughout — not to generate slop, but to compress the mechanical parts of development. The result is 2–3× faster delivery with cleaner code than the human-only baseline.",
          "Senior-only team. There are no junior engineers learning on your project. Every line of code is written by someone with 10+ years of production experience.",
          "Fixed scope, fixed price. We agree exactly what gets built before the project starts. 30% to start, 40% mid-project, 30% on delivery. No change-request games — if scope changes, we re-quote transparently.",
          "Weekly demos. You see working software every Friday. No three-month silence followed by a big-reveal that misses the mark.",
        ],
      },
      {
        h: "What you own at the end",
        body: [
          "The full source code, in your GitHub. Production-grade documentation. Deployment infrastructure you control (AWS, Vercel, Google Cloud — your account, not ours). A trained internal owner if you want one.",
          "No platform lock-in. No proprietary frameworks. No 'support contracts' you have to keep paying just to keep the app running. We build it; you own it; it keeps working whether or not we're involved next quarter.",
        ],
      },
    ],
    proof: {
      title: "Proof",
      body:
        "Custom web and mobile applications delivered for FACO and other enterprise clients. 20+ years of building production software across banking, retail, healthcare, and logistics — including systems still running at scale today.",
      metrics: [
        { value: "6–10 wks", label: "Typical full-product delivery" },
        { value: "3–4 wks", label: "Typical MVP" },
        { value: "100%", label: "Code ownership to you" },
      ],
    },
    faqs: [
      {
        q: "How much does custom app development cost in India?",
        a: "Custom app development in India ranges from ₹3L for small MVPs to ₹50L+ for complex enterprise products. KlivIQ projects typically fall between ₹5L and ₹25L for SME web and mobile apps, fixed-price, delivered in 6–10 weeks. We provide a fixed quote after a free scoping call.",
      },
      {
        q: "How long does custom app development take?",
        a: "MVPs ship in 3–4 weeks. Full products in 6–10 weeks. Larger systems (multi-module ERPs, complex marketplaces) typically take 12–16 weeks, broken into deliverable phases so you see and use working software every few weeks.",
      },
      {
        q: "Do I own the code we build?",
        a: "Yes — fully. Source code is committed to your GitHub organisation from day one. Infrastructure is deployed to your cloud accounts. No proprietary frameworks, no platform lock-in, no recurring support contracts required. You can take the codebase to any other team after delivery and it will keep working.",
      },
    ],
    cta: {
      headline: "Have a custom app in mind?",
      body: "Book a free 30-minute scoping call. We'll talk through your idea and tell you honestly whether it's a 4-week MVP or a 12-week build.",
    },
  },
  {
    slug: "mvp-development",
    path: "/services/mvp-development",
    navLabel: "MVP Development",
    metaTitle: "MVP Development for AI-First Startups | KlivIQ",
    metaDescription:
      "Ship your AI MVP in 4–8 weeks. Fixed scope, senior engineers, production-grade from day one. Built for founders ready to launch.",
    eyebrow: "MVP Development",
    h1: "MVP Development — Launch Your AI Product in Weeks",
    intro:
      "If you're an AI-first founder, every week your MVP isn't in the market is a week a competitor pulls ahead. KlivIQ ships production-grade AI MVPs in 4–8 weeks — built by senior engineers, scoped fixed-price, designed to keep scaling after launch instead of needing a full rebuild at 100 users.",
    sections: [
      {
        h: "Why most MVPs are built wrong",
        body: [
          "The cheap-and-fast MVP route — a junior team or no-code stack throwing something together in two weeks — is tempting. The problem shows up at month four, when your MVP starts getting traction. The code is unmaintainable. The architecture won't scale past a few hundred users. The AI calls are unoptimised and your bill is destroying the unit economics. You're forced into a full rebuild just as you're trying to raise.",
          "The over-engineered MVP route is the opposite mistake. Six months of architecture astronautics, microservices for a product with one user, a roadmap longer than the runway. The MVP ships late, the market has moved, the round doesn't close.",
          "KlivIQ MVPs are built on the middle path: production-grade fundamentals (real database, proper auth, scalable AI orchestration, observability) with a deliberately tight feature scope. Fast to launch, ready to scale, painless to extend.",
        ],
      },
      {
        h: "What a KlivIQ MVP includes",
        body: [
          "Core product. The two or three features that prove your hypothesis — built well, not built twice. Everything else is deferred to v2.",
          "AI integration done right. Whether you're using OpenAI, Claude, Gemini, or a mix, we set up proper prompt management, caching, retry logic, evaluation harnesses, and cost monitoring. Your AI bill stays predictable and your output stays consistent.",
          "Auth, payments, admin. Real authentication (Supabase, Auth0, or your stack of choice). Stripe or Razorpay for payments. An internal admin panel so you can manage users, see metrics, and run support from day one.",
          "Production deployment. Hosted on Vercel, AWS, or your cloud of choice. CI/CD, error tracking (Sentry), basic analytics. Not a localhost demo.",
        ],
      },
      {
        h: "Our MVP delivery process",
        body: [
          "Week 0 — scoping call. Free 30 minutes. We understand your product hypothesis, your target user, and your timeline. By end of call we tell you honestly whether 4 weeks is realistic or you're looking at 8.",
          "Week 1 — design and architecture. Lo-fi wireframes, data model, AI architecture, third-party choices. You sign off before any code is written.",
          "Weeks 2–6 — build. Weekly Friday demos. Slack/WhatsApp access to the team. Continuous deployment to a staging environment you can test daily.",
          "Final week — production launch. Real users, real payments, real AI traffic. We stay on for two weeks of post-launch support included.",
        ],
      },
      {
        h: "Built to keep scaling after launch",
        body: [
          "Every architectural decision is made with v2 in mind. The auth system can take 100,000 users without rework. The AI pipeline can absorb new models without ripping out prompts. The database schema is designed for the features on your 6-month roadmap, not just week one.",
          "If you want us to keep building after launch, we offer a continuing engineering retainer. If you want to hire in-house and take over, we hand off clean code, full docs, and a one-week walk-through with your new lead.",
        ],
      },
    ],
    proof: {
      title: "Proof",
      body:
        "Multiple AI-first MVPs shipped, including ScopeSnap, ClinicPing, and PitchDeckAI — all built and launched by the KlivIQ team. Founder-led engineering with 20+ years of enterprise software experience behind every architectural decision.",
      metrics: [
        { value: "4–8 wks", label: "Launch window" },
        { value: "Senior", label: "Engineers only" },
        { value: "Prod-grade", label: "From day one" },
      ],
    },
    faqs: [
      {
        q: "How fast can you build an MVP?",
        a: "Most KlivIQ MVPs ship in 4–8 weeks. The exact timeline depends on scope — a tight 3-feature AI MVP can ship in 4 weeks; a more ambitious launch with payments, multi-tenant auth, and a richer feature set usually takes 6–8. We confirm the timeline before any code is written.",
      },
      {
        q: "What does an AI MVP cost?",
        a: "Indicative range: ₹4L–₹12L (or $5K–$15K) for a 4–8 week MVP, fixed-price. The exact quote depends on scope, integrations, and AI complexity. We provide a fixed quote after a free 30-minute scoping call — no estimates that drift later.",
      },
      {
        q: "What happens after the MVP launches?",
        a: "Two weeks of post-launch support are included. After that, you have three options: (1) take it in-house — we hand off clean code, docs, and a walk-through; (2) keep us on a monthly engineering retainer; (3) come back for specific v2 features as fixed-scope mini-projects. No lock-in either way.",
      },
    ],
    cta: {
      headline: "Ready to launch your AI MVP?",
      body: "Book a free 30-minute scoping call. We'll tell you in plain terms whether your MVP is a 4-week or 8-week build.",
    },
  },
];

export function getServiceBySlug(slug: string) {
  return serviceLandingPages.find((s) => s.slug === slug);
}
