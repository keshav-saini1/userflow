import React, { useMemo, useEffect } from 'react';
import { useReservation } from '../context/ReservationContext';
import room_reserve from '@/assets/room_reserve.svg';
import { useNavigate, useSearchParams } from 'react-router';
import { useReservationStore } from '../store/useReservationStore';
import { usePaymentApi } from '../api/usePaymentApi';
import { useTenantApi } from '../api/useTenantApi';

interface BookingSummary {
  bookingId: string;
  moveInDate: Date;
  duration: string;
  totalAmount: number;
  tokenAmount: number;
  nextSteps: string[];
}

const ReservationStep4: React.FC = () => {
  const { form, previousStep } = useReservation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentProperty } = useReservationStore();
  const { getOrderDetails, getOrderDetailsData } = usePaymentApi();
  const { updateTenantDetails } = useTenantApi();

  useEffect(() => {
    if(!currentProperty?.id) return;
    (async() => {
      updateTenantDetails({
        property_id: currentProperty?.id,
        data: {
          status: 2,
        }
      })
    })()
  }, [currentProperty?.id])
  
  // Get order details when component mounts if orderId is in query params
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      getOrderDetails({ order_id: orderId });
    }
  }, [searchParams.get('orderId'), getOrderDetails]);
  // Early return if no property data
  if (!currentProperty) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Property data not found</h2>
          <p className="text-gray-600 mb-4">Please go back and select a property to continue.</p>
          <button
            onClick={() => navigate('/properties')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Properties
          </button>
        </div>
      </div>
    );
  }

  // Generate booking summary
  const generateBookingSummary = (): BookingSummary => {
    const bookingId = form.confirmPaymentData?.data?.paymentID || `BK${Date.now().toString().slice(-6)}`;
    const moveInDate = form.selectedDate || new Date();
    
    const duration = form.selectedDuration === 'custom' 
      ? `${form.customMonths || 6} months`
      : form.selectedDuration === '3months' ? '3 months'
      : form.selectedDuration === '6months' ? '6 months'
      : form.selectedDuration === '12months' ? '12 months'
      : '1 month';

    const monthlyRent = currentProperty.rent;
    const months = form.selectedDuration === 'custom' ? (form.customMonths || 6) : 
                  form.selectedDuration === '3months' ? 3 :
                  form.selectedDuration === '6months' ? 6 :
                  form.selectedDuration === '12months' ? 12 : 1;
    
    const totalRent = monthlyRent * months;
    const securityDeposit = monthlyRent;
    const joiningFeeDiscount = monthlyRent * 0.6;
    const totalAmount = totalRent + securityDeposit - joiningFeeDiscount;
    const tokenAmount = currentProperty.min_token_amount;

    const nextSteps = [
      'Complete your profile verification within 24 hours',
      'Upload required documents (ID proof, address proof)',
      'Pay the remaining amount on move-in day',
      'Receive move-in instructions via email and SMS'
    ];

    return {
      bookingId,
      moveInDate,
      duration,
      totalAmount,
      tokenAmount,
      nextSteps
    };
  };

  const bookingSummary = useMemo(() => generateBookingSummary(), [
    form.selectedDate,
    form.selectedDuration,
    form.customMonths,
    form.confirmPaymentData?.data?.paymentID,
    currentProperty.rent,
    currentProperty.min_token_amount
  ]);

  const handleBack = () => {
    previousStep();
  };

  const handleComplete = () => {
    // Reset form and navigate to home or success page
    // resetForm();
    navigate('/bookings')

    // In a real app, you might navigate to a success page or home
    console.log('Reservation completed successfully');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
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
              <p className="text-xs text-gray-500">Step 4 of 4</p>
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
              <div className="h-40 lg:h-full lg:flex-1 relative" style={{ backgroundImage: `url(${currentProperty.image || room_reserve})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Property image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                
                {/* Property info overlay */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 bg-white/10 backdrop-blur rounded-xl p-3 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className='flex flex-col items-start'>
                      <div>
                        <span className='text-white text-sm lg:text-2xl font-semibold lg:font-bold'>{currentProperty.propertyName}</span>
                      </div>
                      <div className="flex items-center gap-2.5 mt-1 lg:mt-3">
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white text-xs lg:text-lg opacity-90">{currentProperty.propertyAddress?.city}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-sm lg:text-3xl lg:font-bold">₹{currentProperty.rent?.toLocaleString()}</div>
                      <div className="text-white text-xs lg:text-lg opacity-90">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Confirmation (Desktop) */}
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
                <p className="text-sm text-gray-500">Step 4 of 4</p>
              </div>
            </div>
          </div>

          {/* Confirmation Section */}
          <div className="px-4 lg:px-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="text-center lg:text-left mb-5 lg:mb-8">
              {/* Success Icon */}
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 mb-1 lg:mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Your room has been successfully reserved
              </p>
            </div>

            {/* Booking Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 mb-4 lg:mb-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order ID</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {getOrderDetailsData?.data?.order_id || searchParams.get('orderId') || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Amount Paid</span>
                  <span className="text-sm font-semibold text-green-600">
                    ₹{getOrderDetailsData?.data?.amount_paid?.toLocaleString() || bookingSummary.tokenAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Date</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {getOrderDetailsData?.data?.paid_date 
                      ? new Date(getOrderDetailsData.data.paid_date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Move-in Date</span>
                  <span className="text-sm font-semibold text-gray-900">{formatDate(new Date(getOrderDetailsData?.data?.movein_date || ''))}</span>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-semibold text-gray-900">{bookingSummary.duration}</span>
                </div> */}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-xl p-5 lg:p-6 mb-6 lg:mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                {bookingSummary.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-xl p-4 lg:p-5 mb-6 lg:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-semibold text-blue-900">Need Help?</span>
              </div>
              <p className="text-xs text-blue-800">
                Contact our support team at <span className="font-semibold">support@rentok.com</span> or call <span className="font-semibold">+91 98765 43210</span>
              </p>
            </div>
          </div>

          {/* Complete Button */}
          <div className="fixed lg:relative bottom-0 left-0 right-0 p-4 lg:p-8 bg-white border-t lg:border-t-0 border-gray-100">
            <button
              onClick={handleComplete}
              className="w-full py-3.5 lg:py-4 rounded-xl text-sm lg:text-base font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Complete Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStep4; 