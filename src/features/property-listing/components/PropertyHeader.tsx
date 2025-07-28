import React from 'react';
import type { PropertyLocation } from '../types';

interface PropertyHeaderProps {
  location: PropertyLocation;
  onBackClick?: () => void;
  onShareClick?: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ 
  location, 
  onBackClick, 
  onShareClick 
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-3.5 h-3.5 text-[#efb100]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-3.5 h-3.5 text-[#efb100]" viewBox="0 0 24 24" fill="currentColor">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="url(#half-fill)" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white border-b border-gray-100 p-3.5 pb-[15px] pt-3.5">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <button 
          onClick={onBackClick}
          className="w-[35px] h-[35px] bg-gray-100 rounded-full flex items-center justify-center"
        >
          <svg className="w-[17.5px] h-[17.5px] text-[#4a5565]" viewBox="0 0 24 24" fill="none">
            <path 
              d="M19 12H5M12 19L5 12L12 5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Property Info */}
        <div className="flex-1 flex flex-col items-center gap-[3.5px]">
          <span className="text-[#101828] text-[15.8px] font-semibold leading-[24.5px] text-center">
            {location.name}
          </span>
          <div className="flex items-center gap-[3.5px]">
            <div className="flex items-center gap-[3.5px]">
              {renderStars(location.rating)}
            </div>
            <span className="text-[#101828] text-[12.3px] font-medium leading-[17.5px]">
              {location.rating}
            </span>
            <span className="text-[#6a7282] text-[12.3px] font-normal leading-[17.5px]">
              ({location.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Share Button */}
        <button 
          onClick={onShareClick}
          className="w-[35px] h-[35px] bg-gray-100 rounded-full flex items-center justify-center"
        >
          <svg className="w-[17.5px] h-[17.5px] text-[#4a5565]" viewBox="0 0 24 24" fill="none">
            <path 
              d="M4 12V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V12M16 8L12 4M12 4L8 8M12 4V16" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}; 