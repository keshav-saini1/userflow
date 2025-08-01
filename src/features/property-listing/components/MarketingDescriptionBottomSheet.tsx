import React from "react";
import { BaseBottomSheet } from "@/components";

interface MarketingDescriptionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarketingDescriptionBottomSheet: React.FC<MarketingDescriptionBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Marketing Description"
      className="bg-gray-50"
      bodyClassName="bg-gray-50"
    >
      <div className="flex flex-col h-full bg-gray-50">
        {/* Content Section */}
        <div className="px-6 py-6">
          <div className="space-y-6 text-[#2c3032] text-base leading-[1.5]">
            {/* Room Type Section */}
            <div>
              <p className="font-bold mb-2">
                Room Type
              </p>
              <p className="mb-4">
                This is a spacious double sharing room located in a corner unit, 
                featuring a master bedroom layout that offers privacy and comfort.
              </p>
            </div>

            {/* Ideal for Section */}
            <div>
              <p className="font-bold mb-2">
                Ideal for
              </p>
              <p className="mb-4">
                Perfectly suited for families and working professionals who seek a 
                blend of functionality and relaxation in their living space.
              </p>
            </div>

            {/* Key Features Section */}
            <div>
              <p className="font-bold mb-2">
                Key Features
              </p>
              <p className="mb-4">
                Enjoy a private balcony with a scenic view, abundant natural light 
                throughout the day, and the added advantage of a quiet corner location 
                for enhanced peace and privacy.
              </p>
            </div>

            {/* Additional Description */}
            <div>
              <p>
                This room is ready to move in, offering a seamless balance between 
                comfort and convenience — ideal for both everyday living and remote work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default MarketingDescriptionBottomSheet; 