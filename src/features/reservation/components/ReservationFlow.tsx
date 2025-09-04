import React from 'react';
import { useReservation } from '../context/ReservationContext';
import ReservationStep1 from './ReservationStep1';
import ReservationStep2 from './ReservationStep2';
import ReservationStep3 from './ReservationStep3';
import ReservationStep4 from './ReservationStep4';

const ReservationFlow: React.FC = () => {
  const { form } = useReservation();

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

  return (
    <div className="min-h-screen bg-white w-screen">
      {renderStep()}
    </div>
  );
};

export default ReservationFlow; 