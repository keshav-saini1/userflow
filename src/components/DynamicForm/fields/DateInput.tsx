import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DateInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  min?: string;
  max?: string;
  icon?: string | React.ComponentType;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  placeholder,
  error,
  disabled = false,
  value = '',
  onChange,
  onBlur,
  name,
  min,
  max,
  icon
}) => {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const renderIcon = () => {
    const iconClasses = "size-[22px] text-[#455067]";
    
    if (typeof icon === 'string') {
      // Handle string-based icons (legacy support)
      switch (icon) {
        case 'user':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          );
        case 'phone':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          );
        case 'mail':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          );
        case 'calendar':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          );
        case 'building':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          );
        default:
          return null;
      }
    } else if (typeof icon === 'function') {
      // Handle React component icons
      const IconComponent = icon;
      return <IconComponent />;
    }
    
    return null;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onChange?.(formattedDate);
    } else {
      onChange?.('');
    }
  };

  // Convert min/max string dates to Date objects for calendar
  const minDate = min ? new Date(min) : undefined;
  const maxDate = max ? new Date(max) : undefined;

  return (
    <div className="py-3.5 px-3.5 border-b border-slate-100">
      <div className="flex items-center gap-[10.5px]">
        {icon && (
          <div className="relative shrink-0 size-[22px] text-[#455067]">
            {renderIcon()}
          </div>
        )}
        <div className="flex-1">
          <p className="text-[#455067] text-[12.3px] leading-[17.5px] font-normal">
            {label}
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal p-0 h-auto bg-transparent border-none outline-none text-[#101828] text-[15px] leading-[17.5px] font-semibold hover:bg-transparent focus:bg-transparent",
                  !date && "text-muted-foreground"
                )}
                disabled={disabled}
                onBlur={onBlur}
                name={name}
              >
                <div className="flex items-center justify-between w-full">
                  <span>
                    {date ? format(date, 'PPP') : placeholder || 'Pick a date'}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 z-[9999] bg-white border border-gray-200 shadow-lg rounded-md" 
              align="start" 
              side="bottom" 
              sideOffset={4}
              avoidCollisions={true}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={disabled}
                fromDate={minDate}
                toDate={maxDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-[28.5px]">{error}</p>
      )}
    </div>
  );
};

export default DateInput; 