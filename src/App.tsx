import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router";
import ProtectedRoute from './routes/ProtectedRoute';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import { PersonaSelectionPage } from './features/persona-selection';
import { PropertyListingPage, PropertyDetailsPage, samplePropertyDetailData } from './features/property-listing';
import { samplePropertyListing } from './features/property-listing/data/sampleData';
import { WebCheckinPage } from './features/webcheckin';
import { BookVisitPage, BookVisitSuccessPage } from './features/book-visit';

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
      onBookVisit={() => navigate('/book-visit')}
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
      onBookVisit={() => navigate('/book-visit')}
      onAskQuestion={() => console.log('Ask question clicked')}
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
    navigate('/book-visit/success', { 
      state: { bookingDetails } 
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
    navigate('/property-listing');
  };

  return (
    <BookVisitSuccessPage 
      bookingDetails={bookingDetails}
      onDone={handleDone}
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
    path: "/book-visit",
    element: <BookVisitWrapper />,
  },
  {
    path: "/book-visit/success",
    element: <BookVisitSuccessWrapper />,
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
