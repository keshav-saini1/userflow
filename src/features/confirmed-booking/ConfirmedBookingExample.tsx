import React from 'react';
import ConfirmedBookingPage from './pages/ConfirmedBookingPage';
import { sampleConfirmedBookingData } from './data/sampleData';

const ConfirmedBookingExample: React.FC = () => {
  const handleBackClick = () => {
    console.log('Back clicked');
  };

  const handleShareClick = () => {
    console.log('Share clicked');
  };

  const handleSendReminder = () => {
    console.log('Send reminder clicked');
  };

  const handlePayNow = () => {
    console.log('Pay now clicked');
  };

  const handleViewAllPayments = () => {
    console.log('View all payments clicked');
  };

  const handleSupportAction = (action: 'chat' | 'call') => {
    console.log('Support action clicked:', action);
  };

  const handleExploreCommute = () => {
    console.log('Explore commute clicked');
  };

  return (
    <div className="w-full max-w-[412px] mx-auto">
      <ConfirmedBookingPage
        data={sampleConfirmedBookingData}
        onBackClick={handleBackClick}
        onShareClick={handleShareClick}
        onSendReminder={handleSendReminder}
        onModifyBooking={() => { console.log('Modify booking clicked'); }}
        onRequestRefund={() => { console.log('Request refund clicked'); }}
        onPayNow={handlePayNow}
        onViewAllPayments={handleViewAllPayments}
        onSupportAction={handleSupportAction}
        onExploreCommute={handleExploreCommute}
      />
    </div>
  );
};

export default ConfirmedBookingExample; 