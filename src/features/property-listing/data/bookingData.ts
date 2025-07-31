export interface Booking {
  id: string;
  propertyName: string;
  location: string;
  status: 'active' | 'completed' | 'upcoming';
  bookingType: 'visit' | 'live-tour' | 'call' | 'reservation';
  scheduledDate: string;
  scheduledTime: string;
  bookingId?: string;
  image: string;
}

export const bookingData: Booking[] = [
  {
    id: 'booking-1',
    propertyName: 'Nirvana Rooms Cyber City',
    location: 'Iffco Chowk, Gurgaon',
    status: 'active',
    bookingType: 'visit',
    scheduledDate: 'Jan 15, 2025',
    scheduledTime: '03:00 PM - 04:00 PM',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  },
  {
    id: 'booking-2',
    propertyName: 'Nirvana Rooms Cyber City',
    location: 'Iffco Chowk, Gurgaon',
    status: 'active',
    bookingType: 'live-tour',
    scheduledDate: 'Jan 15, 2025',
    scheduledTime: '03:00 PM - 04:00 PM',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  },
  {
    id: 'booking-3',
    propertyName: 'Nirvana Rooms Cyber City',
    location: 'Iffco Chowk, Gurgaon',
    status: 'completed',
    bookingType: 'reservation',
    scheduledDate: 'Jan 15, 2025',
    scheduledTime: '03:00 PM - 04:00 PM',
    bookingId: 'NR2025001',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  },
  {
    id: 'booking-4',
    propertyName: 'Nirvana Rooms Cyber City',
    location: 'Iffco Chowk, Gurgaon',
    status: 'upcoming',
    bookingType: 'call',
    scheduledDate: 'Jan 15, 2025',
    scheduledTime: '03:00 PM - 04:00 PM',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  }
]; 