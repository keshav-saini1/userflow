import React from 'react';
import { UpdateMoveInPage } from '../pages';
import type { ModifyBookingDetails } from '../types';

const UpdateMoveInExample: React.FC = () => {
  // Sample booking details for demonstration
  const sampleBookingDetails: ModifyBookingDetails = {
    id: 'BK001',
    propertyName: 'Premium Private Room',
    roomNumber: 'A-203',
    roomType: 'Premium Private Room',
    moveInDate: '2025-07-07',
    monthlyRent: 8000,
    status: 'pending',
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UpdateMoveInPage bookingDetails={sampleBookingDetails} />
    </div>
  );
};

export default UpdateMoveInExample; 