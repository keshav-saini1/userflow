import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
// Keep types open/relaxed – adapt as backend types become available
export type PropertiesResponse = unknown;
export type RentalOptionsResponse = unknown;

// Small helpers to fetch data via the shared axios instance (`@/api/axios`)
async function fetchRentalOptions(propertyId: string): Promise<PropertiesResponse> {
  const { data } = await api.get(`/property/${propertyId}/list`);
  return data;
}

async function fetchRentalOptionDetails(propertyId: string, optionType: string): Promise<RentalOptionsResponse> {
  const { data } = await api.get(`/property/rental_option/${propertyId}/${optionType}`);
  return data;
}

// API-style hook similar to useOnboardingApi.ts
// Provides imperative functions with statuses using useMutation
export function usePropertyListingApi() {
  const getPropertyListMutation = useMutation({
    mutationKey: ["property", "list"],
    mutationFn: (propertyId: string) => fetchRentalOptions(propertyId),
  });

  const getRentalOptionDetailsMutation = useMutation({
    mutationKey: ["property", "rental-option", "details"],
    mutationFn: ({ propertyId, optionType }: { propertyId: string; optionType: string }) =>
      fetchRentalOptionDetails(propertyId, optionType),
  });

  return {
    // Get Property List (rental options list for a property)
    getPropertyList: getPropertyListMutation.mutateAsync,
    getPropertyListStatus: getPropertyListMutation.status,
    isGettingPropertyList: getPropertyListMutation.isPending,
    getPropertyListError: getPropertyListMutation.error as unknown as Error | null,
    getPropertyListData: getPropertyListMutation.data,

    // Get Rental Option Details (for a given type)
    getRentalOptionDetails: getRentalOptionDetailsMutation.mutateAsync,
    getRentalOptionDetailsStatus: getRentalOptionDetailsMutation.status,
    isGettingRentalOptionDetails: getRentalOptionDetailsMutation.isPending,
    getRentalOptionDetailsError: getRentalOptionDetailsMutation.error as unknown as Error | null,
    getRentalOptionDetailsData: getRentalOptionDetailsMutation.data,
  };
}

// Direct API accessors (useful outside React or for simple calls)
export const PropertyListingApi = {
  getPropertyList: fetchRentalOptions,
  getRentalOptionDetails: fetchRentalOptionDetails,
};


