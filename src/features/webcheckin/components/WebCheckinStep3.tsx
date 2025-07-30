import React, { useState } from 'react';
import type { WebCheckinStepProps } from '../types';
import { PaidFlowUploadSheet } from '../document-uploads';

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  isRequired: boolean;
  isUploaded: boolean;
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'error';
}

const WebCheckinStep3: React.FC<WebCheckinStepProps> = ({ onNext, onPrev }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  
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
    if (document.uploadStatus === 'pending') {
      setSelectedDocument(document);
      setIsBottomSheetOpen(true);
    }
  };

  const handleUploadComplete = () => {
    if (selectedDocument) {
      setDocuments(prev => prev.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, uploadStatus: 'uploaded' as const, isUploaded: true }
          : doc
      ));
    }
  };

  const handleChooseDifferentDocument = () => {
    setIsBottomSheetOpen(false);
    setSelectedDocument(null);
  };

  const getIconComponent = (iconName: string) => {
    const iconClass = "size-[21px] text-[#4a5565]";
    
    switch (iconName) {
      case 'id-card':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'car':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'user-check':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const renderDocumentItem = (doc: DocumentItem) => {
    return (
      <div 
        key={doc.id} 
        className={`bg-white rounded-[14px] border border-gray-200 p-[15px] cursor-pointer transition-all duration-200 ${
          doc.uploadStatus === 'pending' ? 'hover:shadow-md hover:border-[#155dfc]' : ''
        }`}
        onClick={() => handleDocumentClick(doc)}
      >
        <div className="flex items-start gap-3.5">
          <div className="bg-gray-100 rounded-[12.75px] size-[42px] flex items-center justify-center">
            {getIconComponent(doc.icon)}
          </div>
          <div className="flex-1">
            <h3 className="text-[#101828] text-[14px] font-medium leading-[21px]">
              {doc.name}
            </h3>
            <p className="text-[#6a7282] text-[12.3px] leading-[17.5px]">
              {doc.description}
            </p>
          </div>
          {doc.isRequired && (
            <div className="bg-[#fff4e7] rounded-[6.75px] border border-[#ffd6a7] px-2 py-[2.75px]">
              <span className="text-[#ca3500] text-[10.5px] font-medium leading-[14px]">
                Required
              </span>
            </div>
          )}
        </div>
        
        {doc.uploadStatus === 'uploading' && (
          <div className="mt-3 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#155dfc]"></div>
            <span className="text-[#155dfc] text-[12px]">Uploading...</span>
          </div>
        )}
        
        {doc.uploadStatus === 'uploaded' && (
          <div className="mt-3 flex items-center gap-2">
            <div className="bg-green-100 rounded-full p-1">
              <svg className="size-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-600 text-[12px] font-medium">Uploaded</span>
          </div>
        )}
      </div>
    );
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
        <div className="px-[14px] py-[21px] space-y-[21px]">
          {/* Hero Section */}
          <div className="text-center space-y-[21px]">
            <div className="bg-[#155dfc] rounded-full size-[84px] mx-auto flex items-center justify-center shadow-[0px_8px_32px_0px_rgba(0,122,255,0.15)]">
              <svg className="size-[42px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-[#101828] text-[26.3px] font-bold leading-[31.5px] mb-[10.5px]">
                Verify Your Identity
              </h2>
              <p className="text-[#4a5565] text-[15.8px] leading-[25.59px] max-w-[348px] mx-auto">
                Upload your documents for quick verification. This helps us ensure the security of your account and comply with regulations.
              </p>
            </div>
          </div>

          {/* Document List */}
          <div className="space-y-[10.5px]">
            {documents.map(renderDocumentItem)}
          </div>

          {/* Security Notice */}
          <div className="bg-[#d3e6fe] rounded-[14px] border border-[#bedbff] p-[15px]">
            <div className="flex gap-[10.5px] items-start">
              <div className="pt-[1.75px]">
                <svg className="size-[17.5px] text-[#155dfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-[#1c398e] text-[14px] font-medium leading-[21px] mb-[3.5px]">
                  Secure & Encrypted
                </h4>
                <p className="text-[#1447e6] text-[12.3px] leading-[17.5px]">
                  All document data is encrypted and processed securely. We follow industry-standard security practices.
                </p>
              </div>
            </div>
          </div>
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

      {/* Document Upload Bottom Sheet */}
      <PaidFlowUploadSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setSelectedDocument(null);
        }}
        documentName={selectedDocument?.name || ''}
        onUploadComplete={handleUploadComplete}
        onChooseDifferentDocument={handleChooseDifferentDocument}
      />
    </div>
  );
};

export default WebCheckinStep3; 