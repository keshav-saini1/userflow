import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import { ImMap2 } from "react-icons/im";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { LuCopy } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import phone_outline from "@/assets/bookvisit/phone_outline.svg";
import phone_outline_white from "@/assets/bookvisit/phone_outline_white.svg";
import CancelVisitBottomSheet from "@/features/book-visit/components/CancelVisitBottomSheet";

export interface Booking {
  id: string;
  propertyName: string;
  location: string;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  bookingType: 'visit' | 'live-tour' | 'call' | 'reservation';
  scheduledDate: string;
  scheduledTime: string;
  bookingId?: string;
  image: string;
}

interface BookingCardProps {
  booking: Booking;
  onCall: (bookingId: string) => void;
  onGetDirections: (bookingId: string) => void;
  onLiveTour: (bookingId: string) => void;
  onReserve: (bookingId: string) => void;
  onModifyBooking: (bookingId: string) => void;
  onCancelBooking?: (bookingId: string) => void;
  onClick: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCall,
  onGetDirections,
  onLiveTour,
  onReserve,
  onModifyBooking,
  onCancelBooking,
  onClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCancelBottomSheetOpen, setIsCancelBottomSheetOpen] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#eafff2] text-[#00a63e] border-[#00a63e]";
      case "completed":
        return "bg-[#eafff2] text-[#00a63e] border-[#00a63e]";
      case "upcoming":
        return "bg-[#dfe7fd] text-[#1447e6] border-[#1447e6]";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return "bg-[#00a63e]";
      case "upcoming":
        return "bg-[#1447e6]";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getBookingTypeText = (type: string) => {
    switch (type) {
      case "visit":
        return "Visit Scheduled on";
      case "live-tour":
        return "Live Tour Scheduled on";
      case "call":
        return "Call Scheduled on";
      case "reservation":
        return "Reservation";
      default:
        return "Scheduled on";
    }
  };

  return (
    <div
      className="bg-white rounded-[14px] md:rounded-[12px] border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={(e) => {
        // Don't trigger onClick if bottom sheet is open
        if (isCancelBottomSheetOpen) {
          return;
        }
        
        // Close menu if clicking outside of it
        if (isMenuOpen && !(e.target as Element).closest('.menu-container')) {
          setIsMenuOpen(false);
        }
        onClick();
      }}
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

          <div className="flex items-center gap-2">
            {/* Status Badge */}
            <div
              className={`px-[10.5px] py-[7px] md:px-2 md:py-1.5 rounded-[12.75px] flex items-center gap-[7px] md:gap-1.5 ${getStatusColor(
                booking.status
              )}`}
            >
              <div
                className={`w-[7px] h-[7px] md:w-1.5 md:h-1.5 rounded-full ${getStatusDot(
                  booking.status
                )}`}
              />
              <span className="text-[10px] md:text-xs font-medium capitalize">
                {booking.status}
              </span>
            </div>

            {/* Menu Button for upcoming bookings */}
            {booking.status === "upcoming" && (onModifyBooking || onCancelBooking) && (
              <div className="relative menu-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BsThreeDotsVertical className="w-4 h-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
                    <div className="py-1">
                      {onModifyBooking && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(false);
                            onModifyBooking(booking.id);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                        >
                          <IoDocumentTextOutline className="w-4 h-4" />
                          Edit Booking
                        </button>
                      )}
                      {onCancelBooking && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(false);
                            setIsCancelBottomSheetOpen(true);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
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
          {booking.bookingType === "visit" && booking.status !== "cancelled" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCall(booking.id);
                }}
                className="flex-1 h-[38px] md:h-10 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={phone_outline}
                  alt="phone"
                  className="w-4 h-4 md:w-4 md:h-4"
                />
                <span className="text-[14px] md:text-sm text-[#4a5565] font-medium">
                  Call
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGetDirections(booking.id);
                }}
                className="flex-1 h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
              >
                <ImMap2 className="w-4 h-4 md:w-4 md:h-4" />
                <span className="text-[14px] md:text-sm font-medium">
                  Get Directions
                </span>
              </button>
            </>
          )}

          {booking.bookingType === "live-tour" && booking.status !== "cancelled" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCall(booking.id);
                }}
                className="flex-1 h-[38px] md:h-10 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={phone_outline}
                  alt="phone"
                  className="w-4 h-4 md:w-4 md:h-4"
                />
                <span className="text-[14px] md:text-sm text-[#4a5565] font-medium">
                  Call
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLiveTour(booking.id);
                }}
                className="flex-1 h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
              >
                <VscDeviceCameraVideo className="w-4 h-4 md:w-4 md:h-4" />
                <span className="text-[14px] md:text-sm font-medium">
                  Live Tour
                </span>
              </button>
            </>
          )}

          {booking.bookingType === "reservation" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReserve(booking.id);
              }}
              className="w-full h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
            >
              <LuCopy className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" />
              <span className="text-[14px] md:text-sm font-medium">
                Reserve
              </span>
            </button>
          )}

          {booking.bookingType === "call" && booking.status !== "cancelled" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onModifyBooking(booking.id);
                }}
                className="flex-1 h-[38px] md:h-10 border border-gray-200 rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 hover:bg-gray-50 transition-colors"
              >
                <IoDocumentTextOutline className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#4a5565]" />
                <span className="text-[14px] md:text-sm text-[#4a5565] font-medium">
                  Modify Booking
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCall(booking.id);
                }}
                className="flex-1 h-[38px] md:h-10 bg-[#155dfc] rounded-[12.75px] flex items-center justify-center gap-[7px] md:gap-1.5 text-white hover:bg-blue-600 transition-colors"
              >
                <img
                  src={phone_outline_white}
                  alt="phone"
                  className="w-4 h-4 md:w-4 md:h-4"
                />
                <span className="text-[14px] md:text-sm font-medium">
                  Call
                </span>
              </button>
            </>
          )}
          
          {/* Cancelled Status Message */}
          {booking.status === "cancelled" && (
            <div className="w-full h-[38px] md:h-10 bg-red-50 border border-red-200 rounded-[12.75px] flex items-center justify-center">
              <span className="text-[14px] md:text-sm text-red-600 font-medium">
                Visit Cancelled
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Visit Bottom Sheet */}
      <CancelVisitBottomSheet
        isOpen={isCancelBottomSheetOpen}
        onClose={() => setIsCancelBottomSheetOpen(false)}
        onConfirmCancel={(_reason) => {
          if (onCancelBooking) {
            onCancelBooking(booking.id);
          }
        }}
        visitId={booking.id}
        visitDetails={{
          propertyName: booking.propertyName,
          scheduledDate: booking.scheduledDate,
          scheduledTime: booking.scheduledTime,
          bookingType: booking.bookingType,
        }}
      />
    </div>
  );
};

export default BookingCard; 