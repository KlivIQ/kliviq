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
    q: "What is AI implementation?",
    a: "We analyse your business processes, identify where AI creates the most value, then build and integrate the tools — chatbots, automation workflows, intelligent dashboards — directly into how you work. You see ROI in weeks, not quarters.",
  },
  {
    q: "What is a Fractional CTO?",
    a: "A senior technology leader who works with you part-time — typically 10–20 hours/week on retainer. If you're making technology decisions without a senior tech person in the room, you need one. We strategy and build — not just advise.",
  },
  {
    q: "How do you deliver in weeks when others take months?",
    a: "AI-assisted development, focused sprints, no agency overhead. No account managers, no briefing chains. You work directly with the person building.",
  },
  {
    q: "Do you work with Indian and global clients?",
    a: "Yes — separate INR and USD pricing, Razorpay for India, Wise/Payoneer internationally. Same quality, same standards.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed price agreed upfront. 30% to start, 40% mid-project, 30% on delivery. No surprises.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Immediately and without question.",
  },
  {
    q: "What technologies do you use?",
    a: "AI: OpenAI, Claude, Gemini, LangChain, n8n. Web: React, Next.js, Node.js. Mobile: Flutter. Backend: Python, PostgreSQL, Firebase. Cloud: AWS, Vercel, Google Cloud.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute scoping call. No pitch, no commitment — just an honest conversation.",
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
          <span className="text-foreground">Questions We Get</span>{" "}
          <span style={{ color: "#4ADE80" }}>Asked</span>
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
