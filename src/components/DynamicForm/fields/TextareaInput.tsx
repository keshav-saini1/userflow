import React from 'react';

interface TextareaInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  name?: string;
  rows?: number;
  icon?: string | React.ComponentType;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  placeholder,
  error,
  disabled = false,
  value = '',
  onChange,
  onBlur,
  name,
  rows = 4,
  icon
}) => {
  const renderIcon = () => {
    const iconClasses = "size-[22px] text-[#455067]";
    
    if (typeof icon === 'string') {
      // Handle string-based icons (legacy support)
      switch (icon) {
        case 'user':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          );
        case 'phone':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          );
        case 'mail':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          );
        case 'calendar':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          );
        case 'building':
          return (
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          );
        default:
          return null;
      }
    } else if (typeof icon === 'function') {
      // Handle React component icons
      const IconComponent = icon;
      return <IconComponent />;
    }
    
    return null;
  };

  return (
    <div className="py-3.5 px-3.5 border-b border-slate-100">
      <div className="flex items-center gap-[10.5px]">
        {icon && (
          <div className="relative shrink-0 size-[22px] text-[#455067]">
            {renderIcon()}
          </div>
        )}
        <div className="flex-1">
          <p className="text-[#455067] text-[12.3px] leading-[17.5px] font-normal">
            {label}
          </p>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className="text-[#101828] text-[15px] leading-[17.5px] font-semibold w-full bg-transparent border-none outline-none resize-none"
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-[28.5px]">{error}</p>
      )}
    </div>
  );
};

export default TextareaInput; 