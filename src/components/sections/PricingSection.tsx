import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import { availability } from "@/data/availability";

type Region = "india" | "global";

const categoryStyles: Record<"Web" | "Mobile" | "AI" | "Retainer", string> = {
  Web: "bg-primary/15 text-primary border-primary/30",
  Mobile: "bg-secondary/15 text-secondary border-secondary/30",
  AI: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  Retainer: "bg-foreground/10 text-foreground/80 border-foreground/20",
};

const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();
  const [region, setRegion] = useState<Region>("india");

  return (
    <section id="pricing" className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.pricing.eyebrow}
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {t.pricing.heading1}{" "}
          <span className="gradient-text">{t.pricing.heading2}</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {t.pricing.intro}
        </motion.p>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="relative inline-flex p-1 rounded-full glass border border-border/50">
            {(["india", "global"] as Region[]).map((r) => {
              const active = region === r;
              return (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  aria-pressed={active}
                  className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
                    active
                      ? "text-primary-foreground scale-105"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="region-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary glow-teal"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative font-semibold tracking-wide">
                    {r === "india" ? t.pricing.regionIndia : t.pricing.regionGlobal}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            className="grid md:grid-cols-2 gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {t.pricing.items.map((item, i) => (
              <motion.div
                key={`${region}-${i}`}
                className="glass-strong rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 hover:border-primary/40 transition-colors min-w-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border mb-2 ${categoryStyles[item.category]}`}
                  >
                    {t.pricing.categories[item.category]}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold truncate">{item.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm sm:text-base md:text-lg font-bold gradient-text whitespace-nowrap">
                    {region === "india" ? item.indiaPrice : item.globalPrice}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="glass rounded-2xl p-6 md:p-8 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <ul className="space-y-2 text-foreground/80">
            {t.pricing.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-secondary/50 bg-secondary/10 shadow-[0_0_32px_hsl(var(--secondary)/0.12)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6">
              <div className="flex items-start sm:items-center gap-3 text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <CalendarClock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-lg font-extrabold text-foreground">{t.pricing.urgency}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.pricing.urgencyDetail}</p>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground transition-transform hover:scale-[1.03]"
              >
                {t.pricing.urgencyCta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <div className="h-1.5 w-full bg-secondary/15" aria-hidden>
              <motion.div
                className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : {}}
                transition={{ delay: 0.65, duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary animate-pulse-glow transition-transform hover:scale-105"
          >
            {t.pricing.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
