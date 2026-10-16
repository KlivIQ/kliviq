import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { faqSchema, ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/site/Faq";
import { FinalCta } from "./Index";
import { useLang } from "@/i18n/LanguageContext";
import { pricingFaqs, pricingRows, SITE_URL } from "@/data/catalog";

const milestones = [
  { pct: "30%", label: "To start", body: "Kick-off, scope locked, work begins." },
  { pct: "40%", label: "Mid-project demo", body: "Working build reviewed on a live link." },
  { pct: "30%", label: "At launch", body: "Go live and full handover." },
];

const Pricing = () => {
  const [region, setRegion] = useState<"inr" | "usd">("inr");
  const { tr, loc } = useLang();
  return (
    <SiteShell>
      <Seo
        title="Pricing | Clear Starting Prices in ₹ and $ | KlivIQ"
        description="KlivIQ pricing: AI visibility from ₹25,000, AI implementation and websites from ₹75,000, mobile app MVPs from ₹2,50,000, fractional CTO from ₹40,000/month. 30/40/30 milestone payments and GST invoices."
        path="/pricing"
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "KlivIQ pricing",
            url: `${SITE_URL}/pricing`,
            provider: ORG_REF,
            itemListElement: pricingRows.map((r) => ({
              "@type": "Offer",
              name: r.name,
              priceCurrency: "INR",
              description: `${r.inr} (India) · ${r.usd} (international)${r.note ? `. ${r.note}` : ""}`,
            })),
          },
          faqSchema(pricingFaqs),
        ]}
      />
      <PageHero
        eyebrow={tr("Pricing")}
        title={<>{tr("Know the number")} <span className="gradient-text">{tr("before we start.")}</span></>}
        lede={tr("Starting prices for every kind of project. After a short call you get a fixed quote for a written list of deliverables.")}
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div role="tablist" aria-label="Currency" className="mb-8 inline-flex rounded-full border border-border bg-card p-1">
            {(["inr", "usd"] as const).map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={region === r}
                onClick={() => setRegion(r)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  region === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tr(r === "inr" ? "India (₹)" : "Global ($)")}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
            {loc(pricingRows).map((row, i) => (
              <Reveal key={row.name} delay={i * 0.03}>
                <div className="grid items-center gap-2 border-b border-border px-6 py-6 last:border-b-0 md:grid-cols-12 md:px-10">
                  <div className="md:col-span-6">
                    <h2 className="text-xl font-bold">{row.name}</h2>
                    {row.note && <p className="mt-1 text-sm text-muted-foreground">{row.note}</p>}
                  </div>
                  <p className="font-display text-2xl font-semibold md:col-span-4">{tr(region === "inr" ? row.inr : row.usd)}</p>
                  {row.service && (
                    <Link to={`/services/${row.service}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand md:col-span-2 md:justify-end">
                      {tr("Details")} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {tr(region === "inr" ? "Prices exclude GST." : "International clients are billed in US dollars.")} {tr("Third-party costs such as hosting, messaging fees and AI usage are extra.")}
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">{tr("How payment works")}</p>
            <h2 className="mb-12 text-3xl font-bold md:text-5xl">{tr("30 / 40 / 30 milestones.")}</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {loc(milestones).map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="h-full rounded-[1.75rem] border border-border bg-card p-8">
                  <p className="font-display text-6xl font-bold text-brand">{m.pct}</p>
                  <h3 className="mt-4 text-xl font-bold">{m.label}</h3>
                  <p className="mt-2 text-muted-foreground">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 flex items-start gap-4 rounded-[1.75rem] border border-border bg-card p-6">
              <FileText className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
              <p><span className="font-semibold">{tr("GST invoices for every payment.")}</span> <span className="text-muted-foreground">{tr("Indian clients receive GST-compliant tax invoices. International clients receive standard invoices in USD.")}</span></p>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={pricingFaqs} title="Pricing questions" />
      <FinalCta source="pricing" />
    </SiteShell>
  );
};

export default Pricing;
