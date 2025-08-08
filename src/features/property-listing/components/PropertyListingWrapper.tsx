import { useNavigate } from "react-router";
import { samplePropertyListing } from "../data/sampleData";
import { PropertyListingPage } from "../pages";

const PropertyListingWrapper = () => {
   const navigate = useNavigate();

   return (
      <PropertyListingPage
         propertyListing={samplePropertyListing}
         onBackClick={() => window.history.back()}
         onShareClick={() => console.log("Share clicked")}
         onReserve={() => navigate("/reservation")}
         onBookVisit={() => navigate("/book-visit")}
         onMapClick={() => console.log("Map clicked")}
         onPropertyClick={(propertyId: string) =>
            navigate(`/property-details/${propertyId}`)
         }
      />
   );
};

export default PropertyListingWrapper;
