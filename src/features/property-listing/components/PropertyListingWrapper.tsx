import { useNavigate } from "react-router";
import { PropertyListingPage } from "../pages";
import { useEffect } from "react";
import { usePropertyListingApi } from "../api/usePropertyListing";
import { mapApiToPropertyListing } from "../data/transform";
import FullPageSpinner from "@/components/FullPageSpinner";
import { usePropertyStore, usePropertyListing, usePropertyListLoading, useSelectedPropertyId } from "../store/propertyStore";

const PropertyListingWrapper = () => {
   const navigate = useNavigate();
   const propertyListing = usePropertyListing();
   const isLoadingPropertyList = usePropertyListLoading();
   const selectedPropertyId = useSelectedPropertyId();
   
   const {
      setPropertyListing,
      setPropertyListLoading,
      setSelectedPropertyId
   } = usePropertyStore();

   const { getPropertyList, getPropertyListData, isGettingPropertyList } = usePropertyListingApi();

   // Initialize selected property ID from localStorage
   useEffect(() => {
      const storedPropertyId = localStorage.getItem('selectedPropertyId');
      if (storedPropertyId && !selectedPropertyId) {
         setSelectedPropertyId(storedPropertyId);
      }
   }, [selectedPropertyId, setSelectedPropertyId]);

   // Fetch property list when selectedPropertyId changes
   useEffect(() => {
      if(selectedPropertyId) {
         setPropertyListLoading(true);
         getPropertyList(selectedPropertyId);
      }
   }, [selectedPropertyId, getPropertyList, setPropertyListLoading])

   // Update store when API data changes
   useEffect(() => {
      if(getPropertyListData) {
         console.log({getPropertyListData})
         const uiListing = mapApiToPropertyListing(getPropertyListData);
         setPropertyListing(uiListing);
         setPropertyListLoading(false);
      } 
   }, [getPropertyListData, setPropertyListing, setPropertyListLoading])

   // Sync loading state with API
   useEffect(() => {
      setPropertyListLoading(isGettingPropertyList);
   }, [isGettingPropertyList, setPropertyListLoading])


   if(isLoadingPropertyList) {
      return (
         <FullPageSpinner />
      )
   }

   const handlePropertyDetails = (sharing_type: number) => {
      navigate(`/property-details/${sharing_type}`)
   }

   // Don't render if no property listing data
   if (!propertyListing) {
      return <FullPageSpinner />;
   }

   return (
      <PropertyListingPage
         propertyListing={propertyListing}
         onBackClick={() => window.history.back()}
         onShareClick={() => console.log("Share clicked")}
         onReserve={() => navigate("/reservation")}
         onBookVisit={() => navigate("/book-visit")}
         onMapClick={() => console.log("Map clicked")}
         onPropertyClick={(s: any) => handlePropertyDetails(s)}
      />
   );
};

export default PropertyListingWrapper;
