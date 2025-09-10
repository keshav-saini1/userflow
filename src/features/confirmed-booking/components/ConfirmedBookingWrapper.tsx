import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import ConfirmedBookingPage from "../pages/ConfirmedBookingPage";
import { useConfirmedBookingApi, type PaymentEntry, type TenantPassbookData } from "../api/useConfirmedBookingApi";

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
      getBookingDetailsError,
      getTenantPassbook,
      getTenantPassbookData,
      isGettingTenantPassbook,
      getTenantPassbookError
   } = useConfirmedBookingApi();

   const propertyId = localStorage.getItem('selectedPropertyId');
   const tenantId = localStorage.getItem("tenant_id");
   
   console.log({getTenantPassbookData})
   // Get property and booking details on component mount
   useEffect(() => {
      if (propertyId) {
         getPropertyDetails({ propertyId });
         getBookingDetails({ propertyId });
      }
   }, [propertyId, getPropertyDetails, getBookingDetails]);

   useEffect(() => {
      if(getBookingDetailsData && getBookingDetailsData?.data) {
         getTenantPassbook({
            pg_id: getBookingDetailsData?.data?.pg_id,
            pg_number: getBookingDetailsData?.data?.pg_number,
            tenant_id: tenantId || '',
            source: 'tenant_app'
         })
      }
   }, [getBookingDetailsData])

   // Process tenant passbook data into structured payment entries
   const processPassbookData = (passbookData: TenantPassbookData): PaymentEntry[] => {
      const paymentEntries: PaymentEntry[] = [];

      // Process collection items (payments made)
      if (passbookData.collection && Array.isArray(passbookData.collection)) {
         passbookData.collection.forEach(item => {
            paymentEntries.push({
               id: item.id,
               amount: item.amount,
               due_type: item.due_type,
               due_date: item.due_date,
               description: item.description,
               type: 'collection',
               paid_date: item.paid_date,
               status: item.status,
               receipt_url: item.receipt_url || item.pdf_link,
               payment_mode: item.payment_mode
            });
         });
      }

      // Process dues items (pending payments)
      if (passbookData.dues && Array.isArray(passbookData.dues)) {
         passbookData.dues.forEach(item => {
            paymentEntries.push({
               id: item.id,
               amount: item.amount,
               due_type: item.due_type,
               due_date: item.due_date,
               description: item.description,
               type: 'due',
               status: item.status
            });
         });
      }

      // Sort by due_date (most recent first)
      return paymentEntries.sort((a, b) => {
         const dateA = new Date(a.due_date).getTime();
         const dateB = new Date(b.due_date).getTime();
         return dateB - dateA;
      });
   };

   // Process passbook data when available
   const paymentEntries = useMemo(() => {
      if (getTenantPassbookData?.data) {
         return processPassbookData(getTenantPassbookData.data);
      }
      return [];
   }, [getTenantPassbookData]);

   console.log({ paymentEntries });

   // Construct confirmed booking data from API response
   const confirmedBookingData: any = useMemo(() => {
      const propertyData = getPropertyDetailsData?.data;
      const bookingData = getBookingDetailsData?.data;
      const passbookData = getTenantPassbookData?.data;
      
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

      // Format date for display
      const formatDisplayDate = (dateString: string) => {
         try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', { 
               day: 'numeric', 
               month: 'short' 
            });
         } catch {
            return 'N/A';
         }
      };

      // Get booking status from numeric code
      const getBookingStatus = (statusCode: number | undefined): 'approved' | 'pending' | 'lead' | 'invite' | 'deleted tenant' | 'deleted invitation' | 'deleted lead' => {
         switch (statusCode) {
            case 1:
               return 'approved';
            case 2:
               return 'pending';
            case 3:
               return 'lead';
            case 4:
               return 'invite';
            case 5:
               return 'deleted tenant';
            case 6:
               return 'deleted invitation';
            case 7:
               return 'deleted lead';
            default:
               return 'pending';
         }
      };

      // Create payment summary from passbook data
      const createPaymentSummary = () => {
         if (!passbookData) {
            return {
               totalOutstanding: 0,
               dueDate: 'N/A',
               items: [],
               paymentEntries: []
            };
         }

         // Get next due date from dues array
         const nextDueDate = passbookData.dues && passbookData.dues.length > 0 
            ? formatDisplayDate(passbookData.dues[0].due_date)
            : 'N/A';

         // Process payment entries directly from passbook data
         const processedEntries: PaymentEntry[] = [];

         // Process collection items (payments made)
         if (passbookData.collection && Array.isArray(passbookData.collection)) {
            passbookData.collection.forEach(item => {
               processedEntries.push({
                  id: item.id,
                  amount: item.amount,
                  due_type: item.due_type,
                  due_date: item.due_date,
                  description: item.description,
                  type: 'collection',
                  paid_date: item.paid_date,
                  status: item.status,
                  receipt_url: item.receipt_url || item.pdf_link,
                  payment_mode: item.payment_mode
               });
            });
         }

         // Process dues items (pending payments)
         if (passbookData.dues && Array.isArray(passbookData.dues)) {
            passbookData.dues.forEach(item => {
               processedEntries.push({
                  id: item.id,
                  amount: item.amount,
                  due_type: item.due_type,
                  due_date: item.due_date,
                  description: item.description,
                  type: 'due',
                  status: item.status
               });
            });
         }

         // Sort by due_date (most recent first)
         const sortedEntries = processedEntries.sort((a, b) => {
            const dateA = new Date(a.due_date).getTime();
            const dateB = new Date(b.due_date).getTime();
            return dateB - dateA;
         });

         // Convert payment entries to payment summary items
         const items = sortedEntries.map(entry => ({
            id: entry.id,
            name: `${entry.due_type} ${entry.type === 'collection' ? '(Paid)' : '(Due)'}`,
            amount: typeof entry.amount === 'string' ? parseFloat(entry.amount) : entry.amount,
            type: entry.due_type.toLowerCase().includes('rent') ? 'rent' : 
                  entry.due_type.toLowerCase().includes('security') ? 'security-deposit' : 
                  entry.due_type.toLowerCase().includes('advance') ? 'joining-fee' : 'other',
            period: entry.type === 'collection' ? 'Paid' : 'Due',
            isOneTime: entry.due_type.toLowerCase().includes('advance') || entry.due_type.toLowerCase().includes('security'),
            status: entry.type,
            due_date: entry.due_date,
            paid_date: entry.paid_date,
            receipt_url: entry.receipt_url
         }));

         return {
            totalOutstanding: passbookData.total_dues_amount || 0,
            dueDate: nextDueDate,
            items: items,
            paymentEntries: sortedEntries
         };
      };
      
      return {
         bookingDetails: {
            id: propertyData?.id || 'N/A',
            roomNumber: bookingData?.room_id || propertyData?.pg_number || 'TBD',
            roomType: 'Premium Room', // This could come from property data if available
            moveInDate: bookingData?.movein_date ? formatMoveInDate(bookingData.movein_date) : 'TBD',
            status: getBookingStatus(bookingData?.status),
            tokenPaid: bookingData?.token_paid || propertyData?.min_token_amount || 0,
            daysUntilMoveIn: bookingData?.movein_date ? calculateDaysUntilMoveIn(bookingData.movein_date) : 0,
            propertyImage: propertyData?.image,
            roomImage: propertyData?.image
         },
         paymentSummary: createPaymentSummary(),
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
   }, [getPropertyDetailsData, getBookingDetailsData, getTenantPassbookData]);

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
      navigate('/payment');
   };

   const handleViewAllPayments = () => {
      navigate('/all-payments');
   };

   const handleSupportAction = (action: "chat" | "call") => {
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
