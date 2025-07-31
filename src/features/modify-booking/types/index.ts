export interface ModifyBookingDetails {
  id: string;
  propertyName: string;
  roomNumber: string;
  roomType: string;
  moveInDate: string;
  monthlyRent: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  propertyImage: string;
}

export interface ModifyBookingOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
  action: 'change-room' | 'change-date' | 'add-services' | 'cancel-booking';
}

export interface ModifyBookingState {
  bookingDetails: ModifyBookingDetails | null;
  selectedOption: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface RoomOption {
  id: string;
  roomNumber: string;
  roomType: string;
  sharingType: string;
  price: number;
  amenities: string[];
  image: string;
  isSelected?: boolean;
} 