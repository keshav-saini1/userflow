import React, { useState } from 'react';
import type { PaidFlowUploadSheetProps, UploadStep, ExtractedDocumentData, VerificationFlowData } from '../types';
import UploadOptionsStep from '../steps/UploadOptionsStep';
import VerifyDetailsStep from '../steps/VerifyDetailsStep';
import VerificationCodeStep from '../steps/VerificationCodeStep';
import DocumentVerificationStatusStep from '../steps/DocumentVerificationStatusStep';
import ProfileCompletionStep from '../steps/ProfileCompletionStep';
import AnimatedBottomSheet from './AnimatedBottomSheet';

const PaidFlowUploadSheet: React.FC<PaidFlowUploadSheetProps> = ({
  isOpen,
  onClose,
  documentName,
  onUploadComplete,
  onChooseDifferentDocument,
}) => {
  const [currentStep, setCurrentStep] = useState<UploadStep>(1);
  const [extractedData, setExtractedData] = useState<ExtractedDocumentData>({
    documentNumber: '1234 5678 9012',
    name: 'John Doe',
    dob: '01/01/1990',
    address: '123 Sample Street, City, State - 123456',
  });
  const [verificationFlowData] = useState<VerificationFlowData>({
    documents: [
      { documentName: 'Aadhaar Card', documentNumber: '1234 5678 9012', isVerified: false },
      { documentName: 'PAN Card', documentNumber: 'ABCDE1234F', isVerified: false },
      { documentName: 'Driving License', documentNumber: 'DL123456789', isVerified: false },
    ],
    allDocumentsVerified: false,
  });

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
      const allVerified = verificationFlowData.documents.every(doc => doc.isVerified);
      if (allVerified) {
        setCurrentStep(5); // Show profile completion
      } else {
        // Continue with more documents
        onUploadComplete();
        handleClose();
      }
    } else if (currentStep === 5) {
      // Profile completion - redirect to profile
      onUploadComplete();
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };



  const handleChooseDifferentDocument = () => {
    handleClose();
    if (onChooseDifferentDocument) {
      onChooseDifferentDocument();
    }
  };



  return (
    <AnimatedBottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title="Document Verification"
    >
      {currentStep === 1 ? (
        <UploadOptionsStep
          documentName={documentName}
          onNext={handleNext}
          onClose={handleChooseDifferentDocument}
          onPrev={handlePrev}
        />
      ) : currentStep === 2 ? (
        <VerifyDetailsStep
          documentName={documentName}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
          extractedData={extractedData}
        />
      ) : currentStep === 3 ? (
        <VerificationCodeStep
          documentName={documentName}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
        />
      ) : currentStep === 4 ? (
        <DocumentVerificationStatusStep
          documentName={documentName}
          documentNumber={extractedData.documentNumber}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
          onVerifyAnotherDocument={() => {
            onUploadComplete();
            handleClose();
          }}
        />
      ) : (
        <ProfileCompletionStep
          documentName={documentName}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
        />
      )}
    </AnimatedBottomSheet>
  );
};

export default PaidFlowUploadSheet; 