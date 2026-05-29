import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import sriramPhoto from "@/assets/sriram-ramkumar.jpeg";

const pills = [
  "We implement AI that creates measurable business ROI",
  "We build and ship in weeks using AI-assisted delivery",
  "We bring 20+ years of enterprise expertise to every project",
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">Not Just a Studio.</span>{" "}
          <span style={{ color: "#4ADE80" }}>Your AI & Technology Partner.</span>
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

        {/* Founder block */}
        <motion.div
          className="mt-16 glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          <img
            src={sriramPhoto}
            alt="Sriram Ramkumar, Co-Founder & CTO of KlivIQ"
            loading="lazy"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shrink-0 ring-2 ring-secondary/40"
          />
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest text-secondary mb-1">
              Meet the Founder
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Sriram Ramkumar
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Co-Founder &amp; CTO, KlivIQ
            </p>
            <p className="text-foreground/85 max-w-xl mb-4">
              20+ years building enterprise software across Banking, Retail, Healthcare,
              and Logistics. Now helping growing businesses adopt AI and ship products —
              without the enterprise price tag or the full-time hire.
            </p>
            <a
              href="https://www.linkedin.com/in/sriram79"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass hover:border-secondary/60 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
