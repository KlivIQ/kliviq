import type { BlogAuthor } from "@/data/blog";

const AuthorBio = ({ author }: { author: BlogAuthor }) => {
  const initials = author.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <aside className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold shrink-0"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
          color: "hsl(var(--primary-foreground))",
        }}
        aria-hidden
      >
        {initials}
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#4ADE80" }}>
          Written by
        </p>
        <p className="text-lg font-semibold text-foreground">{author.displayName}</p>
        <p className="text-sm text-muted-foreground mb-3">{author.jobTitle}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
        <a
          href={author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:opacity-80 mt-3"
        >
          Connect on LinkedIn →
        </a>
      </div>
    </aside>
  );
};

export default AuthorBio;
