import { useEffect, useRef, useState } from "react";

/**
 * Homepage intro: Circuit K draws in the centre of a dark curtain, then flies into
 * the hero logo position and the curtain fades — a seamless hand-off.
 * Prerendered so it covers first paint; an inline script in index.html adds
 * data-intro-skip (repeat visit in this session / reduced motion) to hide it pre-paint.
 */
const KEY = "kliviq-intro-seen";
export const GLIDE_DURATION_MS = 700;

const IntroLoader = () => {
  const [done, setDone] = useState(false);
  const logo = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-intro-skip")) {
      setDone(true);
      return;
    }
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    document.documentElement.style.overflow = "hidden";
    const timers: number[] = [];
    const finish = () => {
      document.documentElement.setAttribute("data-intro-complete", "");
      document.documentElement.style.overflow = "";
      setDone(true);
      window.dispatchEvent(new Event("intro-complete"));
    };
    const morph = () => {
      const el = logo.current;
      const target = document.querySelector<SVGRectElement>(".living-circuit .lc-logo rect");
      if (el && target) {
        const t = target.getBoundingClientRect();
        const size = t.width;
        const tx = t.left + size / 2 - window.innerWidth / 2;
        const ty = t.top + t.height / 2 - window.innerHeight / 2;
        const s = size / el.getBoundingClientRect().width;
        el.style.transition = `transform ${GLIDE_DURATION_MS}ms cubic-bezier(.65,0,.2,1)`;
        el.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      }
      if (curtain.current) curtain.current.style.opacity = "0";
      timers.push(window.setTimeout(finish, GLIDE_DURATION_MS));
    };
    timers.push(window.setTimeout(morph, 1300));
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      timers.forEach(clearTimeout);
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="intro-loader fixed inset-0 z-[9999] pointer-events-auto" aria-hidden="true">
      <div ref={curtain} className="intro-curtain absolute inset-0 transition-opacity duration-700 ease-out" />
      <div className="absolute inset-0 grid place-items-center">
        <div ref={logo} className="relative h-28 w-28 sm:h-36 sm:w-36">
          <div className="intro-glow absolute -inset-6 rounded-full" />
          <svg viewBox="0 0 100 100" className="relative h-full w-full">
            <rect width="100" height="100" rx="19" fill="#166534" className="lc-pop" />
            <line x1="28" y1="18" x2="28" y2="82" stroke="white" strokeWidth="7" strokeLinecap="round" pathLength={1} className="lc-draw" style={{ animationDelay: "0.15s" }} />
            <line x1="28" y1="50" x2="72" y2="18" stroke="white" strokeWidth="6.5" strokeLinecap="round" pathLength={1} className="lc-draw" style={{ animationDelay: "0.35s" }} />
            <line x1="28" y1="50" x2="76" y2="82" stroke="#4ADE80" strokeWidth="6.5" strokeLinecap="round" pathLength={1} className="lc-draw" style={{ animationDelay: "0.5s" }} />
            <g className="lc-pop" style={{ animationDelay: "0.25s" }}>
              <circle cx="28" cy="18" r="9.5" fill="#1E8A47" /><circle cx="28" cy="18" r="6.5" fill="white" /><circle cx="28" cy="18" r="3" fill="#166534" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.4s" }}>
              <circle cx="28" cy="50" r="12" fill="#1E8A47" /><circle cx="28" cy="50" r="8.5" fill="white" /><circle cx="28" cy="50" r="3.8" fill="#166534" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.55s" }}>
              <circle cx="28" cy="82" r="9.5" fill="#1E8A47" /><circle cx="28" cy="82" r="6.5" fill="white" /><circle cx="28" cy="82" r="3" fill="#166534" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.75s" }}>
              <circle cx="72" cy="18" r="8.5" fill="#1E8A47" /><circle cx="72" cy="18" r="5.8" fill="white" opacity="0.65" /><circle cx="72" cy="18" r="2.6" fill="#166534" opacity="0.65" />
            </g>
            <g className="lc-pop" style={{ animationDelay: "0.7s" }}>
              <g className="intro-iq">
                <circle cx="76" cy="82" r="16" fill="none" stroke="#4ADE80" strokeWidth="2" opacity="0.3" />
                <circle cx="76" cy="82" r="12.5" fill="#4ADE80" /><circle cx="76" cy="82" r="9" fill="#166534" />
                <circle cx="76" cy="82" r="6" fill="#4ADE80" /><circle cx="76" cy="82" r="2.8" fill="white" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
