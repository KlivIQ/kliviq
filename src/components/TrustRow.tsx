import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Rocket, Award, IndianRupee } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Award, Globe2, Rocket, ShieldCheck, IndianRupee];

/**
 * Trust strip: credibility badges shown above the testimonials section.
 */
const TrustRow = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { t } = useLang();

  return (
    <section aria-label={t.trust.eyebrow} className="relative py-14 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.trust.eyebrow}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {t.trust.badges.map((badge, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={badge}
                className="glass rounded-full px-4 py-2.5 flex items-center gap-2 text-sm font-semibold text-foreground/85 hover:border-secondary/40 hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
              >
                <Icon className="w-4 h-4" style={{ color: "#4ADE80" }} aria-hidden />
                {badge}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustRow;
