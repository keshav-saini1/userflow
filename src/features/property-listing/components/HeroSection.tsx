import React from 'react';
import type { PropertyLocation } from '../types';

interface HeroSectionProps {
  heroImage: string;
  location: PropertyLocation;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  heroImage, 
  location 
}) => {
  return (
    <div className="relative h-[272px] w-full overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 flex flex-col items-start justify-start p-0">
        <div className="relative h-[280px] w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-3 left-0 right-0 px-4">
        <div className="flex flex-col gap-3.5 pb-[84px]">
          {/* Property Info Section */}
          <div className="flex flex-col gap-[10.5px]">
            <div className="flex flex-col gap-[11px]">
              {/* Property Name */}
              <div className="w-full">
                <span className="text-white text-[21px] font-bold leading-[26.25px] tracking-[-0.525px]">
                  Your New Home Awaits
                </span>
              </div>
              
              {/* Location with Green Dot */}
              <div className="flex items-center gap-[7px]">
                <div className="w-[7px] h-[7px] bg-green-500 rounded-full" />
                <span className="text-white/90 text-[14px] font-medium leading-[21px]">
                  {location.area}, {location.city}
                </span>
              </div>
            </div>

            {/* Find Nearby Spots Card */}
            <div className="bg-white/10 backdrop-blur-[6px] rounded-[14px] p-[10.5px] flex items-center gap-[10.5px]">
              {/* Icon */}
              <div className="w-7 h-7 bg-white/20 rounded-[12.75px] flex items-center justify-center">
                <svg 
                  className="w-3.5 h-3.5 text-white" 
                  viewBox="0 0 14 14" 
                  fill="none"
                >
                  <path 
                    d="M7 1L9 5L13 5L10 8L11 12L7 10L3 12L4 8L1 5L5 5L7 1Z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="w-full">
                  <p className="text-white text-[12px] font-medium leading-[14px]">
                    Find Nearby Spots
                  </p>
                </div>
                
                {/* Nearby Spots Info */}
                <div className="flex items-center gap-3.5">
                  {location.nearbySpots.map((spot, index) => (
                    <div key={index} className="flex items-center gap-[3.5px]">
                      <div className="w-[10.5px] h-[10.5px]">
                        {spot.type === 'transport' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path 
                              d="M12 2L13.09 8.26L20 9L13.09 15.74L12 22L10.91 15.74L4 9L10.91 8.26L12 2Z" 
                              stroke="#51a2ff" 
                              strokeWidth="1.5"
                            />
                          </svg>
                        )}
                        {spot.type === 'healthcare' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path 
                              d="M22 12H18L15 21L9 3L6 12H2" 
                              stroke="#22c55e" 
                              strokeWidth="1.5"
                            />
                          </svg>
                        )}
                        {spot.type === 'food' && (
                          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <path 
                              d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                              stroke="#ff8904" 
                              strokeWidth="1.5"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-white/90 text-[12.3px] font-medium leading-[17.5px]">
                        {spot.timeEstimate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Arrow Icon */}
              <div className="w-3.5 h-3.5">
                <svg 
                  className="w-full h-full text-white/70" 
                  viewBox="0 0 14 14" 
                  fill="none"
                >
                  <path 
                    d="M5.25 10.5L8.75 7L5.25 3.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 