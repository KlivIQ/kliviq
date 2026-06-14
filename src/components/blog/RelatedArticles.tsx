import type { BlogPost } from "@/data/blog";
import ArticleCard from "./ArticleCard";

const RelatedArticles = ({ posts }: { posts: BlogPost[] }) => {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-articles" className="mb-16">
      <h2 id="related-articles" className="text-2xl md:text-3xl font-semibold mb-6">
        More Insights
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
