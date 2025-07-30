import React, { useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import type { Property } from '../types';
import room_reserve from '@/assets/room_reserve.svg';
import CustomDurationPopup from './CustomDurationPopup';

interface DurationOption {
  id: string;
  label: string;
  price: number;
  originalPrice: number;
  discount?: number;
  isPopular?: boolean;
  isCustom?: boolean;
}

const ReservationStep2: React.FC = () => {
  const { updateForm, nextStep, previousStep } = useReservation();
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [customMonths, setCustomMonths] = useState<number>(24);

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

  const durationOptions: DurationOption[] = [
    {
      id: 'monthly',
      label: 'Monthly',
      price: 15000,
      originalPrice: 15000,
    },
    {
      id: '3months',
      label: '3 Months',
      price: 14250,
      originalPrice: 15000,
      discount: 5,
      isPopular: true,
    },
    {
      id: '6months',
      label: '6 Months',
      price: 13500,
      originalPrice: 15000,
      discount: 10,
    },
    {
      id: '12months',
      label: '12 Months',
      price: 12750,
      originalPrice: 15000,
      discount: 15,
    },
    {
      id: 'custom',
      label: selectedDuration === 'custom' ? `Custom duration (${customMonths} months)` : 'Custom duration',
      price: 15000,
      originalPrice: 15000,
      isCustom: true,
    },
  ];

  const handleDurationSelect = (durationId: string) => {
    if (durationId === 'custom') {
      setIsCustomPopupOpen(true);
    } else {
      setSelectedDuration(durationId);
      updateForm({ selectedDuration: durationId });
    }
  };

  const handleContinue = () => {
    if (selectedDuration) {
      nextStep();
    }
  };

  const handleBack = () => {
    previousStep();
  };

  const handleCustomDurationSubmit = (months: number) => {
    setCustomMonths(months);
    setSelectedDuration('custom');
    updateForm({ selectedDuration: 'custom', customMonths: months });
  };

  const isContinueDisabled = !selectedDuration;

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Mobile Only */}
      <div className="lg:hidden sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3.5">
            <button 
              onClick={handleBack}
              className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-medium text-gray-900">Reserve Room</h2>
              <p className="text-xs text-gray-500">Step 2 of 4</p>
            </div>
          </div>
          <button className="w-9 h-9 bg-gray-100/50 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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

        {/* Right Side - Duration Selection (Desktop) */}
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
          {/* Desktop Header */}
          <div className="hidden lg:block lg:px-8 lg:py-6">
            <div className="flex items-center gap-3.5">
              <button 
                onClick={handleBack}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Reserve Room</h2>
                <p className="text-sm text-gray-500">Step 2 of 4</p>
              </div>
            </div>
          </div>

          {/* Duration Selection Section */}
          <div className="px-4 lg:px-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="text-center lg:text-left mb-5 lg:mb-8">
              <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 mb-1 lg:mb-2">
                Choose your stay duration
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Longer stays come with better discounts
              </p>
            </div>

            {/* Duration Options */}
            <div className="space-y-2.5 lg:space-y-3 mb-6 lg:mb-8">
              {durationOptions.map((option) => (
                <div key={option.id} className="relative">
                  <button
                    onClick={() => handleDurationSelect(option.id)}
                    className={`
                      w-full p-4 lg:p-5 rounded-xl border-2 transition-all duration-200 text-left
                      ${selectedDuration === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 lg:gap-3">
                        {/* Radio Button */}
                        <div className={`
                          w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center
                          ${selectedDuration === option.id
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                          }
                        `}>
                          {selectedDuration === option.id && (
                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-white rounded-full" />
                          )}
                        </div>
                        
                        {/* Option Details */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                              {option.label}
                            </h3>
                            {option.isPopular && (
                              <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-md">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs lg:text-sm text-gray-600 mt-0.5">
                            ₹{option.price.toLocaleString()}/month
                          </p>
                        </div>
                      </div>

                      {/* Discount Badge */}
                      {option.discount && (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 border border-orange-200 rounded-md">
                            {option.discount}% off
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
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

      {/* Custom Duration Popup */}
      <CustomDurationPopup
        isOpen={isCustomPopupOpen}
        onClose={() => setIsCustomPopupOpen(false)}
        onSubmit={handleCustomDurationSubmit}
        initialValue={customMonths}
      />
    </div>
  );
};

export default ReservationStep2; 