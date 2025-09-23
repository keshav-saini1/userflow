import React from 'react';
import { useReservation } from '../context/ReservationContext';
import type { Property } from '../types';
import room_reserve from '@/assets/room_reserve.svg';
import { useNavigate } from 'react-router';
import { useReservationStore } from '../store/useReservationStore';


const ReservationStep2: React.FC = () => {
  const navigate = useNavigate();
  const { nextStep } = useReservation();
  const { currentProperty } = useReservationStore();
  console.log({ currentProperty })

  // Sample property data - fallback if store data not available
  const property: Property = {
    id: '1',
    name: 'Premium Private Room',
    location: 'Gurugram',
    price: 8000,
    priceUnit: 'per month',
    image: '/api/placeholder/400/200',
    type: 'Private Room'
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="bg-white relative rounded-tl-[21px] rounded-tr-[21px] h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-[21px]">
        <div className="flex gap-3.5 items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-col">
            <div className="text-sm font-medium text-neutral-950">
              Reserve Room
            </div>
            <div className="text-xs text-[#717182]">
              Step 2 of 4
            </div>
          </div>
        </div>
        {/* <button 
          onClick={() => navigate(-1)}
          className="bg-[rgba(236,236,240,0.5)] flex items-center justify-center rounded-full w-[35px] h-[35px] hover:bg-[rgba(236,236,240,0.7)] transition-colors"
        >
          <svg className="w-[17.5px] h-[17.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Property Card */}
        <div className="px-3.5 pb-[21px]">
          <div className="bg-white h-[156px] relative rounded-[21px] shadow-sm border border-gray-100">
            <div
              className="h-full w-full rounded-[21px] relative"
              style={{
                backgroundImage: `url('${currentProperty?.image || room_reserve}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute bg-gradient-to-t from-[#00000066] inset-0 to-[#00000000] rounded-[21px]" />
              <div className="absolute backdrop-blur-[6px] backdrop-filter bg-[rgba(255,255,255,0.1)] flex items-center justify-between h-[58px] left-1/2 p-[10.5px] rounded-[14px] top-[82px] translate-x-[-50%] w-[calc(100%-24px)]">
                <div className="flex flex-col gap-[3.5px]">
                  <div className="text-white font-semibold text-[15.8px] leading-[24.5px]">
                    {currentProperty?.propertyName || property.name}
                  </div>
                  <div className="flex gap-1 items-center">
                    <svg className="w-[10.5px] h-[10.5px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-white text-[12.3px] leading-[17.5px] opacity-90">
                      {currentProperty?.propertyAddress?.city || property.location}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[3.5px] items-end">
                  <div className="text-white font-semibold text-[15.8px] leading-[24.5px]">
                    ₹{currentProperty?.rent?.toLocaleString() || property.price.toLocaleString()}
                  </div>
                  <div className="text-white text-[12.3px] leading-[17.5px] opacity-90">
                    per month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="px-3.5 pb-4">
          <div className="flex flex-col gap-[21px]">
            {/* Review Heading */}
            <div className="flex flex-col gap-[7px] items-center">
              <div className="text-[#101828] text-[18px] font-semibold leading-[21px] text-center">
                Review your booking
              </div>
              <div className="text-[#6a7282] text-[14px] leading-[21px] text-center">
                Transparent pricing with no hidden fees
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-[#f9fafb] flex flex-col gap-[21px] p-[21px] rounded-[21px]">
              <div className="text-[#101828] text-[14px] font-semibold leading-[21px]">
                Secure Now, Pay Later at Move-In!
              </div>

              <div className="flex flex-col gap-[14px]">
                {/* Security Deposit */}
                <div className="flex items-center justify-between">
                  <div className="text-[#4a5565] text-[14px] leading-[21px]">
                    Monthly Rent
                  </div>
                  <div className="text-[#101828] text-[14px] font-semibold leading-[21px]">
                    ₹{currentProperty?.rent}
                  </div>
                </div>

                {/* Automatic Joining Fee */}
                {/* <div className="flex items-center justify-between">
                  <div className="text-[#00a63e] text-[14px] leading-[21px]">
                    Automatic Joining fee
                  </div>
                  <div className="text-[#00a63e] text-[14px] font-semibold leading-[21px]">
                    ₹{pricing.joiningFeeDiscount.toLocaleString()}
                  </div>
                </div> */}
              </div>

              {/* Total */}
              <div className="border-t border-[#e5e7eb] flex items-center justify-between pt-[21px]">
                <div className="text-[#101828] text-[14px] font-bold leading-[21px]">
                  Total
                </div>
                <div className="text-[#101828] text-[14px] font-bold leading-[21px]">
                  ₹{currentProperty?.rent}
                </div>
              </div>

              <div className="text-[#6a7282] text-[12.3px] leading-[17.5px]">
                *Security deposit is fully refundable if taken
              </div>

              {/* Payable Token Amount */}
              <div className="bg-[#f0fdf4] border border-[#b9f8cf] flex gap-[10.5px] items-center p-[10.5px] rounded-[10.5px]">
                <div className="w-[21px] h-[21px]">
                  <svg className="w-full h-full text-[#00a63e]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div className="text-[#00a63e] text-[12.3px] font-semibold leading-[17.5px]">
                    Payable token amount
                  </div>
                  <div className="text-[#00a63e] text-[12.3px] font-semibold leading-[17.5px]">
                    ₹{currentProperty?.min_token_amount}
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-[10.5px]">
              <div className="flex gap-[10.5px] items-center">
                <svg className="w-3.5 h-3.5 text-[#00a63e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-[#364153] text-[12.3px] leading-[17.5px]">
                  Free cancellation up to 24 hours before move-in
                </div>
              </div>
              <div className="flex gap-[10.5px] items-center">
                <svg className="w-3.5 h-3.5 text-[#00a63e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-[#364153] text-[12.3px] leading-[17.5px]">
                  All utilities and amenities included
                </div>
              </div>
              <div className="flex gap-[10.5px] items-center">
                <svg className="w-3.5 h-3.5 text-[#00a63e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-[#364153] text-[12.3px] leading-[17.5px]">
                  Security deposit fully refundable at checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="shrink-0 bg-white border-t border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Token Amount</p>
            <p className="text-lg font-semibold text-blue-600">₹{currentProperty?.min_token_amount}</p>
          </div>
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Pay to Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationStep2; 