export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface PropertyPricing {
  currentPrice: number;
  originalPrice?: number;
  savingsAmount?: number;
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
  location?: string;
  availableFrom?: string;
  status?: 'available' | 'booked';
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

// Property Details Page Types
export interface PropertyUnit {
  id: string;
  name: string;
  floor: number;
  pricePerBed: number;
  occupancy: string;
  amenities: string[];
  availableFrom: string;
  image: string;
}

export interface RentalDetails {
  weeklyRate: {
    min: number;
    max: number;
  };
  dailyRate: {
    min: number;
    max: number;
  };
  lockInPeriod: string;
  stayDuration: string;
  noticePeriod: string;
  deposit: number;
}

export interface FurnitureItem {
  id: string;
  name: string;
  icon: string;
  category: 'furniture' | 'appliances';
}

export interface IncludedService {
  id: string;
  name: string;
}

export interface AddOnService {
  id: string;
  name: string;
  price: string;
}

export interface PolicyRule {
  id: string;
  rule: string;
}

export interface PropertyPhoto {
  id: string;
  category: string;
  url: string;
}

export interface PropertyVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export interface PropertyDetailPageData {
  id: string;
  title: string;
  type: string;
  tags: string[];
  heroImages: string[];
  pricing: PropertyPricing;
  deposit: number;
  availableUnits: PropertyUnit[];
  rentalDetails: RentalDetails;
  description: string;
  highlights: string[];
  furniture: FurnitureItem[];
  appliances: FurnitureItem[];
  includedServices: IncludedService[];
  addOnServices: AddOnService[];
  location: {
    area: string;
    city: string;
    mapImage: string;
  };
  photos: PropertyPhoto[];
  videos: PropertyVideo[];
  policies: PolicyRule[];
  marketingDescription: string;
} 