import { useEffect, useRef } from "react";

/**
 * Tracks page scroll progress (0..1) in a ref so consumers (e.g. r3f useFrame)
 * can read it without triggering React re-renders on every scroll event.
 */
export const useScrollProgress = () => {
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progressRef.current = Math.min(1, Math.max(0, p));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progressRef;
};
