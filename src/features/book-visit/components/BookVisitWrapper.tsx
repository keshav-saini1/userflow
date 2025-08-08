import { useNavigate } from "react-router";
import BookVisitPage from "../pages/BookVisitPage";

const BookVisitWrapper = () => {
   const navigate = useNavigate();

   const handleSuccess = (bookingDetails: {
      property: string;
      visitType: string;
      date: string;
      time: string;
   }) => {
      // Navigate to success page with booking details as state
      navigate("/book-visit/success", {
         state: { bookingDetails },
      });
   };

   return <BookVisitPage onSuccess={handleSuccess} />;
};

export default BookVisitWrapper;
