import { useNavigate } from "react-router";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import { samplePropertyDetailData } from "../index";

const PropertyDetailsWrapper = () => {
   const navigate = useNavigate();

   return (
      <PropertyDetailsPage
         propertyData={samplePropertyDetailData}
         onBookVisit={() => navigate("/book-visit")}
         onAskQuestion={() => console.log("Ask question clicked")}
      />
   );
};

export default PropertyDetailsWrapper;
