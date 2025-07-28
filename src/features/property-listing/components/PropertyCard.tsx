import React from 'react';
import type { PropertyDetails } from '../types';

interface PropertyCardProps {
  property: PropertyDetails;
  onReserve?: (propertyId: string) => void;
  onBookVisit?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onReserve, 
  onBookVisit 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-[21px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06),0px_1px_4px_0px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="flex flex-col-reverse pb-6">
        {/* Property Image */}
        <div className="relative h-[196px] overflow-hidden order-3">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${property.image}')` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Recommended Badge */}
          {property.isRecommended && (
            <div className="absolute top-[13.75px] left-3.5">
              <div className="bg-gradient-to-r from-[#fb2c36] to-[#f6339a] backdrop-blur-sm px-[10.5px] py-[5.25px] rounded-full shadow-[0px_10px_15px_-3px_rgba(251,44,54,0.25),0px_4px_6px_-4px_rgba(251,44,54,0.25)] flex items-center gap-[5.25px]">
                <svg className="w-[12.25px] h-[12.25px] text-white" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-white text-[12.3px] font-semibold leading-[17.5px]">
                  Recommended
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="flex flex-col gap-[17.5px] p-[21px] order-2">
          {/* Name and Type */}
          <div className="flex flex-col gap-[7px]">
            <h3 className="text-[#101828] text-[17.5px] font-semibold leading-[21.88px]">
              {property.name}
            </h3>
            <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px]">
              {property.occupancy}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-[6.75px]">
            <div className="flex items-baseline gap-[7px]">
              <span className="text-[#101828] text-[26.3px] font-bold leading-[31.5px]">
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
                      Save {formatPrice(property.pricing.savingsAmount)}
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
                <div key={amenity.id} className="flex items-center gap-[10.5px]">
                  <div className="w-[21px] h-[21px] bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-[12.25px] h-[12.25px]" viewBox="0 0 24 24" fill="none">
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
        <div className="flex flex-col gap-2.5 px-3.5 py-0 order-1">
          <div className="flex justify-between gap-0 h-[37.5px]">
            <button 
              onClick={() => onReserve?.(property.id)}
              className="bg-white border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-2 flex items-center justify-center gap-[7px] w-[174.5px] h-[37.5px]"
            >
              <svg className="w-[12.25px] h-[12.25px]" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M8 2V6M16 2V6M3.5 10H20.5M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" 
                  stroke="#101828" 
                  strokeWidth="1.5"
                />
              </svg>
              <span className="text-[#364153] text-[12.3px] font-medium leading-[17.5px]">
                Reserve
              </span>
            </button>
            
            <button 
              onClick={() => onBookVisit?.(property.id)}
              className="bg-[#101828] rounded-[12.75px] px-[10.5px] py-[7px] flex items-center justify-center gap-[7px] w-[174.5px] h-[37.5px]"
            >
              <div className="w-[21px] h-3.5 pl-0 pr-[7px] py-0 flex items-start justify-start">
                <div className="w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M15 3H21V9M14 10L21 3M8 3H3V8M10 14L3 7M9 21H3V16M14 10L7 17M21 16V21H16M10 14L17 21" 
                      stroke="white" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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