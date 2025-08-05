import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProfileForm from '../../user-profile/components/ProfileForm';
import TenantDetailsSheet from '../components/TenantDetailsSheet';
import default_back from '@/assets/default_back.svg';

const JoiningProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [completionPercentage] = useState(90);
  const [showTenantDetailsSheet, setShowTenantDetailsSheet] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleComplete = () => {
    // Open tenant details sheet when form is complete
    setShowTenantDetailsSheet(true);
  };

  const handleTenantDetailsSheetClose = () => {
    setShowTenantDetailsSheet(false);
  };

  const handleTenantDetailsConfirm = () => {
    setShowTenantDetailsSheet(false);
    // Navigate to status page with success
    navigate('/joining-status?status=success');
  };

  const handleTenantDetailsReject = () => {
    setShowTenantDetailsSheet(false);
    // Navigate to status page with failure
    navigate('/joining-status?status=failure');
  };

  const handleDocumentAdd = () => {
    console.log('handleDocumentAdd');
    navigate('/joining-documents');
  };

  return (
    <div className="bg-gray-50 min-h-screen w-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={handleBack}
          >
            <img src={default_back} alt="back" className="w-10 h-10" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-sm">Join Nirvana Rooms</h1>
            <p className="text-gray-600 text-xs">Complete your tenant application</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-gray-900">{completionPercentage}%</span>
            <div className="bg-blue-100 h-2 w-10 rounded-full">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        <div className="max-w-md mx-auto">
          <ProfileForm onSave={handleComplete} onDocumentAdd={handleDocumentAdd} />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleComplete}
            className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={completionPercentage < 70}
          >
            <span className="text-sm">
              {completionPercentage > 70
                ? "Continue"
                : "Complete Application (1 fields left)"}
            </span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {completionPercentage <= 70 && (
            <p className="text-center text-gray-500 text-xs mt-2">
              Please complete all required fields to submit your application
            </p>
          )}
        </div>
      </div>

      {/* Tenant Details Sheet */}
      <TenantDetailsSheet
        isOpen={showTenantDetailsSheet}
        onClose={handleTenantDetailsSheetClose}
        onConfirm={handleTenantDetailsConfirm}
        onReject={handleTenantDetailsReject}
        tenantDetails={{
          name: 'Ishika Malhotra',
          roomNumber: '102-A',
          contactNumber: '+91 XXXXXX8989'
        }}
      />
    </div>
  );
};

export default JoiningProfilePage; 