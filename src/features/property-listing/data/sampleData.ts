import type { PropertyListing } from "../types";

export const samplePropertyListing: PropertyListing = {
  id: 'nirvana-rooms-iffco-chowk',
  heroImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  location: {
    name: 'Nirvana Rooms',
    area: 'Iffco Chowk',
    city: 'Gurgaon',
    rating: 4.8,
    reviewCount: 156,
    nearbySpots: [
      {
        type: 'transport',
        timeEstimate: '15-25 min',
        icon: 'transport'
      },
      {
        type: 'healthcare',
        timeEstimate: '2 min walk',
        icon: 'healthcare'
      },
      {
        type: 'food',
        timeEstimate: '5-8 min',
        icon: 'food'
      }
    ]
  },
  availableUnits: 3,
  totalUnits: 4,
  properties: [
    {
      id: 'premium-deluxe-room',
      name: 'Premium Deluxe Room',
      type: 'deluxe',
      occupancy: 'Single Occupancy',
      pricing: {
        currentPrice: 24000,
        originalPrice: 28000,
        savingsAmount: 4000,
        period: 'per month'
      },
      amenities: [
        {
          id: 'wifi',
          name: 'Premium WiFi 300 Mbps',
          icon: 'wifi'
        },
        {
          id: 'housekeeping',
          name: 'Daily housekeeping',
          icon: 'cleaning'
        },
        {
          id: 'parking',
          name: 'Reserved parking spot',
          icon: 'parking'
        }
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      isRecommended: true
    },
    {
      id: 'comfort-twin-sharing',
      name: 'Comfort Twin Sharing',
      type: 'shared',
      occupancy: 'Twin Sharing',
      pricing: {
        currentPrice: 18000,
        originalPrice: 22000,
        savingsAmount: 4000,
        period: 'per month'
      },
      amenities: [
        {
          id: 'wifi',
          name: 'Premium WiFi 300 Mbps',
          icon: 'wifi'
        },
        {
          id: 'housekeeping',
          name: 'Daily housekeeping',
          icon: 'cleaning'
        },
        {
          id: 'parking',
          name: 'Reserved parking spot',
          icon: 'parking'
        }
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    {
      id: 'executive-suite',
      name: 'Executive Suite',
      type: 'suite',
      occupancy: 'Single Occupancy',
      pricing: {
        currentPrice: 32000,
        originalPrice: 36000,
        savingsAmount: 4000,
        period: 'per month'
      },
      amenities: [
        {
          id: 'wifi',
          name: 'Premium WiFi 300 Mbps',
          icon: 'wifi'
        },
        {
          id: 'housekeeping',
          name: 'Daily housekeeping',
          icon: 'cleaning'
        },
        {
          id: 'parking',
          name: 'Reserved parking spot',
          icon: 'parking'
        }
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    {
      id: 'budget-friendly-room',
      name: 'Budget Friendly Room',
      type: 'budget',
      occupancy: 'Triple Sharing',
      pricing: {
        currentPrice: 15000,
        originalPrice: 18000,
        savingsAmount: 3000,
        period: 'per month'
      },
      amenities: [
        {
          id: 'wifi',
          name: 'WiFi included',
          icon: 'wifi'
        },
        {
          id: 'housekeeping',
          name: 'Bi-weekly housekeeping',
          icon: 'cleaning'
        },
        {
          id: 'parking',
          name: 'Common parking access',
          icon: 'parking'
        }
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    }
  ]
};

export const samplePropertyDetailData = {
  id: 'double-sharing-room-iffco-chowk',
  title: 'Double Sharing Room with Attached Washroom',
  type: 'Double Sharing',
  tags: ['Double Sharing', 'Room'],
  heroImages: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop'
  ],
  pricing: {
    currentPrice: 24000,
    originalPrice: 28000,
    savingsAmount: 4000,
    period: 'monthly'
  },
  deposit: 50000,
  availableUnits: [
    {
      id: 'A-205',
      name: 'A-205',
      floor: 2,
      pricePerBed: 12000,
      occupancy: 'Double Sharing',
      amenities: ['Private Washroom', 'AC', 'WIFI'],
      availableFrom: 'Available From 30 Jul\'25',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    {
      id: 'A-204',
      name: 'A-204',
      floor: 2,
      pricePerBed: 12000,
      occupancy: 'Double Sharing',
      amenities: ['Private Washroom', 'AC', 'WIFI'],
      availableFrom: 'Available Now',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    }
  ],
  rentalDetails: {
    weeklyRate: { min: 4000, max: 4500 },
    dailyRate: { min: 600, max: 750 },
    lockInPeriod: '30 Days',
    stayDuration: '6 Months',
    noticePeriod: '15 Days',
    deposit: 50000
  },
  description: 'This is a spacious double sharing room located in a corner unit, featuring a master bedroom layout that offers privacy and comfort...',
  highlights: ['Master Bedroom', 'Corner Room', 'Compact', 'Balcony Attached'],
  furniture: [
    { id: 'bed', name: 'Bed', icon: '🛏️', category: 'furniture' as const },
    { id: 'table', name: 'Table', icon: '🪑', category: 'furniture' as const },
    { id: 'wardrobe', name: 'Wardrobe', icon: '🚪', category: 'furniture' as const },
    { id: 'tv', name: 'TV', icon: '📺', category: 'furniture' as const },
    { id: 'sofa', name: 'Sofa', icon: '🛋️', category: 'furniture' as const }
  ],
  appliances: [
    { id: 'refrigerator', name: 'Refrigerator', icon: '❄️', category: 'appliances' as const },
    { id: 'washing-machine', name: 'Washing Machine', icon: '🧺', category: 'appliances' as const },
    { id: 'ac', name: 'AC', icon: '❄️', category: 'appliances' as const },
    { id: 'microwave', name: 'Microwave', icon: '📱', category: 'appliances' as const }
  ],
  includedServices: [
    { id: 'meals', name: 'All meals food inclusion' },
    { id: 'housekeeping', name: 'Daily housekeeping' },
    { id: 'internet', name: 'Monthly internet service' },
    { id: 'laundry', name: 'Weekly laundry service' }
  ],
  addOnServices: [
    { id: 'gym', name: 'Gym', price: 'Starts from ₹1,800/Monthly' },
    { id: 'wifi', name: 'WiFi', price: '₹470/Monthly' },
    { id: 'clubhouse', name: 'Clubhouse Access', price: '₹20k/Yearly' }
  ],
  location: {
    area: 'Iffco Chowk',
    city: 'Gurgaon',
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop'
  },
  photos: [
    { id: 'bedroom', category: 'Bedroom photos', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop' },
    { id: 'bathroom', category: 'Bathroom photos', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop' },
    { id: 'kitchen', category: 'Kitchen photos', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
    { id: 'living', category: 'Living Area photos', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' }
  ],
  videos: [
    { id: 'room-tour-1', title: 'Room Tour 1', thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop', url: '#' },
    { id: 'room-tour-2', title: 'Room Tour 2', thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', url: '#' }
  ],
  policies: [
    { id: 'quiet-hours', rule: 'Quiet hours between 10:00 pm to 06:00 am' },
    { id: 'no-opposite-gender', rule: 'Opposite gender guests are not allowed' },
    { id: 'no-smoking', rule: 'Smoking is strictly prohibited' }
  ],
  marketingDescription: 'This is a spacious double sharing room located in a corner unit, featuring a master bedroom layout that offers privacy and comfort. Perfectly suited for families and working professionals seeking a comfortable living space.'
}; 