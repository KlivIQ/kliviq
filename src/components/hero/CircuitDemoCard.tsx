import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export type DemoKey = "seenzo" | "connect" | "tryon" | "clinicping";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Demo copy is Tamil on purpose: the demo shows a Tamil WhatsApp reply.
const TA_QUESTION = "இன்னைக்கு கடை எத்தனை மணி வரை திறந்திருக்கும்?";
const TA_REPLY = "வணக்கம்! இன்னைக்கு இரவு 9 மணி வரை கடை திறந்திருக்கும். உங்களுக்கு ஏதாவது எடுத்து வைக்கட்டுமா?";

const SeenzoDemo = () => {
  const { tr } = useLang();
  const [v, setV] = useState(reduced() ? 82 : 34);
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setV(Math.round(34 + (82 - 34) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  const C = 2 * Math.PI * 34;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
        <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
        <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--primary))" strokeWidth="7" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - v / 100)} />
      </svg>
      <div>
        <p className="text-3xl font-bold tabular-nums">{v}</p>
        <p className="text-xs text-muted-foreground">{tr("AI visibility score")}</p>
        <p className="text-xs text-muted-foreground">{tr("Before / After")}: 34 → 82</p>
      </div>
    </div>
  );
};

const ConnectDemo = () => {
  const { tr } = useLang();
  const chars = Array.from(TA_REPLY);
  const [n, setN] = useState(reduced() ? chars.length : 0);
  useEffect(() => {
    if (reduced()) return;
    const id = window.setInterval(() => setN((x) => (x >= chars.length ? x : x + 1)), 28);
    return () => window.clearInterval(id);
  }, [chars.length]);
  return (
    <div className="space-y-2 text-sm" lang="ta">
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-muted px-3 py-2">{TA_QUESTION}</p>
      <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-primary px-3 py-2 text-primary-foreground">
        {chars.slice(0, n).join("")}
        {n < chars.length && <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-primary-foreground align-middle" />}
      </p>
      <p className="text-xs text-muted-foreground" lang="">{tr("Replying on WhatsApp…")}</p>
    </div>
  );
};

const TryOnDemo = () => {
  const { tr } = useLang();
  const [on, setOn] = useState(reduced());
  useEffect(() => {
    if (reduced()) return;
    const id = window.setTimeout(() => setOn(true), 350);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 60 100" className="h-24 w-14" aria-hidden="true">
        <defs>
          <pattern id="saree-pat" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="hsl(var(--primary))" />
            <rect width="3" height="8" fill="hsl(var(--secondary))" />
          </pattern>
          <clipPath id="saree-clip"><rect x="0" y="0" width="60" height={on ? 100 : 0} style={{ transition: "height 0.9s cubic-bezier(.16,1,.3,1)" }} /></clipPath>
        </defs>
        <circle cx="30" cy="14" r="9" fill="hsl(var(--muted-foreground))" opacity="0.5" />
        <path d="M18 28 Q30 24 42 28 L48 96 L12 96 Z" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <path d="M18 28 Q30 24 42 28 L48 96 L12 96 Z M18 28 L44 60" fill="url(#saree-pat)" clipPath="url(#saree-clip)" />
        <path d="M42 28 L20 58 L14 96" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" clipPath="url(#saree-clip)" />
      </svg>
      <p className="text-sm font-medium">{tr("Try the saree on")}</p>
    </div>
  );
};

const ClinicDemo = () => {
  const { tr } = useLang();
  const [flag, setFlag] = useState(reduced());
  useEffect(() => {
    if (reduced()) return;
    const id = window.setTimeout(() => setFlag(true), 500);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="space-y-2 text-sm">
      <div className="rounded-xl border border-border px-3 py-2 font-medium">{tr("Next appointment, 4:30 PM")}</div>
      <div
        className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive transition-all duration-500"
        style={{ opacity: flag ? 1 : 0, transform: flag ? "none" : "translateX(-12px)" }}
      >
        {tr("High no-show risk — reminder sent")}
      </div>
    </div>
  );
};

const META: Record<DemoKey, { name: string; href: string; Demo: () => JSX.Element }> = {
  seenzo: { name: "Seenzo", href: "/products/seenzo", Demo: SeenzoDemo },
  connect: { name: "KlivIQ Connect", href: "/products/connect", Demo: ConnectDemo },
  tryon: { name: "KlivIQ TryOn", href: "/products/tryon", Demo: TryOnDemo },
  clinicping: { name: "ClinicPing", href: "/products/clinicping", Demo: ClinicDemo },
};

const CircuitDemoCard = ({ demo, onClose }: { demo: DemoKey; onClose: () => void }) => {
  const { tr } = useLang();
  const { name, href, Demo } = META[demo];
  return (
    <div className="lc-card absolute left-1/2 top-2 z-20 w-[min(300px,92%)] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-lift" role="dialog" aria-label={name}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold">{name}</p>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <Demo key={demo} />
      <Link to={href} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
        {tr("See product")} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
};

export default CircuitDemoCard;
