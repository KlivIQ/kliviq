import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

export default function RouteTracker() {
  const { pathname, search } = useLocation();
  const path = pathname + search;
  const previousPath = useRef(path);

  useEffect(() => {
    if (typeof window === "undefined" || previousPath.current === path) return;
    previousPath.current = path;
    trackEvent("page_view", { page_path: path, page_location: window.location.href });
  }, [path]);

  return null;
}