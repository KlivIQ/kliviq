import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you work solo or with a team?",
    a: "You work directly with a senior engineer on every project — 20+ years experience, not a junior assigned after you sign. For larger builds, trusted specialists are brought in and managed by us.",
  },
  {
    q: "Can you handle both design and development?",
    a: "Yes — end to end. UI/UX, development, testing, deployment, and documentation. No separate vendors, no handoff gaps.",
  },
  {
    q: "How do you handle Indian and global clients?",
    a: "Same quality, same standards. Different pricing (INR vs USD), payment methods (Razorpay for India, Wise/Payoneer globally), and timezone communication. We're set up for both.",
  },
  {
    q: "What if scope changes mid-project?",
    a: "Additions beyond agreed scope are quoted separately before we proceed. No surprises on your invoice.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Absolutely — before any sensitive discussion.",
  },
  {
    q: "What technologies do you use?",
    a: "Web: React, Next.js, Node.js. Mobile: Flutter. Backend: Python, PostgreSQL, Firebase. AI: OpenAI, Anthropic, Gemini, LangChain. Cloud: AWS, Vercel.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute discovery call — no commitment, no pitch. Just an honest conversation.",
  },
];

const FaqSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-primary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          FAQ
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Questions We Get{" "}
          <span className="gradient-text">Asked Most</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-xl border border-border/50 px-5 data-[state=open]:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
