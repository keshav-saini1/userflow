import React, { useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import type { Property } from '../types';
import Calendar, { type DateRange } from '../../../components/Calendar';
import room_reserve from '@/assets/room_reserve.svg';
import { useNavigate } from 'react-router';
import { useReservationStore } from '../store/useReservationStore';

const ReservationStep1: React.FC = () => {
  const navigate = useNavigate();
  const { updateForm, nextStep } = useReservation();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const { currentProperty } = useReservationStore();

  console.log({currentProperty})

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
    // Clear duration selection when both dates are selected
    if (range.startDate && range.endDate) {
      setSelectedDuration(null);
    }
    // Persist at least the start date to the form for compatibility
    updateForm({ selectedDate: range.startDate });
  };

  const handleContinue = () => {
    // Two scenarios:
    // 1. Both dates selected (no duration needed)
    // 2. Only start date selected + duration selected
    const hasBothDates = selectedDateRange.startDate && selectedDateRange.endDate;
    const hasStartDateAndDuration = selectedDateRange.startDate && !selectedDateRange.endDate && selectedDuration;
    
    if (hasBothDates || hasStartDateAndDuration) {
      nextStep();
    }
  };

  const isContinueDisabled = (() => {
    const hasBothDates = selectedDateRange.startDate && selectedDateRange.endDate;
    const hasStartDateAndDuration = selectedDateRange.startDate && !selectedDateRange.endDate && selectedDuration;
    return !(hasBothDates || hasStartDateAndDuration);
  })();

  // Duration options with pricing
  const durationOptions = [
    { id: 'monthly', label: 'Monthly', price: 15000, unit: 'month' },
    { id: '3months', label: '3 Months', price: 13000, unit: 'month' },
    { id: '6months', label: '6 Months', price: 12000, unit: 'month', discount: '10% Discount' },
    { id: '12months', label: '12 Months', price: 10000, unit: 'month' },
  ];

  // Handle duration selection
  const handleDurationSelect = (durationId: string) => {
    setSelectedDuration(durationId);
    // Note: duration is stored in local state for now
    // updateForm({ duration: durationId }); // Commented out due to type constraints
  };

  return (
    <div className="bg-white flex flex-col h-screen max-h-screen rounded-tl-[21px] rounded-tr-[21px] relative overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="backdrop-blur backdrop-filter bg-[rgba(255,255,255,0.95)] box-border content-stretch flex flex-col h-[85px] items-start justify-start pb-px pt-0 px-0 rounded-tl-[21px] rounded-tr-[21px] shrink-0 w-full z-10">
        <div className="box-border content-stretch flex items-center justify-between p-[21px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-3.5 items-center justify-start relative shrink-0">
            <div className="content-stretch flex flex-col items-start justify-start relative shrink-0">
              <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
                <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap">
                  <p className="leading-[21px] whitespace-pre">Reserve Room</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
                <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[12.3px] text-nowrap">
                  <p className="leading-[17.5px] whitespace-pre">Step 1 of 4</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[rgba(236,236,240,0.5)] content-stretch flex items-center justify-center relative rounded-full shrink-0 size-[35px] hover:bg-[rgba(236,236,240,0.7)] transition-colors"
          >
            <svg className="relative shrink-0 size-[17.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col gap-4 pb-4">
          {/* Property Card */}
          <div className="box-border content-stretch flex flex-col h-[168px] items-start justify-start pb-[21px] pt-0 px-3.5 relative shrink-0 w-full">
            <div className="bg-white h-[156px] relative rounded-[21px] shrink-0 w-full shadow-sm border border-gray-100">
              <div className="box-border content-stretch flex flex-col h-[156px] items-start justify-start overflow-clip p-px relative w-full">
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
                  <div 
                    className="bg-left bg-no-repeat h-[154px] shrink-0 w-full rounded-[21px]" 
                    style={{ 
                      backgroundImage: `url('${currentProperty?.image || property.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} 
                  />
                  <div className="absolute bg-gradient-to-t from-[#00000066] inset-0 to-[#00000000] rounded-[21px]" />
                  <div className="absolute backdrop-blur-[6px] backdrop-filter bg-[rgba(255,255,255,0.1)] box-border content-stretch flex gap-[10.5px] h-[58px] items-center justify-start left-1/2 p-[10.5px] rounded-[14px] top-[82px] translate-x-[-50%] w-[calc(100%-24px)]">
                    <div className="absolute bottom-[5.5px] content-stretch flex flex-col gap-[3.5px] items-start justify-center left-3 w-[180px]">
                      <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.8px] text-white w-full">
                          <p className="leading-[24.5px]">{currentProperty?.propertyName}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 w-full">
                        <svg className="relative shrink-0 size-[10.5px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="content-stretch flex flex-col items-start justify-start opacity-90 relative shrink-0">
                          <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.3px] text-nowrap text-white">
                            <p className="leading-[17.5px] whitespace-pre">{currentProperty?.propertyAddress?.address_line_2}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 content-stretch flex flex-col gap-[3.5px] items-end justify-start right-3 w-[145px]">
                      <div className="content-stretch flex flex-col items-end justify-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[15.8px] text-nowrap text-white">
                          <p className="leading-[24.5px] whitespace-pre">₹{currentProperty?.rent}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-1 items-center justify-end relative shrink-0 w-[90px]">
                        <div className="content-stretch flex flex-col items-start justify-start opacity-90 relative shrink-0">
                          <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.3px] text-nowrap text-white">
                            <p className="leading-[17.5px] whitespace-pre">{property.priceUnit}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar and Check-in/Check-out Section */}
          <div className="content-stretch flex flex-col gap-4 items-start justify-start px-3.5 relative shrink-0 w-full">
            {/* Check-in/Check-out Display */}
            <div className="bg-[#f3f4f6] rounded-[14px] border border-[#e5e7eb] p-[14px] w-full">
              <div className={`flex items-center ${selectedDateRange.endDate ? 'justify-between' : 'justify-start'}`}>
                <div className="flex flex-col">
                  <div className="text-[12.3px] font-medium text-[#101828]" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                    {selectedDateRange.endDate ? 'Check-in' : 'Move-in Date'}
                  </div>
                  <div className="text-[12.3px] text-[#6a7282] mt-[3.5px]" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                    {selectedDateRange.startDate 
                      ? selectedDateRange.startDate.toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short'
                        })
                      : 'Select date'
                    }
                  </div>
                </div>
                {selectedDateRange.endDate && (
                  <>
                    <div className="w-[1px] h-[28px] bg-[#e5e7eb]"></div>
                    <div className="flex flex-col">
                      <div className="text-[12.3px] font-medium text-[#101828]" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>Check-out</div>
                      <div className="text-[12.3px] text-[#6a7282] mt-[3.5px]" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                        {selectedDateRange.endDate.toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Calendar */}
            <div className="w-full">
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

            {/* Duration Options - Only show when only check-in date is selected */}
            {selectedDateRange.startDate && !selectedDateRange.endDate && (
              <div className="content-stretch flex flex-col gap-[10.5px] items-start justify-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
                  <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[12.3px] w-full">
                    <p className="leading-[17.5px]">Choose duration</p>
                  </div>
                </div>
              <div className="content-start flex flex-wrap gap-[11px] items-start justify-between relative shrink-0 w-full">
                {durationOptions.map((option) => (
                  <div key={option.id} className="relative">
                    <button
                      onClick={() => handleDurationSelect(option.id)}
                      className={`
                        box-border content-stretch flex flex-col items-start justify-center px-[15px] py-2 relative rounded-[12px] shrink-0 w-[170px] transition-all
                        ${selectedDuration === option.id
                          ? 'border border-[#030213] bg-[#030213]/5'
                          : 'border border-[#d1d5dc] hover:border-[#030213]/30'
                        }
                      `}
                    >
                      <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[12.3px] text-center text-nowrap">
                        <p className="leading-[17.5px] whitespace-pre">{option.label}</p>
                      </div>
                      <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a5565] text-[12.3px] text-center text-nowrap">
                        <p className="leading-[17.5px] whitespace-pre">₹{option.price.toLocaleString()}/{option.unit}</p>
                      </div>
                    </button>
                    {option.discount && (
                      <div className="absolute bg-green-100 right-[-8px] top-[-8px] rounded-[6.75px] border border-[#b9f8cf]">
                        <div className="box-border content-stretch flex items-center justify-center overflow-clip px-2 py-[2.75px] relative">
                          <div className="flex flex-col font-['SF_Pro_Text',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#008236] text-[10.5px] text-center text-nowrap">
                            <p className="leading-[14px] whitespace-pre">{option.discount}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="shrink-0 bg-white border-t border-gray-100 p-4">
        <button
          onClick={handleContinue}
          disabled={isContinueDisabled}
          className={`
            w-full py-3.5 rounded-[14px] font-['SF_Pro_Text',_sans-serif] font-semibold text-[14px] text-center transition-all
            ${isContinueDisabled 
              ? 'bg-gray-200 text-[#6a7282]' 
              : 'bg-[#030213] text-white hover:bg-[#030213]/90'
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ReservationStep1; 