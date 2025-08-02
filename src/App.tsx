import {
   createBrowserRouter,
   RouterProvider,
   useNavigate,
   useLocation,
   Navigate,
} from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import OnboardingPage from "./features/onboarding/pages/OnboardingPage";
import { PersonaSelectionPage } from "./features/persona-selection";
import {
   PropertyListingPage,
   PropertyDetailsPage,
   samplePropertyDetailData,
} from "./features/property-listing";
import { samplePropertyListing } from "./features/property-listing/data/sampleData";
import { WebCheckinPage } from "./features/webcheckin";
import { BookVisitPage, BookVisitSuccessPage } from "./features/book-visit";
import { ReservationPage } from "./features/reservation";
import { ConfirmedBookingPage } from "./features/confirmed-booking";
import { sampleConfirmedBookingData } from "./features/confirmed-booking/data/sampleData";
import ModifyBookingPage from "./features/modify-booking/pages/ModifyBookingPage";
import ChangeRoomPage from "./features/modify-booking/pages/ChangeRoomPage";
import CancelBookingSuccessPage from "./features/modify-booking/pages/CancelBookingSuccessPage";
import CancelBookingExample from "./features/modify-booking/examples/CancelBookingExample";
import ChangeRoomExample from "./features/modify-booking/examples/ChangeRoomExample";
import ReservationIntegrationExample from "./features/modify-booking/examples/ReservationIntegrationExample";
import {
   WishlistPage,
   MyBookingsPage,
   ReviewBookingPage,
} from "./features/property-listing/pages";
import { FilterPropertiesPage, JoiningProfilePage, UpdateMoveInPage, UserProfilePage } from "./features";
import JoiningStatusPage from "./features/joining-form/pages/JoiningStatusPage";


// Placeholder components - you'll need to create these
const Login = () => <div>Login Page</div>;
const Dashboard = () => <div>Dashboard Page</div>;
const AdminPanel = () => <div>Admin Panel</div>;

// Property Listing Wrapper to handle navigation
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

// Property Details Wrapper to handle navigation
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

// Book Visit Wrapper to handle navigation to success page
const BookVisitWrapper = () => {
   const navigate = useNavigate();

   const handleSuccess = (bookingDetails: {
      property: string;
      visitType: string;
      date: string;
      time: string;
   }) => {
      // Navigate to success page with booking details as state
      navigate("/book-visit/success", {
         state: { bookingDetails },
      });
   };

   return <BookVisitPage onSuccess={handleSuccess} />;
};

// Book Visit Success Wrapper to handle navigation back
const BookVisitSuccessWrapper = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const bookingDetails = location.state?.bookingDetails;

   if (!bookingDetails) {
      // Redirect to book visit if no booking details
      return <Navigate to="/book-visit" replace />;
   }

   const handleDone = () => {
      // Navigate back to property listing or dashboard
      navigate("/property-listing");
   };

   return (
      <BookVisitSuccessPage
         bookingDetails={bookingDetails}
         onDone={handleDone}
      />
   );
};

// Confirmed Booking Wrapper to handle navigation and actions
const ConfirmedBookingWrapper = () => {
   const navigate = useNavigate();

   const handleBackClick = () => {
      navigate("/persona-selection");
   };

   const handleShareClick = () => {
      navigate("/profile");
   };

   const handleSendReminder = () => {
      console.log("Send reminder clicked");
   };

   const handlePayNow = () => {
      console.log("Pay now clicked");
      // Navigate to payment flow
      // navigate('/payment');
   };

   const handleViewAllPayments = () => {
      console.log("View all payments clicked");
      // Navigate to payments page
      // navigate('/payments');
   };

   const handleSupportAction = (action: "chat" | "call") => {
      console.log("Support action clicked:", action);
      // Handle support action (open chat or initiate call)
   };

   const handleExploreCommute = () => {
      console.log("Explore commute clicked");
      // Navigate to commute/map view
      // navigate('/commute');
   };

   const handleModifyBooking = () => {
      console.log("Modify booking clicked");
      // Navigate to booking modification flow
      navigate("/modify-booking");
   };

   const handleRequestRefund = () => {
      console.log("Request refund clicked");
      // Navigate to refund request flow
      // navigate('/request-refund');
   };

   return (
      <ConfirmedBookingPage
         data={sampleConfirmedBookingData}
         onBackClick={handleBackClick}
         onShareClick={handleShareClick}
         onSendReminder={handleSendReminder}
         onPayNow={handlePayNow}
         onViewAllPayments={handleViewAllPayments}
         onSupportAction={handleSupportAction}
         onExploreCommute={handleExploreCommute}
         onModifyBooking={handleModifyBooking}
         onRequestRefund={handleRequestRefund}
      />
   );
};

// Cancel Booking Success Wrapper to handle navigation
const CancelBookingSuccessWrapper = () => {
   const navigate = useNavigate();

   const handleDone = () => {
      // Navigate back to bookings or dashboard
      navigate("/bookings");
   };

   const handleViewBookings = () => {
      // Navigate to my bookings page
      navigate("/my-bookings");
   };

   return (
      <CancelBookingSuccessPage
         onDone={handleDone}
         onViewBookings={handleViewBookings}
      />
   );
};

const router = createBrowserRouter([
   {
      path: "/",
      element: <OnboardingPage />,
   },
   {
      path: "/onboarding",
      element: <OnboardingPage />,
   },
   {
      path: "/persona-selection",
      element: <PersonaSelectionPage />,
   },
   {
      path: "/property-listing",
      element: <PropertyListingWrapper />,
   },
   {
      path: "/property-details/:propertyId",
      element: <PropertyDetailsWrapper />,
   },
   {
      path: "/webcheckin",
      element: <WebCheckinPage />,
   },
   {
      path: "/book-visit",
      element: <BookVisitWrapper />,
   },
   {
      path: "/book-visit/success",
      element: <BookVisitSuccessWrapper />,
   },
   {
      path: "/reservation",
      element: <ReservationPage />,
   },
   {
      path: "/bookings",
      element: <ConfirmedBookingWrapper />,
   },
   {
      path: "/wishlist",
      element: <WishlistPage />,
   },
   {
      path: "/my-bookings",
      element: <MyBookingsPage />,
   },
   {
      path: "/review-booking/:bookingId",
      element: <ReviewBookingPage />,
   },
   {
      path: "/modify-booking",
      element: <ModifyBookingPage />,
   },
   {
      path: "/modify-booking/change-room",
      element: <ChangeRoomPage />,
   },
   {
      path: "/modify-booking/update-movein",
      element: <UpdateMoveInPage />,
   },
   {
      path: "/modify-booking/cancel-example",
      element: <CancelBookingExample />,
   },
   {
      path: "/modify-booking/change-room-example",
      element: <ChangeRoomExample />,
   },
   {
      path: "/modify-booking/reservation-integration-example",
      element: <ReservationIntegrationExample />,
   },
   {
      path: "/modify-booking/cancel-success",
      element: <CancelBookingSuccessWrapper />,
   },
   {
      path: "/property-filter",
      element: <FilterPropertiesPage />,
   },
   {
      path: "/profile",
      element: <UserProfilePage />,
   },
   {
      path: "/joining-profile",
      element: <JoiningProfilePage />,
   },
   {
      path: "/joining-status",
      element: <JoiningStatusPage />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/dashboard",
      element: (
         <ProtectedRoute>
            <Dashboard />
         </ProtectedRoute>
      ),
   },
   {
      path: "/admin",
      element: (
         <ProtectedRoute requiredRole="admin">
            <AdminPanel />
         </ProtectedRoute>
      ),
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
