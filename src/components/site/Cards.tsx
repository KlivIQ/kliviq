import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";
import { getCatalogProduct, getCatalogService, getCatalogIndustry, STATUS_LABEL } from "@/data/catalog";

/** Backlit glow in a product's brand hue ("H S% L%"). */
export const glowStyle = (hue: string): React.CSSProperties => ({
  boxShadow: `0 0 0 1px hsl(${hue} / 0.25), 0 18px 50px -12px hsl(${hue} / 0.45), 0 0 80px -30px hsl(${hue} / 0.6)`,
});

export const ProductCard = ({ slug }: { slug: string }) => {
  const { loc, tr } = useLang();
  const raw = getCatalogProduct(slug);
  if (!raw) return null;
  const p = loc(raw);
  return (
    <Link
      to={`/products/${p.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 transition-all hover:-translate-y-1"
      style={glowStyle(p.hue)}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.25] blur-3xl" style={{ background: `hsl(${p.hue})` }} />
      <div className="relative flex items-center justify-between">
        <img src={p.logo} alt={`${p.name} logo`} loading="lazy" className="h-12 w-12 rounded-xl object-cover" />
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {tr(STATUS_LABEL[p.status])}
        </span>
      </div>
      <h3 className="relative mt-6 text-2xl font-bold">{p.name}</h3>
      <p className="relative mt-2 flex-1 text-muted-foreground">{p.tagline}</p>
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {tr("Explore")} {p.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export const ServiceCard = ({ slug }: { slug: string }) => {
  const { loc, tr } = useLang();
  const raw = getCatalogService(slug);
  if (!raw) return null;
  const s = loc(raw);
  return (
    <Link
      to={`/services/${s.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <h3 className="text-2xl font-bold">{s.name}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{s.short}</p>
      <p className="mt-6 text-sm text-muted-foreground">
        {tr("Starting from")} <span className="font-display text-base font-semibold text-foreground">{tr(s.priceInr)}</span>
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {tr("Learn more")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export const IndustryCard = ({ slug, hue }: { slug: string; hue?: string }) => {
  const { loc, tr } = useLang();
  const raw = getCatalogIndustry(slug);
  if (!raw) return null;
  const i = loc(raw);
  return (
    <Link
      to={`/industries/${i.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 transition-all hover:shadow-lift"
      style={hue ? glowStyle(hue) : undefined}
    >
      <div className="pointer-events-none absolute inset-0 kolam-grid opacity-0 transition-opacity group-hover:opacity-60" />
      <h3 className="relative text-2xl font-bold">{i.name}</h3>
      <p className="relative mt-2 flex-1 text-muted-foreground">{i.short}</p>
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {tr("See how we help")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};
