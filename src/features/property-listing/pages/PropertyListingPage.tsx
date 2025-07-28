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
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <PropertyHeader 
        location={propertyListing.location}
        onBackClick={onBackClick}
        onShareClick={onShareClick}
      />

      {/* Hero Section */}
      <HeroSection 
        heroImage={propertyListing.heroImage}
        location={propertyListing.location}
      />

      {/* Content */}
      <div className="flex flex-col gap-7 px-3.5 py-[21px] max-w-[412px] w-full mx-auto">
        {/* Setup Card */}
        <SetupCard onSetupClick={onSetupClick} />

        {/* Availability Alert */}
        <AvailabilityAlert 
          availableUnits={propertyListing.availableUnits}
          totalUnits={propertyListing.totalUnits}
        />

        {/* Property Listings Section */}
        <div className="flex flex-col gap-[21px]">
          {/* Section Header */}
          <div className="flex flex-col gap-[3.5px]">
            <h2 className="text-white text-[18px] font-bold leading-[28px]">
              Available Rental Options
            </h2>
            <p className="text-[#4a5565] text-[12.3px] font-normal leading-[17.5px]">
              Find your perfect space
            </p>
          </div>

          {/* Property Cards */}
          <div className="flex flex-col gap-[21px]">
            {propertyListing.properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onReserve={onReserve}
                onBookVisit={onBookVisit}
              />
            ))}
          </div>
        </div>

        {/* Location Section */}
        <LocationSection 
          location={propertyListing.location}
          onMapClick={onMapClick}
        />
      </div>

      {/* Bottom Navigation - would be implemented separately */}
      <div className="mt-auto">
        {/* Bottom navigation component would go here */}
      </div>
    </div>
  );
}; 