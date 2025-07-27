import React from 'react';
import type { OnboardingStep } from '../types';

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStep: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ steps }) => {
  return (
    <div className="w-full py-4 lg:py-6">
      <div className="flex items-center justify-between max-w-md lg:max-w-2xl mx-auto px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm lg:text-base font-medium transition-all duration-200 ${
                  step.isCompleted
                    ? 'bg-green-500 text-white shadow-lg'
                    : step.isActive
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.isCompleted ? (
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 lg:mt-3 text-center">
                <div
                  className={`text-xs lg:text-sm font-medium ${
                    step.isActive ? 'text-blue-600' : step.isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs lg:text-sm text-gray-400 mt-1 max-w-20 lg:max-w-32">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 lg:h-1 mx-2 lg:mx-4 transition-all duration-200 rounded-full ${
                  steps[index + 1].isCompleted || (steps[index + 1].isActive && step.isCompleted)
                    ? 'bg-green-500'
                    : step.isCompleted
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OnboardingProgress; 