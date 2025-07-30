import type { ConfirmedBookingData } from '../types';

export const sampleConfirmedBookingData: ConfirmedBookingData = {
  bookingDetails: {
    id: 'booking-1',
    roomNumber: 'A-203',
    roomType: 'Premium Deluxe Room',
    moveInDate: '15 Jan 2025',
    status: 'pending',
    tokenPaid: 5000,
    daysUntilMoveIn: 7,
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    roomImage: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop'
  },
  paymentSummary: {
    totalOutstanding: 43000,
    dueDate: '15 Jan',
    items: [
      {
        id: 'rent-1',
        name: 'Rent',
        amount: 43000,
        type: 'rent',
        period: 'From 11 Jul\'25 - 10 Aug\'25',
        isOneTime: false
      },
      {
        id: 'security-1',
        name: 'Security Deposit',
        amount: 43000,
        type: 'security-deposit',
        isOneTime: true
      },
      {
        id: 'joining-1',
        name: 'Joining Fee',
        amount: 43000,
        type: 'joining-fee',
        isOneTime: true
      }
    ]
  },
  supportOptions: [
    {
      id: 'chat-support',
      title: 'Chat with Support',
      description: 'Get instant help from our team',
      icon: '💬',
      iconBgColor: '#b9f8cf',
      action: 'chat'
    },
    {
      id: 'call-support',
      title: 'Call Support',
      description: 'Speak directly with our team',
      icon: '📞',
      iconBgColor: '#bedbff',
      action: 'call'
    }
  ],
  propertyInfo: {
    name: 'Nirvana Rooms',
    location: 'Iffco Chowk, Gurgaon',
    commuteTimes: {
      metro: '15-25 min',
      walk: '2 min walk',
      bus: '5-8 min'
    }
  }
}; 