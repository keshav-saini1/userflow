import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BaseBottomSheet, MultiSelectDropdown } from '@/components';
import type { FilterStepProps } from '../types';
import type { MultiSelectOption } from '@/components';
import { useFilterStore } from '../store/filterStore';

const FilterStep2: React.FC<FilterStepProps> = ({
  isOpen,
  onClose,
  onNext
}) => {
  const { selectedLocations, selectedAreas, setSelectedAreas } = useFilterStore();
  const [selectedCities, setSelectedCities] = useState<string[]>(selectedLocations);

  const cityOptions: MultiSelectOption[] = [
    { value: 'gurugram', label: 'Gurugram' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const areaOptions = [
    { 
      id: 'all', 
      name: 'All locations', 
      description: 'Show me everything available',
      selected: selectedAreas.includes('all')
    },
    { 
      id: 'iffco-chowk', 
      name: 'Iffco Chowk', 
      description: 'Business district, Metro connected',
      selected: selectedAreas.includes('iffco-chowk')
    },
    { 
      id: 'sector-14', 
      name: 'Sector 14', 
      description: 'Residential hub, peaceful area',
      selected: selectedAreas.includes('sector-14')
    },
    { 
      id: 'mg-road', 
      name: 'MG Road', 
      description: 'Entertainment district, nightlife',
      selected: selectedAreas.includes('mg-road')
    },
    { 
      id: 'dlf-phase-1', 
      name: 'DLF Phase 1', 
      description: 'Premium location, shopping malls',
      selected: selectedAreas.includes('dlf-phase-1')
    },
    { 
      id: 'cyber-city', 
      name: 'Cyber City', 
      description: 'IT hub, corporate offices',
      selected: selectedAreas.includes('cyber-city')
    },
    { 
      id: 'sohna-road', 
      name: 'Sohna Road', 
      description: 'Emerging area, affordable options',
      selected: selectedAreas.includes('sohna-road')
    }
  ];

  const handleAreaToggle = (areaId: string) => {
    if (areaId === 'all') {
      // If "All locations" is selected, clear other selections
      setSelectedAreas(['all']);
    } else {
      // If other area is selected, remove "all" and toggle the area
      const currentAreas = selectedAreas;
      const withoutAll = currentAreas.filter((id: string) => id !== 'all');
      if (currentAreas.includes(areaId)) {
        setSelectedAreas(withoutAll.filter((id: string) => id !== areaId));
      } else {
        setSelectedAreas([...withoutAll, areaId]);
      }
    }
  };

  const handleNext = () => {
    onNext({
      location: selectedCities.join(', ')
    });
  };

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Where?"
      className="min-h-[90vh]"
    >
      <div className="flex flex-col h-[90vh]">
        {/* Content */}
        <div className="flex-1 p-5">
          {/* City Dropdown */}
          <div className="mb-6">
            <MultiSelectDropdown
              options={cityOptions}
              selectedValues={selectedCities}
              onSelectionChange={setSelectedCities}
              placeholder="Select City"
              maxHeight="max-h-48"
            />
          </div>

          {/* Area Selection */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Area</h3>
            <div className="space-y-2">
              {areaOptions.map((area) => (
                <motion.button
                  key={area.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAreaToggle(area.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-colors ${
                    area.selected
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{area.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{area.description}</div>
                    </div>
                    {area.selected && (
                      <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom of screen */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {selectedAreas.length} area{selectedAreas.length !== 1 ? 's' : ''} selected
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={selectedAreas.length === 0}
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

export default FilterStep2; 