import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Compass, Layers, Zap } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "AI Implementation for Business",
    desc: "We take AI from buzzword to business tool. Chatbots, automation workflows, intelligent dashboards — scoped, built, and live in 4–6 weeks.",
    bullets: [
      "Business process automation",
      "AI chatbots and assistants",
      "Workflow automation (n8n, custom)",
      "OpenAI, Gemini, Claude API integrations",
      "RAG pipelines and knowledge bases",
    ],
  },
  {
    icon: Compass,
    title: "Fractional CTO",
    desc: "Senior tech leadership without the full-time cost. We own your technology strategy, make the right architecture decisions, and build alongside you — from week one.",
    bullets: [
      "Technology strategy and roadmap",
      "Architecture and stack decisions",
      "AI adoption planning for your business",
      "Vendor and team oversight",
      "10–20 hrs/week on monthly retainer",
    ],
  },
  {
    icon: Layers,
    title: "Web & Mobile Development",
    desc: "High-performance websites and cross-platform mobile apps built with AI-assisted development. React, Next.js, Flutter. Faster delivery, fewer bugs, cleaner code.",
    bullets: [
      "React and Next.js web apps",
      "Flutter mobile (iOS + Android)",
      "MVP in 3–4 weeks",
      "Full product in 6–10 weeks",
      "AI-assisted development throughout",
    ],
  },
  {
    icon: Zap,
    title: "Custom AI Tools & Automation",
    desc: "Internal tools your team actually uses — AI dashboards, document processors, automated reporting, custom integrations. Built to scale.",
    bullets: [
      "Custom AI tools and dashboards",
      "Document and data automation",
      "Business intelligence with AI",
      "API integrations and SaaS MVPs",
      "Automation frameworks",
    ],
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          What We Do
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">AI-First Services.</span>{" "}
          <span style={{ color: "#4ADE80" }}>Built for Real Business Outcomes.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          We don't just build software. We implement intelligence into your business — and
          deliver it before your competitor finishes planning.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-8 group hover:glow-purple transition-all duration-500 hover:-translate-y-1 flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2 mt-auto">
                {s.bullets.map((b, j) => (
                  <li key={j} className="text-sm text-foreground/80 flex gap-2">
                    <span style={{ color: "#4ADE80" }}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
