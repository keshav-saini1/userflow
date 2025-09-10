import { useMutation } from '@tanstack/react-query';
import api from '@/api/axios';

export interface PaymentSuccessData {
    tenant_id: string | null;
    tenant_uuid: string | null;
    paying_amount: number;
    pg_id: string;
    pg_number: number;
    property_id: string;
    gateway_charges: number;
    payment_mode: number;
    received_by: string;
    paid_date: Date;
    initiated_by: string;
    description: string;
    source: string;
    order_id: string;
    payment_gateway: string;
    credit_obj: Record<string, any>;
    version: number;
    selected_room: string;
    url: string;
  }
  
  export interface CashfreeOrderData {
    order_id: string;
    order_amount: number;
    payment_success_data: PaymentSuccessData;
    tenant_uuid: string | null;
    pg_id: string;
    pg_number: number;
    return_url: string;
    source: string;
    is_test: boolean;
    payment_modes: string;
  }

export interface CashfreeTokenResponse {
  status: number;
  message: string;
  data: {
    payment_session_id: string;
    order_id: string;
  };
}

export interface ConfirmPaymentRequest {
  order_id: string;
}

export interface ConfirmPaymentResponse {
  status: number;
  message: string;
  data?: any;
}

export interface GetOrderDetailsRequest {
  order_id: string;
}

export interface OrderDetailsData {
  amount_paid: number;
  paid_date: string;
  order_id: string;
  movein_date: string;
}

export interface GetOrderDetailsResponse {
  status: number;
  message: string;
  data: OrderDetailsData;
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

async function getCashfreeToken(orderData: CashfreeOrderData): Promise<CashfreeTokenResponse> {
  const response = await api.post<CashfreeTokenResponse>('/payment/getCashfreeToken', orderData);
  return response.data;
}

async function confirmPaymentByOrderId(requestData: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
  const response = await api.post<ConfirmPaymentResponse>('/payment/confirmPaymentByOrderId', requestData);
  return response.data;
}

async function getOrderDetails(requestData: GetOrderDetailsRequest): Promise<GetOrderDetailsResponse> {
  const { order_id } = requestData;
  const response = await api.get<GetOrderDetailsResponse>(`/payment/unified/${order_id}/details`);
  return response.data;
}

export function usePaymentApi() {
  const getCashfreeTokenMutation = useMutation({
    mutationKey: ['payment', 'cashfree-token'],
    mutationFn: getCashfreeToken,
  });

  const confirmPaymentMutation = useMutation({
    mutationKey: ['payment', 'confirm-payment'],
    mutationFn: confirmPaymentByOrderId,
  });

  const getOrderDetailsMutation = useMutation({
    mutationKey: ['payment', 'order-details'],
    mutationFn: getOrderDetails,
  });

  return {
    // Cashfree Token
    getCashfreeToken: getCashfreeTokenMutation.mutateAsync,
    getCashfreeTokenStatus: getCashfreeTokenMutation.status,
    isGettingCashfreeToken: getCashfreeTokenMutation.isPending,
    getCashfreeTokenError: getCashfreeTokenMutation.error as unknown as Error | null,
    getCashfreeTokenData: getCashfreeTokenMutation.data,

    // Confirm Payment
    confirmPaymentByOrderId: confirmPaymentMutation.mutateAsync,
    confirmPaymentStatus: confirmPaymentMutation.status,
    isConfirmingPayment: confirmPaymentMutation.isPending,
    confirmPaymentError: confirmPaymentMutation.error as unknown as Error | null,
    confirmPaymentData: confirmPaymentMutation.data,

    // Get Order Details
    getOrderDetails: getOrderDetailsMutation.mutateAsync,
    getOrderDetailsStatus: getOrderDetailsMutation.status,
    isGettingOrderDetails: getOrderDetailsMutation.isPending,
    getOrderDetailsError: getOrderDetailsMutation.error as unknown as Error | null,
    getOrderDetailsData: getOrderDetailsMutation.data,
  };
}

export const PaymentApi = {
  getCashfreeToken,
  confirmPaymentByOrderId,
  getOrderDetails,
};
