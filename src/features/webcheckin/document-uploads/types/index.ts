export interface ExtractedDocumentData {
  documentNumber: string;
  name: string;
  dob: string;
  address: string;
}

export interface DocumentUploadStepProps {
  documentName: string;
  onNext: (data?: ExtractedDocumentData) => void;
  onPrev: () => void;
  onClose: () => void;
  extractedData?: ExtractedDocumentData;
}

export interface PaidFlowUploadSheetProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  onUploadComplete: () => void;
  onChooseDifferentDocument?: () => void;
}

export type UploadStep = 1 | 2 | 3 | 4 | 5;

export interface DocumentVerificationData {
  documentName: string;
  documentNumber: string;
  isVerified: boolean;
}

export interface VerificationFlowData {
  documents: DocumentVerificationData[];
  allDocumentsVerified: boolean;
} 