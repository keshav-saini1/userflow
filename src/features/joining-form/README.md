# Joining Form Feature

## Overview
The Joining Form feature provides a complete flow for tenant applications, including profile completion, document verification, and status tracking.

## Pages

### AddDocumentsPage
A new page that uses the reusable DocumentVerification component for document upload and verification during the tenant joining process.

#### Features
- **Document Upload**: Allows tenants to upload required and optional documents
- **Progress Tracking**: Shows completion percentage in the header
- **Validation**: Ensures all required documents are uploaded before allowing continuation
- **Responsive Design**: Works on mobile and desktop devices
- **Navigation**: Integrated with the joining form flow

#### Document Types
- **Aadhaar Card** (Required) - Government-issued identity proof
- **PAN Card** (Required) - Permanent Account Number card
- **Driving License** (Optional) - Valid driving license
- **Voter ID** (Required) - Election Commission ID card
- **Passport** (Optional) - Valid passport number

#### Usage
```tsx
import { AddDocumentsPage } from '@/features/joining-form';

// In your router or component
<AddDocumentsPage />
```

#### Props
The page doesn't accept props as it's designed to be a standalone page in the joining flow.

#### State Management
- **Documents State**: Manages the list of documents and their upload status
- **Completion Percentage**: Tracks progress based on required document uploads
- **Navigation**: Handles back navigation and continuation to next step

#### Integration
- **Header Progress**: Shows completion percentage in the header
- **Bottom Action**: Continue button that's enabled only when all required documents are uploaded
- **Navigation**: Integrates with React Router for navigation
- **DocumentVerification Component**: Uses the reusable component for document management

#### Flow
1. User lands on the page with empty document list
2. User clicks on documents to upload them
3. Upload progress is shown with loading states
4. Completion percentage updates as documents are uploaded
5. Continue button becomes enabled when all required documents are uploaded
6. User can navigate to the next step in the joining process

#### Styling
- **Consistent Design**: Follows the joining form design system
- **Mobile-First**: Responsive design optimized for mobile devices
- **Progress Indicators**: Visual progress tracking in header and document states
- **Interactive Elements**: Hover states and transitions for better UX

## Components

### Existing Components
- **ConfirmSheet**: Confirmation dialog for tenant details
- **TenantDetailsSheet**: Sheet for displaying tenant information
- **JoiningProfilePage**: Profile completion page
- **JoiningStatusPage**: Status tracking page

### New Components
- **AddDocumentsPage**: Document verification page using DocumentVerification component

## Examples

### AddDocumentsExample
A simple example showing how to use the AddDocumentsPage:

```tsx
import { AddDocumentsExample } from '@/features/joining-form';

const MyApp = () => {
  return <AddDocumentsExample />;
};
```

## Integration with DocumentVerification Component

The AddDocumentsPage demonstrates how to integrate the reusable DocumentVerification component:

1. **State Management**: Manages document state and upload progress
2. **Event Handlers**: Provides handlers for document upload, click, and completion
3. **Progress Tracking**: Updates completion percentage based on document uploads
4. **Navigation**: Handles navigation flow within the joining process
5. **UI Integration**: Integrates the component with the page's header and bottom action

This shows how the reusable DocumentVerification component can be used in different contexts while maintaining consistent functionality and design. 