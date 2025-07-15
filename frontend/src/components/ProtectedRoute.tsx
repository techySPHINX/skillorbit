import React from 'react';
import { Navigate } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Check if user has any of the allowed roles
    const hasRequiredRole = allowedRoles.some(role => user.roles?.includes(role));
    if (!hasRequiredRole) {
      // User does not have the required role, redirect to 404 or unauthorized page
      return <Navigate to="/404" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
