import React from 'react';
import { motion } from 'motion/react';
import { BaseBottomSheet, MultiSelectDropdown } from '@/components';
import type { FilterStepProps } from '../types';
import type { MultiSelectOption } from '@/components';
import { useFilterStore } from '../store/filterStore';

const FilterStep1: React.FC<FilterStepProps> = ({
  isOpen,
  onClose,
  onNext
}) => {
  const { selectedLocations, setSelectedLocations } = useFilterStore();

  const locationOptions: MultiSelectOption[] = [
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'lucknow', label: 'Lucknow' },
    { value: 'kanpur', label: 'Kanpur' },
    { value: 'nagpur', label: 'Nagpur' }
  ];

  const handleNext = () => {
    onNext({
      location: selectedLocations.join(', ')
    });
  };

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Where?"
      className="min-h-[40vh]"
    >
      <div className="flex flex-col h-[40vh]">
        {/* Content */}
        <div className="flex-1 p-5">
          {/* Location Dropdown */}
          <div className="mb-6">
            <MultiSelectDropdown
              options={locationOptions}
              selectedValues={selectedLocations}
              onSelectionChange={setSelectedLocations}
              placeholder="Select Location"
              maxHeight="max-h-48"
            />
          </div>
        </div>

        {/* Footer - Fixed at bottom of screen */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {selectedLocations.length} location{selectedLocations.length !== 1 ? 's' : ''} selected
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={selectedLocations.length === 0}
              className="px-7 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default FilterStep1; 