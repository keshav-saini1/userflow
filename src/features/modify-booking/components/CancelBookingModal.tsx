import React from "react";
import { FiX, FiArrowRight } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

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
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Backdrop */}
               <motion.div
                  className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
               />

               {/* Modal/Bottom Sheet */}
               <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-center">
                  <motion.div 
                     className="bg-white rounded-t-[21px] lg:rounded-[21px] w-full max-w-sm lg:max-w-md mx-auto max-h-[90vh] lg:max-h-[500px] flex flex-col"
                     initial={{ 
                        y: "100%",
                        opacity: 0,
                        scale: 0.9
                     }}
                     animate={{ 
                        y: 0,
                        opacity: 1,
                        scale: 1
                     }}
                     exit={{ 
                        y: "100%",
                        opacity: 0,
                        scale: 0.9
                     }}
                     transition={{ 
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        duration: 0.3
                     }}
                  >
               {/* Header */}
               <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900 text-base">
                     Confirm the action
                  </h2>
                  <button
                     onClick={onClose}
                     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                     <FiX className="w-4 h-4 text-gray-600" />
                  </button>
               </div>

               {/* Content */}
               <div className="flex-1 p-5 overflow-auto">
                  <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
                     {/* Icon */}
                     <motion.div 
                        className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                           delay: 0.2,
                           type: "spring",
                           stiffness: 200
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
                           We've saved your spot and everything's ready! Let us
                           know if there's an issue — maybe we can fix it
                           instead?
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
               </div>
                  </motion.div>
               </div>
            </>
         )}
      </AnimatePresence>
   );
};

export default CancelBookingModal;
