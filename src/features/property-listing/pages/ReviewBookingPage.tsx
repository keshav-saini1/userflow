import React from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaCalendar, FaEdit, FaWhatsapp, FaComments } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { bookingData } from "../data/bookingData";
import { CiCalendar } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMap, MdOutlinePeopleAlt } from "react-icons/md";

const ReviewBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  
  // Find the booking data based on the bookingId
  const booking = bookingData.find(b => b.id === bookingId);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking not found</h2>
          <p className="text-gray-600 mb-4">The booking you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getHeaderTitle = (bookingType: string) => {
    switch (bookingType) {
      case 'visit':
        return 'Your Property Visit';
      case 'live-tour':
        return 'Live Tour';
      case 'call':
        return 'Call Scheduled';
      case 'reservation':
        return 'Reservation Details';
      default:
        return 'Booking Details';
    }
  };

  const getBookingTypeText = (type: string) => {
    switch (type) {
      case 'visit':
        return 'Property Visit On';
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

  const getActionButtonText = (type: string) => {
    switch (type) {
      case 'visit':
        return 'Get Direction';
      case 'live-tour':
        return 'Join Now';
      case 'call':
        return 'Call';
      case 'reservation':
        return 'Reserve';
      default:
        return 'Action';
    }
  };

  const handleCall = () => {
    console.log('Call clicked');
  };

  const handleGetDirections = () => {
    console.log('Get directions clicked');
  };

  const handleJoinNow = () => {
    console.log('Join now clicked');
  };

  const handleReserve = () => {
    console.log('Reserve clicked');
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    navigate(-1);
  };

  const handleChatSupport = () => {
    console.log('Chat support clicked');
  };

  const handleCallSupport = () => {
    console.log('Call support clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 p-[14px] md:p-6">
            <button
              onClick={() => navigate(-1)}
              className="w-[35px] h-[35px] md:w-10 md:h-10 bg-[#f3f3f5] rounded-[12.75px] flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaArrowLeft className="w-[17.5px] h-[17.5px] md:w-5 md:h-5 text-[#0a0a0a]" />
            </button>
            <div>
              <h1 className="text-[15.8px] md:text-xl font-semibold text-[#101828] leading-[24.5px] md:leading-7">
                {getHeaderTitle(booking.bookingType)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-[21px] md:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-7">
            {/* Property Card */}
            <div className="bg-white rounded-[21px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative h-[156px] md:h-[200px] lg:h-[250px] xl:h-[300px]">
                <img
                  src={booking.image}
                  alt={booking.propertyName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-[15px] left-1/2 transform -translate-x-1/2 backdrop-blur-[6px] bg-white/10 rounded-[14px] p-[10.5px] w-[344px] md:w-[400px] lg:w-[450px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10.5px]">
                      <FaMapMarkerAlt className="w-[10.5px] h-[10.5px] text-white" />
                      <div>
                        <h3 className="text-[15.8px] md:text-lg font-semibold text-white leading-[24.5px]">
                          {booking.propertyName}
                        </h3>
                        <p className="text-[12.3px] text-white/90 leading-[17.5px]">
                          {booking.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[15.8px] md:text-lg font-semibold text-white leading-[24.5px]">
                        ₹8,000
                      </p>
                      <p className="text-[12.3px] text-white/90 leading-[17.5px]">
                        per month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details Card */}
            <div className="bg-white rounded-[21px] border border-gray-100 shadow-sm">
              <div className="p-[21px] md:p-6 lg:p-8">
                <div className="flex items-center justify-between py-[10.5px]">
                  <div className="flex items-center gap-[10.5px] lg:gap-4">
                    <CiCalendar className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#155dfc]" />
                    <div>
                      <p className="text-[14px] md:text-base lg:text-lg font-medium text-[#101828] leading-[21px]">
                        {getBookingTypeText(booking.bookingType)}
                      </p>
                      <p className="text-[12.3px] md:text-sm lg:text-base text-[#4a5565] leading-[17.5px]">
                        {booking.scheduledDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[12.3px] md:text-sm lg:text-base text-[#4a5565] leading-[17.5px]">Time</p>
                    <p className="text-[14px] md:text-base lg:text-lg font-medium text-[#101828] leading-[21px]">
                      {booking.scheduledTime.split(' - ')[0]}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#fdfdfd] border-t border-gray-100 px-[21px] md:px-6 lg:px-8 py-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <button className="w-[34px] h-[34px] md:w-10 md:h-10 lg:w-12 lg:h-12 border border-gray-200 rounded-[12.75px] flex items-center justify-center bg-white">
                    <FiPhone className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#364153]" />
                  </button>
                  <button 
                    className="bg-[#155dfc] flex-1 text-white px-3.5 py-[8.75px] rounded-[12.75px] flex items-center justify-center gap-[7px] lg:gap-3 hover:bg-blue-600 transition-colors"
                    onClick={
                      booking.bookingType === 'visit' ? handleGetDirections :
                      booking.bookingType === 'live-tour' ? handleJoinNow :
                      booking.bookingType === 'call' ? handleCall :
                      handleReserve
                    }
                  >
                    <MdOutlineMap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span className="text-[14px] md:text-base lg:text-lg font-medium">
                      {getActionButtonText(booking.bookingType)}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-[21px] border border-gray-100 shadow-sm p-[21px] md:p-6 lg:p-8">
              <h3 className="text-[15.8px] md:text-lg lg:text-xl font-semibold text-[#101828] leading-[24.5px] mb-[21px]">
                Your visit contact
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 lg:gap-4">
                  <div className="w-[54px] h-[53px] md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#e5edff] rounded-full flex items-center justify-center">
                    <MdOutlinePeopleAlt className="w-[22px] h-[21px] md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#155dfc]" />
                  </div>
                  <div>
                    <p className="text-[14px] md:text-base lg:text-lg font-semibold text-[#101828] leading-[24.5px]">
                      Priya Patel
                    </p>
                    <p className="text-[12.3px] md:text-sm lg:text-base text-[#4a5565] leading-[17.5px]">
                      Property Representative
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#e5edff] rounded-full flex items-center justify-center">
                    <FiPhone className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#155dfc]" />
                  </button>
                  <button className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#e5edff] rounded-full flex items-center justify-center">
                    <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#155dfc]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="xl:col-span-1 space-y-7">
            {/* What's Next Section */}
            <div className="bg-blue-50 border border-[#bedbff] rounded-[14px] p-[21px] md:p-6 lg:p-8">
              <h3 className="text-[15.8px] md:text-lg lg:text-xl font-semibold text-[#1c398e] leading-[24.5px] mb-3.5">
                What's Next?
              </h3>
              <div className="space-y-[10.5px] lg:space-y-4">
                <div className="flex items-start gap-[10.5px] lg:gap-3">
                  <div className="w-[21px] h-[21px] lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center mt-[1.75px]">
                    <FaCalendar className="w-[12.25px] h-[12.25px] lg:w-4 lg:h-4 text-[#155dfc]" />
                  </div>
                  <div>
                    <p className="text-[14px] md:text-base lg:text-lg font-medium text-[#101828] leading-[21px]">
                      Confirmation email sent
                    </p>
                    <p className="text-[12.3px] md:text-sm lg:text-base text-[#4a5565] leading-[17.5px]">
                      Check your inbox for visit details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-[10.5px] lg:gap-3">
                  <div className="w-[21px] h-[21px] lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center mt-[1.75px]">
                    <FaWhatsapp className="w-[12.25px] h-[12.25px] lg:w-4 lg:h-4 text-[#155dfc]" />
                  </div>
                  <div>
                    <p className="text-[14px] md:text-base lg:text-lg font-medium text-[#101828] leading-[21px]">
                      WhatsApp reminder
                    </p>
                    <p className="text-[12.3px] md:text-sm lg:text-base text-[#4a5565] leading-[17.5px]">
                      2 hours before your visit
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-[10.5px] lg:gap-3">
                  <div className="w-[21px] h-[21px] lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center mt-[1.75px]">
                    <FaMapMarkerAlt className="w-[12.25px] h-[12.25px] lg:w-4 lg:h-4 text-[#155dfc]" />
                  </div>
                  <div>
                    <p className="text-[14px] md:text-base lg:text-lg font-medium text-[#101828] leading-[21px]">
                      Meet at main entrance
                    </p>
                    <p className="text-[12.3px] md:text-sm lg:text-base text-[#4a5565] leading-[17.5px]">
                      Property manager will guide you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Assistance Section */}
            <div className="bg-blue-50 border border-[#bedbff] rounded-[14px] p-[22px] md:p-6">
              <h3 className="text-[15.8px] md:text-lg font-semibold text-[#1c398e] leading-[24.5px] mb-3.5">
                Need assistance?
              </h3>
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <button 
                  className="bg-white text-[#101828] px-[26px] py-[10.5px] rounded-[12.75px] flex items-center justify-center gap-[7px] hover:bg-gray-50 transition-colors"
                  onClick={handleChatSupport}
                >
                  <FaComments className="w-[17.5px] h-[17.5px] text-[#155dfc]" />
                  <span className="text-[14px] font-medium">Chat Support</span>
                </button>
                <button 
                  className="bg-white text-[#101828] px-[47px] py-[10.5px] rounded-[12.75px] flex items-center justify-center gap-[7px] hover:bg-gray-50 transition-colors"
                  onClick={handleCallSupport}
                >
                  <FiPhone className="w-6 h-6 text-[#00a63e]" />
                  <span className="text-[14px] font-medium">Call Us</span>
                </button>
              </div>
            </div>

            {/* Visit Tips Section */}
            <div className="bg-blue-50 border border-[#bedbff] rounded-[14px] p-[21px] md:p-6">
              <h3 className="text-[15.8px] md:text-lg font-semibold text-[#1c398e] leading-[24.5px] mb-3.5">
                Visit Tips
              </h3>
              <div className="space-y-[10.3px]">
                <div className="flex items-start gap-[10.5px]">
                  <div className="w-[7px] h-[7px] bg-[#fe9a00] rounded-full mt-[7px]" />
                  <p className="text-[12.3px] md:text-sm text-[#364153] leading-[17.5px]">
                    Arrive 10 minutes early for a smooth check-in
                  </p>
                </div>
                <div className="flex items-start gap-[10.5px]">
                  <div className="w-[7px] h-[7px] bg-[#fe9a00] rounded-full mt-[7px]" />
                  <p className="text-[12.3px] md:text-sm text-[#364153] leading-[17.5px]">
                    Bring a list of questions about the property
                  </p>
                </div>
                <div className="flex items-start gap-[10.5px]">
                  <div className="w-[7px] h-[7px] bg-[#fe9a00] rounded-full mt-[7px]" />
                  <p className="text-[12.3px] md:text-sm text-[#364153] leading-[17.5px]">
                    Ask about current offers and promotions
                  </p>
                </div>
                <div className="flex items-start gap-[10.5px]">
                  <div className="w-[7px] h-[7px] bg-[#fe9a00] rounded-full mt-[7px]" />
                  <p className="text-[12.3px] md:text-sm text-[#364153] leading-[17.5px]">
                    Explore all community areas and amenities
                  </p>
                </div>
              </div>
            </div>

            {/* Cancel Button */}
            <button 
              className="w-full h-[38px] md:h-12 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] bg-white hover:bg-gray-50 transition-colors"
              onClick={handleCancel}
            >
              <FaEdit className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#4a5565]" />
              <span className="text-[14px] md:text-base font-medium text-[#4a5565]">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookingPage; 