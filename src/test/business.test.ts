import { describe, expect, it } from "vitest";
import { BUSINESS_CONTACT, BUSINESS_PROFILES, professionalServiceSchema } from "../data/business";
import { SITE_URL } from "../data/catalog";

describe("Local business identity", () => {
  const schema = professionalServiceSchema({ name: "KlivIQ Technologies", url: SITE_URL });

  it("identifies the professional service and legal company", () => {
    expect(schema["@type"]).toBe("ProfessionalService");
    expect(schema.name).toBe("KlivIQ Technologies");
    expect(schema.legalName).toBe("KlivIQ Technologies OPC Private Limited");
  });

  it("uses the supplied Chennai postal address", () => {
    expect(schema.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "23, Krishna Street, T. Nagar",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600017",
      addressCountry: "IN",
    });
  });

  it("uses the supplied telephone and email", () => {
    expect(schema.telephone).toBe("+91 98404 97937");
    expect(BUSINESS_CONTACT.telephoneHref).toBe("tel:+919840497937");
    expect(schema.email).toBe("hello@kliviq.com");
  });

  it("reuses the site URL and social profiles without inventing service countries or a price range", () => {
    expect(schema.url).toBe(SITE_URL);
    expect(schema.sameAs).toEqual(BUSINESS_PROFILES);
    expect(schema.areaServed).toBe("IN");
    expect(schema).not.toHaveProperty("priceRange");
  });
});