import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ProtectedRoute from './routes/ProtectedRoute';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import { PersonaSelectionPage } from './features/persona-selection';
import { PropertyListingPage } from './features/property-listing';
import { samplePropertyListing } from './features/property-listing/data/sampleData';

// Placeholder components - you'll need to create these
const Login = () => <div>Login Page</div>;
const Dashboard = () => <div>Dashboard Page</div>;
const AdminPanel = () => <div>Admin Panel</div>;

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
    element: (
      <PropertyListingPage 
        propertyListing={samplePropertyListing}
        onBackClick={() => window.history.back()}
        onShareClick={() => console.log('Share clicked')}
        onSetupClick={() => console.log('Setup clicked')}
        onReserve={(propertyId) => console.log('Reserve clicked:', propertyId)}
        onBookVisit={(propertyId) => console.log('Book visit clicked:', propertyId)}
        onMapClick={() => console.log('Map clicked')}
      />
    ),
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
