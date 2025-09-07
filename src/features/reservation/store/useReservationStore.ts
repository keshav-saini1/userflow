import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReservationApi, type PropertyDetailsResponse, type PropertyDetailsData } from '../api/useReservationApi';

interface PropertyCache {
  [key: string]: {
    data: PropertyDetailsData;
    timestamp: number;
    expiresIn: number; // in milliseconds
  };
}

interface ReservationStore {
  // Property data cache
  propertyCache: PropertyCache;
  currentProperty: PropertyDetailsData | null;
  isLoadingProperty: boolean;
  propertyError: string | null;

  // Actions
  getPropertyDetails: (propertyId: string, roomId?: string) => Promise<PropertyDetailsData>;
  clearPropertyCache: () => void;
  clearCurrentProperty: () => void;
  setCurrentProperty: (property: PropertyDetailsData) => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Generate cache key for property + room combination
const getCacheKey = (propertyId: string, roomId?: string): string => {
  return roomId ? `${propertyId}-${roomId}` : propertyId;
};

// Check if cached data is still valid
const isCacheValid = (timestamp: number, expiresIn: number): boolean => {
  return Date.now() - timestamp < expiresIn;
};

export const useReservationStore = create<ReservationStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      propertyCache: {},
      currentProperty: null,
      isLoadingProperty: false,
      propertyError: null,

      // Get property details with caching
      getPropertyDetails: async (propertyId: string, roomId?: string) => {
        const cacheKey = getCacheKey(propertyId, roomId);
        const { propertyCache } = get();
        
        // Check if we have valid cached data
        const cachedData = propertyCache[cacheKey];
        if (cachedData && isCacheValid(cachedData.timestamp, cachedData.expiresIn)) {
          console.log('Using cached property data for:', cacheKey);
          set({ currentProperty: cachedData.data, propertyError: null });
          return cachedData.data;
        }

        // Set loading state
        set({ isLoadingProperty: true, propertyError: null });

        try {
          console.log('Fetching property data for:', cacheKey);
          const response: PropertyDetailsResponse = await ReservationApi.getPropertyDetails({
            propertyId,
            roomId,
          });

          const propertyData = response.data;

          // Update cache
          const newCache = {
            ...propertyCache,
            [cacheKey]: {
              data: propertyData,
              timestamp: Date.now(),
              expiresIn: CACHE_DURATION,
            },
          };

          // Update state
          set({
            propertyCache: newCache,
            currentProperty: propertyData,
            isLoadingProperty: false,
            propertyError: null,
          });

          return propertyData;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch property details';
          console.error('Error fetching property details:', error);
          
          set({
            isLoadingProperty: false,
            propertyError: errorMessage,
            currentProperty: null,
          });

          throw error;
        }
      },

      // Clear all cached property data
      clearPropertyCache: () => {
        set({ propertyCache: {} });
      },

      // Clear current property
      clearCurrentProperty: () => {
        set({ currentProperty: null, propertyError: null });
      },

      // Set current property manually
      setCurrentProperty: (property: PropertyDetailsData) => {
        set({ currentProperty: property, propertyError: null });
      },
    }),
    {
      name: 'reservation-store',
    }
  )
);

// Selector hooks for better performance
export const useCurrentProperty = () => useReservationStore((state) => state.currentProperty);
export const usePropertyLoading = () => useReservationStore((state) => state.isLoadingProperty);
export const usePropertyError = () => useReservationStore((state) => state.propertyError);
export const useGetPropertyDetails = () => useReservationStore((state) => state.getPropertyDetails);
export const useClearPropertyCache = () => useReservationStore((state) => state.clearPropertyCache);
