import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PropertyListing, PropertyDetailPageData } from '../types';

export interface PropertyStore {
  // Property Listing Data
  propertyListing: PropertyListing | null;
  isLoadingPropertyList: boolean;
  propertyListError: string | null;
  
  // Property Details Data
  propertyDetails: PropertyDetailPageData | null;
  isLoadingPropertyDetails: boolean;
  propertyDetailsError: string | null;
  
  // Current Selection
  selectedPropertyId: string | null;
  selectedSharingType: string | null;
  
  // Actions for Property Listing
  setPropertyListing: (listing: PropertyListing) => void;
  setPropertyListLoading: (loading: boolean) => void;
  setPropertyListError: (error: string | null) => void;
  clearPropertyListing: () => void;
  
  // Actions for Property Details
  setPropertyDetails: (details: PropertyDetailPageData) => void;
  setPropertyDetailsLoading: (loading: boolean) => void;
  setPropertyDetailsError: (error: string | null) => void;
  clearPropertyDetails: () => void;
  
  // Actions for Selection
  setSelectedPropertyId: (id: string | null) => void;
  setSelectedSharingType: (type: string | null) => void;
  
  // Combined Actions
  clearAllData: () => void;
  
  // Getters
  getAvailableProperties: () => PropertyListing['properties'] | [];
  getPropertyById: (id: string) => PropertyListing['properties'][0] | null;
  getAvailableUnits: () => PropertyDetailPageData['availableUnits'] | [];
}

export const usePropertyStore = create<PropertyStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      propertyListing: null,
      isLoadingPropertyList: false,
      propertyListError: null,
      
      propertyDetails: null,
      isLoadingPropertyDetails: false,
      propertyDetailsError: null,
      
      selectedPropertyId: null,
      selectedSharingType: null,
      
      // Property Listing Actions
      setPropertyListing: (listing) => 
        set({ propertyListing: listing, propertyListError: null }, false, 'setPropertyListing'),
      
      setPropertyListLoading: (loading) => 
        set({ isLoadingPropertyList: loading }, false, 'setPropertyListLoading'),
      
      setPropertyListError: (error) => 
        set({ propertyListError: error, isLoadingPropertyList: false }, false, 'setPropertyListError'),
      
      clearPropertyListing: () => 
        set({ 
          propertyListing: null, 
          propertyListError: null, 
          isLoadingPropertyList: false 
        }, false, 'clearPropertyListing'),
      
      // Property Details Actions
      setPropertyDetails: (details) => 
        set({ propertyDetails: details, propertyDetailsError: null }, false, 'setPropertyDetails'),
      
      setPropertyDetailsLoading: (loading) => 
        set({ isLoadingPropertyDetails: loading }, false, 'setPropertyDetailsLoading'),
      
      setPropertyDetailsError: (error) => 
        set({ propertyDetailsError: error, isLoadingPropertyDetails: false }, false, 'setPropertyDetailsError'),
      
      clearPropertyDetails: () => 
        set({ 
          propertyDetails: null, 
          propertyDetailsError: null, 
          isLoadingPropertyDetails: false 
        }, false, 'clearPropertyDetails'),
      
      // Selection Actions
      setSelectedPropertyId: (id) => {
        set({ selectedPropertyId: id }, false, 'setSelectedPropertyId');
        // Also update localStorage for persistence
        if (id) {
          localStorage.setItem('selectedPropertyId', id);
        } else {
          localStorage.removeItem('selectedPropertyId');
        }
      },
      
      setSelectedSharingType: (type) => 
        set({ selectedSharingType: type }, false, 'setSelectedSharingType'),
      
      // Combined Actions
      clearAllData: () => 
        set({ 
          propertyListing: null,
          propertyDetails: null,
          propertyListError: null,
          propertyDetailsError: null,
          isLoadingPropertyList: false,
          isLoadingPropertyDetails: false,
          selectedPropertyId: null,
          selectedSharingType: null
        }, false, 'clearAllData'),
      
      // Getters
      getAvailableProperties: () => {
        const { propertyListing } = get();
        return propertyListing?.properties || [];
      },
      
      getPropertyById: (id) => {
        const { propertyListing } = get();
        return propertyListing?.properties?.find(property => property.id === id) || null;
      },
      
      getAvailableUnits: () => {
        const { propertyDetails } = get();
        return propertyDetails?.availableUnits || [];
      },
    }),
    {
      name: 'property-store',
    }
  )
);

// Selectors for better performance
export const usePropertyListing = () => usePropertyStore(state => state.propertyListing);
export const usePropertyDetails = () => usePropertyStore(state => state.propertyDetails);
export const usePropertyListLoading = () => usePropertyStore(state => state.isLoadingPropertyList);
export const usePropertyDetailsLoading = () => usePropertyStore(state => state.isLoadingPropertyDetails);
export const useSelectedPropertyId = () => usePropertyStore(state => state.selectedPropertyId);
export const useSelectedSharingType = () => usePropertyStore(state => state.selectedSharingType);
export const useAvailableProperties = () => usePropertyStore(state => state.getAvailableProperties());
export const useAvailableUnits = () => usePropertyStore(state => state.getAvailableUnits());

// Initialize store with localStorage data on app start
export const initializePropertyStore = () => {
  const storedPropertyId = localStorage.getItem('selectedPropertyId');
  if (storedPropertyId) {
    usePropertyStore.getState().setSelectedPropertyId(storedPropertyId);
  }
};
