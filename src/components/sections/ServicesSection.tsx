import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import { Sparkles, Compass, Layers, Zap, ArrowRight } from "lucide-react";

const serviceMeta = [
  // A deliberately varied mosaic: feature cards span wide, supporting cards
  // pair up on mobile and occupy the narrow desktop rail.
  { icon: Sparkles, link: "/services/ai-consulting", span: "col-span-2 lg:col-span-7" },
  { icon: Compass, link: "/services/fractional-cto", span: "col-span-1 lg:col-span-5" },
  { icon: Layers, link: "/services/custom-app-development", span: "col-span-1 lg:col-span-5" },
  { icon: Zap, link: "/services/mvp-development", span: "col-span-2 lg:col-span-7" },
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
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-center mb-4"
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

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-5 lg:auto-rows-fr">
          {t.services.cards.map((s, i) => {
            const meta = serviceMeta[i];
            const Icon = meta.icon;
            const isHero = i === 0;
            return (
              <motion.div
                key={i}
                className={`glass rounded-lg p-4 sm:p-6 lg:p-7 group hover:glow-purple transition-all duration-500 hover:-translate-y-1.5 flex flex-col min-w-0 ${meta.span}`}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.55 }}
              >
                <div
                  className="w-11 h-11 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3
                   className={`${isHero ? "text-xl sm:text-2xl" : "text-base sm:text-lg lg:text-xl"} font-bold mb-3 text-foreground break-words`}
                >
                  {s.title}
                </h3>
                <p className={`text-muted-foreground leading-relaxed mb-5 ${isHero ? "text-base" : "text-sm lg:text-base"}`}>{s.desc}</p>
                <ul className={`mb-6 gap-2 ${isHero ? "grid sm:grid-cols-2" : "hidden lg:grid lg:grid-cols-2"}`}>
                  {s.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-foreground/80 flex gap-2">
                      <span style={{ color: "#4ADE80" }}>→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={meta.link}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80 break-words"
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
