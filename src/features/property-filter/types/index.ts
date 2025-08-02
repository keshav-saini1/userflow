export interface FilterState {
  location: string;
  dateRange: { startDate: string; endDate: string; };
  priceRange: { min: number; max: number; };
  roomType: string[];
  amenities: string[];
  occupancy: string;
  moveInDate: string;
  sharingType: string;
  gender: string;
  budgetRange: { min: number; max: number; };
  securityDeposit: string;
  residentType: string;
}

export interface PropertyCard {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  distance: string;
  availableFrom: string;
}

export interface FilterStepProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (data: Partial<FilterState>) => void;
  currentStep: number;
  filterData: FilterState;
}

export interface FilterContextType {
  filterState: FilterState;
  updateFilter: (updates: Partial<FilterState>) => void;
  resetFilter: () => void;
  applyFilter: () => void;
} 