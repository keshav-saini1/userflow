import React from 'react';
import type { VisitType, VisitTypeOption } from '../types';
import { BiCheck } from 'react-icons/bi';
import livetour from '@/assets/property/livetour.svg';
import visit from '@/assets/property/visit.svg';
import phonecall from '@/assets/property/phonecall.svg';


interface VisitTypeSelectorProps {
  selectedType: VisitType | null;
  onTypeSelect: (type: VisitType) => void;
}

const visitTypeOptions: VisitTypeOption[] = [
  {
    id: 'live-video-tour',
    title: 'Live Video',
    subtitle: 'Tour',
    icon: livetour
  },
  {
    id: 'visit-property',
    title: 'Visit',
    subtitle: 'Property',
    icon: visit
  },
  {
    id: 'phone-call',
    title: 'Phone Call',
    subtitle: '',
    icon: phonecall
  }
];

const VisitTypeSelector: React.FC<VisitTypeSelectorProps> = ({
  selectedType,
  onTypeSelect
}) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-base sm:text-[17.5px] font-semibold text-[#101828] text-center leading-tight sm:leading-[24.5px]">
          Interested? Let's Help You Explore
        </h3>
        <p className="text-sm sm:text-[14px] text-[#4a5565] text-center leading-tight sm:leading-[21px]">
          Choose how you'd like to learn more about the property
        </p>
      </div>
      
      <div className="flex flex-row gap-3 sm:gap-4 lg:gap-5 w-full">
        {visitTypeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onTypeSelect(option.id)}
            className={`flex flex-col items-center gap-2 sm:gap-2.5 p-4 sm:p-5 lg:p-6 rounded-[14px] border-2 transition-all duration-200 flex-1 min-w-0 relative ${
              selectedType === option.id
                ? 'bg-gray-50 border-[#101828]'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <img src={option.icon} alt={option.title} className="w-12 h-12 sm:w-[42px] sm:h-[42px]" />
            <div className="text-center">
              <div className="text-xs sm:text-[12.3px] font-medium text-[#101828] leading-tight sm:leading-[15.31px]">
                {option.title}
              </div>
              {option.subtitle && (
                <div className="text-xs sm:text-[12.3px] font-medium text-[#101828] leading-tight sm:leading-[15.31px]">
                  {option.subtitle}
                </div>
              )}
            </div>
            {selectedType === option.id && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-[21px] sm:h-[21px] bg-[#101828] rounded-full flex items-center justify-center">
                <BiCheck />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisitTypeSelector; 