import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import BaseBottomSheet from '../../../components/BaseBottomSheet';

interface TenantDetails {
  name: string;
  roomNumber: string;
  contactNumber: string;
}

interface TenantDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
  tenantDetails: TenantDetails;
}

const TenantDetailsSheet: React.FC<TenantDetailsSheetProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onReject,
  tenantDetails
}) => {
  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Tenant Details Found"
      className="max-h-[95vh]"
    >
      <div className="flex flex-col gap-6 p-6">
        {/* Main Content */}
        <div className="flex flex-col gap-5">
          {/* Question */}
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-gray-900 text-base">
              Are you the same tenant?
            </h3>
            <p className="text-gray-900 text-sm leading-relaxed">
              We found your details already added in the system. Please
              confirm if this is you.
            </p>
          </div>

          {/* Quick Check Card */}
          <div className="bg-gray-100/30 rounded-xl p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 text-sm">Quick check</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">Name:</span>
                  <span className="font-medium text-gray-900 text-xs">{tenantDetails.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">Room number:</span>
                  <span className="font-medium text-gray-900 text-xs">{tenantDetails.roomNumber}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">Contact number:</span>
                  <span className="font-medium text-gray-900 text-xs">{tenantDetails.contactNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="bg-gray-900 text-white font-semibold py-3.5 px-7 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <span className="text-sm">Yes, that's me</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onReject}
            className="text-gray-900 font-semibold text-sm hover:text-gray-700 transition-colors"
          >
            No, that's not me!
          </button>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default TenantDetailsSheet; 