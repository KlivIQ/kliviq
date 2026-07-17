import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";

const pills = [
  "We implement AI that creates measurable business ROI",
  "We build and ship in weeks using AI-assisted delivery",
  "We bring 20+ years of enterprise expertise to every project",
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.about.eyebrow}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">{t.about.heading1}</span>{" "}
          <span style={{ color: "#4ADE80" }}>{t.about.heading2}</span>
        </motion.h2>

        <motion.div
          className="space-y-5 text-lg text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p>
            KlivIQ was built on one idea: businesses that implement AI now will outpace
            those that wait.
          </p>
          <p>
            We've spent 20+ years delivering enterprise software across Banking, Retail,
            Healthcare, and Logistics. Now we bring that same expertise to growing
            businesses — without the enterprise price tag.
          </p>
          <p>
            When you work with KlivIQ, you get a senior technology partner who thinks
            strategically and builds hands-on. No junior developers. No handoffs. Direct
            delivery from day one.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mt-10">
          {pills.map((text, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl px-6 py-4 glow-purple"
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
            >
              <p className="text-foreground/90">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted-foreground mt-8 text-lg"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          If it involves AI, technology, and growth — we're in.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
