# Modify Booking Feature

This feature provides functionality for users to modify their existing bookings, including changing rooms, updating move-in dates, adding services, and canceling bookings.

## Components

### UpdateMoveInPage

A page component that allows users to select a new move-in date for their booking. Based on the [Figma design](https://www.figma.com/design/YqH44zDmG2zQJ4YWXW9ukJ/Unified-Joining-Flow?node-id=1137-22255&t=l8AolJGtfEgwFU37-4).

#### Features

- **Date Range Selection**: Uses the enhanced Calendar component to select a date range
- **Duration Options**: Quick selection buttons for common durations (1 day, 1 week, 1 month, 3 months)
- **Progress Indicator**: Shows current step in a multi-step flow
- **Property Display**: Shows booking details with property image and information
- **Responsive Design**: Mobile-first design with proper spacing and typography

#### Usage

```tsx
import { UpdateMoveInPage } from '@/features/modify-booking';
import type { ModifyBookingDetails } from '@/features/modify-booking/types';

const MyComponent = () => {
  const bookingDetails: ModifyBookingDetails = {
    id: 'BK001',
    propertyName: 'Premium Private Room',
    roomNumber: 'A-203',
    roomType: 'Premium Private Room',
    moveInDate: '2025-07-07',
    monthlyRent: 8000,
    status: 'pending',
    propertyImage: 'https://example.com/image.jpg'
  };

  return <UpdateMoveInPage bookingDetails={bookingDetails} />;
};
```

#### Props

- `bookingDetails` (optional): ModifyBookingDetails object containing booking information

#### State Management

The component manages the following state:
- `selectedDateRange`: The selected date range for move-in
- `selectedDuration`: The selected duration option
- `currentStep`: Current step in the flow (default: 1)

#### Navigation

- Back button navigates to the previous page
- Continue button is disabled until a date is selected
- Navigation can be customized by modifying the `handleContinue` function

#### Calendar Integration

Uses the enhanced Calendar component with:
- Range selection mode
- Custom availability logic (dates from today onwards)
- Visual feedback for selected dates
- Month navigation

#### Duration Options

Quick selection buttons that automatically calculate date ranges:
- 1 day: Same day
- 1 week: 7 days from today
- 1 month: 1 month from today
- 3 months: 3 months from today

## File Structure

```
src/features/modify-booking/
├── pages/
│   ├── UpdateMoveInPage.tsx      # New move-in date selection page
│   ├── ModifyBookingPage.tsx     # Main modification options page
│   ├── ChangeRoomPage.tsx        # Room change page
│   └── CancelBookingSuccessPage.tsx
├── components/                   # Reusable components
├── types/                       # TypeScript interfaces
├── data/                        # Sample data
├── examples/                    # Example components
└── README.md                   # This documentation
```

## Integration

The UpdateMoveInPage is integrated into the main ModifyBookingPage flow. When users select "Change Move-in Date" from the modification options, they are navigated to this page.

## Styling

The component uses Tailwind CSS classes and follows the design system established in the Figma design:
- Consistent spacing and typography
- Mobile-first responsive design
- Proper color scheme and visual hierarchy
- Smooth transitions and hover states 