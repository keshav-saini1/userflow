import { useState, useCallback } from 'react';
import type { OnboardingData, OnboardingStep } from '../types';

const initialSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Find Your Space',
    description: 'Discover your perfect coliving space',
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'Tell Us About You',
    description: 'Share your preferences and requirements',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'Schedule Your Visit',
    description: 'Book a tour and move-in details',
    isCompleted: false,
    isActive: false,
  },
];

const initialData: OnboardingData = {
  currentStep: 1,
  steps: initialSteps,
  userData: {},
};

export const useOnboarding = () => {
  const [data, setData] = useState<OnboardingData>(initialData);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= data.steps.length) {
      setData(prev => ({
        ...prev,
        currentStep: step,
        steps: prev.steps.map(s => ({
          ...s,
          isActive: s.id === step,
        })),
      }));
    }
  }, [data.steps.length]);

  const nextStep = useCallback(() => {
    const nextStepNumber = Math.min(data.currentStep + 1, data.steps.length);
    goToStep(nextStepNumber);
  }, [data.currentStep, data.steps.length, goToStep]);

  const prevStep = useCallback(() => {
    const prevStepNumber = Math.max(data.currentStep - 1, 1);
    goToStep(prevStepNumber);
  }, [data.currentStep, goToStep]);

  const updateUserData = useCallback((newData: Partial<OnboardingData['userData']>) => {
    setData(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        ...newData,
      },
    }));
  }, []);

  const completeStep = useCallback((step: number) => {
    setData(prev => ({
      ...prev,
      steps: prev.steps.map(s => 
        s.id === step ? { ...s, isCompleted: true } : s
      ),
    }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setData(initialData);
  }, []);

  return {
    data,
    goToStep,
    nextStep,
    prevStep,
    updateUserData,
    completeStep,
    resetOnboarding,
  };
}; 