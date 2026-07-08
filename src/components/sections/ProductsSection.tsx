import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Camera, Sparkles, Users, Radar, MessageCircle } from "lucide-react";

interface ProductCard {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  mailSubject: string;
}

const ProductsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const products: ProductCard[] = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary-foreground" />,
      badge: "Launching 2026",
      title: "Kroviq Studio",
      description:
        "A productised AI studio for rapid design, prototyping and intelligent workflow development. Built for teams who want production-ready AI assets without starting from scratch.",
      mailSubject: "Waitlist%20for%20Kroviq%20Studio",
    },
    {
      icon: <Camera className="w-6 h-6 text-primary-foreground" />,
      badge: "In Development",
      title: "SareeTry AI",
      description:
        "A plug-and-play AI try-on widget for online saree stores. Customers upload a photo and instantly visualise how a saree looks on them — engineered to reduce returns and lift conversions.",
      mailSubject: "Waitlist%20for%20SareeTry%20AI%20Widget",
    },
    {
      icon: <Users className="w-6 h-6 text-primary-foreground" />,
      badge: "Private Beta",
      title: "Aacharam",
      description:
        "A roots and ancestry platform crafted for the Tamil community. Preserve family history, trace lineages and use AI-powered matching to discover relatives already in the network.",
      mailSubject: "Waitlist%20for%20Aacharam",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-background/30 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    {product.icon}
                  </div>
                  <span
                    className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{ color: "#4ADE80", borderColor: "rgba(74,222,128,0.4)" }}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                  {product.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                <a
                  href={`mailto:hello@kliviq.com?subject=${product.mailSubject}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold self-start transition-opacity hover:opacity-80"
                  style={{ color: "#4ADE80" }}
                >
                  Join the Waitlist →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
