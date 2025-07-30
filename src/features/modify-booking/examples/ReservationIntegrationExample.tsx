import React from 'react';
import ChangeRoomPage from '../pages/ChangeRoomPage';

const ReservationIntegrationExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Reservation Integration Example
        </h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates the integration between the modify-booking and reservation flows.
          Click "Request Change" on any room option to start the reservation flow for that room.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-blue-900 mb-2">How it works:</h2>
          <ol className="text-blue-800 text-sm space-y-1">
            <li>1. Select a room option from the list</li>
            <li>2. Click "Request Change" button</li>
            <li>3. Room data is stored in sessionStorage</li>
            <li>4. Navigation to reservation flow begins</li>
            <li>5. Reservation flow loads with selected room data</li>
          </ol>
        </div>
        
        <ChangeRoomPage />
      </div>
    </div>
  );
};

export default ReservationIntegrationExample; 