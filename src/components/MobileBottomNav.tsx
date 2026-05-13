import { User, Briefcase, FolderKanban, Tag, Mail } from "lucide-react";

const items = [
  { label: "About", href: "#about", Icon: User },
  { label: "Services", href: "#services", Icon: Briefcase },
  { label: "Work", href: "#projects", Icon: FolderKanban },
  { label: "Pricing", href: "#pricing", Icon: Tag },
  { label: "Contact", href: "#contact", Icon: Mail },
];

const MobileBottomNav = () => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-glass-border/40"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile navigation"
    >
      <ul className="flex items-stretch justify-around px-2 py-2">
        {items.map(({ label, href, Icon }) => (
          <li key={href} className="flex-1">
            <a
              href={href}
              className="flex flex-col items-center justify-center gap-1 py-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
