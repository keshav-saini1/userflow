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
    <div className="bg-white rounded-[12.75px] lg:rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-[17.5px] lg:p-6 pb-[21px] lg:pb-6 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-3.5 lg:gap-4 pb-[5.5px]">
        {/* Header */}
        <div className="flex items-center justify-start">
          <div className="flex flex-col gap-[3.5px] lg:gap-2">
            <h3 className="text-[#101828] text-[15.8px] lg:text-lg font-semibold leading-[24.5px] lg:leading-6">
              Where you'll be
            </h3>
            <p className="text-[#4a5565] text-[12.3px] lg:text-sm font-normal leading-[17.5px] lg:leading-5">
              {location.area}, {location.city}
            </p>
          </div>
        </div>

        {/* Map Container */}
        <button 
          onClick={onMapClick}
          className="relative h-[168px] lg:h-48 xl:h-56 rounded-[12.75px] lg:rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md transition-shadow"
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
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-[#101828] rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" viewBox="0 0 24 24" fill="none">
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
            <div className="w-[21px] h-[21px] lg:w-6 lg:h-6 bg-[#155dfc] rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-[10.5px] h-[10.5px] lg:w-3 lg:h-3 text-white" viewBox="0 0 24 24" fill="none">
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
            <div className="w-[21px] h-[21px] lg:w-6 lg:h-6 bg-[#ff6900] rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-[10.5px] h-[10.5px] lg:w-3 lg:h-3 text-white" viewBox="0 0 24 24" fill="none">
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

          {/* Transport Marker */}
          <div className="absolute top-[72.923%] left-[73.676%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[21px] h-[21px] lg:w-6 lg:h-6 bg-[#22c55e] rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <svg className="w-[10.5px] h-[10.5px] lg:w-3 lg:h-3 text-white" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M8 7H5C3.89543 7 3 7.89543 3 9V16C3 17.1046 3.89543 18 5 18H8M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16M16 7H19C20.1046 7 21 7.89543 21 9V16C21 17.1046 20.1046 18 19 18H16M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7M8 18V21H16V18M8 18H16" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Overlay with click hint */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium text-gray-700">Click to explore area</span>
            </div>
          </div>
        </button>

        {/* Nearby Spots */}
        <div className="flex flex-col gap-2.5 lg:gap-3">
          <h4 className="text-[#101828] text-[12.3px] lg:text-sm font-semibold leading-[17.5px] lg:leading-5">
            Nearby spots
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
            {location.nearbySpots.map((spot, index) => (
              <div key={index} className="flex items-center gap-2.5 lg:gap-3">
                <div className={`w-[21px] h-[21px] lg:w-6 lg:h-6 rounded-full flex items-center justify-center ${
                  spot.type === 'transport' ? 'bg-[#22c55e]' :
                  spot.type === 'healthcare' ? 'bg-[#155dfc]' :
                  'bg-[#ff6900]'
                }`}>
                  <svg className="w-[10.5px] h-[10.5px] lg:w-3 lg:h-3 text-white" viewBox="0 0 24 24" fill="none">
                    {spot.type === 'transport' && (
                      <path 
                        d="M8 7H5C3.89543 7 3 7.89543 3 9V16C3 17.1046 3.89543 18 5 18H8M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16M16 7H19C20.1046 7 21 7.89543 21 9V16C21 17.1046 20.1046 18 19 18H16M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7M8 18V21H16V18M8 18H16" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {spot.type === 'healthcare' && (
                      <path 
                        d="M22 12H18L15 21L9 3L6 12H2" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {spot.type === 'food' && (
                      <path 
                        d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </div>
                <span className="text-[#364153] text-[12.3px] lg:text-sm font-normal leading-[17.5px] lg:leading-5">
                  {spot.timeEstimate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2.5 lg:gap-3">
          <div className="flex items-center gap-1 lg:gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-[10.5px] h-[10.5px] lg:w-3 lg:h-3 ${
                  i < Math.floor(location.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[#364153] text-[12.3px] lg:text-sm font-normal leading-[17.5px] lg:leading-5">
            {location.rating} ({location.reviewCount} reviews)
          </span>
        </div>
      </div>
    </div>
  );
}; 