import { useEffect } from "react";
import { Head } from "vite-react-ssg";
import { useNavigate } from "react-router-dom";
import { SITE_URL } from "@/data/catalog";

/** Client fallback for moved URLs (the host also sends a 301 via vercel.json). */
const RedirectTo = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [to, navigate]);
  return (
    <>
      <Head>
        <title>Moved | KlivIQ</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE_URL}${to}`} />
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
      </Head>
      <p className="p-10 text-center">
        This page has moved. <a href={to} className="underline">Continue</a>.
      </p>
    </>
  );
};

export default RedirectTo;
