import type { PropertyDetailPageData, PropertyListing } from "../types";


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
      address: opt.locationObject,
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


// Convert rental option details API to PropertyDetailPageData
export function mapApiToPropertyDetail(api: any): PropertyDetailPageData {
  const fallbackImage = FALLBACK_IMAGE;

  const title = api?.occupancyName || "Room";
  const currentPrice = api?.rentPerMonth?.max ?? api?.rentPerMonth?.min ?? 0;

  // Try to split location into area and city (best-effort)
  const locationString: string = api?.location || "";
  const locationParts = locationString.split(",").map((s) => s.trim());
  const area = locationParts[0] || "";
  const city = locationParts[locationParts.length - 3] || locationParts[1] || "";

  // Collect all images from rooms for photos array
  const allRoomImages: { id: string; category: string; url: string }[] = [];
  const roomVideos: { id: string; title: string; thumbnail: string; url: string }[] = [];

  // Rooms to available units
  const availableUnits = (api?.rooms ?? []).map((room: any) => {
    const floorNum = Number.parseInt(String(room?.name).match(/(\d+)/)?.[0] || "0", 10) || 0;
    
    // Process room images for this specific room
    const roomImages: { id: string; category: string; url: string }[] = [];
    
    if (Array.isArray(room?.images)) {
      room.images.forEach((img: any, index: number) => {
        if (img?.url) {
          // Check if it's a video (mp4 extension)
          if (img.url.toLowerCase().includes('.mp4')) {
            roomVideos.push({
              id: `video-${room.id}-${index}`,
              title: `${room.name} Video ${index + 1}`,
              thumbnail: img.thumbnail || "", // Use video URL as thumbnail for now
              url: img.url,
            });
          } else {
            // Add to both room-specific and global arrays
            const roomImage = {
              id: `photo-${room.id}-${index}`,
              category: img?.category || 'room',
              url: img.url,
            };
            roomImages.push(roomImage);
            allRoomImages.push(roomImage);
          }
        }
      });
    }

    return {
      id: room?.id || cryptoRandomId(),
      name: room?.name || "Room",
      floor: floorNum,
      pricePerBed: Number(room?.rent || 0),
      occupancy: api?.occupancyName || "",
      amenities: [],
      availableFrom: room?.availableFrom || "",
      image: room?.images?.[0]?.url || fallbackImage,
      images: roomImages, // Add room-specific images array
    };
  });

  // Hero images - use main image or first room image
  const heroImages = [];
  if (api?.image?.url) {
    heroImages.push(api.image.url);
  }
  if (allRoomImages.length > 0) {
    heroImages.push(allRoomImages[0].url);
  }
  if (heroImages.length === 0) {
    heroImages.push(fallbackImage);
  }

  // Map amenities to furniture/appliances
  const furniture: { id: string; name: string; icon: string; category: 'furniture' | 'appliances' }[] = [];
  const appliances: { id: string; name: string; icon: string; category: 'furniture' | 'appliances' }[] = [];
  
  const amenityIcons: Record<string, string> = {
    'Table': '🪑',
    'Chair': '🪑',
    'Almirah': '🚪',
    'Washroom': '🚿',
    'Toilet': '🚽',
    'Fridge': '❄️',
    'Geyser': '🔥',
    'CCTV': '📹',
    'Food': '🍽️',
    'Laundry': '🧺',
  };

  (api?.amenities || []).forEach((amenity: string) => {
    const icon = amenityIcons[amenity] || '📦';
    const category = ['Fridge', 'Geyser', 'CCTV'].includes(amenity) ? 'appliances' : 'furniture';
    
    if (category === 'furniture') {
      furniture.push({
        id: toId(amenity),
        name: amenity,
        icon,
        category: 'furniture',
      });
    } else {
      appliances.push({
        id: toId(amenity),
        name: amenity,
        icon,
        category: 'appliances',
      });
    }
  });

  const data: PropertyDetailPageData = {
    id: String(api?.sharing_type || api?.occupancyType || "room"),
    title,
    type: "room",
    tags: [title, "Room"],
    heroImages,
    pricing: {
      currentPrice,
      originalPrice: currentPrice,
      savingsAmount: 0,
      period: "monthly",
    },
    deposit: Number(api?.deposit || 0),
    availableUnits,
    rentalDetails: {
      weeklyRate: { min: 0, max: 0 },
      dailyRate: { min: 0, max: 0 },
      lockInPeriod: String(api?.rentalTerms?.lockinPeriod ?? ""),
      stayDuration: String(api?.rentalTerms?.stayDuration ?? ""),
      noticePeriod: String(api?.rentalTerms?.noticePeriod ?? ""),
      deposit: Number(api?.deposit || 0),
    },
    description: String(api?.description || ""),
    highlights: Array.isArray(api?.highlights) ? api.highlights : [],
    furniture,
    appliances,
    includedServices: Array.isArray(api?.includedServices)
      ? api.includedServices.map((s: string) => ({ id: toId(s), name: s }))
      : [],
    addOnServices: Array.isArray(api?.addOnServices)
      ? api.addOnServices.map((s: string) => ({ id: toId(s), name: s, price: "" }))
      : [],
    location: {
      area,
      city,
      mapImage: fallbackImage,
    },
    photos: allRoomImages,
    videos: roomVideos,
    policies: api?.policiesAndRules
      ? Object.entries(api.policiesAndRules).reduce((acc: { id: string; rule: string }[], [key, value]) => {
          if (value != null && value !== "") {
            // Convert camelCase to normal readable format
            const readableKey = key
              .replace(/([A-Z])/g, ' $1') // Add space before capital letters
              .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
              .trim();
            acc.push({ id: String(key), rule: `${readableKey}: ${value}` });
          }
          return acc;
        }, [])
      : [],
    marketingDescription: String(api?.marketingDescription || ""),
  };

  return data;
}

function toId(s: string): string {
  return String(s || "").toLowerCase().replace(/\s+/g, "-");
}

function cryptoRandomId(): string {
  // Simple fallback id for environments without crypto.randomUUID
  try {
    // @ts-ignore
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `id_${Math.random().toString(36).slice(2, 10)}`;
}

