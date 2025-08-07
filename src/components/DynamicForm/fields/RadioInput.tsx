import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  name?: string;
  options?: RadioOption[];
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  error,
  disabled = false,
  value = '',
  onChange,
  onBlur,
  name,
  options = []
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              onBlur={onBlur}
              disabled={disabled}
              className={`
                h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`ml-2 block text-sm text-gray-700 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default RadioInput; 