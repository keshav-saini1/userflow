import React, { useState, useMemo } from 'react';

/**
 * Reusable Calendar Component
 * 
 * Features:
 * - Single date selection with callback
 * - Date range selection with callback
 * - Custom availability logic
 * - Event indicators
 * - Month navigation
 * - Configurable styling
 * - Past dates are automatically disabled
 * - Responsive design for desktop and mobile
 * 
 * Example usage:
 * ```tsx
 * // Single date selection
 * <Calendar
 *   selectionMode="single"
 *   displayDate={new Date(2025, 6, 1)}
 *   selectedDate={selectedDate}
 *   onDateSelect={handleDateSelect}
 *   isDateAvailable={(date) => date.getDate() >= 7}
 *   hasEvents={(date) => [8, 9, 10].includes(date.getDate())}
 * />
 * 
 * // Date range selection
 * <Calendar
 *   selectionMode="range"
 *   displayDate={new Date(2025, 6, 1)}
 *   selectedDateRange={selectedDateRange}
 *   onDateRangeSelect={handleDateRangeSelect}
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
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isAvailable: boolean;
  hasEvents: boolean;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface CalendarProps {
  /** Selection mode: 'single' for single date, 'range' for date range */
  selectionMode?: 'single' | 'range';
  /** The date to display (defaults to current month) */
  displayDate?: Date;
  /** Currently selected date (for single mode) */
  selectedDate?: Date | null;
  /** Currently selected date range (for range mode) */
  selectedDateRange?: DateRange;
  /** Callback when a single date is selected */
  onDateSelect?: (date: Date) => void;
  /** Callback when a date range is selected */
  onDateRangeSelect?: (dateRange: DateRange) => void;
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
  selectionMode = 'single',
  displayDate = new Date(),
  selectedDate = null,
  selectedDateRange = { startDate: null, endDate: null },
  onDateSelect,
  onDateRangeSelect,
  isDateAvailable,
  hasEvents = () => false,
  showNavigation = true,
  showDayHeaders = true,
  className = '',
  disabled = false,
}) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(displayDate);
  const [tempRangeStart, setTempRangeStart] = useState<Date | null>(null);

  // Update display date when prop changes or when selected date changes
  React.useEffect(() => {
    if (selectionMode === 'single' && selectedDate) {
      // If there's a selected date, show its month
      setCurrentDisplayDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    } else if (selectionMode === 'range' && selectedDateRange.startDate) {
      // If there's a selected start date, show its month
      setCurrentDisplayDate(new Date(selectedDateRange.startDate.getFullYear(), selectedDateRange.startDate.getMonth(), 1));
    } else {
      // Otherwise use the provided display date
      setCurrentDisplayDate(displayDate);
    }
  }, [displayDate, selectedDate, selectedDateRange, selectionMode]);

  // Default function to check if date is available (not in the past)
  const defaultIsDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return date >= today;
  };

  // Use provided isDateAvailable or default to checking if date is not in the past
  const checkDateAvailability = isDateAvailable || defaultIsDateAvailable;

  // Normalize date to midnight and compare by time value to avoid string/lexicographic issues
  const normalizeDateToMidnight = (d: Date): number => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };

  // Helper function to check if a date is in the selected range
  const isDateInRange = (date: Date, range: DateRange): boolean => {
    if (!range.startDate || !range.endDate) return false;
    const target = normalizeDateToMidnight(date);
    const start = normalizeDateToMidnight(range.startDate);
    const end = normalizeDateToMidnight(range.endDate);
    return target >= start && target <= end;
  };

  // Helper function to check if a date is the start of the range
  const isDateRangeStart = (date: Date, range: DateRange): boolean => {
    if (!range.startDate) return false;
    return normalizeDateToMidnight(range.startDate) === normalizeDateToMidnight(date);
  };

  // Helper function to check if a date is the end of the range
  const isDateRangeEnd = (date: Date, range: DateRange): boolean => {
    if (!range.endDate) return false;
    return normalizeDateToMidnight(range.endDate) === normalizeDateToMidnight(date);
  };

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
        isSelected: selectionMode === 'single' 
          ? selectedDate?.toDateString() === date.toDateString()
          : isDateRangeStart(date, selectedDateRange),
        isInRange: selectionMode === 'range' && isDateInRange(date, selectedDateRange),
        isRangeStart: selectionMode === 'range' && isDateRangeStart(date, selectedDateRange),
        isRangeEnd: selectionMode === 'range' && isDateRangeEnd(date, selectedDateRange),
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
        isSelected: selectionMode === 'single' 
          ? selectedDate?.toDateString() === date.toDateString()
          : isDateRangeStart(date, selectedDateRange),
        isInRange: selectionMode === 'range' && isDateInRange(date, selectedDateRange),
        isRangeStart: selectionMode === 'range' && isDateRangeStart(date, selectedDateRange),
        isRangeEnd: selectionMode === 'range' && isDateRangeEnd(date, selectedDateRange),
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
        isInRange: selectionMode === 'range' && isDateInRange(date, selectedDateRange),
        isRangeStart: selectionMode === 'range' && isDateRangeStart(date, selectedDateRange),
        isRangeEnd: selectionMode === 'range' && isDateRangeEnd(date, selectedDateRange),
        isAvailable,
        hasEvents: hasEvents(date)
      });
    }

    return days;
  }, [currentDisplayDate, selectedDate, selectedDateRange, selectionMode, checkDateAvailability, hasEvents]);

  const handleDateClick = (day: CalendarDay) => {
    if (!disabled && day.isAvailable) {
      if (selectionMode === 'single') {
        onDateSelect?.(day.date);
      } else if (selectionMode === 'range') {
        handleRangeDateClick(day.date);
      }
    }
  };

  const handleRangeDateClick = (date: Date) => {
    if (!onDateRangeSelect) return;

    if (!tempRangeStart) {
      // First click - set start date
      setTempRangeStart(date);
      onDateRangeSelect({ startDate: date, endDate: null });
    } else {
      // Second click - set end date
      const startDate = tempRangeStart;
      const endDate = date;
      
      // Ensure start date is before end date
      if (startDate > endDate) {
        onDateRangeSelect({ startDate: endDate, endDate: startDate });
      } else {
        onDateRangeSelect({ startDate, endDate });
      }
      
      setTempRangeStart(null);
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
                    ? day.isSelected || day.isRangeStart || day.isRangeEnd
                      ? 'bg-blue-500 text-white shadow-lg'
                      : day.isInRange
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-900 hover:bg-gray-50'
                    : 'text-gray-600 opacity-30'
                  : day.isInRange 
                    ? 'bg-blue-100 text-blue-900 opacity-80' 
                    : 'text-gray-300 opacity-30'
                }
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {day.dayNumber}
              {day.hasEvents && day.isCurrentMonth && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                    day.isSelected || day.isRangeStart || day.isRangeEnd ? 'bg-white' : 'bg-blue-500'
                  }`} />
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