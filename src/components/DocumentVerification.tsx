import React, { useState } from 'react';
import { 
  UploadOptionsStep, 
  VerifyDetailsStep, 
  VerificationCodeStep, 
  DocumentVerificationStatusStep, 
  ProfileCompletionStep,
  type ExtractedDocumentData,
  type UploadStep
} from '@/features/webcheckin/document-uploads';
import { BaseBottomSheet } from './index';

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  isRequired: boolean;
  isUploaded: boolean;
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'error';
}

interface DocumentVerificationProps {
  documents: DocumentItem[];
  onDocumentClick?: (document: DocumentItem) => void;
  onUploadComplete?: (documentId: string) => void;
  onChooseDifferentDocument?: (documentId?: string) => void;
  showProgress?: boolean;
  title?: string;
  description?: string;
  securityNotice?: {
    title: string;
    description: string;
  };
  className?: string;
}

const DocumentVerification: React.FC<DocumentVerificationProps> = ({
  documents,
  onDocumentClick,
  onUploadComplete,
  onChooseDifferentDocument,
  showProgress = true,
  title = "Document Verification",
  description = "Upload your documents for quick verification. This helps us ensure the security of your account and comply with regulations.",
  securityNotice = {
    title: "Secure & Encrypted",
    description: "All document data is encrypted and processed securely. We follow industry-standard security practices."
  },
  className = ""
}) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [currentStep, setCurrentStep] = useState<UploadStep>(1);
  const [extractedData, setExtractedData] = useState<ExtractedDocumentData>({
    documentNumber: '1234 5678 9012',
    name: 'John Doe',
    dob: '01/01/1990',
    address: '123 Sample Street, City, State - 123456',
  });

  const handleDocumentClick = (document: DocumentItem) => {
    if (document.uploadStatus === 'pending') {
      setSelectedDocument(document);
      setIsBottomSheetOpen(true);
      setCurrentStep(1);
      
      if (onDocumentClick) {
        onDocumentClick(document);
      }
    }
  };

  const handleChooseDifferentDocument = () => {
    setIsBottomSheetOpen(false);
    setCurrentStep(1);
    if (selectedDocument && onChooseDifferentDocument) {
      onChooseDifferentDocument(selectedDocument.id);
    } else if (onChooseDifferentDocument) {
      onChooseDifferentDocument();
    }
    setSelectedDocument(null);
  };

  const handleNext = (data?: ExtractedDocumentData) => {
    if (data) {
      setExtractedData(data);
    }
    
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // After verification code, show document verification status
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Check if all documents are verified
      setCurrentStep(5); // Show profile completion
    } else if (currentStep === 5) {
      // Profile completion - complete upload
      if (selectedDocument && onUploadComplete) {
        onUploadComplete(selectedDocument.id);
      }
      handleChooseDifferentDocument();
    }
  };

  const handlePrev = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
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

  const getStepTitle = () => {
    if (!selectedDocument) return '';
    
    switch (currentStep) {
      case 1:
        return `Upload ${selectedDocument.name}`;
      case 2:
        return `Verify ${selectedDocument.name}`;
      case 3:
        return 'Verify Code';
      case 4:
        return 'Verification Status';
      case 5:
        return 'Profile Completion';
      default:
        return 'Document Verification';
    }
  };

  return (
    <div className={`space-y-[21px] ${className}`}>
      {/* Hero Section */}
      <div className="text-center space-y-[21px]">
        <div className="bg-[#155dfc] rounded-full size-[84px] mx-auto flex items-center justify-center shadow-[0px_8px_32px_0px_rgba(0,122,255,0.15)]">
          <svg className="size-[42px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-[#101828] text-[26.3px] font-bold leading-[31.5px] mb-[10.5px]">
            {title}
          </h2>
          <p className="text-[#4a5565] text-[15.8px] leading-[25.59px] max-w-[348px] mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="bg-gray-100 h-[7px] rounded-full w-full overflow-hidden">
          <div 
            className="bg-[#155dfc] h-full rounded-full transition-all duration-300"
            style={{ width: `${requiredDocumentsCount > 0 ? (uploadedDocumentsCount / requiredDocumentsCount) * 100 : 0}%` }}
          />
        </div>
      )}

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
              {securityNotice.title}
            </h4>
            <p className="text-[#1447e6] text-[12.3px] leading-[17.5px]">
              {securityNotice.description}
            </p>
          </div>
        </div>
      </div>

      {/* Document Upload Flow using BaseBottomSheet */}
      <BaseBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleChooseDifferentDocument}
        title={getStepTitle()}
        className="max-w-md mx-auto"
        bodyClassName="p-4"
      >
        {currentStep === 1 && (
          <UploadOptionsStep
            documentName={selectedDocument?.name || ''}
            onNext={handleNext}
            onClose={handleChooseDifferentDocument}
            onPrev={handlePrev}
          />
        )}
        
        {currentStep === 2 && (
          <VerifyDetailsStep
            documentName={selectedDocument?.name || ''}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={handleChooseDifferentDocument}
            extractedData={extractedData}
          />
        )}
        
        {currentStep === 3 && (
          <VerificationCodeStep
            documentName={selectedDocument?.name || ''}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={handleChooseDifferentDocument}
          />
        )}
        
        {currentStep === 4 && (
          <DocumentVerificationStatusStep
            documentName={selectedDocument?.name || ''}
            documentNumber={extractedData.documentNumber}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={handleChooseDifferentDocument}
            onVerifyAnotherDocument={() => handleChooseDifferentDocument()}
          />
        )}
        
        {currentStep === 5 && (
          <ProfileCompletionStep
            documentName={selectedDocument?.name || ''}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={handleChooseDifferentDocument}
          />
        )}
      </BaseBottomSheet>
    </div>
  );
};

export default DocumentVerification; 