# Book Visit Feature

This feature allows users to book visits for properties with the following functionality:

## Components

### BookVisitPage
The main page component that includes:
- Responsive header with property name and close button
- Visit type selection
- Date selection (conditionally shown)
- Time selection (conditionally shown)
- Submit button (fixed at bottom)
- Navigation to success page on form completion

### BookVisitSuccessPage
A separate route (`/book-visit/success`) shown after a visit is successfully booked, including:
- Success confirmation with animated checkmark
- Property card with details
- Booking details summary
- Next steps information
- Contact information for rescheduling
- Visit tips and recommendations
- Responsive design for all screen sizes

**Success Page Features:**
- Displays all booking details (property, visit type, date, time)
- Shows confirmation status with green checkmark
- Provides contact options for rescheduling
- Includes helpful visit tips
- Responsive layout that works on all devices
- Separate route with proper navigation

### VisitTypeSelector
Displays three visit type options:
- Live Video Tour
- Visit Property  
- Phone Call

**Responsive Features:**
- Stacks vertically on mobile, horizontal on larger screens
- Responsive text sizes and spacing
- Adaptive button sizes and padding

### DateSelector
Horizontal scrollable calendar showing the next 7 days with:
- Day name, date, and month
- Labels for "Today" and "Tomorrow"
- Availability status

**Responsive Features:**
- Smaller date cards on mobile for better fit
- Responsive text sizes and spacing
- Optimized scroll container height

### TimeSelector
Organized time slots by:
- 🌅 Morning (9:00 AM - 11:30 AM)
- ☀️ Afternoon (2:00 PM - 4:30 PM)
- 🌙 Evening (5:00 PM - 6:00 PM)

**Responsive Features:**
- 2 columns on mobile, 3 on tablet, 4 on desktop
- Responsive button sizes and padding
- Adaptive text sizes

## Features

### Conditional Display
- Date and time sections only appear after a visit type is selected
- Time section only appears after a date is selected
- Submit button is disabled until all selections are complete

### State Management
- Form state resets appropriately when selections change
- Visit type change resets date and time
- Date change resets time selection
- Navigation-based success state management

### Routing Structure
- `/book-visit` - Main booking form page
- `/book-visit/success` - Success confirmation page
- Proper navigation with booking details passed via route state
- Fallback redirects for invalid access

### Responsive Design
- Mobile-first design with proper spacing
- Horizontal scrolling for date selection
- Grid layout for time slots
- Responsive breakpoints: sm (640px), lg (1024px)
- Adaptive typography and spacing
- Optimized for all screen sizes from mobile to desktop

## Usage

### Navigation Flow:
1. Navigate to `/book-visit` to access the booking form
2. Select a visit type (Live Video Tour, Visit Property, or Phone Call)
3. Select a date from the available options
4. Select a time slot from the available times
5. Click "Continue" to submit the booking
6. Automatically navigate to `/book-visit/success` with booking details
7. View the success page with booking confirmation
8. Click "Done" to return to property listing

### Programmatic Usage:
```typescript
// Navigate to booking form
navigate('/book-visit');

// Navigate to success page with booking details
navigate('/book-visit/success', { 
  state: { 
    bookingDetails: {
      property: 'Nirvana Rooms',
      visitType: 'Visit Property',
      date: 'Saturday, July 12, 2025',
      time: '2:30 PM'
    }
  }
});
```

## Styling

Uses Tailwind CSS with custom colors matching the Figma design:
- Primary text: `#101828`
- Secondary text: `#4a5565`
- Border colors: `#e5e7eb`, `#101828`
- Background colors: `#ffffff`, `#f9fafb`

### Responsive Breakpoints
- Mobile: Default (0-640px)
- Tablet: sm (640px+)
- Desktop: lg (1024px+)

### Responsive Features
- Adaptive padding and margins
- Responsive typography scaling
- Flexible layouts that work on all screen sizes
- Touch-friendly button sizes on mobile
- Optimized spacing for different devices

## Success Page Design

The success page is based on the [Figma design](https://www.figma.com/design/YqH44zDmG2zQJ4YWXW9ukJ/Unified-Joining-Flow?node-id=721-20343&t=R3z6CPKcG3chXFbz-4) and includes:

- **Success Animation**: Green checkmark with celebration message
- **Property Card**: Visual representation of the booked property
- **Booking Details**: Complete summary of the visit booking
- **Next Steps**: Clear instructions for what happens next
- **Contact Information**: Multiple ways to reschedule if needed
- **Visit Tips**: Helpful recommendations for a successful visit
- **Responsive Layout**: Optimized for all device sizes
- **Separate Route**: Proper routing structure with navigation 