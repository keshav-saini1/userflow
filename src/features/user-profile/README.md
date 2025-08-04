# User Profile Feature

## Overview
The User Profile feature includes a form with change tracking functionality that alerts users about unsaved changes when they try to leave the page.

## Features

### Form Change Tracking
- Tracks changes in all form fields (Basic Details, Other Details, Parent and Guardian Details)
- Excludes document changes from tracking (as requested)
- Updates button text from "Continue" to "Save & Continue" when changes are detected

### Unsaved Changes Alert
- Shows a modal alert when users try to leave with unsaved changes
- Handles both browser back button and tab closing
- Allows users to proceed anyway or stay on the page

### Components

#### ProfileForm
The main form component with the following props:
- `onSave?: () => void` - Callback when save is successful
- `onCancel?: () => void` - Callback when cancel is clicked
- `editable?: boolean` - Whether the form is editable (default: true)

#### UnsavedChangesAlert
A reusable alert component located in `@/components/UnsavedChangesAlert.tsx` with the following props:
- `isOpen: boolean` - Whether the alert is visible
- `onProceed: () => void` - Callback when user chooses to leave anyway
- `onCancel: () => void` - Callback when user chooses to stay
- `title?: string` - Alert title (default: "Unsaved Changes")
- `message?: string` - Alert message
- `proceedText?: string` - Text for proceed button (default: "Leave Anyway")
- `cancelText?: string` - Text for cancel button (default: "Stay")

## Usage

```tsx
import ProfileForm from './components/ProfileForm';

const MyPage = () => {
  const handleSave = () => {
    console.log('Profile saved');
    // Navigate to next page
  };

  const handleCancel = () => {
    console.log('Profile changes cancelled');
    // Navigate back
  };

  return (
    <ProfileForm 
      onSave={handleSave} 
      onCancel={handleCancel} 
      editable={true}
    />
  );
};
```

## How it Works

1. **Change Detection**: The component stores initial values and compares them with current values to detect changes
2. **Button Text Update**: When changes are detected, the button text changes from "Continue" to "Save & Continue"
3. **Navigation Protection**: When users try to navigate away, the component checks for unsaved changes
4. **Alert Display**: If changes exist, an alert is shown with options to stay or leave anyway
5. **Browser Protection**: The `beforeunload` event is used to prevent accidental tab closing

## Technical Details

- Uses `useRef` to store initial values for comparison
- Uses `useEffect` to track changes and set up event listeners
- Implements proper cleanup of event listeners
- Handles both programmatic navigation and browser events
- Excludes document changes from tracking as per requirements 