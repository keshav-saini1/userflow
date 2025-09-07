import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

// TypeScript interfaces for wishlist API
export interface CreateWishlistRequest {
  property_id: string;
  room_id?: string;
}

export interface WishlistItem {
  id: string;
  property_id: string;
  room_id: string;
  propertyName: string;
  propertyAddress: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    pincode: string;
  };
  displayName: string;
  rent: number;
  sharingType: number;
  isAvailable: boolean;
  availableFrom: string;
  image: string;
  locationCoordinates: {
    lat: string;
    long: string;
  };
  created_on: string;
  modified_on: string;
}

export interface CreateWishlistResponse {
  status: number;
  message: string;
  data?: WishlistItem;
}

export interface ListWishlistResponse {
  status: number;
  message: string;
  data?: WishlistItem[];
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

// API functions
async function createWishlistItem(requestData: CreateWishlistRequest): Promise<CreateWishlistResponse> {
  const response = await api.post<CreateWishlistResponse>('/wishlist/insert', requestData);
  return response.data;
}

async function getWishlistItems(): Promise<ListWishlistResponse> {
  const response = await api.get<ListWishlistResponse>('/wishlist/list');
  return response.data;
}

// React Query hook for wishlist operations
export function useWishlistApi() {
  const createWishlistMutation = useMutation({
    mutationKey: ['wishlist', 'create'],
    mutationFn: createWishlistItem,
  });

  const listWishlistQuery = useQuery({
    queryKey: ['wishlist', 'list'],
    queryFn: getWishlistItems,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    // Create Wishlist Item
    createWishlistItem: createWishlistMutation.mutateAsync,
    createWishlistStatus: createWishlistMutation.status,
    isCreatingWishlistItem: createWishlistMutation.isPending,
    createWishlistError: createWishlistMutation.error as unknown as Error | null,
    createWishlistData: createWishlistMutation.data,

    // List Wishlist Items
    wishlistItems: listWishlistQuery.data,
    isLoadingWishlist: listWishlistQuery.isLoading,
    isWishlistError: listWishlistQuery.isError,
    wishlistError: listWishlistQuery.error as unknown as Error | null,
    refetchWishlist: listWishlistQuery.refetch,
    
    // Additional query states
    isWishlistFetching: listWishlistQuery.isFetching,
    isWishlistStale: listWishlistQuery.isStale,
  };
}

// Direct API accessors (useful outside React or for simple calls)
export const WishlistApi = {
  createWishlistItem,
  getWishlistItems,
};
