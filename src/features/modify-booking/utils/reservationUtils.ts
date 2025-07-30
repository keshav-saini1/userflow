import type { RoomOption } from '../types';

export const getSelectedRoomForReservation = (): RoomOption | null => {
  try {
    const roomData = sessionStorage.getItem('selectedRoomForReservation');
    if (roomData) {
      return JSON.parse(roomData) as RoomOption;
    }
    return null;
  } catch (error) {
    console.error('Error parsing selected room data:', error);
    return null;
  }
};

export const clearSelectedRoomForReservation = (): void => {
  sessionStorage.removeItem('selectedRoomForReservation');
};

export const isRoomChangeRequest = (): boolean => {
  return sessionStorage.getItem('selectedRoomForReservation') !== null;
}; 