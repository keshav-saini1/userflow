import React, { useState, useMemo } from 'react';

/**
 * Reusable Calendar Component
 * 
 * Features:
 * - Date selection with callback
 * - Custom availability logic
 * - Event indicators
 * - Month navigation
 * - Configurable styling
 * - Past dates are automatically disabled
 * - Responsive design for desktop and mobile
 * 
 * Example usage:
 * ```tsx
 * <Calendar
 *   displayDate={new Date(2025, 6, 1)}
 *   selectedDate={selectedDate}
 *   onDateSelect={handleDateSelect}
 *   isDateAvailable={(date) => date.getDate() >= 7}
 *   hasEvents={(date) => [8, 9, 10].includes(date.getDate())}
 * />
 * ```
 */

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  hasEvents: boolean;
}

export interface CalendarProps {
  /** The date to display (defaults to current month) */
  displayDate?: Date;
  /** Currently selected date */
  selectedDate?: Date | null;
  /** Callback when a date is selected */
  onDateSelect?: (date: Date) => void;
  /** Function to determine if a date is available */
  isDateAvailable?: (date: Date) => boolean;
  /** Function to determine if a date has events */
  hasEvents?: (date: Date) => boolean;
  /** Whether to show navigation arrows */
  showNavigation?: boolean;
  /** Whether to show day headers */
  showDayHeaders?: boolean;
  /** Custom class names */
  className?: string;
  /** Whether the calendar is disabled */
  disabled?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  displayDate = new Date(),
  selectedDate = null,
  onDateSelect,
  isDateAvailable,
  hasEvents = () => false,
  showNavigation = true,
  showDayHeaders = true,
  className = '',
  disabled = false,
}) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(displayDate);

  // Update display date when prop changes or when selected date changes
  React.useEffect(() => {
    if (selectedDate) {
      // If there's a selected date, show its month
      setCurrentDisplayDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    } else {
      // Otherwise use the provided display date
      setCurrentDisplayDate(displayDate);
    }
  }, [displayDate, selectedDate]);

  // Default function to check if date is available (not in the past)
  const defaultIsDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return date >= today;
  };

  // Use provided isDateAvailable or default to checking if date is not in the past
  const checkDateAvailability = isDateAvailable || defaultIsDateAvailable;

  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    const year = currentDisplayDate.getFullYear();
    const month = currentDisplayDate.getMonth();
    
    // Get first and last day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Add previous month's days to fill the first row
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - i - 1);
      days.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
        isSelected: selectedDate?.toDateString() === date.toDateString(),
        isAvailable: false, // Previous month days are never available
        hasEvents: hasEvents(date)
      });
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const isAvailable = checkDateAvailability(date);
      
      days.push({
        date,
        dayNumber: i,
        isCurrentMonth: true,
        isSelected: selectedDate?.toDateString() === date.toDateString(),
        isAvailable,
        hasEvents: hasEvents(date)
      });
    }

    // Add next month's days to complete the grid (6 rows * 7 days = 42)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      const isAvailable = checkDateAvailability(date);
      days.push({
        date,
        dayNumber: i,
        isCurrentMonth: false,
        isSelected: false,
        isAvailable,
        hasEvents: hasEvents(date)
      });
    }

    return days;
  }, [currentDisplayDate, selectedDate, checkDateAvailability, hasEvents]);

  const handleDateClick = (day: CalendarDay) => {
    if (!disabled && day.isAvailable && onDateSelect) {
      onDateSelect(day.date);
    }
  };

  const handlePreviousMonth = () => {
    if (!disabled) {
      setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (!disabled) {
      setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 1));
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`calendar ${className}`}>
      {/* Month Navigation */}
      {showNavigation && (
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <button
            onClick={handlePreviousMonth}
            disabled={disabled}
            className="w-9 h-9 lg:w-12 lg:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-base lg:text-lg font-semibold text-gray-900">
            {formatMonthYear(currentDisplayDate)}
          </span>
          <button
            onClick={handleNextMonth}
            disabled={disabled}
            className="w-9 h-9 lg:w-12 lg:h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Day headers */}
        {showDayHeaders && (
          <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-2 lg:mb-3">
            {dayHeaders.map((day) => (
              <div key={day} className="text-center text-xs lg:text-sm font-medium text-gray-600 py-2 lg:py-3">
                {day}
              </div>
            ))}
          </div>
        )}

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 lg:gap-2">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={disabled || !day.isAvailable}
              className={`
                aspect-square rounded-xl flex items-center justify-center text-xs lg:text-sm font-medium relative
                transition-colors duration-200
                ${day.isCurrentMonth 
                  ? day.isAvailable 
                    ? day.isSelected
                      ? 'bg-white border-2 border-blue-500 shadow-lg text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50'
                    : 'text-gray-600 opacity-30'
                  : 'text-gray-300 opacity-30'
                }
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {day.dayNumber}
              {day.hasEvents && day.isCurrentMonth && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 