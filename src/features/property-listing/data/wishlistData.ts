import type { PropertyDetails } from '../types';

export const wishlistProperties: PropertyDetails[] = [
  {
    id: 'wishlist-1',
    name: 'Nirvana Deluxe Apartment',
    type: 'deluxe',
    occupancy: 'Room in Flat',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    pricing: {
      currentPrice: 25000,
      period: 'monthly',
      originalPrice: 30000,
      savingsAmount: 5000
    },
    address: {
      
    },
    amenities: [
      { id: '1', name: 'Furnished', icon: 'furniture' },
      { id: '2', name: 'AC', icon: 'ac' },
      { id: '3', name: 'WiFi', icon: 'wifi' },
      { id: '4', name: 'Kitchen', icon: 'kitchen' }
    ],
    isRecommended: true,
    location: 'Near Metro Station',
    availableFrom: 'Available Now',
    status: 'available'
  },
  {
    id: 'wishlist-2',
    name: 'Luxury 2BHK Flat',
    type: 'luxury',
    occupancy: 'Entire Flat',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    pricing: {
      currentPrice: 50000,
      period: 'monthly'
    },
    address: {
      
    },
    amenities: [
      { id: '1', name: 'Furnished', icon: 'furniture' },
      { id: '2', name: 'AC', icon: 'ac' },
      { id: '3', name: 'WiFi', icon: 'wifi' },
      { id: '4', name: 'Kitchen', icon: 'kitchen' },
      { id: '5', name: 'Balcony', icon: 'balcony' }
    ],
    isRecommended: false,
    location: 'Near Unitech Cyber Park',
    availableFrom: 'Available Now',
    status: 'available'
  },
  {
    id: 'wishlist-3',
    name: 'Premium Studio Apartment',
    type: 'studio',
    occupancy: 'Room in Flat',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    pricing: {
      currentPrice: 50000,
      period: 'monthly'
    },
    address: {
      
    },
    amenities: [
      { id: '1', name: 'Furnished', icon: 'furniture' },
      { id: '2', name: 'AC', icon: 'ac' },
      { id: '3', name: 'WiFi', icon: 'wifi' }
    ],
    isRecommended: false,
    location: 'Near Metro Station',
    availableFrom: 'Available from 1/15/2025',
    status: 'available'
  },
  {
    id: 'wishlist-4',
    name: 'Cozy 1BHK Flat',
    type: 'bhk',
    occupancy: 'Entire Flat',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    pricing: {
      currentPrice: 50000,
      period: 'monthly'
    },
    address: {
      
    },
    amenities: [
      { id: '1', name: 'Furnished', icon: 'furniture' },
      { id: '2', name: 'AC', icon: 'ac' },
      { id: '3', name: 'WiFi', icon: 'wifi' },
      { id: '4', name: 'Kitchen', icon: 'kitchen' }
    ],
    isRecommended: false,
    location: 'Near Unitech Cyber Park',
    availableFrom: 'Available Now',
    status: 'booked'
  }
]; 