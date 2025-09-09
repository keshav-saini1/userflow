import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useReservation } from '../context/ReservationContext';
import { usePaymentApi } from '../api/usePaymentApi';
import ReservationStep1 from './ReservationStep1';
import ReservationStep2 from './ReservationStep2';
import ReservationStep3 from './ReservationStep3';
import ReservationStep4 from './ReservationStep4';

const ReservationFlow: React.FC = () => {
  const { form, goToStep } = useReservation();
  const [searchParams] = useSearchParams();
  const { confirmPaymentByOrderId, isConfirmingPayment, confirmPaymentError, confirmPaymentData } = usePaymentApi();

  // Handle payment confirmation when orderId is present in URL
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      confirmPaymentByOrderId({ order_id: orderId });
    }
  }, [searchParams.get('orderId')]);

  useEffect(() => {
    if (confirmPaymentData) {
      console.log({ confirmPaymentData })
      goToStep(4);
    }
  }, [confirmPaymentData]);

  const renderStep = () => {
    switch (form.currentStep) {
      case 1:
        return <ReservationStep1 />;
      case 2:
        return <ReservationStep2 />;
      case 3:
        return <ReservationStep3 />;
      case 4:
        return <ReservationStep4 />;
      default:
        return <ReservationStep1 />;
    }
  };

  // Show loading state while confirming payment
  if (isConfirmingPayment) {
    return (
      <div className="min-h-screen bg-white w-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  // Show error state if payment confirmation failed
  if (confirmPaymentError) {
    return (
      <div className="min-h-screen bg-white w-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Confirmation Failed</h2>
          <p className="text-gray-600 mb-4">We couldn't confirm your payment. Please try again or contact support.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-screen">
      {renderStep()}
    </div>
  );
};

export default ReservationFlow; 