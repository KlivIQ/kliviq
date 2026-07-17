import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import { Sparkles, Compass, Layers, Zap, ArrowRight } from "lucide-react";

const serviceMeta = [
  { icon: Sparkles, link: "/services/ai-consulting" },
  { icon: Compass, link: "/services/fractional-cto" },
  { icon: Layers, link: "/services/custom-app-development" },
  { icon: Zap, link: "/services/mvp-development" },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.services.eyebrow}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">{t.services.heading1}</span>{" "}
          <span style={{ color: "#4ADE80" }}>{t.services.heading2}</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {t.services.intro}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.cards.map((s, i) => {
            const meta = serviceMeta[i];
            const Icon = meta.icon;
            return (
              <motion.div
                key={i}
                className="glass rounded-2xl p-8 group hover:glow-purple transition-all duration-500 hover:-translate-y-1 flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-foreground/80 flex gap-2">
                      <span style={{ color: "#4ADE80" }}>→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={meta.link}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: "#4ADE80" }}
                  aria-label={`${t.services.learnMorePrefix} ${s.linkLabel}`}
                >
                  {t.services.learnMorePrefix} {s.linkLabel} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
