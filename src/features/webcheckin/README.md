# WebCheckin Feature

This feature implements the webcheckin flow for Nirvana Rooms, allowing tenants to complete their move-in process digitally.

## Structure

```
src/features/webcheckin/
├── components/
│   ├── WebCheckinFlow.tsx      # Main flow controller
│   ├── WebCheckinStep1.tsx     # Welcome screen (Step 1)
│   └── index.ts                # Component exports
├── pages/
│   └── WebCheckinPage.tsx      # Page wrapper
├── types/
│   └── index.ts                # TypeScript interfaces
├── index.ts                    # Feature exports
└── README.md                   # This file
```

## Current Implementation

### Step 1: Welcome Screen
- **File**: `components/WebCheckinStep1.tsx`
- **Design**: Based on Figma design from node `721:13230`
- **Features**:
  - Hero section with background image and location
  - Welcome card with progress indicator
  - Payment summary with breakdown
  - Help section with support options
  - "Continue Setup" button to proceed to next step

### Step 2: Tenant Verification
- **File**: `components/WebCheckinStep2.tsx`
- **Design**: Based on Figma design from node `721:25878`
- **Features**:
  - Profile card with user photo and KYC status
  - Identity document upload section with verification status
  - Editable fields for basic details, other details, and parent/guardian details
  - Inline editing with save/cancel buttons (✓/✗ icons)
  - Dynamic sections and fields (currently using dummy data)
  - Document cards with status indicators (verified/pending/add)
  - Responsive design for mobile and desktop

### Step 3: Document Verification
- **File**: `components/WebCheckinStep3.tsx`
- **Design**: Based on Figma design from node `735:12600`
- **Features**:
  - Hero section with verification icon and description
  - Document upload list with required/optional indicators
  - Upload progress tracking with status indicators
  - Security notice with encryption information
  - Dynamic progress bar based on uploaded documents
  - Continue button disabled until all required documents uploaded
  - Responsive design for mobile and desktop

### Flow Management
- **File**: `components/WebCheckinFlow.tsx`
- **Features**:
  - State management for 4-step process
  - Navigation between steps
  - Data persistence across steps
  - Ready for future step implementations

## Usage

### Basic Usage
```tsx
import { WebCheckinPage } from './features/webcheckin';

// In your router
{
  path: "/webcheckin",
  element: <WebCheckinPage />
}
```

### Direct Component Usage
```tsx
import { WebCheckinFlow } from './features/webcheckin';

function MyComponent() {
  return <WebCheckinFlow />;
}
```

## Data Structure

The flow uses the following data structure:

```typescript
interface WebCheckinData {
  currentStep: number;
  totalSteps: number;
  userData: {
    propertyDetails?: {
      propertyName: string;
      location: string;
      roomNumber?: string;
    };
    tenantVerification?: {
      isVerified: boolean;
      documentsSubmitted: boolean;
    };
    paymentSetup?: {
      tokenAmount: number;
      balanceAmount: number;
      totalOutstanding: number;
      dueDate: string;
    };
    rentalAgreement?: {
      isSigned: boolean;
      documentUrl?: string;
    };
  };
}
```

## Future Steps

The flow is designed to accommodate 4 total steps:

1. ✅ **Step 1**: Welcome Screen (Property Details) - Implemented
2. ✅ **Step 2**: Tenant Verification - Implemented
3. ✅ **Step 3**: Document Verification - Implemented
4. 🔄 **Step 4**: Rental Agreement - To be implemented

## Styling

- Uses Tailwind CSS for styling
- Follows the design system from Figma
- Responsive design for mobile-first approach
- Custom gradients and shadows matching the design

## Navigation

- **Route**: `/webcheckin`
- **Back Button**: Available in hero section
- **Continue Button**: Proceeds to next step
- **Help Options**: Chat and call support available

## Payment Integration

The current implementation includes:
- Payment summary display
- Token amount vs balance amount breakdown
- Due date tracking
- "Pay Now" and "Details" buttons (functionality to be implemented)

## Support Features

- 24/7 support badge
- Chat with support option
- Call support option
- All support interactions ready for integration 