import React from 'react';
import type { DocumentUploadStepProps } from '../types';

interface DocumentVerificationStatusStepProps extends DocumentUploadStepProps {
  documentName: string;
  documentNumber: string;
  onVerifyAnotherDocument: () => void;
}

const DocumentVerificationStatusStep: React.FC<DocumentVerificationStatusStepProps> = ({
  documentName,
  documentNumber,
  onNext,
  onVerifyAnotherDocument,
}) => {
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
          <h2 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px] text-center">
            Verification Complete!
          </h2>
          <p className="text-[#4a5565] text-[14px] leading-[21px] text-center">
            Your {documentName.toLowerCase()} has been successfully verified
          </p>
        </div>
      </div>

      {/* Document Details Card */}
      <div className="bg-green-50 border border-[#b9f8cf] rounded-[14px] p-[15px]">
        <div className="flex gap-3.5 items-center">
          <div className="bg-[#e9fff1] rounded-[12.75px] w-[42px] h-[42px] flex items-center justify-center">
            <svg className="w-[21px] h-[21px] text-[#00a63e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#0d542b] text-[14px] font-medium leading-[21px]">
              {documentName}
            </h3>
            <p className="text-[#008236] text-[12.3px] leading-[17.5px]">
              ✓ Identity verified successfully
            </p>
            <p className="text-[#00a63e] text-[10.5px] leading-[14px] mt-[3.5px]">
              Document: {documentNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        <button
          onClick={onVerifyAnotherDocument}
          className="w-full h-[49px] bg-[#00a63e] text-white rounded-[14px] text-[15.8px] font-medium leading-[24.5px]"
        >
          Verify Another Document
        </button>
      </div>
    </div>
  );
};

export default DocumentVerificationStatusStep; 