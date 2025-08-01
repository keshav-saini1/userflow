import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "motion/react";
import BaseBottomSheet from "../../../components/BaseBottomSheet";

interface CancelBookingModalProps {
   isOpen: boolean;
   onClose: () => void;
   onKeepBooking: () => void;
   onConfirmCancellation: () => void;
}

const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
   isOpen,
   onClose,
   onKeepBooking,
   onConfirmCancellation,
}) => {
   return (
      <BaseBottomSheet
         isOpen={isOpen}
         onClose={onClose}
         title="Confirm the action"
         className=" lg:max-w-md mx-auto"
      >
         <div className="flex flex-col items-center gap-4 max-w-sm mx-auto p-5">
            {/* Icon */}
            <motion.div
               className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center"
               initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
               }}
            >
               <div className="w-10 h-10 flex items-center justify-center">
                  <IoCloseSharp className="w-8 h-8 text-red-500" />
               </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
               className="text-center space-y-2"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.3 }}
            >
               <h3 className="font-semibold text-gray-900 text-lg">
                  Sure you want to cancel?
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                  We've saved your spot and everything's ready! Let us know if
                  there's an issue — maybe we can fix it instead?
               </p>
            </motion.div>

            {/* Keep Booking Button */}
            <motion.div
               className="w-full pt-6"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.3 }}
            >
               <motion.button
                  onClick={onKeepBooking}
                  className="w-full bg-gray-900 text-white font-medium py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
               >
                  Keep my booking
               </motion.button>
            </motion.div>

            {/* Cancel Option */}
            <motion.div
               className="pt-4"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.3 }}
            >
               <motion.button
                  onClick={onConfirmCancellation}
                  className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
               >
                  <span>Go Ahead with Cancellation</span>
                  <FiArrowRight className="w-4 h-4" />
               </motion.button>
            </motion.div>
         </div>
      </BaseBottomSheet>
   );
};

export default CancelBookingModal;
