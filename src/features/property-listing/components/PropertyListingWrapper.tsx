import { useNavigate } from "react-router";
import { PropertyListingPage } from "../pages";
import { useEffect, useState } from "react";
import { usePropertyListingApi } from "../api/usePropertyListing";
import { mapApiToPropertyListing } from "../data/transform";
import FullPageSpinner from "@/components/FullPageSpinner";
import { samplePropertyListing } from "../data/sampleData";

const PropertyListingWrapper = () => {
   const navigate = useNavigate();
   const propertyId = localStorage.getItem('selectedPropertyId')
   const [options, setOptions] = useState<any>([]);

   const { getPropertyList, getPropertyListData, isGettingPropertyList } = usePropertyListingApi();

   useEffect(() => {
      if(propertyId) getPropertyList(propertyId);
   }, [propertyId])

   useEffect(() => {
      if(getPropertyListData) {
         console.log({getPropertyListData})
         const uiListing = mapApiToPropertyListing(getPropertyListData);
         setOptions(uiListing);
      } 
   }, [getPropertyListData])


   if(isGettingPropertyList) {
      return (
         <FullPageSpinner />
      )
   }

   const handlePropertyDetails = (sharing_type: number) => {
      navigate(`/property-details/${sharing_type}`)
   }

   return (
      <PropertyListingPage
         propertyListing={options}
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
