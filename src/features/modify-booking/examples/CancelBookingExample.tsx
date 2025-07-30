import React, { useState } from 'react';
import CancelBookingModal from '../components/CancelBookingModal';

const CancelBookingExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeepBooking = () => {
    setIsModalOpen(false);
    console.log('Keep booking clicked');
  };

  const handleConfirmCancellation = () => {
    setIsModalOpen(false);
    console.log('Confirm cancellation clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Cancel Booking Modal Example
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Test the Cancel Booking Modal
          </h2>
          
          <p className="text-gray-600 mb-6">
            Click the button below to open the cancel booking modal. 
            On mobile, it appears as a bottom sheet. On desktop, it appears as a modal.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-red-700 transition-colors"
          >
            Open Cancel Booking Modal
          </button>
        </div>

        <CancelBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onKeepBooking={handleKeepBooking}
          onConfirmCancellation={handleConfirmCancellation}
        />
      </div>
    </div>
  );
};

export default CancelBookingExample; 