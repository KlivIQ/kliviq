import { ReactNode } from "react";
import { useBooking } from "./BookingContext";

type Props = {
  className?: string;
  children: ReactNode;
  source?: string;
  ariaLabel?: string;
};

/** Any booking / consultation CTA on the site renders through this button. */
const BookingButton = ({ className, children, source, ariaLabel }: Props) => {
  const { openBooking } = useBooking();
  return (
    <button type="button" aria-label={ariaLabel} className={className} onClick={() => openBooking(source)}>
      {children}
    </button>
  );
};

export default BookingButton;
