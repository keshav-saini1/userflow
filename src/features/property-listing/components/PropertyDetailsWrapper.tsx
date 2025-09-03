import { useNavigate, useParams } from "react-router";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import { useEffect } from "react";
import { usePropertyListingApi } from "../api/usePropertyListing";
import { mapApiToPropertyDetail } from "../data/transform";
import { 
   usePropertyStore, 
   usePropertyDetails, 
   usePropertyDetailsLoading, 
   useSelectedPropertyId,
   useSelectedSharingType 
} from "../store/propertyStore";
import FullPageSpinner from "@/components/FullPageSpinner";

const PropertyDetailsWrapper = () => {
   const navigate = useNavigate();
   const params = useParams();
   const propertyDetails = usePropertyDetails();
   const isLoadingPropertyDetails = usePropertyDetailsLoading();
   const selectedPropertyId = useSelectedPropertyId();
   const selectedSharingType = useSelectedSharingType();
   
   const {
      setPropertyDetails,
      setPropertyDetailsLoading,
      setPropertyDetailsError,
      setSelectedPropertyId,
      setSelectedSharingType
   } = usePropertyStore();

   const { getRentalOptionDetails } = usePropertyListingApi();

   // Initialize from localStorage and URL params
   useEffect(() => {
      const storedPropertyId = localStorage.getItem('selectedPropertyId');
      const urlSharingType = params?.sharing_type;
      
      if (storedPropertyId && !selectedPropertyId) {
         setSelectedPropertyId(storedPropertyId);
      }
      
      if (urlSharingType && urlSharingType !== selectedSharingType) {
         setSelectedSharingType(urlSharingType);
      }
   }, [params, selectedPropertyId, selectedSharingType, setSelectedPropertyId, setSelectedSharingType]);

   // Fetch property details when dependencies change
   useEffect(() => {
      const fetchPropertyDetails = async () => {
         const propertyId = selectedPropertyId || localStorage.getItem('selectedPropertyId');
         const sharingType = selectedSharingType || params?.sharing_type;
         
         if (propertyId && sharingType) {
            try {
               setPropertyDetailsLoading(true);
               setPropertyDetailsError(null);
               
               const result: any = await getRentalOptionDetails({
                  propertyId, 
                  optionType: sharingType
               });
               
               const uiDetails = mapApiToPropertyDetail(result);
               setPropertyDetails(uiDetails);
            } catch (error) {
               console.error('Error fetching property details:', error);
               setPropertyDetailsError('Failed to load property details');
            } finally {
               setPropertyDetailsLoading(false);
            }
         }
      };

      fetchPropertyDetails();
   }, [
      selectedPropertyId, 
      selectedSharingType, 
      params?.sharing_type,
      getRentalOptionDetails,
      setPropertyDetails,
      setPropertyDetailsLoading,
      setPropertyDetailsError
   ])


   if (isLoadingPropertyDetails) {
      return <FullPageSpinner />;
   }

   if (!propertyDetails) {
      return <FullPageSpinner />;
   }

   return (
      <PropertyDetailsPage
         propertyData={propertyDetails}
         onBookVisit={() => navigate("/book-visit")}
         onAskQuestion={() => console.log("Ask question clicked")}
      />
   );
};

export default PropertyDetailsWrapper;
