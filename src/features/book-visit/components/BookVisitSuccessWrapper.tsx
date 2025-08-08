import { useNavigate, useLocation, Navigate } from "react-router";
import BookVisitSuccessPage from "../pages/BookVisitSuccessPage";

const BookVisitSuccessWrapper = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const bookingDetails = location.state?.bookingDetails;

   if (!bookingDetails) {
      // Redirect to book visit if no booking details
      return <Navigate to="/book-visit" replace />;
   }

   const handleDone = () => {
      // Navigate back to property listing or dashboard
      navigate("/property-listing");
   };

   return (
      <BookVisitSuccessPage
         bookingDetails={bookingDetails}
         onDone={handleDone}
      />
   );
};

export default BookVisitSuccessWrapper;
