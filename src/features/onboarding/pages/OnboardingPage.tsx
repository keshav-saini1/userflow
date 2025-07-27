import React from 'react';
import { OnboardingProvider } from '../context/OnboardingContext';
import OnboardingFlow from '../components/OnboardingFlow';

const OnboardingPage: React.FC = () => {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
};

export default OnboardingPage; 