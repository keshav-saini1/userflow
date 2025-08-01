import React, { useState } from "react";
import {
   FaSearch,
   FaCalendar,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import default_back from "@/assets/default_back.svg";
import { GoChevronDown } from "react-icons/go";
import BookingCard, { type Booking } from "../components/BookingCard";

const MyBookingsPage: React.FC = () => {
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");
   const [filterType] = useState("all");
   const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

   // Dummy data within the component
   const dummyBookings: Booking[] = [
      {
         id: 'booking-1',
         propertyName: 'Nirvana Rooms Cyber City',
         location: 'Iffco Chowk, Gurgaon',
         status: 'active',
         bookingType: 'visit',
         scheduledDate: 'Jan 15, 2025',
         scheduledTime: '03:00 PM - 04:00 PM',
         image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      },
      {
         id: 'booking-2',
         propertyName: 'Nirvana Rooms Cyber City',
         location: 'Iffco Chowk, Gurgaon',
         status: 'active',
         bookingType: 'live-tour',
         scheduledDate: 'Jan 15, 2025',
         scheduledTime: '03:00 PM - 04:00 PM',
         image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      },
      {
         id: 'booking-3',
         propertyName: 'Nirvana Rooms Cyber City',
         location: 'Iffco Chowk, Gurgaon',
         status: 'completed',
         bookingType: 'reservation',
         scheduledDate: 'Jan 15, 2025',
         scheduledTime: '03:00 PM - 04:00 PM',
         bookingId: 'NR2025001',
         image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      },
      {
         id: 'booking-4',
         propertyName: 'Nirvana Rooms Cyber City',
         location: 'Iffco Chowk, Gurgaon',
         status: 'upcoming',
         bookingType: 'call',
         scheduledDate: 'Jan 15, 2025',
         scheduledTime: '03:00 PM - 04:00 PM',
         image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
      },
   ];

   // Filter bookings based on search query and filter type
   React.useEffect(() => {
      let filtered = dummyBookings;

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
   }, [searchQuery, filterType]);

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
                           {dummyBookings.length} bookings
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
                     <div className="bg-gray-50 border border-gray-200 rounded-[12.75px] px-4 py-2 md:py-2.5 flex items-center justify-between md:justify-start gap-2 md:w-40">
                        <span className="text-[14px] md:text-sm text-gray-900">
                           All Bookings
                        </span>
                        <GoChevronDown className="text-gray-600 w-6 h-6" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
            {filteredBookings.length === 0 ? (
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
