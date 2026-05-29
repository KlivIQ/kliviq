import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone, Linkedin } from "lucide-react";

const contactItems = [
  { icon: Mail, label: "hello@kliviq.com", href: "mailto:hello@kliviq.com" },
  { icon: Phone, label: "+91-9840497937 (WhatsApp Only)", href: "tel:+919840497937" },
  { icon: Linkedin, label: "linkedin.com/company/kliviq", href: "https://linkedin.com/company/kliviq" },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="relative py-32 px-6">



      <div className="max-w-2xl mx-auto relative z-10" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          Contact
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Let's Build Something{" "}
          <span className="gradient-text">That Matters</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          If you're serious about building something impactful — let's talk.
        </motion.p>

        <motion.div
          className="glass-strong rounded-2xl p-5 sm:p-8 md:p-12 glow-purple"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col gap-6">
            {contactItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground/80 hover:text-foreground group transition-colors duration-300 min-w-0"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/40 group-hover:to-secondary/40 transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-base sm:text-lg min-w-0 break-all sm:break-words">{item.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="mailto:hello@kliviq.com"
            className="inline-block mt-10 px-8 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary animate-pulse-glow transition-transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
