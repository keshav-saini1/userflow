import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import type { PropertyDetailPageData } from "../types";
import ImageGallery, {
   type GalleryCategory,
} from "../../../components/ImageGallery";
import { HighlightsBottomSheet, IncludedServicesBottomSheet, AddOnServicesBottomSheet, PoliciesAndRulesBottomSheet, MarketingDescriptionBottomSheet } from "../components";
import back from "@/assets/default_back.svg";
import heart from "@/assets/default_heart.svg";
import share from "@/assets/default_share.svg";
import { ImageCarousel, UnitCard, VideoPlayer, VideoModal } from "@/components";
import { useNavigate } from "react-router";

interface PropertyDetailsPageProps {
   propertyData: PropertyDetailPageData;
   onBookVisit: () => void;
   onAskQuestion: () => void;
}

export default function PropertyDetailsPage({
   propertyData,
   onBookVisit,
   onAskQuestion,
}: PropertyDetailsPageProps) {
   
   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
   const [isHighlightsSheetOpen, setIsHighlightsSheetOpen] = useState(false);
   const [isIncludedServicesSheetOpen, setIsIncludedServicesSheetOpen] = useState(false);
   const [isAddOnServicesSheetOpen, setIsAddOnServicesSheetOpen] = useState(false);
   const [isPoliciesRulesSheetOpen, setIsPoliciesRulesSheetOpen] = useState(false);
   const [isMarketingDescriptionSheetOpen, setIsMarketingDescriptionSheetOpen] = useState(false);
   const [selectedVideo, setSelectedVideo] = useState<{ src: string; title?: string } | null>(null);
   const navigate = useNavigate();

   console.log({propertyData})

   // Convert property data to gallery categories format
   const galleryCategories: GalleryCategory[] = [
      // Group photos by category if they have categories, otherwise show all photos
      ...(() => {
         const photoCategories = (propertyData?.photos || []).reduce((acc, photo) => {
            const category = photo?.category || "General";
            if (!acc[category]) {
               acc[category] = [];
            }
            acc[category].push({
               id: `photo-${photo?.id || 'unknown'}`,
               src: photo?.url || '',
               alt: photo?.category || 'photo',
               category: category.toLowerCase().replace(" ", "-"),
            });
            return acc;
         }, {} as Record<string, { id: string; src: string; alt: string; category: string }[]>);

         return Object.entries(photoCategories).map(
            ([categoryName, images]) => ({
               id: categoryName.toLowerCase().replace(" ", "-"),
               name: categoryName,
               count: images?.length || 0,
               images: images || [],
            })
         );
      })(),
      // Videos category
      {
         id: "videos",
         name: "Videos",
         count: propertyData?.videos?.length || 0,
         images: (propertyData?.videos || []).map((video, index) => ({
            id: `video-${index}`,
            src: video?.url || '',
            alt: video?.title || 'video',
            category: "videos",
            isVideo: true,
            thumbnail: video?.thumbnail || video?.url || '',
         })),
      },
   ];

   const handleViewAllPhotos = () => {
      setIsGalleryOpen(true);
   };

   const handleCloseGallery = () => {
      setIsGalleryOpen(false);
   };

   const handleCloseHighlightsSheet = () => {
      setIsHighlightsSheetOpen(false);
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

   const handleOpenLocationCommuteSheet = () => {
     navigate('/location-commute')
   };

   const handleOpenPoliciesRulesSheet = () => {
      setIsPoliciesRulesSheetOpen(true);
   };

   const handleClosePoliciesRulesSheet = () => {
      setIsPoliciesRulesSheetOpen(false);
   };

   const handleOpenMarketingDescriptionSheet = () => {
      setIsMarketingDescriptionSheetOpen(true);
   };

   const handleCloseMarketingDescriptionSheet = () => {
      setIsMarketingDescriptionSheetOpen(false);
   };

   const handleVideoClick = (video: { src: string; title?: string }) => {
      setSelectedVideo(video);
   };

   const handleCloseVideoModal = () => {
      setSelectedVideo(null);
   };

   return (
      <div className="min-h-screen w-screen bg-gray-50">
         {/* Header */}
         <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <img src={back} alt="back" className="w-10 h-10" onClick={() => navigate(-1)} />
                     <h1 className="text-sm lg:text-base font-semibold text-gray-900">
                        Rental Option Details
                     </h1>
                  </div>
                  <div className="flex items-center gap-2">
                     <img src={heart} alt="heart" className="w-10 h-10" />
                     <img src={share} alt="share" className="w-10 h-10" />
                  </div>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
               {/* Main Content - Left Column */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Hero Image Carousel */}

                  <div onClick={handleViewAllPhotos}>
                     <ImageCarousel
                        images={propertyData?.heroImages || []}
                        showNavigation={false}
                        autoPlay={true}
                        className="h-56"
                     />
                  </div>

                  {/* Property Info */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <div className="space-y-6">
                        {/* Title and Tags */}
                        <div className="space-y-3">
                           <div className="space-y-3">
                              <h2 className="text-base lg:text-xl font-semibold text-gray-900">
                                 {propertyData?.title || 'Property'}
                              </h2>
                              <div className="flex gap-2 flex-wrap">
                                 {(propertyData?.tags || []).map((tag) => (
                                    <span
                                       key={tag}
                                       className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg"
                                    >
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                           </div>

                           {/* Pricing */}
                           <div className="flex justify-between items-start">
                              <div>
                                 <p className="text-xs text-gray-500">Rent</p>
                                 <div className="flex items-baseline gap-2">
                                    <span className="text-lg lg:text-2xl font-semibold text-blue-600">
                                       ₹
                                       {(propertyData?.pricing?.currentPrice || 0).toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                       monthly
                                    </span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-xs text-gray-500">
                                    Deposit
                                 </p>
                                 <span className="text-lg lg:text-2xl font-semibold text-blue-600">
                                    ₹{(propertyData?.deposit || 0).toLocaleString()}
                                 </span>
                              </div>
                           </div>

                           {/* Savings */}
                           {propertyData?.pricing?.originalPrice && (
                              <div className="flex items-center gap-2">
                                 <span className="text-xs text-gray-400 line-through">
                                    ₹
                                    {(propertyData.pricing.originalPrice || 0).toLocaleString()}
                                 </span>
                                 <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg">
                                    Save ₹
                                    {(propertyData.pricing.savingsAmount || 0).toLocaleString()}
                                 </span>
                              </div>
                           )}
                        </div>

                        {/* Available Units */}
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <div>
                                 <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                                    Available units
                                 </h3>
                                 <p className="text-xs text-gray-500">
                                    Choose your perfect space
                                 </p>
                              </div>
                              <button className="text-xs text-blue-600 underline hover:text-blue-700">
                                 View all
                              </button>
                           </div>

                           {/* Horizontally scrollable units */}
                           <div className="overflow-x-auto ">
                              <div className="flex gap-4 min-w-[340px] scrollbar-hide">
                                 {(propertyData?.availableUnits?.slice(0, 5) || []).map((unit) => (
                                    <UnitCard
                                       key={unit?.id || 'unknown'}
                                       unit={{
                                          id: unit?.id || 'unknown',
                                          image: unit?.image || '',
                                          name: unit?.name || 'Unit',
                                          floor: unit?.floor || 0,
                                          pricePerBed: unit?.pricePerBed || 0,
                                          occupancy: unit?.occupancy || '',
                                          amenities: unit?.amenities || [],
                                          availableFrom: unit?.availableFrom || '',
                                       }}
                                    />
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Rental Details */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">
                        Rental Terms
                     </h3>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {[
                           {
                              label: "Lock-in Period",
                              value: propertyData?.rentalDetails?.lockInPeriod || '',
                           },
                           {
                              label: "Stay Duration",
                              value: propertyData?.rentalDetails?.stayDuration || '',
                           },
                           {
                              label: "Notice Period",
                              value: propertyData?.rentalDetails?.noticePeriod || '',
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

                  {/* Description */}
                  {/* <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-3">
                        Description
                     </h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                        {propertyData?.description || 'No description available'}
                        <button className="text-blue-600 font-medium ml-2 hover:text-blue-700">
                           See more
                        </button>
                     </p>
                  </div> */}

                  {/* Option Highlights */}
                  {/* <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                           Highlights
                        </h3>
                        <button onClick={handleViewAllHighlights}>
                           <FiChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                     </div>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {(propertyData?.highlights || []).map((highlight) => (
                           <div
                              key={highlight}
                              className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2"
                           >
                              <img
                                 src={double_tick}
                                 alt="double_tick"
                                 className="w-4 h-4"
                              />
                              <span className="text-xs text-gray-600">
                                 {highlight}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div> */}

                  {/* Amenities & Features */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">
                        Amenities & Features
                     </h3>

                     {/* Furniture */}
                     <div className="mb-6">
                        <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                           <span className="text-xs font-medium text-blue-900">
                              Furniture
                           </span>
                        </div>
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
                           {(propertyData?.furniture || []).map((item) => (
                              <div
                                 key={item?.id || 'unknown'}
                                 className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-sm transition-shadow"
                              >
                                 <div className="w-7 h-7 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
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
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                           {(propertyData?.appliances || []).map((item) => (
                              <div
                                 key={item?.id || 'unknown'}
                                 className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-sm transition-shadow"
                              >
                                 <div className="w-7 h-7 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
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

                  {/* Included Services */}
                  {/* <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">
                        Included Services
                     </h3>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {(propertyData?.includedServices || []).map((service) => (
                           <div
                              key={service?.id || 'unknown'}
                              className="flex items-center gap-3"
                           >
                              <img src={single_tick} alt="single_tick" className="w-6 h-6" />
                              <span className="text-xs text-gray-600">
                                 {service?.name || 'Service'}
                              </span>
                           </div>
                        ))}
                     </div>
                     <button 
                        onClick={handleViewAllIncludedServices}
                        className="text-xs font-semibold text-blue-600 mt-4 hover:text-blue-700"
                     >
                        View all details
                     </button>
                  </div> */}

                  {/* Add-On Services */}
                  {/* <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">
                        Add-On Services
                     </h3>
                     <div className="space-y-4">
                        {(propertyData?.addOnServices || []).map((service) => (
                           <div
                              key={service?.id || 'unknown'}
                              className="flex justify-between"
                           >
                              <span className="text-xs text-gray-500">
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
                        className="text-xs font-semibold text-blue-600 mt-4 hover:text-blue-700"
                     >
                        View all details
                     </button>
                  </div> */}

                  {/* Location */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <div className="flex justify-between items-center mb-4">
                        <div>
                           <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                              Where you'll be
                           </h3>
                           <p className="text-xs text-gray-500">
                              {propertyData?.location?.area || 'Area'},{" "}
                              {propertyData?.location?.city || 'City'}
                           </p>
                        </div>
                        <button 
                           onClick={handleOpenLocationCommuteSheet}
                           className="text-xs font-medium text-blue-600 underline hover:text-blue-700"
                        >
                           Explore area
                        </button>
                     </div>
                     <div className="h-42 lg:h-64 bg-gray-100 rounded-xl overflow-hidden">
                        <img
                           src={propertyData?.location?.mapImage || ''}
                           alt="Location map"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </div>

                  {/* Photos & Videos */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm lg:text-base font-semibold text-gray-900">
                           Photos & Videos
                        </h3>
                        <button
                           onClick={handleViewAllPhotos}
                           className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                           View All
                        </button>
                     </div>

                     {/* Photos */}
                     <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-3">Photos</p>
                        <div className="grid grid-cols-4 lg:grid-cols-6 gap-3">
                           {(propertyData?.photos?.slice(0, 6) || []).map((photo) => (
                              <div
                                 key={photo?.id || 'unknown'}
                                 className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                              >
                                 <img
                                    src={photo?.url || ''}
                                    alt={photo?.category || 'photo'}
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                           ))}
                           <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-500">
                                 +{(propertyData?.photos?.length) - 6}
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Videos */}
                     <div>
                        <p className="text-xs text-gray-500 mb-3">Videos</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                           {(propertyData?.videos || []).map((video) => (
                              <div
                                 key={video?.id || 'unknown'}
                                 className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                                 onClick={() => handleVideoClick({ src: video?.url || '', title: video?.title })}
                              >
                                 <VideoPlayer
                                    src={video?.url || ''}
                                    thumbnail={video?.thumbnail || ''}
                                    title={video?.title || 'Video'}
                                    className="w-full h-full"
                                    showControls={false}
                                    autoPlay={false}
                                    muted={true}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Policies and Rules */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">
                        Policies and Rules
                     </h3>
                     <div className="space-y-2">
                        {(propertyData?.policies || []).map((policy, index) => (
                           <div key={policy?.id || index} className="flex gap-2">
                              <span className="text-xs font-medium text-gray-900">
                                 {index + 1}.
                              </span>
                              <span className="text-xs text-gray-600">
                                 {policy?.rule || 'No rule specified'}
                              </span>
                           </div>
                        ))}
                     </div>
                     <button 
                        onClick={handleOpenPoliciesRulesSheet}
                        className="text-xs font-semibold text-blue-600 mt-4 hover:text-blue-700"
                     >
                        See more
                     </button>
                  </div>

                  {/* Marketing Description */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                     <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">
                        Marketing Description
                     </h3>
                     <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-600">
                           Room Type
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                           {propertyData?.marketingDescription || 'No marketing description available'}
                           <button 
                              onClick={handleOpenMarketingDescriptionSheet}
                              className="text-blue-600 font-bold underline ml-2 hover:text-blue-700"
                           >
                              See more
                           </button>
                        </p>
                     </div>
                  </div>
               </div>

               {/* Sidebar - Right Column */}
               <div className="lg:col-span-1 hidden lg:block">
                  {/* Sticky Action Card */}
                  <div className="sticky top-24 bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Interested in this property?
                     </h3>
                     <div className="space-y-4">
                        <button
                           onClick={onBookVisit}
                           className="w-full h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-medium hover:bg-gray-800 transition-colors"
                        >
                           Book a Visit
                        </button>
                        <button
                           onClick={onAskQuestion}
                           className="w-full h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                        >
                           Ask Question
                        </button>
                     </div>

                     {/* Quick Info */}
                     <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                           Quick Info
                        </h4>
                        <div className="space-y-2">
                           <div className="flex justify-between">
                              <span className="text-xs text-gray-500">
                                 Monthly Rent
                              </span>
                              <span className="text-xs font-semibold text-gray-900">
                                 ₹
                                 {(propertyData?.pricing?.currentPrice || 0).toLocaleString()}
                              </span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-xs text-gray-500">
                                 Deposit
                              </span>
                              <span className="text-xs font-semibold text-gray-900">
                                 ₹{(propertyData?.deposit || 0).toLocaleString()}
                              </span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-xs text-gray-500">
                                 Available Units
                              </span>
                              <span className="text-xs font-semibold text-gray-900">
                                 {propertyData?.availableUnits?.length || 0}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Action Bar - Mobile Only */}
         <div className="lg:hidden bg-white border-t border-gray-100 sticky bottom-0 p-4">
            <div className="flex gap-3">
               <button
                  onClick={onAskQuestion}
                  className="flex-1 h-11 bg-white border border-gray-300 rounded-xl flex items-center justify-center gap-2"
               >
                  <span className="text-xs font-medium text-gray-600">
                     Ask Question
                  </span>
               </button>
               <button
                  onClick={onBookVisit}
                  className="flex-1 h-11 bg-gray-900 rounded-xl flex items-center justify-center gap-2"
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
                     onImageClick={(image) =>
                        console.log("Image clicked:", image)
                     }
                     onCategoryChange={(category) =>
                        console.log("Category changed:", category)
                     }
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

         {/* Highlights Bottom Sheet */}
         <HighlightsBottomSheet
            isOpen={isHighlightsSheetOpen}
            onClose={handleCloseHighlightsSheet}
            highlights={(propertyData?.highlights || []).map((highlight, index) => ({
               id: `highlight-${index}`,
               name: highlight,
            }))}
         />

         {/* Included Services Bottom Sheet */}
         <IncludedServicesBottomSheet
            isOpen={isIncludedServicesSheetOpen}
            onClose={handleCloseIncludedServicesSheet}
            services={propertyData?.includedServices || []}
         />

         {/* Add-On Services Bottom Sheet */}
         <AddOnServicesBottomSheet
            isOpen={isAddOnServicesSheetOpen}
            onClose={handleCloseAddOnServicesSheet}
            services={propertyData?.addOnServices || []}
         />

         {/* Location & Commute Bottom Sheet */}
         {/* <LocationCommuteBottomSheet
            isOpen={isLocationCommuteSheetOpen}
            onClose={handleCloseLocationCommuteSheet}
            propertyName={propertyData.title}
         /> */}

         {/* Policies and Rules Bottom Sheet */}
         <PoliciesAndRulesBottomSheet
            isOpen={isPoliciesRulesSheetOpen}
            onClose={handleClosePoliciesRulesSheet}
         />

         {/* Marketing Description Bottom Sheet */}
         <MarketingDescriptionBottomSheet
            isOpen={isMarketingDescriptionSheetOpen}
            onClose={handleCloseMarketingDescriptionSheet}
         />

         {/* Video Modal */}
         {selectedVideo && (
            <VideoModal
               isOpen={!!selectedVideo}
               onClose={handleCloseVideoModal}
               src={selectedVideo.src}
               title={selectedVideo.title}
            />
         )}
      </div>
   );
}
