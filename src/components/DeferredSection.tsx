import { ReactNode } from "react";

/**
 * Wraps a below-the-fold section so the browser can skip its layout, style
 * and paint work until it scrolls near the viewport (`content-visibility`).
 * The markup is still rendered into the static HTML, so crawlers see
 * everything — only the rendering cost is deferred.
 */
const DeferredSection = ({
  children,
  className,
  minHeight = 600,
}: {
  children: ReactNode;
  className?: string;
  minHeight?: number;
}) => (
  <div
    className={className}
    style={{
      contentVisibility: "auto",
      containIntrinsicSize: `auto ${minHeight}px`,
    }}
  >
    {children}
  </div>
);

export default DeferredSection;
