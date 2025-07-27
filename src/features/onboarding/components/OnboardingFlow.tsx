import React from 'react';
import { useOnboardingContext } from '../context/OnboardingContext';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';

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

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: handleNext,
      onPrev: handlePrev,
      onUpdateData: handleUpdateData,
      currentData: data.userData,
    };

    switch (data.currentStep) {
      case 1:
        return <OnboardingStep1 {...stepProps} />;
      case 2:
        return <OnboardingStep2 {...stepProps} />;
      case 3:
        return <OnboardingStep3 {...stepProps} />;
      default:
        return <OnboardingStep1 {...stepProps} />;
    }
  };

  
  return (
    <div className="min-h-screen bg-white w-screen">
      <div>
        <div className="w-full">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow; 