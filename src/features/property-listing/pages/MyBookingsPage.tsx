import React, { useState } from "react";
import { FaArrowLeft, FaSearch, FaPhone, FaMapMarkerAlt, FaCalendar, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { bookingData, type Booking } from "../data/bookingData";

const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType] = useState("all");
  const [filteredBookings, setFilteredBookings] = useState(bookingData);

  // Filter bookings based on search query and filter type
  React.useEffect(() => {
    let filtered = bookingData;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((booking: Booking) => booking.status === filterType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((booking: Booking) =>
        booking.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [searchQuery, filterType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#eafff2] text-[#00a63e] border-[#00a63e]';
      case 'completed':
        return 'bg-[#eafff2] text-[#00a63e] border-[#00a63e]';
      case 'upcoming':
        return 'bg-[#dfe7fd] text-[#1447e6] border-[#1447e6]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-[#00a63e]';
      case 'upcoming':
        return 'bg-[#1447e6]';
      default:
        return 'bg-gray-400';
    }
  };

  const getBookingTypeText = (type: string) => {
    switch (type) {
      case 'visit':
        return 'Visit Scheduled on';
      case 'live-tour':
        return 'Live Tour Scheduled on';
      case 'call':
        return 'Call Scheduled on';
      case 'reservation':
        return 'Reservation';
      default:
        return 'Scheduled on';
    }
  };

  const handleCall = (bookingId: string) => {
    console.log('Call booking:', bookingId);
  };

  const handleGetDirections = (bookingId: string) => {
    console.log('Get directions for booking:', bookingId);
  };

  const handleLiveTour = (bookingId: string) => {
    console.log('Live tour for booking:', bookingId);
  };

  const handleReserve = (bookingId: string) => {
    console.log('Reserve for booking:', bookingId);
  };

  const handleModifyBooking = (bookingId: string) => {
    console.log('Modify booking:', bookingId);
    navigate('/modify-booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between p-4 md:p-5">
            <div className="flex items-center gap-3 md:gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4 md:w-4 md:h-4 text-gray-600" />
              </button>
              <div className="text-center md:text-left">
                <h1 className="text-[15.8px] md:text-lg lg:text-xl font-semibold text-[#101828] leading-[24.5px] md:leading-6">
                  My Bookings
                </h1>
                <p className="text-[12.3px] md:text-sm text-[#6a7282] leading-[17.5px]">
                  {bookingData.length} bookings
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="px-4 pb-4 md:pb-4">
            <div className="flex flex-col md:flex-row gap-[10.5px] md:gap-3 items-stretch md:items-center">
              {/* Filter Dropdown */}
              <div className="bg-gray-50 border border-gray-200 rounded-[12.75px] px-4 py-2 md:py-2.5 flex items-center justify-between md:justify-start gap-2 md:w-40">
                <span className="text-[14px] md:text-sm text-gray-900">All Bookings</span>
                <svg className="w-4 h-4 md:w-4 md:h-4 text-gray-600 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

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
              {searchQuery ? 'Try adjusting your search terms' : 'Start making bookings to see them here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredBookings.map((booking: Booking) => (
              <div 
                key={booking.id} 
                className="bg-white rounded-[14px] md:rounded-[12px] border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/review-booking/${booking.id}`)}
              >
                {/* Header */}
                <div className="p-[17.5px] md:p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10.5px] md:gap-2">
                      <div className="flex items-center gap-[3.5px] md:gap-1">
                        <span className="text-[14px] md:text-sm lg:text-base font-semibold text-[#101828]">
                          {booking.propertyName}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-[10.5px] py-[7px] md:px-2 md:py-1.5 rounded-[12.75px] flex items-center gap-[7px] md:gap-1.5 ${getStatusColor(booking.status)}`}>
                      <div className={`w-[7px] h-[7px] md:w-1.5 md:h-1.5 rounded-full ${getStatusDot(booking.status)}`} />
                      <span className="text-[10px] md:text-xs font-medium capitalize">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-[3.5px] md:gap-1.5 mt-[10.5px] md:mt-2">
                    <FaMapMarkerAlt className="w-[10.5px] h-[10.5px] md:w-3 md:h-3 text-[#6a7282]" />
                    <span className="text-[12.3px] md:text-xs lg:text-sm text-[#6a7282]">
                      {booking.location}
                    </span>
                  </div>

                  {/* Booking ID for completed bookings */}
                  {booking.bookingId && (
                    <div className="mt-[10.5px] md:mt-2">
                      <span className="text-[12.3px] md:text-xs text-[#6a7282]">
                        Booking ID: {booking.bookingId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-[17.5px] md:p-4">
                  <div className="flex gap-3.5 md:gap-3 items-start">
                    {/* Property Image */}
                    <div className="w-[86px] h-[85px] md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-[12.75px] overflow-hidden flex-shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.propertyName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="mb-1.5 md:mb-1">
                        <p className="text-[12.3px] md:text-xs lg:text-sm text-[#4a5565] font-medium">
                          {getBookingTypeText(booking.bookingType)}
                        </p>
                      </div>
                      
                      <div className="space-y-1 md:space-y-1">
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <FaCalendar className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#4a5565]" />
                          <span className="text-[12.3px] md:text-xs lg:text-sm text-[#4a5565]">
                            {booking.scheduledDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-[12.3px] md:text-xs lg:text-sm text-[#4a5565]">
                            {booking.scheduledTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3.5 md:mt-3 flex gap-[18px] md:gap-3">
                    {booking.bookingType === 'visit' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(booking.id);
                          }}
                          className="flex-1 h-[38px] md:h-10 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <FaPhone className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#4a5565]" />
                          <span className="text-[14px] md:text-sm text-[#4a5565] font-medium">Call</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGetDirections(booking.id);
                          }}
                          className="flex-1 h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
                        >
                          <FaMapMarkerAlt className="w-4 h-4 md:w-4 md:h-4" />
                          <span className="text-[14px] md:text-sm font-medium">Get Directions</span>
                        </button>
                      </>
                    )}

                    {booking.bookingType === 'live-tour' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(booking.id);
                          }}
                          className="flex-1 h-[38px] md:h-10 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <FaPhone className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#4a5565]" />
                          <span className="text-[14px] md:text-sm text-[#4a5565] font-medium">Call</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLiveTour(booking.id);
                          }}
                          className="flex-1 h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
                        >
                          <FaMapMarkerAlt className="w-4 h-4 md:w-4 md:h-4" />
                          <span className="text-[14px] md:text-sm font-medium">Live Tour</span>
                        </button>
                      </>
                    )}

                    {booking.bookingType === 'reservation' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReserve(booking.id);
                        }}
                        className="w-full h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
                      >
                        <FaEdit className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" />
                        <span className="text-[14px] md:text-sm font-medium">Reserve</span>
                      </button>
                    )}

                    {booking.bookingType === 'call' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModifyBooking(booking.id);
                          }}
                          className="flex-1 h-[38px] md:h-10 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <FaEdit className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#4a5565]" />
                          <span className="text-[14px] md:text-sm text-[#4a5565] font-medium">Modify Booking</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(booking.id);
                          }}
                          className="flex-1 h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
                        >
                          <FaPhone className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" />
                          <span className="text-[14px] md:text-sm font-medium">Call</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage; 