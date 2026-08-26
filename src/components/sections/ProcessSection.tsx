import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";

type Step = { title: string; desc: string };

const ProcessStep = ({
  step,
  index,
  total,
  stepPrefix,
}: {
  step: Step;
  index: number;
  total: number;
  stepPrefix: string;
}) => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div ref={ref} className="flex gap-6 md:gap-10 relative">
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-primary relative z-10"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1, backgroundColor: "hsl(142 64% 24%)" } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {isVisible && (
            <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
          )}
        </motion.div>
        {index < total - 1 && (
          <motion.div
            className="w-[2px] flex-1 neon-line"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </div>

      <motion.div
        className="pb-16"
        initial={{ opacity: 0, x: 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
          {stepPrefix} {index + 1}
        </span>
        <h3 className="text-2xl font-bold mb-2 gradient-text">{step.title}</h3>
        <p className="text-muted-foreground max-w-md">{step.desc}</p>
      </motion.div>
    </div>
  );
};

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="process" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div ref={ref}>
          <motion.p
            className="text-sm uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
          >
            {t.process.eyebrow}
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {t.process.heading1}{" "}
            <span className="gradient-text">{t.process.heading2}</span>
          </motion.h2>
        </div>

        <div className="ml-2">
          {t.process.steps.map((step, i) => (
            <ProcessStep
              key={i}
              step={step}
              index={i}
              total={t.process.steps.length}
              stepPrefix={t.process.stepPrefix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
