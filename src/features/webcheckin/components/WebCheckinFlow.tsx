import React, { useState } from 'react';
import WebCheckinStep1 from './WebCheckinStep1';
import type { WebCheckinData } from '../types';
import WebCheckinStep2 from './WebCheckinStep2';
import WebCheckinStep3 from './WebCheckinStep3';
import WebCheckinStep5 from './WebCheckinStep5';

const WebCheckinFlow: React.FC = () => {
  const [flowData, setFlowData] = useState<WebCheckinData>({
    currentStep: 1,
    totalSteps: 4,
    userData: {
      propertyDetails: {
        propertyName: 'Nirvana Rooms',
        location: 'Iffco Chowk, Gurgaon',
      },
      paymentSetup: {
        tokenAmount: 5000,
        balanceAmount: 43000,
        totalOutstanding: 43000,
        dueDate: '15 Jan',
      },
    },
  });

  const nextStep = () => {
    setFlowData(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }));
  };

  const prevStep = () => {
    setFlowData(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const updateUserData = (newData: Partial<WebCheckinData['userData']>) => {
    setFlowData(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        ...newData,
      },
    }));
  };

  const stepProps = {
    onNext: nextStep,
    onPrev: prevStep,
    onUpdateData: updateUserData,
    currentData: flowData.userData,
  };

  return (
    <div className="min-h-screen bg-white w-screen relative">
      {/* Render current step */}
      {flowData.currentStep === 1 && (
        <WebCheckinStep1 {...stepProps} />
      )}
      
      {flowData.currentStep === 2 && (
        <WebCheckinStep2 {...stepProps} />
      )}
      
      {flowData.currentStep === 3 && (
        <WebCheckinStep3 {...stepProps} />
      )}
      
      {flowData.currentStep === 4 && (
        <WebCheckinStep5 {...stepProps} />
      )}
    </div>
  );
};

export default WebCheckinFlow; 