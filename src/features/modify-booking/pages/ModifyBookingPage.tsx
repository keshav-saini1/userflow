import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { BookingCard, ModifyOption, CancelBookingModal } from '../components';
import { sampleBookingDetails, modifyBookingOptions } from '../data/sampleData';
import type { ModifyBookingOption } from '../types';
import { useNavigate } from 'react-router';
import default_back from '@/assets/default_back.svg';
import AddOnServicesBottomSheet from '@/features/property-listing/components/AddOnServicesBottomSheet';

const ModifyBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isAddOnServicesOpen, setIsAddOnServicesOpen] = useState(false);

  const handleOptionClick = (option: ModifyBookingOption) => {
    // Handle navigation to specific modification flow
    if (option.action === 'cancel-booking') {
      setIsCancelModalOpen(true);
    } else if (option.action === 'change-room') {
      // Navigate to change room page
      navigate("/modify-booking/change-room");
    } else if (option.action === 'change-date') {
      // Navigate to update move-in date page
      navigate("/modify-booking/update-movein");
    } else if (option.action === 'add-services') {
      // Open add-on services bottom sheet
      setIsAddOnServicesOpen(true);
    } else {
      console.log('Selected option:', option.action);
    }
  };

  const handleBackClick = () => {
    // Handle back navigation
    navigate("/bookings");
  };

  const handleSendReminder = () => {
    // Handle send reminder action
    console.log('Send reminder clicked');
  };

  const handleKeepBooking = () => {
    setIsCancelModalOpen(false);
    console.log('Keep booking clicked');
  };

  const handleConfirmCancellation = () => {
    setIsCancelModalOpen(false);
    console.log('Confirm cancellation clicked');
    navigate("/modify-booking/cancel-success");
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBackClick}
          >
            <img src={default_back} alt="back" className="w-10 h-10" />
          </button>
          <h1 className="font-semibold text-gray-900 text-base">
            Modify Booking
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Booking Card */}
          <div className="lg:order-1">
            <div className="flex justify-center lg:justify-start">
              <BookingCard booking={sampleBookingDetails} />
            </div>
          </div>

          {/* Right Column - Modification Options */}
          <div className="lg:order-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 hidden lg:block">
              What would you like to modify?
            </h2>
            <div className="space-y-3">
              {modifyBookingOptions.map((option) => (
                <ModifyOption
                  key={option.id}
                  option={option}
                  onClick={handleOptionClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button - Mobile Only */}
      <div className="fixed bottom-4 left-4 right-4 lg:hidden">
        <button
          onClick={handleSendReminder}
          className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <FiSend className="w-4 h-4" />
          Send Reminder
        </button>
      </div>

      {/* Desktop Action Button */}
      <div className="hidden lg:block max-w-4xl mx-auto px-8 pb-8">
        <button
          onClick={handleSendReminder}
          className="w-full max-w-sm bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <FiSend className="w-4 h-4" />
          Send Reminder
        </button>
      </div>

      {/* Cancel Booking Modal */}
      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onKeepBooking={handleKeepBooking}
        onConfirmCancellation={handleConfirmCancellation}
      />

      {/* Add-on Services Bottom Sheet */}
      <AddOnServicesBottomSheet
        isOpen={isAddOnServicesOpen}
        onClose={() => setIsAddOnServicesOpen(false)}
        services={[
          {
            id: '1',
            name: 'Housekeeping',
            price: '₹500/month',
            icon: '🧹'
          },
          {
            id: '2',
            name: 'Wi-Fi',
            price: '₹300/month',
            icon: '📶'
          },
          {
            id: '3',
            name: 'Laundry Service',
            price: '₹200/month',
            icon: '👕'
          },
          {
            id: '4',
            name: 'Gym Access',
            price: '₹800/month',
            icon: '💪'
          }
        ]}
      />
    </div>
  );
};

export default ModifyBookingPage; 