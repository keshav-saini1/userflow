import React, { useState, useEffect } from 'react';
import type { DocumentUploadStepProps, ExtractedDocumentData } from '../types';

const VerifyDetailsStep: React.FC<DocumentUploadStepProps> = ({
  documentName,
  onNext,
  onPrev,
  extractedData,
}) => {
  const [formData, setFormData] = useState<ExtractedDocumentData>({
    documentNumber: '',
    name: '',
    dob: '',
    address: '',
  });

  useEffect(() => {
    if (extractedData) {
      setFormData({
        documentNumber: extractedData.documentNumber || '',
        name: extractedData.name || '',
        dob: extractedData.dob || '',
        address: extractedData.address || '',
      });
    }
  }, [extractedData]);

  const handleInputChange = (field: keyof ExtractedDocumentData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirmDetails = () => {
    onNext(formData);
  };

  const handleRetakePhoto = () => {
    onPrev();
  };

  return (
    <div className="flex flex-col gap-[21px] h-full">
      {/* Success Icon and Title */}
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-[21px]">
          <svg className="w-7 h-7 text-[#00a63e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px] text-center mb-[10.5px]">
          Verify Details
        </h2>
        <p className="text-[#4a5565] text-[14px] leading-[21px] text-center">
          Please confirm the extracted information is correct
        </p>
      </div>

      {/* Extracted Data Fields */}
      <div className="space-y-3.5">
        {/* Document Number */}
        <div className="space-y-[7px]">
          <label className="text-[#364153] text-[12.3px] font-medium leading-[17.5px] capitalize">
            Document Number
          </label>
          <input
            type="text"
            value={formData.documentNumber}
            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
            className="w-full border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-[11.5px] text-[14px] leading-[21px] text-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#155dfc] focus:border-transparent"
            placeholder="Enter document number"
          />
        </div>

        {/* Name */}
        <div className="space-y-[7px]">
          <label className="text-[#364153] text-[12.3px] font-medium leading-[17.5px] capitalize">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-[11.5px] text-[14px] leading-[21px] text-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#155dfc] focus:border-transparent"
            placeholder="Enter full name"
          />
        </div>

        {/* DOB */}
        <div className="space-y-[7px]">
          <label className="text-[#364153] text-[12.3px] font-medium leading-[17.5px] capitalize">
            DOB
          </label>
          <input
            type="text"
            value={formData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className="w-full border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-[11.5px] text-[14px] leading-[21px] text-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#155dfc] focus:border-transparent"
            placeholder="MM/DD/YYYY"
          />
        </div>

        {/* Address */}
        <div className="space-y-[7px]">
          <label className="text-[#364153] text-[12.3px] font-medium leading-[17.5px] capitalize">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full border border-[#d1d5dc] rounded-[12.75px] px-[11.5px] py-[11.5px] text-[14px] leading-[21px] text-neutral-950 focus:outline-none focus:ring-2 focus:ring-[#155dfc] focus:border-transparent resize-none"
            placeholder="Enter full address"
            rows={3}
          />
        </div>
      </div>

      {/* Review Notice */}
      <div className="bg-[#e1eeff] border border-[#bedbff] rounded-[14px] p-[15px]">
        <div className="flex gap-[10.5px] items-start">
          <div className="w-[17.5px] h-[17.5px] text-[#155dfc] mt-[1.75px]">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-[#1c398e] text-[14px] font-medium leading-[21px] mb-[3.5px]">
              Review Carefully
            </h4>
            <p className="text-[#1447e6] text-[12.3px] leading-[17.5px]">
              Make sure all details match exactly with your document. Any mismatch may cause verification to fail.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-[10.5px]">
        <button
          onClick={handleRetakePhoto}
          className="flex-1 bg-white border border-[rgba(0,0,0,0.01)] rounded-[6.75px] px-[15px] py-2 h-12"
        >
          <span className="text-[12.3px] font-medium leading-[17.5px] text-neutral-950">
            Retake Photo
          </span>
        </button>
        <button
          onClick={handleConfirmDetails}
          className="flex-1 bg-[#155dfc] text-white rounded-[6.75px] px-3.5 py-[7px] h-12"
        >
          <span className="text-[12.3px] font-medium leading-[17.5px]">
            Confirm Details
          </span>
        </button>
      </div>
    </div>
  );
};

export default VerifyDetailsStep; 