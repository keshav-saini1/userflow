import { useState, useCallback } from 'react';
import type { OnboardingData, OnboardingStep } from '../types';

const initialSteps: OnboardingStep[] = [
  { id: 1, title: 'Welcome', description: 'Get started with your journey', isCompleted: false, isActive: true },
  { id: 2, title: 'Your Name', description: 'Tell us your name', isCompleted: false, isActive: false },
  { id: 3, title: 'Phone Number', description: 'Enter your phone number', isCompleted: false, isActive: false },
  { id: 4, title: 'Verification', description: 'Verify your phone number', isCompleted: false, isActive: false },
];

const initialData: OnboardingData = {
  currentStep: 1,
  steps: initialSteps,
  userData: {
    preferences: {},
    personalInfo: {},
    moveInDetails: {},
  },
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

// Custom hook for button animations
export const useButtonAnimation = () => {
  const animateButton = (element: HTMLElement, scale: number = 1.02) => {
    // Use CSS transitions instead of Motion API
    element.style.transform = `scale(${scale})`;
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  };

  const animateSuccess = (element: HTMLElement) => {
    // Use CSS transitions instead of Motion API
    element.style.transform = 'scale(1.05)';
    element.style.backgroundColor = '#00A63E';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      element.style.backgroundColor = '#030213';
    }, 400);
  };

  return { animateButton, animateSuccess };
}; 