export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface PropertyPricing {
  currentPrice: number;
  originalPrice?: number;
  savingsAmount?: number;
  currency: string;
  period: string;
}

export interface PropertyDetails {
  id: string;
  name: string;
  type: string;
  occupancy: string;
  pricing: PropertyPricing;
  amenities: PropertyAmenity[];
  image: string;
  isRecommended?: boolean;
}

export interface NearbySpot {
  type: 'transport' | 'healthcare' | 'food';
  timeEstimate: string;
  icon: string;
}

export interface PropertyLocation {
  name: string;
  area: string;
  city: string;
  rating: number;
  reviewCount: number;
  nearbySpots: NearbySpot[];
}

export interface PropertyListing {
  id: string;
  heroImage: string;
  location: PropertyLocation;
  availableUnits: number;
  totalUnits: number;
  properties: PropertyDetails[];
} 