import React, { useState, useRef, useEffect } from 'react';

export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
}

interface CountryCodePickerProps {
  value?: string;
  onChange?: (phoneCode: string, country: Country) => void;
  className?: string;
  disabled?: boolean;
}

const countries: Country[] = [
  { code: 'IN', name: 'India', phoneCode: '+91', flag: '🇮🇳' },
  { code: 'US', name: 'United States', phoneCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', phoneCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', phoneCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', phoneCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', phoneCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', phoneCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', phoneCode: '+34', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', phoneCode: '+31', flag: '🇳🇱' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE', phoneCode: '+971', flag: '🇦🇪' },
  { code: 'JP', name: 'Japan', phoneCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82', flag: '🇰🇷' },
  { code: 'CN', name: 'China', phoneCode: '+86', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', phoneCode: '+52', flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa', phoneCode: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', phoneCode: '+234', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt', phoneCode: '+20', flag: '🇪🇬' },
];

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  value = '+91',
  onChange,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countries.find(country => country.phoneCode === value) || countries[0];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.phoneCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleCountrySelect = (country: Country) => {
    onChange?.(country.phoneCode, country);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <span
        onClick={handleToggle}
        className={`bg-neutral-400 flex items-center gap-[7px] lg:gap-2 px-[10.5px] lg:px-3 py-[10px] lg:py-2 rounded-[12.75px] lg:rounded-xl transition-colors hover:bg-neutral-500 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {/* Country Flag */}
        <span className="text-base lg:text-lg">{selectedCountry.flag}</span>
        
        {/* Phone Code */}
        <span className="text-[#030213] text-[14px] lg:text-base font-medium leading-[21px]">
          {selectedCountry.phoneCode}
        </span>
        
        {/* Dropdown Arrow */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`lg:w-4 lg:h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M4.375 5.25L7 7.875L9.625 5.25"
            stroke="#717182"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[14px] lg:rounded-2xl shadow-lg z-50 max-h-64 lg:max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 lg:p-4 border-b border-gray-100">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-black text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030213]/20 focus:border-[#030213]"
            />
          </div>

          {/* Countries List */}
          <div className="max-h-48 lg:max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <span
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 hover:bg-gray-50 transition-colors text-left ${
                    selectedCountry.code === country.code ? 'bg-[#030213]/5' : ''
                  }`}
                >
                  {/* Flag */}
                  <span className="text-base lg:text-lg">{country.flag}</span>
                  
                  
                  
                  {/* Phone Code */}
                  <span className="text-[13px] lg:text-sm text-[#717182] font-medium">
                    {country.phoneCode}
                  </span>
                </span>
              ))
            ) : (
              <div className="px-3 lg:px-4 py-6 text-center text-[#717182] text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodePicker; 