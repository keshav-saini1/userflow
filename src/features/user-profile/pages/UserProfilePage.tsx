import React, { useState, useRef } from 'react';
import ProfileForm from '../components/ProfileForm';

const UserProfilePage: React.FC = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const profileFormRef = useRef<any>(null);

  const handleSave = () => {
    // Handle save functionality
    console.log('Profile saved');
    // You can add navigation logic here
    // window.location.href = '/dashboard';
  };

  const handleCancel = () => {
    // Handle cancel functionality
    console.log('Profile changes cancelled');
    // Navigate back
    window.history.back();
  };

  const handleBackNavigation = () => {
    setIsNavigating(true);
    // The ProfileForm will handle the unsaved changes check
    // If there are no changes, it will call this function
    window.history.back();
  };

  const handleContinue = (hasChanges: boolean) => {
    setHasUnsavedChanges(hasChanges);
  };

  const handleContinueClick = () => {
    if (hasUnsavedChanges) {
      // Save first, then continue
      if (profileFormRef.current) {
        profileFormRef.current.save();
      }
    }
    // Continue to next step
    console.log('Continuing to next step');
    // window.location.href = '/next-page';
  };

  return (
    <div className="bg-[#121212] relative min-h-screen w-screen pb-16">
      <div className="bg-gray-50 relative min-h-screen w-full">
        {/* Header */}
        <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
          <div className="p-[14px]">
            <div className="flex items-center gap-3.5">
              <button 
                onClick={handleBackNavigation}
                className="bg-gray-100 rounded-[14px] size-[35px] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="size-[17.5px] text-[#4a5565]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                  User Profile
                </h1>
                <p className="text-[#4a5565] text-[12.3px] leading-[17.5px]">
                  Manage your profile information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-[14px] py-[21px]">
          <ProfileForm 
            ref={profileFormRef}
            onSave={handleSave} 
            onContinue={handleContinue}
          />
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-[14px]">
          <button 
            onClick={handleContinueClick}
            className="w-full bg-[#155dfc] text-white text-[14px] font-semibold leading-[21px] py-3.5 px-[21px] rounded-[14px] hover:bg-[#0f4cd1] transition-colors"
          >
            {hasUnsavedChanges ? "Save & Continue" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 