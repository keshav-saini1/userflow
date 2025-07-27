import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ProtectedRoute from './routes/ProtectedRoute';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import { PersonaSelectionPage } from './features/persona-selection';

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
