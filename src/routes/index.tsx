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

export const router = createBrowserRouter([
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
      path: "/location-commute",
      element: <LocationCommutePage />
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
      path: "/joining-documents",
      element: <AddDocumentsPage />,
   },
   {
      path: "/date-test",
      element: <DateInputTest />,
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
