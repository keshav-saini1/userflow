# Modify Booking Feature

This feature allows users to modify their existing bookings with various options like changing rooms, dates, adding services, or canceling bookings.

## Components

### BookingCard
Displays the current booking details including:
- Property image and name
- Room details
- Move-in date
- Monthly rent
- Booking status

### ModifyOption
Individual modification option cards with:
- Icon with colored background
- Title and description
- Click handler for navigation

### CancelBookingModal
Confirmation modal/bottom sheet for booking cancellation:
- Responsive design (bottom sheet on mobile, modal on desktop)
- Smooth motion animations using Framer Motion
- Confirmation dialog with warning icon
- Two action options: "Keep my booking" and "Go Ahead with Cancellation"
- Backdrop click to close
- Staggered content animations with spring physics

### ModifyBookingPage
Main page that combines:
- Header with back navigation
- Booking card display
- List of modification options
- Send reminder action button
- Cancel booking modal integration

### ChangeRoomPage
Page for changing room options:
- Current booking display
- Available room options with details
- Room selection and request functionality
- Integration with reservation flow
- Responsive design for mobile and desktop

## Features

- **Responsive Design**: Works on both mobile and desktop
- **Status Indicators**: Visual status badges for booking states
- **Interactive Options**: Clickable modification options
- **Cancel Booking Modal**: Responsive confirmation dialog with motion animations
- **Change Room Page**: Complete room selection interface
- **Room Option Cards**: Detailed room information display
- **Reservation Integration**: Seamless flow from room selection to reservation
- **Motion Animations**: Smooth spring-based animations using Framer Motion
- **Clean UI**: Following the Figma design specifications

## Usage

```tsx
import { ModifyBookingPage } from '@/features/modify-booking';

// Use in your routing
<Route path="/modify-booking" element={<ModifyBookingPage />} />
```

## Data Structure

The feature uses TypeScript interfaces for type safety:

- `BookingDetails`: Contains booking information
- `ModifyBookingOption`: Defines modification options
- `ModifyBookingState`: Manages component state

## Styling

Uses Tailwind CSS with responsive breakpoints:
- Mobile-first design
- Desktop optimizations with `lg:` prefixes
- Consistent spacing and typography
- Hover effects and transitions 