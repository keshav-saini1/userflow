import React, { useState } from "react";
import type {
   BookVisitFormData as BookVisitFormType,
   VisitType,
} from "../types";
import VisitTypeSelector from "./VisitTypeSelector";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";

interface BookVisitFormProps {
   onSuccess: (bookingDetails: {
      property: string;
      visitType: string;
      date: string;
      time: string;
   }) => void;
}

const BookVisitForm: React.FC<BookVisitFormProps> = ({ onSuccess }) => {
   const [formData, setFormData] = useState<BookVisitFormType>({
      visitType: null,
      selectedDate: null,
      selectedTime: null,
   });

   const handleVisitTypeSelect = (type: VisitType) => {
      setFormData((prev: BookVisitFormType) => ({
         ...prev,
         visitType: type,
         // Reset date and time when visit type changes
         selectedDate: null,
         selectedTime: null,
      }));
   };

   const handleDateSelect = (date: Date) => {
      setFormData((prev: BookVisitFormType) => ({
         ...prev,
         selectedDate: date,
         // Reset time when date changes
         selectedTime: null,
      }));
   };

   const handleTimeSelect = (time: string) => {
      setFormData((prev: BookVisitFormType) => ({
         ...prev,
         selectedTime: time,
      }));
   };

   const isFormComplete =
      formData.visitType && formData.selectedDate && formData.selectedTime;

   const handleSubmit = () => {
      if (isFormComplete) {
         console.log("Form submitted:", formData);

         // Prepare booking details for success page
         const bookingDetails = {
            property: "Nirvana Rooms",
            visitType:
               formData.visitType === "live-video-tour"
                  ? "Live Video Tour"
                  : formData.visitType === "visit-property"
                  ? "Visit Property"
                  : "Phone Call",
            date: formData.selectedDate
               ? formData.selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                 })
               : "",
            time: formData.selectedTime || "",
         };

         // Navigate to success page
         onSuccess(bookingDetails);
      }
   };

   return (
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 w-full overflow-hidden pb-16">
         {/* Visit Type Selection - Always visible */}
         <VisitTypeSelector
            selectedType={formData.visitType}
            onTypeSelect={handleVisitTypeSelect}
         />

         {/* Date and Time sections - Only visible after visit type is selected */}
         <>
            <div className="h-px bg-gray-200 w-full" />

            <DateSelector
               selectedDate={formData.selectedDate}
               onDateSelect={handleDateSelect}
            />

            <>
               <div className="h-px bg-gray-200 w-full" />

               <TimeSelector
                  selectedTime={formData.selectedTime}
                  onTimeSelect={handleTimeSelect}
               />
            </>
         </>

         {/* Submit Button - Fixed at bottom */}
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-5 lg:p-6 max-w-4xl mx-auto">
            <button
               onClick={handleSubmit}
               disabled={!isFormComplete}
               className={`w-full py-3 sm:py-3.5 px-0 rounded-[14px] text-sm sm:text-[14px] font-semibold leading-tight sm:leading-[21px] transition-all duration-200 ${
                  isFormComplete
                     ? "bg-[#101828] text-white hover:bg-[#1a1f2e]"
                     : "bg-gray-200 text-[#6a7282] cursor-not-allowed"
               }`}
            >
               {isFormComplete ? "Continue" : "Select time to continue"}
            </button>
         </div>
      </div>
   );
};

export default BookVisitForm;
