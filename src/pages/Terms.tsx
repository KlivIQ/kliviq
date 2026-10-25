import { TermsContent } from "@/components/LegalDialog";
import Seo from "@/components/site/Seo";
import SiteShell from "@/components/site/SiteShell";
import PageHero from "@/components/site/PageHero";
import { useLang } from "@/i18n/LanguageContext";

const Terms = () => {
  const { t } = useLang();
  return (
    <SiteShell>
      <Seo
        title="Terms of Service | KlivIQ Technologies"
        description="Read KlivIQ Technologies’ terms governing website use and service engagements, including payments, intellectual property and responsibilities."
        path="/terms"
        crumbs={[{ name: "Terms of Service", path: "/terms" }]}
      />
      <PageHero title={t.footer.terms} />
      <section className="pb-24">
        <div className="container-x"><div className="max-w-3xl"><TermsContent /></div></div>
      </section>
    </SiteShell>
  );
};

export default Terms;