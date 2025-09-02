import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/api/axios';

export interface CreateVisitRequest {
  visit_type: string;
  visit_date: string;
  visit_time: string;
  property_id: string;
  room_id?: string;
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

export interface CreateVisitResponse {
  status: number;
  message: string;
  data: {
    visit_type: string;
    visit_date: string;
    visit_time: string;
    created_by: string;
    modified_by: string;
    property_id: string;
    id: string;
    created_at: string;
    modified_at: string;
    status: string;
  };
}

export interface LocationCoordinates {
  lat: number | null;
  long: number | null;
}

export interface Visit {
  id: string;
  visit_type: string;
  visit_date: string;
  visit_time: string;
  property_id: string;
  room_id: string | null;
  propertyName: string;
  propertyAddress: string;
  image: string;
  locationCoordinates: LocationCoordinates;
  status: string;
}

export interface ListVisitsResponse {
  status: number;
  message: string;
  data: Visit[];
}

async function postCreateVisit(payload: CreateVisitRequest): Promise<ApiResponse<CreateVisitResponse>> {
  const { data } = await api.post<ApiResponse<CreateVisitResponse>>('/visits/schedule', payload);
  return data;
}

async function getListVisits(): Promise<ApiResponse<ListVisitsResponse>> {
  const { data } = await api.get<ApiResponse<ListVisitsResponse>>('/visits');
  return data;
}

export function useBookVisitApi() {
  const createVisitMutation = useMutation({
    mutationKey: ['book-visit', 'create-visit'],
    mutationFn: postCreateVisit,
  });

  const listVisitsQuery = useQuery({
    queryKey: ['book-visit', 'list-visits'],
    queryFn: getListVisits,
    enabled: false, // Enable manually when needed
  });

  return {
    // Create Visit
    createVisit: createVisitMutation.mutateAsync,
    createVisitStatus: createVisitMutation.status,
    isCreatingVisit: createVisitMutation.isPending,
    createVisitError: createVisitMutation.error as unknown as Error | null,
    createVisitData: createVisitMutation.data,

    // List Visits
    listVisits: listVisitsQuery.refetch,
    listVisitsStatus: listVisitsQuery.status,
    isLoadingVisits: listVisitsQuery.isLoading,
    listVisitsError: listVisitsQuery.error as unknown as Error | null,
    listVisitsData: listVisitsQuery.data,
    enableListVisits: () => listVisitsQuery.refetch(),
  };
}

export const BookVisitApi = {
  createVisit: postCreateVisit,
  listVisits: getListVisits,
};