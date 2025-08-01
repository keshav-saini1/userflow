import React from "react";
import type { PropertyDetails } from "../types";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router";
import location_home from "@/assets/property/location_home.svg";
import single_bed from "@/assets/property/bed.svg";
import AmenitiesIcon from "./AmenitiesIcon";

interface PropertyCardProps {
   property: PropertyDetails;
   onReserve?: (propertyId: string) => void;
   onBookVisit?: (propertyId: string) => void;
   onPropertyClick?: (propertyId: string) => void;
   onRemoveFromWishlist?: (propertyId: string) => void;
   isWishlistView?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
   property,
   onReserve,
   onPropertyClick,
   onRemoveFromWishlist,
   isWishlistView = false,
}) => {
   const navigate = useNavigate();

   const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-IN", {
         style: "currency",
         currency: "INR",
         maximumFractionDigits: 0,
      }).format(price);
   };

   const handleCardClick = () => {
      onPropertyClick?.(property.id);
   };

   const handleActionClick = (e: React.MouseEvent, action: () => void) => {
      e.stopPropagation(); // Prevent card click when action buttons are clicked
      action();
   };

   const handleBookVisitClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate("/book-visit");
   };

   return (
      <div
         className="bg-white rounded-[21px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06),0px_1px_4px_0px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
         onClick={handleCardClick}
      >
         <div className="flex flex-col-reverse pb-6">
            {/* Property Image */}
            <div className="relative h-[196px] lg:h-[220px] overflow-hidden order-3">
               <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url('${property.image}')` }}
               />

               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

               {/* Recommended Badge */}
               {property.isRecommended && (
                  <div className="absolute top-[13.75px] left-3.5">
                     <div className="bg-gradient-to-r from-[#fb2c36] to-[#f6339a] backdrop-blur-sm px-[10.5px] py-[5.25px] rounded-full shadow-[0px_10px_15px_-3px_rgba(251,44,54,0.25),0px_4px_6px_-4px_rgba(251,44,54,0.25)] flex items-center gap-[5.25px]">
                        <BiHeart />
                        <span className="text-white text-[12.3px] font-semibold leading-[17.5px]">
                           Recommended
                        </span>
                     </div>
                  </div>
               )}

               {/* Wishlist Remove Button */}
               {isWishlistView && (
                  <div className="absolute top-3.5 right-3.5">
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           onRemoveFromWishlist?.(property.id);
                        }}
                        className="backdrop-blur-sm bg-white/80 rounded-full p-2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] hover:bg-white/90 transition-colors"
                     >
                        <svg
                           className="w-3.5 h-3.5"
                           viewBox="0 0 24 24"
                           fill="none"
                        >
                           <path
                              d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z"
                              stroke="#FB2C36"
                              strokeWidth="1.46"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                     </button>
                  </div>
               )}
            </div>

            {/* Property Details */}
            <div className="flex flex-col gap-[17.5px] p-[21px] lg:p-6 order-2">
               {/* Name and Type */}
               <div className="flex flex-col gap-[7px]">
                  <h3 className="text-[#101828] text-[17.5px] lg:text-lg font-semibold leading-[21.88px] lg:leading-6">
                     {property.name}
                  </h3>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-2">
                        <img
                           src={location_home}
                           alt="location_home"
                           className="w-4 h-4"
                        />
                        <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px]">
                           Koromangala
                        </p>
                     </div>
                     <div className="flex items-center gap-2">
                        <img
                           src={single_bed}
                           alt="location_home"
                           className="w-4 h-4"
                        />
                        <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px]">
                           {property.occupancy}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Pricing */}
               <div className="flex flex-col gap-[6.75px]">
                  <div className="flex items-baseline gap-[7px]">
                     <span className="text-[#101828] text-[26.3px] lg:text-2xl font-bold leading-[31.5px] lg:leading-8">
                        {formatPrice(property.pricing.currentPrice)}
                     </span>
                     <span className="text-[#6a7282] text-[12.3px] font-normal leading-[17.5px]">
                        {property.pricing.period}
                     </span>
                  </div>

                  {property.pricing.originalPrice && (
                     <div className="flex items-center gap-[7px]">
                        <span className="text-[#99a1af] text-[17.3px] font-normal leading-[17.5px] line-through">
                           {formatPrice(property.pricing.originalPrice)}
                        </span>
                        {property.pricing.savingsAmount && (
                           <div className="bg-green-50 px-2 text-[17.3px] py-[3.5px] rounded-full">
                              <span className="text-[#008236] text-[10.5px] font-semibold leading-[14px]">
                                 Save{" "}
                                 {formatPrice(property.pricing.savingsAmount)}
                              </span>
                           </div>
                        )}
                     </div>
                  )}
               </div>

               {/* Amenities */}
               <div className="flex flex-col gap-[10.5px] pb-[10.5px]">
                  <h4 className="text-[#101828] text-[12.3px] font-semibold leading-[17.5px]">
                     Included amenities:
                  </h4>
                  <div className="flex flex-col gap-[7px]">
                     {property.amenities.map((amenity) => (
                        <div
                           key={amenity.id}
                           className="flex items-center gap-[10.5px]"
                        >
                           <AmenitiesIcon {...amenity} />
                           <span className="text-[#364153] text-[12.3px] font-normal leading-[17.5px]">
                              {amenity.name}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 px-3.5 lg:px-6 py-0 order-1">
               {property.status === "booked" ? (
                  <div className="flex justify-center h-[37.5px] lg:h-12">
                     <button
                        disabled
                        className="bg-gray-100 rounded-[12.75px] px-[8.75px] py-0 flex items-center justify-center gap-[7px] w-full h-[37.5px] lg:h-12 opacity-50 cursor-not-allowed"
                     >
                        <svg
                           className="w-3.5 h-3.5"
                           viewBox="0 0 24 24"
                           fill="none"
                        >
                           <path
                              d="M3 3H21V21H3V3Z"
                              stroke="#4a5565"
                              strokeWidth="1.46"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                           <path
                              d="M3 9H21"
                              stroke="#4a5565"
                              strokeWidth="1.46"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                           <path
                              d="M9 21V9"
                              stroke="#4a5565"
                              strokeWidth="1.46"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                           <path
                              d="M15 21V9"
                              stroke="#4a5565"
                              strokeWidth="1.46"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                        <span className="text-[#4a5565] text-[12.3px] font-semibold leading-[17.5px]">
                           Booked
                        </span>
                     </button>
                  </div>
               ) : (
                  <div className="flex justify-between gap-3 h-[37.5px] lg:h-12">
                     <button
                        onClick={(e) =>
                           handleActionClick(e, () => onReserve?.(property.id))
                        }
                        className="bg-white border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-2 flex items-center justify-center gap-[7px] w-[174.5px] lg:w-full h-[37.5px] lg:h-12 hover:bg-gray-50 transition-colors"
                     >
                        <span className="text-[#364153] text-[12.3px] font-medium leading-[17.5px]">
                           Reserve
                        </span>
                     </button>

                     <button
                        onClick={handleBookVisitClick}
                        className="bg-[#101828] rounded-[12.75px] px-[10.5px] py-[7px] flex items-center justify-center gap-[7px] w-[174.5px] lg:w-full h-[37.5px] lg:h-12 hover:bg-gray-800 transition-colors"
                     >
                        <span className="text-white text-[12.3px] font-medium leading-[17.5px]">
                           Book a Visit
                        </span>
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
