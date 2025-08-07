import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  value?: string[] | boolean;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  name?: string;
  options?: CheckboxOption[];
  single?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  error,
  disabled = false,
  value,
  onChange,
  onBlur,
  name,
  options = [],
  single = false
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (single) {
      onChange?.(checked);
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = checked
        ? [...currentValues, optionValue]
        : currentValues.filter(v => v !== optionValue);
      onChange?.(newValues);
    }
  };

  const isChecked = (optionValue: string) => {
    if (single) {
      return Boolean(value);
    } else {
      return Array.isArray(value) && value.includes(optionValue);
    }
  };

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
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={isChecked(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              onBlur={onBlur}
              disabled={disabled}
              className={`
                h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
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

export default CheckboxInput; 