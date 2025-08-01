import React, { useState } from 'react';

interface EditableField {
  id: string;
  label: string;
  value: string;
  icon: string;
  isEditing: boolean;
  tempValue: string;
}

interface DocumentCard {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'add';
  image?: string;
}

interface ProfileFormProps {
  onSave?: () => void;
  onCancel?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onCancel }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  // Dummy data for editable fields
  const [basicDetails, setBasicDetails] = useState<EditableField[]>([
    {
      id: 'fullName',
      label: 'Full Name',
      value: 'Nimit Jain',
      icon: 'user',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'contactNumber',
      label: 'Contact Number',
      value: '9756237892',
      icon: 'phone',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'alternateNumber',
      label: 'Alternate Number',
      value: '9756237892',
      icon: 'phone',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'gender',
      label: 'Gender',
      value: 'Male',
      icon: 'user',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      value: '2 March 1997',
      icon: 'calendar',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'email',
      label: 'Email address',
      value: 'nimitjain@gmail.com',
      icon: 'mail',
      isEditing: false,
      tempValue: ''
    }
  ]);

  const [otherDetails, setOtherDetails] = useState<EditableField[]>([
    {
      id: 'companyName',
      label: 'College/Company Name',
      value: 'Rentok',
      icon: 'building',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'medicalCondition',
      label: 'Medical Condition (if any)',
      value: 'No',
      icon: 'medical',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'tenantType',
      label: 'Tenant Type',
      value: 'Add details',
      icon: 'user',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'foodPreference',
      label: 'Food Preference',
      value: 'Veg',
      icon: 'food',
      isEditing: false,
      tempValue: ''
    }
  ]);

  const [parentDetails, setParentDetails] = useState<EditableField[]>([
    {
      id: 'fatherName',
      label: 'Father/Guardian Name',
      value: 'Add details',
      icon: 'user',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'parentNumber',
      label: 'Parent Number',
      value: '9756237892',
      icon: 'phone',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'localGuardianName',
      label: 'Local Guardian Name',
      value: 'Add details',
      icon: 'user',
      isEditing: false,
      tempValue: ''
    },
    {
      id: 'localGuardianNumber',
      label: 'Local Guardian Number',
      value: '9756237892',
      icon: 'phone',
      isEditing: false,
      tempValue: ''
    }
  ]);

  // Dummy data for documents
  const [documents] = useState<DocumentCard[]>([
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'pan',
      name: 'PAN Card',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'passport',
      name: 'Passport',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 'add',
      name: 'Add Document',
      status: 'add'
    }
  ]);

  const handleEditField = (fieldId: string, currentValue: string) => {
    setEditingField(fieldId);
    setTempValue(currentValue);
  };

  const handleSaveField = (fieldId: string, section: 'basic' | 'other' | 'parent') => {
    const updateSection = (sectionData: EditableField[]) => {
      return sectionData.map(field => 
        field.id === fieldId 
          ? { ...field, value: tempValue, isEditing: false }
          : { ...field, isEditing: false }
      );
    };

    switch (section) {
      case 'basic':
        setBasicDetails(updateSection(basicDetails));
        break;
      case 'other':
        setOtherDetails(updateSection(otherDetails));
        break;
      case 'parent':
        setParentDetails(updateSection(parentDetails));
        break;
    }
    setEditingField(null);
    setTempValue('');
  };

  const handleCancelEdit = (section: 'basic' | 'other' | 'parent') => {
    const resetSection = (sectionData: EditableField[]) => {
      return sectionData.map(field => ({ ...field, isEditing: false }));
    };

    switch (section) {
      case 'basic':
        setBasicDetails(resetSection(basicDetails));
        break;
      case 'other':
        setOtherDetails(resetSection(otherDetails));
        break;
      case 'parent':
        setParentDetails(resetSection(parentDetails));
        break;
    }
    setEditingField(null);
    setTempValue('');
  };

  const renderEditableField = (field: EditableField, section: 'basic' | 'other' | 'parent') => {
    const isEditing = editingField === field.id;

    return (
      <div key={field.id} className="flex items-center justify-between py-3.5 px-3.5 border-b border-slate-100">
        <div className="flex items-center gap-[10.5px] flex-1">
          <div className="relative shrink-0 size-[18px]">
            <svg className="size-[18px] text-[#455067]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {field.icon === 'user' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              )}
              {field.icon === 'phone' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              )}
              {field.icon === 'calendar' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              )}
              {field.icon === 'mail' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              )}
              {field.icon === 'building' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              )}
              {field.icon === 'medical' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              )}
              {field.icon === 'food' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              )}
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[#455067] text-[12.3px] leading-[17.5px] font-normal">
              {field.label}
            </p>
            {isEditing ? (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="text-[#101828] text-[15px] leading-[17.5px] font-semibold w-full bg-transparent border-none outline-none"
                autoFocus
              />
            ) : (
              <p className={`text-[#101828] text-[15px] leading-[17.5px] font-semibold ${field.value === 'Add details' ? 'opacity-50' : ''}`}>
                {field.value}
              </p>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleSaveField(field.id, section)}
              className="size-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={() => handleCancelEdit(section)}
              className="size-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleEditField(field.id, field.value)}
            className="text-[#155dfc] text-[12.3px] font-medium hover:text-[#0f4cd1] transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    );
  };

  const renderDocumentCard = (doc: DocumentCard) => {
    if (doc.status === 'add') {
      return (
        <div key={doc.id} className="bg-white h-[150px] relative rounded-[8.75px] w-[140px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-[12.5px]">
          <div className="bg-[rgba(3,2,19,0.1)] rounded-full size-7 flex items-center justify-center mb-[3.5px]">
            <svg className="size-3.5 text-[#030213]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-[#101828] text-[10.5px] font-medium text-center leading-[14px]">
            Add Document
          </p>
          <p className="text-[#717182] text-[10.5px] text-center leading-[14px]">
            Upload additional ID
          </p>
        </div>
      );
    }

    return (
      <div key={doc.id} className="bg-white h-[150px] relative rounded-[8.75px] w-[140px] shadow-sm">
        <div className="h-full flex flex-col">
          <div className="bg-blue-100 h-[95px] rounded-t-[8.75px] relative overflow-hidden">
            {doc.image && (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${doc.image}')` }}
              />
            )}
            <div className={`absolute top-[7px] left-1/2 transform -translate-x-1/2 px-[7px] py-[3.5px] rounded-full ${
              doc.status === 'verified' ? 'bg-green-100' : 'bg-[#ffedd4]'
            }`}>
              <span className={`text-[10px] font-normal ${
                doc.status === 'verified' ? 'text-[#008236]' : 'text-[#ca3500]'
              }`}>
                {doc.status === 'verified' ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
          <div className="p-[10.5px] flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[#101828] text-[10.5px] font-medium leading-[14px]">
                  {doc.name}
                </p>
                <p className="text-[#155dfc] text-[10.5px] font-normal leading-[14px]">
                  Edit
                </p>
              </div>
              <svg className="size-[10.5px] text-[#717182]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-[21px]">
      {/* Profile Card */}
      <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[384px] mx-auto">
        <div className="p-[21px] text-center">
          <div className="relative inline-block mb-[21px]">
            <div className="bg-blue-100 rounded-full size-28 relative">
              <div className="bg-gray-100 rounded-full size-28 flex items-center justify-center">
                <div className="size-[88px] bg-gray-200 rounded-full" />
              </div>
              <div className="absolute inset-0 border-4 border-white rounded-full shadow-lg" />
            </div>
            <button className="absolute bottom-[7px] right-[7px] bg-[#030213] rounded-full size-[35px] flex items-center justify-center shadow-lg">
              <svg className="size-[17.5px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <h2 className="text-[#101828] text-[17.5px] font-medium leading-[24.5px] mb-[7px]">
            Nimit Jain
          </h2>
          <div className="bg-[#ffedd4] inline-flex items-center gap-1 px-[7px] py-[3.5px] rounded-full">
            <span className="text-[#ca3500] text-[10px] font-normal leading-[14px]">
              KYC Pending
            </span>
            <svg className="size-3 text-[#ca3500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Identity Documents */}
      <div className="space-y-[21px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[#101828] text-[14px] font-medium leading-[21px]">
            Identity Documents
          </h3>
          <span className="text-[#717182] text-[12.3px] leading-[17.5px]">
            1/5 verified
          </span>
        </div>
        <div className="flex gap-[11px] overflow-x-auto pb-2">
          {documents.map(renderDocumentCard)}
        </div>
      </div>

      {/* Basic Details */}
      <div className="bg-white rounded-[21px] shadow-sm">
        <div className="p-[21px]">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-[#101828] text-[14px] font-semibold leading-[21px]">
              Basic Details
            </h3>
            <svg className="size-[17.5px] text-[#717182]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
          <div className="space-y-0">
            {basicDetails.map(field => renderEditableField(field, 'basic'))}
          </div>
        </div>
      </div>

      {/* Other Details */}
      <div className="bg-white rounded-[21px] shadow-sm">
        <div className="p-[21px]">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-[#101828] text-[14px] font-semibold leading-[21px]">
              Other Details
            </h3>
            <svg className="size-[17.5px] text-[#717182]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
          <div className="space-y-0">
            {otherDetails.map(field => renderEditableField(field, 'other'))}
          </div>
        </div>
      </div>

      {/* Parent and Guardian Details */}
      <div className="bg-white rounded-[21px] shadow-sm">
        <div className="p-[21px]">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-[#101828] text-[14px] font-semibold leading-[21px]">
              Parent and Guardian Details
            </h3>
            <svg className="size-[17.5px] text-[#717182]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
          <div className="space-y-0">
            {parentDetails.map(field => renderEditableField(field, 'parent'))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm; 