import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ArticleCTA = () => (
  <section className="glass-strong rounded-3xl p-10 md:p-14 text-center">
    <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
      Need Help Figuring Out Where AI Fits In Your Business?
    </h2>
    <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
      Many businesses know AI can help but struggle to identify where to start. KlivIQ helps founders
      and growing companies evaluate opportunities, prioritise initiatives and implement practical solutions.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <Link
        to="/#contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
      >
        Book a Free Consultation <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
        to="/services/ai-consulting"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-foreground border border-border hover:bg-foreground/5 transition-colors"
      >
        Explore AI Services
      </Link>
    </div>
  </section>
);

export default ArticleCTA;
