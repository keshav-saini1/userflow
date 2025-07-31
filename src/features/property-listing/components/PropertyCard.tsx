import React from "react";
import type { PropertyDetails } from "../types";
import { FiArrowRight } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router";

interface PropertyCardProps {
   property: PropertyDetails;
   onReserve?: (propertyId: string) => void;
   onBookVisit?: (propertyId: string) => void;
   onPropertyClick?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
   property,
   onReserve,
   onPropertyClick,
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
            </div>

            {/* Property Details */}
            <div className="flex flex-col gap-[17.5px] p-[21px] lg:p-6 order-2">
               {/* Name and Type */}
               <div className="flex flex-col gap-[7px]">
                  <h3 className="text-[#101828] text-[17.5px] lg:text-lg font-semibold leading-[21.88px] lg:leading-6">
                     {property.name}
                  </h3>
                  <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px]">
                     {property.occupancy}
                  </p>
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
                        <span className="text-[#99a1af] text-[12.3px] font-normal leading-[17.5px] line-through">
                           {formatPrice(property.pricing.originalPrice)}
                        </span>
                        {property.pricing.savingsAmount && (
                           <div className="bg-green-50 px-[8.75px] py-[3.5px] rounded-full">
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
                           <div className="w-[21px] h-[21px] bg-green-50 rounded-full flex items-center justify-center">
                              <svg
                                 className="w-[12.25px] h-[12.25px]"
                                 viewBox="0 0 24 24"
                                 fill="none"
                              >
                                 <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#00a63e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                              </svg>
                           </div>
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
               <div className="flex justify-between gap-3 h-[37.5px] lg:h-12">
                  <button
                     onClick={(e) => handleActionClick(e, () => onReserve?.(property.id))}
                     className="bg-white border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-2 flex items-center justify-center gap-[7px] w-[174.5px] lg:w-full h-[37.5px] lg:h-12 hover:bg-gray-50 transition-colors"
                  >
                     <FiArrowRight className="text-neutral-500" />
                     <span className="text-[#364153] text-[12.3px] font-medium leading-[17.5px]">
                        Reserve
                     </span>
                  </button>

                  <button
                     onClick={handleBookVisitClick}
                     className="bg-[#101828] rounded-[12.75px] px-[10.5px] py-[7px] flex items-center justify-center gap-[7px] w-[174.5px] lg:w-full h-[37.5px] lg:h-12 hover:bg-gray-800 transition-colors"
                  >
                     <div className="w-[21px] h-3.5 pl-0 pr-[7px] py-0 flex items-start justify-start">
                        <div className="w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
                           <CiCalendar />
                        </div>
                     </div>
                     <span className="text-white text-[12.3px] font-medium leading-[17.5px]">
                        Book a Visit
                     </span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
