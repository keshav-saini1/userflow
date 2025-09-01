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

async function postGetOtp(payload: GetOtpRequest): Promise<ApiResponse<GetOtpResponse>> {
  const { data } = await api.post<ApiResponse<GetOtpResponse>>('/tenant/unified/otp/send', payload);
  return data;
}

async function postVerifyOtp(payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
  const { data } = await api.post<ApiResponse<VerifyOtpResponse>>('/tenant/unified/otp/verify', payload);
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
  };
}

export const OnboardingApi = {
  getOtp: postGetOtp,
  verifyOtp: postVerifyOtp,
};
