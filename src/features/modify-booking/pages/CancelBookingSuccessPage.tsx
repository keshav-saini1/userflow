import React from "react";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import cancel_booking from "@/assets/bookvisit/booking_cancel.svg";
import default_back from "@/assets/default_back.svg";

interface CancelBookingSuccessPageProps {
   onDone?: () => void;
   onViewBookings?: () => void;
}

const CancelBookingSuccessPage: React.FC<CancelBookingSuccessPageProps> = ({
   onDone,
   onViewBookings,
}) => {
   const username = localStorage.getItem("username") || "User";
   return (
      <div className="bg-[#121212] relative min-h-screen w-full">
         <div className="bg-gray-50 relative min-h-screen w-full">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
               <div className="p-[14px]">
                  <div className="flex items-center gap-3.5">
                     <button
                        onClick={onDone}
                        className="bg-gray-100 rounded-[14px] size-[35px] flex items-center justify-center hover:bg-gray-200 transition-colors"
                     >
                        <img src={default_back} alt="back" className="w-10 h-10" />
                     </button>
                     <div className="flex-1">
                        <h1 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                           Booking Cancelled
                        </h1>
                        <p className="text-[#4a5565] text-[12.3px] leading-[17.5px]">
                           Your booking has been successfully cancelled
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="px-[14px] py-[21px]">
               <div className="max-w-[384px] mx-auto">
                  {/* Success Card */}
                  <motion.div
                     className="bg-white rounded-[21px] shadow-sm p-[28px] text-center"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     {/* Success Icon */}
                     <motion.div
                        className="flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                           delay: 0.2,
                           type: "spring",
                           stiffness: 200,
                        }}
                     >
                        <img
                           src={cancel_booking}
                           alt="cancel_booking"
                           className="w-20 h-20"
                        />
                     </motion.div>

                     {/* Success Message */}
                     <motion.div
                        className="space-y-2 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                     >
                        <h2 className="text-[#101828] text-[18px] font-semibold leading-[24px]">
                           Booking Cancelled!
                        </h2>
                        <p className="text-[#717182] text-[13px] leading-[18px]">
                           Your booking has been cancelled, {username}.
                        </p>
                     </motion.div>

                     {/* Booking Details */}
                     <motion.div
                        className="bg-gray-50 rounded-[12px] p-4 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                     >
                        <div className="space-y-2.5">
                           <div className="flex justify-between items-center">
                              <span className="text-[#717182] text-[11px] font-medium">
                                 Booking ID
                              </span>
                              <span className="text-[#101828] text-[11px] font-semibold">
                                 #BK123456
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[#717182] text-[11px] font-medium">
                                 Cancelled On
                              </span>
                              <span className="text-[#101828] text-[11px] font-semibold">
                                 Today, 2:30 PM
                              </span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[#717182] text-[11px] font-medium">
                                 Refund Status
                              </span>
                              <span className="text-green-600 text-[11px] font-semibold">
                                 Processing
                              </span>
                           </div>
                        </div>
                     </motion.div>

                     {/* Action Buttons */}
                     <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                     >
                        <button
                           onClick={onViewBookings}
                           className="w-full bg-[#155dfc] text-white text-[13px] font-semibold leading-[18px] py-3 px-4 rounded-[12px] hover:bg-[#0f4cd1] transition-colors flex items-center justify-center gap-2"
                        >
                           <span>View My Bookings</span>
                           <FiArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                           onClick={onDone}
                           className="w-full bg-gray-100 text-[#101828] text-[13px] font-semibold leading-[18px] py-3 px-4 rounded-[12px] hover:bg-gray-200 transition-colors"
                        >
                           Done
                        </button>
                     </motion.div>
                  </motion.div>

                  {/* Additional Information */}
                  <motion.div
                     className="bg-blue-50 rounded-[12px] p-4 mt-4"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1, duration: 0.5 }}
                  >
                     <div className="flex items-start gap-3">
                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                           <svg
                              className="w-2.5 h-2.5 text-blue-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                           </svg>
                        </div>
                        <div>
                           <h4 className="text-[#101828] text-[11px] font-semibold leading-[16px] mb-1">
                              What happens next?
                           </h4>
                           <p className="text-[#717182] text-[10px] leading-[14px]">
                              You'll receive a refund within 5-7 business days.
                              Check your email for detailed cancellation
                              confirmation.
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CancelBookingSuccessPage;
