import React from 'react';
import { ReservationProvider } from '../context/ReservationContext';
import ReservationFlow from '../components/ReservationFlow';

const ReservationPage: React.FC = () => {
  return (
    <ReservationProvider>
      <ReservationFlow />
    </ReservationProvider>
  );
};

export default ReservationPage; 