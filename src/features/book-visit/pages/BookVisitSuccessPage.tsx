import React from "react";
import successIcon from "../../../assets/persona/success.svg";
import roomReserve from "@/assets/room_reserve.svg";
import calendar from "@/assets/property/calendar_blue.svg";
import confirmed from "@/assets/property/confirmed.svg";
import { GoArrowRight } from "react-icons/go";
import mail from "@/assets/bookvisit/mail.svg";
import phone from "@/assets/bookvisit/phone.svg";
import location from "@/assets/bookvisit/location.svg";
import mail_outline from "@/assets/bookvisit/mail_outline.svg";
import phone_outline from "@/assets/bookvisit/phone_outline.svg";
import default_back from "@/assets/default_back.svg";

interface BookVisitSuccessPageProps {
   bookingDetails: {
      property: string;
      visitType: string;
      date: string;
      time: string;
   };
   onDone: () => void;
}

const BookVisitSuccessPage: React.FC<BookVisitSuccessPageProps> = ({
   bookingDetails,
   onDone,
}) => {
   return (
      <div className="min-h-screen bg-white w-screen pb-20">
         {/* Header */}
         <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
            <div className="flex items-center gap-4 p-4 sm:p-5 lg:p-6">
               <button
                  onClick={onDone}
               >
                  <img src={default_back} alt="back" className="w-10 h-10" />
               </button>
               <div className="flex flex-col gap-1">
                  <h1 className="text-lg sm:text-xl lg:text-[21px] font-semibold text-[#101828] leading-tight sm:leading-[28px]">
                     Visit Booked!
                  </h1>
                  <p className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                     {bookingDetails.property}
                  </p>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-7 pb-20 sm:pb-24 w-full overflow-hidden max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 sm:gap-7">
               {/* Success Icon and Message */}
               <div className="flex flex-col items-center gap-4 sm:gap-5">
                  <img
                     src={successIcon}
                     alt="Success"
                     className="w-16 h-16 sm:w-[35px] sm:h-[35px]"
                     style={{ objectFit: "contain" }}
                  />
                  <div className="text-center">
                     <h2 className="text-lg sm:text-xl lg:text-[21px] font-semibold text-[#101828] leading-tight sm:leading-[28px] mb-2">
                        🎉 Visit Booked Successfully!
                     </h2>
                     <p className="text-sm sm:text-[15.8px] text-[#4a5565] leading-tight sm:leading-[25.59px]">
                        Your visit has been confirmed for{" "}
                        {bookingDetails.property}.
                     </p>
                  </div>
               </div>

               {/* Property Card */}
               <div className="bg-white rounded-[21px] border border-gray-100 shadow-sm overflow-hidden">
                  <div
                     className="relative h-32 sm:h-[156px]"
                     style={{
                        backgroundImage: `url(${roomReserve})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                     }}
                  >
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                     <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-[14px] p-3">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-white rounded-full" />
                              <div>
                                 <p className="text-white font-medium text-sm sm:text-[15.8px] leading-tight sm:leading-[24.5px]">
                                    Premium Private Room
                                 </p>
                                 <p className="text-white/90 text-xs sm:text-[12.3px] leading-tight sm:leading-[17.5px]">
                                    Gurugram
                                 </p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-white font-medium text-sm sm:text-[15.8px] leading-tight sm:leading-[24.5px]">
                                 ₹8,000
                              </p>
                              <p className="text-white/90 text-xs sm:text-[12.3px] leading-tight sm:leading-[17.5px]">
                                 per month
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Booking Details */}
               <div className="bg-gray-50 rounded-[14px] p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                     <img
                        src={calendar}
                        alt="calendar"
                        className="w-4 h-4 sm:w-[17.5px] sm:h-[17.5px]"
                     />
                     <h3 className="text-sm sm:text-[14px] font-semibold text-[#101828] leading-tight sm:leading-[21px]">
                        Booking Details
                     </h3>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                           Property:
                        </span>
                        <span className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                           {bookingDetails.property}
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                           Visit Type:
                        </span>
                        <span className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                           {bookingDetails.visitType}
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                           Date:
                        </span>
                        <span className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                           {bookingDetails.date}
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                           Time:
                        </span>
                        <span className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                           {bookingDetails.time}
                        </span>
                     </div>
                     <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
                           Status:
                        </span>
                        <div className="flex items-center gap-1">
                           <img
                              src={confirmed}
                              alt="confirmed"
                              className="w-4 h-4 sm:w-[17.5px] sm:h-[17.5px]"
                           />
                           <span className="text-sm sm:text-[14px] font-medium text-green-600 leading-tight sm:leading-[21px]">
                              Confirmed
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* What's Next */}
               <div className="bg-blue-50 rounded-[14px] p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                     <GoArrowRight className="text-blue-600 text-lg" />
                     <h3 className="text-sm sm:text-[14px] font-semibold text-[#101828] leading-tight sm:leading-[21px]">
                        What's Next
                     </h3>
                  </div>
                  <div className="space-y-3">
                     <div className="flex gap-2.5">
                        <img
                           src={mail}
                           alt="mail"
                           className="w-8 h-8 sm:w-[17.5px] sm:h-[17.5px]"
                        />
                        <div className="flex flex-col gap-1">
                           <p className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                              Confirmation email sent
                           </p>
                           <p className="text-xs sm:text-[12.3px] text-[#4a5565] leading-tight sm:leading-[17.5px]">
                              Check your inbox for visit details
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-2.5">
                        <img
                           src={phone}
                           alt="phone"
                           className="w-8 h-8 sm:w-[17.5px] sm:h-[17.5px]"
                        />
                        <div className="flex flex-col gap-1">
                           <p className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                              WhatsApp reminder
                           </p>
                           <p className="text-xs sm:text-[12.3px] text-[#4a5565] leading-tight sm:leading-[17.5px]">
                              2 hours before your visit
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-2.5">
                        <img
                           src={location}
                           alt="location"
                           className="w-8 h-8 sm:w-[17.5px] sm:h-[17.5px]"
                        />
                        <div className="flex flex-col gap-1">
                           <p className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                              Meet at main entrance
                           </p>
                           <p className="text-xs sm:text-[12.3px] text-[#4a5565] leading-tight sm:leading-[17.5px]">
                              Property manager will guide you
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Contact Information */}
               <div className="bg-gray-50 rounded-[14px] p-4 sm:p-5">
                  <h3 className="text-sm sm:text-[14px] font-semibold text-[#101828] leading-tight sm:leading-[21px] mb-4">
                     Need to reschedule?
                  </h3>
                  <div className="space-y-3">
                     <div className="bg-white rounded-[12.75px] p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                           <img
                              src={phone_outline}
                              alt="phone"
                              className="w-4 h-4 sm:w-[17.5px] sm:h-[17.5px]"
                           />
                           <span className="text-sm sm:text-[14px] text-[#101828] leading-tight sm:leading-[21px]">
                              Call us
                           </span>
                        </div>
                        <span className="text-sm sm:text-[14px] font-medium text-blue-600 leading-tight sm:leading-[21px]">
                           +91 98765-43210
                        </span>
                     </div>
                     <div className="bg-white rounded-[12.75px] p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                           <img
                              src={phone_outline}
                              alt="phone"
                              className="w-4 h-4 sm:w-[17.5px] sm:h-[17.5px]"
                           />
                           <span className="text-sm sm:text-[14px] text-[#101828] leading-tight sm:leading-[21px]">
                              WhatsApp
                           </span>
                        </div>
                        <span className="text-sm sm:text-[14px] font-medium text-blue-600 leading-tight sm:leading-[21px]">
                           +91 98765-43211
                        </span>
                     </div>
                     <div className="bg-white rounded-[12.75px] p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                           <img
                              src={mail_outline}
                              alt="mail"
                              className="w-4 h-4 sm:w-[17.5px] sm:h-[17.5px]"
                           />
                           <span className="text-sm sm:text-[14px] text-[#101828] leading-tight sm:leading-[21px]">
                              Email
                           </span>
                        </div>
                        <span className="text-sm sm:text-[14px] font-medium text-blue-600 leading-tight sm:leading-[21px]">
                           visits@nirvanarooms.com
                        </span>
                     </div>
                  </div>
               </div>

               {/* Visit Tips */}
               <div className="bg-gray-100 rounded-[14px] p-4 sm:p-5">
                  <h3 className="text-sm sm:text-[14px] font-semibold text-[#101828] leading-tight sm:leading-[21px] mb-4">
                     💡 Visit Tips
                  </h3>
                  <div className="space-y-2.5">
                     <div className="flex gap-2.5">
                        <div className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-xs sm:text-[12.3px] text-[#364153] leading-tight sm:leading-[17.5px]">
                           Arrive 10 minutes early for a smooth check-in
                        </p>
                     </div>
                     <div className="flex gap-2.5">
                        <div className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-xs sm:text-[12.3px] text-[#364153] leading-tight sm:leading-[17.5px]">
                           Bring a list of questions about the property
                        </p>
                     </div>
                     <div className="flex gap-2.5">
                        <div className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-xs sm:text-[12.3px] text-[#364153] leading-tight sm:leading-[17.5px]">
                           Ask about current offers and promotions
                        </p>
                     </div>
                     <div className="flex gap-2.5">
                        <div className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                        <p className="text-xs sm:text-[12.3px] text-[#364153] leading-tight sm:leading-[17.5px]">
                           Explore all community areas and amenities
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Fixed Bottom Section */}
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-5 lg:p-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-3.5">
               <div className="text-center">
                  <p className="text-sm sm:text-[14px] font-medium text-[#101828] leading-tight sm:leading-[21px]">
                     🏠 We're excited to show you around!
                  </p>
                  <p className="text-xs sm:text-[12.3px] text-[#4a5565] leading-tight sm:leading-[17.5px]">
                     See you soon at {bookingDetails.property}!
                  </p>
               </div>
               <button
                  onClick={onDone}
                  className="w-full py-3 sm:py-3.5 px-0 bg-[#101828] text-white rounded-[14px] text-sm sm:text-[14px] font-semibold leading-tight sm:leading-[21px] transition-all duration-200 hover:bg-[#1a1f2e]"
               >
                  Done
               </button>
               <p className="text-center text-xs sm:text-[12.3px] text-[#4a5565] leading-tight sm:leading-[17.5px]">
                  ✨ Thank you for choosing us!
               </p>
            </div>
         </div>
      </div>
   );
};

export default BookVisitSuccessPage;
