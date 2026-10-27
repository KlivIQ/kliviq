import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
  /** Optional visual shown beside the text on large screens, below on phones */
  aside?: ReactNode;
}

const PageHero = ({ eyebrow, title, lede, crumbs, children, aside }: Props) => {
  const { tr } = useLang();
  return (
  <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
    <div className="pointer-events-none absolute inset-0 kolam-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
    <div className="container-x relative">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">{tr("Home")}</Link>
          {crumbs.map((c, i) => (
            <span key={c.path} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" />
              {i === crumbs.length - 1 ? (
                <span className="text-foreground">{tr(c.name)}</span>
              ) : (
                <Link to={c.path} className="hover:text-foreground">{tr(c.name)}</Link>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className={aside ? "grid items-center gap-12 lg:grid-cols-[1fr_auto]" : undefined}>
        <Reveal>
          {eyebrow && <p className="eyebrow mb-5 flex">{eyebrow}</p>}
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.02] sm:text-5xl md:text-7xl">{title}</h1>
          {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{lede}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        {aside && <div className="flex justify-center">{aside}</div>}
      </div>
    </div>
  </section>
);
};

export default PageHero;
