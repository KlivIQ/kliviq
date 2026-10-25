import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "privacy" | "terms";
}

const lastUpdated = "May 17, 2026";

export const PrivacyContent = () => (
  <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
    <p className="text-xs uppercase tracking-wider text-foreground/60">Last updated: {lastUpdated}</p>
    <p>
      KlivIQ Technologies ("we", "us", "our") respects your privacy and is committed to protecting your personal data.
      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
      website or engage our services, in accordance with the Digital Personal Data Protection Act, 2023 and the
      Information Technology Act, 2000 along with its associated rules.
    </p>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">1. Information We Collect</h3>
      <p>We may collect the following categories of information:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Identification data such as name, email address, phone number, and company name submitted via contact forms.</li>
        <li>Communication records relating to inquiries, project discussions, and support requests.</li>
        <li>Technical data including IP address, browser type, device information, and pages visited.</li>
        <li>Cookies and similar tracking technologies used to improve user experience and analytics.</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">2. Purpose of Processing</h3>
      <p>Your personal data is processed lawfully for the following purposes:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Responding to inquiries and providing requested services.</li>
        <li>Project execution, client onboarding, billing, and support.</li>
        <li>Improving website functionality and user experience.</li>
        <li>Complying with legal obligations and enforcing our agreements.</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">3. Consent</h3>
      <p>
        By submitting your information through our website or engaging with us, you provide free, specific, informed,
        and unambiguous consent for the processing of your personal data for the purposes stated. You may withdraw your
        consent at any time by writing to us at hello@kliviq.com.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">4. Sharing and Disclosure</h3>
      <p>
        We do not sell your personal data. We may share limited information with trusted service providers (such as
        hosting, analytics, and email delivery vendors) bound by appropriate confidentiality obligations, or when
        required by law, court order, or competent regulatory authority.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">5. Data Retention</h3>
      <p>
        Personal data is retained only for as long as necessary to fulfil the purposes outlined or as required by
        applicable laws. Upon expiry of the retention period, data is securely deleted or anonymised.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">6. Security Safeguards</h3>
      <p>
        We implement reasonable security practices and procedures including encryption in transit, access controls,
        and secure cloud infrastructure to protect personal data from unauthorised access, alteration, or disclosure.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">7. Your Rights</h3>
      <p>As a data principal, you have the right to:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Access a summary of personal data we hold about you.</li>
        <li>Request correction, completion, or erasure of your personal data.</li>
        <li>Withdraw consent previously given.</li>
        <li>Nominate another individual to exercise your rights in case of incapacity.</li>
        <li>Raise a grievance regarding the processing of your personal data.</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">8. Cookies</h3>
      <p>
        Our website uses cookies for essential functionality and analytics. You may disable cookies through your
        browser settings, though certain features of the website may not function as intended.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">9. Children's Data</h3>
      <p>
        Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data
        from minors without verifiable parental or guardian consent.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">10. Grievance Redressal</h3>
      <p>
        For any questions, requests, or complaints regarding this Privacy Policy or the handling of your personal data,
        please contact our Grievance Officer at hello@kliviq.com. We will acknowledge receipt within a reasonable time
        and respond in accordance with applicable law.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">11. Updates to this Policy</h3>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
        The revised version will be effective upon posting on this page with an updated "Last updated" date.
      </p>
    </section>
  </div>
);

