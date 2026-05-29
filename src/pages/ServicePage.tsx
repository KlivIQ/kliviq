import { useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import { getServiceBySlug } from "@/data/serviceLandingPages";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const content = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!content) return <Navigate to="/404" replace />;
  return <ServiceLandingPage content={content} />;
};

export default ServicePage;
