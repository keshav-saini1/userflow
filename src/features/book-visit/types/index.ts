export type VisitType = 'live-video-tour' | 'visit-property' | 'phone-call';

export interface VisitTypeOption {
  id: VisitType;
  title: string;
  subtitle: string;
  icon: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface TimeSection {
  title: string;
  emoji: string;
  slots: TimeSlot[];
}

export interface BookVisitForm {
  visitType: VisitType | null;
  selectedDate: Date | null;
  selectedTime: string | null;
}

export interface DateOption {
  date: Date;
  dayName: string;
  dayNumber: number;
  month: string;
  label?: string;
  available: boolean;
} 