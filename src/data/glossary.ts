export interface GlossaryFaq { q: string; a: string }
export interface GlossarySection { heading: string; paragraphs: string[] }
export interface GlossaryTerm {
  slug: string;
  path: string;
  term: string;
  h1: string;
  shortDef: string;
  metaTitle: string;
  metaDescription: string;
  definition: string[];
  body?: GlossarySection[];
  kliviqUse: string;
  kliviqLink: { label: string; path: string };
  faqs: GlossaryFaq[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "fractional-cto",
    path: "/glossary/fractional-cto",
    term: "Fractional CTO",
    h1: "What Is a Fractional CTO?",
    shortDef: "A part-time senior technology leader who provides full CTO value without the full-time cost.",
    metaTitle: "What Is a Fractional CTO? Definition, Role & Cost | KlivIQ",
    metaDescription:
      "A Fractional CTO is a senior tech leader working part-time on retainer. Learn when you need one and what they do.",
    definition: [
      "A fractional CTO is a senior technology leader who works with a company on a part-time or project basis — typically 10–20 hours per week on a monthly retainer. They provide the same strategic value as a full-time CTO (technology roadmap, architecture decisions, team leadership, vendor selection) without the full-time cost or commitment.",
      "The model is common in early-stage startups, growing SMEs, and businesses going through digital transformation who need senior tech leadership but aren't ready to hire full-time. A fractional CTO typically sets the technical vision, owns critical architecture decisions, hires and mentors engineers, and translates between business goals and engineering execution.",
      "Compared to a full-time CTO who might cost ₹80L–₹2Cr per year fully loaded, a fractional CTO engagement is a fraction of that — and the seniority is usually higher, because experienced operators prefer the flexibility of multiple clients over a single full-time seat.",
    ],
    body: [
      { heading: "One-line definition", paragraphs: ["A Fractional CTO is a senior technology leader who works with a company part-time — typically 10 to 20 hours per week on a monthly retainer — providing CTO-level strategy, architecture decisions, and hands-on execution without the cost of a full-time hire."] },
      { heading: "What a Fractional CTO does", paragraphs: ["A Fractional CTO takes ownership of a company's technology direction. This is not advisory work — it is execution. Typical responsibilities include: setting and enforcing technology architecture and stack decisions; hiring and managing engineers, or evaluating external vendors and agencies; translating business goals into a technical roadmap; preparing technical due diligence materials for investors; identifying and reducing technical debt before it becomes a scaling problem; making build-vs-buy decisions on tools, platforms, and infrastructure.", "The key difference from a consultant or advisor: a Fractional CTO is accountable for outcomes, not just recommendations."] },
      { heading: "Who needs a Fractional CTO", paragraphs: ["A Fractional CTO is most useful at specific inflection points. Pre-seed and seed stage startups making foundational technology decisions — stack, architecture, first hires — without a technical co-founder. Post-product-market-fit companies scaling their engineering team for the first time. Funded startups preparing for a Series A that need a credible technical narrative and clean architecture to present to investors. Non-technical founders who need a trusted technical counterpart without the cost of a full-time CTO salary. SMBs adopting AI or new technology who need senior guidance without the overhead of a full-time executive hire."] },
      { heading: "Fractional CTO vs. full-time CTO", paragraphs: ["A full-time CTO costs ₹80–₹200 lakh per year in India, or $200,000–$400,000 USD in the US, plus equity. A Fractional CTO typically costs a fraction of that on a monthly retainer, with no equity dilution and no long-term commitment. The trade-off is availability — a Fractional CTO is not in the building every day. For most early-stage companies, that trade-off is worth it."] },
      { heading: "Fractional CTO vs. technical advisor", paragraphs: ["A technical advisor gives opinions once a month. A Fractional CTO shows up, makes decisions, and owns the outcome. If you need someone to validate your instincts, hire an advisor. If you need someone to run the technology function, hire a Fractional CTO."] },
      { heading: "How KlivIQ approaches Fractional CTO work", paragraphs: ["KlivIQ Fractional CTO engagements are execution-first. We strategy and build — not just advise. Engagements typically run 10–20 hours per week on a monthly retainer, with separate INR and USD pricing for Indian and global clients."] },
    ],
    kliviqUse:
      "KlivIQ provides fractional CTO services to Indian SMEs and global startups. We embed with your team, own the technical roadmap, lead architecture and vendor decisions, and stay accountable for delivery — all on a monthly retainer.",
    kliviqLink: { label: "Explore our Fractional CTO service", path: "/services/fractional-cto" },
    faqs: [
      {
        q: "How many hours per week does a fractional CTO work?",
        a: "Typically 10–20 hours per week, depending on the stage of the business. Early-stage startups may need more during architecture or hiring phases; established SMEs often settle at 8–12 hours per week of focused leadership time.",
      },
      {
        q: "When should a business hire a fractional CTO instead of a full-time one?",
        a: "When the company is under 50 people, pre-Series B, or when the engineering team is small enough that a full-time CTO would be overkill. Fractional CTOs are also useful during digital transformation projects where senior tech leadership is needed for 6–18 months, not forever.",
      },
    ],
  },
  {
    slug: "ai-consulting",
    path: "/glossary/ai-consulting",
    term: "AI Consulting",
    h1: "What Is AI Consulting?",
    shortDef: "Helping businesses identify, plan, and implement AI solutions that create measurable business value.",
    metaTitle: "What Is AI Consulting? Definition & How It Works | KlivIQ",
    metaDescription:
      "AI consulting helps businesses identify, plan, and implement AI. Learn what AI consultants do and how to choose one.",
    definition: [
      "AI consulting is the practice of helping businesses identify, plan, and implement artificial intelligence solutions that create measurable business value. Unlike general IT consulting, AI consulting focuses on finding high-ROI use cases for AI — automating repetitive processes, improving decision-making with data, building intelligent customer experiences — and then executing them.",
      "The best AI consultants don't just advise: they build and ship the solution. The outcome is a working AI system, not a strategy deck. A good engagement starts with a discovery phase to map operations, identifies two or three high-leverage opportunities, then moves directly into implementation.",
      "Typical AI consulting projects include customer support automation, document and invoice processing, sales and lead qualification, internal knowledge assistants, and AI-powered analytics. The right consultant brings both strategic thinking and hands-on engineering — because the gap between idea and production is where most AI initiatives die.",
    ],
    body: [
      { heading: "One-line definition", paragraphs: ["AI consulting is the practice of helping businesses identify where artificial intelligence creates value, then planning and building the tools to capture that value."] },
      { heading: "What AI consulting involves", paragraphs: ["AI consulting spans two phases that are often bundled together.", "Strategy phase: auditing existing business processes to find automation and intelligence opportunities; evaluating which problems are genuinely suited to AI versus simpler tools; defining success metrics before any build begins; recommending build-vs-buy decisions; estimating timelines and costs honestly.", "Implementation phase: building the AI tools — chatbots, document processing systems, workflow automation, intelligent dashboards; integrating with existing software; testing, iterating, and deploying; training the team to use and maintain what was built.", "The best AI consulting firms do both. Strategy without execution produces decks. Execution without strategy produces the wrong thing."] },
      { heading: "What AI consultants are typically hired to build", paragraphs: ["Customer-facing chatbots trained on company data, connected to live systems. Document processing pipelines — contracts, invoices, forms processed automatically. Internal knowledge bases where staff can query company knowledge in plain English. Workflow automation — multi-step business processes triggered and completed by AI agents. Reporting and analytics dashboards that surface insights without manual data work."] },
      { heading: "How to evaluate an AI consulting firm", paragraphs: ["Three questions to ask before hiring. First: can they show you something they have shipped? Not a demo — something real and live. Second: do they recommend the simplest solution, or the most impressive one? A good AI consultant will tell you when a prompt and an API call solves your problem. Third: what happens after the engagement? You should own the code and the infrastructure — no lock-in to proprietary platforms you cannot maintain."] },
      { heading: "How KlivIQ approaches AI consulting", paragraphs: ["KlivIQ identifies where AI creates the most value in your business, then builds and integrates the tools directly into how you work. Fixed price, agreed upfront. Most engagements deliver working tools in 2–6 weeks."] },
    ],
    kliviqUse:
      "KlivIQ's AI consulting practice is built around shipping, not slides. We scope, build, and deploy production AI systems in weeks — owned end-to-end by senior engineers.",
    kliviqLink: { label: "See our AI Consulting service", path: "/services/ai-consulting" },
    faqs: [
      {
        q: "How is AI consulting different from regular IT consulting?",
        a: "IT consulting focuses on infrastructure, systems, and processes. AI consulting focuses specifically on identifying where AI can create measurable business value and then building those systems. The best AI consultants combine strategy with engineering execution.",
      },
      {
        q: "How long does a typical AI consulting engagement take?",
        a: "A focused use case — like an AI customer support agent or document processor — typically takes 4–8 weeks from kickoff to production. Larger transformation programs run 3–6 months, ideally broken into shippable phases.",
      },
    ],
  },
  {
    slug: "ai-implementation",
    path: "/glossary/ai-implementation",
    term: "AI Implementation",
    h1: "What Is AI Implementation?",
    shortDef: "Turning an AI strategy into working software running inside a real business.",
    metaTitle: "What Is AI Implementation? Steps & Best Practices | KlivIQ",
    metaDescription:
      "AI implementation is the process of deploying AI tools into your business workflows. Learn what it involves.",
    definition: [
      "AI implementation is the process of taking an AI strategy and turning it into working software running inside a real business. It covers everything from selecting the right AI model (OpenAI, Gemini, Claude, open-source) to building the integration, training the system on business data, testing it, and deploying it into production.",
      "Implementation is where most AI projects fail — the strategy is clear, but the execution stalls. Common blockers include messy data, missing integrations, unclear success metrics, and underestimated engineering effort. A proper implementation partner handles the full build, not just the plan.",
      "A solid implementation also includes monitoring, evaluation, and feedback loops so the system improves over time. AI without monitoring degrades silently; implementation is not finished at deployment.",
    ],
    body: [
      { heading: "One-line definition", paragraphs: ["AI implementation is the process of deploying artificial intelligence tools into a business's existing workflows — integrating them with current software, training staff to use them, and monitoring performance over time. It is the execution phase that follows AI strategy."] },
      { heading: "AI strategy vs. AI implementation", paragraphs: ["AI strategy answers: where should we use AI, and how? It is a plan. AI implementation answers: how do we actually deploy it and make it work? It is execution. A company that has done AI strategy but not implementation has a deck. A company that has done implementation without strategy has built the wrong thing."] },
      { heading: "The stages of AI implementation", paragraphs: ["Stage 1 — Preparation: auditing what data exists, where it lives, and whether it is clean enough to use; defining the specific workflow the AI will slot into; setting baseline metrics to measure improvement against.", "Stage 2 — Build or integrate: either building custom tools using APIs (OpenAI, Anthropic, Google) or connecting off-the-shelf AI tools to existing systems via automation platforms like n8n or Zapier.", "Stage 3 — Testing: testing not just for bugs but for output quality, edge cases, hallucination rates, and latency under real conditions.", "Stage 4 — Deployment and change management: getting staff to adopt and trust the new tool, including training, documentation, and a feedback loop.", "Stage 5 — Monitoring: setting up monitoring so you know when something is underperforming as models or data change."] },
      { heading: "Common reasons AI implementations fail", paragraphs: ["The data was not ready and nobody checked. The use case was too broad — \"make us more efficient with AI\" is not a brief. The tool was built but never integrated into the workflow people actually use. No one owned the output quality after launch."] },
      { heading: "How KlivIQ handles AI implementation", paragraphs: ["KlivIQ handles both strategy and implementation end-to-end. We identify the use case, build the tool, integrate it into your existing systems, and ensure your team can use and maintain it. Fixed price, delivered in weeks."] },
    ],
    kliviqUse:
      "KlivIQ specialises in AI implementation for teams that already know what they want and need senior engineers to ship it. We handle model selection, integration, deployment, and monitoring.",
    kliviqLink: { label: "Talk to us about AI implementation", path: "/services/ai-consulting" },
    faqs: [
      {
        q: "Why do most AI implementation projects fail?",
        a: "The most common reasons are unclear success metrics, poor data quality, underestimated integration work, and the gap between a working prototype and a production system. A senior implementation partner de-risks all four.",
      },
      {
        q: "Which AI models should a business use?",
        a: "It depends on the use case, accuracy needs, data sensitivity, and budget. OpenAI and Anthropic Claude lead on reasoning; Google Gemini is strong on long context; open-source models like Llama and Mistral are useful when data must stay on-premise.",
      },
    ],
  },
  {
    slug: "mvp-development",
    path: "/glossary/mvp-development",
    term: "MVP Development",
    h1: "What Is MVP Development?",
    shortDef: "Building the simplest version of a product that can be shipped and tested with real users.",
    metaTitle: "What Is MVP Development? Definition & Process | KlivIQ",
    metaDescription:
      "An MVP is the smallest functional product that validates your core assumption. Learn how MVP development works.",
    definition: [
      "MVP stands for Minimum Viable Product — the simplest version of a product that can be built, shipped, and tested with real users. MVP development is the practice of scoping only the core features needed to validate an idea, building them to production quality, and launching fast.",
      "A good MVP is not a prototype or a demo — it is a live, working product that real users can use. The goal is speed to market and learning, not perfection. The features cut from version one are just as important as the ones kept.",
      "Most MVPs take 4–8 weeks to build with the right team and clear scope. Beyond that, you're usually building features the market hasn't asked for yet. The discipline is in shipping early, listening, and iterating with real data instead of opinions.",
    ],
    body: [
      { heading: "One-line definition", paragraphs: ["An MVP — Minimum Viable Product — is the smallest functional version of a product that delivers core value to real users and generates enough learning to decide what to build next. MVP development is the process of building it."] },
      { heading: "What minimum viable actually means", paragraphs: ["The word minimum is frequently misunderstood. An MVP is not a prototype. It is not a mock-up. It is not half a product. It is a complete, working product — just scoped to the single most important thing it needs to do.", "The viable part matters as much as the minimum part. A viable product works reliably, looks credible enough that real users will trust it, and does its core job without critical failures."] },
      { heading: "What an MVP is for", paragraphs: ["An MVP exists to answer a question. Before building an MVP, the question should be explicit: Will users pay for this? Can we acquire users through this channel at a viable cost? Does this workflow save the time we think it will? Is this technically feasible at the quality level we need? If the question is not defined before the build begins, the MVP will produce no useful learning."] },
      { heading: "What is typically in an MVP", paragraphs: ["Included: the single core user flow, authentication, basic error handling and reliability, enough design to be credible.", "Excluded: secondary features that are nice to have, admin dashboards and internal tooling, deep third-party integrations, mobile apps (ship web first unless mobile is the core value)."] },
      { heading: "How long does MVP development take", paragraphs: ["A well-scoped MVP with a focused team takes 4–8 weeks. Longer timelines usually indicate scope creep — features being added before the core is proven."] },
      { heading: "How KlivIQ builds MVPs", paragraphs: ["KlivIQ builds lean, deployable MVPs for founders and startups using AI-assisted development and focused sprints. Most projects deliver a live product in 2–6 weeks. Fixed price, no surprises."] },
    ],
    kliviqUse:
      "KlivIQ ships production-quality MVPs in 4–8 weeks. We scope ruthlessly, design clean architecture from day one, and launch live products — not prototypes.",
    kliviqLink: { label: "Explore our MVP Development service", path: "/services/mvp-development" },
    faqs: [
      {
        q: "How fast can you build an MVP?",
        a: "Most MVPs ship in 4–8 weeks. Highly complex products with hardware, regulatory, or integration constraints can take 10–12 weeks. We scope tightly upfront so the timeline is predictable.",
      },
      {
        q: "What does an MVP cost?",
        a: "A focused MVP typically ranges from ₹6L–₹20L depending on scope, integrations, and design depth. We share fixed-scope estimates after a one-week discovery so there are no surprises mid-build.",
      },
    ],
  },
  {
    slug: "rag",
    path: "/glossary/rag",
    term: "RAG (Retrieval-Augmented Generation)",
    h1: "What Is RAG (Retrieval-Augmented Generation)?",
    shortDef: "A technique that improves AI chatbots by connecting them to your own business data.",
    metaTitle: "What Is RAG? Retrieval-Augmented Generation Explained | KlivIQ",
    metaDescription:
      "RAG gives AI models access to your documents at inference time. Learn how Retrieval-Augmented Generation works.",
    definition: [
      "RAG stands for Retrieval-Augmented Generation — a technique that improves AI chatbots and assistants by connecting them to your own business data. Instead of answering only from general training data, a RAG system searches a knowledge base (your documents, manuals, support tickets, product catalogue) and uses that information to generate accurate, specific answers.",
      "RAG is what makes a generic AI chatbot into an intelligent business tool. It powers customer support bots, internal knowledge assistants, and document Q&A systems. A well-built RAG pipeline indexes your content, retrieves the most relevant chunks for each question, and passes them to an LLM that composes the final answer.",
      "Good RAG also includes citations so users can verify the source, freshness controls so outdated content is reindexed, and evaluation so accuracy can be measured over time. Without these, RAG systems quietly drift and lose trust.",
    ],
    body: [
      { heading: "One-line definition", paragraphs: ["RAG — Retrieval-Augmented Generation — is an AI architecture pattern where a language model is given access to an external knowledge base at the time it generates a response. Instead of relying only on what it learned during training, the model first retrieves relevant documents, then uses them to produce a more accurate, specific, and up-to-date answer."] },
      { heading: "The problem RAG solves", paragraphs: ["Large language models like GPT-4, Claude, and Gemini are trained on data up to a certain date. They cannot know what happened after that date. They also cannot know things that were never in their training data — your company's internal documents, your product's specific pricing, your support team's knowledge base. Without RAG, asking an LLM about your business gets you a generic answer. With RAG, you give the model your documents and it answers from them."] },
      { heading: "How RAG works, step by step", paragraphs: ["Step 1 — Ingestion (done once, or on a schedule): your documents — PDFs, support articles, product docs, Notion pages — are broken into chunks and converted into numerical representations called embeddings. These embeddings are stored in a vector database.", "Step 2 — Query: a user asks a question. The question is also converted into an embedding.", "Step 3 — Retrieval: the vector database finds the document chunks most semantically similar to the question — not by keyword matching, but by meaning.", "Step 4 — Generation: the retrieved chunks are passed to the LLM alongside the original question. The model uses both to generate a response grounded in your actual documents."] },
      { heading: "What RAG is used for in business", paragraphs: ["Customer support chatbots that answer from your product documentation, not from hallucinated generic knowledge. Internal knowledge bases where staff can ask questions and get answers from company policies, SOPs, and past projects. Legal and contract review tools that retrieve and summarise relevant clauses. Sales enablement tools that pull accurate product and pricing information for reps in real time. Research assistants that surface relevant internal reports or external sources on demand."] },
      { heading: "RAG vs. fine-tuning", paragraphs: ["Fine-tuning trains the model itself on new data. It is expensive, requires a lot of clean data, and becomes outdated when your data changes. RAG retrieves fresh data at inference time — it is cheaper, updatable without retraining, and better suited to most business use cases. For most companies, RAG is the right approach."] },
      { heading: "Key components of a RAG system", paragraphs: ["Embedding model — converts text to vectors (OpenAI, Cohere, or open-source alternatives). Vector database — stores and retrieves embeddings (Pinecone, Weaviate, pgvector, Chroma). LLM — generates the final response (GPT-4, Claude, Gemini, or open-source). Orchestration layer — manages the pipeline (LangChain, LlamaIndex, or custom)."] },
      { heading: "How KlivIQ builds RAG systems", paragraphs: ["KlivIQ designs and builds RAG pipelines for businesses — from document ingestion through to a deployed, integrated tool. We handle the full stack: embedding, retrieval, generation, and integration with your existing systems."] },
    ],
    kliviqUse:
      "KlivIQ builds RAG-powered assistants for customer support, internal knowledge, and document Q&A — integrated with your existing systems and tuned for accuracy.",
    kliviqLink: { label: "Talk to us about AI consulting", path: "/services/ai-consulting" },
    faqs: [
      {
        q: "Why use RAG instead of fine-tuning an AI model?",
        a: "RAG is faster, cheaper, and easier to update than fine-tuning. When your business data changes, you reindex — no retraining required. Fine-tuning is better when you need the model itself to learn a new style or skill.",
      },
      {
        q: "What kind of data works with RAG?",
        a: "Any text-based content: PDFs, Word docs, web pages, support tickets, wikis, product catalogues, contracts, manuals. Images and scanned documents work too when paired with OCR.",
      },
    ],
  },
  {
    slug: "ai-strategy",
    path: "/glossary/ai-strategy",
    term: "AI Strategy",
    h1: "What Is AI Strategy?",
    shortDef: "A plan that defines how a business will adopt and use AI to achieve specific goals.",
    metaTitle: "What Is an AI Strategy? Definition & Components | KlivIQ",
    metaDescription:
      "An AI strategy defines how your organisation will adopt and govern AI. Learn what a good AI strategy includes.",
    definition: [
      "An AI strategy is a plan that defines how a business will adopt and use artificial intelligence to achieve specific goals — reducing costs, improving customer experience, automating operations, or creating new revenue streams.",
      "A good AI strategy identifies the highest-ROI use cases first, defines the tools and models to use, maps the implementation timeline, and measures success with clear KPIs. It also covers data readiness, build-vs-buy decisions, vendor selection, and the team structure needed to execute.",
      "Without a strategy, businesses waste budget on isolated AI tools that never connect to real outcomes. A strategy doesn't have to be a 100-page document — for most SMEs, a focused one- or two-week sprint produces a prioritised roadmap that's actually usable.",
    ],
    body: [
      { heading: "One-line definition", paragraphs: ["An AI strategy is a structured plan that defines how an organisation will identify, adopt, deploy, and govern artificial intelligence to achieve its business goals. It covers which use cases to prioritise, how to build or source the tools, what data and capabilities are required, and how success will be measured."] },
      { heading: "Why AI strategy matters", paragraphs: ["Most organisations that fail at AI adoption do not fail because the technology does not work. They fail because they started building without a clear problem to solve. An AI strategy prevents this by forcing clarity before investment. A good AI strategy answers: which business problems are actually worth solving with AI? Are those problems genuinely AI problems, or are they data problems, process problems, or hiring problems? Build or buy — should we use off-the-shelf AI tools, or build something custom? What data do we have, and is it good enough? What capabilities do we need internally to maintain what we build? How do we measure whether AI is working?"] },
      { heading: "Components of an AI strategy", paragraphs: ["Use case prioritisation: a good AI strategy maps candidate use cases against two axes — potential business value and implementation complexity. High value, low complexity use cases go first.", "Build vs. buy analysis: for most business use cases, the right answer is to use existing AI APIs rather than training custom models. An AI strategy makes this decision explicitly.", "Data readiness assessment: AI tools are only as good as the data they run on. An AI strategy audits existing data — what exists, where it lives, how clean it is.", "Capability planning: who will own AI tools after they are built?", "Governance and risk: AI tools that interact with customers or make decisions need guardrails — who reviews AI output, how errors are caught, what the escalation path is.", "Roadmap and sequencing: a prioritised plan — what to build first, what to defer, and what milestones define success."] },
      { heading: "AI strategy vs. AI consulting", paragraphs: ["AI strategy is one component of a broader AI consulting engagement. Strategy produces the plan. AI consulting covers both the plan and the execution. If you have done the strategy internally and know what to build, you may need a technical team to build it rather than a strategist."] },
      { heading: "How KlivIQ approaches AI strategy", paragraphs: ["KlivIQ develops AI adoption roadmaps for businesses — identifying the highest-value use cases, evaluating build vs. buy decisions, and creating an implementation plan that fits your team's actual capacity to execute."] },
    ],
    kliviqUse:
      "KlivIQ runs focused AI strategy sprints for SMEs and growth-stage companies — turning ambition into a clear, costed, prioritised plan you can execute.",
    kliviqLink: { label: "See our AI Strategy service", path: "/services/ai-strategy" },
    faqs: [
      {
        q: "How long does it take to build an AI strategy?",
        a: "For an SME, a focused AI strategy sprint takes one to three weeks. Larger enterprises with multiple business units may need four to six weeks to cover stakeholder interviews and data audits.",
      },
      {
        q: "Do we need an AI strategy before we start building?",
        a: "If you have one obvious, well-scoped use case, you can start building immediately. If you have many ideas and aren't sure which to prioritise, a short strategy sprint pays for itself by eliminating wasted spend.",
      },
    ],
  },
  {
    slug: "llm",
    path: "/glossary/llm",
    term: "LLM (Large Language Model)",
    h1: "What Is an LLM (Large Language Model)?",
    shortDef: "An AI trained on vast text data that can understand and generate human language.",
    metaTitle: "What Is an LLM? Large Language Models Explained | KlivIQ",
    metaDescription:
      "LLMs are AI models trained on text to understand and generate language. Learn how GPT-4, Claude, and Gemini work.",
    definition: [
      "A Large Language Model (LLM) is a type of AI trained on vast amounts of text data that can understand and generate human language. LLMs power tools like ChatGPT, Google Gemini, and Anthropic Claude.",
      "Businesses use LLMs to build chatbots, automate document processing, generate content, analyse customer feedback, and power internal knowledge tools. LLMs are the engine — the product your business uses is built on top of them, customised for your specific data and use case.",
      "Different LLMs have different strengths: some are better at reasoning, others at long context windows, others at cost-efficient high-volume tasks. Choosing the right model for the right job is one of the most important architecture decisions in any AI build.",
    ],
    kliviqUse:
      "KlivIQ builds business systems on top of leading LLMs — selecting the right model per use case and wrapping them in production-grade architecture, RAG, and evaluation.",
    kliviqLink: { label: "Talk to us about AI consulting", path: "/services/ai-consulting" },
    faqs: [
      {
        q: "Which LLM is best for business use?",
        a: "There is no single best LLM. OpenAI GPT-4 class models lead on general reasoning; Claude excels at long-form analysis; Gemini is strong on multimodal tasks; open-source models like Llama work well when data must stay on-premise.",
      },
      {
        q: "Is it expensive to use an LLM in production?",
        a: "Costs vary widely. A typical SME chatbot runs $50–$500 per month in model costs. High-volume document processing can run higher, but is almost always cheaper than the manual work it replaces.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    path: "/glossary/workflow-automation",
    term: "Workflow Automation",
    h1: "What Is Workflow Automation?",
    shortDef: "Using technology to perform repetitive business tasks without human involvement.",
    metaTitle: "What Is Workflow Automation? Definition & AI Use Cases | KlivIQ",
    metaDescription:
      "Workflow automation removes manual tasks from business processes. Learn how AI makes it smarter.",
    definition: [
      "Workflow automation is the use of technology to perform repetitive business tasks without human involvement — sending emails, updating records, generating reports, processing data, routing approvals.",
      "With AI, workflow automation goes further: it can handle tasks that require judgment, like reading a document, extracting key information, and deciding what to do next. Tools like n8n, Zapier, and custom integrations are common building blocks.",
      "The result is fewer manual errors, lower staffing costs, and faster operations. The best automation projects start by mapping the highest-volume, lowest-judgment tasks in a business and replacing those first — typically delivering ROI within a quarter.",
    ],
    kliviqUse:
      "KlivIQ designs and ships AI-powered workflow automation for ops, finance, sales, and support teams — using n8n, Zapier, custom code, and LLMs where they add real value.",
    kliviqLink: { label: "Talk to us about automation", path: "/services/ai-consulting" },
    faqs: [
      {
        q: "What's the difference between Zapier and a custom automation?",
        a: "Zapier and n8n are great for simple, linear workflows between standard SaaS tools. Custom automation is needed when logic gets complex, AI judgment is involved, or volumes get high enough that per-task pricing becomes expensive.",
      },
      {
        q: "Which business processes are easiest to automate first?",
        a: "High-volume, rule-based tasks: data entry, invoice routing, lead enrichment, report generation, and tier-one customer support. These deliver fast ROI and build organisational confidence for more ambitious projects.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    path: "/glossary/custom-software-development",
    term: "Custom Software Development",
    h1: "What Is Custom Software Development?",
    shortDef: "Building software designed specifically for one business's requirements instead of buying off-the-shelf.",
    metaTitle: "What Is Custom Software Development? | KlivIQ",
    metaDescription:
      "Custom software is built to your exact requirements. Learn when it beats off-the-shelf and how the process works.",
    definition: [
      "Custom software development is building a software application designed specifically for one business's requirements — rather than buying an off-the-shelf product. Custom software fits the exact workflow, integrates with existing tools, and scales as the business grows.",
      "The trade-off versus ready-made software is higher upfront cost but better long-term fit. Businesses choose custom development when no existing product solves their problem, when they need a competitive advantage, or when they're building a product to sell to others.",
      "A good custom build is modular, well-documented, and designed for change — because business requirements always evolve. The wrong approach is to over-engineer on day one; the right one is to ship a focused first version and grow it deliberately.",
    ],
    kliviqUse:
      "KlivIQ builds custom web and mobile applications for businesses that need software shaped exactly to their operations — designed to scale, documented to hand off.",
    kliviqLink: { label: "See our Custom App Development service", path: "/services/custom-app-development" },
    faqs: [
      {
        q: "When does custom software make more sense than off-the-shelf?",
        a: "When existing products don't fit your workflow, when integration costs are high, when you need a competitive edge, or when you're building a product to sell. For commodity needs like email or accounting, off-the-shelf almost always wins.",
      },
      {
        q: "How long does custom software take to build?",
        a: "A focused first version typically takes 6–12 weeks. Larger platforms with multiple modules, integrations, and roles can take 3–6 months. We always recommend shipping a usable v1 fast and iterating.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    path: "/glossary/digital-transformation",
    term: "Digital Transformation",
    h1: "What Is Digital Transformation?",
    shortDef: "Integrating digital technology into all areas of a business to fundamentally change how it operates.",
    metaTitle: "What Is Digital Transformation? Definition & Examples | KlivIQ",
    metaDescription:
      "Digital transformation is how businesses integrate technology to change how they operate. Learn what it involves.",
    definition: [
      "Digital transformation is the process of integrating digital technology into all areas of a business — fundamentally changing how it operates and delivers value.",
      "For Indian SMEs in 2026, this usually means moving from manual or paper-based processes to software, adopting cloud tools, building an online presence, and increasingly using AI to automate and improve operations.",
      "Digital transformation is not one project — it is an ongoing shift in how a business works. The most successful transformations combine technology with a clear strategy and senior technical leadership, sequenced so each phase delivers measurable value before moving to the next.",
    ],
    kliviqUse:
      "KlivIQ leads digital transformation for SMEs through fractional CTO engagements — combining strategy, architecture, and hands-on delivery so the transformation actually lands.",
    kliviqLink: { label: "Explore our Fractional CTO service", path: "/services/fractional-cto" },
    faqs: [
      {
        q: "How long does a digital transformation take?",
        a: "Meaningful results appear within 3–6 months when work is sequenced into clear phases. Full transformations across operations, sales, support, and finance typically run 12–24 months — but each phase should deliver value on its own.",
      },
      {
        q: "Who should lead digital transformation in an SME?",
        a: "A senior technical leader — full-time or fractional — paired with an executive sponsor on the business side. Without senior tech leadership, transformation projects drift and stall.",
      },
    ],
  },
];

export const getGlossaryTermBySlug = (slug: string) =>
  glossaryTerms.find((t) => t.slug === slug);
