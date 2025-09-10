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
  property_address: any;
  property_image: string;
  pg_id: string;
  pg_number: string;
}

export interface GetBookingDetailsRequest {
  propertyId: string;
}

export interface BookingDetailsResponse {
  status: number;
  message: string;
  data: BookingDetailsData;
}

// Tenant Passbook Types
export interface GetTenantPassbookRequest {
  pg_id: string;
  pg_number: string;
  tenant_id: string;
  source: string;
}

// Payment Entry Types
export interface PaymentEntry {
  id: string;
  amount: string | number;
  due_type: string;
  due_date: string;
  description: string;
  type: 'collection' | 'due';
  paid_date?: string;
  status?: number;
  receipt_url?: string;
  payment_mode?: number;
}

// Collection Item from API
export interface CollectionItem {
  id: string;
  amount: string;
  due_type: string;
  due_date: string;
  paid_date: string;
  description: string;
  status: number;
  receipt_url?: string;
  payment_mode?: number;
  pdf_link?: string;
}

// Due Item from API
export interface DueItem {
  id: string;
  amount: string;
  due_type: string;
  due_date: string;
  description: string;
  status: number;
}

export interface TenantPassbookData {
  dues: DueItem[];
  collection: CollectionItem[];
  total_dues_amount: number;
  total_collection_amount: number;
  isPartialPayment: boolean;
  upi_intent: string;
  tenant_credits: any[];
  credit_amount: number;
  most_recent_credit_time: number;
  most_recent_credit_amount: number;
  redeemed_amount: number;
  used_credits: any[];
  unscratched_credits: any[];
  owner_credits: any[];
  total_security_deposit_amount: number;
  total_security_deposit_returned_amount: number;
  total_owner_credits: number;
}

export interface TenantPassbookResponse {
  status: number;
  message: string;
  data: TenantPassbookData;
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

async function getTenantPassbook(requestData: GetTenantPassbookRequest): Promise<TenantPassbookResponse> {
  const { pg_id, pg_number, tenant_id, source } = requestData;
  const response = await api.post<TenantPassbookResponse>('/tenant/getTenantPassbookForTenantApp/', {
    pg_id,
    pg_number,
    tenant_id,
    source
  });
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

  const getTenantPassbookMutation = useMutation({
    mutationKey: ['confirmed-booking', 'tenant-passbook'],
    mutationFn: getTenantPassbook,
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

    // Tenant Passbook
    getTenantPassbook: getTenantPassbookMutation.mutateAsync,
    getTenantPassbookStatus: getTenantPassbookMutation.status,
    isGettingTenantPassbook: getTenantPassbookMutation.isPending,
    getTenantPassbookError: getTenantPassbookMutation.error as unknown as Error | null,
    getTenantPassbookData: getTenantPassbookMutation.data,
  };
}

export const ConfirmedBookingApi = {
  getPropertyDetails,
  getBookingDetails,
  getTenantPassbook,
};
