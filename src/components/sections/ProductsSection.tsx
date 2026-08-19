import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import { products } from "@/data/products";

/**
 * Compact homepage teaser. Full product detail lives on /products.
 */
const ProductsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="products" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.products.eyebrow}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: "#4ADE80" }}>{t.products.heading}</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-12 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {t.products.intro}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            >
              <Link
                to={`/products#${p.slug}`}
                className="group h-full flex flex-col rounded-2xl p-5 border-2 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${p.accent}66`,
                  background: `linear-gradient(135deg, ${p.accent}1f 0%, rgba(10,15,30,0.55) 65%)`,
                  boxShadow: `0 18px 50px -22px ${p.accent}88`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-xl"
                  />
                  <span
                    className="ml-auto text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{ color: p.accent, borderColor: `${p.accent}80` }}
                  >
                    {p.statusLabel}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold tracking-tight mb-1" style={{ color: p.accent }}>
                  {p.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{p.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/90 group-hover:gap-2.5 transition-all">
                  Details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
          >
            Explore all products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
