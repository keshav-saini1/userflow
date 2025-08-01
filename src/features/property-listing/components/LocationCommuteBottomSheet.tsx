import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BaseBottomSheet } from "@/components";
import metro from "@/assets/property/metro.svg";
import complex from "@/assets/property/complex.svg";

interface LocationCommuteBottomSheetProps {
   isOpen: boolean;
   onClose: () => void;
   propertyName?: string;
}

interface NearbyPlace {
   id: string;
   name: string;
   distance: string;
   travelTime: string;
   travelMode: string;
   icon: string;
}

const LocationCommuteBottomSheet: React.FC<LocationCommuteBottomSheetProps> = ({
   isOpen,
   onClose,
   propertyName = "Nirvana Homes, Gurgaon",
}) => {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState("daily-essentials");

   const nearbyPlaces: NearbyPlace[] = [
      {
         id: "1",
         name: "Iffco Chowk Metro Station",
         distance: "150m",
         travelTime: "2 min",
         travelMode: "walk",
         icon: metro,
      },
      {
         id: "2",
         name: "DLF Cyber City",
         distance: "1.2km",
         travelTime: "8 min",
         travelMode: "walk",
         icon: complex,
      },
      {
         id: "3",
         name: "Rapid Metro Sikanderpur",
         distance: "400m",
         travelTime: "5 min",
         travelMode: "walk",
         icon: metro,
      },
   ];

   const tabs = [
      { id: "daily-essentials", label: "Daily Essentials" },
      { id: "work-hubs", label: "Work Hubs" },
      { id: "food-cafes", label: "Food & Cafes" },
      { id: "shopping", label: "Shopping" },
   ];

   return (
      <BaseBottomSheet
         isOpen={isOpen}
         onClose={onClose}
         title="Location & Commute"
         headerClassName="bg-gray-50"
         bodyClassName="bg-gray-50"
      > 
         <div className="flex flex-col">
               {/* Property Info Section */}
               <div className="bg-white px-4 py-5">
                  <div className="text-center space-y-2">
                     <h1 className="text-xl font-bold text-gray-900">
                        {propertyName}
                     </h1>
                     <p className="text-sm text-gray-500">
                        Search for any place to get accurate commute times
                     </p>
                  </div>
               </div>

               {/* Map Section */}
               <div className="px-4 pb-4">
                  <div className="relative h-40 bg-gray-100 rounded-2xl overflow-hidden">
                     {/* Map placeholder - you can replace with actual map component */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                        <div className="text-center">
                           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                              <span className="text-2xl">🏠</span>
                           </div>
                           <div className="bg-white px-3 py-1 rounded-lg shadow-sm">
                              <p className="text-xs font-semibold text-gray-900">
                                 {propertyName}
                              </p>
                              <p className="text-xs text-gray-500">
                                 Your new home
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Location markers */}
                     <div className="absolute top-6 left-4 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm" />
                     <div className="absolute top-6 right-4 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
                     <div className="absolute bottom-6 right-4 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
                     <div className="absolute bottom-6 left-1/3 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
                  </div>
               </div>

               {/* Search Section */}
               <div className="px-4 pb-4">
                  <div className="relative">
                     <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <IoSearch className="w-4 h-4 text-gray-400" />
                     </div>
                     <input
                        type="text"
                        placeholder="Search for your office, gym, restaurant..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
               </div>

               {/* Tabs */}
               <div className="px-4 pb-4">
                  <div className="bg-gray-50 rounded-xl p-1 flex gap-1 overflow-x-auto">
                     {tabs.map((tab) => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={` py-2 px-3 w-max rounded-lg text-xs font-medium transition-colors ${
                              activeTab === tab.id
                                 ? "bg-gray-900 text-white"
                                 : "text-gray-600 hover:text-gray-900"
                           }`}
                        >
                           {tab.label}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Nearby Places */}
               <div className="px-4 pb-6 space-y-3">
                  {nearbyPlaces.map((place) => (
                     <div
                        key={place.id}
                        className="bg-white rounded-xl shadow-sm p-4"
                     >
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3 flex-1">
                              <img
                                 src={place.icon}
                                 alt={place.name}
                                 className="w-10 h-10"
                              />
                              <div className="flex-1">
                                 <h3 className="text-sm font-medium text-gray-900">
                                    {place.name}
                                 </h3>
                                 <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">
                                       {place.distance}
                                    </span>
                                    <span className="text-xs text-gray-300">
                                       •
                                    </span>
                                    <span className="text-xs text-gray-500">
                                       {place.travelMode}
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">
                                 {place.travelTime}
                              </p>
                              <p className="text-xs text-gray-500">travel</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </BaseBottomSheet>
      );
};

export default LocationCommuteBottomSheet;
