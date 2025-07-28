import React from 'react';
import { PropertyListingPage } from '../pages/PropertyListingPage';
import { samplePropertyListing } from '../data/sampleData';

/**
 * Example usage of the PropertyListingPage component
 * This demonstrates how to integrate the property listing feature
 */
export const PropertyListingExample: React.FC = () => {
  const handleBackClick = () => {
    console.log('Back button clicked');
    // Navigate back to previous page
  };

  const handleShareClick = () => {
    console.log('Share button clicked');
    // Open share dialog or native share
  };

  const handleSetupClick = () => {
    console.log('Setup preferences clicked');
    // Navigate to preferences setup
  };

  const handleReserve = (propertyId: string) => {
    console.log('Reserve clicked for property:', propertyId);
    // Navigate to reservation flow
  };

  const handleBookVisit = (propertyId: string) => {
    console.log('Book visit clicked for property:', propertyId);
    // Navigate to visit booking flow
  };

  const handleMapClick = () => {
    console.log('Map clicked');
    // Navigate to full map view or open external maps
  };

  return (
    <PropertyListingPage
      propertyListing={samplePropertyListing}
      onBackClick={handleBackClick}
      onShareClick={handleShareClick}
      onSetupClick={handleSetupClick}
      onReserve={handleReserve}
      onBookVisit={handleBookVisit}
      onMapClick={handleMapClick}
    />
  );
}; 