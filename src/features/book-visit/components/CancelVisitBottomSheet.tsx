import React, { useState } from "react";
import BaseBottomSheet from "@/components/BaseBottomSheet";
import { useBookVisitApi } from "@/features/book-visit/api/useBookVisitApi";
import { IoWarningOutline } from "react-icons/io5";
import { motion } from "motion/react";

interface CancelVisitBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (reason?: string) => void;
  visitId: string;
  visitDetails?: {
    propertyName: string;
    scheduledDate: string;
    scheduledTime: string;
    bookingType: string;
  };
}

const CancelVisitBottomSheet: React.FC<CancelVisitBottomSheetProps> = ({
  isOpen,
  onClose,
  onConfirmCancel,
  visitId,
  visitDetails,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);

  // API hook for canceling visit
  const { cancelVisit, isCancelingVisit, cancelVisitError } = useBookVisitApi();

  const cancelReasons = [
    "Schedule conflict",
    "Found another property",
    "Changed my mind",
    "Emergency came up",
    "Property no longer available",
    "Other"
  ];

  const handleConfirmCancel = async () => {
    setIsConfirming(true);
    const reason = selectedReason === "Other" ? customReason : selectedReason || "No reason provided";
    
    try {
      // Call the API to cancel the visit
      await cancelVisit({
        visitId,
        payload: { cancel_reason: reason }
      });
      
      // Call the parent callback
      await onConfirmCancel(reason);
      
      // Reset form
      setSelectedReason("");
      setCustomReason("");
      onClose();
    } catch (error) {
      console.error("Failed to cancel visit:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  const getVisitTypeText = (type: string) => {
    switch (type) {
      case "visit":
        return "Property Visit";
      case "live-tour":
        return "Live Tour";
      case "call":
        return "Phone Call";
      default:
        return "Visit";
    }
  };

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Visit"
      bodyClassName="p-6"
    >
      <div className="space-y-6">
        {/* Warning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <IoWarningOutline className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Are you sure you want to cancel?
              </h3>
              <p className="text-sm text-red-700">
                This action cannot be undone. You'll need to reschedule if you change your mind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visit Details */}
        {visitDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <h4 className="font-semibold text-gray-900 mb-3">Visit Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Property:</span>
                <span className="font-medium text-gray-900">{visitDetails.propertyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium text-gray-900">{getVisitTypeText(visitDetails.bookingType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">{visitDetails.scheduledDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium text-gray-900">{visitDetails.scheduledTime}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cancellation Reason */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h4 className="font-semibold text-gray-900">
            Why are you canceling? <span className="text-gray-500 font-normal">(Optional)</span>
          </h4>
          
          <div className="space-y-3">
            {cancelReasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="cancelReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-900">{reason}</span>
              </label>
            ))}
          </div>

          {/* Custom Reason Input */}
          {selectedReason === "Other" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please specify your reason..."
                className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Error Message */}
        {cancelVisitError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-3"
          >
            <p className="text-sm text-red-700">
              Failed to cancel visit. Please try again.
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 pt-4"
        >
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            disabled={isConfirming}
          >
            Keep Visit
          </button>
          <button
            onClick={handleConfirmCancel}
            disabled={isConfirming || isCancelingVisit}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isConfirming || isCancelingVisit) ? "Canceling..." : "Cancel Visit"}
          </button>
        </motion.div>
      </div>
    </BaseBottomSheet>
  );
};

export default CancelVisitBottomSheet;
