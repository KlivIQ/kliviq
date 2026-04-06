import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pills = [
  "I turn rough ideas into polished, production-ready platforms",
  "I use AI to automate workflows and unlock new possibilities",
  "I build systems that are stable, scalable, and future-proof",
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
          Not Just a Developer.{" "}
          <span className="gradient-text">Your Tech Partner.</span>
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          I'm Sri — with 20+ years in IT and deep expertise in building scalable digital
          products. I don't just write code. I solve business problems using technology.
        </motion.p>

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
          If it involves tech, performance, and growth — I'm in.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
