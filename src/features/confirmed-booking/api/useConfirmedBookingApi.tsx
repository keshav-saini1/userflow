import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

// Property Details Types
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

export interface GetPropertyDetailsRequest {
  propertyId: string;
  roomId?: string;
}

export interface PropertyDetailsResponse {
  status: number;
  message: string;
  data: PropertyDetailsData;
}

// Booking Details Types
export interface BookingDetailsData {
  movein_date: string;
  room_id: string | null;
  token_paid: number;
  status: number;
  property_name: string;
}

export interface GetBookingDetailsRequest {
  propertyId: string;
}

export interface BookingDetailsResponse {
  status: number;
  message: string;
  data: BookingDetailsData;
}

// Common API Types
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

// API Functions
async function getPropertyDetails(requestData: GetPropertyDetailsRequest): Promise<PropertyDetailsResponse> {
  const { propertyId, roomId } = requestData;
  const params = roomId ? { roomId } : {};
  const response = await api.get<PropertyDetailsResponse>(`/property/${propertyId}/details`, { params });
  return response.data;
}

async function getBookingDetails(requestData: GetBookingDetailsRequest): Promise<BookingDetailsResponse> {
  const { propertyId } = requestData;
  const response = await api.get<BookingDetailsResponse>(`/tenant/unified/${propertyId}/bookings`);
  return response.data;
}

// Custom Hook
export function useConfirmedBookingApi() {
  const getPropertyDetailsMutation = useMutation({
    mutationKey: ['confirmed-booking', 'property-details'],
    mutationFn: getPropertyDetails,
  });

  const getBookingDetailsMutation = useMutation({
    mutationKey: ['confirmed-booking', 'booking-details'],
    mutationFn: getBookingDetails,
  });

  return {
    // Property Details
    getPropertyDetails: getPropertyDetailsMutation.mutateAsync,
    getPropertyDetailsStatus: getPropertyDetailsMutation.status,
    isGettingPropertyDetails: getPropertyDetailsMutation.isPending,
    getPropertyDetailsError: getPropertyDetailsMutation.error as unknown as Error | null,
    getPropertyDetailsData: getPropertyDetailsMutation.data,

    // Booking Details
    getBookingDetails: getBookingDetailsMutation.mutateAsync,
    getBookingDetailsStatus: getBookingDetailsMutation.status,
    isGettingBookingDetails: getBookingDetailsMutation.isPending,
    getBookingDetailsError: getBookingDetailsMutation.error as unknown as Error | null,
    getBookingDetailsData: getBookingDetailsMutation.data,
  };
}

export const ConfirmedBookingApi = {
  getPropertyDetails,
  getBookingDetails,
};
