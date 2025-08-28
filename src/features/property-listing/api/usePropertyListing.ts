import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import api from "@/api/axios";
import type {
  PropertyListing,
  PropertyDetailPageData,
} from "@/features/property-listing/types";

// API paths
const PROPERTY_LIST_PATH = "/properties";
const PROPERTY_DETAIL_PATH = (id: string) => `/properties/${id}`;

// Fetchers
async function fetchPropertyList(): Promise<PropertyListing[]> {
  const { data } = await api.get<PropertyListing[]>(PROPERTY_LIST_PATH);
  return data;
}

async function fetchPropertyDetail(id: string): Promise<PropertyDetailPageData> {
  const { data } = await api.get<PropertyDetailPageData>(PROPERTY_DETAIL_PATH(id));
  return data;
}

// Standalone hooks (useful when caller only needs one)
export function usePropertiesList(options?: Partial<UseQueryOptions<PropertyListing[], Error, PropertyListing[], QueryKey>>) {
  const query = useQuery<PropertyListing[], Error>({
    queryKey: ["properties", "list"],
    queryFn: fetchPropertyList,
    // Allow caller overrides without forcing them to supply generics each time
    ...(options as any),
  });
  return query;
}

export function usePropertyDetails(
  id: string | undefined,
  options?: Partial<UseQueryOptions<PropertyDetailPageData, Error, PropertyDetailPageData, QueryKey>>
) {
  const query = useQuery<PropertyDetailPageData, Error>({
    queryKey: ["properties", "detail", id],
    queryFn: () => fetchPropertyDetail(id as string),
    enabled: Boolean(id),
    ...(options as any),
  });
  return query;
}

// Combined hook that exposes both list and optional detail in one place
export default function usePropertyListing(propertyId?: string) {
  const list = usePropertiesList();
  const detail = usePropertyDetails(propertyId);

  const isLoadingList = list.isLoading || list.isFetching;
  const isLoadingDetail = detail.isLoading || detail.isFetching;
  const isAnyLoading = isLoadingList || isLoadingDetail;

  return {
    // queries
    list,
    detail,
    // smart loading flags
    isLoadingList,
    isLoadingDetail,
    isAnyLoading,
    // convenience data refs
    properties: list.data,
    property: detail.data,
    // refetch helpers
    refetchList: list.refetch,
    refetchDetail: detail.refetch,
  } as const;
}


