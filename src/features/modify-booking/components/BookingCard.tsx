import React from 'react';

interface BookingCardProps {
  booking: any;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Early return if booking data is not available
  if (!booking) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5 w-full max-w-sm lg:max-w-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-20"></div>
          <div className="flex gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'pending':
      case 'lead':
      case 'invite':
        return 'bg-orange-50 text-orange-700';
      case 'confirmed':
      case 'approved':
        return 'bg-green-50 text-green-700';
      case 'cancelled':
      case 'deleted tenant':
      case 'deleted invitation':
      case 'deleted lead':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getBookingStatus = (statusCode: number | undefined): 'approved' | 'pending' | 'lead' | 'invite' | 'deleted tenant' | 'deleted invitation' | 'deleted lead' => {
    switch (statusCode) {
      case 1:
        return 'approved';
      case 2:
        return 'pending';
      case 3:
        return 'lead';
      case 4:
        return 'invite';
      case 5:
        return 'deleted tenant';
      case 6:
        return 'deleted invitation';
      case 7:
        return 'deleted lead';
      default:
        return 'pending';
    }
  };

  console.log({ booking })

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 w-full max-w-sm lg:max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(getBookingStatus(booking?.status))}`}>
          {getBookingStatus(booking?.status)}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={booking?.property_image || '/placeholder-property.jpg'}
            alt={booking?.property_name || 'Property'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm lg:text-base leading-tight mb-1">
            {booking.property_name || 'Property Name'}
          </h3>
          {
            booking?.room && (
              <p className="text-gray-600 text-xs lg:text-sm mb-3">
                {booking.roomNumber || 'TBD'} | {booking.roomType || 'Room Type'}
              </p>
            )
          }

          <div className="flex gap-4 text-xs lg:text-sm">
            <div className="flex-1">
              <p className="text-gray-500 mb-1">Move-in Date</p>
              <p className="font-medium text-gray-900">{booking?.movein_date || 'TBD'}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 mb-1">Token Paid</p>
              <p className="font-medium text-gray-900">₹{booking?.token_paid?.toLocaleString() || '0'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard; 