import React from 'react';
import type { DateOption } from '../types';

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateSelect
}) => {
  // Generate dates for the next 7 days
  const generateDateOptions = (): DateOption[] => {
    const options: DateOption[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayName = dayNames[date.getDay()];
      const dayNumber = date.getDate();
      const month = monthNames[date.getMonth()];
      
      let label: string | undefined;
      if (i === 0) label = 'Today';
      else if (i === 1) label = 'Tomorrow';
      
      options.push({
        date,
        dayName,
        dayNumber,
        month,
        label,
        available: i < 6 // First 6 days are available
      });
    }
    
    return options;
  };

  const dateOptions = generateDateOptions();

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-base sm:text-[17.5px] font-semibold text-[#101828] leading-tight sm:leading-[24.5px]">
          Select a Date
        </h3>
        <p className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
          Choose when you'd like to visit
        </p>
      </div>
      
      <div className="h-[110px] sm:h-[130px] overflow-x-auto w-full">
        <div className="flex gap-3 sm:gap-3.5 min-w-max px-0">
          {dateOptions.map((option) => (
            <button
              key={option.date.toISOString()}
              onClick={() => option.available && onDateSelect(option.date)}
              disabled={!option.available}
              className={`flex flex-col gap-1 min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-[14px] border-2 transition-all duration-200 ${
                selectedDate && selectedDate.toDateString() === option.date.toDateString()
                  ? 'bg-gray-50 border-[#101828]'
                  : option.available
                  ? 'bg-white border-gray-200 hover:border-gray-300'
                  : 'bg-gray-50 border-gray-100 opacity-50'
              }`}
            >
              <div className={`text-xs sm:text-[12.3px] text-center leading-tight sm:leading-[17.5px] ${
                option.available ? 'text-[#6a7282]' : 'text-[#6a7282]'
              }`}>
                {option.dayName}
              </div>
              <div className={`text-lg sm:text-[21px] font-semibold text-center leading-tight sm:leading-[28px] ${
                option.available ? 'text-[#101828]' : 'text-[#99a1af]'
              }`}>
                {option.dayNumber}
              </div>
              <div className={`text-xs sm:text-[10.5px] text-center leading-tight sm:leading-[14px] ${
                option.available ? 'text-[#6a7282]' : 'text-[#6a7282]'
              }`}>
                {option.month}
              </div>
              {option.label && (
                <div className={`text-xs sm:text-[10.5px] font-medium text-center leading-tight sm:leading-[14px] ${
                  option.available ? 'text-[#364153]' : 'text-[#6a7282]'
                }`}>
                  {option.label}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateSelector; 