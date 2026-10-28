import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { DialogHeading } from "./DialogHeading";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n/LanguageContext";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  mobile: z.union([z.literal(""), z.string().trim().regex(/^\+?[0-9][0-9\s-]{6,19}$/)]),
});

const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

const WaitlistForm = ({ product, onDone }: { product: string; onDone?: () => void }) => {
  const { tr } = useLang();
  const [values, setValues] = useState({ name: "", email: "", mobile: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), true])));
      return;
    }
    setErrors({});
    setBusy(true);
    setFailed(false);
    const { error } = await supabase.from("waitlist").insert({
      product,
      name: r.data.name,
      email: r.data.email,
      mobile: r.data.mobile || null,
    });
    setBusy(false);
    if (error) return setFailed(true);
    trackEvent("generate_lead", { form: "waitlist", product });
    setDone(true);
  };

  if (done)
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand" />
        <h3 className="mt-4 text-2xl font-bold">{tr("You're on the list!")}</h3>
        <p className="mt-2 text-muted-foreground">{tr("We will invite you as soon as the first release opens.")}</p>
        <button type="button" onClick={onDone} className="btn-primary mt-6">{tr("Close")}</button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <DialogHeading title={tr("Join the Paramparai waitlist")} subtitle={tr("We will invite you as soon as the first release opens.")} />
      <div>
        <input aria-label={tr("Name")} placeholder={`${tr("Name")} *`} value={values.name} onChange={set("name")} className={field} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{tr("Please enter your name.")}</p>}
      </div>
      <div>
        <input type="email" aria-label={tr("Email")} placeholder={`${tr("Email")} *`} value={values.email} onChange={set("email")} className={field} />
        {errors.email && <p className="mt-1 text-xs text-destructive">{tr("Please enter a valid email.")}</p>}
      </div>
      <div>
        <input type="tel" aria-label={tr("Mobile (optional)")} placeholder={tr("Mobile (optional)")} value={values.mobile} onChange={set("mobile")} className={field} />
        {errors.mobile && <p className="mt-1 text-xs text-destructive">{tr("Please enter a valid mobile number.")}</p>}
      </div>
      {failed && <p className="text-sm text-destructive">{tr("Something went wrong. Please try again.")}</p>}
      <button type="submit" disabled={busy} className="btn-brand w-full justify-center py-3.5">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : tr("Add to waitlist")}
      </button>
    </form>
  );
};

export default WaitlistForm;
