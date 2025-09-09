import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import ConfirmedBookingPage from "../pages/ConfirmedBookingPage";
import { useConfirmedBookingApi } from "../api/useConfirmedBookingApi";

const ConfirmedBookingWrapper = () => {
   const navigate = useNavigate();
   const { 
      getPropertyDetails, 
      getPropertyDetailsData, 
      isGettingPropertyDetails,
      getPropertyDetailsError,
      getBookingDetails,
      getBookingDetailsData,
      isGettingBookingDetails,
      getBookingDetailsError
   } = useConfirmedBookingApi();

   const propertyId = localStorage.getItem('selectedPropertyId');
   
   console.log({getPropertyDetailsData, getBookingDetailsData});
   
   // Get property and booking details on component mount
   useEffect(() => {
      if (propertyId) {
         getPropertyDetails({ propertyId });
         getBookingDetails({ propertyId });
      }
   }, [propertyId, getPropertyDetails, getBookingDetails]);

   // Construct confirmed booking data from API response
   const confirmedBookingData: any = useMemo(() => {
      const propertyData = getPropertyDetailsData?.data;
      const bookingData = getBookingDetailsData?.data;
      
      // Calculate days until move-in
      const calculateDaysUntilMoveIn = (moveInDate: string) => {
         try {
            const moveIn = new Date(moveInDate);
            const today = new Date();
            const diffTime = moveIn.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Math.max(0, diffDays);
         } catch {
            return 0;
         }
      };

      // Format move-in date
      const formatMoveInDate = (dateString: string) => {
         try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', { 
               day: 'numeric', 
               month: 'short', 
               year: 'numeric' 
            });
         } catch {
            return 'TBD';
         }
      };
      
      return {
         bookingDetails: {
            id: propertyData?.id || 'N/A',
            roomNumber: bookingData?.room_id || propertyData?.pg_number || 'TBD',
            roomType: 'Premium Room', // This could come from property data if available
            moveInDate: bookingData?.movein_date ? formatMoveInDate(bookingData.movein_date) : 'TBD',
            status: bookingData?.status === 1 ? 'approved' : 'pending',
            tokenPaid: bookingData?.token_paid || propertyData?.min_token_amount || 0,
            daysUntilMoveIn: bookingData?.movein_date ? calculateDaysUntilMoveIn(bookingData.movein_date) : 0,
            propertyImage: propertyData?.image,
            roomImage: propertyData?.image
         },
         paymentSummary: {
            totalOutstanding: (propertyData?.rent || 0) * 3, // Example calculation
            dueDate: '15 Jan',
            items: [
               {
                  id: 'rent-1',
                  name: 'Monthly Rent',
                  amount: propertyData?.rent,
                  type: 'rent' as const,
                  period: 'Monthly',
                  isOneTime: false
               },
               {
                  id: 'security-1',
                  name: 'Security Deposit',
                  amount: propertyData?.rent,
                  type: 'security-deposit' as const,
                  isOneTime: true
               },
               {
                  id: 'token-1',
                  name: 'Token Amount (Paid)',
                  amount: propertyData?.min_token_amount,
                  type: 'joining-fee' as const,
                  isOneTime: true
               }
            ]
         },
         supportOptions: [
            {
               id: 'chat-support',
               title: 'Chat with Support',
               description: 'Get instant help from our team',
               icon: '💬',
               iconBgColor: '#b9f8cf',
               action: 'chat' as const
            },
            {
               id: 'call-support',
               title: 'Call Support',
               description: 'Speak directly with our team',
               icon: '📞',
               iconBgColor: '#bedbff',
               action: 'call' as const
            }
         ],
         propertyInfo: {
            name: propertyData?.propertyName,
            location: `${propertyData?.propertyAddress?.city}, ${propertyData?.propertyAddress?.state}`,
            commuteTimes: {
               metro: '15-25 min',
               walk: '2 min walk',
               bus: '5-8 min'
            }
         }
      };
   }, [getPropertyDetailsData, getBookingDetailsData]);

   console.log({confirmedBookingData})

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

   // Show loading state while fetching data
   if (isGettingPropertyDetails || isGettingBookingDetails) {
      return (
         <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
               <p className="text-gray-600">Loading booking details...</p>
            </div>
         </div>
      );
   }

   // Show error state if required data is missing from localStorage
   if (!propertyId) {
      return (
         <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
               <div className="text-orange-500 text-6xl mb-4">📋</div>
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Information Missing</h2>
               <p className="text-gray-600 mb-6">
                  We couldn't find your booking information. Please start a new booking or return to the previous page.
               </p>
               <div className="space-y-3">
                  <button
                     onClick={() => navigate('/persona-selection')}
                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     Start New Booking
                  </button>
                  <button
                     onClick={() => navigate(-1)}
                     className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                     Go Back
                  </button>
               </div>
            </div>
         </div>
      );
   }

   // Show error state if API calls failed
   if (getPropertyDetailsError || getBookingDetailsError) {
      return (
         <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
               <div className="text-red-500 text-6xl mb-4">⚠️</div>
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Booking Details</h2>
               <p className="text-gray-600 mb-6">
                  {getPropertyDetailsError?.message || getBookingDetailsError?.message || 
                   'There was an error loading your booking information. Please try again.'}
               </p>
               <div className="space-y-3">
                  <button
                     onClick={() => window.location.reload()}
                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     Retry
                  </button>
                  <button
                     onClick={() => navigate('/persona-selection')}
                     className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                     Go Back
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <ConfirmedBookingPage
         data={confirmedBookingData}
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
