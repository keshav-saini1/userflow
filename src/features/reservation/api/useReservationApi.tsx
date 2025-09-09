import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

export interface PropertyAddress {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PropertyDetailsData {
  id: string;
  propertyName: string;
  propertyAddress: PropertyAddress;
  rent: number;
  image: string;
  pg_id: string;
  pg_number: string;
  min_token_amount: number;
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

export interface PropertyDetailsResponse {
  status: number;
  message: string;
  data: PropertyDetailsData;
}

export interface GetPropertyDetailsRequest {
  propertyId: string;
  roomId?: string;
}

async function getPropertyDetails({ propertyId, roomId }: GetPropertyDetailsRequest): Promise<PropertyDetailsResponse> {
  const params = roomId ? { room_id: roomId } : {};
  const response = await api.get<PropertyDetailsResponse>(`/property/${propertyId}/details`, { params });
  return response.data;
}

export function useReservationApi() {
  const getPropertyDetailsMutation = useMutation({
    mutationKey: ['reservation', 'property-details'],
    mutationFn: getPropertyDetails,
  });

  return {
    // Property Details
    getPropertyDetails: getPropertyDetailsMutation.mutateAsync,
    getPropertyDetailsStatus: getPropertyDetailsMutation.status,
    isGettingPropertyDetails: getPropertyDetailsMutation.isPending,
    getPropertyDetailsError: getPropertyDetailsMutation.error as unknown as Error | null,
    getPropertyDetailsData: getPropertyDetailsMutation.data,
  };
}

export const ReservationApi = {
  getPropertyDetails,
};