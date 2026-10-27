// Only send non-personal event metadata (source, location, and page URLs).
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window !== "undefined") window.gtag?.("event", name, params);
}