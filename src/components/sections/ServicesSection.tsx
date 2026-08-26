import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import { Sparkles, Compass, Layers, Zap, ArrowRight } from "lucide-react";

const serviceMeta = [
  // Bento layout: the first tile is the hero tile, the rest fill around it.
  { icon: Sparkles, link: "/services/ai-consulting", span: "lg:col-span-4 lg:row-span-2" },
  { icon: Compass, link: "/services/fractional-cto", span: "lg:col-span-2" },
  { icon: Layers, link: "/services/custom-app-development", span: "lg:col-span-2" },
  { icon: Zap, link: "/services/mvp-development", span: "lg:col-span-6" },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-5">
          {t.services.cards.map((s, i) => {
            const meta = serviceMeta[i];
            const Icon = meta.icon;
            const isHero = i === 0;
            return (
              <motion.div
                key={i}
                className={`glass rounded-3xl p-7 md:p-8 group hover:glow-purple transition-all duration-500 hover:-translate-y-1.5 flex flex-col ${meta.span}`}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.55 }}
              >
                <div
                  className={`${isHero ? "w-14 h-14" : "w-12 h-12"} rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`${isHero ? "w-7 h-7" : "w-6 h-6"} text-primary-foreground`} />
                </div>
                <h3
                  className={`${isHero ? "text-2xl md:text-3xl" : "text-xl"} font-bold tracking-tight mb-3 text-foreground`}
                >
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <ul className={`mb-6 gap-2 ${isHero ? "grid sm:grid-cols-2" : "space-y-2"}`}>
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
