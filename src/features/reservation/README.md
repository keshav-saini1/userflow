# Reservation Feature

This feature allows users to reserve rooms through a multi-step process based on the [Figma design](https://www.figma.com/design/YqH44zDmG2zQJ4YWXW9ukJ/Unified-Joining-Flow?node-id=721-17481&t=bHpfnKonw9A3ZSsx-4).

## Components

### ReservationPage
The main page component that wraps the entire reservation flow with the context provider.

### ReservationFlow
The main flow component that handles step navigation and renders the appropriate step component based on the current step.

### ReservationStep1
The first step of the reservation process featuring:
- **Header**: Sticky header with back button, title, and close button
- **Property Card**: Visual representation of the property being reserved with:
  - Property image with gradient overlay
  - Property name and location
  - Price information
  - Semi-transparent overlay with property details
- **Calendar**: Interactive calendar for date selection with:
  - Month navigation (July 2025)
  - Day headers (Sun, Mon, Tue, etc.)
  - Calendar grid with available/unavailable dates
  - Selected date highlighting
  - Event indicators (dots) for days with events
- **Move-in Options**: Horizontal scrollable options for move-in timing:
  - Immediate
  - 15 days
  - 30 days
  - 7 days
- **Continue Button**: Fixed bottom button that's enabled only when a date is selected

### ReservationStep2
The second step of the reservation process featuring:
- **Header**: Sticky header with back button, title, and close button
- **Property Card**: Visual representation of the property being reserved (same as Step 1)
- **Duration Selection**: Interactive options for stay duration with:
  - Monthly option (₹15,000/month)
  - 3 Months option with 5% discount (₹14,250/month) - Most Popular
  - 6 Months option with 10% discount (₹13,500/month)
  - 12 Months option with 15% discount (₹12,750/month)
  - Custom duration option with popup for month input
- **Radio Button Selection**: Visual radio buttons for each option
- **Discount Badges**: Orange badges showing discount percentages
- **Popular Badge**: Green badge for the most popular option
- **Custom Duration Popup**: Responsive modal/bottom sheet for entering custom duration in months (1-120 months)
- **Continue Button**: Fixed bottom button that's enabled only when a duration is selected

### ReservationStep3
The third step of the reservation process featuring:
- **Header**: Sticky header with back button, title, and close button
- **Property Card**: Visual representation of the property being reserved (same as previous steps)
- **Booking Review**: Comprehensive pricing breakdown with:
  - "Secure Now, Pay Later at Move-In!" messaging
  - Monthly rent calculation based on selected duration
  - Security deposit (fully refundable)
  - Automatic joining fee discount
  - Total amount calculation
- **Pricing Breakdown**: Detailed cost breakdown with:
  - Monthly rent × selected months
  - Security deposit amount
  - Joining fee discount (shown in green)
  - Total amount with refundable deposit note
- **Benefits Section**: Key benefits with checkmark icons:
  - Free cancellation up to 24 hours before move-in
  - All utilities and amenities included
  - Security deposit fully refundable at checkout
- **Token Amount**: Mobile-only display showing ₹5,000 token amount
- **Continue Button**: "Continue to Pay" button for proceeding to payment

### ReservationStep4
Payment method selection step featuring:
- **Header**: Sticky header with back button, title, and close button
- **Property Card**: Visual representation of the property being reserved (same as previous steps)
- **Payment Selection**: Choose from multiple payment options:
  - UPI (Pay instantly via UPI)
  - Credit/Debit Card (Secure card payment)
  - Net Banking (Bank transfer)
  - Cash Payment (Pay with Cash)
- **Token Amount Display**: Green-themed card showing ₹5,000 token amount
- **Security Notice**: Blue-themed card with payment security information
- **Continue Button**: Black button that's disabled until payment method is selected

### ReservationStep5
The final step of the reservation process featuring:
- **Header**: Sticky header with back button, title, and close button
- **Property Card**: Visual representation of the property being reserved (same as previous steps)
- **Success Confirmation**: Celebration of successful booking with:
  - Large green checkmark icon
  - "Booking Confirmed!" title
  - Success message
- **Booking Details**: Comprehensive summary with:
  - Unique booking ID (auto-generated)
  - Move-in date (formatted as full date)
  - Duration (based on Step 2 selection)
  - Total amount (calculated from Step 3)
  - Token amount paid (highlighted in green)
- **Next Steps**: Numbered list of required actions:
  - Profile verification within 24 hours
  - Document upload requirements
  - Payment instructions for move-in day
  - Communication details
- **Contact Information**: Support details with:
  - Email and phone number
  - Blue-themed contact card
- **Complete Button**: Green "Complete Reservation" button that resets the form

### CustomDurationPopup
A responsive modal component for entering custom duration in months:
- **Mobile**: Bottom sheet with drag handle, slides up from bottom
- **Desktop**: Centered modal with rounded corners
- **Header**: "Custom Duration" title with close button
- **Input Field**: Number input for months (1-120 months validation)
- **Validation**: Real-time validation with error messages
- **Submit Button**: Enabled only when valid input is provided
- **Keyboard Support**: Enter key to submit
- **Responsive Design**: Adapts layout based on screen size

## Features

### Multi-Step Process
- **Step 1**: Date selection with calendar and move-in options
- **Step 2**: Stay duration selection with pricing and discount options
- **Step 3**: Booking review with transparent pricing breakdown
- **Step 4**: Payment method selection (UPI, Card, Net Banking, Cash)
- **Step 5**: Final confirmation with booking summary and next steps

### State Management
- Uses React Context for managing reservation state across steps
- Form state includes selected date, move-in option, selected duration, custom months, selected payment method, and current step
- Navigation between steps with proper state persistence
- Form reset functionality

### Calendar Functionality
- Generates calendar days for July 2025
- Handles previous/next month navigation
- Shows available and unavailable dates
- Highlights selected dates
- Displays event indicators for days with events
- Responsive grid layout

### Pricing Calculation
- **Dynamic Pricing**: Calculates total based on selected duration from Step 2
- **Monthly Rent**: Base rent × selected months (1, 3, 6, 12, or custom)
- **Security Deposit**: Equal to one month's rent (fully refundable)
- **Joining Fee**: 60% of monthly rent with automatic discount
- **Token Amount**: Fixed ₹5,000 for booking confirmation
- **Total Calculation**: Monthly rent + Security deposit - Joining fee discount

### Booking Confirmation
- **Auto-generated Booking ID**: Unique identifier for each reservation
- **Date Formatting**: Full date display with day, month, and year
- **Duration Display**: Human-readable duration based on Step 2 selection
- **Amount Summary**: Total amount and token payment details
- **Next Steps Guide**: Clear instructions for post-booking actions
- **Support Information**: Contact details for customer assistance
- **Form Reset**: Clears all data when reservation is completed

### Responsive Design
- Mobile-first design with proper spacing
- Sticky header with backdrop blur
- Fixed bottom button for actions
- Responsive calendar grid
- Horizontal scrolling for move-in options
- Adaptive typography and spacing

## Usage

### Basic Usage
```typescript
import { ReservationPage } from '@/features/reservation';

// In your router or app
<Route path="/reservation" element={<ReservationPage />} />
```

### Programmatic Navigation
```typescript
import { useReservation } from '@/features/reservation';

const { form, nextStep, previousStep, goToStep } = useReservation();

// Navigate to next step
nextStep();

// Navigate to previous step
previousStep();

// Navigate to specific step
goToStep(2);

// Update form data
updateForm({ selectedDate: new Date() });
```

### Context Usage
```typescript
import { ReservationProvider, useReservation } from '@/features/reservation';

function App() {
  return (
    <ReservationProvider>
      <ReservationFlow />
    </ReservationProvider>
  );
}

function MyComponent() {
  const { form, updateForm, nextStep } = useReservation();
  
  // Access form state and methods
  console.log(form.selectedDate);
  console.log(form.currentStep);
}
```

## Styling

Uses Tailwind CSS with design tokens matching the Figma design:
- **Colors**: 
  - Primary text: `#101828`
  - Secondary text: `#4a5565`, `#717182`
  - Borders: `#e5e7eb`, `#f3f4f6`
  - Backgrounds: `#ffffff`, `#f9fafb`
  - Accent: `#2b7fff` (blue)
- **Typography**: SF Pro Text font family
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Border Radius**: Rounded corners using `rounded-xl`, `rounded-2xl`

### Responsive Breakpoints
- Mobile: Default (0-640px)
- Tablet: sm (640px+)
- Desktop: lg (1024px+)

## Design Implementation

The implementation closely follows the Figma design with:

### Header Design
- Sticky positioning with backdrop blur
- Back button with gray background
- Title and step indicator
- Close button with semi-transparent background

### Property Card
- Gradient background with overlay
- Semi-transparent info overlay with backdrop blur
- Location icon and price information
- Proper spacing and typography

### Calendar Design
- Month navigation with arrow buttons
- Day headers in gray text
- Calendar grid with proper spacing
- Selected date with blue border and shadow
- Event indicators as small blue dots
- Disabled dates with reduced opacity

### Move-in Options
- Horizontal scrolling container
- Blue-themed buttons with borders
- Proper spacing and typography

### Continue Button
- Fixed bottom positioning
- Disabled state with gray styling
- Enabled state with blue background
- Proper padding and typography

## Future Enhancements

The reservation feature is designed to be easily extensible:

1. **Step 2 Implementation**: Add personal information forms
2. **Step 3 Implementation**: Add payment processing and document upload
3. **Step 4 Implementation**: Add confirmation and success states
4. **API Integration**: Connect to backend services
5. **Validation**: Add form validation and error handling
6. **Animations**: Add smooth transitions between steps
7. **Accessibility**: Improve keyboard navigation and screen reader support
8. **Testing**: Add comprehensive unit and integration tests

## File Structure

```
src/features/reservation/
├── components/
│   ├── ReservationFlow.tsx
│   ├── ReservationStep1.tsx
│   ├── ReservationStep2.tsx
│   ├── ReservationStep3.tsx
│   ├── ReservationStep4.tsx
│   └── index.ts
├── context/
│   └── ReservationContext.tsx
├── pages/
│   ├── ReservationPage.tsx
│   └── index.ts
├── types/
│   └── index.ts
├── index.ts
└── README.md
``` 