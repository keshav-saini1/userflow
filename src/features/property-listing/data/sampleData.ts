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
        currency: 'INR',
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
        currency: 'INR',
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
        currency: 'INR',
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
        currency: 'INR',
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