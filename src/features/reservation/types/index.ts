export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  priceUnit: 'per month' | 'per day' | 'per week';
  image: string;
  type: string;
}

export interface ReservationStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface MoveInOption {
  id: string;
  label: string;
  value: string;
}

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  hasEvents: boolean;
}

export interface ReservationForm {
  selectedDate: Date | null;
  moveInOption: string | null;
  selectedDuration: string | null;
  customMonths?: number;
  selectedPaymentMethod?: string | null;
  currentStep: number;
  totalSteps: number;
}

export interface ReservationContextType {
  form: ReservationForm;
  updateForm: (updates: Partial<ReservationForm>) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
} 