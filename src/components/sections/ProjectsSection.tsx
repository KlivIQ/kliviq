import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/i18n/LanguageContext";
import thumbScopeSnap from "@/assets/thumb-scopesnap.webp";
import thumbPitchDeck from "@/assets/thumb-pitchdeck.webp";
import thumbClinicPing from "@/assets/thumb-clinicping.webp";
import thumbFaco from "@/assets/thumb-faco.webp";
import thumbZeroRupees from "@/assets/thumb-zero-rupees.webp";

const cardMeta = [
  { href: "https://faco-site.lovable.app", image: thumbFaco },
  { href: "/scopesnap", image: thumbScopeSnap },
  { href: "/pitchdeck", image: thumbPitchDeck },
  { href: "/clinicping", image: thumbClinicPing },
  { href: "https://zero-rupees.vercel.app/", image: thumbZeroRupees },
];

type CardItem = {
  title: string;
  blurb: string;
  badge: string;
  cta: string;
  href: string;
  image: string;
};

const ClientWorkCard = ({ item, index }: { item: CardItem; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div ref={ref} className="h-full">
      <motion.a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group glass rounded-2xl overflow-hidden flex flex-col h-full relative hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--secondary)/0.4)] hover:border-secondary/40"
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={`${item.title} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase glass-strong text-secondary border border-secondary/30">
            {item.badge}
          </div>
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-foreground translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
            {item.title}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-4 h-4 text-secondary" />
            </span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.blurb}</p>
          <span className="mt-2 text-xs font-medium text-secondary inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
            {item.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </motion.a>
    </div>
  );
};

const techLogos = [
  "React", "Next.js", "Flutter", "Node.js", "Python",
  "OpenAI", "Anthropic", "Firebase", "AWS", "Vercel", "n8n",
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  const cards: CardItem[] = t.projects.cards.map((c, i) => ({
    ...c,
    href: cardMeta[i].href,
    image: cardMeta[i].image,
  }));

  const { ref: statRef, isVisible: statVisible } = useScrollReveal(0.2);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref}>
          <motion.p
            className="text-sm uppercase tracking-widest text-primary mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
          >
            {t.projects.eyebrow}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {t.projects.heading1} <span className="gradient-text">{t.projects.heading2}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((item, i) => (
            <ClientWorkCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <motion.div
            ref={statRef}
            className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 flex flex-col"
            initial={{ opacity: 0, x: -60 }}
            animate={statVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <span
                className="inline-block self-start text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3"
                style={{ color: "#4ADE80", borderColor: "rgba(74,222,128,0.4)" }}
              >
                {t.projects.stat.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{t.projects.stat.title}</h3>
              <p className="text-muted-foreground">{t.projects.stat.description}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6">
            {t.projects.techsTitle}
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-10 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
              {[...techLogos, ...techLogos].map((name, i) => (
                <span
                  key={i}
                  className="text-lg md:text-xl font-semibold text-foreground/40 hover:text-foreground transition-colors duration-300 shrink-0"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
