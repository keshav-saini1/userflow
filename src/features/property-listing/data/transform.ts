import type { PropertyListing } from "../types";


const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop";

/**
 * Convert backend property response to UI-friendly PropertyListing shape
 */
export function mapApiToPropertyListing(api: any): PropertyListing {
  const { propertyAddress, coverImage, rentalOptions } = api;

  const locationName = api.propertyName || "Property";
  const area = propertyAddress.address_line_1 || "";
  const city = propertyAddress.city || "";

  // Map rental options to card items used in UI
  const properties = rentalOptions.map((opt: any, index: number) => {
    const currentPrice = opt.rentPerMonth?.max ?? 0;
    const originalPrice = currentPrice; // no discount data available

    return {
      id: `${opt.optionType?.toLowerCase?.() || "room"}-${index}`,
      name: opt.occupancyType || "Room",
      sharing_type: opt.sharing_type,
      type: (opt.optionType || "room").toLowerCase(),
      occupancy: opt.occupancyType || "",
      pricing: {
        currentPrice,
        originalPrice,
        savingsAmount: Math.max(0, (originalPrice || 0) - (currentPrice || 0)),
        period: "per month",
      },
      amenities: (opt.amenities || []).map((a: any) => ({
        id: a.toLowerCase().replace(/\s+/g, "-"),
        name: a,
        icon: "wifi", // placeholder; backend does not provide specific icons
      })),
      image: coverImage || FALLBACK_IMAGE,
      status: "available" as const,
      isRecommended: index === 0,
    };
  });

  const listing: PropertyListing = {
    id: api.id,
    heroImage: coverImage || FALLBACK_IMAGE,
    location: {
      name: locationName,
      area,
      city,
      rating: 4.8, // placeholder (no rating in API)
      reviewCount: 0, // placeholder (no review count in API)
      nearbySpots: [],
    },
    availableUnits: properties.length, // approximation
    totalUnits: properties.length, // unknown from API, mirror length
    properties,
  };

  return listing;
}


