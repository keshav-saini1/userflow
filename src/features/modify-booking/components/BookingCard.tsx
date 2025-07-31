import React from 'react';
import type { ModifyBookingDetails } from '../types';

interface BookingCardProps {
  booking: ModifyBookingDetails;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 text-orange-700';
      case 'confirmed':
        return 'bg-green-50 text-green-700';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 w-full max-w-sm lg:max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {getStatusText(booking.status)}
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img 
            src={booking.propertyImage} 
            alt={booking.propertyName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm lg:text-base leading-tight mb-1">
            {booking.propertyName}
          </h3>
          <p className="text-gray-600 text-xs lg:text-sm mb-3">
            {booking.roomNumber} | {booking.roomType}
          </p>
          
          <div className="flex gap-4 text-xs lg:text-sm">
            <div className="flex-1">
              <p className="text-gray-500 mb-1">Move-in Date</p>
              <p className="font-medium text-gray-900">{booking.moveInDate}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 mb-1">Monthly Rent</p>
              <p className="font-medium text-gray-900">₹{booking.monthlyRent.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard; 