import { useNavigate, useParams } from "react-router";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import { useEffect, useState } from "react";
import { usePropertyListingApi } from "../api/usePropertyListing";
import { mapApiToPropertyDetail } from "../data/transform";

const PropertyDetailsWrapper = () => {
   const navigate = useNavigate();
   const params = useParams();
   const propertyId = localStorage.getItem('selectedPropertyId');
   const { getRentalOptionDetails } = usePropertyListingApi();
   const [details, setDetails] = useState<any>();

   useEffect(() => {
      (async() => {
         if(params && params['sharing_type'] && propertyId) {
            const {sharing_type} = params;
            const result: any = await getRentalOptionDetails({propertyId, optionType: sharing_type})
            const uiDetails = mapApiToPropertyDetail(result);
            setDetails(uiDetails)
         }
      })()
   }, [propertyId, params])


   return (
      <PropertyDetailsPage
         propertyData={details}
         onBookVisit={() => navigate("/book-visit")}
         onAskQuestion={() => console.log("Ask question clicked")}
      />
   );
};

export default PropertyDetailsWrapper;
