import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Camera, Sparkles, Users, MessageCircle } from "lucide-react";

const seenzoLogo = "data:image/webp;base64,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";

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

        {/* Featured live products: Seenzo (amber ad-callout) + KlivIQ Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Seenzo — bold ad-style callout, amber accent */}
          <motion.a
            href="https://seenzo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-2 relative rounded-2xl p-8 md:p-10 overflow-hidden group hover:-translate-y-1 transition-transform duration-500 flex flex-col border-2"
            style={{
              borderColor: "rgba(245,158,11,0.55)",
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(10,15,30,0.6) 60%)",
              boxShadow: "0 20px 60px -20px rgba(245,158,11,0.35)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ background: "#F59E0B" }} />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/95"
                >
                  <img src={seenzoLogo} alt="Seenzo logo" className="w-9 h-9 object-contain" />
                </div>

                <span className="text-2xl font-extrabold tracking-tight" style={{ color: "#F59E0B" }}>
                  Seenzo
                </span>
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border text-muted-foreground"
                  style={{ borderColor: "rgba(148,163,184,0.35)" }}
                >
                  by KlivIQ
                </span>
                <span
                  className="ml-auto inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.5)" }}
                >
                  Free • 5 min
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold mb-3 text-foreground leading-tight">
                Does ChatGPT Know Your <span style={{ color: "#F59E0B" }}>Business Exists?</span>
              </h3>
              <p className="text-foreground/85 text-base md:text-lg leading-relaxed mb-3">
                Get your free AI Visibility Score in under 5 minutes. See exactly how invisible — or visible — you are to ChatGPT, Gemini, and Perplexity.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Seenzo scans your website and scores it 0–100 on AI visibility across 6 categories. Most Indian businesses score below 30. We show you exactly what's broken and fix it.
              </p>

              <span
                className="mt-auto inline-flex items-center gap-2 self-start px-5 py-3 rounded-full text-sm font-bold text-background transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}
              >
                Get My Free Seenzo Score →
              </span>
            </div>
          </motion.a>

          {/* KlivIQ Connect */}
          <motion.a
            href="#contact"
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden group hover:-translate-y-1 transition-transform duration-500 flex flex-col border-2"
            style={{
              borderColor: "rgba(59,130,246,0.55)",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.14) 0%, rgba(10,15,30,0.6) 60%)",
              boxShadow: "0 20px 60px -20px rgba(59,130,246,0.4)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ background: "#3B82F6" }} />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)" }}
                >
                  <MessageCircle className="w-6 h-6" style={{ color: "#25D366" }} />
                </div>
                <span className="text-2xl font-extrabold tracking-tight" style={{ color: "#60A5FA" }}>
                  KlivIQ Connect
                </span>
                <span
                  className="ml-auto inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: "#60A5FA", borderColor: "rgba(96,165,250,0.5)" }}
                >
                  Now Booking
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-snug">
                Your Own AI Chatbot on WhatsApp — Built For Your Business
              </h3>
              <p className="text-foreground/85 leading-relaxed mb-3">
                Customizable, done-for-you WhatsApp chatbots for clinics, salons, CA firms, and D2C brands. No code. No per-message markup. Just results.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                <span className="text-foreground font-extrabold text-lg" style={{ color: "#60A5FA" }}>KlivIQ Connect</span> is a multi-tenant WhatsApp-first chatbot engine — bookings, reminders, broadcasts, AI-powered answers in 7 Indian languages including Tamil, Hindi, and Sanskrit. Senior-led setup, live in 7 working days.
              </p>

              <span
                className="mt-auto inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-background self-start transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)" }}
              >
                Talk to Us About Connect →
              </span>
            </div>
          </motion.a>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.45 + index * 0.1, duration: 0.5 }}
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
