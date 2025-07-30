import React from 'react';
import ModifyBookingPage from '../pages/ModifyBookingPage';

const ModifyBookingExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Modify Booking Feature Example
        </h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates the modify booking feature with responsive design.
          The layout adapts from mobile-first to desktop with a two-column layout.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ModifyBookingPage />
        </div>
      </div>
    </div>
  );
};

export default ModifyBookingExample; 