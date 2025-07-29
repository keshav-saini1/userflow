export interface WebCheckinData {
  currentStep: number;
  totalSteps: number;
  userData: {
    propertyDetails?: {
      propertyName: string;
      location: string;
      roomNumber?: string;
    };
    tenantVerification?: {
      isVerified: boolean;
      documentsSubmitted: boolean;
    };
    paymentSetup?: {
      tokenAmount: number;
      balanceAmount: number;
      totalOutstanding: number;
      dueDate: string;
    };
    rentalAgreement?: {
      isSigned: boolean;
      documentUrl?: string;
    };
  };
}

export interface WebCheckinStepProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (data: Partial<WebCheckinData['userData']>) => void;
  currentData: WebCheckinData['userData'];
} 