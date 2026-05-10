import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Code, Brain, Lightbulb, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web & App Development",
    desc: "Fast, scalable, and cleanly built applications designed for performance and growth.",
  },
  {
    icon: Brain,
    title: "AI-Powered Solutions",
    desc: "Custom AI tools that automate work, improve efficiency, and create smarter user experiences.",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy & Innovation",
    desc: "Turn vague ideas into structured, actionable product roadmaps that actually work.",
  },
  {
    icon: ShieldCheck,
    title: "Test Automation & Quality Engineering",
    desc: "Robust automation frameworks that catch issues early and ensure reliable releases.",
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
          Services
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          What We Build <span className="gradient-text">For You</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 text-lg"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          From idea to execution — we handle the entire journey.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-8 group hover:glow-purple transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
