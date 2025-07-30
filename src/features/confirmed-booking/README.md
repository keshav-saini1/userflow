# Confirmed Booking Flow

A comprehensive booking confirmation page that displays booking details, payment information, and support options based on the Figma design.

## Features

- **Hero Section**: Property image with gradient overlays and navigation controls
- **Booking Details**: Room information, status, and key dates
- **Payment Summary**: Outstanding payments with due dates and amounts
- **Support Options**: 24/7 support with chat and call options
- **Commute Information**: Property location with transit times
- **Interactive Elements**: Action buttons for payments and support

## Components

### ConfirmedBookingPage

The main component that renders the complete booking confirmation interface.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `ConfirmedBookingData` | Yes | Complete booking data including details, payments, and support options |
| `onBackClick` | `() => void` | Yes | Callback when back button is clicked |
| `onShareClick` | `() => void` | Yes | Callback when share button is clicked |
| `onSendReminder` | `() => void` | Yes | Callback when send reminder is clicked |
| `onPayNow` | `() => void` | Yes | Callback when pay now is clicked |
| `onViewAllPayments` | `() => void` | Yes | Callback when view all payments is clicked |
| `onSupportAction` | `(action: 'chat' \| 'call') => void` | Yes | Callback when support action is clicked |
| `onExploreCommute` | `() => void` | Yes | Callback when commute exploration is clicked |

## Data Types

### ConfirmedBookingData

```typescript
interface ConfirmedBookingData {
  bookingDetails: BookingDetails;
  paymentSummary: PaymentSummary;
  supportOptions: SupportOption[];
  propertyInfo: PropertyInfo;
}
```

### BookingDetails

```typescript
interface BookingDetails {
  id: string;
  roomNumber: string;
  roomType: string;
  moveInDate: string;
  status: 'pending' | 'confirmed' | 'active';
  tokenPaid: number;
  daysUntilMoveIn: number;
  propertyImage: string;
  roomImage: string;
}
```

### PaymentSummary

```typescript
interface PaymentSummary {
  totalOutstanding: number;
  dueDate: string;
  items: PaymentItem[];
}
```

### SupportOption

```typescript
interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
  action: 'chat' | 'call';
}
```

## Usage

```tsx
import { ConfirmedBookingPage } from '@/features/confirmed-booking';
import { sampleConfirmedBookingData } from '@/features/confirmed-booking/data/sampleData';

function App() {
  const handleBackClick = () => {
    // Navigate back
  };

  const handlePayNow = () => {
    // Open payment flow
  };

  const handleSupportAction = (action: 'chat' | 'call') => {
    // Handle support action
  };

  return (
    <ConfirmedBookingPage
      data={sampleConfirmedBookingData}
      onBackClick={handleBackClick}
      onShareClick={() => console.log('Share')}
      onSendReminder={() => console.log('Send reminder')}
      onPayNow={handlePayNow}
      onViewAllPayments={() => console.log('View all payments')}
      onSupportAction={handleSupportAction}
      onExploreCommute={() => console.log('Explore commute')}
    />
  );
}
```

## Design Features

- **Responsive Design**: Optimized for mobile (412px width)
- **Status Indicators**: Color-coded status badges with dots
- **Payment Breakdown**: Detailed payment items with amounts
- **Support Integration**: Easy access to chat and call support
- **Commute Information**: Property location with transit times
- **Interactive Elements**: Hover states and click feedback

## Status Types

- **Pending**: Orange color scheme
- **Confirmed**: Green color scheme  
- **Active**: Blue color scheme

## Payment Types

- **Rent**: Recurring monthly payment
- **Security Deposit**: One-time payment
- **Joining Fee**: One-time payment

## Support Actions

- **Chat**: Instant messaging support
- **Call**: Direct phone support

## Styling

The component uses Tailwind CSS classes and follows the exact design specifications:

- **Colors**: Matches Figma design system
- **Typography**: SF Pro Text font family
- **Spacing**: Consistent with design tokens
- **Shadows**: Subtle elevation effects
- **Border Radius**: Rounded corners for modern look 