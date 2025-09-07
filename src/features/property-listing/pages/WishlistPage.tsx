import React, { useState, useMemo, useEffect } from "react";
import { PropertyCard } from "../components";
import { useNavigate } from "react-router";
import default_back from "@/assets/default_back.svg";
import filter from "@/assets/property/filter.svg";
import menu from "@/assets/property/menu.svg";
import { useWishlistApi } from "../api/useWishlistApi";

const WishlistPage: React.FC = () => {
   const navigate = useNavigate();
   const { wishlistItems, isLoadingWishlist, isWishlistError, wishlistError, refetchWishlist } = useWishlistApi();
   const [searchQuery, setSearchQuery] = useState("");

   // Transform wishlist API data to match PropertyCard expected format
   const wishlistProperties = useMemo(() => {
      if (!wishlistItems?.data) return [];
      
      // Transform API response to match PropertyDetails interface
      return wishlistItems.data.map((item) => ({
         id: item.property_id,
         name: item.propertyName,
         type: item.sharingType === 1 ? "Single" : item.sharingType === 2 ? "Double" : "Multiple",
         occupancy: item.displayName,
         pricing: {
            currentPrice: item.rent,
            period: "monthly"
         },
         ...(item.room_id && { room_id: item.room_id }),
         address: item.propertyAddress,
         amenities: [], // Add amenities if available in your API
         image: item.image,
         location: `${item.propertyAddress.city}, ${item.propertyAddress.state}`,
         availableFrom: item.availableFrom,
         status: item.isAvailable ? 'available' as const : 'booked' as const
      }));
   }, [wishlistItems]);

   // Filter properties based on search query
   const filteredProperties = useMemo(() => {
      if (!searchQuery.trim()) return wishlistProperties;
      
      return wishlistProperties.filter((property) =>
         property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
   }, [wishlistProperties, searchQuery]);

   const onPropertyClick = (propertyId: string, room_id?: string) => {
      if(propertyId && room_id){
         navigate(`/room-details/${room_id}`);
      }else{
         navigate(`/property-details/2/${propertyId}`);
      }
   };
   const onReserve = () => {
      navigate(`/reservation`);
   };
   const onBookVisit = () => {
      navigate(`/book-visit`);
   };

   useEffect(() => {
      refetchWishlist();
   }, [refetchWishlist]);

   return (
      <div className="min-h-screen bg-gray-50 w-screen">
         {/* Header */}
         <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/10">
            <div className="flex items-center justify-between p-4">
               <div className="flex items-center gap-3">
                  <button onClick={() => navigate(-1)}>
                     <img
                        src={default_back}
                        alt="default_back"
                        className="w-10 h-10"
                     />
                  </button>
                  <div>
                     <p className="text-sm text-gray-600">
                        {filteredProperties.length} properties saved
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                     <img src={filter} alt="filter" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                     <img src={menu} alt="menu" />
                  </button>
               </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 pb-4">
               <div className="relative">
                  <input
                     type="text"
                     placeholder="Search properties..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="block w-full pl-3 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="p-4">
            {/* Loading State */}
            {isLoadingWishlist && (
               <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Loading your wishlist...</p>
               </div>
            )}

            {/* Error State */}
            {isWishlistError && (
               <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load wishlist</h3>
                  <p className="text-gray-500 text-center mb-4">
                     {wishlistError?.message || "Something went wrong while loading your wishlist"}
                  </p>
                  <button
                     onClick={() => refetchWishlist()}
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     Try Again
                  </button>
               </div>
            )}

            {/* Wishlist Content */}
            {!isLoadingWishlist && !isWishlistError && (
               filteredProperties.length === 0 ? (
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
                        propertyId={property.id}
                        room_id={property.room_id}
                        key={property.id}
                        property={property}
                        onPropertyClick={(propertyId) => onPropertyClick(propertyId, property.room_id)}
                        onReserve={onReserve}
                        onBookVisit={onBookVisit}
                        isLongCardView={true}
                     />
                  ))}
               </div>
            )
            )}
         </div>
      </div>
   );
};

export default WishlistPage;
