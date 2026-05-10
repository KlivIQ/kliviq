import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { title: "Understand", desc: "We align on goals, scope, and outcomes. No assumptions." },
  { title: "Design", desc: "Clear structure, wireframes, and direction before coding begins." },
  { title: "Build", desc: "Fast iterations with continuous feedback — no black box development." },
  { title: "Launch", desc: "Tested, stable, and ready to scale." },
  { title: "Handover", desc: "Complete ownership transferred — source code, hosting access, credentials, and documentation. Plus 30 days post-launch support included." },
  { title: "Grow (Optional)", desc: "Monthly retainer for updates, new features, and performance monitoring. Most clients stay. Either way — the door's always open." },
];

const ProcessStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div ref={ref} className="flex gap-6 md:gap-10 relative">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-primary relative z-10"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1, backgroundColor: "hsl(270 60% 60%)" } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {isVisible && (
            <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
          )}
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            className="w-[2px] flex-1 neon-line"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="pb-16"
        initial={{ opacity: 0, x: 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
          Step {index + 1}
        </span>
        <h3 className="text-2xl font-bold mb-2 gradient-text">{step.title}</h3>
        <p className="text-muted-foreground max-w-md">{step.desc}</p>
      </motion.div>
    </div>
  );
};

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div ref={ref}>
          <motion.p
            className="text-sm uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
          >
            Process
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            How Things Actually{" "}
            <span className="gradient-text">Get Done</span>
          </motion.h2>
        </div>

        <div className="ml-2">
          {steps.map((step, i) => (
            <ProcessStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
