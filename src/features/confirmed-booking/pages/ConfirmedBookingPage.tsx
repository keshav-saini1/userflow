import { FaArrowRight } from 'react-icons/fa';
import type { ConfirmedBookingData } from '../types';
import timer from "@/assets/onboarding/timer.svg";
import train from "@/assets/onboarding/train.svg";
import food from "@/assets/onboarding/food.svg";
import building from "@/assets/onboarding/building.svg";
import red_clock from '@/assets/red_clock.svg';
import check_ok from '@/assets/check_ok.svg';
import edit_btn from '@/assets/edit_btn.svg';
import { IoEyeOutline } from 'react-icons/io5';
import { FiCreditCard } from 'react-icons/fi';
import default_back from '@/assets/default_back_black.svg';
import default_profile from '@/assets/default_profile_black.svg';

interface ConfirmedBookingPageProps {
  data: ConfirmedBookingData;
  onBackClick: () => void;
  onShareClick: () => void;
  onSendReminder: () => void;
  onPayNow: () => void;
  onViewAllPayments: () => void;
  onSupportAction: (action: 'chat' | 'call') => void;
  onExploreCommute: () => void;
  onModifyBooking: () => void;
  onRequestRefund: () => void;
}

export default function ConfirmedBookingPage({
  data,
  onBackClick,
  onShareClick,
  onSendReminder,
  onPayNow,
  onViewAllPayments,
  onSupportAction,
  onExploreCommute,
  onModifyBooking,
  onRequestRefund
}: ConfirmedBookingPageProps) {
  const { bookingDetails, paymentSummary, supportOptions, propertyInfo } = data || {};

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500';
      case 'approved':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Hero Section with Property Image */}
      <div className="relative h-[293px] lg:h-[60vh] xl:h-[50vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bookingDetails?.propertyImage || '/placeholder-property.jpg'}')` }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Navigation Buttons */}
        <div className="absolute top-8 lg:top-12 left-4 lg:left-8 right-4 lg:right-8 flex justify-between items-center">
          <button
            onClick={onBackClick}
          >
            <img src={default_back} alt="back" className="w-10 h-10" />
          </button>
          <button
            onClick={onShareClick}
          >
            <img src={default_profile} alt="profile" className="w-10 h-10" />
          </button>
        </div>

        {/* Property Info Overlay */}
        <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 right-4 lg:right-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2.5 lg:space-y-4">
              <h1 className="text-white text-lg lg:text-4xl xl:text-5xl font-bold tracking-tight">
                {propertyInfo?.name || 'Property Name'}
              </h1>
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 bg-green-500 rounded-full" />
                <span className="text-white/90 text-sm lg:text-lg font-medium">
                  {propertyInfo?.location || 'Location'}
                </span>
              </div>

              {/* Commute Times Card */}
              <div
                className="backdrop-blur-md bg-white/12 rounded-xl p-3 lg:p-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={onExploreCommute}
              >
                <div className="flex items-center gap-2.5 lg:gap-4">
                  <img
                    src={timer}
                    alt=""
                    className="w-7 h-7 lg:w-10 lg:h-10"
                  />
                  <div className="flex-1">
                    <div className="flex gap-3 lg:gap-8 items-center">
                      <div className="flex items-center gap-1 lg:gap-2">
                        <img
                          src={building}
                          alt="building"
                          className="w-4 h-4 lg:w-6 lg:h-6"
                        />
                        <span className="text-white/90 text-xs lg:text-sm">{propertyInfo?.commuteTimes?.metro || '15-25 min'}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <img
                          src={train}
                          alt="train"
                          className="w-4 h-4 lg:w-6 lg:h-6"
                        />
                        <span className="text-white/90 text-xs lg:text-sm">{propertyInfo?.commuteTimes?.walk || '2 min walk'}</span>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        <img
                          src={food}
                          alt="food"
                          className="w-4 h-4 lg:w-6 lg:h-6"
                        />
                        <span className="text-white/90 text-xs lg:text-sm">{propertyInfo?.commuteTimes?.bus || '5-8 min'}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs lg:text-sm mt-1 lg:mt-2">
                      Tap to explore commute times
                    </p>
                  </div>
                  <FaArrowRight className="text-white/70 w-3.5 h-3.5 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3.5 lg:px-8 py-3.5 lg:py-8 space-y-3.5 lg:space-y-6 pb-10 lg:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-3.5 lg:space-y-0">
            {/* Booking Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex gap-5 lg:gap-6 items-start mb-4 lg:mb-6">
                {/* Room Image */}
                <div className="w-[70px] h-[70px] lg:w-20 lg:h-20 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={bookingDetails?.room?.roomImage || bookingDetails?.propertyImage}
                    alt="Room"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      {
                        bookingDetails?.room && (
                          <h2 className="text-sm lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3">
                            {bookingDetails?.room?.roomNumber || ''} | {bookingDetails?.room?.roomType || 'Room Type'}
                          </h2>
                        )
                      }
                      {
                        !bookingDetails?.room && <h2 className="text-xs lg:text-lg font-semibold text-gray-900 mb-2 lg:mb-3">A room in {propertyInfo?.name}</h2>
                      }
                      <div className={`inline-flex items-center gap-1 px-2 py-1 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm font-medium ${getStatusColor(bookingDetails?.status || 'pending')}`}>
                        <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${getStatusDotColor(bookingDetails?.status || 'pending')}`} />
                        {(bookingDetails?.status || 'pending').charAt(0).toUpperCase() + (bookingDetails?.status || 'pending').slice(1)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base lg:text-xl font-bold text-gray-900">
                        {bookingDetails?.daysUntilMoveIn || 0} Days
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500">
                        Till Move-in
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-50">
                  <span className="text-xs lg:text-sm text-gray-600">Move-in Date</span>
                  <span className="text-xs lg:text-sm font-semibold text-gray-900">{bookingDetails?.moveInDate || 'N/A'}</span>
                </div>
                {
                  bookingDetails?.room && (
                    <>
                      <div className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-50">
                        <span className="text-xs lg:text-sm text-gray-600">Room Number</span>
                        <span className="text-xs lg:text-sm font-semibold text-gray-900">{bookingDetails?.room?.roomNumber || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-50">
                        <span className="text-xs lg:text-sm text-gray-600">Room Type</span>
                        <span className="text-xs lg:text-sm font-semibold text-gray-900">{bookingDetails?.room?.roomType || 'N/A'}</span>
                      </div>
                    </>
                  )
                }
                <div className="flex justify-between items-center py-2 lg:py-3">
                  <span className="text-xs lg:text-sm text-gray-600">Token Paid</span>
                  <span className="text-xs lg:text-sm font-semibold text-gray-900">₹{bookingDetails?.tokenPaid?.toLocaleString() || '0'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 lg:gap-4 mt-4 lg:mt-6">
                {
                  bookingDetails?.status === 'pending' && (
                    <img src={edit_btn} alt="edit" className="" onClick={onModifyBooking} />
                  )
                }

                {bookingDetails?.status === 'pending' && (
                  <button
                    onClick={onSendReminder}
                    className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 lg:py-3 px-3.5 lg:px-4 flex items-center justify-center gap-2.5 lg:gap-3 text-xs lg:text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Send Reminder
                    <FaArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                )}

                {bookingDetails?.status === 'approved' && (
                  <button
                    onClick={onModifyBooking}
                    className="flex-1 bg-gray-900 text-white rounded-xl py-3 lg:py-3 px-3.5 lg:px-4 flex items-center justify-center gap-2.5 lg:gap-3 text-xs lg:text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Modify Booking
                    <FaArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                )}

                {bookingDetails?.status === 'cancelled' && (
                  <button
                    onClick={onRequestRefund}
                    className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 lg:py-3 px-3.5 lg:px-4 flex items-center justify-center gap-2.5 lg:gap-3 text-xs lg:text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Request Refund
                    <FaArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Payment Summary Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-5 lg:mb-6">
                <h3 className="text-base lg:text-xl font-bold text-gray-900">Payment Summary</h3>
              </div>

              {/* Payment Alert */}
              <div className="flex gap-2.5 lg:gap-4 items-start mb-5 lg:mb-6">
                <img src={!paymentSummary?.totalOutstanding ? check_ok : red_clock} alt="red_clock" className="w-12 h-12" />
                <div className="flex-1">
                  <h4 className="text-sm lg:text-base font-medium text-gray-900 mb-1 lg:mb-2">
                    {(paymentSummary?.totalOutstanding || 0) > 0 ? 'Payment Due Soon' : 'No dues found'}
                  </h4>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {(paymentSummary?.totalOutstanding || 0) > 0
                      ? `Due ${paymentSummary?.dueDate || 'N/A'}`
                      : 'All payments are up to date'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">
                    ₹{paymentSummary?.totalOutstanding?.toLocaleString() || '0'}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">Total Outstanding</div>
                </div>
              </div>

              {/* Payment Items */}
              <div className="space-y-5 lg:space-y-6 mb-4 lg:mb-6">
                {(paymentSummary?.items || []).map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex gap-2.5 lg:gap-3 items-center">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-orange-500 rounded-full" />
                      <div>
                        <div className="text-xs lg:text-sm font-semibold text-gray-900">{item?.name || 'Payment Item'}</div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          {item?.isOneTime ? 'One-Time' : (item?.period || 'N/A')}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs lg:text-sm font-bold text-gray-900">
                      ₹{item?.amount?.toLocaleString() || '0'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Action Buttons */}
              <div className="flex gap-2.5 lg:gap-4">
                <button
                  onClick={onViewAllPayments}
                  className="flex-1 bg-gray-50 text-gray-700 rounded-xl py-2.5 lg:py-3 px-3.5 lg:px-4 flex items-center justify-center gap-2 lg:gap-3 text-xs lg:text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  <IoEyeOutline className='w-5 h-5 lg:w-5 lg:h-5' />
                  View All
                </button>
                <button
                  disabled={!paymentSummary?.totalOutstanding}
                  onClick={onPayNow}
                  className={`flex-1 ${
                    !paymentSummary?.totalOutstanding ? 'bg-gray-200 text-gray-500' : 'bg-gray-900 text-white'
                  } rounded-xl py-2.5 lg:py-3 px-3.5 lg:px-4 flex items-center justify-center gap-2 lg:gap-3 text-xs lg:text-sm font-semibold hover:bg-gray-800 transition-colors`}
                >
                  <FiCreditCard className='w-5 h-5 lg:w-5 lg:h-5' />
                  Pay Now
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3 className="text-base lg:text-xl font-bold text-gray-900">Need Help?</h3>
                <div className="bg-green-50 text-green-700 px-2 py-1 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm font-medium">
                  24/7 Support
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                {(supportOptions || []).map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSupportAction(option?.action || 'chat')}
                    className="w-full bg-gray-50 rounded-xl p-2.5 lg:p-4 flex items-center gap-2.5 lg:gap-4 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: option?.iconBgColor || '#f3f4f6' }}
                    >
                      <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-white rounded-full" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xs lg:text-sm font-medium text-gray-900">{option?.title || 'Support Option'}</div>
                      <div className="text-xs lg:text-sm text-gray-500">{option?.description || 'Get help from our team'}</div>
                    </div>
                    <FaArrowRight className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 