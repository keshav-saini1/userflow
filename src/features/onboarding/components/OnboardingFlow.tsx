import React, { useEffect, useState } from 'react';
import { useOnboardingContext } from '../context/OnboardingContext';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingStep4 from './OnboardingStep4';
import NoPropertyFlowSheet from './NoPropertyFlow';
import { useSearchParams } from 'react-router';
import { useOnboardingStore } from '../store/useOnboardingStore';

const OnboardingFlow: React.FC = () => {
  const { 
    data, 
    nextStep, 
    prevStep, 
    updateUserData, 
    completeStep,
  } = useOnboardingContext();

  const { fetchPublicProperty } = useOnboardingStore();

  // eazypg_id from url query params
  const [searchParams] = useSearchParams();
  const eazypgId = searchParams.get('eazypg_id');

  const [isNoPropertyOpen, setIsNoPropertyOpen] = useState(false);

  useEffect(() => {
    if (eazypgId) {
       fetchPublicProperty(eazypgId);
    }
 }, [eazypgId, fetchPublicProperty]);

  useEffect(() => {
    // Open the bottom sheet if no selected property is present
    const selectedPropertyId = localStorage.getItem('selectedPropertyId');
    setIsNoPropertyOpen(!selectedPropertyId);
  }, []);

  const selectedPropertyId = localStorage.getItem('selectedPropertyId');

  useEffect(() => {
    if (selectedPropertyId) {
      setIsNoPropertyOpen(false);
    }
  }, [selectedPropertyId]);

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

      {/* No Property Bottom Sheet */}
      <NoPropertyFlowSheet
        isOpen={isNoPropertyOpen}
        onClose={() => setIsNoPropertyOpen(false)}
        onSubmitId={(id: string) => {
          // Persist or verify the ID as needed
          // For now, close the sheet and proceed
          console.log('Submitted Easy PG ID:', id);
          fetchPublicProperty(id);
          setIsNoPropertyOpen(false);
        }}
        onScanQr={() => {
          // Trigger QR scan flow (to be implemented)
          console.log('Start QR scan');
        }}
      />
    </div>
  );
};

export default OnboardingFlow; 