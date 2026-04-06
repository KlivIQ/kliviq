import { motion } from "framer-motion";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";

const projects = [
  { title: "AI Content Platform", metric: 75, suffix: "%", label: "Faster content production" },
  { title: "E-commerce Mobile App", metric: 40, suffix: "%", label: "Boost in conversion rates" },
  { title: "SaaS Dashboard", metric: 5000, suffix: "+", label: "Users with simplified workflows" },
  { title: "HealthTech Platform", metric: 10000, suffix: "+", label: "Users connected in real-time" },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const count = useCountUp(project.metric, isVisible);
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500"
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
          {count.toLocaleString()}{project.suffix}
        </div>
        <p className="text-muted-foreground">{project.label}</p>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref}>
          <motion.p
            className="text-sm uppercase tracking-widest text-primary mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
          >
            Projects
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            Proof. <span className="gradient-text">Not Promises.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
