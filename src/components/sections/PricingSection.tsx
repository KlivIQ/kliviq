import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Region = "india" | "global";

type PricingItem = {
  category: "Web" | "Mobile" | "AI" | "Retainer";
  title: string;
  price: string;
};

const INDIA_PRICING: PricingItem[] = [
  { category: "Retainer", title: "Fractional CTO Retainer", price: "from ₹40,000/month" },
  { category: "AI", title: "AI Implementation", price: "from ₹75,000" },
  { category: "AI", title: "AI Chatbot / Automation", price: "from ₹60,000" },
  { category: "Web", title: "Web Platform", price: "from ₹75,000" },
  { category: "Mobile", title: "Mobile App MVP", price: "from ₹2,50,000" },
  { category: "AI", title: "Custom AI Tool", price: "from ₹2,00,000" },
];

const GLOBAL_PRICING: PricingItem[] = [
  { category: "Retainer", title: "Fractional CTO Retainer", price: "from $800/month" },
  { category: "AI", title: "AI Implementation", price: "from $2,000" },
  { category: "AI", title: "AI Chatbot / Automation", price: "from $1,500" },
  { category: "Web", title: "Web Platform", price: "from $2,000" },
  { category: "Mobile", title: "Mobile App MVP", price: "from $5,000" },
  { category: "AI", title: "Custom AI Tool", price: "from $5,000" },
];

const categoryStyles: Record<PricingItem["category"], string> = {
  Web: "bg-primary/15 text-primary border-primary/30",
  Mobile: "bg-secondary/15 text-secondary border-secondary/30",
  AI: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  Retainer: "bg-foreground/10 text-foreground/80 border-foreground/20",
};

const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [region, setRegion] = useState<Region>("india");
  const items = region === "india" ? INDIA_PRICING : GLOBAL_PRICING;

  return (
    <section id="pricing" className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          Pricing
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Honest Pricing.{" "}
          <span className="gradient-text">No Surprises.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Fixed price. Milestone payments (30 · 40 · 30).
          <br />
          Scoped on a free 30-minute call.
        </motion.p>

        {/* Region toggle */}
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
                    {r === "india" ? "🇮🇳 India (₹)" : "🌍 Global ($)"}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Pricing grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            className="grid md:grid-cols-2 gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {items.map((item, i) => (
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
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold truncate">{item.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm sm:text-base md:text-lg font-bold gradient-text whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Notes block */}
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <ul className="space-y-2 text-foreground/80">
            <li>✅ Fixed-price · milestone payments (30% · 40% · 30%)</li>
            <li>✅ GST invoices for Indian clients</li>
            <li>✅ International payments via Wise / Payoneer</li>
            <li>📞 Free 30-min scoping call before any commitment</li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary animate-pulse-glow transition-transform hover:scale-105"
          >
            Book a Free Scoping Call →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
