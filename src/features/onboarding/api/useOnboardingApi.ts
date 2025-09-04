import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

export interface GetOtpRequest {
  tenant_phone: string;
  name: string;
}

export interface VerifyOtpRequest {
  otp: string;
  tenant_phone: string;
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

export interface GetOtpResponse {
  status: number;
  message: string;
  data: {
    requestId: string;
    type: string;
  }
}

export interface VerifyOtpResponse {
  status: number;
  message: string;
  data: {
    verifyResponse: {
      message: string;
      type: string;
    },
    token: string;
  }
}

export interface PropertyAddress {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PropertyFeature {
  title: string;
  description: string;
}

export interface PropertyPageData {
  tagline: string;
  propQuote: string;
  propDescription: string;
  features: PropertyFeature[];
}

export interface PublicPropertyResponse {
  status: number;
  message: string;
  data: {
    id: string;
    propertyName: string;
    propertyAddress: PropertyAddress;
    moveInStatus: string;
    verifiedStatus: boolean;
    propertyTag: string[];
    logo_url: string | null;
    total_tenants_count: number;
    pageData: string; // JSON string that can be parsed to PropertyPageData
  }
}

async function postGetOtp(payload: GetOtpRequest): Promise<any> {
  const { data } = await api.post<any>('/tenant/unified/otp/send', payload);
  return data;
}

async function postVerifyOtp(payload: VerifyOtpRequest): Promise<any> {
  const { data } = await api.post<any>('/tenant/unified/otp/verify', payload);
  return data;
}

async function getPublicProperty(eazypgId: string): Promise<any> {
  const { data } = await api.get<any>(`/property/${eazypgId}/public`);
  return data;
}

export function useOnboardingApi() {
  const getOtpMutation = useMutation({
    mutationKey: ['onboarding', 'get-otp'],
    mutationFn: postGetOtp,
  });

  const verifyOtpMutation = useMutation({
    mutationKey: ['onboarding', 'verify-otp'],
    mutationFn: postVerifyOtp,
  });

  const getPublicPropertyMutation = useMutation({
    mutationKey: ['onboarding', 'public-property'],
    mutationFn: getPublicProperty,
  });

  return {
    // Get OTP
    getOtp: getOtpMutation.mutateAsync,
    getOtpStatus: getOtpMutation.status,
    isGettingOtp: getOtpMutation.isPending,
    getOtpError: getOtpMutation.error as unknown as Error | null,
    getOtpData: getOtpMutation.data,

    // Verify OTP
    verifyOtp: verifyOtpMutation.mutateAsync,
    verifyOtpStatus: verifyOtpMutation.status,
    isVerifyingOtp: verifyOtpMutation.isPending,
    verifyOtpError: verifyOtpMutation.error as unknown as Error | null,
    verifyOtpData: verifyOtpMutation.data,

    // Get Public Property
    getPublicProperty: getPublicPropertyMutation.mutateAsync,
    getPublicPropertyStatus: getPublicPropertyMutation.status,
    isGettingPublicProperty: getPublicPropertyMutation.isPending,
    getPublicPropertyError: getPublicPropertyMutation.error as unknown as Error | null,
    getPublicPropertyData: getPublicPropertyMutation.data,
  };
}

export const OnboardingApi = {
  getOtp: postGetOtp,
  verifyOtp: postVerifyOtp,
  getPublicProperty,
};
