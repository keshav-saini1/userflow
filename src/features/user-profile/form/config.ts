import type { FormSchema } from '../../../components/DynamicForm';
import { 
  MdOutlineEmail, 
  MdOutlinePerson, 
  MdOutlinePhone, 
  MdOutlineCalendarToday, 
  MdOutlineBusiness, 
  MdOutlineLocationOn, 
  MdOutlineAccountBalance, 
  MdOutlinePayment, 
  MdOutlineDescription,
  MdOutlineWork
} from 'react-icons/md';

export const userProfileFormSchema: FormSchema = {
  'Personal Details': [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      required: true,
      icon: MdOutlineEmail,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }
          return true;
        }
      }
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your full name',
      required: true,
      icon: MdOutlinePerson,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'alternatePhone',
      type: 'text',
      label: 'Alternate Phone (Optional)',
      placeholder: 'Enter alternate phone number',
      required: false,
      icon: MdOutlinePhone,
      validation: {
        pattern: /^[0-9]{10}$/,
        custom: (value) => {
          if (value && !/^[0-9]{10}$/.test(value)) {
            return 'Please enter a valid 10-digit phone number';
          }
          return true;
        }
      }
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      label: 'Date of Birth (Optional)',
      required: false,
      icon: MdOutlineCalendarToday
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Gender (Optional)',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
      ],
      required: false,
      icon: MdOutlinePerson
    },
    {
      name: 'collegeCompanyName',
      type: 'text',
      label: 'College/Company\'s Name',
      placeholder: 'Enter your college or company name',
      required: true,
      icon: MdOutlineBusiness,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'tenantType',
      type: 'select',
      label: 'Tenant Type (Optional)',
      options: [
        { value: 'student', label: 'Student' },
        { value: 'working-professional', label: 'Working Professional' },
        { value: 'business-owner', label: 'Business Owner' },
        { value: 'other', label: 'Other' }
      ],
      required: false,
      icon: MdOutlineWork
    },
    {
      name: 'currentAddress',
      type: 'textarea',
      label: 'Current Address (Optional)',
      placeholder: 'Enter your current address',
      required: false,
      icon: MdOutlineLocationOn,
      validation: {
        maxLength: 500
      }
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: true,
      icon: MdOutlinePhone,
      validation: {
        pattern: /^[0-9]{10}$/,
        custom: (value) => {
          if (!/^[0-9]{10}$/.test(value)) {
            return 'Please enter a valid 10-digit phone number';
          }
          return true;
        }
      }
    }
  ],
  'Parent & Local Guardian Details': [
    {
      name: 'fatherName',
      type: 'text',
      label: 'Father Name',
      placeholder: 'Enter your father\'s name',
      required: true,
      icon: MdOutlinePerson,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'parentPhone',
      type: 'text',
      label: 'Parent\'s Phone',
      placeholder: 'Enter parent\'s phone number',
      required: true,
      icon: MdOutlinePhone,
      validation: {
        pattern: /^[0-9]{10}$/,
        custom: (value) => {
          if (!/^[0-9]{10}$/.test(value)) {
            return 'Please enter a valid 10-digit phone number';
          }
          return true;
        }
      }
    },
    {
      name: 'localGuardianName',
      type: 'text',
      label: 'Local Guardian\'s Name',
      placeholder: 'Enter local guardian\'s name',
      required: true,
      icon: MdOutlinePerson,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'localGuardianPhone',
      type: 'text',
      label: 'Local Guardian\'s Phone',
      placeholder: 'Enter local guardian\'s phone number',
      required: true,
      icon: MdOutlinePhone,
      validation: {
        pattern: /^[0-9]{10}$/,
        custom: (value) => {
          if (!/^[0-9]{10}$/.test(value)) {
            return 'Please enter a valid 10-digit phone number';
          }
          return true;
        }
      }
    }
  ],
  'Others': [
    {
      name: 'pinCode',
      type: 'text',
      label: 'Pin Code',
      placeholder: 'Enter pin code',
      required: true,
      icon: MdOutlineLocationOn,
      validation: {
        pattern: /^[0-9]{6}$/,
        custom: (value) => {
          if (!/^[0-9]{6}$/.test(value)) {
            return 'Please enter a valid 6-digit pin code';
          }
          return true;
        }
      }
    },
    {
      name: 'remark',
      type: 'textarea',
      label: 'Remark',
      placeholder: 'Enter any additional remarks',
      required: false,
      icon: MdOutlineDescription,
      validation: {
        maxLength: 1000
      }
    }
  ],
  'Bank Details': [
    {
      name: 'bankAccountNumber',
      type: 'text',
      label: 'Bank Account Number',
      placeholder: 'Enter your bank account number',
      required: true,
      icon: MdOutlineAccountBalance,
      validation: {
        minLength: 8,
        maxLength: 20,
        pattern: /^[0-9]+$/,
        custom: (value) => {
          if (!/^[0-9]+$/.test(value)) {
            return 'Account number should contain only numbers';
          }
          return true;
        }
      }
    },
    {
      name: 'ifscCode',
      type: 'text',
      label: 'IFSC Code',
      placeholder: 'Enter IFSC code',
      required: true,
      icon: MdOutlineAccountBalance,
      validation: {
        pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
        custom: (value) => {
          if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
            return 'Please enter a valid IFSC code (e.g., SBIN0001234)';
          }
          return true;
        }
      }
    },
    {
      name: 'bankName',
      type: 'text',
      label: 'Bank Name',
      placeholder: 'Enter your bank name',
      required: true,
      icon: MdOutlineAccountBalance,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'upiId',
      type: 'text',
      label: 'UPI ID',
      placeholder: 'Enter your UPI ID (e.g., username@bank)',
      required: true,
      icon: MdOutlinePayment,
      validation: {
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/,
        custom: (value) => {
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/.test(value)) {
            return 'Please enter a valid UPI ID format (e.g., username@bank)';
          }
          return true;
        }
      }
    }
  ],
  'GST Details': [
    {
      name: 'companyPan',
      type: 'text',
      label: 'Company PAN',
      placeholder: 'Enter company PAN',
      required: true,
      icon: MdOutlineBusiness,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'companyAddress',
      type: 'textarea',
      label: 'Company Address',
      placeholder: 'Enter company address',
      required: true,
      icon: MdOutlineLocationOn,
      validation: {
        minLength: 10,
        maxLength: 500
      }
    }
  ]
};

export default userProfileFormSchema;
