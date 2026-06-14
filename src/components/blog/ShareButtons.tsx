import { useState } from "react";
import { Linkedin, Twitter, Link2, Check } from "lucide-react";

interface Props {
  url: string;
  title: string;
}

const ShareButtons = ({ url, title }: Props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const enc = encodeURIComponent;
  const tw = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;

  return (
    <div className="flex items-center gap-2" aria-label="Share this article">
      <a
        href={tw}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 inline-flex items-center justify-center rounded-full glass hover:bg-foreground/10 transition-colors"
        aria-label="Share on X"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={li}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 inline-flex items-center justify-center rounded-full glass hover:bg-foreground/10 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="w-9 h-9 inline-flex items-center justify-center rounded-full glass hover:bg-foreground/10 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4" style={{ color: "#4ADE80" }} /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default ShareButtons;
