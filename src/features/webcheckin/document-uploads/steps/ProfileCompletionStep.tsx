import React from 'react';
import type { DocumentUploadStepProps } from '../types';

const ProfileCompletionStep: React.FC<DocumentUploadStepProps> = ({
  onNext,
}) => {
  const handleContinueToProfile = () => {
    onNext();
  };

  return (
    <div className="flex flex-col gap-[21px] h-full">
      {/* Success Icon and Title */}
      <div className="flex flex-col gap-3.5 items-center">
        <div className="bg-[#e9fff1] rounded-full w-[70px] h-[70px] flex items-center justify-center">
          <svg className="w-[35px] h-[35px] text-[#00a63e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col gap-[7px] items-center">
          <h2 className="text-[#101828] text-[18px] font-semibold leading-[24.5px] text-center">
            Verification Complete!
          </h2>
          <p className="text-[#4a5565] text-[14px] leading-[21px] text-center max-w-[324px]">
            Your documents have been successfully verified. You can now access all features.
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="mt-auto flex flex-col gap-[10.5px]">
        <button
          onClick={handleContinueToProfile}
          className="w-full h-[49px] bg-[#155dfc] text-white rounded-[14px] text-[15.8px] font-medium leading-[24.5px]"
        >
          Continue to Profile
        </button>
        <p className="text-[#6a7282] text-[12.3px] leading-[17.5px] text-center">
          You'll be redirected to your profile page
        </p>
      </div>
    </div>
  );
};

export default ProfileCompletionStep; 