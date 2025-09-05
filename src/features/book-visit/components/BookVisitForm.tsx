import React, { useEffect, useState } from "react";
import type {
   BookVisitFormData as BookVisitFormType,
   VisitType,
} from "../types";
import VisitTypeSelector from "./VisitTypeSelector";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { useParams } from "react-router";
import { useBookVisitApi } from "../api/useBookVisitApi";
import { showToast } from "@/components/CustomToast";

interface BookVisitFormProps {
   onSuccess: (bookingDetails: {
      property: string;
      visitType: string;
      date: string;
      time: string;
   }) => void;
   editMode?: boolean;
   existingBookingData?: any;
}

const BookVisitForm: React.FC<BookVisitFormProps> = ({ onSuccess, editMode = false, existingBookingData }) => {
   // Initialize form data with existing booking data if in edit mode
   const [formData, setFormData] = useState<BookVisitFormType>(() => {
      if (editMode && existingBookingData) {
         return {
            visitType: existingBookingData.visit_type || null,
            selectedDate: existingBookingData.visit_date ? new Date(existingBookingData.visit_date) : null,
            selectedTime: existingBookingData.visit_time || null,
         };
      }
      return {
         visitType: null,
         selectedDate: null,
         selectedTime: null,
      };
   });
   const params = useParams();
   console.log({ existingBookingData })

   const propertyId = localStorage.getItem('selectedPropertyId');
   const { 
      createVisit, 
      createVisitData, 
      createVisitError,
      updateVisit,
      updateVisitData,
      updateVisitError,
      isUpdatingVisit
   } = useBookVisitApi();


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

   const handleSubmit = async () => {
      if (isFormComplete && propertyId) {
         const roomId = params?.room_id;
         const body = {
            visit_type: formData.visitType!,
            visit_date: formData.selectedDate!.toISOString(),
            visit_time: formData.selectedTime!,
            property_id: propertyId,
            ...(roomId && { room_id: roomId }),
         };

         if (editMode && existingBookingData) {
            // Call update API with visit ID from existingBookingData
            try {
               await updateVisit({
                  visitId: existingBookingData.id,
                  payload: body
               });
            } catch (error) {
               console.error('Update visit error:', error);
            }
         } else {
            await createVisit(body);
         }
      }
   };

   useEffect(() => {
      if (createVisitData) {
         // Prepare booking details for success page
         const visitDate = createVisitData?.data?.visit_date;
         const bookingDate = visitDate ? new Date(visitDate) : null;
         const bookingDetails = {
            property: "Nirvana Rooms",
            visitType:
               createVisitData?.data?.visit_type === "live-video-tour"
                  ? "Live Video Tour"
                  : createVisitData?.data?.visit_type === "visit-property"
                     ? "Visit Property"
                     : "Phone Call",
            date: bookingDate ? bookingDate.toLocaleDateString("en-US", {
               weekday: "long",
               year: "numeric",
               month: "long",
               day: "numeric",
            })
               : "",
            time: createVisitData?.data?.visit_time || "",
         };

         // Navigate to success page
         onSuccess(bookingDetails);
         console.log("Create Visit Data:", createVisitData);
         // onSuccess(createVisitData);
      }
   }, [createVisitData]);

   useEffect(() => {
      if (createVisitError) {
         console.log({ createVisitError })
         showToast.error(
            "Booking Failed", 
            createVisitError?.response?.data?.message || "Error creating visit please try again"
         );
      }
   }, [createVisitError]);

   useEffect(() => {
      if (updateVisitData) {
         // Prepare booking details for success page
         const visitDate = updateVisitData?.data?.visit_date;
         const bookingDate = visitDate ? new Date(visitDate) : null;
         const bookingDetails = {
            property: "Nirvana Rooms",
            visitType:
               updateVisitData?.data?.visit_type === "live-video-tour"
                  ? "Live Video Tour"
                  : updateVisitData?.data?.visit_type === "visit-property"
                     ? "Visit Property"
                     : "Phone Call",
            date: bookingDate ? bookingDate.toLocaleDateString("en-US", {
               weekday: "long",
               year: "numeric",
               month: "long",
               day: "numeric",
            })
               : "",
            time: updateVisitData?.data?.visit_time || "",
         };

         // Navigate to success page
         onSuccess(bookingDetails);
         console.log("Update Visit Data:", updateVisitData);
      }
   }, [updateVisitData]);

   useEffect(() => {
      if (updateVisitError) {
         console.log({ updateVisitError })
         showToast.error(
            "Update Failed", 
            updateVisitError?.response?.data?.message || "Error updating visit please try again"
         );
      }
   }, [updateVisitError]);

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
               disabled={!isFormComplete || isUpdatingVisit}
               className={`w-full py-3 sm:py-3.5 px-0 rounded-[14px] text-sm sm:text-[14px] font-semibold leading-tight sm:leading-[21px] transition-all duration-200 ${isFormComplete && !isUpdatingVisit
                     ? "bg-[#101828] text-white hover:bg-[#1a1f2e]"
                     : "bg-gray-200 text-[#6a7282] cursor-not-allowed"
                  }`}
            >
               <span className="text-[14px] md:text-sm font-medium leading-tight sm:leading-[21px]">
                  {isUpdatingVisit ? "Updating..." : isFormComplete ? (editMode ? "Update Booking" : "Continue") : "Select time to continue"}
               </span>
            </button>
         </div>
      </div>
   );
};

export default BookVisitForm;
