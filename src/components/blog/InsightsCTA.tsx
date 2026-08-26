import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Compass, CalendarCheck } from "lucide-react";

const InsightsCTA = () => (
  <section className="glass-strong rounded-3xl p-10 md:p-14 my-16">
    <div className="text-center mb-10">
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>
        Keep going
      </p>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
        Practical next steps for founders & teams
      </h2>
    </div>
    <div className="grid sm:grid-cols-3 gap-4">
      <Link
        to="/blog"
        className="group glass rounded-2xl p-6 hover:bg-foreground/5 transition-colors flex flex-col"
      >
        <BookOpen className="w-5 h-5 mb-4" style={{ color: "#4ADE80" }} />
        <p className="text-base font-semibold mb-1">Read More Insights</p>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          Frameworks, lessons and case studies for AI and modern technology.
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-4">
          Browse articles <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
      <Link
        to="/services/ai-consulting"
        className="group glass rounded-2xl p-6 hover:bg-foreground/5 transition-colors flex flex-col"
      >
        <Compass className="w-5 h-5 mb-4" style={{ color: "#4ADE80" }} />
        <p className="text-base font-semibold mb-1">Explore AI Services</p>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          Find where AI creates real value in your business — and ship it in weeks.
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-4">
          See services <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
      <Link
        to="/#contact"
        className="group glass rounded-2xl p-6 hover:bg-foreground/5 transition-colors flex flex-col"
      >
        <CalendarCheck className="w-5 h-5 mb-4" style={{ color: "#4ADE80" }} />
        <p className="text-base font-semibold mb-1">Book a Free Consultation</p>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          30 minutes with a senior KlivIQ engineer to pressure-test your idea.
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-4">
          Talk to us <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </div>
  </section>
);

export default InsightsCTA;
