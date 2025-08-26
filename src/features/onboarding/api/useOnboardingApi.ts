import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

export interface GetOtpRequest {
  name: string;
  phone: string;
}

export interface VerifyOtpRequest {
  otp: string;
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
  requestId: string;
}

export interface VerifyOtpResponse {
  verified: boolean;
  token?: string;
}

async function postGetOtp(payload: GetOtpRequest): Promise<ApiResponse<GetOtpResponse>> {
  const { data } = await api.post<ApiResponse<GetOtpResponse>>('/onboarding/get-otp', payload);
  return data;
}

async function postVerifyOtp(payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
  const { data } = await api.post<ApiResponse<VerifyOtpResponse>>('/onboarding/verify-otp', payload);
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
