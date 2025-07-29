import React from 'react';
import type { DocumentUploadStepProps } from '../types';

const UploadOptionsStep: React.FC<DocumentUploadStepProps> = ({
  documentName,
  onNext,
  onClose,
}) => {
  const handleTakePhoto = () => {
    // Simulate upload process
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  const handleUploadFromGallery = () => {
    // Simulate upload process
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-[21px] h-full">
      {/* Document Icon and Title */}
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-[21px]">
          <svg className="w-7 h-7 text-[#155dfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px] text-center mb-[10.5px]">
          Upload {documentName}
        </h2>
        <p className="text-[#4a5565] text-[14px] leading-[21px] text-center">
          Take a clear photo or upload an image of your {documentName.toLowerCase()}
        </p>
      </div>

      {/* Upload Options */}
      <div className="flex gap-[10.5px]">
        {/* Take Photo */}
        <button
          onClick={handleTakePhoto}
          className="flex-1 border-2 border-dashed border-[#d1d5dc] rounded-[14px] p-[23px] flex flex-col items-center gap-[10.5px] hover:border-[#155dfc] transition-colors"
        >
          <div className="w-7 h-7 text-[#4a5565]">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[#101828] text-[14px] font-medium leading-[21px]">Take Photo</p>
            <p className="text-[#6a7282] text-[12.3px] leading-[17.5px]">Use camera</p>
          </div>
        </button>

        {/* Upload from Gallery */}
        <button
          onClick={handleUploadFromGallery}
          className="flex-1 border-2 border-dashed border-[#d1d5dc] rounded-[14px] p-[23px] flex flex-col items-center gap-[10.5px] hover:border-[#155dfc] transition-colors"
        >
          <div className="w-7 h-7 text-[#4a5565]">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[#101828] text-[14px] font-medium leading-[21px]">Upload</p>
            <p className="text-[#6a7282] text-[12.3px] leading-[17.5px]">From gallery</p>
          </div>
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-[#fff8de] border border-[#fee685] rounded-[14px] p-[15px]">
        <div className="flex gap-[10.5px] items-start">
          <div className="w-[17.5px] h-[17.5px] text-[#e17100] mt-[1.75px]">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-[#7b3306] text-[14px] font-medium leading-[21px] mb-[3.5px]">
              Tips for best results
            </h4>
            <div className="space-y-[3.5px]">
              <p className="text-[#bb4d00] text-[12.3px] leading-[17.5px]">
                • Ensure good lighting and clear image
              </p>
              <p className="text-[#bb4d00] text-[12.3px] leading-[17.5px]">
                • All corners of the document should be visible
              </p>
              <p className="text-[#bb4d00] text-[12.3px] leading-[17.5px]">
                • Avoid glare or shadows on the document
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Different Document Button */}
      <button
        onClick={onClose}
        className="bg-white border border-[rgba(0,0,0,0.01)] rounded-[6.75px] px-[15px] py-2 w-full"
      >
        <span className="text-[12.3px] font-medium leading-[17.5px] text-neutral-950">
          Choose Different Document
        </span>
      </button>
    </div>
  );
};

export default UploadOptionsStep; 