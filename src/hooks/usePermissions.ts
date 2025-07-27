import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Hook to get authentication state - should be shared across components
const useAuth = (): AuthState => {
  // TODO: This should be the same implementation as in ProtectedRoute
  // Consider creating a shared auth context or store
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate the same auth check as ProtectedRoute
    const checkAuth = async () => {
      try {
        setTimeout(() => {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
          });
        }, 1000);
      } catch {
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

// Hook for checking permissions in components
export const usePermissions = () => {
  const { user } = useAuth();

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => user?.role === role);
  };

  return {
    user,
    hasRole,
    hasAnyRole,
  };
}; 