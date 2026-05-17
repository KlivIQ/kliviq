import { useState } from "react";
import LegalDialog from "@/components/LegalDialog";

const FooterSection = () => {
  const [openDialog, setOpenDialog] = useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="relative py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

        <p className="text-center text-muted-foreground text-sm mb-8">
          <span className="font-semibold">
            <span className="text-foreground">Kliv</span>
            <span className="text-brand-cyan">IQ</span>
          </span>{" "}
          — Building Tech That Actually Works
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 KlivIQ Technologies. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setOpenDialog("privacy")}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <span className="opacity-40">·</span>
            <button
              type="button"
              onClick={() => setOpenDialog("terms")}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
            <span className="opacity-40">·</span>
            <a
              href="mailto:hello@kliviq.com"
              className="hover:text-foreground transition-colors"
            >
              hello@kliviq.com
            </a>
          </div>

          <p>Made in India 🇮🇳 · Delivered Globally 🌍</p>
        </div>
      </div>

      <LegalDialog
        open={openDialog !== null}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        type={openDialog ?? "privacy"}
      />
    </footer>
  );
};

export default FooterSection;
