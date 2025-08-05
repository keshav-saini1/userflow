import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DocumentVerification } from '@/components';
import default_back from '@/assets/default_back.svg';

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  isRequired: boolean;
  isUploaded: boolean;
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'error';
}

const AddDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
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
      isRequired: false,
      isUploaded: false,
      uploadStatus: 'pending'
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };



  const handleDocumentClick = (document: DocumentItem) => {
    console.log('Document clicked:', document.name);
  };

  const handleUploadComplete = (documentId: string) => {
    console.log('Upload completed for:', documentId);
    // Update document status to uploaded
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploadStatus: 'uploaded' as const, isUploaded: true }
        : doc
    ));
    updateCompletionPercentage();
  };

  const handleChooseDifferentDocument = (documentId?: string) => {
    console.log('Choose different document for:', documentId);
  };

  const updateCompletionPercentage = () => {
    const requiredDocumentsCount = documents.filter(doc => doc.isRequired).length;
    const uploadedDocumentsCount = documents.filter(doc => doc.isUploaded).length;
    const percentage = requiredDocumentsCount > 0 ? (uploadedDocumentsCount / requiredDocumentsCount) * 100 : 0;
    setCompletionPercentage(Math.round(percentage));
  };

  const handleContinue = () => {
    const requiredDocumentsCount = documents.filter(doc => doc.isRequired).length;
    const uploadedDocumentsCount = documents.filter(doc => doc.isUploaded).length;
    
    if (uploadedDocumentsCount >= requiredDocumentsCount) {
      // Navigate to next step or complete the joining process
      navigate('/joining-status?status=success');
    }
  };

  const requiredDocumentsCount = documents.filter(doc => doc.isRequired).length;
  const uploadedDocumentsCount = documents.filter(doc => doc.isUploaded).length;
  const canContinue = uploadedDocumentsCount >= requiredDocumentsCount;

  return (
    <div className="bg-gray-50 min-h-screen w-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={handleBack}
          >
            <img src={default_back} alt="back" className="w-10 h-10" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-sm">Document Verification</h1>
            <p className="text-gray-600 text-xs">Upload required documents</p>
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
          <DocumentVerification
            documents={documents}
            onDocumentClick={handleDocumentClick}
            onUploadComplete={handleUploadComplete}
            onChooseDifferentDocument={handleChooseDifferentDocument}
            showProgress={false} // We're showing progress in the header
            title="Verify Your Identity"
            description="Upload your documents for quick verification. This helps us ensure the security of your account and comply with regulations."
            securityNotice={{
              title: "Secure & Encrypted",
              description: "All document data is encrypted and processed securely. We follow industry-standard security practices."
            }}
          />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className={`w-full font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors ${
              canContinue
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!canContinue}
          >
            <span className="text-sm">
              {canContinue 
                ? "Continue"
                : `Upload ${requiredDocumentsCount - uploadedDocumentsCount} more required documents`
              }
            </span>
            {canContinue && (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
          {!canContinue && (
            <p className="text-center text-gray-500 text-xs mt-2">
              Please upload all required documents to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDocumentsPage; 