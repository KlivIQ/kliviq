import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Bell, CheckCheck, MapPin, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

/** Loops a phase counter; reduced-motion users see the final phase only. */
const usePhase = (count: number, ms: number) => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? count - 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms, reduce]);
  return phase;
};

const Frame = ({ hue, children }: { hue: string; children: React.ReactNode }) => (
  <div aria-hidden="true" className="relative w-[280px] select-none sm:w-[310px]">
    <div className="absolute -inset-8 rounded-full blur-3xl" style={{ background: `hsl(${hue} / 0.3)` }} />
    <div
      className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5"
      style={{ boxShadow: `0 30px 80px -30px hsl(${hue} / 0.6)` }}
    >
      {children}
    </div>
  </div>
);

const SeenzoDemo = ({ hue }: { hue: string }) => {
  const { tr } = useLang();
  const phase = usePhase(3, 2200);
  const score = phase === 0 ? 34 : phase === 1 ? 61 : 82;
  const engines = ["ChatGPT", "Gemini", "Perplexity"];
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <Frame hue={hue}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("AI Visibility score")}</p>
      <div className="relative mx-auto mt-4 h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
          <motion.circle
            cx="60" cy="60" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
            stroke={`hsl(${hue})`} strokeDasharray={c}
            animate={{ strokeDashoffset: c * (1 - score / 100) }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <motion.span key={score} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 flex items-center justify-center font-display text-4xl font-bold">
          {score}
        </motion.span>
      </div>
      <ul className="mt-4 space-y-2">
        {engines.map((e, i) => (
          <li key={e} className="flex items-center gap-3 text-sm">
            <span className="w-20 text-muted-foreground">{e}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div className="h-full rounded-full" style={{ background: `hsl(${hue})` }} animate={{ width: `${Math.min(100, score - 10 + i * 8)}%` }} transition={{ duration: 1, delay: i * 0.15 }} />
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  );
};

const ConnectDemo = ({ hue }: { hue: string }) => {
  const phase = usePhase(4, 1600);
  const msgs = [
    { me: false, text: "Sunday appointment kidaikuma?" },
    { me: true, text: "வணக்கம்! Sunday 11:00 AM free-ஆ இருக்கு. Book பண்ணட்டுமா?" },
    { me: false, text: "Yes please" },
    { me: true, text: "Booked ✓ Reminder Saturday evening anuppurom." },
  ];
  return (
    <Frame hue={hue}>
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-background" style={{ background: `hsl(${hue})` }}>K</span>
        <div>
          <p className="text-sm font-semibold">KlivIQ Connect</p>
          <p className="text-xs text-muted-foreground">online</p>
        </div>
      </div>
      <div className="mt-4 flex min-h-[220px] flex-col gap-2">
        <AnimatePresence>
          {msgs.slice(0, phase + 1).map((m) => (
            <motion.div
              key={m.text}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.me ? "self-end rounded-br-sm" : "self-start rounded-bl-sm bg-muted"}`}
              style={m.me ? { background: `hsl(${hue} / 0.15)` } : undefined}
            >
              {m.text}
              {m.me && <CheckCheck className="ml-1 inline h-3 w-3" style={{ color: `hsl(${hue})` }} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Frame>
  );
};

const ClinicPingDemo = ({ hue }: { hue: string }) => {
  const { tr } = useLang();
  const phase = usePhase(3, 2000);
  const rows = [
    { time: "10:00", name: "Patient A", risk: false },
    { time: "11:30", name: "Patient B", risk: true },
    { time: "16:30", name: "Patient C", risk: false },
  ];
  return (
    <Frame hue={hue}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("Today's appointments")}</p>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.time} className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm">
            <span><span className="font-semibold">{r.time}</span> <span className="text-muted-foreground">{r.name}</span></span>
            <AnimatePresence>
              {r.risk && phase >= 1 && (
                <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive">
                  <AlertTriangle className="h-3 w-3" /> {tr("High risk")}
                </motion.span>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {phase === 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm" style={{ background: `hsl(${hue} / 0.12)` }}>
            <Bell className="h-4 w-4" style={{ color: `hsl(${hue})` }} /> {tr("Reminder sent in Tamil")}
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  );
};

const ParamparaiDemo = ({ hue }: { hue: string }) => {
  const phase = usePhase(4, 1400);
  const nodes = [
    { x: 150, y: 30, l: 0 },
    { x: 80, y: 100, l: 1 }, { x: 220, y: 100, l: 1 },
    { x: 40, y: 175, l: 2 }, { x: 120, y: 175, l: 2 }, { x: 180, y: 175, l: 2 }, { x: 260, y: 175, l: 2 },
  ];
  const links = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  return (
    <Frame hue={hue}>
      <svg viewBox="0 0 300 210" className="w-full">
        {links.map(([a, b]) => (
          <motion.path
            key={`${a}-${b}`}
            d={`M${nodes[a].x} ${nodes[a].y} C${nodes[a].x} ${(nodes[a].y + nodes[b].y) / 2}, ${nodes[b].x} ${(nodes[a].y + nodes[b].y) / 2}, ${nodes[b].x} ${nodes[b].y}`}
            fill="none" stroke={`hsl(${hue})`} strokeWidth="2"
            initial={false}
            animate={{ pathLength: phase > nodes[b].l - 1 && phase >= nodes[b].l ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 11 : 8} fill={`hsl(${hue})`} initial={false} animate={{ scale: phase >= n.l ? 1 : 0, opacity: phase >= n.l ? 1 : 0 }} style={{ originX: `${n.x}px`, originY: `${n.y}px` }} />
        ))}
      </svg>
      <motion.div animate={{ opacity: phase === 3 ? 1 : 0.3 }} className="mt-2 flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4" style={{ color: `hsl(${hue})` }} />
        <span className="font-semibold">Kumbakonam</span>
        <Sparkles className="ml-auto h-4 w-4" style={{ color: `hsl(${hue})` }} />
      </motion.div>
    </Frame>
  );
};

const ProductHeroDemo = ({ slug, hue }: { slug: string; hue: string }) => {
  if (slug === "seenzo") return <SeenzoDemo hue={hue} />;
  if (slug === "connect") return <ConnectDemo hue={hue} />;
  if (slug === "clinicping") return <ClinicPingDemo hue={hue} />;
  if (slug === "paramparai") return <ParamparaiDemo hue={hue} />;
  return null;
};

export default ProductHeroDemo;
