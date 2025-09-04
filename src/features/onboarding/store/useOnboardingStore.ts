import { create } from 'zustand';
import { OnboardingApi, type PropertyPageData, type PublicPropertyResponse } from '../api/useOnboardingApi';

interface OnboardingState {
  // Public Property Data
  propertyData: PublicPropertyResponse['data'] | null;
  pageData: PropertyPageData | null;
  isLoadingProperty: boolean;
  propertyError: string | null;
  
  // Actions
  fetchPublicProperty: (eazypgId: string) => Promise<void>;
  clearPropertyData: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  // Initial state
  propertyData: null,
  pageData: null,
  isLoadingProperty: false,
  propertyError: null,

  // Actions
  fetchPublicProperty: async (eazypgId: string) => {
    set({ isLoadingProperty: true, propertyError: null });
    
    try {
      const response = await OnboardingApi.getPublicProperty(eazypgId);
      
      if (response?.data) {
        const propertyData = response.data;
        const pageData = propertyData.pageData ? JSON.parse(propertyData.pageData) : null;
        
        // Store property ID in localStorage
        localStorage.setItem('selectedPropertyId', propertyData.id);
        
        set({
          propertyData,
          pageData,
          isLoadingProperty: false,
          propertyError: null,
        });
      } else {
        throw new Error('No property data received');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch property data';
      set({
        propertyData: null,
        pageData: null,
        isLoadingProperty: false,
        propertyError: errorMessage,
      });
    }
  },

  clearPropertyData: () => {
    set({
      propertyData: null,
      pageData: null,
      isLoadingProperty: false,
      propertyError: null,
    });
    localStorage.removeItem('selectedPropertyId');
  },
}));
