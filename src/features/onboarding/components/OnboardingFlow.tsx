import React from 'react';
import { useOnboardingContext } from '../context/OnboardingContext';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingProgress from './OnboardingProgress';

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

  // Don't show progress - each step has its own design
  const showProgress = false;

  return (
    <div className="min-h-screen bg-white w-screen">
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <OnboardingProgress 
              steps={data.steps} 
              currentStep={data.currentStep} 
            />
          </div>
        </div>
      )}
      <div className={showProgress ? 'pt-20 lg:pt-24' : ''}>
        <div className="w-full">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow; 