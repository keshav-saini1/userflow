import React, { useEffect } from "react";
import type { PropertyDetails } from "../types";
import { useNavigate } from "react-router";
import location_home from "@/assets/property/location_home.svg";
import single_bed from "@/assets/property/bed.svg";
import AmenitiesIcon from "./AmenitiesIcon";
import { BsHeartFill } from "react-icons/bs";
import booked from '@/assets/property/booked.svg'
import { useWishlistApi } from "../api/useWishlistApi";
import { showToast } from "@/components";

interface PropertyCardProps {
   propertyId: string;
   property: PropertyDetails;
   onReserve?: (propertyId: string, roomId?: string) => void;
   onBookVisit?: (propertyId: string) => void;
   onPropertyClick?: (propertyId: string) => void;
   isLongCardView?: boolean;
   room_id?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
   propertyId,
   property,
   onReserve,
   onBookVisit,
   onPropertyClick,
   isLongCardView = false,
   room_id
}) => {
   const navigate = useNavigate();
   const { createWishlistItem, createWishlistData, createWishlistError, refetchWishlist } = useWishlistApi();
   const [isRoomCard, setIsRoomCard] = React.useState(false);

   React.useEffect(() => {
      const href = window.location.href;
      if (href.includes('rental-options')) {
         setIsRoomCard(true);
      }
   }, []);

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
      e.stopPropagation(); // Always prevent event propagation
      if (onBookVisit) {
         onBookVisit(property.id);
      } else {
         navigate("/book-visit");
      }
   };

   const handleWishlist = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when wishlist button is clicked
      if (isRoomCard || room_id) {
         createWishlistItem({
            property_id: propertyId,
            room_id: room_id || property.id,
         });
      } else {
         createWishlistItem({
            property_id: propertyId,
         });
      }
   }

   useEffect(() => {
      if(createWishlistData) {
         refetchWishlist();
         showToast.success("Wishlists updated");
      }
   }, [createWishlistData])

   useEffect(() => {
      if(createWishlistError) {
         showToast.error("Failed to add property to wishlist");
      }
   }, [createWishlistError])

   return (
      <div
         className="bg-white rounded-[21px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06),0px_1px_4px_0px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
         onClick={handleCardClick}
      >
         <div className="flex flex-col-reverse pb-6">
            {/* Property Image */}
            <div
               className={`relative ${isLongCardView ? "h-[296px]" : "h-[196px]"
                  } lg:h-[220px] overflow-hidden order-3`}
            >
               <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.style.display = 'none';
                     target.nextElementSibling?.classList.remove('hidden');
                  }}
               />
               <div className="w-full h-full bg-gray-200 hidden" />

               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

               {/* Recommended Badge */}
               {/* {property.isRecommended && (
                  <div className="absolute top-[13.75px] left-3.5">
                     <div className="bg-gradient-to-r from-[#fb2c36] to-[#f6339a] backdrop-blur-sm px-[10.5px] py-[5.25px] rounded-full shadow-[0px_10px_15px_-3px_rgba(251,44,54,0.25),0px_4px_6px_-4px_rgba(251,44,54,0.25)] flex items-center gap-[5.25px]">
                        <BiHeart />
                        <span className="text-white text-[12.3px] font-semibold leading-[17.5px]">
                           Recommended
                        </span>
                     </div>
                  </div>
               )} */}

               {/* Wishlist Remove Button */}
                  <div className="absolute top-3.5 right-3.5">
                     <button
                        onClick={handleWishlist}
                        className="backdrop-blur-sm bg-white/80 rounded-2xl p-2 w-12 h-12 flex items-center justify-center shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] hover:bg-white/90 transition-colors"
                     >
                        <BsHeartFill className="text-red-500" />
                     </button>
                  </div>

               {property.status === "available" && (
                  <div className="absolute bottom-3.5 right-3.5 flex justify-center items-center gap-1.5 px-2 py-1 bg-green-200 border border-green-200 rounded-full shadow-[0_2px_8px_0_rgba(16,185,129,0.10)]">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span className="text-[12px] font-semibold text-green-700 leading-[18px] flex items-center">
                        Available now
                     </span>
                  </div>
               )}
            </div>

            {/* Property Details */}
            <div className="flex flex-col gap-[17.5px] p-[21px] lg:p-6 order-2">
               {/* Name and Type */}
               <div className="flex flex-col gap-[7px]">
                  <h3 className="text-[#101828] text-[17.5px] lg:text-lg font-semibold leading-[21.88px] lg:leading-6 capitalize">
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
                           {property?.address?.address_line_2}
                        </p>
                     </div>
                     <div className="flex items-center gap-2">
                        <img
                           src={single_bed}
                           alt="location_home"
                           className="w-4 h-4"
                        />
                        <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px] uppercase">
                           {property.type}
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
                     {!isLongCardView && (
                        <span className="text-[#6a7282] text-[12.3px] font-normal leading-[17.5px]">
                           {property.pricing.period}
                        </span>
                     )}
                  </div>

                  {/* {property.pricing.originalPrice && !isLongCardView && (
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
                  )} */}
               </div>

               {!isLongCardView && (
                  <>
                     {/* Amenities */}
                     <div className="flex flex-col gap-[10.5px] pb-[10.5px]">
                        <h4 className="text-[#101828] text-[12.3px] font-semibold leading-[17.5px]">
                           Included amenities:
                        </h4>
                        <div className="">
                           <div className="flex flex-wrap gap-2">
                              {property.amenities.slice(0, 4).map((amenity) => (
                                 <div
                                    key={amenity.id}
                                    className="flex items-center gap-[6px] bg-white px-2.5 py-1.5 rounded-md border border-gray-200 shadow-sm"
                                 >
                                    <AmenitiesIcon {...amenity} />
                                    <span className="text-[#364153] text-[11px] font-medium leading-tight whitespace-nowrap">
                                       {amenity.name}
                                    </span>
                                 </div>
                              ))}
                              {property.amenities.length > 4 && (
                                 <div className="flex items-center px-2.5 py-1.5 bg-blue-50 rounded-md border border-blue-200">
                                    <span className="text-blue-600 text-[11px] font-medium leading-tight">
                                       +{property.amenities.length - 4} more
                                    </span>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 px-3.5 lg:px-6 py-0 order-1">
               {property.status === "booked" ? (
                  <div className="flex justify-center h-[37.5px] lg:h-12">
                     <button
                        disabled
                        className="bg-gray-100 rounded-[12.75px] px-[8.75px] py-0 flex items-center justify-center gap-[7px] w-full h-[42px] lg:h-12 opacity-50 cursor-not-allowed"
                     >
                        <img src={booked} alt="booked" className="w-4 h-4" />
                        <span className="text-[#4a5565] text-[12.3px] font-semibold leading-[17.5px]">
                           Booked
                        </span>
                     </button>
                  </div>
               ) : (
                  <div className="flex justify-between gap-3 h-[37.5px] lg:h-12">
                     <button
                        onClick={(e) => {
                           if (isRoomCard) {
                              handleActionClick(e, () => onReserve?.(propertyId, property.id))
                           } else {
                              handleActionClick(e, () => onReserve?.(propertyId))
                           }
                        }}
                        className="bg-white border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-2 flex items-center justify-center gap-[7px] w-[174.5px] lg:w-full h-[42px] lg:h-12 hover:bg-gray-50 transition-colors"
                     >
                        <span className="text-[#364153] text-[12.3px] font-medium leading-[17.5px]">
                           Reserve
                        </span>
                     </button>

                     <button
                        onClick={handleBookVisitClick}
                        className="bg-[#101828] rounded-[12.75px] px-[10.5px] py-[10px] flex items-center justify-center gap-[7px] w-[174.5px] lg:w-full h-[42px] lg:h-12 hover:bg-gray-800 transition-colors"
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
