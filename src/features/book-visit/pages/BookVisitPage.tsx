import React from "react";
import BookVisitForm from "../components/BookVisitForm";
import { useNavigate, useLocation } from "react-router";
import default_back from "@/assets/default_back.svg";

interface BookVisitPageProps {
   onSuccess: (bookingDetails: {
      property: string;
      visitType: string;
      date: string;
      time: string;
   }) => void;
}

const BookVisitPage: React.FC<BookVisitPageProps> = ({ onSuccess }) => {
   const navigate = useNavigate();
   const location = useLocation();
   
   // Extract edit mode data from navigation state
   const editMode = location.state?.editMode || false;
   const bookingData = location.state?.bookingData;
   const originalVisitData = location.state?.originalVisitData;
   
   return (
      <div className="min-h-screen bg-white w-screen">
         {/* Header */}
         <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
            <div className="flex items-center gap-4 p-4 sm:p-5 lg:p-6">
               <button
                  onClick={() => navigate(editMode ? "/my-bookings" : "/property-listing")}
               >
                  <img src={default_back} alt="back" className="w-10 h-10" />
               </button>
               <div className="flex flex-col gap-1">
                  <h1 className="text-lg sm:text-xl lg:text-[21px] font-semibold text-[#101828] leading-tight sm:leading-[28px]">
                     {editMode ? "Edit Booking" : "Book a Visit"}
                  </h1>
                  <p className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                     {bookingData?.propertyName || "Nirvana Rooms"}
                  </p>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-7 pb-20 sm:pb-24 w-full overflow-hidden max-w-4xl mx-auto">
            <BookVisitForm 
               onSuccess={onSuccess} 
               editMode={editMode}
               existingBookingData={originalVisitData}
            />
         </div>
      </div>
   );
};

export default BookVisitPage;
