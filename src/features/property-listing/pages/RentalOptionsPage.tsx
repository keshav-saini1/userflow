import React, { useState } from "react";
import { useNavigate } from "react-router";
import { usePropertyDetails, useAvailableUnits } from "../store/propertyStore";
import { PropertyCard } from "../components";
import type { PropertyDetails } from "../types";
import default_back from "@/assets/default_back.svg";

const RentalOptionsPage: React.FC = () => {
   const navigate = useNavigate();
   const [searchQuery] = useState("");
   const [selectedFilter] = useState<string>("all");
   
   // Get data from Zustand store
   const propertyDetails = usePropertyDetails();
   const allUnits = useAvailableUnits();

   // Transform units to PropertyDetails format for PropertyCard
   const transformUnitToProperty = (unit: any): PropertyDetails => ({
      id: unit.id,
      name: unit.name,
      type: unit.occupancy.toLowerCase().includes('single') ? 'single' : 
            unit.occupancy.toLowerCase().includes('double') ? 'double' : 'shared',
      occupancy: unit.occupancy,
      pricing: {
         currentPrice: unit.pricePerBed,
         period: "per bed"
      },
      address: unit.address,
      amenities: unit.amenities || [],
      image: unit.image,
      status: unit.availableFrom ? 'available' : 'booked',
      availableFrom: unit.availableFrom
   });

   const transformedProperties = allUnits.map(transformUnitToProperty);

   // Show loading state if no data available
   if (!propertyDetails || allUnits.length === 0) {
      return (
         <div className="min-h-screen bg-gray-50 w-screen flex items-center justify-center">
            <div className="text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading rental options...</h3>
               <p className="text-gray-500">Please wait while we fetch the available units</p>
            </div>
         </div>
      );
   }
   
   // Filter transformed properties based on search and selected filter
   const filteredProperties = transformedProperties.filter((property) => {
      const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.occupancy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.amenities.some(amenity => amenity.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = selectedFilter === "all" || 
                           property.type === selectedFilter ||
                           property.occupancy.toLowerCase().includes(selectedFilter.toLowerCase()) ||
                           (selectedFilter === "available" && property.status === 'available');
      
      return matchesSearch && matchesFilter;
   });

   console.log({filteredProperties})

   const onUnitClick = (unitId: string) => {
      // Navigate to room details page
      navigate(`/room-details/${unitId}`);
   };
   
   const onReserve = (unitId: string) => {
      navigate(`/reservation/${unitId}`);
   };
   
   const onBookVisit = (unitId: string) => {
      navigate(`/book-visit/${unitId}`);
   };

   const filterOptions = [
      { value: "all", label: "All Units" },
      { value: "single", label: "Single Occupancy" },
      { value: "double", label: "Double Sharing" },
      { value: "triple", label: "Triple Sharing" },
      { value: "available", label: "Available Now" },
   ];

   return (
      <div className="min-h-screen bg-gray-50 w-screen">
         {/* Header */}
         <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/10">
            <div className="flex items-center justify-between p-4">
               <div className="flex items-center gap-3">
                  <button onClick={() => navigate(-1)}>
                     <img
                        src={default_back}
                        alt="Go back"
                        className="w-10 h-10"
                     />
                  </button>
                  <div>
                     <h1 className="text-lg font-semibold text-gray-900">
                        Available Rental Options
                     </h1>
                     <p className="text-sm text-gray-600">
                        {filteredProperties.length} units available
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="p-4">
          
            {filteredProperties.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                     <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                     </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     No units found
                  </h3>
                  <p className="text-gray-500 text-center">
                     {searchQuery
                        ? "Try adjusting your search terms or filters"
                        : "No units match your current filters"}
                  </p>
               </div>
            ) : (
               <>
                  {/* Results Summary */}
                  <div className="mb-4">
                     <p className="text-sm text-gray-600">
                        Showing {filteredProperties.length} of {transformedProperties.length} available units
                        {selectedFilter !== "all" && ` • Filtered by: ${filterOptions.find(f => f.value === selectedFilter)?.label}`}
                     </p>
                  </div>

                  {/* Property Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {filteredProperties.map((property) => (
                        <PropertyCard
                           key={property.id}
                           property={property}
                           onPropertyClick={onUnitClick}
                           onReserve={onReserve}
                           onBookVisit={onBookVisit}
                           isLongCardView={true}
                        />
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default RentalOptionsPage;
