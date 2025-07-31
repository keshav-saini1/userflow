import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReservationContextType, ReservationForm } from '../types';

const initialForm: ReservationForm = {
  selectedDate: null,
  moveInOption: null,
  selectedDuration: null,
  customMonths: undefined,
  selectedPaymentMethod: null,
  currentStep: 1,
  totalSteps: 5,
  roomChangeData: null,
};

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

interface ReservationProviderProps {
  children: React.ReactNode;
}

export const ReservationProvider: React.FC<ReservationProviderProps> = ({ children }) => {
  const [form, setForm] = useState<ReservationForm>(initialForm);

  // Load room change data from sessionStorage on mount
  useEffect(() => {
    try {
      const roomData = sessionStorage.getItem('selectedRoomForReservation');
      if (roomData) {
        const parsedRoomData = JSON.parse(roomData);
        setForm(prev => ({
          ...prev,
          roomChangeData: parsedRoomData
        }));
      }
    } catch (error) {
      console.error('Error loading room change data:', error);
    }
  }, []);

  const updateForm = (updates: Partial<ReservationForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (form.currentStep < form.totalSteps) {
      setForm(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const previousStep = () => {
    if (form.currentStep > 1) {
      setForm(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= form.totalSteps) {
      setForm(prev => ({ ...prev, currentStep: step }));
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    // Clear room change data from sessionStorage
    sessionStorage.removeItem('selectedRoomForReservation');
  };

  const clearRoomChangeData = () => {
    setForm(prev => ({ ...prev, roomChangeData: null }));
    sessionStorage.removeItem('selectedRoomForReservation');
  };

  const value: ReservationContextType = {
    form,
    updateForm,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    clearRoomChangeData,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
}; 