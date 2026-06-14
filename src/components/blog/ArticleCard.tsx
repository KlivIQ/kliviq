import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

interface Props {
  post: BlogPost;
  featured?: boolean;
}

const ArticleCard = ({ post, featured = false }: Props) => {
  if (featured) {
    return (
      <Link
        to={post.path}
        className="group block glass-strong rounded-3xl overflow-hidden hover:bg-foreground/5 transition-colors mb-12"
      >
        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-3 aspect-[16/10] md:aspect-auto overflow-hidden bg-card">
            <img
              src={post.heroImage}
              alt={post.heroAlt}
              loading="eager"
              decoding="async"
              width={1920}
              height={1080}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
          <div className="md:col-span-2 p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ color: "#4ADE80", border: "1px solid hsl(var(--glass-border))" }}
              >
                Featured · {post.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-foreground group-hover:opacity-90">
              {post.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{post.excerpt}</p>
            <div className="text-sm text-muted-foreground flex items-center gap-4 mb-5">
              <span>{post.author.displayName}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTimeMin} min read
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 group-hover:text-foreground">
              Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={post.path}
      className="group flex flex-col glass rounded-2xl overflow-hidden hover:bg-foreground/5 transition-colors"
    >
      <div className="aspect-[16/9] overflow-hidden bg-card">
        <img
          src={post.heroImage}
          alt={post.heroAlt}
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#4ADE80" }}>
          {post.category}
        </p>
        <h3 className="text-lg font-semibold mb-2 text-foreground leading-snug">{post.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
        <div className="text-xs text-muted-foreground flex items-center gap-3 mt-5">
          <span>{post.author.displayName}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMin} min</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
