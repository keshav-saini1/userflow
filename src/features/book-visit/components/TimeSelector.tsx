import React from 'react';
import type { TimeSection } from '../types';

interface TimeSelectorProps {
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  onTimeSelect
}) => {
  const timeSections: TimeSection[] = [
    {
      title: 'Morning',
      emoji: '🌅',
      slots: [
        { id: '9:00-am', time: '9:00 AM', available: true },
        { id: '9:30-am', time: '9:30 AM', available: false },
        { id: '10:00-am', time: '10:00 AM', available: false },
        { id: '10:30-am', time: '10:30 AM', available: true },
        { id: '11:00-am', time: '11:00 AM', available: true },
        { id: '11:30-am', time: '11:30 AM', available: false }
      ]
    },
    {
      title: 'Afternoon',
      emoji: '☀️',
      slots: [
        { id: '2:00-pm', time: '2:00 PM', available: true },
        { id: '2:30-pm', time: '2:30 PM', available: true },
        { id: '3:00-pm', time: '3:00 PM', available: true },
        { id: '3:30-pm', time: '3:30 PM', available: false },
        { id: '4:00-pm', time: '4:00 PM', available: true },
        { id: '4:30-pm', time: '4:30 PM', available: true }
      ]
    },
    {
      title: 'Evening',
      emoji: '🌙',
      slots: [
        { id: '5:00-pm', time: '5:00 PM', available: true },
        { id: '5:30-pm', time: '5:30 PM', available: false },
        { id: '6:00-pm', time: '6:00 PM', available: true }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-base sm:text-[17.5px] font-semibold text-[#101828] leading-tight sm:leading-[24.5px]">
          Select a Time
        </h3>
        <p className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
          All times are in IST (Indian Standard Time)
        </p>
      </div>
      
      <div className="flex flex-col gap-6 sm:gap-7">
        {timeSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3 sm:gap-3.5">
            <h4 className="text-sm sm:text-[15.8px] font-medium text-[#1e2939] leading-tight sm:leading-[24.5px] capitalize">
              {section.emoji} {section.title}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
              {section.slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`px-3 sm:px-4 py-3 sm:py-4 rounded-[12.75px] border-2 transition-all duration-200 ${
                    selectedTime === slot.time
                      ? 'bg-gray-50 border-[#101828]'
                      : slot.available
                      ? 'bg-white border-gray-200 hover:border-gray-300'
                      : 'bg-gray-50 border-gray-100 opacity-50'
                  }`}
                >
                  <div className={`text-sm sm:text-[14px] font-medium text-center leading-tight sm:leading-[21px] ${
                    slot.available ? 'text-[#101828]' : 'text-[#99a1af]'
                  }`}>
                    {slot.time}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector; 