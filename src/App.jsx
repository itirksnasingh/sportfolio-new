import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import AthleteDashboard from './pages/AthleteDashboard';
import CoachDashboard from './pages/CoachDashboard';
import OrgDashboard from './pages/OrgDashboard';

// Protected Route Component
const ProtectedDashboard = ({ allowedRole, children }) => {
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole) {
        // No user logged in, redirect to login
        return <Navigate to="/login" replace />;
    }
    
    if (userRole !== allowedRole) {
        // User role doesn't match, redirect to their correct dashboard
        return <Navigate to={`/dashboard/${userRole}`} replace />;
    }
    
    return children;
};

// Dashboard Index Redirect
const DashboardRedirect = () => {
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole) {
        return <Navigate to="/login" replace />;
    }
    
    return <Navigate to={`/dashboard/${userRole}`} replace />;
};

function App() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check local storage or preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout theme={theme} toggleTheme={toggleTheme} />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/discover" element={<DiscoverPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>

                    {/* Role Selection Page (Public - No Auth Required) */}
                    <Route path="/get-started" element={<RoleSelectionPage />} />

                    {/* Dashboard Routes (Protected) */}
                    <Route path="/dashboard" element={<DashboardLayout theme={theme} toggleTheme={toggleTheme} />}>
                        <Route index element={<DashboardRedirect />} />
                        <Route 
                            path="athlete" 
                            element={
                                <ProtectedRoute allowedRole="athlete">
                                    <AthleteDashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="coach" 
                            element={
                                <ProtectedRoute allowedRole="coach">
                                    <CoachDashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="org" 
                            element={
                                <ProtectedRoute allowedRole="org">
                                    <OrgDashboard />
                                </ProtectedRoute>
                            } 
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
