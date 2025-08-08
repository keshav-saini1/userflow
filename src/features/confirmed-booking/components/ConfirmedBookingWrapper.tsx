import { useNavigate } from "react-router";
import ConfirmedBookingPage from "../pages/ConfirmedBookingPage";
import { sampleConfirmedBookingData } from "../data/sampleData";

const ConfirmedBookingWrapper = () => {
   const navigate = useNavigate();

   const handleBackClick = () => {
      navigate("/persona-selection");
   };

   const handleShareClick = () => {
      navigate("/profile");
   };

   const handleSendReminder = () => {
      console.log("Send reminder clicked");
   };

   const handlePayNow = () => {
      console.log("Pay now clicked");
      // Navigate to payment flow
      // navigate('/payment');
   };

   const handleViewAllPayments = () => {
      console.log("View all payments clicked");
      // Navigate to payments page
      // navigate('/payments');
   };

   const handleSupportAction = (action: "chat" | "call") => {
      console.log("Support action clicked:", action);
      // Handle support action (open chat or initiate call)
   };

   const handleExploreCommute = () => {
      console.log("Explore commute clicked");
      // Navigate to commute/map view
      // navigate('/commute');
   };

   const handleModifyBooking = () => {
      console.log("Modify booking clicked");
      // Navigate to booking modification flow
      navigate("/modify-booking");
   };

   const handleRequestRefund = () => {
      console.log("Request refund clicked");
      // Navigate to refund request flow
      // navigate('/request-refund');
   };

   return (
      <ConfirmedBookingPage
         data={sampleConfirmedBookingData}
         onBackClick={handleBackClick}
         onShareClick={handleShareClick}
         onSendReminder={handleSendReminder}
         onPayNow={handlePayNow}
         onViewAllPayments={handleViewAllPayments}
         onSupportAction={handleSupportAction}
         onExploreCommute={handleExploreCommute}
         onModifyBooking={handleModifyBooking}
         onRequestRefund={handleRequestRefund}
      />
   );
};

export default ConfirmedBookingWrapper;
