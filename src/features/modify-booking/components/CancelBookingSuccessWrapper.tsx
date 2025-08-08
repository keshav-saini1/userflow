import { useNavigate } from "react-router";
import CancelBookingSuccessPage from "../pages/CancelBookingSuccessPage";

const CancelBookingSuccessWrapper = () => {
   const navigate = useNavigate();

   const handleDone = () => {
      // Navigate back to bookings or dashboard
      navigate("/bookings");
   };

   const handleViewBookings = () => {
      // Navigate to my bookings page
      navigate("/my-bookings");
   };

   return (
      <CancelBookingSuccessPage
         onDone={handleDone}
         onViewBookings={handleViewBookings}
      />
   );
};

export default CancelBookingSuccessWrapper;
