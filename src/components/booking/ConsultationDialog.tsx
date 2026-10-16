import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBooking } from "./BookingContext";
import ConsultationForm from "./ConsultationForm";

const ConsultationDialog = () => {
  const { open, closeBooking, source } = useBooking();
  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent className="bg-card border-border sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl">
        {open && <ConsultationForm key={source} source={source} onDone={closeBooking} />}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
