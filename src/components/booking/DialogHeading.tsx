import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const DialogHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <DialogHeader className="text-left">
    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
    <DialogDescription className="text-muted-foreground">{subtitle}</DialogDescription>
  </DialogHeader>
);
