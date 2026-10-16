import { useEffect, useRef } from "react";

/**
 * Lightweight 2D-canvas particle field.
 * Replaces the previous three.js/@react-three implementation — same drifting,
 * connecting-nodes feel at a fraction of the JS payload.
 */
// KlivIQ brand greens only (no purple/cyan).
const COLORS = ["#4ADE80", "#22C55E", "#166534", "#166534", "#15803D", "#86EFAC"];

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };

const CanvasBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Parallax: the particle field drifts up at ~35% of scroll speed so the
  // hero content reads as sitting in front of it.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = isMobile ? 9000 : 6500;
      const count = Math.min(140, Math.max(28, Math.round((width * height) / density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.6 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const linkDist = isMobile ? 90 : 130;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.55;
        ctx.fill();
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = a.c;
          ctx.globalAlpha = alpha;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // gentle attraction glow near the pointer
        const mdx = a.x - mouseX;
        const mdy = a.y - mouseY;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 160 * 160) {
          ctx.beginPath();
          ctx.strokeStyle = "#4ADE80";
          ctx.globalAlpha = (1 - Math.sqrt(md2) / 160) * 0.3;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      build();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    if (!isMobile) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={ref} className="w-full h-full" />
    </div>
  );
};

export default CanvasBackground;
