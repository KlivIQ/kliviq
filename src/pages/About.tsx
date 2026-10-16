import { Quote } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import Seo, { ORG_REF } from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { FinalCta } from "./Index";
import { useLang } from "@/i18n/LanguageContext";
import { SITE_URL } from "@/data/catalog";

const principles = [
  { title: "Senior hands only", body: "The person who scopes your project is the person who builds or leads it. No hand-offs to juniors." },
  { title: "Fixed scope, fixed price", body: "You know what ships and what it costs before work starts." },
  { title: "Built for India first", body: "Tamil, Hindi and English. WhatsApp before email. Phones before desktops." },
  { title: "You own everything", body: "Code, data, prompts and accounts stay with you. No lock-in." },
  { title: "Honest claims", body: "We show real work and real numbers, or we say nothing." },
  { title: "Ship, then improve", body: "A working product in weeks beats a perfect plan in months." },
];

const About = () => {
  const { t } = useLang();
  return (
    <SiteShell>
      <Seo
        title="About KlivIQ | Founded by Sriram Ramkumar, 20+ Years in Enterprise IT"
        description="KlivIQ Technologies is a Chennai-based AI product and engineering company founded by Sriram Ramkumar, bringing 20+ years of enterprise IT delivery to growing businesses in India and worldwide."
        path="/about"
        crumbs={[{ name: "About", path: "/about" }]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About KlivIQ",
            url: `${SITE_URL}/about`,
            mainEntity: ORG_REF,
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sriram Ramkumar",
            jobTitle: "Founder",
            worksFor: ORG_REF,
            description: "Founder of KlivIQ with 20+ years of enterprise IT delivery across banking, retail, healthcare and logistics.",
            address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
          },
        ]}
      />
      <PageHero
        eyebrow="About"
        title={<>Enterprise experience, <span className="gradient-text">startup speed.</span></>}
        lede="KlivIQ Technologies is an AI product and engineering company based in Chennai, building for businesses in India and around the world."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">Founder story</p>
            <h2 className="text-3xl font-bold md:text-4xl">Sriram Ramkumar</h2>
            <p className="mt-2 text-muted-foreground">Founder, KlivIQ Technologies</p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed lg:col-span-8">
            <p>
              Sriram spent more than twenty years inside enterprise IT, delivering and leading software programmes for organisations in banking, retail, healthcare, life sciences and logistics. He built and ran teams across countries, and learned what makes technology projects succeed or quietly fail.
            </p>
            <p className="text-muted-foreground">
              Over those years one pattern kept repeating: large companies got senior expertise and modern tools, while growing businesses got templates, junior teams and long timelines. AI changed the maths. A small, senior team can now build in weeks what used to take a department months.
            </p>
            <p className="text-muted-foreground">
              KlivIQ was started to close that gap. We build our own AI products for problems we see every day in India, and we bring the same enterprise discipline to every client project, priced so growing businesses can actually use it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-4">Principles</p><h2 className="mb-12 text-3xl font-bold md:text-5xl">How we choose to work.</h2></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-[1.75rem] border border-border bg-card p-7">
                  <span className="font-display text-sm font-semibold text-brand">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="recommendations" className="scroll-mt-24 py-20 md:py-28">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-4">{t.testimonials.linkedInBadge}</p><h2 className="mb-12 text-3xl font-bold md:text-5xl">What colleagues say.</h2></Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {t.testimonials.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-8">
                  <Quote className="h-8 w-8 text-brand" />
                  <blockquote className="mt-5 flex-1 leading-relaxed text-foreground/90">{item.quote}</blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta source="about" />
    </SiteShell>
  );
};

export default About;
