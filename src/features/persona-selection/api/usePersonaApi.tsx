import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

// API Functions
async function getTenantDetails(): Promise<any> {
  const response = await api.get('/tenant/unified/details');
  return response.data;
}

async function getPropertyDetails(requestData: { propertyId: string }): Promise<any> {
  const { propertyId } = requestData;
  const response = await api.get(`/property/${propertyId}/details`);
  return response.data;
}

// Custom Hook
export function usePersonaApi() {
  const getTenantDetailsMutation = useMutation({
    mutationKey: ['persona', 'tenant-details'],
    mutationFn: getTenantDetails,
  });

  const getPropertyDetailsMutation = useMutation({
    mutationKey: ['persona', 'property-details'],
    mutationFn: getPropertyDetails,
  });

  return {
    // Tenant Details
    getTenantDetails: getTenantDetailsMutation.mutateAsync,
    getTenantDetailsStatus: getTenantDetailsMutation.status,
    isGettingTenantDetails: getTenantDetailsMutation.isPending,
    getTenantDetailsError: getTenantDetailsMutation.error as unknown as Error | null,
    getTenantDetailsData: getTenantDetailsMutation.data,

    // Property Details
    getPropertyDetails: getPropertyDetailsMutation.mutateAsync,
    getPropertyDetailsStatus: getPropertyDetailsMutation.status,
    isGettingPropertyDetails: getPropertyDetailsMutation.isPending,
    getPropertyDetailsError: getPropertyDetailsMutation.error as unknown as Error | null,
    getPropertyDetailsData: getPropertyDetailsMutation.data,
  };
}

export const PersonaApi = {
  getTenantDetails,
  getPropertyDetails,
};
