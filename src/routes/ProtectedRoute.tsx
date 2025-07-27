import React from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
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

// Hook to get authentication state - you'll need to implement this based on your auth system
const useAuth = (): AuthState => {
  // TODO: Replace with your actual authentication logic
  // This could come from Context, Redux, Zustand, or other state management
  
  // Example implementation:
  const [authState, setAuthState] = React.useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  React.useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        // Replace with your actual auth check logic
        // const token = localStorage.getItem('authToken');
        // const response = await validateToken(token);
        
        // For now, simulate loading
        setTimeout(() => {
          setAuthState({
            isAuthenticated: false, // Set to true when user is authenticated
            isLoading: false,
            // user: response.user // Set user data when authenticated
          });
        }, 1000);
      } catch {
        // Handle authentication errors
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallbackPath = '/login',
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

export default ProtectedRoute;
