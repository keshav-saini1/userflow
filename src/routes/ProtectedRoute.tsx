import React from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
  redirectAuthenticated?: boolean;
  authenticatedRedirectPath?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Hook to get authentication state based on localStorage token
const useAuth = (): AuthState => {
  const [authState, setAuthState] = React.useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  console.log({authState});

  React.useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        
        if (token && username) {
          // Token exists, user is authenticated
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: {
              id: 'user-id', // You can generate or store this separately
              email: username, // Using username as email for now
              role: 'user', // Default role, you can store this separately
            },
          });
        } else {
          // No token found, user is not authenticated
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        // Handle any localStorage errors
        console.error('Error checking authentication:', error);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    // Check immediately without delay
    checkAuth();
  }, []);

  return authState;
};

// Component to redirect authenticated users away from certain pages (like onboarding)
const AuthenticatedRedirect: React.FC<{ redirectPath: string }> = ({ redirectPath }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return null; // Don't render anything if not authenticated
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = false,
  fallbackPath = '/',
  redirectAuthenticated = false,
  authenticatedRedirectPath = '/property-listing',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to={fallbackPath}
        state={{ from: location }}
        replace
      />
    );
  }

  // Check role-based access if required
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Required role: {requiredRole}
          </p>
        </div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
};

export { AuthenticatedRedirect };
export default ProtectedRoute;
