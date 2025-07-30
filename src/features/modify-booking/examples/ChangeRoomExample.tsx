import React from 'react';
import ChangeRoomPage from '../pages/ChangeRoomPage';

const ChangeRoomExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Change Room Feature Example
        </h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates the change room feature with responsive design.
          The layout shows current booking details and available room options.
        </p>
        
        <ChangeRoomPage />
      </div>
    </div>
  );
};

export default ChangeRoomExample; 