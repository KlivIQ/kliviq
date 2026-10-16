import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import FloatingActions from "@/components/FloatingActions";

const SiteShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="relative">{children}</main>
    <FooterSection />
    <FloatingActions />
  </div>
);

export default SiteShell;