export const TermsContent = () => (
  <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
    <p className="text-xs uppercase tracking-wider text-foreground/60">Last updated: {lastUpdated}</p>
    <p>
      These Terms of Service ("Terms") govern your access to and use of the KlivIQ Technologies website and the
      services offered by us. By accessing the website or engaging our services, you agree to be bound by these Terms.
      If you do not agree, please do not use the website or our services.
    </p>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">1. Definitions</h3>
      <p>
        "We", "Us", "Our" refers to KlivIQ Technologies. "You", "Client", "User" refers to any person or entity
        accessing the website or availing our services. "Services" refers to the software development, design,
        consulting, and related offerings provided by us.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">2. Eligibility</h3>
      <p>
        You must be at least 18 years of age and competent to enter into a legally binding contract under the Indian
        Contract Act, 1872 to use our services.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">3. Scope of Services</h3>
      <p>
        Engagements are governed by a written proposal, statement of work, or quotation that defines deliverables,
        timelines, fees, and acceptance criteria. These Terms apply alongside such engagement documents; in case of
        conflict, the engagement document shall prevail for that specific project.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">4. Fees and Payment</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>All fees are quoted exclusive of applicable taxes including GST, which will be charged additionally.</li>
        <li>Invoices are payable within the timeframe stated on the invoice, failing which interest may accrue.</li>
        <li>Advance or milestone payments, where applicable, are non-refundable once work has commenced.</li>
        <li>Third-party costs such as hosting, licenses, and APIs are billed at cost or as agreed in writing.</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">5. Client Responsibilities</h3>
      <p>
        You agree to provide accurate information, timely feedback, required assets, and access to systems necessary
        for delivery. Delays caused by the Client may shift timelines and additional charges may apply for resulting
        scope changes.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">6. Intellectual Property</h3>
      <p>
        Upon receipt of full payment, ownership of custom deliverables created specifically for the Client transfers
        to the Client, except for our pre-existing tools, frameworks, libraries, and methodologies, which remain our
        property. Open-source and third-party components remain subject to their respective licenses. We retain the
        right to showcase the work in our portfolio unless otherwise agreed in writing.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">7. Confidentiality</h3>
      <p>
        Both parties agree to keep confidential information shared during the engagement secure and not to disclose it
        to third parties without prior written consent, except as required by law.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">8. Warranties and Disclaimers</h3>
      <p>
        We provide services with reasonable skill and care. To the maximum extent permitted by law, the website and
        services are provided on an "as is" and "as available" basis without warranties of any kind, whether express
        or implied, including fitness for a particular purpose and non-infringement.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">9. Limitation of Liability</h3>
      <p>
        To the maximum extent permitted by law, our aggregate liability arising out of or relating to the services
        shall not exceed the fees actually paid by the Client for the specific engagement giving rise to the claim,
        in the three months preceding such claim. We shall not be liable for indirect, incidental, consequential, or
        punitive damages, including loss of profit, revenue, data, or goodwill.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">10. Indemnity</h3>
      <p>
        You agree to indemnify and hold us harmless from any claims, damages, or expenses arising out of your breach
        of these Terms, misuse of the services, or violation of any law or third-party rights.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">11. Termination</h3>
      <p>
        Either party may terminate an engagement by written notice as provided in the engagement document. Upon
        termination, the Client shall pay for all services rendered and expenses incurred up to the effective date
        of termination.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">12. Force Majeure</h3>
      <p>
        Neither party shall be liable for delays or failures in performance caused by events beyond reasonable
        control, including natural calamities, acts of government, internet outages, pandemics, or civil unrest.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">13. Governing Law and Jurisdiction</h3>
      <p>
        These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or
        in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts located
        in Bengaluru, Karnataka. Parties shall first attempt to resolve disputes amicably; failing which, disputes
        may be referred to arbitration under the Arbitration and Conciliation Act, 1996, conducted by a sole
        arbitrator appointed mutually.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">14. Modifications</h3>
      <p>
        We reserve the right to modify these Terms at any time. Continued use of the website or services after such
        changes constitutes your acceptance of the revised Terms.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-foreground font-semibold">15. Contact</h3>
      <p>For any queries about these Terms, please contact us at hello@kliviq.com.</p>
    </section>
  </div>
);

const LegalDialog = ({ open, onOpenChange, type }: LegalDialogProps) => {
  const isPrivacy = type === "privacy";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] glass-strong p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-2xl gradient-text">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isPrivacy ? "How we handle your personal data." : "Terms governing the use of our services."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[65vh] px-6 py-5">
          {isPrivacy ? <PrivacyContent /> : <TermsContent />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LegalDialog;
