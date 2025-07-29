import React from 'react';
import { useOnboardingContext } from '../context/OnboardingContext';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingStep4 from './OnboardingStep4';

const OnboardingFlow: React.FC = () => {
  const { 
    data, 
    nextStep, 
    prevStep, 
    updateUserData, 
    completeStep 
  } = useOnboardingContext();

  const handleNext = () => {
    completeStep(data.currentStep);
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleUpdateData = (newData: Partial<typeof data.userData>) => {
    updateUserData(newData);
  };

  const stepProps = {
    onNext: handleNext,
    onPrev: handlePrev,
    onUpdateData: handleUpdateData,
    currentData: data.userData,
  };

  return (
    <div className="min-h-screen bg-white w-screen relative">
      {/* Base screen - Always render Step 1 */}
      <OnboardingStep1 {...stepProps} />
      
      {/* Overlay for Step 2 */}
      {data.currentStep === 2 && (
        <OnboardingStep2 {...stepProps} />
      )}
      
      {/* Overlay for Step 3 */}
      {data.currentStep === 3 && (
        <OnboardingStep3 {...stepProps} />
      )}

      {/* Overlay for Step 4 */}
      {data.currentStep === 4 && (
        <OnboardingStep4 {...stepProps} />
      )}
    </div>
  );
};

export default OnboardingFlow; 