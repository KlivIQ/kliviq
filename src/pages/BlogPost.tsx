import { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import BlogPostPage from "@/components/BlogPostPage";
import { getBlogPostBySlug } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!post) return <Navigate to="/404" replace />;
  return <BlogPostPage post={post} />;
};

export default BlogPost;
