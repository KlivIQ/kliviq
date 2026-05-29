import { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import GlossaryTermPage from "@/components/GlossaryTermPage";
import { getGlossaryTermBySlug } from "@/data/glossary";

const GlossaryTerm = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const term = slug ? getGlossaryTermBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!term) return <Navigate to="/404" replace />;
  return <GlossaryTermPage term={term} />;
};

export default GlossaryTerm;
