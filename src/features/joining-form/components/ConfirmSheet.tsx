import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import BaseBottomSheet from '../../../components/BaseBottomSheet';

interface ConfirmSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  phoneNumber?: string;
}

const ConfirmSheet: React.FC<ConfirmSheetProps> = ({
  isOpen,
  onClose,
  onConfirm,
  phoneNumber = '8989898989'
}) => {
  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Already living here?"
      className="max-h-[95vh]"
    >
      <div className="flex flex-col gap-8 p-6">
        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col gap-4 items-center">
            {/* Icon */}
            <div className="bg-blue-100 rounded-xl w-14 h-14 flex items-center justify-center">
              <div className="w-7 h-7 text-blue-600">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="text-center space-y-3">
              <h3 className="font-bold text-gray-900 text-base">
                Join Nirvana Rooms
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{phoneNumber}</span>
                  <span className="text-gray-600"> isn't linked to Nirvana Rooms yet.</span>
                </p>
                <p className="text-sm text-gray-600">
                  No worries—we'll help you get set up in just a few steps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            className="bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <span className="text-sm">Submit my details</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </button>
          
          {/* Security Note */}
          <div className="flex justify-center">
            <div className="bg-green-50 flex items-center gap-3 px-4 py-3 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-gray-600 text-xs">
                Your information is secure and will never be shared
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default ConfirmSheet; 