import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import { FinalCta } from "./Index";
import { portfolioItems, type WorkKind } from "@/data/portfolio";
import { catalogProducts, SITE_URL } from "@/data/catalog";
import { useLang } from "@/i18n/LanguageContext";

type Card = {
  key: string;
  kind: WorkKind;
  name: string;
  tagline: string;
  summary: string;
  category: string;
  year?: string;
  href: string;
  external: boolean;
  image?: string;
  logo?: string;
  hue: string;
  metrics?: { value: string; label: string }[];
  experiment?: boolean;
};

const cards: Card[] = [
  ...portfolioItems.map<Card>((w) => ({
    key: w.slug,
    kind: w.kind,
    name: w.name,
    tagline: w.tagline,
    summary: w.summary,
    category: w.category,
    year: w.year,
    href: w.href,
    external: w.external,
    image: w.thumb,
    hue: w.accent,
    metrics: w.metrics,
    experiment: w.experiment,
  })),
  ...catalogProducts
    .filter((p) => p.slug !== "clinicping")
    .map<Card>((p) => ({
      key: p.slug,
      kind: "ai",
      name: p.name,
      tagline: p.tagline,
      summary: p.summary,
      category: `AI & Products · ${p.status === "live" ? "Live" : p.status === "pilot" ? "Pilot" : "Coming soon"}`,
      href: `/products/${p.slug}`,
      external: false,
      logo: p.logo,
      hue: p.hue,
    })),
];

const FILTERS: { key: "all" | WorkKind; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI & Products" },
  { key: "web", label: "Web Design" },
];

const Work = () => {
  const [filter, setFilter] = useState<"all" | WorkKind>("all");
  const { tr, loc } = useLang();
  const shown = loc(cards).filter((c) => filter === "all" || c.kind === filter);

  return (
    <SiteShell>
      <Seo
        title="Work | AI Products and Web Design Case Studies | KlivIQ"
        description="KlivIQ case studies: AI products Seenzo, KlivIQ Connect, KlivIQ TryOn and ClinicPing, plus web design for Mathavan Traders, Sri Aishwarya Sarees, Selfsame Therapy, FACO Coffee and the Zero Rupees experiment."
        path="/work"
        crumbs={[{ name: "Work", path: "/work" }]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "KlivIQ work",
            url: `${SITE_URL}/work`,
            publisher: ORG_REF,
            hasPart: portfolioItems.map((w) => ({
              "@type": "CreativeWork",
              name: w.name,
              description: w.summary,
              url: w.external ? w.href : `${SITE_URL}${w.href}`,
              dateCreated: w.year,
              creator: ORG_REF,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow={tr("Work")}
        title={<>{tr("Products we run.")} <span className="gradient-text">{tr("Sites we shipped.")}</span></>}
        lede={tr("Everything here is live and in use, except the one we clearly label as an experiment.")}
        crumbs={[{ name: "Work", path: "/work" }]}
      />

      <section className="pb-24">
        <div className="container-x">
          <div role="tablist" aria-label="Filter work" className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                  filter === f.key ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tr(f.label)}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {shown.map((c) => {
                const inner = (
                  <>
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                      {c.image ? (
                        <img src={c.image} alt={`${c.name} screenshot`} loading="lazy" width={1200} height={720} className="aspect-[5/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                      ) : (
                        <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 kolam-grid opacity-60" />
                          <div className="absolute h-56 w-56 rounded-full opacity-25 blur-3xl" style={{ background: `hsl(${c.hue})` }} />
                          <img src={c.logo} alt={`${c.name} logo`} loading="lazy" className="relative h-24 w-24 rounded-3xl object-cover shadow-lift transition-transform duration-700 group-hover:scale-110" />
                        </div>
                      )}
                      {c.experiment && (
                        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider">{tr("Experiment")}</span>
                      )}
                    </div>
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {c.category.split(" · ").map(tr).join(" · ")}{c.year ? ` · ${c.year}` : ""}
                      </p>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h2 className="text-2xl font-bold">{c.name}</h2>
                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-1 font-medium text-foreground/80">{c.tagline}</p>
                      <p className="mt-3 text-muted-foreground">{c.summary}</p>
                      {c.metrics && (
                        <div className="mt-4 flex gap-6">
                          {c.metrics.map((m) => (
                            <p key={m.label}><span className="font-display text-xl font-bold">{m.value}</span> <span className="text-sm text-muted-foreground">{m.label}</span></p>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                );
                return (
                  <motion.article
                    key={c.key}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                  >
                    {c.external ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="group block">{inner}</a>
                    ) : (
                      <Link to={c.href} className="group block">{inner}</Link>
                    )}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <FinalCta source="work" />
    </SiteShell>
  );
};

export default Work;
