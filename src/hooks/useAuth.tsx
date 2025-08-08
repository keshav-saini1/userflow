import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

type SendOtpPayload = {
  name: string;
  phone: string;
};

type VerifyOtpPayload = {
  phone: string;
  otp: string;
};

type SendOtpResponse = {
  success: boolean;
  message: string;
};

type VerifyOtpResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

const sendOtp = async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
  const response = await api.post("/auth/send-otp", payload);
  return response.data;
};

const verifyOtp = async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
  const response = await api.post("/auth/verify-otp", payload);
  return response.data;
};

export function useAuth() {
  const {
    mutate: sendOtpMutate,
    data: sendOtpData,
    error: sendOtpError,
    isPending: isSendingOtp,
    isSuccess: isSendOtpSuccess,
    reset: resetSendOtp,
  } = useMutation({
    mutationFn: sendOtp,
  });

  const {
    mutate: verifyOtpMutate,
    data: verifyOtpData,
    error: verifyOtpError,
    isPending: isVerifyingOtp,
    isSuccess: isVerifyOtpSuccess,
    reset: resetVerifyOtp,
  } = useMutation({
    mutationFn: verifyOtp,
  });

  return {
    // Send OTP
    sendOtp: sendOtpMutate,
    sendOtpData,
    sendOtpError,
    isSendingOtp,
    isSendOtpSuccess,
    resetSendOtp,

    // Verify OTP
    verifyOtp: verifyOtpMutate,
    verifyOtpData,
    verifyOtpError,
    isVerifyingOtp,
    isVerifyOtpSuccess,
    resetVerifyOtp,
  };
}
