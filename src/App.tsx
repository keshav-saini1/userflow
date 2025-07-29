import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router";
import ProtectedRoute from './routes/ProtectedRoute';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import { PersonaSelectionPage } from './features/persona-selection';
import { PropertyListingPage, PropertyDetailsPage, samplePropertyDetailData } from './features/property-listing';
import { samplePropertyListing } from './features/property-listing/data/sampleData';
import { WebCheckinPage } from './features/webcheckin';

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
      onShareClick={() => console.log('Share clicked')}
      onSetupClick={() => console.log('Setup clicked')}
      onReserve={(propertyId) => console.log('Reserve clicked:', propertyId)}
      onBookVisit={(propertyId) => console.log('Book visit clicked:', propertyId)}
      onMapClick={() => console.log('Map clicked')}
      onPropertyClick={(propertyId) => navigate(`/property-details/${propertyId}`)}
    />
  );
};

// Property Details Wrapper to handle navigation
const PropertyDetailsWrapper = () => {
  const navigate = useNavigate();
  
  return (
    <PropertyDetailsPage 
      propertyData={samplePropertyDetailData}
      onBackClick={() => navigate(-1)}
      onShareClick={() => console.log('Share clicked')}
      onBookVisit={() => console.log('Book visit clicked')}
      onAskQuestion={() => console.log('Ask question clicked')}
    />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to the App</div>,
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
