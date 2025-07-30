export interface BookingDetails {
  id: string;
  roomNumber: string;
  roomType: string;
  moveInDate: string;
  status: 'pending' | 'approved' | 'cancelled';
  tokenPaid: number;
  daysUntilMoveIn: number;
  propertyImage: string;
  roomImage: string;
}

export interface PaymentSummary {
  totalOutstanding: number;
  dueDate: string;
  items: PaymentItem[];
}

export interface PaymentItem {
  id: string;
  name: string;
  amount: number;
  type: 'rent' | 'security-deposit' | 'joining-fee';
  period?: string;
  isOneTime: boolean;
}

export interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
  action: 'chat' | 'call';
}

export interface PropertyInfo {
  name: string;
  location: string;
  commuteTimes: {
    metro: string;
    walk: string;
    bus: string;
  };
}

export interface ConfirmedBookingData {
  bookingDetails: BookingDetails;
  paymentSummary: PaymentSummary;
  supportOptions: SupportOption[];
  propertyInfo: PropertyInfo;
} 