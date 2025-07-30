import React from 'react';
import type { ModifyBookingOption } from '../types';
import { FiChevronRight } from 'react-icons/fi';

interface ModifyOptionProps {
  option: ModifyBookingOption;
  onClick: (option: ModifyBookingOption) => void;
}

const ModifyOption: React.FC<ModifyOptionProps> = ({ option, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-sm transition-shadow lg:hover:shadow-md"
      onClick={() => onClick(option)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${option.iconBgColor}`}>
            <span className="text-lg lg:text-xl">{option.icon}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">
              {option.title}
            </h3>
            <p className="text-gray-600 text-xs lg:text-sm">
              {option.description}
            </p>
          </div>
        </div>
        
        <FiChevronRight className="text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
      </div>
    </div>
  );
};

export default ModifyOption; 