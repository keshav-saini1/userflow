import React, { useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import type { Property } from '../types';
import Calendar, { type DateRange } from '../../../components/Calendar';
import room_reserve from '@/assets/room_reserve.svg';
import default_back from '@/assets/default_back.svg';
import { useNavigate } from 'react-router';

const ReservationStep1: React.FC = () => {
  const navigate = useNavigate();
  const { updateForm, nextStep } = useReservation();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Sample property data - in real app this would come from props or API
  const property: Property = {
    id: '1',
    name: 'Premium Private Room',
    location: 'Gurugram',
    price: 8000,
    priceUnit: 'per month',
    image: '/api/placeholder/400/200',
    type: 'Private Room'
  };

  const handleDateRangeSelect = (range: DateRange) => {
    setSelectedDateRange(range);
    // Persist at least the start date to the form for compatibility
    updateForm({ selectedDate: range.startDate });
  };

  const handleContinue = () => {
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      nextStep();
    }
  };

  const isContinueDisabled = !selectedDateRange.startDate || !selectedDateRange.endDate;

  // Function to calculate date range based on move-in option
  const calculateDateRange = (option: string): DateRange => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    switch (option) {
      case 'immediate': {
        // Immediate: today to today (same day)
        return { startDate: today, endDate: today };
      }
      case '7days': {
        // 7 days: today to 7 days from now
        const sevenDays = new Date(today);
        sevenDays.setDate(today.getDate() + 7);
        return { startDate: today, endDate: sevenDays };
      }
      case '15days': {
        // 15 days: today to 15 days from now
        const fifteenDays = new Date(today);
        fifteenDays.setDate(today.getDate() + 15);
        return { startDate: today, endDate: fifteenDays };
      }
      case '30days': {
        // 30 days: today to 30 days from now
        const thirtyDays = new Date(today);
        thirtyDays.setDate(today.getDate() + 30);
        return { startDate: today, endDate: thirtyDays };
      }
      default: {
        return { startDate: today, endDate: today };
      }
    }
  };

  // Handle move-in option selection
  const handleMoveInOption = (option: string) => {
    const calculatedRange = calculateDateRange(option);
    setSelectedOption(option);
    setSelectedDateRange(calculatedRange);
    // Update form with the start date (end date is maintained in local state)
    updateForm({ 
      selectedDate: calculatedRange.startDate
    });
  };

  // Calendar configuration - all future and present dates are available
  // Past dates are automatically disabled by the Calendar component

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header - Mobile Only */}
      <div className="lg:hidden sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3.5">
            <button className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center" onClick={() => navigate(-1)}>
              <img src={default_back} alt="back" className="w-10 h-10" />
            </button>
            <div>
              <h2 className="text-sm font-medium text-gray-900">Reserve Room</h2>
              <p className="text-xs text-gray-500">Step 1 of 4</p>
            </div>
          </div>
          {/* <button className="w-9 h-9 bg-gray-100/50 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Desktop Layout Container */}
      <div className="max-w-7xl mx-auto lg:flex lg:min-h-screen">
        {/* Left Side - Property Card (Desktop) */}
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:bg-gray-50">
          <div className="px-4 py-5 lg:px-12 lg:py-12 lg:h-full lg:flex lg:flex-col lg:justify-center">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm lg:shadow-xl lg:h-full lg:flex lg:flex-col">
              <div className="h-40 lg:h-full lg:flex-1 relative" style={{ backgroundImage: `url(${room_reserve})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Property image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                
                {/* Property info overlay */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 bg-white/10 backdrop-blur rounded-xl p-3 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className='flex flex-col items-start'>
                      <div>
                        <span className='text-white text-sm lg:text-2xl font-semibold lg:font-bold'>{property.name}</span>
                      </div>
                      <div className="flex items-center gap-2.5 mt-1 lg:mt-3">
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white text-xs lg:text-lg opacity-90">{property.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-sm lg:text-3xl lg:font-bold">₹{property.price.toLocaleString()}</div>
                      <div className="text-white text-xs lg:text-lg opacity-90">{property.priceUnit}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Calendar and Options (Desktop) */}
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          {/* Desktop Header */}
          <div className="hidden lg:block lg:px-8 lg:py-6">
            <div className="flex items-center gap-3.5">
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Reserve Room</h2>
                <p className="text-sm text-gray-500">Step 1 of 4</p>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="px-4 lg:px-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="text-center lg:text-left mb-5 lg:mb-8">
              <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 mb-1 lg:mb-2">
                When would you like to move in?
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Choose your preferred move-in date
              </p>
            </div>

            {/* Calendar */}
            <div className="mb-6 lg:mb-8">
              <Calendar
                 selectionMode="range"
                 selectedDateRange={selectedDateRange}
                 onDateRangeSelect={handleDateRangeSelect}
                 displayDate={new Date(2025, 7, 1)} // August 2025
                 isDateAvailable={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date >= today;
                 }}
                 className="w-full"
              />
            </div>

            {/* Check-in/Check-out Display */}
            <div className="mb-6 lg:mb-8">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">Check-in</div>
                    <div className="text-sm text-gray-600">
                      {selectedDateRange.startDate 
                        ? selectedDateRange.startDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short'
                          })
                        : 'Select date'
                      }
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">Check-out</div>
                    <div className="text-sm text-gray-600">
                      {selectedDateRange.endDate 
                        ? selectedDateRange.endDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short'
                          })
                        : 'Select date'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            

            {/* Move-in Options */}
            <div className="flex gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {[
                { id: 'immediate', label: 'Immediate', value: 'immediate' },
                { id: '15days', label: '15 days', value: '15days' },
                { id: '30days', label: '30 days', value: '30days' },
                { id: '7days', label: '7 days', value: '7days' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleMoveInOption(option.value)}
                  className={`
                    rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-xs lg:text-sm whitespace-nowrap transition-colors
                    ${selectedOption === option.value
                      ? 'bg-blue-600 border border-blue-600 text-white'
                      : 'bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="fixed lg:relative bottom-0 left-0 right-0 p-4 lg:p-8 bg-white border-t lg:border-t-0 border-gray-100">
            <button
              onClick={handleContinue}
              disabled={isContinueDisabled}
              className={`
                w-full py-3.5 lg:py-4 rounded-xl text-sm lg:text-base font-semibold transition-colors
                ${isContinueDisabled
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStep1; 