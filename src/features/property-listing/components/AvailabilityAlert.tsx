import React from 'react';

interface AvailabilityAlertProps {
  availableUnits: number;
  totalUnits: number;
}

export const AvailabilityAlert: React.FC<AvailabilityAlertProps> = ({ 
  availableUnits, 
  totalUnits 
}) => {
  return (
    <div className="bg-[#ecf5ff] border border-[#bedbff] rounded-[14px] p-[15px] flex flex-col gap-[7px]">
      {/* Header with indicator */}
      <div className="flex items-center gap-[7px]">
        <div className="w-[7px] h-[7px] bg-[#155dfc] rounded-full" />
        <span className="text-[#1447e6] text-[14px] font-medium leading-[21px]">
          Limited Availability
        </span>
      </div>
      
      {/* Description */}
      <div className="w-full">
        <p className="text-[#1447e6] text-[12.3px] font-normal leading-[17.5px]">
          {availableUnits} out of {totalUnits} units currently available. Book now to secure your spot!
        </p>
      </div>
    </div>
  );
}; 