import React from 'react';
import {
  HeroSection,
  PropertyCard,
  LocationSection,
  PropertyHeader,
  AvailabilityAlert,
  SetupCard,
  FloatingMenu
} from '../components';
import type { PropertyListing } from '../types';

interface PropertyListingPageProps {
  propertyListing: PropertyListing;
  onBackClick?: () => void;
  onShareClick?: () => void;
  onSetupClick?: () => void;
  onReserve?: (propertyId: string) => void;
  onBookVisit?: (propertyId: string) => void;
  onMapClick?: () => void;
  onPropertyClick?: (propertyId: string) => void;
}

export const PropertyListingPage: React.FC<PropertyListingPageProps> = ({
  propertyListing,
  onBackClick,
  onShareClick,
  onSetupClick,
  onReserve,
  onBookVisit,
  onMapClick,
  onPropertyClick,
}) => {
  return (
    <div className="bg-white min-h-screen w-screen flex flex-col pb-20">
      {/* Header */}
      <PropertyHeader 
        location={propertyListing.location}
        onBackClick={onBackClick}
        onShareClick={onShareClick}
      />

      {/* Hero Section - Full width on desktop */}
      <div className="w-full">
        <HeroSection 
          heroImage={propertyListing.heroImage}
          location={propertyListing.location}
        />
      </div>

      {/* Main Content Container - Responsive */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 py-6 lg:py-8 xl:py-12">
          
          {/* Main Content Column */}
          <div className="flex-1 lg:max-w-4xl xl:max-w-5xl">
            {/* Setup Card and Availability Alert - Mobile: stacked, Desktop: side by side */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8 mb-8 lg:mb-12">
              <div className="flex-1">
                <SetupCard onSetupClick={onSetupClick} />
              </div>
              <div className="flex-1 lg:max-w-md">
                <AvailabilityAlert 
                  availableUnits={propertyListing.availableUnits}
                  totalUnits={propertyListing.totalUnits}
                />
              </div>
            </div>

            {/* Property Listings Section */}
            <div className="space-y-6 lg:space-y-8 xl:space-y-12">
              {/* Section Header */}
              <div className="text-left lg:text-left">
                <h2 className="text-[#101828] text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-2 lg:mb-4">
                  Available Rental Options
                </h2>
                <p className="text-[#4a5565] text-sm lg:text-base xl:text-lg">
                  Find your perfect space
                </p>
              </div>

              {/* Property Cards Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 2-3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                {propertyListing.properties.map((property) => (
                  <div key={property.id} className="flex justify-center">
                    <div className="w-full max-w-[400px] xl:max-w-none">
                      <PropertyCard
                        property={property}
                        onReserve={onReserve}
                        onBookVisit={onBookVisit}
                        onPropertyClick={onPropertyClick}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar for Desktop */}
          <div className="lg:w-80 xl:w-96 space-y-6 lg:space-y-8">
            {/* Location Section - Sticky on desktop */}
            <div className="lg:sticky lg:top-6">
              <LocationSection 
                location={propertyListing.location}
                onMapClick={onMapClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Menu - Bottom Navigation */}
      <FloatingMenu />
    </div>
  );
}; 