import React from 'react';
import type { PropertyLocation } from '../types';

interface LocationSectionProps {
  location: PropertyLocation;
  onMapClick?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ 
  location, 
  onMapClick 
}) => {
  return (
    <div className="bg-white rounded-[12.75px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-[17.5px] pb-[21px] overflow-hidden">
      <div className="flex flex-col gap-3.5 pb-[5.5px]">
        {/* Header */}
        <div className="flex items-center justify-start">
          <div className="flex flex-col gap-[3.5px]">
            <h3 className="text-[#101828] text-[15.8px] font-semibold leading-[24.5px]">
              Where you'll be
            </h3>
            <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px]">
              {location.area}, {location.city}
            </p>
          </div>
        </div>

        {/* Map Container */}
        <button 
          onClick={onMapClick}
          className="relative h-[168px] rounded-[12.75px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {/* Map Background */}
          <div className="absolute inset-0 bg-[#f0fdf4] opacity-30" />
          
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#64748b" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Main Roads */}
              <line x1="0" y1="33" x2="100" y2="33" stroke="#64748b" strokeWidth="1"/>
              <line x1="0" y1="67" x2="100" y2="67" stroke="#64748b" strokeWidth="1"/>
              <line x1="33" y1="0" x2="33" y2="100" stroke="#64748b" strokeWidth="1"/>
              <line x1="67" y1="0" x2="67" y2="100" stroke="#64748b" strokeWidth="1"/>
              
              {/* Area Markers */}
              <circle cx="18" cy="25" r="2" fill="#22c55e"/>
              <circle cx="75" cy="75" r="2" fill="#ff6900"/>
              <circle cx="42" cy="50" r="2" fill="#155dfc"/>
              <circle cx="58" cy="25" r="2" fill="#ff6900"/>
            </svg>
          </div>

          {/* Property Location Marker (Center) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-7 h-7 bg-[#101828] rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="10" r="3" fill="white"/>
              </svg>
            </div>
          </div>

          {/* Healthcare Marker */}
          <div className="absolute top-[39.583%] left-[30.324%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[21px] h-[21px] bg-[#155dfc] rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-[10.5px] h-[10.5px] text-white" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M22 12H18L15 21L9 3L6 12H2" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Food/Restaurant Marker */}
          <div className="absolute top-[27.077%] left-[63.659%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[21px] h-[21px] bg-[#ff6900] rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-[10.5px] h-[10.5px] text-white" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}; 