import { createContext, useCallback, useContext, useMemo, useState, ReactNode, lazy, Suspense } from "react";

const ConsultationDialog = lazy(() => import("./ConsultationDialog"));

type BookingCtx = {
  open: boolean;
  openBooking: (source?: string) => void;
  closeBooking: () => void;
  source: string;
};

const Ctx = createContext<BookingCtx | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("site");

  const openBooking = useCallback((s?: string) => {
    if (s) setSource(s);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openBooking, closeBooking, source }),
    [open, openBooking, closeBooking, source],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <ConsultationDialog />
        </Suspense>
      )}
    </Ctx.Provider>
  );
};

export const useBooking = (): BookingCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};
