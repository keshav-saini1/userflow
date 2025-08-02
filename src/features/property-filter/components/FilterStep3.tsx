import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BaseBottomSheet, Calendar } from '@/components';
import type { FilterStepProps } from '../types';
import { useFilterStore } from '../store/filterStore';
import type { DateRange } from '@/components/Calendar';

const FilterStep3: React.FC<FilterStepProps> = ({
  isOpen,
  onClose,
  onNext
}) => {
  const { filterState } = useFilterStore();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: filterState.dateRange.startDate ? new Date(filterState.dateRange.startDate) : null,
    endDate: filterState.dateRange.endDate ? new Date(filterState.dateRange.endDate) : null
  });
  const [selectedDuration, setSelectedDuration] = useState<string>('');

  const handleDateRangeSelect = (dateRange: DateRange) => {
    setSelectedDateRange(dateRange);
    // Clear duration when manually selecting dates
    setSelectedDuration('');
  };

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
    // Calculate dates based on duration
    const startDate = new Date();
    const endDate = new Date();
    
    switch (duration) {
      case '1 day':
        endDate.setDate(endDate.getDate() + 1);
        break;
      case '1 week':
        endDate.setDate(endDate.getDate() + 7);
        break;
      case '1 month':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case '3 months':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
    }
    
    setSelectedDateRange({ startDate, endDate });
  };

  const handleNext = () => {
    onNext({
      dateRange: {
        startDate: selectedDateRange.startDate?.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short'
        }) || '',
        endDate: selectedDateRange.endDate?.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short'
        }) || ''
      }
    });
  };

  const formatCheckInDate = () => {
    return selectedDateRange.startDate?.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    }) || 'Select date';
  };

  const formatCheckOutDate = () => {
    return selectedDateRange.endDate?.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    }) || 'Select date';
  };

  const durationOptions = [
    { label: '1 day', value: '1 day' },
    { label: '1 week', value: '1 week' },
    { label: '1 month', value: '1 month' },
    { label: '3 months', value: '3 months' }
  ];

  // Check if either date range is selected OR duration is selected
  const isSelectionValid = (selectedDateRange.startDate && selectedDateRange.endDate) || selectedDuration;

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="When?"
      className="min-h-[90vh]"
    >
      <div className="flex flex-col h-[90vh]">
        {/* Content */}
        <div className="flex-1 p-5">
          {/* Calendar */}
          <div className="space-y-4">
            <div className="bg-white p-4">
              <Calendar
                selectionMode="range"
                displayDate={new Date()}
                selectedDateRange={selectedDateRange}
                onDateRangeSelect={handleDateRangeSelect}
                isDateAvailable={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date >= today;
                }}
                showNavigation={true}
                showDayHeaders={true}
                className="w-full"
              />
            </div>
          </div>

          {/* Check-in/Check-out Display */}
          <div className="mt-6">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">Check-in</div>
                  <div className="text-sm text-gray-600">{formatCheckInDate()}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">Check-out</div>
                  <div className="text-sm text-gray-600">{formatCheckOutDate()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Duration Options */}
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Or choose duration</h4>
            <div className="flex gap-3 flex-wrap">
              {durationOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDurationSelect(option.value)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    selectedDuration === option.value
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom of screen */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!isSelectionValid}
              className="w-full py-3.5 px-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Continue
            </motion.button>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default FilterStep3; 