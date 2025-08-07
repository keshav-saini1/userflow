import React, { useRef } from 'react';

interface FileInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: FileList | null;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  name?: string;
  accept?: string;
  multiple?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  placeholder,
  error,
  disabled = false,
  value,
  onChange,
  onBlur,
  name,
  accept,
  multiple = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onChange?.(files);
  };

  const getFileNames = () => {
    if (!value || value.length === 0) return '';
    return Array.from(value).map(file => file.name).join(', ');
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          onBlur={onBlur}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm cursor-pointer
            ${error 
              ? 'border-red-300 text-red-900' 
              : 'border-gray-300 text-gray-900'
            }
            ${disabled 
              ? 'bg-gray-50 cursor-not-allowed opacity-50' 
              : 'bg-white hover:border-blue-500 focus:border-blue-500'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <span className={getFileNames() ? 'text-gray-900' : 'text-gray-500'}>
              {getFileNames() || placeholder || 'Choose file...'}
            </span>
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FileInput; 