import { motion } from "framer-motion";

const HeroSection = () => {
  const words = "Build Faster. Launch Smarter. Scale Without Chaos.".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0 pb-28 md:pb-0">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3 md:mr-4"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <span className={i < 2 || i > 5 ? "gradient-text" : "text-foreground"}>
                {word}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          We design and build high-performance websites, mobile apps, and AI-powered
          tools — with 20+ years of enterprise expertise behind every decision we make.
        </motion.p>

        <motion.a
          href="#contact"
          className="inline-block px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary animate-pulse-glow transition-transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Start Your Project
        </motion.a>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm text-muted-foreground bg-background/60 border border-brand-cyan/40 backdrop-blur-sm">
            <span aria-hidden>⚡</span>
            Currently accepting 2 new projects for Q3 2026
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, y: { repeat: Infinity, duration: 2 } }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
