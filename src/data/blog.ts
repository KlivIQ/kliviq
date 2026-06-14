// Hero images live in /public so this data module stays import-free
// and can be loaded by the Node-side sitemap generator.
const heroThreeQuestions = "/blog/three-questions-hero.jpg";

export type BlogCategory =
  | "AI"
  | "Fractional CTO"
  | "Business Strategy"
  | "Automation"
  | "Technology Leadership";

export interface BlogAuthor {
  displayName: string;
  schemaName: string;
  jobTitle: string;
  url: string;
  bio: string;
}

export type BlogBlock =
  | { type: "intro"; html: string; speakable?: boolean }
  | { type: "h2"; id: string; text: string }
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; html: string; speakable?: boolean };

export interface BlogRelatedResource {
  label: string;
  description: string;
  path: string;
  kind: "service" | "glossary";
}

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishDate: string;
  updatedDate?: string;
  readingTimeMin: number;
  author: BlogAuthor;
  heroImage: string;
  heroAlt: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
  };
  toc: { id: string; label: string }[];
  body: BlogBlock[];
  faqs: { q: string; a: string }[];
  relatedSlugs?: string[];
  relatedResources?: BlogRelatedResource[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "AI",
  "Fractional CTO",
  "Business Strategy",
  "Automation",
  "Technology Leadership",
];

export const BLOG_TAGS = [
  "AI Strategy",
  "AI Consulting",
  "Fractional CTO",
  "Business Technology",
  "Digital Transformation",
  "Small Business AI",
  "Technology Leadership",
  "Business Growth",
] as const;

export const SRI_RAM: BlogAuthor = {
  displayName: "Sri Ram",
  schemaName: "Sriram Ramkumar",
  jobTitle: "Founder & Fractional CTO, KlivIQ Technologies",
  url: "https://www.linkedin.com/in/sriram79",
  bio: "Technology leader with 20+ years of enterprise IT experience, currently helping businesses adopt AI, automation and modern technology without unnecessary complexity.",
};

