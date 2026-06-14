import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { BlogRelatedResource } from "@/data/blog";

const RelatedResources = ({ items }: { items: BlogRelatedResource[] }) => {
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-resources" className="mb-16">
      <h2 id="related-resources" className="text-2xl md:text-3xl font-semibold mb-6">
        Related Resources
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((r) => (
          <Link
            key={r.path}
            to={r.path}
            className="group glass rounded-xl p-5 hover:bg-foreground/5 transition-colors flex items-start justify-between gap-4"
          >
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#4ADE80" }}
              >
                {r.kind === "service" ? "Service" : "Glossary"}
              </p>
              <p className="text-base font-semibold text-foreground mb-1">{r.label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedResources;
