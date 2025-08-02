import { create } from 'zustand';
import type { FilterState } from '../types';

interface FilterStore {
  // Filter state
  filterState: FilterState;
  selectedLocations: string[];
  selectedAreas: string[];
  
  // Actions
  updateFilter: (updates: Partial<FilterState>) => void;
  setSelectedLocations: (locations: string[]) => void;
  setSelectedAreas: (areas: string[]) => void;
  resetFilter: () => void;
}

const initialFilterState: FilterState = {
  location: 'Bangalore',
  dateRange: {
    startDate: '',
    endDate: ''
  },
  priceRange: {
    min: 0,
    max: 50000
  },
  roomType: [],
  amenities: [],
  occupancy: 'Single Occupancy',
  moveInDate: '',
  sharingType: 'Single Sharing',
  gender: 'Male',
  budgetRange: { min: 8000, max: 25000 },
  securityDeposit: '15 Days',
  residentType: 'Student'
};

export const useFilterStore = create<FilterStore>((set) => ({
  // Initial state
  filterState: initialFilterState,
  selectedLocations: [],
  selectedAreas: [],

  // Actions
  updateFilter: (updates) =>
    set((state) => ({
      filterState: { ...state.filterState, ...updates }
    })),

  setSelectedLocations: (locations) =>
    set({ selectedLocations: locations }),

  setSelectedAreas: (areas) =>
    set({ selectedAreas: areas }),

  resetFilter: () =>
    set({
      filterState: initialFilterState,
      selectedLocations: [],
      selectedAreas: []
    })
})); 