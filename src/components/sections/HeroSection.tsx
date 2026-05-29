import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const ThreeBackground = lazy(() => import("@/components/ThreeBackground"));

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-28 pb-28 md:pb-20">
      {/* Particle background — hero only */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-foreground">Your Business, Running on AI.</span>
          <span className="block" style={{ color: "#4ADE80" }}>
            Delivered in Weeks — Not Months.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          We implement AI into your business, build the tools to run it, and provide
          the tech leadership to scale it — without the cost of a full-time hire.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Serving startups and SMEs across India and globally.
          Fixed scope. Fixed price. Zero chaos.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary animate-pulse-glow transition-transform hover:scale-105"
          >
            Implement AI in My Business →
          </a>
          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full font-semibold text-foreground border border-border/60 glass hover:border-secondary/60 transition-colors"
          >
            Book a Free Consultation
          </a>
        </motion.div>

        <motion.div
          className="mt-4 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <a
            href="#process"
            className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See how we work ↓
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm text-muted-foreground bg-background/60 backdrop-blur-sm"
            style={{ border: "1px solid #4ADE80" }}
          >
            <span aria-hidden>⚡</span>
            Currently onboarding 2 new clients for Q3 2026
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
