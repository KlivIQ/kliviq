import { describe, expect, it } from "vitest";
import { absoluteShareImage, shareImageForPath } from "../data/socialImages";
import { getCatalogProduct } from "../data/catalog";

describe("approved sharing image tiers", () => {
  it.each(["seenzo", "connect", "tryon", "clinicping"])("uses a separate image for %s", (slug) => {
    expect(shareImageForPath(`/products/${slug}`)).toBe(`/og/${slug}.jpg`);
  });
  it("uses the Paramparai image and name on the existing ancestry URL", () => {
    expect(shareImageForPath("/products/paramparai")).toBe("/og/paramparai.jpg");
    expect(getCatalogProduct("paramparai")?.name).toBe("Paramparai");
    expect(getCatalogProduct("paramparai")?.logo).toBe("/og/paramparai-logo.svg");
  });
  it.each(["/services", "/services/ai-visibility", "/services/ai-implementation", "/services/web-mobile-development", "/services/fractional-cto"])("uses the shared services image on %s", (path) => {
    expect(shareImageForPath(path)).toBe("/og/services.jpg");
  });
  it.each(["/", "/products", "/industries", "/pricing", "/work", "/about", "/contact", "/blog", "/glossary", "/terms", "/privacy-policy"])("uses the company image on %s", (path) => {
    expect(shareImageForPath(path)).toBe("/og/kliviq.jpg");
  });
  it("makes share image URLs absolute on the canonical host", () => {
    expect(absoluteShareImage("/og/seenzo.jpg")).toBe("https://www.kliviq.com/og/seenzo.jpg?v=20261027-centered");
  });
});