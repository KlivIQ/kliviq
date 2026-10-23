import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import CircuitDemoCard, { type DemoKey } from "./CircuitDemoCard";

/**
 * Hero "Living Circuit".
 * The intro (K draw, signal lines, product nodes) is pure CSS in the prerendered SVG,
 * so it starts with first paint and always ends on the finished state — no flash.
 * anime.js is lazy-loaded afterwards for rings, ambient pulse, cursor drift and scroll unfold.
 */

// Logo sits at (50,20) in a 200x200 canvas; IQ node = (126,102).
const IQ = { x: 126, y: 102 };
const NODES: { key: DemoKey; name: string; x: number; y: number; path: string; service?: boolean }[] = [
  { key: "seo", name: "SEO · GEO · AEO", x: 26, y: 70, path: "M126 102 L120 126 L26 126 L26 70", service: true },
  { key: "seenzo", name: "Seenzo", x: 30, y: 160, path: "M126 102 L112 130 L44 130 L30 160" },
  { key: "connect", name: "KlivIQ Connect", x: 78, y: 186, path: "M126 102 L118 150 L78 150 L78 186" },
  { key: "tryon", name: "KlivIQ TryOn", x: 140, y: 186, path: "M126 102 L134 150 L140 160 L140 186" },
  { key: "agents", name: "AI Agents & Skills", x: 170, y: 146, path: "M126 102 L150 102 L170 120 L170 146", service: true },
  { key: "web", name: "Web & Mobile Apps", x: 170, y: 66, path: "M126 102 L150 96 L170 84 L170 66", service: true },
];

