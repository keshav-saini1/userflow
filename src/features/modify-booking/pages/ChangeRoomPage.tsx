import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { BookingCard, RoomOptionCard } from '../components';
import { sampleBookingDetails } from '../data/sampleData';
import { availableRoomOptions } from '../data/roomOptions';

const ChangeRoomPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleBackClick = () => {
    // Handle back navigation
    console.log('Back clicked');
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    console.log('Room selected:', roomId);
  };

  const handleRequestChange = (roomId: string) => {
    console.log('Request change for room:', roomId);
    // Navigate to reservation flow with room data
    const selectedRoom = availableRoomOptions.find(room => room.id === roomId);
    if (selectedRoom) {
      // Store room data in sessionStorage for reservation flow
      sessionStorage.setItem('selectedRoomForReservation', JSON.stringify(selectedRoom));
      // Navigate to reservation page
      window.location.href = '/reservation';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBackClick}
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900 text-base">
            Change Room
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Current Booking */}
          <div className="lg:order-1">
            <div className="flex justify-center lg:justify-start mb-6">
              <BookingCard booking={sampleBookingDetails} />
            </div>
          </div>

          {/* Right Column - Available Options */}
          <div className="lg:order-2">
            <div className="bg-white rounded-xl border border-gray-100 p-5 lg:p-6">
              <h2 className="font-semibold text-gray-900 text-base mb-6">
                Available Options
              </h2>
              
              <div className="space-y-6">
                {availableRoomOptions.map((room) => (
                  <RoomOptionCard
                    key={room.id}
                    room={room}
                    onSelect={handleRoomSelect}
                    onRequestChange={handleRequestChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeRoomPage; 