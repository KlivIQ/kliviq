import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import sareeImg from "@/assets/tryon-demo/saree.jpg";
import modelImg from "@/assets/tryon-demo/model.jpg";
import { useLang } from "@/i18n/LanguageContext";

// Phases: 0 product page, 1 tap, 2 draping, 3 result
const DURATIONS = [2200, 700, 1100, 3200];

const TryOnPhoneDemo = () => {
  const reduce = useReducedMotion();
  const { tr } = useLang();
  const [phase, setPhase] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setPhase((p) => (p + 1) % 4), DURATIONS[phase]);
    return () => clearTimeout(id);
  }, [phase, reduce]);

  const showModel = phase === 3;

  return (
    <div aria-hidden="true" className="relative w-[250px] select-none sm:w-[270px]">
      <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative rounded-[2.6rem] border-[10px] border-foreground/90 bg-card shadow-2xl">
        <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/90" />
        <div className="overflow-hidden rounded-[1.9rem]">
          <div className="h-8 bg-card" />
          <div className="relative aspect-[3/4] bg-muted">
            <AnimatePresence initial={false}>
              <motion.img
                key={showModel ? "model" : "saree"}
                src={showModel ? modelImg : sareeImg}
                width={768}
                height={1024}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            )}
            <AnimatePresence>
              {showModel && (
                <motion.span
                  className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles className="h-3 w-3" /> {tr("Looks great on you")}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1 p-4">
            <p className="text-sm font-semibold text-foreground">{tr("Emerald Kanchipuram Silk")}</p>
            <p className="text-sm text-muted-foreground">₹12,499</p>
            <div className="relative pt-2">
              <motion.div
                className="flex items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
                animate={{ scale: phase === 1 ? 0.94 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <Sparkles className="h-4 w-4" />
                {phase === 2 ? tr("Draping...") : tr("Try On")}
              </motion.div>
              {phase === 1 && (
                <motion.span
                  className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full bg-primary-foreground/60"
                  initial={{ opacity: 0.8, scale: 0.2, x: "-50%", y: "-30%" }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPhoneDemo;
