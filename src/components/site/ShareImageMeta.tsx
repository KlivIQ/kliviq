import { absoluteShareImage, shareImageForPath } from "@/data/socialImages";

/** Plain tags for legacy pages that already own a vite-react-ssg Head. */
export const shareImageTags = (path: string, alt: string) => {
  const image = absoluteShareImage(shareImageForPath(path));
  return [
    <meta key="og:image" property="og:image" content={image} />,
    <meta key="og:image:width" property="og:image:width" content="1200" />,
    <meta key="og:image:height" property="og:image:height" content="630" />,
    <meta key="og:image:alt" property="og:image:alt" content={alt} />,
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
    <meta key="twitter:image" name="twitter:image" content={image} />,
    <meta key="twitter:image:alt" name="twitter:image:alt" content={alt} />,
  ];
};