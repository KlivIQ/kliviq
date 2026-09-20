import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n/LanguageContext";
import { useBooking } from "./BookingContext";

export const SERVICE_KEYS = ["aiVisibility", "aiApps", "webDesign", "fractionalCto", "others"] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

const SERVICE_LABELS: Record<ServiceKey, string> = {
  aiVisibility: "AI Visibility",
  aiApps: "AI Apps & Tools",
  webDesign: "Website Design / Re-design",
  fractionalCto: "Fractional CTO",
  others: "Others",
};

const ConsultationDialog = () => {
  const { t } = useLang();
  const { open, closeBooking, source } = useBooking();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().trim().min(2, t.booking.errName).max(80, t.booking.errName),
    email: z.string().trim().email(t.booking.errEmail).max(160),
    mobile: z
      .string()
      .trim()
      .min(7, t.booking.errMobile)
      .max(20, t.booking.errMobile)
      .regex(/^\+?[0-9][0-9\s-]{6,19}$/, t.booking.errMobile),
    services: z.array(z.enum(SERVICE_KEYS)).min(1, t.booking.errService),
    message: z.string().trim().max(600).optional(),
    company: z.string().max(0).optional(), // honeypot
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", email: "", mobile: "", services: [], message: "", company: "" },
  });

  const selected = watch("services") ?? [];

  const toggleService = (key: ServiceKey) => {
    const next = selected.includes(key) ? selected.filter((s) => s !== key) : [...selected, key];
    setValue("services", next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    if (values.company) return; // bot
    const { error } = await supabase.functions.invoke("send-consultation", {
      body: {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        services: values.services.map((k) => SERVICE_LABELS[k]),
        message: values.message || "",
        source,
      },
    });
    if (error) {
      setServerError(t.booking.errSubmit);
      return;
    }
    setSent(true);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      closeBooking();
      setTimeout(() => setSent(false), 200);
    }
  };

  const inputClass =
    "w-full rounded-xl bg-background/60 border border-border/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-secondary/70 focus:ring-2 focus:ring-secondary/20";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="glass-strong border-border/60 sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-secondary/25"
              >
                <CheckCircle2 className="h-7 w-7 text-secondary" />
              </motion.div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-2">{t.booking.successTitle}</h3>
              <p className="text-muted-foreground leading-relaxed px-2">{t.booking.successBody}</p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-7 px-7 py-3 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-transform hover:scale-105"
              >
                {t.booking.done}
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  {t.booking.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">{t.booking.subtitle}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  {...register("company")}
                />

                <div>
                  <label htmlFor="booking-name" className="block text-sm font-medium mb-1.5">
                    {t.booking.name} <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="booking-name"
                    autoComplete="name"
                    placeholder={t.booking.namePlaceholder}
                    className={inputClass}
                    {...register("name")}
                  />
                  {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-email" className="block text-sm font-medium mb-1.5">
                      {t.booking.email} <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={t.booking.emailPlaceholder}
                      className={inputClass}
                      {...register("email")}
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="booking-mobile" className="block text-sm font-medium mb-1.5">
                      {t.booking.mobile} <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="booking-mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={t.booking.mobilePlaceholder}
                      className={inputClass}
                      {...register("mobile")}
                    />
                    {errors.mobile && <p className="mt-1.5 text-sm text-destructive">{errors.mobile.message}</p>}
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-medium mb-2">
                    {t.booking.service} <span className="text-secondary">*</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_KEYS.map((key) => {
                      const active = selected.includes(key);
                      return (
                        <motion.button
                          key={key}
                          type="button"
                          onClick={() => toggleService(key)}
                          aria-pressed={active}
                          whileTap={{ scale: 0.94 }}
                          whileHover={{ scale: 1.04 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className={`relative inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            active
                              ? "border-secondary/70 bg-gradient-to-r from-primary/25 to-secondary/25 text-foreground shadow-[0_0_18px_hsl(var(--secondary)/0.35)]"
                              : "border-border/60 text-muted-foreground hover:text-foreground hover:border-secondary/40"
                          }`}
                        >
                          <AnimatePresence initial={false}>
                            {active && (
                              <motion.span
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 14, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <Check className="h-3.5 w-3.5 text-secondary" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {t.booking.services[key]}
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.services && <p className="mt-1.5 text-sm text-destructive">{errors.services.message}</p>}
                </div>

                <div>
                  <label htmlFor="booking-message" className="block text-sm font-medium mb-1.5">
                    {t.booking.message}
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    placeholder={t.booking.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                    {...register("message")}
                  />
                </div>

                {serverError && <p className="text-sm text-destructive">{serverError}</p>}

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? t.booking.sending : t.booking.submit}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
