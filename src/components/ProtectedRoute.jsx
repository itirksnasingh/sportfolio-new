import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRole = null }) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: 'var(--text-primary)'
      }}>
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userProfile?.role !== allowedRole) {
    // User doesn't have the required role
    if (userProfile?.role) {
      // Redirect to their correct dashboard
      return <Navigate to={`/dashboard/${userProfile.role}`} replace />;
    } else {
      // No role assigned yet, redirect to role selection
      const userRole = localStorage.getItem('userRole');
      if (userRole) {
        // Has role in localStorage but not synced with backend yet
        return <Navigate to={`/dashboard/${userRole}`} replace />;
      }
      return <Navigate to="/get-started" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
