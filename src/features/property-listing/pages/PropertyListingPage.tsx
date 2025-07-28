import React from 'react';
import {
  HeroSection,
  PropertyCard,
  LocationSection,
  PropertyHeader,
  AvailabilityAlert,
  SetupCard
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
}

export const PropertyListingPage: React.FC<PropertyListingPageProps> = ({
  propertyListing,
  onBackClick,
  onShareClick,
  onSetupClick,
  onReserve,
  onBookVisit,
  onMapClick
}) => {
  return (
    <div className="bg-white min-h-screen w-screen flex flex-col">
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 py-6 lg:py-8">
          
          {/* Main Content Column */}
          <div className="flex-1 lg:max-w-4xl">
            {/* Setup Card and Availability Alert - Mobile: stacked, Desktop: side by side */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8">
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
            <div className="space-y-6 lg:space-y-8">
              {/* Section Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-[#101828] text-2xl lg:text-3xl font-bold leading-tight mb-2">
                  Available Rental Options
                </h2>
                <p className="text-[#4a5565] text-sm lg:text-base">
                  Find your perfect space
                </p>
              </div>

              {/* Property Cards Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 2-3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
                {propertyListing.properties.map((property) => (
                  <div key={property.id} className="flex justify-center">
                    <div className="w-full max-w-[400px]">
                      <PropertyCard
                        property={property}
                        onReserve={onReserve}
                        onBookVisit={onBookVisit}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar for Desktop */}
          <div className="lg:w-80 xl:w-96 space-y-6">
            {/* Location Section - Sidebar on desktop, full width on mobile */}
            <div className="sticky top-6">
              <LocationSection 
                location={propertyListing.location}
                onMapClick={onMapClick}
              />
            </div>

            {/* Additional sidebar content could go here */}
            <div className="hidden lg:block">
              {/* Quick Stats Card */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Property Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Properties</span>
                    <span className="font-medium">{propertyListing.properties.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Units</span>
                    <span className="font-medium text-green-600">
                      {propertyListing.availableUnits}/{propertyListing.totalUnits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Starting From</span>
                    <span className="font-medium">
                      ₹{Math.min(...propertyListing.properties.map(p => p.pricing.currentPrice)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - would be implemented separately */}
      <div className="mt-auto">
        {/* Bottom navigation component would go here */}
      </div>
    </div>
  );
}; 