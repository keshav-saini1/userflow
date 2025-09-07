import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { ReservationProvider } from '../context/ReservationContext';
import ReservationFlow from '../components/ReservationFlow';
import { useGetPropertyDetails, usePropertyLoading, usePropertyError } from '../store/useReservationStore';

const ReservationPage: React.FC = () => {
  const getPropertyDetails = useGetPropertyDetails();
  const isLoading = usePropertyLoading();
  const error = usePropertyError();
  const params = useParams();
  const { property_id, room_id } = params;
  
  console.log('Property ID:', property_id, 'Room ID:', room_id);
  console.log('Loading:', isLoading, 'Error:', error);

  useEffect(() => {
    if (!property_id) return;
    
    getPropertyDetails(property_id, room_id).catch((err) => {
      console.error('Failed to fetch property details:', err);
    });
  }, [property_id, room_id, getPropertyDetails]);
  
  return (
    <ReservationProvider>
      <ReservationFlow />
    </ReservationProvider>
  );
};

export default ReservationPage; 