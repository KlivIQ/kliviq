import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.testimonials.eyebrow}
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">{t.testimonials.heading1}</span>{" "}
          <span style={{ color: "#4ADE80" }}>{t.testimonials.heading2}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 md:p-10 glow-purple flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <span className="text-4xl md:text-5xl gradient-text font-serif leading-none block mb-3">"</span>
              <p className="text-xs md:text-base text-foreground/90 leading-relaxed mb-6 flex-1">
                {item.quote}
              </p>
              <div className="mt-auto">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground mb-3">{item.title}</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-muted-foreground bg-background/60 border border-brand-cyan/40">
                  <span className="text-brand-cyan">★★★★★</span>
                  {t.testimonials.linkedInBadge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
