import React from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  minHeight?: string;
}

const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  minHeight = "55vh",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50  flex items-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className={`relative w-full bg-white rounded-t-3xl max-h-[95vh] flex flex-col ${className}`}
            style={{ minHeight }}
          >
            {/* Header - only render if title is provided */}
            {title && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`bg-white border-b border-gray-100 sticky top-0 z-10 rounded-t-3xl ${headerClassName}`}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 w-full justify-between">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="font-semibold text-xl text-gray-900"
                    >
                      {title}
                    </motion.h2>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <IoClose className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Close button for when there's no title */}
            {!title && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute top-4 right-4 z-20"
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <IoClose className="w-5 h-5 text-gray-600" />
                </motion.button>
              </motion.div>
            )}

            {/* Body Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: title ? 0.4 : 0.2, duration: 0.3 }}
              className={`flex-1 overflow-y-auto ${title ? '' : 'pt-4'} ${bodyClassName}`}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BaseBottomSheet; 