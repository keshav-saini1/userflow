import React, { useState } from "react";
import { useNavigate } from "react-router";
import Calendar from "@/components/Calendar";
import type { DateRange } from "@/components/Calendar";
import default_back from "@/assets/default_back.svg";
import type { ModifyBookingDetails } from "../types";

interface UpdateMoveInPageProps {
   bookingDetails?: ModifyBookingDetails;
}

const UpdateMoveInPage: React.FC<UpdateMoveInPageProps> = ({
   bookingDetails = {
      id: "BK001",
      propertyName: "Premium Private Room",
      roomNumber: "A-203",
      roomType: "Premium Private Room",
      moveInDate: "2025-07-07",
      monthlyRent: 8000,
      status: "pending",
      propertyImage:
         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
   },
}) => {
   const navigate = useNavigate();
   const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
      startDate: null,
      endDate: null,
   });
   const [selectedDuration, setSelectedDuration] = useState<string | null>(
      null
   );

   const handleBackClick = () => {
      navigate(-1);
   };

   const handleDateRangeSelect = (dateRange: DateRange) => {
      setSelectedDateRange(dateRange);
      setSelectedDuration(null); // Clear duration when date is selected
   };

   const handleDurationSelect = (duration: string) => {
      setSelectedDuration(duration);
      // Calculate date range based on duration
      const today = new Date();
      let endDate = new Date(today);

      switch (duration) {
         case "1 day":
            endDate = new Date(today);
            break;
         case "1 week":
            endDate.setDate(today.getDate() + 7);
            break;
         case "1 month":
            endDate.setMonth(today.getMonth() + 1);
            break;
         case "3 months":
            endDate.setMonth(today.getMonth() + 3);
            break;
         default:
            endDate = new Date(today);
      }

      setSelectedDateRange({
         startDate: today,
         endDate: endDate,
      });
   };

   const handleContinue = () => {
      if (selectedDateRange.startDate) {
         // Navigate to next step or submit the form
         console.log("Selected move-in date range:", selectedDateRange);
         // You can navigate to the next step here
         // navigate('/modify-booking/next-step');
      }
   };

   const formatDate = (date: Date) => {
      return date
         .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
         })
         .replace(",", "");
   };

   const isContinueDisabled = !selectedDateRange.startDate;

   return (
      <div className="min-h-screen bg-white w-screen pb-10">
         {/* Header with Progress */}
         <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
            <div className="max-w-md mx-auto px-4 py-3">
               <div className="flex items-center justify-between">
                  <button onClick={handleBackClick}>
                     <img src={default_back} alt="back" className="w-10 h-10" />
                  </button>

                  <div className="flex-1 px-3">
                     <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-[#111827]">
                           Update Move-In Date
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Property Card */}
         <div className="max-w-md mx-auto px-4 py-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="relative h-40">
                  <img
                     src={bookingDetails.propertyImage}
                     alt={bookingDetails.propertyName}
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Property Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-sm bg-white/10 rounded-xl p-3">
                     <div className="flex items-center justify-between">
                        <div className="flex-1">
                           <h3 className="text-white font-semibold text-base mb-1">
                              {bookingDetails.propertyName}
                           </h3>
                           <div className="flex items-center gap-1">
                              <svg
                                 className="w-3 h-3 text-white"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                              <span className="text-white text-xs opacity-90">
                                 Gurugram
                              </span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-white font-semibold text-base">
                              ₹{bookingDetails.monthlyRent.toLocaleString()}
                           </div>
                           <div className="text-white text-xs opacity-90">
                              per month
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-md mx-auto px-4 pb-20">
            <div className="space-y-6">
               {/* Header Text */}
               <div className="text-center space-y-1">
                  <h1 className="text-lg font-semibold text-gray-900">
                     When would you like to move in?
                  </h1>
                  <p className="text-sm text-gray-500">
                     Choose your preferred move-in date
                  </p>
                  <p className="text-sm text-blue-600">
                     Current date:{" "}
                     {formatDate(new Date(bookingDetails.moveInDate))}
                  </p>
               </div>

               {/* Calendar */}
               <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <Calendar
                     selectionMode="range"
                     selectedDateRange={selectedDateRange}
                     onDateRangeSelect={handleDateRangeSelect}
                     displayDate={new Date(2025, 7, 1)} // August 2025
                     isDateAvailable={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date >= today;
                     }}
                     className="w-full"
                  />
               </div>

               {/* Duration Options */}
               <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                     Or choose duration
                  </h4>
                  <div className="flex flex-wrap gap-3">
                     {["1 day", "1 week", "1 month", "3 months"].map(
                        (duration) => (
                           <button
                              key={duration}
                              onClick={() => handleDurationSelect(duration)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                 selectedDuration === duration
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                              }`}
                           >
                              {duration}
                           </button>
                        )
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Action Button */}
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="max-w-md mx-auto">
               <button
                  onClick={handleContinue}
                  disabled={isContinueDisabled}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-colors ${
                     isContinueDisabled
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
               >
                  Continue
               </button>
            </div>
         </div>
      </div>
   );
};

export default UpdateMoveInPage;
