import React, { useEffect, useState } from 'react';
import { useReservation } from '../context/ReservationContext';
import room_reserve from '@/assets/room_reserve.svg';
import { useReservationStore } from '../store/useReservationStore';
import { showToast } from '@/components/CustomToast';
import { useParams } from 'react-router';
import { usePaymentApi } from '../api/usePaymentApi';
import type { CashfreeOrderData, PaymentSuccessData } from '../api/usePaymentApi';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const ReservationStep3: React.FC = () => {
  const { nextStep, previousStep, updateForm } = useReservation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { currentProperty } = useReservationStore();
  const { getCashfreeToken, getCashfreeTokenData, getCashfreeTokenError } = usePaymentApi();
  const tenant_id = localStorage.getItem('tenant_id');
  const { property_id, room_id } = useParams();


  // Mock data for payment - replace with actual data from your store/context
  const tenantDetails = {
    id: tenant_id,
    room: room_id
  };

  const propertyDetails = {
    id: property_id,
    pg_id: currentProperty?.pg_id || '',
    pg_number: currentProperty?.pg_number || ''
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay instantly via UPI',
      icon: '💳'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Secure card payment',
      icon: '💳'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Bank transfer',
      icon: '🏦'
    },
    {
      id: 'cash',
      name: 'Pay with Cash',
      description: 'Cash Payment',
      icon: '💵'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    updateForm({ selectedPaymentMethod: methodId });
  };

  const handleContinue = async () => {
    if (!selectedPaymentMethod) {
      return;
    }

    // If cash payment is selected, just proceed to next step
    if (selectedPaymentMethod === 'cash') {
      nextStep();
      return;
    }

    // For online payment methods, process payment
    await handlePayToken(5000); // Token amount of ₹5,000
  };

  const handlePayToken = async (amount: number) => {
    try {
      setIsProcessingPayment(true);
      // Generate a unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;


      let returnURL = new URL(window.location.href)
      returnURL.searchParams.set('orderId', orderId)
      returnURL.searchParams.set('amount', Math.ceil(amount).toString())
      returnURL.searchParams.set('gateway', 'cashfree')


      // Create the payment success data structure
      const paymentSuccessData: PaymentSuccessData = {
        tenant_id: tenantDetails?.id || null,
        paying_amount: amount,
        pg_id: propertyDetails?.pg_id || '',
        pg_number: parseInt(propertyDetails?.pg_number || '0'),
        property_id: propertyDetails?.id || '',
        gateway_charges: 0, // You may need to calculate this
        payment_mode: selectedPaymentMethod === 'upi' ? 1 : selectedPaymentMethod === 'card' ? 2 : 3,
        received_by: '', // This should be set by the backend
        paid_date: new Date(),
        initiated_by: tenantDetails?.id || '',
        description: `Token payment for room reservation`,
        source: 'web',
        order_id: orderId,
        payment_gateway: 'cashfree',
        credit_obj: {},
        version: 1,
        selected_room: tenantDetails?.room || '',
        url: window.location.origin
      };

      // Create the Cashfree order data
      const cashfreeOrderData: CashfreeOrderData = {
        order_id: orderId,
        order_amount: amount,
        payment_success_data: paymentSuccessData,
        tenant_uuid: tenantDetails?.id || null,
        pg_id: propertyDetails?.pg_id || '',
        pg_number: parseInt(propertyDetails?.pg_number || '0'),
        return_url: returnURL.toString(),
        source: 'web',
        is_test: true, // Set to false for production
        payment_modes: selectedPaymentMethod || 'all'
      };

      await getCashfreeToken(cashfreeOrderData)
    } catch (error: any) {
      console.error('Payment error:', error);
      showToast.error(
        'Error initiating payment',
        error?.message || 'Please try again.'
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle payment token response
  useEffect(() => {
    if (getCashfreeTokenData && window.Cashfree) {
      console.log({ getCashfreeTokenData });
      console.log('Cashfree SDK loaded', window.Cashfree);

      try {
        const cashfree = window.Cashfree({ mode: 'sandbox' });

        cashfree.checkout({
          paymentSessionId: getCashfreeTokenData?.data?.payment_session_id,
          redirectTarget: '_self',
          appearance: {
            width: '100%',
            height: '100%',
          },
        });

      } catch (error) {
        console.error('Cashfree checkout error:', error);
        showToast.error('Payment initialization failed', 'Please try again.');
        setIsProcessingPayment(false);
      }
    }
  }, [getCashfreeTokenData]);

  useEffect(() => {
    if (getCashfreeTokenData) {
      console.log({ getCashfreeTokenData });
      console.log('Cashfree SDK loaded', window.Cashfree);
    }
  }, [getCashfreeTokenData]);

  // Handle payment token errors
  useEffect(() => {
    if (getCashfreeTokenError) {
      console.log({ getCashfreeTokenError });
      setIsProcessingPayment(false);
    }
  }, [getCashfreeTokenError])

  const handleBack = () => {
    previousStep();
  };

  const isContinueDisabled = !selectedPaymentMethod || isProcessingPayment;

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
              <p className="text-xs text-gray-500">Step 4 of 5</p>
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
              <div className="h-40 lg:h-full lg:flex-1 relative" style={{ backgroundImage: `url(${currentProperty?.image || room_reserve})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Property image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Property info overlay */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 bg-white/10 backdrop-blur rounded-xl p-3 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className='flex flex-col items-start'>
                      <div>
                        <span className='text-white text-sm lg:text-2xl font-semibold lg:font-bold'>{currentProperty?.propertyName}</span>
                      </div>
                      <div className="flex items-center gap-2.5 mt-1 lg:mt-3">
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white text-xs lg:text-lg opacity-90">{currentProperty?.propertyAddress?.city}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold text-sm lg:text-3xl lg:font-bold">₹{currentProperty?.rent?.toLocaleString()}</div>
                      <div className="text-white text-xs lg:text-lg opacity-90">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Payment Methods (Desktop) */}
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
                <p className="text-sm text-gray-500">Step 4 of 5</p>
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="px-4 lg:px-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <div className="text-center lg:text-left mb-5 lg:mb-8">
              <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 mb-2">
                Choose payment method
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                Secure and encrypted payment
              </p>
            </div>

            {/* Token Amount Display */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 lg:p-5 mb-4 lg:mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-green-800">Token Amount</span>
                </div>
                <span className="text-lg font-semibold text-green-800">₹5,000</span>
              </div>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-3 mb-6 lg:mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${selectedPaymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === method.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                      }`}>
                      {selectedPaymentMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>

                    {/* Payment Method Icon */}
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {method.icon}
                    </div>

                    {/* Payment Method Details */}
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 text-sm">{method.name}</div>
                      <div className="text-gray-600 text-xs">{method.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 lg:p-5 mb-6 lg:mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <div className="font-semibold text-blue-900 text-sm mb-1">Secure Payment</div>
                  <div className="text-blue-800 text-xs opacity-80">
                    Your payment information is encrypted and secure
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="fixed lg:relative bottom-0 left-0 right-0 p-4 lg:p-8 bg-white border-t lg:border-t-0 border-gray-100">
            <button
              onClick={handleContinue}
              disabled={isContinueDisabled}
              className={`w-full py-3.5 lg:py-4 rounded-xl text-sm lg:text-base font-semibold transition-colors ${isContinueDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
            >
              {isProcessingPayment ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                selectedPaymentMethod === 'cash' ? 'Continue' : 'Pay Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStep3; 