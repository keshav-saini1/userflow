import type { ModifyBookingDetails, ModifyBookingOption } from '../types';

export const sampleBookingDetails: ModifyBookingDetails = {
  id: 'BK001',
  propertyName: 'Nirvana Rooms - Sector 50',
  roomNumber: 'A-203',
  roomType: 'Premium Delux Room',
  moveInDate: '2025-01-15',
  monthlyRent: 15000,
  status: 'pending',
  propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
};

export const modifyBookingOptions: ModifyBookingOption[] = [
  // {
  //   id: 'change-room',
  //   title: 'Change Room',
  //   description: 'Switch to a different room',
  //   icon: '🏠',
  //   iconBgColor: 'bg-blue-50',
  //   action: 'change-room'
  // },
  {
    id: 'change-date',
    title: 'Change Move-in Date',
    description: 'Request a different move-in date',
    icon: '📅',
    iconBgColor: 'bg-green-50',
    action: 'change-date'
  },
  {
    id: 'add-services',
    title: 'Add-on Services',
    description: 'Enhance your stay with additional services',
    icon: '✨',
    iconBgColor: 'bg-purple-50',
    action: 'add-services'
  },
  {
    id: 'cancel-booking',
    title: 'Cancel Booking',
    description: 'Cancel your reservation and request refund',
    icon: '❌',
    iconBgColor: 'bg-red-50',
    action: 'cancel-booking'
  }
]; 