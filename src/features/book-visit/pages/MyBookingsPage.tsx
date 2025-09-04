import React, { useState, useEffect } from "react";
import {
   FaSearch,
   FaCalendar,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import default_back from "@/assets/default_back.svg";
import { GoChevronDown } from "react-icons/go";
import BookingCard, { type Booking } from "../../property-listing/components/BookingCard";
import { useBookVisitApi, type Visit } from "../api/useBookVisitApi";

const MyBookingsPage: React.FC = () => {
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");
   const [filterType, setFilterType] = useState("all");
   const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
   const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

   // Filter options
   const filterOptions = [
      { value: "all", label: "All Bookings" },
      { value: "upcoming", label: "Upcoming" },
      { value: "completed", label: "Done" },
      { value: "cancelled", label: "Cancelled" }
   ];

   // API hook
   const { listVisits, isLoadingVisits, listVisitsError, listVisitsData } = useBookVisitApi();


   // Transform API data to Booking format using dummy data structure as reference
   const transformVisitToBooking = (visit: Visit): Booking => {
      // Map visit_type to bookingType based on dummy data patterns
      const getBookingType = (visitType: string): Booking['bookingType'] => {
         switch (visitType.toLowerCase()) {
            case 'visit-property':
            case 'property-visit':
               return 'visit';
            case 'live-video-tour':
            case 'video-tour':
               return 'live-tour';
            case 'phone-call':
            case 'call':
               return 'call';
            default:
               return 'visit';
         }
      };

      // Map status to match dummy data status values
      const getStatus = (apiStatus: string): Booking['status'] => {
         switch (apiStatus.toLowerCase()) {
            case 'scheduled':
            case 'confirmed':
            case 'in-progress':
            case 'active':
               return 'upcoming';
            case 'completed':
            case 'finished':
               return 'completed';
            case 'cancelled':
               return 'cancelled';
            default:
               return 'upcoming';
         }
      };

      // Format date and time based on dummy data format
      const formatDate = (dateString: string): string => {
         try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
               month: 'short',
               day: 'numeric',
               year: 'numeric'
            });
         } catch {
            return dateString;
         }
      };

      return {
         id: visit.id,
         propertyName: visit.propertyName || 'Property Name',
         location: visit.propertyAddress || 'Location',
         status: getStatus(visit.status),
         bookingType: getBookingType(visit.visit_type),
         scheduledDate: formatDate(visit.visit_date),
         scheduledTime: visit.visit_time || 'Time TBD',
         image: visit.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      };
   };

   // Fetch bookings on component mount
   useEffect(() => {
      listVisits();
   }, [listVisits]);

   // Transform API data and filter bookings
   useEffect(() => {
      // Use API data exclusively
      const bookingsToUse = (listVisitsData?.status == 200 && listVisitsData?.data) 
         ? listVisitsData.data.map(transformVisitToBooking) 
         : [];

         console.log({listVisitsData})

      // Apply filters
      let filtered = bookingsToUse;

      // Filter by type
      if (filterType !== "all") {
         filtered = filtered.filter(
            (booking: Booking) => booking.status === filterType
         );
      }

      // Filter by search query
      if (searchQuery.trim()) {
         filtered = filtered.filter(
            (booking: Booking) =>
               booking.propertyName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
               booking.location
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
         );
      }

      setFilteredBookings(filtered);
   }, [searchQuery, filterType, listVisitsData]);

   const handleCall = (bookingId: string) => {
      console.log("Call booking:", bookingId);
   };

   const handleGetDirections = (bookingId: string) => {
      console.log("Get directions for booking:", bookingId);
   };

   const handleLiveTour = (bookingId: string) => {
      console.log("Live tour for booking:", bookingId);
   };

   const handleReserve = (bookingId: string) => {
      console.log("Reserve for booking:", bookingId);
   };

   const handleModifyBooking = (bookingId: string) => {
      console.log("Modify booking:", bookingId);
      navigate("/modify-booking");
   };

   const handleBookingClick = (bookingId: string) => {
      navigate(`/review-booking/${bookingId}`);
   };

   return (
      <div className="min-h-screen bg-gray-50 w-screen">
         {/* Header */}
         <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-1">
               <div className="flex items-center justify-between p-4 md:p-5">
                  <div className="flex items-center gap-3 md:gap-3">
                     <button onClick={() => navigate(-1)}>
                        <img
                           src={default_back}
                           alt="back"
                           className="w-10 h-10"
                        />
                     </button>
                     <div className="text-start md:text-left">
                        <h1 className="text-[15.8px] md:text-lg lg:text-xl font-semibold text-[#101828] leading-[24.5px] md:leading-6">
                           My Bookings
                        </h1>
                        <p className="text-[12.3px] md:text-sm text-[#6a7282] ">
                           {filteredBookings.length} bookings
                        </p>
                     </div>
                  </div>
               </div>

               {/* Search and Filter Section */}
               <div className="px-4 pb-4 md:pb-4">
                  <div className="grid grid-cols-2 gap-4 items-stretch md:items-center">
                     {/* Search Bar */}
                     <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 md:pl-3 flex items-center pointer-events-none">
                           <FaSearch className="h-4 w-4 md:w-4 md:h-4 text-gray-400" />
                        </div>
                        <input
                           type="text"
                           placeholder="Search bookings..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="block w-full pl-10 md:pl-10 pr-3 md:pr-3 py-2.5 md:py-2.5 border border-gray-200 rounded-[12.75px] bg-gray-50 text-sm md:text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                     </div>

                     {/* Filter Dropdown */}
                     <div className="relative md:w-40">
                        <button
                           onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                           className="w-full bg-gray-50 border border-gray-200 rounded-[12.75px] px-4 py-2 md:py-2.5 flex items-center justify-between gap-2 hover:bg-gray-100 transition-colors"
                        >
                           <span className="text-[14px] md:text-sm text-gray-900">
                              {filterOptions.find(option => option.value === filterType)?.label}
                           </span>
                           <GoChevronDown className={`text-gray-600 w-6 h-6 transition-transform ${
                              isFilterDropdownOpen ? 'rotate-180' : ''
                           }`} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isFilterDropdownOpen && (
                           <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[12.75px] shadow-lg z-50">
                              {filterOptions.map((option) => (
                                 <button
                                    key={option.value}
                                    onClick={() => {
                                       setFilterType(option.value);
                                       setIsFilterDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2.5 text-left text-[14px] md:text-sm hover:bg-gray-50 transition-colors first:rounded-t-[12.75px] last:rounded-b-[12.75px] ${
                                       filterType === option.value
                                          ? 'text-blue-600 bg-blue-50'
                                          : 'text-gray-900'
                                    }`}
                                 >
                                    {option.label}
                                 </button>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
            {/* Loading State */}
            {isLoadingVisits ? (
               <div className="flex flex-col items-center justify-center py-16 md:py-20">
                  <div className="w-16 h-16 md:w-18 md:h-18 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-5 animate-pulse">
                     <FaCalendar className="w-8 h-8 md:w-9 md:h-9 text-gray-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                     Loading bookings...
                  </h3>
                  <p className="text-gray-500 text-center md:text-base">
                     Please wait while we fetch your bookings
                  </p>
               </div>
            ) : /* Error State */
            listVisitsError ? (
               <div className="flex flex-col items-center justify-center py-16 md:py-20">
                  <div className="w-16 h-16 md:w-18 md:h-18 bg-red-100 rounded-full flex items-center justify-center mb-4 md:mb-5">
                     <FaCalendar className="w-8 h-8 md:w-9 md:h-9 text-red-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                     Error loading bookings
                  </h3>
                  <p className="text-gray-500 text-center md:text-base mb-4">
                     Unable to fetch your bookings. Please try again.
                  </p>
                  <button
                     onClick={() => listVisits()}
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     Retry
                  </button>
               </div>
            ) : /* Empty State */
            filteredBookings.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 md:py-20">
                  <div className="w-16 h-16 md:w-18 md:h-18 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-5">
                     <FaCalendar className="w-8 h-8 md:w-9 md:h-9 text-gray-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                     No bookings found
                  </h3>
                  <p className="text-gray-500 text-center md:text-base">
                     {searchQuery
                        ? "Try adjusting your search terms"
                        : "Start making bookings to see them here"}
                  </p>
               </div>
            ) : (
               /* Bookings Grid */
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {filteredBookings.map((booking: Booking) => (
                     <BookingCard
                        key={booking.id}
                        booking={booking}
                        onCall={handleCall}
                        onGetDirections={handleGetDirections}
                        onLiveTour={handleLiveTour}
                        onReserve={handleReserve}
                        onModifyBooking={handleModifyBooking}
                        onClick={() => handleBookingClick(booking.id)}
                     />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default MyBookingsPage;
