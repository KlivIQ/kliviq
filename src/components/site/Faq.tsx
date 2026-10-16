import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import type { QA } from "@/data/catalog";

/** SSR-friendly FAQ (native details/summary). Answers are in the HTML for crawlers. */
const Faq = ({ items, title = "Questions, answered" }: { items: QA[]; title?: string }) => (
  <section className="py-20 md:py-28">
    <div className="container-x grid gap-10 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>
      </Reveal>
      <div className="lg:col-span-8">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-border py-5 first:border-t">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
