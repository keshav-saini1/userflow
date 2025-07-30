import React, { useState, useEffect } from 'react';

interface CustomDurationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (months: number) => void;
  initialValue?: number;
}

const CustomDurationPopup: React.FC<CustomDurationPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue = 24
}) => {
  const [months, setMonths] = useState<number>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setMonths(initialValue);
      setIsValid(true);
    }
  }, [isOpen, initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 120) { // Max 10 years
      setMonths(value);
      setIsValid(true);
    } else {
      setMonths(value);
      setIsValid(false);
    }
  };

  const handleSubmit = () => {
    if (isValid && months > 0 && months <= 120) {
      onSubmit(months);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:flex lg:items-center lg:justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Mobile: Bottom Sheet, Desktop: Modal */}
      <div className={`
        absolute bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden
        lg:relative lg:rounded-[21px] lg:max-w-md lg:mx-4 lg:max-h-[90vh]
        w-full h-full lg:h-auto
        bottom-0 left-0 right-0
        transform transition-all duration-300 ease-out
      `}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100">
          {/* Mobile Drag Handle */}
          <div className="lg:hidden flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3.5">
              <div>
                <h2 className="text-sm font-medium text-gray-900">Custom Duration</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 bg-gray-100/50 rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-7 lg:space-y-7 pb-safe">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Add your custom stay duration (in months)
            </label>
            <div className="relative">
              <input
                type="number"
                value={months}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="24 months"
                className={`
                  w-full h-12 px-3.5 py-3.5 rounded-xl border-2 transition-colors
                  ${isValid 
                    ? 'border-gray-200 bg-gray-100 focus:border-blue-600 focus:bg-white' 
                    : 'border-red-300 bg-red-50 focus:border-red-500'
                  }
                `}
                min="1"
                max="120"
              />
              {!isValid && (
                <p className="text-xs text-red-600 mt-1">
                  Please enter a valid number between 1 and 120 months
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || months <= 0 || months > 120}
            className={`
              w-full h-12 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2.5
              ${isValid && months > 0 && months <= 120
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <span>Submit</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDurationPopup; 