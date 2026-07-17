import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";

const testimonials = [
  {
    quote:
      "Sriram is a subject matter expert in Testing. He was brought in to help us automate regression test scripts that can be reused on future software releases for our project. He brings in a wealth of knowledge for test technologies and test processes. We used to run User Acceptance Testing manually and test management was very labor intensive and inefficient. Sriram helped us develop processes on using HP Quality Center for test management. He also helped us train all our users on HP Quality Center. He is very results oriented and collaborates well in a team environment. He also brings in a lot of fresh ideas on how we can improve on our existing test processes.",
    name: "Jocelyn Ang, MBA",
    title: "Global Senior Manager of IT Infrastructure Services, Medela",
  },
  {
    quote:
      "Sriram was an excellent Test Manager for a complex project integrating Software as a Service components with internal systems in R&D IT. He learned quickly, was proactive, and worked with high integrity. He established our offshore test team quickly and had them ready to begin, and coordinated efforts very effectively. Opportunity to work with him again will be much appreciated.",
    name: "Terri Fleming",
    title: "IT Program Management, Life Sciences Systems Delivery",
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();


  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="text-sm uppercase tracking-widest text-secondary mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          {t.testimonials.eyebrow}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">{t.testimonials.heading1}</span>{" "}
          <span style={{ color: "#4ADE80" }}>{t.testimonials.heading2}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-6 md:p-10 glow-purple flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <span className="text-4xl md:text-5xl gradient-text font-serif leading-none block mb-3">"</span>
              <p className="text-xs md:text-base text-foreground/90 leading-relaxed mb-6 flex-1">
                {t.quote}
              </p>
              <div className="mt-auto">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground mb-3">{t.title}</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-muted-foreground bg-background/60 border border-brand-cyan/40">
                  <span className="text-brand-cyan">★★★★★</span>
                  LinkedIn Recommendation
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
