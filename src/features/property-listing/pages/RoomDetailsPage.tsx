import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import { usePropertyStore } from "../store";
import ImageGallery, { type GalleryCategory } from "../../../components/ImageGallery";
import { IncludedServicesBottomSheet, AddOnServicesBottomSheet, PoliciesAndRulesBottomSheet } from "../components";
import { VideoModal } from "@/components";
import back from "@/assets/default_back.svg";
import heart from "@/assets/default_heart.svg";
import share from "@/assets/default_share.svg";
import calendar from "@/assets/property/calendar_bw.svg";

export default function RoomDetailsPage() {
   const navigate = useNavigate();
   const propertyId = localStorage.getItem('selectedPropertyId');
   const { roomId } = useParams();
   const { propertyDetails, getAvailableUnits } = usePropertyStore();
   const availableUnits = getAvailableUnits();

   // Find the specific room/unit from available units
   const roomData = availableUnits?.find((unit: any) => unit.id === roomId);
   
   // State for modals and bottom sheets
   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
   const [isIncludedServicesSheetOpen, setIsIncludedServicesSheetOpen] = useState(false);
   const [isAddOnServicesSheetOpen, setIsAddOnServicesSheetOpen] = useState(false);
   const [isPoliciesRulesSheetOpen, setIsPoliciesRulesSheetOpen] = useState(false);
   const [selectedVideo, setSelectedVideo] = useState<{ src: string; title?: string } | null>(null);

   // If no room data found, show error
   if (!roomData) {
      return (
         <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Room not found</h2>
               <p className="text-gray-600 mb-4">The room you're looking for doesn't exist.</p>
               <button 
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
               >
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   const handleBookVisit = () => {
      navigate(`/book-visit/${roomId}`);
   };

   const handleReserve = () => {
      navigate(`/reservation/${propertyId}/${roomId}`);
   };

   // Gallery and bottom sheet handlers
   const handleViewAllPhotos = () => {
      setIsGalleryOpen(true);
   };

   const handleCloseGallery = () => {
      setIsGalleryOpen(false);
   };

   const handleViewAllIncludedServices = () => {
      setIsIncludedServicesSheetOpen(true);
   };

   const handleCloseIncludedServicesSheet = () => {
      setIsIncludedServicesSheetOpen(false);
   };

   const handleViewAllAddOnServices = () => {
      setIsAddOnServicesSheetOpen(true);
   };

   const handleCloseAddOnServicesSheet = () => {
      setIsAddOnServicesSheetOpen(false);
   };

   const handleOpenPoliciesRulesSheet = () => {
      setIsPoliciesRulesSheetOpen(true);
   };

   const handleClosePoliciesRulesSheet = () => {
      setIsPoliciesRulesSheetOpen(false);
   };

   const handleOpenLocationCommuteSheet = () => {
      navigate('/location-commute');
   };

   // const handleVideoClick = (video: { src: string; title?: string }) => {
   //    setSelectedVideo(video);
   // };

   const handleCloseVideoModal = () => {
      setSelectedVideo(null);
   };

   // Convert room data to gallery categories format - only room-specific content
   const galleryCategories: GalleryCategory[] = [
      // Room photos - use images array if available, fallback to single image
      {
         id: "room-photos",
         name: "Room Photos",
         count: roomData.images?.length || (roomData.image ? 1 : 0),
         images: roomData.images?.length ? 
            roomData.images.map((img, index) => ({
               id: img.id || `room-photo-${index}`,
               src: img.url,
               alt: `${roomData.name} - ${img.category}`,
               category: 'room-photos',
            })) : 
            (roomData.image ? [{
               id: 'room-photo-0',
               src: roomData.image,
               alt: `${roomData.name} photo`,
               category: 'room-photos',
            }] : []),
      },
   ];

   return (
      <div className="min-h-screen w-screen bg-gray-50">
         {/* Header */}
         <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
            <div className="px-4 py-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <img 
                        src={back} 
                        alt="back" 
                        className="w-10 h-10 cursor-pointer" 
                        onClick={() => navigate(-1)} 
                     />
                     <h1 className="text-sm font-semibold text-gray-900">
                        Room Details
                     </h1>
                  </div>
                  <div className="flex items-center gap-2">
                     <img src={heart} alt="heart" className="w-10 h-10 cursor-pointer" />
                     <img src={share} alt="share" className="w-10 h-10 cursor-pointer" />
                  </div>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="px-4 py-4">
            {/* Room Image */}
            <div className="mb-4">
               <img
                  src={roomData.image}
                  alt={roomData.name}
                  className="w-full h-48 object-cover rounded-xl"
               />
            </div>

            {/* Room Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
               <div className="space-y-4">
                  {/* Room Name and Floor */}
                  <div className="flex justify-between items-center">
                     <h2 className="font-bold text-gray-900 text-base">
                        {roomData.name}
                     </h2>
                     <span className="text-xs text-gray-500">
                        Floor {roomData.floor}
                     </span>
                  </div>

                  {/* Price and Occupancy */}
                  <div>
                     <p className="text-sm font-medium text-gray-600">
                        ₹ {roomData.pricePerBed?.toLocaleString()}/bed | {roomData.occupancy}
                     </p>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-3">
                     {(roomData.amenities || []).map((amenity: any, index: number) => (
                        <div key={amenity.id || index} className="flex items-center gap-2">
                           <img
                              src={amenity.icon}
                              alt={amenity.name}
                              className="w-4 h-4 object-contain"
                           />
                           <span className="text-xs text-gray-600">{amenity.name}</span>
                        </div>
                     ))}
                  </div>

                  {/* Available From */}
                  <div className="bg-blue-50 rounded-lg p-2">
                     <p className="text-xs text-gray-600 flex items-center gap-2">
                        <img src={calendar} alt="calendar" className="w-4 h-4 object-contain" />
                        Available from {roomData.availableFrom}
                     </p>
                  </div>
               </div>
            </div>

            {/* Property Information */}
            {propertyDetails && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                     Property Information
                  </h3>
                  <div className="space-y-3">
                     <div>
                        <h4 className="text-sm font-medium text-gray-900">
                           {propertyDetails.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                           {propertyDetails.location?.area}, {propertyDetails.location?.city}
                        </p>
                     </div>
                     
                     {/* Property Tags */}
                     <div className="flex gap-2 flex-wrap">
                        {(propertyDetails.tags || []).map((tag) => (
                           <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg"
                           >
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* Rental Terms */}
            {propertyDetails?.rentalDetails && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                     Rental Terms
                  </h3>
                  <div className="space-y-2">
                     {[
                        {
                           label: "Lock-in Period",
                           value: propertyDetails.rentalDetails.lockInPeriod || '',
                        },
                        {
                           label: "Stay Duration",
                           value: propertyDetails.rentalDetails.stayDuration || '',
                        },
                        {
                           label: "Notice Period",
                           value: propertyDetails.rentalDetails.noticePeriod || '',
                        },
                     ].map((item) => (
                        <div
                           key={item.label}
                           className="flex justify-between"
                        >
                           <span className="text-xs text-gray-500">
                              {item.label}
                           </span>
                           <span className="text-xs font-semibold text-gray-900">
                              {item.value}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Furniture & Appliances */}
            {propertyDetails && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                     Amenities & Features
                  </h3>

                  {/* Furniture */}
                  <div className="mb-6">
                     <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                        <span className="text-xs font-medium text-blue-900">
                           Furniture
                        </span>
                     </div>
                     <div className="grid grid-cols-3 gap-3">
                        {(propertyDetails.furniture || []).map((item: any) => (
                           <div
                              key={item?.id || 'unknown'}
                              className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-sm transition-shadow"
                           >
                              <div className="w-7 h-7 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                 <span className="text-sm">{item?.icon || '📦'}</span>
                              </div>
                              <span className="text-xs text-gray-600">
                                 {item?.name || 'Item'}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Appliances */}
                  <div>
                     <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                        <span className="text-xs font-medium text-blue-900">
                           Appliances
                        </span>
                     </div>
                     <div className="grid grid-cols-3 gap-3">
                        {(propertyDetails.appliances || []).map((item: any) => (
                           <div
                              key={item?.id || 'unknown'}
                              className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-sm transition-shadow"
                           >
                              <div className="w-7 h-7 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                 <span className="text-sm">{item?.icon || '📦'}</span>
                              </div>
                              <span className="text-xs text-gray-600">
                                 {item?.name || 'Item'}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* Included Services */}
            {propertyDetails?.includedServices && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                     Included Services
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                     {propertyDetails.includedServices.slice(0, 6).map((service: any) => (
                        <div
                           key={service?.id || 'unknown'}
                           className="flex items-center gap-2"
                        >
                           <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-xs text-green-600">✓</span>
                           </div>
                           <span className="text-xs text-gray-600">
                              {service?.name || 'Service'}
                           </span>
                        </div>
                     ))}
                  </div>
                  <button 
                     onClick={handleViewAllIncludedServices}
                     className="text-xs font-semibold text-blue-600 mt-3"
                  >
                     View all details
                  </button>
               </div>
            )}

            {/* Add-On Services */}
            {propertyDetails?.addOnServices && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                     Add-On Services
                  </h3>
                  <div className="space-y-3">
                     {propertyDetails.addOnServices.slice(0, 4).map((service: any) => (
                        <div
                           key={service?.id || 'unknown'}
                           className="flex justify-between items-center"
                        >
                           <span className="text-xs text-gray-600">
                              {service?.name || 'Service'}
                           </span>
                           <span className="text-xs font-semibold text-gray-900">
                              {service?.price || 'N/A'}
                           </span>
                        </div>
                     ))}
                  </div>
                  <button 
                     onClick={handleViewAllAddOnServices}
                     className="text-xs font-semibold text-blue-600 mt-3"
                  >
                     View all details
                  </button>
               </div>
            )}

            {/* Location */}
            {propertyDetails?.location && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                     <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                           Where you'll be
                        </h3>
                        <p className="text-xs text-gray-500">
                           {propertyDetails.location.area}, {propertyDetails.location.city}
                        </p>
                     </div>
                     <button 
                        onClick={handleOpenLocationCommuteSheet}
                        className="text-xs font-medium text-blue-600 underline"
                     >
                        Explore area
                     </button>
                  </div>
                  <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                     <img
                        src={propertyDetails.location.mapImage || ''}
                        alt="Location map"
                        className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            )}

            {/* Room Photos */}
            {(roomData.images?.length || roomData.image) && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                     <h3 className="text-sm font-semibold text-gray-900">
                        Room Photos ({roomData.images?.length || 1})
                     </h3>
                     <button 
                        onClick={handleViewAllPhotos}
                        className="text-xs font-semibold text-blue-600"
                     >
                        View All
                     </button>
                  </div>

                  {/* Room Photos Grid */}
                  <div className="grid grid-cols-2 gap-2">
                     {roomData.images?.length ? 
                        roomData.images.slice(0, 4).map((img, index) => (
                           <div
                              key={img.id || index}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                              onClick={handleViewAllPhotos}
                           >
                              <img
                                 src={img.url}
                                 alt={`${roomData.name} - ${img.category}`}
                                 className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                           </div>
                        )) : 
                        roomData.image && (
                           <div
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer col-span-2"
                              onClick={handleViewAllPhotos}
                           >
                              <img
                                 src={roomData.image}
                                 alt={`${roomData.name} photo`}
                                 className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                           </div>
                        )
                     }
                  </div>
               </div>
            )}

            {/* Policies and Rules */}
            {propertyDetails?.policies && (
               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                     Policies and Rules
                  </h3>
                  <div className="space-y-2">
                     {propertyDetails.policies.slice(0, 3).map((policy: any, index: number) => (
                        <div key={policy?.id || index} className="flex gap-2">
                           <span className="text-xs font-medium text-gray-900">
                              {index + 1}.
                           </span>
                           <span className="text-xs text-gray-600">
                              {policy?.rule || 'No rule specified'}
                           </span>
                        </div>
                     ))}
                     <button 
                        onClick={handleOpenPoliciesRulesSheet}
                        className="text-xs font-semibold text-blue-600 mt-2"
                     >
                        See more
                     </button>
                  </div>
               </div>
            )}
         </div>

         {/* Bottom Action Bar */}
         <div className="bg-white border-t border-gray-100 sticky bottom-0 p-4">
            <div className="flex gap-3">
               <button
                  onClick={handleReserve}
                  className="flex-1 h-11 bg-white border border-gray-300 rounded-xl flex items-center justify-center"
               >
                  <span className="text-xs font-medium text-gray-600">
                     Reserve Now
                  </span>
               </button>
               <button
                  onClick={handleBookVisit}
                  className="flex-1 h-11 bg-gray-900 rounded-xl flex items-center justify-center"
               >
                  <span className="text-xs font-medium text-white">
                     Book a Visit
                  </span>
               </button>
            </div>
         </div>

         {/* Image Gallery Modal */}
         {isGalleryOpen && (
            <div className="fixed inset-0 z-50 w-full h-full">
               {/* Backdrop */}
               <div
                  className="absolute inset-0 bg-black/80"
                  onClick={handleCloseGallery}
               />

               {/* Gallery Content */}
               <div className="relative w-full h-full">
                  <ImageGallery
                     categories={galleryCategories}
                     onImageClick={(image) => console.log("Image clicked:", image)}
                     onCategoryChange={(category) => console.log("Category changed:", category)}
                     className="w-full h-full"
                  />
                  <button
                     onClick={handleCloseGallery}
                     className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                     <FaChevronLeft className="w-5 h-5" />
                  </button>
               </div>
            </div>
         )}

         {/* Video Modal */}
         {selectedVideo && (
            <VideoModal
               src={selectedVideo.src}
               title={selectedVideo.title}
               isOpen={true}
               onClose={handleCloseVideoModal}
            />
         )}

         {/* Bottom Sheets */}
         {isIncludedServicesSheetOpen && (
            <IncludedServicesBottomSheet
               isOpen={isIncludedServicesSheetOpen}
               onClose={handleCloseIncludedServicesSheet}
               services={propertyDetails?.includedServices || []}
            />
         )}

         {isAddOnServicesSheetOpen && (
            <AddOnServicesBottomSheet
               isOpen={isAddOnServicesSheetOpen}
               onClose={handleCloseAddOnServicesSheet}
               services={propertyDetails?.addOnServices || []}
            />
         )}

         {isPoliciesRulesSheetOpen && (
            <PoliciesAndRulesBottomSheet
               isOpen={isPoliciesRulesSheetOpen}
               onClose={handleClosePoliciesRulesSheet}
            />
         )}
      </div>
   );
}
