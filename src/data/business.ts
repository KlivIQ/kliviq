import { SITE_URL } from "./catalog";

export const BUSINESS_CONTACT = {
  telephone: "+91 98404 97937",
  telephoneHref: "tel:+919840497937",
  email: "hello@kliviq.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "23, Krishna Street, T. Nagar",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600017",
    addressCountry: "IN",
  },
};

export const BUSINESS_PROFILES = [
  "https://www.linkedin.com/company/117713997",
  "https://x.com/kliviq",
  "https://instagram.com/kliviq",
];

export const professionalServiceSchema = (organization: { name: string; url: string }) => ({
  ...organization,
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  legalName: "KlivIQ Technologies OPC Private Limited",
  url: SITE_URL,
  telephone: BUSINESS_CONTACT.telephone,
  email: BUSINESS_CONTACT.email,
  address: BUSINESS_CONTACT.address,
  sameAs: BUSINESS_PROFILES,
  areaServed: "IN",
});