const LivingCircuit = () => {
  const { tr } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<DemoKey | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Start after CSS intro (~2.3s) and when idle, so it stays off the critical path.
    const start = () =>
      import("animejs").then(({ animate, svg, onScroll }) => {
        if (cancelled) return;
        // IQ concentric rings
        const rings = el.querySelectorAll<SVGCircleElement>(".lc-ring");
        rings.forEach((r, i) => {
          const a = animate(r, {
            r: [14, 34],
            opacity: [0.55, 0],
            duration: 2400,
            delay: i * 800,
            loop: true,
            ease: "outQuad",
          });
          cleanups.push(() => a.revert());
        });
        // Ambient signal pulses travelling the circuit
        el.querySelectorAll<SVGCircleElement>(".lc-pulse").forEach((dot, i) => {
          const path = el.querySelector<SVGPathElement>(`#lc-sig-${i}`);
          if (!path) return;
          const a = animate(dot, {
            ...svg.createMotionPath(path),
            opacity: [0, 1, 1, 0],
            duration: 2600,
            delay: i * 900,
            loopDelay: 1400,
            loop: true,
            ease: "inOutSine",
          });
          cleanups.push(() => a.revert());
        });
        // Scroll unfold toward Products, synced to scroll progress
        const stage = el.querySelector(".lc-stage");
        const hero = el.closest("section");
        if (stage && hero) {
          const a = animate(stage, {
            scale: [1, 1.35],
            translateY: [0, 120],
            opacity: [1, 0],
            ease: "linear",
            autoplay: onScroll({ target: hero, enter: "top top", leave: "bottom top", sync: true }),
          });
          cleanups.push(() => a.revert());
        }
        // Nodes drift toward cursor (desktop only)
        if (fine) {
          const nodes = Array.from(el.querySelectorAll<HTMLElement>(".lc-node"));
          const onMove = (e: PointerEvent) => {
            nodes.forEach((n) => {
              const b = n.getBoundingClientRect();
              const dx = e.clientX - (b.left + b.width / 2);
              const dy = e.clientY - (b.top + b.height / 2);
              const d = Math.hypot(dx, dy) || 1;
              const pull = Math.min(10, 1600 / d);
              animate(n, { x: (dx / d) * pull, y: (dy / d) * pull, duration: 700, ease: "outQuad" });
            });
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() => window.removeEventListener("pointermove", onMove));
        }
      });

    const t = window.setTimeout(() => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
      ric ? ric(start) : start();
    }, 2300);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div ref={root} className="living-circuit relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="lc-stage absolute inset-0">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {/* Signal lines */}
          {NODES.map((n, i) => (
            <path
              key={n.key}
              id={`lc-sig-${i}`}
              d={n.path}
              pathLength={1}
              className="lc-draw lc-sig"
              style={{ animationDelay: `${1.2 + i * 0.12}s` }}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.55"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          ))}
          {NODES.map((n) => (
            <circle key={`p-${n.key}`} className="lc-pulse" r="2.2" cx="0" cy="0" fill="#4ADE80" opacity="0" />
          ))}
          {/* IQ rings (animated by anime.js) */}
          <circle className="lc-ring" cx={IQ.x} cy={IQ.y} r="14" fill="none" stroke="#4ADE80" strokeWidth="1" opacity="0" />
          <circle className="lc-ring" cx={IQ.x} cy={IQ.y} r="14" fill="none" stroke="#4ADE80" strokeWidth="1" opacity="0" />
          <circle className="lc-ring" cx={IQ.x} cy={IQ.y} r="14" fill="none" stroke="#4ADE80" strokeWidth="1" opacity="0" />

          {/* Original KlivIQ Circuit K mark (uploaded SVG geometry), offset to (50,20) */}
          <g transform="translate(50 20)">
            <rect width="100" height="100" rx="19" fill="#166534" className="lc-pop" style={{ animationDelay: "0s" }} />
            <line x1="28" y1="18" x2="28" y2="82" stroke="white" strokeWidth="7" strokeLinecap="round" pathLength={1} className="lc-draw" style={{ animationDelay: "0.15s" }} />
            <line x1="28" y1="50" x2="72" y2="18" stroke="white" strokeWidth="6.5" strokeLinecap="round" pathLength={1} className="lc-draw" style={{ animationDelay: "0.4s" }} />
            <line x1="28" y1="50" x2="76" y2="82" stroke="#4ADE80" strokeWidth="6.5" strokeLinecap="round" pathLength={1} className="lc-draw" style={{ animationDelay: "0.6s" }} />
            <g className="lc-pop" style={{ animationDelay: "0.25s" }}>
              <circle cx="28" cy="18" r="9.5" fill="#1E8A47" /><circle cx="28" cy="18" r="6.5" fill="white" /><circle cx="28" cy="18" r="3" fill="#166534" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.45s" }}>
              <circle cx="28" cy="50" r="12" fill="#1E8A47" /><circle cx="28" cy="50" r="8.5" fill="white" /><circle cx="28" cy="50" r="3.8" fill="#166534" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.55s" }}>
              <circle cx="28" cy="82" r="9.5" fill="#1E8A47" /><circle cx="28" cy="82" r="6.5" fill="white" /><circle cx="28" cy="82" r="3" fill="#166534" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.75s" }}>
              <circle cx="72" cy="18" r="8.5" fill="#1E8A47" /><circle cx="72" cy="18" r="5.8" fill="white" opacity="0.65" /><circle cx="72" cy="18" r="2.6" fill="#166534" opacity="0.65" />
            </g>
            <g className="lc-pop lc-iq" style={{ animationDelay: "0.95s" }}>
              <circle cx="76" cy="82" r="16" fill="none" stroke="#4ADE80" strokeWidth="2" opacity="0.3" />
              <circle cx="76" cy="82" r="12.5" fill="#4ADE80" /><circle cx="76" cy="82" r="9" fill="#166534" />
              <circle cx="76" cy="82" r="6" fill="#4ADE80" /><circle cx="76" cy="82" r="2.8" fill="white" />
            </g>
          </g>
        </svg>

        {/* Product nodes (HTML for crisp labels and accessible tap targets) */}
        {NODES.map((n, i) => (
          <div
            key={n.key}
            className="lc-fade absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(n.x / 200) * 100}%`, top: `${(n.y / 200) * 100}%`, animationDelay: `${1.7 + i * 0.12}s` }}
          >
          <button
            type="button"
            className="lc-node block"
            onMouseEnter={() => setActive(n.key)}
            onFocus={() => setActive(n.key)}
            onClick={() => setActive(n.key)}
            aria-expanded={active === n.key}
            aria-label={`${n.name} — ${tr("Tap a node to see it work")}`}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft backdrop-blur transition-colors hover:border-primary sm:text-xs">
              <span className={n.service ? "h-2 w-2 rounded-sm bg-brand" : "h-2 w-2 rounded-full bg-primary"} />
              {n.service ? tr(n.name) : n.name}
            </span>
          </button>
          </div>
        ))}
      </div>

      <p className="lc-fade absolute -bottom-2 left-0 right-0 text-center text-xs text-muted-foreground" style={{ animationDelay: "2.2s" }}>
        {tr("Tap a node to see it work")}
      </p>

      {active && <CircuitDemoCard demo={active} onClose={() => setActive(null)} />}
    </div>
  );
};

export default LivingCircuit;
