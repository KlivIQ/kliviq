import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBooking } from "./BookingContext";
import ConsultationForm from "./ConsultationForm";

const ConsultationDialog = () => {
  const { open, closeBooking, source } = useBooking();
  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent className="bg-card border-border sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl">
        {open &&
          (source.startsWith("waitlist-") ? (
            <ConsultationForm
              key={source}
              source={source}
              onDone={closeBooking}
              heading="Join the Aacharam waitlist"
              subheading="We will invite you as soon as the first release opens."
              defaultServices={["others"]}
              defaultMessage="Please add me to the Aacharam waitlist."
            />
          ) : (
            <ConsultationForm key={source} source={source} onDone={closeBooking} />
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
