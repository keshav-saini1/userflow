import React, { useState } from 'react';
import type { WebCheckinStepProps } from '../types';
import { DocumentVerification } from '@/components';

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  isRequired: boolean;
  isUploaded: boolean;
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'error';
}

const WebCheckinStep5: React.FC<WebCheckinStepProps> = ({ onNext, onPrev }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      description: 'Government-issued identity proof',
      icon: 'id-card',
      isRequired: true,
      isUploaded: false,
      uploadStatus: 'pending'
    },
    {
      id: 'pan',
      name: 'PAN Card',
      description: 'Permanent Account Number card',
      icon: 'credit-card',
      isRequired: true,
      isUploaded: false,
      uploadStatus: 'pending'
    },
    {
      id: 'driving-license',
      name: 'Driving License',
      description: 'Valid driving license',
      icon: 'car',
      isRequired: false,
      isUploaded: false,
      uploadStatus: 'pending'
    },
    {
      id: 'voter-id',
      name: 'Voter ID',
      description: 'Election Commission ID card',
      icon: 'user-check',
      isRequired: true,
      isUploaded: false,
      uploadStatus: 'pending'
    },
    {
      id: 'passport',
      name: 'Passport',
      description: 'Valid passport number',
      icon: 'globe',
      isRequired: true,
      isUploaded: false,
      uploadStatus: 'pending'
    }
  ]);

  const handleDocumentClick = (document: DocumentItem) => {
    console.log('Document clicked:', document.name);
  };

  const handleUploadComplete = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploadStatus: 'uploaded' as const, isUploaded: true }
        : doc
    ));
  };

  const handleChooseDifferentDocument = (documentId?: string) => {
    console.log('Choose different document for:', documentId);
  };

  const requiredDocumentsCount = documents.filter(doc => doc.isRequired).length;
  const uploadedDocumentsCount = documents.filter(doc => doc.isUploaded).length;

  return (
    <div className="bg-[#121212] relative min-h-screen w-full pb-16">
      <div className="bg-gray-50 relative min-h-screen w-full">
        {/* Header */}
        <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
          <div className="p-[14px]">
            <div className="flex items-center gap-3.5">
              <button 
                onClick={onPrev}
                className="bg-gray-100 rounded-[14px] size-[35px] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="size-[17.5px] text-[#4a5565]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                  Document Verification
                </h1>
                <p className="text-[#4a5565] text-[12.3px] leading-[17.5px]">
                  Step 3 of 4 • Identity Verification
                </p>
              </div>
            </div>
            <div className="mt-3.5">
              <div className="bg-gray-100 h-[7px] rounded-full w-full overflow-hidden">
                <div 
                  className="bg-[#155dfc] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(uploadedDocumentsCount / requiredDocumentsCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-[14px] py-[21px]">
          <DocumentVerification
            documents={documents}
            onDocumentClick={handleDocumentClick}
            onUploadComplete={handleUploadComplete}
            onChooseDifferentDocument={handleChooseDifferentDocument}
            showProgress={false} // We're showing progress in the header
            title="Verify Your Identity"
            description="Upload your documents for quick verification. This helps us ensure the security of your account and comply with regulations."
          />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-[14px]">
          <button 
            onClick={onNext}
            disabled={uploadedDocumentsCount < requiredDocumentsCount}
            className={`w-full text-[14px] font-semibold leading-[21px] py-3.5 px-[21px] rounded-[14px] transition-colors ${
              uploadedDocumentsCount >= requiredDocumentsCount
                ? 'bg-[#155dfc] text-white hover:bg-[#0f4cd1]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {uploadedDocumentsCount >= requiredDocumentsCount ? 'Continue' : `Upload ${requiredDocumentsCount - uploadedDocumentsCount} more required documents`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebCheckinStep5; 