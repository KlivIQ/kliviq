import { PrivacyContent } from "@/components/LegalDialog";
import Seo from "@/components/site/Seo";
import SiteShell from "@/components/site/SiteShell";
import PageHero from "@/components/site/PageHero";
import { useLang } from "@/i18n/LanguageContext";

const PrivacyPolicy = () => {
  const { t } = useLang();
  return (
    <SiteShell>
      <Seo
        title="Privacy Policy | KlivIQ Technologies"
        description="Read how KlivIQ Technologies collects, uses and protects personal information, including your privacy rights and how to contact us."
        path="/privacy-policy"
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      />
      <PageHero title={t.footer.privacy} />
      <section className="pb-24">
        <div className="container-x"><div className="max-w-3xl"><PrivacyContent /></div></div>
      </section>
    </SiteShell>
  );
};

export default PrivacyPolicy;