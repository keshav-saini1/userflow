import React from 'react';
import BookVisitForm from '../components/BookVisitForm';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router';

interface BookVisitPageProps {
  onSuccess: (bookingDetails: {
    property: string;
    visitType: string;
    date: string;
    time: string;
  }) => void;
}

const BookVisitPage: React.FC<BookVisitPageProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white w-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg sm:text-xl lg:text-[21px] font-semibold text-[#101828] leading-tight sm:leading-[28px]">
              Book a Visit
            </h1>
            <p className="text-sm sm:text-[14px] text-[#4a5565] leading-tight sm:leading-[21px]">
              Nirvana Rooms
            </p>
          </div>
          <button className="w-8 h-8 cursor-pointer sm:w-[35px] sm:h-[35px] bg-gray-100 rounded-full flex items-center justify-center" onClick={() => navigate('/property-listing')}>
            <IoMdClose className='text-neutral-700' />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-7 pb-20 sm:pb-24 w-full overflow-hidden max-w-4xl mx-auto">
        <BookVisitForm onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default BookVisitPage; 