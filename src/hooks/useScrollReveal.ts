import { useEffect, useRef, useState } from "react";

export const useScrollReveal = (threshold = 0.08) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Sections inside `content-visibility: auto` wrappers can report a
    // zero-height box, so pair a low threshold with a bottom root margin
    // to make sure the reveal always fires as the section approaches.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    // Safety net: if the observer never fires (deferred rendering, restored
    // scroll position), reveal after a short delay rather than stay hidden.
    const fallback = window.setTimeout(() => {
      if (el && el.getBoundingClientRect().top < window.innerHeight) setIsVisible(true);
    }, 800);

    if (el) observer.observe(el);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};

export const useCountUp = (end: number, isVisible: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return count;
};
