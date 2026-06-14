import { useEffect, useState } from "react";

interface Props {
  items: { id: string; label: string }[];
}

const TableOfContents = ({ items }: Props) => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2.5 border-l border-border">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`block pl-4 -ml-px border-l-2 transition-colors ${
                active === i.id
                  ? "border-secondary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={active === i.id ? { borderColor: "#4ADE80" } : undefined}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
