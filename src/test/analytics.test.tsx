import { StrictMode } from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Link } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import RouteTracker from "@/components/analytics/RouteTracker";
import { trackEvent } from "@/lib/analytics";

afterEach(() => {
  cleanup();
  delete window.gtag;
});

describe("GA4 tracking", () => {
  it("does not fail if Google Analytics is blocked", () => {
    expect(() => trackEvent("book_call_click", { source: "home-hero" })).not.toThrow();
  });

  it("sends only the supplied event metadata", () => {
    window.gtag = vi.fn();
    trackEvent("generate_lead", { source: "contact-page" });
    expect(window.gtag).toHaveBeenCalledWith("event", "generate_lead", { source: "contact-page" });
  });

  it("skips initial page views, including StrictMode, and tracks path plus search on navigation", () => {
    window.gtag = vi.fn();
    render(<StrictMode><MemoryRouter initialEntries={["/"]}>
      <RouteTracker /><Link to="/contact?service=ai">Contact</Link>
    </MemoryRouter></StrictMode>);
    expect(window.gtag).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/contact?service=ai", page_location: window.location.href,
    });
  });
});