import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-150 ease-out"
      style={{
        left: pos.x - 16,
        top: pos.y - 16,
        width: 32,
        height: 32,
        border: "1px solid hsl(var(--primary) / 0.6)",
        opacity: visible ? 1 : 0,
        background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
      }}
    />
  );
};

export default CustomCursor;
