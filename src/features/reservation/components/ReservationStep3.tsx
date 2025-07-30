import React from 'react';
import { useReservation } from '../context/ReservationContext';
import type { Property } from '../types';
import room_reserve from '@/assets/room_reserve.svg';

interface PricingBreakdown {
  monthlyRent: number;
  months: number;
  securityDeposit: number;
  joiningFee: number;
  joiningFeeDiscount: number;
  tokenAmount: number;
}

const ReservationStep3: React.FC = () => {
  const { form, nextStep, previousStep } = useReservation();

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

  // Calculate pricing based on selected duration
  const calculatePricing = (): PricingBreakdown => {
    const monthlyRent = 15000; // Base monthly rent
    const months = form.selectedDuration === 'custom' ? (form.customMonths || 6) : 
                  form.selectedDuration === '3months' ? 3 :
                  form.selectedDuration === '6months' ? 6 :
                  form.selectedDuration === '12months' ? 12 : 1;
    
    const securityDeposit = monthlyRent;
    const joiningFee = monthlyRent * 0.6; // 60% of monthly rent
    const joiningFeeDiscount = joiningFee; // Full discount applied
    const tokenAmount = 5000;

    return {
      monthlyRent,
      months,
      securityDeposit,
      joiningFee,
      joiningFeeDiscount,
      tokenAmount
    };
  };

  const pricing = calculatePricing();
  const totalRent = pricing.monthlyRent * pricing.months;
  const totalAmount = totalRent + pricing.securityDeposit - pricing.joiningFeeDiscount;

  const handleContinue = () => {
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };

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
              <p className="text-xs text-gray-500">Step 3 of 4</p>
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

        {/* Right Side - Booking Review (Desktop) */}
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
                <p className="text-sm text-gray-500">Step 3 of 4</p>
              </div>
            </div>
          </div>

          {/* Booking Review Section */}
          <div className="px-4 lg:px-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="text-center lg:text-left mb-5 lg:mb-8">
              <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 mb-1 lg:mb-2">
                Review your booking
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Transparent pricing with no hidden fees
              </p>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 mb-4 lg:mb-6">
              <div className="space-y-3.5">
                {/* Secure Now, Pay Later */}
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-900">
                    Secure Now, Pay Later at Move-In!
                  </h3>
                </div>

                {/* Monthly Rent */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Monthly rent × {pricing.months}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{totalRent.toLocaleString()}
                  </span>
                </div>

                {/* Security Deposit */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Security deposit
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{pricing.securityDeposit.toLocaleString()}
                  </span>
                </div>

                {/* Joining Fee Discount */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600">
                    Automatic Joining fee
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -₹{pricing.joiningFeeDiscount.toLocaleString()}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Security deposit is fully refundable
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-xl p-3.5 lg:p-4 mb-6 lg:mb-8">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-gray-700">
                    Free cancellation up to 24 hours before move-in
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-gray-700">
                    All utilities and amenities included
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-gray-700">
                    Security deposit fully refundable at checkout
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="fixed lg:relative bottom-0 left-0 right-0 p-4 lg:p-8 bg-white border-t lg:border-t-0 border-gray-100">
            <div className="flex items-center justify-between mb-3 lg:mb-0">
              <div className="lg:hidden">
                <p className="text-sm text-gray-600">Token Amount</p>
                <p className="text-lg font-semibold text-blue-600">₹{pricing.tokenAmount.toLocaleString()}</p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full lg:w-auto px-6 py-3 lg:py-4 bg-gray-900 text-white rounded-lg lg:rounded-xl text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Continue to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStep3; 