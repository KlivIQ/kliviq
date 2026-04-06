import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    text: "Working with Sri completely changed our product timeline — we launched faster and better than expected.",
  },
  {
    text: "The AI solution saved us hours every week. This wasn't just development — it was transformation.",
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          Testimonials
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          What Happens When You{" "}
          <span className="gradient-text">Work With Me</span>
        </motion.h2>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="glass rounded-2xl p-10 md:p-14 glow-purple"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-6xl gradient-text font-serif leading-none block mb-4">"</span>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                {testimonials[active].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 justify-center mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
