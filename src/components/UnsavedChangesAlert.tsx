import React from "react";

interface UnsavedChangesAlertProps {
   isOpen: boolean;
   onProceed: () => void;
   onCancel: () => void;
   title?: string;
   message?: string;
   proceedText?: string;
   cancelText?: string;
}

const UnsavedChangesAlert: React.FC<UnsavedChangesAlertProps> = ({
   isOpen,
   onProceed,
   onCancel,
   title = "Unsaved Changes",
   message = "You have unsaved changes. Are you sure you want to leave? Your changes will be lost.",
   proceedText = "Leave Anyway",
   cancelText = "Stay",
}) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         {/* Backdrop */}
         <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onCancel}
         />
         
         {/* Modal */}
         <div className="relative bg-white rounded-[14px] shadow-lg max-w-md w-full mx-4 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="bg-orange-100 rounded-full p-2">
                     <svg
                        className="w-5 h-5 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                     </svg>
                  </div>
                  <h3 className="text-[#101828] text-lg font-semibold">
                     {title}
                  </h3>
               </div>
            </div>

            {/* Message */}
            <p className="text-[#717182] text-sm leading-6 mb-6">
               {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
               <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-3 text-[#101828] font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
               >
                  {cancelText}
               </button>
               <button
                  onClick={onProceed}
                  className="flex-1 px-4 py-3 text-white font-medium bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
               >
                  {proceedText}
               </button>
            </div>
         </div>
      </div>
   );
};

export default UnsavedChangesAlert; 