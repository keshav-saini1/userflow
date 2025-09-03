import React, { useState } from "react";
import { PropertyCard } from "../components";
import { useNavigate } from "react-router";
import { samplePropertyListing } from "../data/sampleData";
import default_back from "@/assets/default_back.svg";
import filter from "@/assets/property/filter.svg";
import menu from "@/assets/property/menu.svg";

const RentalOptionsPage: React.FC = () => {
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedFilter, setSelectedFilter] = useState<string>("all");
   
   // Using sample data for rental options
   const allProperties = samplePropertyListing.properties || [];
   
   // Filter properties based on search and selected filter
   const filteredProperties = allProperties.filter((property) => {
      const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.occupancy.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === "all" || 
                           property.type === selectedFilter ||
                           property.status === selectedFilter;
      
      return matchesSearch && matchesFilter;
   });

   const onPropertyClick = (propertyId: string) => {
      navigate(`/property-details/${propertyId}`);
   };
   
   const onReserve = (propertyId: string) => {
      navigate(`/reservation/${propertyId}`);
   };
   
   const onBookVisit = (propertyId: string) => {
      navigate(`/book-visit/${propertyId}`);
   };

   const filterOptions = [
      { value: "all", label: "All Options" },
      { value: "available", label: "Available" },
      { value: "deluxe", label: "Deluxe" },
      { value: "shared", label: "Shared" },
      { value: "suite", label: "Suite" },
      { value: "budget", label: "Budget" },
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
                        {filteredProperties.length} options available
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
                     No rental options found
                  </h3>
                  <p className="text-gray-500 text-center">
                     {searchQuery
                        ? "Try adjusting your search terms or filters"
                        : "No properties match your current filters"}
                  </p>
               </div>
            ) : (
               <>
                  {/* Results Summary */}
                  <div className="mb-4">
                     <p className="text-sm text-gray-600">
                        Showing {filteredProperties.length} of {allProperties.length} rental options
                        {selectedFilter !== "all" && ` • Filtered by: ${filterOptions.find(f => f.value === selectedFilter)?.label}`}
                     </p>
                  </div>

                  {/* Property Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {filteredProperties.map((property) => (
                        <PropertyCard
                           key={property.id}
                           property={property}
                           onPropertyClick={onPropertyClick}
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
