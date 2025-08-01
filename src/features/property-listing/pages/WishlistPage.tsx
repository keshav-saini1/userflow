import React, { useState } from "react";
import { FaArrowLeft, FaSearch, FaFilter, FaSort } from "react-icons/fa";
import { PropertyCard } from "../components";
import { useNavigate } from "react-router";
import { wishlistProperties } from "../data/wishlistData";

const WishlistPage: React.FC = () => {
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredProperties] = useState(wishlistProperties);

   const onPropertyClick = (propertyId: string) => {
      navigate(`/property-details/${propertyId}`);
   };
   const onReserve = () => {
      navigate(`/reservation`);
   };
   const onBookVisit = () => {
      navigate(`/book-visit`);
   };
   const onRemoveFromWishlist = () => {
      console.log("Remove from wishlist");
   };

   return (
      <div className="min-h-screen bg-gray-50 w-screen">
         {/* Header */}
         <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/10">
            <div className="flex items-center justify-between p-4">
               <div className="flex items-center gap-3">
                  <button
                     onClick={() => navigate(-1)}
                     className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                     <FaArrowLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <div>
                     <h1 className="text-lg font-semibold text-gray-900">
                        My Wishlist
                     </h1>
                     <p className="text-sm text-gray-600">
                        {filteredProperties.length} properties saved
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                     <FaSort className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                     <FaFilter className="w-4 h-4 text-gray-600" />
                  </button>
               </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 pb-4">
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                     type="text"
                     placeholder="Search properties..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                     </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     No properties found
                  </h3>
                  <p className="text-gray-500 text-center">
                     {searchQuery
                        ? "Try adjusting your search terms"
                        : "Start adding properties to your wishlist"}
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProperties.map((property) => (
                     <PropertyCard
                        key={property.id}
                        property={property}
                        onPropertyClick={onPropertyClick}
                        onReserve={onReserve}
                        onBookVisit={onBookVisit}
                        onRemoveFromWishlist={onRemoveFromWishlist}
                        isWishlistView={true}
                     />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default WishlistPage;
