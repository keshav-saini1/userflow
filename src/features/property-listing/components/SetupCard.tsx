import React from 'react';

interface SetupCardProps {
  onSetupClick?: () => void;
}

export const SetupCard: React.FC<SetupCardProps> = ({ onSetupClick }) => {
  return (
    <div className="bg-white rounded-[21px] border border-gray-200 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] p-px overflow-hidden">
      <div className="p-[21px] flex flex-col gap-7">
        {/* Content */}
        <div className="flex gap-2">
          {/* Icon */}
          <div className="w-[35px] h-[35px] flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 35 35" fill="none">
              <circle cx="17.5" cy="17.5" r="17.5" fill="#f3f4f6"/>
              <path 
                d="M17.5 8.75L21.25 15.75L28.75 16.25L23.125 21.25L24.375 28.75L17.5 25L10.625 28.75L11.875 21.25L6.25 16.25L13.75 15.75L17.5 8.75Z" 
                fill="#4a5565"
              />
            </svg>
          </div>
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-[21px]">
            <div className="flex flex-col gap-[3.5px]">
              <p className="text-[#101828] text-[15.8px] font-semibold leading-[24.5px]">
                Let's Find Your Perfect Spot
              </p>
              <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px] w-[303px]">
                Add your preferences to see the most relevant rooms for you.
              </p>
            </div>
          </div>
        </div>

        {/* Setup Button */}
        <button 
          onClick={onSetupClick}
          className="bg-[#101828] rounded-[14px] h-[46px] px-0 py-3.5 flex items-center justify-center w-full"
        >
          <span className="text-white text-[14px] font-semibold leading-[21px]">
            Setup Now
          </span>
        </button>
      </div>
    </div>
  );
}; 