import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FlaskConical } from "lucide-react";

const ProductsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="products" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          Products
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">Coming Soon.</span>{" "}
          <span style={{ color: "#4ADE80" }}>Productised AI Tools.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-16 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Building repeatable AI tools that solve real enterprise problems — open-source at the core, commercial where it counts.
        </motion.p>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Dimmed overlay to signal "coming soon" */}
            <div className="absolute inset-0 bg-background/30 pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-primary-foreground" />
                </div>
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: "#4ADE80", borderColor: "rgba(74,222,128,0.4)" }}
                >
                  Launching 2026
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                Enterprise Test Automation Framework
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A modular, AI-assisted test automation framework built for regulated and enterprise environments. Open-source core, enterprise add-ons. Currently in final development.
              </p>

              <a
                href="mailto:hello@kliviq.com?subject=Waitlist%20for%20Enterprise%20Test%20Automation%20Framework"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold self-start transition-opacity hover:opacity-80"
                style={{ color: "#4ADE80" }}
              >
                Join the Waitlist →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
