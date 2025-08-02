import React, { useState } from 'react';
import { motion } from 'motion/react';
import FilterStep1 from '../components/FilterStep1';
import { FilterStep2, FilterStep3, FilterStep4 } from '..';
import { useNavigate } from 'react-router';
import { PropertyCard } from '@/features/property-listing/components/PropertyCard';
import type { PropertyDetails } from '@/features/property-listing/types';
import { useFilterStore } from '../store/filterStore';
import default_back from '@/assets/default_back.svg';
import filter from '@/assets/property/filter_black.svg';
import calendar from '@/assets/property/calendar.svg';

const FilterPropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentFilterStep, setCurrentFilterStep] = useState<number | null>(null);
  const { filterState, selectedAreas } = useFilterStore();

  // Sample property data based on the PropertyDetails interface
  const properties: PropertyDetails[] = [
    {
      id: '1',
      name: 'Premium Deluxe Room',
      type: 'Deluxe Room',
      occupancy: 'Single Occupancy',
      pricing: {
        currentPrice: 24000,
        originalPrice: 28000,
        savingsAmount: 4000,
        period: 'per month'
      },
      amenities: [
        { id: '1', name: 'Premium WiFi 300 Mbps', icon: 'wifi' },
        { id: '2', name: 'Daily housekeeping', icon: 'housekeeping' },
        { id: '3', name: 'Reserved parking spot', icon: 'parking' }
      ],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      isRecommended: true,
      location: 'Koramangala',
      availableFrom: 'Aug 1, 2025',
      status: 'available'
    },
    {
      id: '2',
      name: 'Comfort Twin Sharing',
      type: 'Twin Sharing',
      occupancy: 'Double Occupancy',
      pricing: {
        currentPrice: 18000,
        originalPrice: 22000,
        savingsAmount: 4000,
        period: 'per month'
      },
      amenities: [
        { id: '1', name: 'Premium WiFi 300 Mbps', icon: 'wifi' },
        { id: '2', name: 'Daily housekeeping', icon: 'housekeeping' },
        { id: '3', name: 'Reserved parking spot', icon: 'parking' }
      ],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      location: 'Koramangala',
      availableFrom: 'Aug 5, 2025',
      status: 'available'
    },
    {
      id: '3',
      name: 'Executive Suite',
      type: 'Executive Suite',
      occupancy: 'Single Occupancy',
      pricing: {
        currentPrice: 32000,
        originalPrice: 36000,
        savingsAmount: 4000,
        period: 'per month'
      },
      amenities: [
        { id: '1', name: 'Premium WiFi 300 Mbps', icon: 'wifi' },
        { id: '2', name: 'Daily housekeeping', icon: 'housekeeping' },
        { id: '3', name: 'Reserved parking spot', icon: 'parking' }
      ],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      location: 'Koramangala',
      availableFrom: 'Aug 10, 2025',
      status: 'available'
    },
    {
      id: '4',
      name: 'Budget Friendly Room',
      type: 'Budget Room',
      occupancy: 'Single Occupancy',
      pricing: {
        currentPrice: 15000,
        originalPrice: 18000,
        savingsAmount: 3000,
        period: 'per month'
      },
      amenities: [
        { id: '1', name: 'Premium WiFi 300 Mbps', icon: 'wifi' },
        { id: '2', name: 'Daily housekeeping', icon: 'housekeeping' },
        { id: '3', name: 'Reserved parking spot', icon: 'parking' }
      ],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      location: 'Koramangala',
      availableFrom: 'Aug 15, 2025',
      status: 'available'
    }
  ];

  const handleFilterStep = (step: number) => {
    setCurrentFilterStep(step);
  };

  const handleCloseFilter = () => {
    setCurrentFilterStep(null);
  };

  const handleFilterNext = () => {
    // The filter steps will handle updating the store directly
    if (currentFilterStep && currentFilterStep < 4) {
      setCurrentFilterStep(currentFilterStep + 1);
    } else {
      setCurrentFilterStep(null);
      navigate('/property-filter');
    }
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleReserve = (propertyId: string) => {
    console.log('Reserve property:', propertyId);
    // Add reservation logic here
  };

  const renderFilterStep = () => {
    switch (currentFilterStep) {
      case 1:
        return (
          <FilterStep1
            isOpen={true}
            onClose={handleCloseFilter}
            onNext={handleFilterNext}
            currentStep={1}
            filterData={filterState}
          />
        );
      case 2:
        return (
          <FilterStep2
            isOpen={true}
            onClose={handleCloseFilter}
            onNext={handleFilterNext}
            currentStep={2}
            filterData={filterState}
          />
        );
      case 3:
        return (
          <FilterStep3
            isOpen={true}
            onClose={handleCloseFilter}
            onNext={handleFilterNext}
            currentStep={3}
            filterData={filterState}
          />
        );
      case 4:
        return (
          <FilterStep4
            isOpen={true}
            onClose={handleCloseFilter}
            onNext={handleFilterNext}
            currentStep={4}
            filterData={filterState}
          />
        );
      default:
        return null;
    }
  };

  console.log({filterState});

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-3 w-full">
            <button onClick={() => navigate('/property-listing')}>
             <img src={default_back} alt="back" className="w-10 h-10" />
            </button>
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-3">
                <img src={calendar} alt="filter" className="w-4 h-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Homes in {filterState.location.length > 10 ? filterState.location.slice(0, 10) + '…' : filterState.location} | {selectedAreas.length} areas
                  </p>
                  <p className="text-xs text-gray-500">
                    {filterState.dateRange.startDate} → {filterState.dateRange.endDate}
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleFilterStep(1)}
            >
              <img src={filter} alt="filter" className="w-14 h-14" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-lg font-bold text-gray-900 mb-1">
            Available Rental Options
          </h1>
          <p className="text-sm text-gray-500">
            Find your perfect space
          </p>
        </div>

        {/* Property Cards */}
        <div className="space-y-6">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PropertyCard
                property={property}
                onPropertyClick={handlePropertyClick}
                onReserve={handleReserve}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filter Steps */}
      {renderFilterStep()}
    </div>
  );
};

export default FilterPropertiesPage; 