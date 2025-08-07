import React from 'react';
import DynamicForm from './index';
import type { FieldConfig, FormSchema } from './index';

const DynamicFormExample: React.FC = () => {
  // Example 1: Simple Form (Flat Array)
  const simpleFormSchema: FieldConfig[] = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
      validation: {
        minLength: 8
      }
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
      validation: {
        min: 18,
        max: 100
      }
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      placeholder: 'Tell us about yourself',
      validation: {
        maxLength: 500
      }
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      placeholder: 'Select your country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' }
      ],
      required: true
    },
    {
      name: 'gender',
      type: 'radio',
      label: 'Gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ],
      required: true
    },
    {
      name: 'interests',
      type: 'checkbox',
      label: 'Interests',
      options: [
        { value: 'sports', label: 'Sports' },
        { value: 'music', label: 'Music' },
        { value: 'reading', label: 'Reading' },
        { value: 'travel', label: 'Travel' },
        { value: 'cooking', label: 'Cooking' }
      ]
    },
    {
      name: 'birthDate',
      type: 'date',
      label: 'Birth Date',
      required: true
    },
    {
      name: 'avatar',
      type: 'file',
      label: 'Profile Picture',
      accept: 'image/*',
      multiple: false
    }
  ];

  // Example 2: Sectioned Form
  const sectionedFormSchema: FormSchema = {
    'Personal Information': [
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        required: true
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        required: true
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true
      },
      {
        name: 'phone',
        type: 'text',
        label: 'Phone Number',
        placeholder: '+1 (555) 123-4567'
      }
    ],
    'Employment Details': [
      {
        name: 'company',
        type: 'text',
        label: 'Company Name',
        required: true
      },
      {
        name: 'position',
        type: 'select',
        label: 'Position',
        options: [
          { value: 'developer', label: 'Software Developer' },
          { value: 'designer', label: 'UI/UX Designer' },
          { value: 'manager', label: 'Project Manager' },
          { value: 'analyst', label: 'Business Analyst' },
          { value: 'tester', label: 'QA Tester' }
        ],
        required: true
      },
      {
        name: 'experience',
        type: 'number',
        label: 'Years of Experience',
        validation: {
          min: 0,
          max: 50
        }
      },
      {
        name: 'skills',
        type: 'checkbox',
        label: 'Skills',
        options: [
          { value: 'javascript', label: 'JavaScript' },
          { value: 'react', label: 'React' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'nodejs', label: 'Node.js' },
          { value: 'python', label: 'Python' }
        ]
      }
    ],
    'Preferences': [
      {
        name: 'workType',
        type: 'radio',
        label: 'Preferred Work Type',
        options: [
          { value: 'remote', label: 'Remote' },
          { value: 'hybrid', label: 'Hybrid' },
          { value: 'onsite', label: 'On-site' }
        ],
        required: true
      },
      {
        name: 'notifications',
        type: 'checkbox',
        label: 'Notification Preferences',
        options: [
          { value: 'email', label: 'Email Notifications' },
          { value: 'sms', label: 'SMS Notifications' },
          { value: 'push', label: 'Push Notifications' }
        ]
      },
      {
        name: 'newsletter',
        type: 'radio',
        label: 'Newsletter Subscription',
        options: [
          { value: 'daily', label: 'Daily Digest' },
          { value: 'weekly', label: 'Weekly Summary' },
          { value: 'monthly', label: 'Monthly Newsletter' },
          { value: 'none', label: 'No Newsletter' }
        ]
      }
    ],
    'Additional Information': [
      {
        name: 'bio',
        type: 'textarea',
        label: 'Bio',
        placeholder: 'Tell us about yourself and your experience...',
        validation: {
          minLength: 50,
          maxLength: 1000
        }
      },
      {
        name: 'resume',
        type: 'file',
        label: 'Resume/CV',
        accept: '.pdf,.doc,.docx',
        multiple: false
      },
      {
        name: 'portfolio',
        type: 'file',
        label: 'Portfolio Files',
        accept: '.pdf,.doc,.docx,image/*',
        multiple: true
      }
    ]
  };

  const handleSimpleFormSubmit = (data: any) => {
    console.log('Simple Form Data:', data);
    alert('Simple form submitted! Check console for data.');
  };

  const handleSectionedFormSubmit = (data: any) => {
    console.log('Sectioned Form Data:', data);
    alert('Sectioned form submitted! Check console for data.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          DynamicForm Component Examples
        </h1>
        <p className="text-gray-600">
          Examples demonstrating the DynamicForm component with different configurations
        </p>
      </div>

      {/* Simple Form Example */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Simple Form Example
        </h2>
        <p className="text-gray-600 mb-6">
          This example shows a flat array of fields without sections.
        </p>
        <DynamicForm
          schema={simpleFormSchema}
          onSubmit={handleSimpleFormSubmit}
          submitButtonText="Submit Simple Form"
          className="max-w-2xl"
        />
      </div>

      {/* Sectioned Form Example */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Sectioned Form Example
        </h2>
        <p className="text-gray-600 mb-6">
          This example shows a form with sections for better organization.
        </p>
        <DynamicForm
          schema={sectionedFormSchema}
          onSubmit={handleSectionedFormSubmit}
          submitButtonText="Submit Application"
          className="max-w-2xl"
        />
      </div>

      {/* Features Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Features Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Supported Input Types:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Text Input</li>
              <li>Textarea</li>
              <li>Number Input</li>
              <li>Email Input</li>
              <li>Password Input (with show/hide)</li>
              <li>Date Input</li>
              <li>Select Dropdown</li>
              <li>Radio Buttons</li>
              <li>Checkboxes</li>
              <li>File Upload</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Validation Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Required field validation</li>
              <li>Minimum/Maximum length</li>
              <li>Number range validation</li>
              <li>Email format validation</li>
              <li>Custom validation functions</li>
              <li>Pattern matching</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicFormExample; 