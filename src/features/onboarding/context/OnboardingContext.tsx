import React, { createContext, useContext } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import type { OnboardingContextType } from '../types';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const onboardingState = useOnboarding();

  return (
    <OnboardingContext.Provider value={onboardingState}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
}; 