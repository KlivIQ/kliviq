import { SITE_URL } from "./catalog";

/** Public files are materialised from the original asset pointers before dev/build. */
export const PRODUCT_SHARE_IMAGES: Record<string, string> = {
  seenzo: "/og/seenzo.jpg",
  connect: "/og/connect.jpg",
  tryon: "/og/tryon.jpg",
  clinicping: "/og/clinicping.jpg",
  aacharam: "/og/paramparai.jpg",
};

export const shareImageForPath = (path: string) => {
  const normalized = path.replace(/\/+$/, "") || "/";
  const productImage = PRODUCT_SHARE_IMAGES[normalized.replace(/^\/products\//, "")];
  if (normalized.startsWith("/products/") && productImage) return productImage;
  if (normalized === "/services" || normalized.startsWith("/services/")) return "/og/services.jpg";
  return "/og/kliviq.jpg";
};

export const absoluteShareImage = (image: string) => new URL(image, `${SITE_URL}/`).href;