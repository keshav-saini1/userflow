import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import approved_img from '@/assets/approved.svg';
import review_img from '@/assets/review.svg';
import default_back from '@/assets/default_back.svg';

type StatusType = 'success' | 'failure' | 'pending';

const JoiningStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<StatusType>('pending');

  useEffect(() => {
    const statusParam = searchParams.get('status') as StatusType;
    if (statusParam) {
      setStatus(statusParam);
    }
  }, [searchParams]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRemindManagement = () => {
    // Handle remind management action
    console.log('Remind management clicked');
  };

  const handleChatSupport = () => {
    // Handle chat support action
    console.log('Chat support clicked');
  };

  const handleCallUs = () => {
    // Handle call us action
    console.log('Call us clicked');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={handleBack}
          >
            <img src={default_back} alt="back" className="w-10 h-10" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-sm">Joining Request Status</h1>
            <p className="text-gray-600 text-xs">Track your application progress</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Status Card */}
          <div className={`rounded-xl p-6 border ${
            status === 'success' 
              ? 'bg-green-50 border-green-200' 
              : status === 'failure'
              ? 'bg-red-50 border-red-200'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-center gap-4">
              <div>
                {status === 'success' ? (
                  <img src={approved_img} alt="Approved" className="w-16 h-16" />
                ) : status === 'failure' ? (
                  <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <img src={review_img} alt="Under Review" className="w-7 h-7" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-lg">
                  {status === 'success' 
                    ? 'Application Approved' 
                    : status === 'failure'
                    ? 'Application Rejected'
                    : 'Application Under Review'
                  }
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {status === 'success' 
                    ? 'Your application is approved by our team' 
                    : status === 'failure'
                    ? 'Your application was not approved by our team'
                    : 'Your application is being reviewed by our team'
                  }
                </p>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-xl p-4 mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs">Your Room</span>
                <span className="font-semibold text-gray-900 text-sm">101 Bed A</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs">Monthly Rent</span>
                <span className="font-semibold text-gray-900 text-sm">₹55,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs">Move-in Date</span>
                <span className="font-semibold text-gray-900 text-sm">09 July, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs">Submitted On</span>
                <span className="font-semibold text-gray-900 text-sm">25 June, 2025</span>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 text-sm">Application Details</h3>
              <button className="flex items-center gap-2 text-blue-600 text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                View All
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-xs">Full Name</p>
                  <p className="font-medium text-gray-900 text-sm">Ishika Malhotra</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-xs">Room Assignment</p>
                  <p className="font-medium text-gray-900 text-sm">101 Bed A</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-xs">Monthly Rent</p>
                  <p className="font-medium text-gray-900 text-sm">₹55,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Progress */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-6">Application Progress</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">Application Submitted</h4>
                  <p className="text-gray-600 text-xs">Your application has been received</p>
                </div>
                <span className="text-gray-500 text-xs absolute right-0 top-0">Yesterday</span>
              </div>
              
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">Under Review</h4>
                  <p className="text-gray-600 text-xs">Application reviewed</p>
                </div>
                <span className="text-gray-500 text-xs absolute right-0 top-0">2d ago</span>
              </div>
              
              <div className="flex items-start gap-4 relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  status === 'success' ? 'bg-green-100' : status === 'failure' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <svg className={`w-3.5 h-3.5 ${
                    status === 'success' ? 'text-green-600' : status === 'failure' ? 'text-red-600' : 'text-green-600'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">Decision Pending</h4>
                  <p className="text-gray-600 text-xs">We'll notify you once a decision is made</p>
                </div>
                <span className="text-gray-500 text-xs absolute right-0 top-0">3d ago</span>
              </div>
            </div>
          </div>

          {/* Need Assistance */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 text-base mb-4">Need assistance?</h3>
            <div className="flex gap-3">
              <button
                onClick={handleChatSupport}
                className="flex-1 bg-white rounded-xl py-2.5 px-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-gray-900 text-sm font-medium">Chat Support</span>
              </button>
              <button
                onClick={handleCallUs}
                className="flex-1 bg-white rounded-xl py-2.5 px-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-900 text-sm font-medium">Call Us</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          {status === 'success' && (
            <button
              onClick={handleContinueToDashboard}
              className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm">Continue to Dashboard</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {status === 'failure' && (
            <button
              onClick={handleRemindManagement}
              className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm">Remind Management</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoiningStatusPage; 