import {
   createBrowserRouter,
} from "react-router";
import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import { PersonaSelectionPage } from "../features/persona-selection";
import {
   PropertyListingWrapper,
   PropertyDetailsWrapper,
} from "../features/property-listing";
import { WebCheckinPage } from "../features/webcheckin";
import { BookVisitWrapper, BookVisitSuccessWrapper } from "../features/book-visit";
import { ReservationPage } from "../features/reservation";
import { ConfirmedBookingWrapper } from "../features/confirmed-booking";
import ModifyBookingPage from "../features/modify-booking/pages/ModifyBookingPage";
import ChangeRoomPage from "../features/modify-booking/pages/ChangeRoomPage";
import CancelBookingExample from "../features/modify-booking/examples/CancelBookingExample";
import ChangeRoomExample from "../features/modify-booking/examples/ChangeRoomExample";
import ReservationIntegrationExample from "../features/modify-booking/examples/ReservationIntegrationExample";
import { CancelBookingSuccessWrapper } from "../features/modify-booking";
import {
   WishlistPage,
   MyBookingsPage,
   ReviewBookingPage,
} from "../features/property-listing/pages";
import {
   AddDocumentsPage,
   JoiningProfilePage,
   UpdateMoveInPage,
   UserProfilePage,
} from "../features";
import JoiningStatusPage from "../features/joining-form/pages/JoiningStatusPage";
import { FilterPropertiesPage } from "../features/property-filter";
import DateInputTest from "../components/DynamicForm/fields/DateInputTest";
import LocationCommutePage from "@/features/property-listing/pages/LocationCommutePage";
import ProtectedRoute, { AuthenticatedRedirect } from "./ProtectedRoute";

export const router = createBrowserRouter([
   {
      path: "/",
      element: (
         <>
            <AuthenticatedRedirect redirectPath="/property-listing" />
            <OnboardingPage />
         </>
      ),
   },
   {
      path: "/onboarding",
      element: <OnboardingPage />,
   },
   {
      path: "/persona-selection",
      element: (
         <ProtectedRoute>
            <PersonaSelectionPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/property-listing",
      element: (
         <ProtectedRoute>
            <PropertyListingWrapper />
         </ProtectedRoute>
      ),
   },
   {
      path: "/property-details/:sharing_type",
      element: (
         <ProtectedRoute>
            <PropertyDetailsWrapper />
         </ProtectedRoute>
      ),
   },
   {
      path: "/location-commute",
      element: (
         <ProtectedRoute>
            <LocationCommutePage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/webcheckin",
      element: (
         <ProtectedRoute>
            <WebCheckinPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/book-visit",
      element: (
         <ProtectedRoute>
            <BookVisitWrapper />
         </ProtectedRoute>
      ),
   },
   {
      path: "/book-visit/success",
      element: (
         <ProtectedRoute>
            <BookVisitSuccessWrapper />
         </ProtectedRoute>
      ),
   },
   {
      path: "/reservation",
      element: (
         <ProtectedRoute>
            <ReservationPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/bookings",
      element: (
         <ProtectedRoute>
            <ConfirmedBookingWrapper />
         </ProtectedRoute>
      ),
   },
   {
      path: "/wishlist",
      element: (
         <ProtectedRoute>
            <WishlistPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/my-bookings",
      element: (
         <ProtectedRoute>
            <MyBookingsPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/review-booking/:bookingId",
      element: (
         <ProtectedRoute>
            <ReviewBookingPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking",
      element: (
         <ProtectedRoute>
            <ModifyBookingPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking/change-room",
      element: (
         <ProtectedRoute>
            <ChangeRoomPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking/update-movein",
      element: (
         <ProtectedRoute>
            <UpdateMoveInPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking/cancel-example",
      element: (
         <ProtectedRoute>
            <CancelBookingExample />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking/change-room-example",
      element: (
         <ProtectedRoute>
            <ChangeRoomExample />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking/reservation-integration-example",
      element: (
         <ProtectedRoute>
            <ReservationIntegrationExample />
         </ProtectedRoute>
      ),
   },
   {
      path: "/modify-booking/cancel-success",
      element: (
         <ProtectedRoute>
            <CancelBookingSuccessWrapper />
         </ProtectedRoute>
      ),
   },
   {
      path: "/property-filter",
      element: (
         <ProtectedRoute>
            <FilterPropertiesPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/profile",
      element: (
         <ProtectedRoute>
            <UserProfilePage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/joining-profile",
      element: (
         <ProtectedRoute>
            <JoiningProfilePage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/joining-status",
      element: (
         <ProtectedRoute>
            <JoiningStatusPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/joining-documents",
      element: (
         <ProtectedRoute>
            <AddDocumentsPage />
         </ProtectedRoute>
      ),
   },
   {
      path: "/date-test",
      element: (
         <ProtectedRoute>
            <DateInputTest />
         </ProtectedRoute>
      ),
   },
   // {
   //    path: "/admin",
   //    element: (
   //       <ProtectedRoute requiredRole="admin">
   //          <AdminPanel />
   //       </ProtectedRoute>
   //    ),
   // },
]);
