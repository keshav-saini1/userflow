import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

export interface UpdateTenantRequest {
  property_id: string;
  data: Record<string, any>; // Key-value pairs where keys are database column names
}

export interface UpdateTenantResponse {
  status: number;
  message: string;
  data?: any;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string | number;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

async function updateTenantDetails(requestData: UpdateTenantRequest): Promise<UpdateTenantResponse> {
  const { property_id, data } = requestData;
  const response = await api.patch<UpdateTenantResponse>(`/tenant/unified/${property_id}/update`, data);
  return response.data;
}

export function useTenantApi() {
  const updateTenantMutation = useMutation({
    mutationKey: ['tenant', 'update-details'],
    mutationFn: updateTenantDetails,
  });

  return {
    // Update Tenant Details
    updateTenantDetails: updateTenantMutation.mutateAsync,
    updateTenantStatus: updateTenantMutation.status,
    isUpdatingTenant: updateTenantMutation.isPending,
    updateTenantError: updateTenantMutation.error as unknown as Error | null,
    updateTenantData: updateTenantMutation.data,
  };
}

export const TenantApi = {
  updateTenantDetails,
};
