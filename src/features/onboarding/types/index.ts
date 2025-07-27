export interface OnboardingStep {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface OnboardingData {
  currentStep: number;
  steps: OnboardingStep[];
  userData: {
    preferences?: {
      location?: string;
      budget?: {
        min: number;
        max: number;
      };
      roomType?: 'private' | 'shared';
      amenities?: string[];
    };
    personalInfo?: {
      name?: string;
      email?: string;
      phone?: string;
      occupation?: string;
      isPhoneVerified?: boolean;
    };
    moveInDetails?: {
      preferredDate?: string;
      duration?: string;
      specialRequests?: string;
    };
  };
}

export interface OnboardingContextType {
  data: OnboardingData;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateUserData: (data: Partial<OnboardingData['userData']>) => void;
  completeStep: (step: number) => void;
  resetOnboarding: () => void;
}

export type OnboardingStepComponent = React.ComponentType<{
  onNext: () => void;
  onPrev: () => void;
  onUpdateData: (data: Partial<OnboardingData['userData']>) => void;
  currentData: OnboardingData['userData'];
}>; 