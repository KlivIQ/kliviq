import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
  className?: string;
  idPrefix?: string;
}

/**
 * Reusable slim FAQ accordion shared by the Products page and service
 * landing pages. Visible copy matches the FAQPage JSON-LD on each page.
 */
const FaqBlock = ({ items, title = "Frequently asked questions", eyebrow, className = "", idPrefix = "faq" }: Props) => (
  <section id="faq" className={`px-6 ${className}`}>
    <div className="max-w-3xl mx-auto">
      {eyebrow && (
        <p className="text-sm uppercase tracking-widest mb-3 text-center" style={{ color: "#4ADE80" }}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-8">{title}</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {items.map((item, i) => (
          <AccordionItem
            key={`${idPrefix}-${i}`}
            value={`${idPrefix}-${i}`}
            className="glass rounded-xl border border-border/50 px-4 data-[state=open]:border-primary/40 transition-colors"
          >
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-3">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqBlock;
