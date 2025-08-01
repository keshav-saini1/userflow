import React from 'react';
import search from '@/assets/property/search.svg';
import calendar from '@/assets/property/calendar.svg';
import filter from '@/assets/filter.svg';

interface SetupCardProps {
  onSetupClick?: () => void;
  onSearchClick?: () => void;
}

export const SetupCard: React.FC<SetupCardProps> = ({ onSetupClick, onSearchClick }) => {
  return (
    <div className="bg-white rounded-[21px] border border-gray-200 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] p-px overflow-hidden">
      <div className="p-[21px] flex flex-col gap-7">
        {/* Content */}
        <div className="flex gap-2">
          {/* Icon */}
          <img src={search} alt="search" className="w-[35px] h-[35px]" />
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-[21px]">
            <div className="flex flex-col gap-[3.5px]">
              <p className="text-[#101828] text-lg font-semibold leading-[24.5px]">
                Let's Find Your Perfect Spot
              </p>
              <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px] w-[303px]">
                Add your preferences to see the most relevant rooms for you.
              </p>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex gap-[10.5px] h-12 w-[340px]">
          {/* Search Button */}
          <button 
            onClick={onSearchClick}
            className="flex-1 bg-white rounded-[14px] h-12 px-[22px] py-[15px] flex items-center gap-2 border border-gray-200 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
          >
            <div className="w-[18px] h-[18px]">
              {/* Frame icon placeholder - you may need to add the actual icon */}
              <img src={calendar} alt="calendar" className="w-full h-full" /> 
            </div>
            <input
              type="text"
              placeholder="Search your rental options"
              className="flex-1 bg-transparent outline-none text-[#101828] text-[12px] font-medium leading-[17.5px] placeholder-[#b0b7c3]"
              style={{ minWidth: 0 }}
            />
          </button>

          {/* Setup Button */}
          <button 
            onClick={onSetupClick}
            className="bg-[#101828] rounded-[14px] w-12 h-12 flex items-center justify-center"
          >
            <div className="w-[17.5px] h-[17.5px]">
              {/* Setup icon placeholder - you may need to add the actual icon */}
              <img src={filter} alt="filter" className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}; 