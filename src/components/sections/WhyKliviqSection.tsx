import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import { X, Check } from "lucide-react";

const without = [
  "Hire a dev team: 3–6 months",
  "Build AI strategy: 2–3 months planning",
  "MVP live: 4–6 months minimum",
  "Find a CTO: 2–4 month search",
  "Cost: ₹20L–₹50L+ to get started",
];

const withKliviq = [
  "AI implementation live: 4–6 weeks",
  "Strategy + execution: same team, week one",
  "MVP live: 3–5 weeks",
  "Fractional CTO: engaged from week one",
  "Cost: fraction of a full-time hire",
];

const stats = [
  { value: "20+ Years", label: "Enterprise experience" },
  { value: "4–6 Weeks", label: "Average delivery" },
  { value: "Frac. CTO", label: "From week one" },
  { value: "Fixed Price", label: "Always" },
  { value: "India + Global", label: "Clients served" },
];

const WhyKliviqSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();


  return (
    <section id="why-kliviq" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.why.eyebrow}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">{t.why.heading1}</span>{" "}
          <span style={{ color: "#4ADE80" }}>{t.why.heading2}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            className="glass rounded-2xl p-8 border"
            style={{ borderColor: "rgba(239, 68, 68, 0.25)" }}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-5 text-muted-foreground uppercase tracking-wide">
              Without KlivIQ
            </h3>
            <ul className="space-y-3">
              {without.map((t, i) => (
                <li key={i} className="flex gap-3 text-foreground/70">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-8 border glow-teal"
            style={{ borderColor: "rgba(74, 222, 128, 0.4)" }}
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-5 uppercase tracking-wide" style={{ color: "#4ADE80" }}>
              With KlivIQ
            </h3>
            <ul className="space-y-3">
              {withKliviq.map((t, i) => (
                <li key={i} className="flex gap-3 text-foreground/90">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#4ADE80" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
            >
              <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: "#4ADE80" }}>
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKliviqSection;