const STANDARD_RELATED: BlogRelatedResource[] = [
  { label: "Fractional CTO", description: "Senior tech leadership without the full-time cost.", path: "/services/fractional-cto", kind: "service" },
  { label: "AI Consulting", description: "Find where AI creates real value in your business.", path: "/services/ai-consulting", kind: "service" },
  { label: "AI Implementation", description: "What it really takes to put AI into production.", path: "/glossary/ai-implementation", kind: "glossary" },
  { label: "Workflow Automation", description: "How modern automation removes repetitive work.", path: "/glossary/workflow-automation", kind: "glossary" },
  { label: "Digital Transformation", description: "A practical view of modernising operations.", path: "/glossary/digital-transformation", kind: "glossary" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "before-you-spend-a-rupee-on-ai-answer-these-3-questions",
    path: "/blog/before-you-spend-a-rupee-on-ai-answer-these-3-questions",
    title: "Before You Spend a Rupee on AI, Answer These 3 Questions",
    excerpt:
      "Most businesses don't have a technology problem. They have a clarity problem. Three questions every founder should answer before investing in AI.",
    category: "AI",
    tags: [
      "AI Strategy",
      "AI Consulting",
      "Fractional CTO",
      "Business Technology",
      "Digital Transformation",
      "Small Business AI",
      "Technology Leadership",
      "Business Growth",
    ],
    publishDate: "2026-06-14",
    updatedDate: "2026-06-14",
    readingTimeMin: 7,
    author: SRI_RAM,
    heroImage: heroThreeQuestions,
    heroAlt:
      "Abstract emerald geometric composition representing clarity before AI investment",
    seo: {
      title: "Before You Spend a Rupee on AI, Answer These 3 Questions | KlivIQ",
      description:
        "Before investing in AI, automation or digital transformation, answer these three critical questions. A practical guide for founders and business owners.",
      canonical:
        "https://www.kliviq.com/blog/before-you-spend-a-rupee-on-ai-answer-these-3-questions",
      ogTitle: "Before You Spend a Rupee on AI, Answer These 3 Questions",
      ogDescription:
        "Most businesses do not have a technology problem. They have a clarity problem. Learn the three questions every business should answer before investing in AI.",
    },
    toc: [
      { id: "the-ai-trap", label: "The AI Trap" },
      { id: "question-1", label: "Question #1: What Exactly Are We Trying to Solve?" },
      { id: "question-2", label: "Question #2: Who Benefits From This?" },
      { id: "question-3", label: "Question #3: How Will We Know It Worked?" },
      { id: "what-ai-does-well", label: "What AI Actually Does Well" },
      { id: "real-role-of-tech-leadership", label: "The Real Role of Technology Leadership" },
      { id: "a-simple-exercise", label: "A Simple Exercise" },
      { id: "final-thought", label: "Final Thought" },
    ],
    body: [
      {
        type: "intro",
        speakable: true,
        html: "Everyone wants AI right now. Every founder. Every business owner. Every leadership team. The conversations usually start the same way: \"We need AI.\" \"We should automate this.\" \"Our competitors are already using it.\" The problem is that most businesses start looking for solutions before they've clearly defined the problem.",
      },
      {
        type: "p",
        html: "After more than 20 years in technology, I've noticed something interesting. Most businesses don't have a technology problem. They have a clarity problem. And AI is very good at making unclear businesses move faster in the wrong direction.",
      },

      { type: "h2", id: "the-ai-trap", text: "The AI Trap" },
      { type: "p", html: "A few years ago, businesses rushed into mobile apps. Then it was cloud migration. Then digital transformation. Now it's AI. The pattern never changes." },
      { type: "p", html: "A company hears about a new technology, decides it needs it, spends time and money implementing it, and then wonders why the results never arrived. The technology wasn't the problem. The questions were." },
      { type: "p", html: "Before any AI project starts, there are three questions that need answers. Not vague answers. Clear answers. Written down. Agreed upon. Measured." },

      { type: "h2", id: "question-1", text: "Question #1: What Exactly Are We Trying to Solve?" },
      { type: "p", html: "This sounds obvious. It usually isn't." },
      { type: "p", html: "Many businesses say: \"We need an AI chatbot.\" Why? \"Because customer service takes too long.\" Now we're getting somewhere." },
      { type: "p", html: "The real problem isn't the chatbot. The real problem is response time. That opens up a completely different conversation. Maybe the answer is AI. Maybe it's a better process. Maybe it's better documentation. Maybe it's something else entirely." },
      { type: "callout", html: "Technology should solve a business problem. It should never become the goal itself." },

      { type: "h2", id: "question-2", text: "Question #2: Who Benefits From This?" },
      { type: "p", html: "A surprising number of technology projects are built for the wrong audience. Sometimes leadership wants dashboards nobody uses. Sometimes employees are forced into systems that make their jobs harder. Sometimes customers are given features they never asked for." },
      { type: "p", html: "Before investing in AI, ask: Who benefits if this project succeeds?" },
      { type: "ul", items: ["Customers?", "Employees?", "Managers?", "Sales teams?", "Operations?"] },
      { type: "p", html: "If nobody can clearly answer that question, the project isn't ready. The best technology projects create visible value for real people." },

      { type: "h2", id: "question-3", text: "Question #3: How Will We Know It Worked?" },
      { type: "p", html: "This is the question that gets skipped most often." },
      { type: "p", html: "\"We want AI.\" Great. What does success look like? Do you want faster response times? Reduced manual work? Higher conversion rates? Fewer errors? Better customer satisfaction? Pick a number. Pick a deadline." },
      { type: "callout", html: "If success cannot be measured, failure cannot be identified. Projects without measurements have a habit of becoming expensive experiments." },

      { type: "h2", id: "what-ai-does-well", text: "What AI Actually Does Well" },
      { type: "p", html: "Despite all the hype, AI is not magic. What it does exceptionally well is remove repetitive work. It handles tasks that follow patterns. It processes information faster than humans. It works continuously. It scales without needing another hire every time workload increases." },
      { type: "p", html: "The businesses seeing the biggest results from AI are not using it for flashy demonstrations. They're using it to eliminate bottlenecks." },
      { type: "ul", items: [
        "Reducing manual data entry",
        "Automating document processing",
        "Handling routine customer queries",
        "Generating reports automatically",
        "Giving teams more time for higher-value work",
      ]},

      { type: "h2", id: "real-role-of-tech-leadership", text: "The Real Role of Technology Leadership" },
      { type: "p", html: "Many people assume technology leadership is about selecting tools. It isn't. The tools are the easy part. The difficult part is deciding where technology creates value and where it doesn't." },
      { type: "p", html: "That is why growing businesses often struggle. They know technology can help. They know AI can help. They simply don't know where to start." },
      { type: "callout", html: "The most valuable technology decision is rarely the software you choose. It's choosing the right problem to solve first." },

      { type: "h2", id: "a-simple-exercise", text: "A Simple Exercise" },
      { type: "p", html: "Before you spend money on AI, gather your team and answer these three questions:" },
      { type: "ul", items: [
        "What is the single biggest operational frustration in our business today?",
        "How much time or money does it cost us every month?",
        "If we solved it, what would success look like 90 days from now?",
      ]},
      { type: "p", html: "Write the answers down. You may discover that your biggest opportunity has very little to do with AI and everything to do with clarity. Once you have clarity, the technology decisions become much easier." },

      { type: "h2", id: "final-thought", text: "Final Thought" },
      {
        type: "callout",
        speakable: true,
        html: "AI is not a strategy. It's an accelerator. If your direction is clear, AI can help you move faster. If your direction is unclear, AI will simply help you get lost more efficiently.",
      },
      { type: "p", html: "Before you spend a rupee on AI, answer the three questions. Your future self, your team, and your bank account will thank you for it." },
    ],
    faqs: [
      {
        q: "What is the biggest mistake businesses make with AI?",
        a: "Starting with the technology instead of the problem. Most failed AI projects had unclear goals from day one — businesses chose AI before defining what success would look like or who would actually benefit.",
      },
      {
        q: "How do I know if my business is ready for AI?",
        a: "You're ready when you can clearly state the problem you want to solve, who benefits from solving it, and how you'll measure whether it worked. If any of those answers are vague, do that work first — AI will amplify whatever direction you're already pointed in.",
      },
      {
        q: "Do small businesses need a CTO?",
        a: "Most small businesses don't need a full-time CTO, but they do need senior technology judgement when making decisions about AI, automation, or software. A Fractional CTO provides that judgement on a part-time retainer.",
      },
      {
        q: "What is a Fractional CTO?",
        a: "A Fractional CTO is a senior technology leader who works with a business part-time — typically 10 to 20 hours a week — owning technology strategy, architecture decisions, and team direction without the cost of a full-time hire.",
      },
      {
        q: "Can AI help small businesses without large budgets?",
        a: "Yes. Modern AI tools and APIs have made meaningful automation accessible at small-business price points. The biggest results usually come from automating one painful, repetitive workflow rather than building something flashy.",
      },
    ],
    relatedResources: STANDARD_RELATED,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
