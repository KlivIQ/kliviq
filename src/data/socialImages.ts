import { SITE_URL } from "./catalog";

/** Public files are materialised from the original asset pointers before dev/build. */
export const PRODUCT_SHARE_IMAGES: Record<string, string> = {
  seenzo: "/og/seenzo.jpg",
  connect: "/og/connect.jpg",
  tryon: "/og/tryon.jpg",
  clinicping: "/og/clinicping.jpg",
  paramparai: "/og/paramparai.jpg",
};

export const shareImageForPath = (path: string) => {
  const normalized = path.replace(/\/+$/, "") || "/";
  const productImage = PRODUCT_SHARE_IMAGES[normalized.replace(/^\/products\//, "")];
  if (normalized.startsWith("/products/") && productImage) return productImage;
  if (normalized === "/services" || normalized.startsWith("/services/")) return "/og/services.jpg";
  return "/og/kliviq.jpg";
};

export const absoluteShareImage = (image: string) => {
  const url = new URL(image, `${SITE_URL}/`);
  // A new artwork version prompts sharing crawlers to fetch the corrected cards.
  if (url.origin === SITE_URL && url.pathname.startsWith("/og/")) {
    url.searchParams.set("v", "20261027-centered");
  }
  return url.href;
};