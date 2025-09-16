import React from "react";
import type { PropertyLocation } from "../types";

interface HeroSectionProps {
   heroImage: string;
   location: PropertyLocation;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
   heroImage,
   location
}) => {

   return (
      <div className="relative h-[272px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
         {/* Background Image Container */}
         <div className="absolute inset-0 flex flex-col items-start justify-start p-0">
            <div className="relative h-full w-full">
               <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: heroImage ? `url('${heroImage}')` : undefined }}
               />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
         </div>

         {/* Content Overlay - Responsive positioning */}
         <div className="absolute inset-0 flex items-end justify-start lg:justify-center">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 lg:pb-16">
               <div className="flex flex-col items-start lg:items-center text-left lg:text-center gap-4 lg:gap-6">
                  {/* Property Info Section */}
                  <div className="flex flex-col w-full items-start lg:items-center gap-4 lg:gap-5">
                     <div className="flex flex-col items-start lg:items-center gap-3 lg:gap-4">
                        {/* Property Name */}
                        <div className="w-full">
                           <p className="text-white text-[21px] md:text-3xl lg:text-6xl font-bold leading-tight tracking-[-0.525px]">
                              Your New Home Awaits
                           </p>
                        </div>

                        {/* Location with Green Dot */}
                        <div className="flex items-center gap-[7px] lg:gap-2">
                           <div className="w-[7px] h-[7px] lg:w-2 lg:h-2 bg-green-500 rounded-full" />
                           <span className="text-white/90 text-[14px] lg:text-lg font-medium leading-[21px]">
                              {(location?.area ?? "").toString()}{location?.area && location?.city ? ", " : ""}{(location?.city ?? "").toString()}
                           </span>
                        </div>
                     </div>

                     
                  </div>
               </div>
            </div>
         </div>
         {/* Bottom sheet removed; navigating to /location-commute instead */}
      </div>
   );
};


// {/* Find Nearby Spots Card - Responsive sizing */}
//                      {/* <div className="bg-white/10 backdrop-blur-[6px] w-[100%] rounded-[14px] lg:rounded-2xl p-[10.5px] py-3 lg:p-4 flex items-center gap-[10.5px] lg:gap-4 max-w-lg lg:mx-auto" onClick={openLocationsSheet}>
//                         {/* Icon */}
//                         <img
//                            src={time}
//                            alt="time"
//                            className="w-10 h-10 lg:w-10 lg:h-10"
//                         />

//                         {/* Content */}
//                         <div className="flex-1 flex flex-col items-start gap-1.5 lg:gap-2 min-w-0 lg:w-[30vw]">
//                            {/* <div className="w-full flex items-center justify-start">
//                               <p className="text-white text-[14px] lg:text-sm font-medium leading-[14px] lg:leading-5">
//                                  Find Nearby Spots
//                               </p>
//                            </div> */}

//                            {/* Nearby Spots Info - Responsive layout */}
//                            {/* <div className="flex items-center justify-center gap-3.5 lg:gap-6 flex-wrap">
//                               {(location?.nearbySpots ?? []).map((spot, index) => (
//                                  <div
//                                     key={index}
//                                     className="flex items-center gap-[3.5px] lg:gap-1.5"
//                                  >
//                                     <div className="w-[13.5px] h-[13.5px] lg:w-3 lg:h-3 flex-shrink-0">
//                                        {spot.type === "transport" && (
//                                           <img
//                                              src={building}
//                                              alt="building"
//                                              className="w-full h-full "
//                                           />
//                                        )}
//                                        {spot.type === "healthcare" && (
//                                           <img
//                                              src={train}
//                                              alt="train"
//                                              className="w-full h-full "
//                                           />
//                                        )}
//                                        {spot.type === "food" && (
//                                           <img
//                                              src={food}
//                                              alt="food"
//                                              className="w-full h-full "
//                                           />
//                                        )}
//                                     </div>
//                                     <span className="text-white/90 text-[12.3px] lg:text-sm font-medium leading-[17.5px] whitespace-nowrap">
//                                        {spot.timeEstimate}
//                                     </span>
//                                  </div>
//                               ))}
//                            </div> */}
//                         </div>

//                         {/* Arrow Icon */}
//                         <img
//                            src={rightArrow}
//                            alt="rightArrow"
//                            className="w-6 h-6"
//                         />
//                      </div> 