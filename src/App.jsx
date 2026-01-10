import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import AthleteDashboard from './pages/AthleteDashboard';
import CoachDashboard from './pages/CoachDashboard';
import OrgDashboard from './pages/OrgDashboard';

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
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout theme={theme} toggleTheme={toggleTheme} />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/discover" element={<DiscoverPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Dashboard Routes (Protected in real app) */}
                <Route path="/dashboard" element={<DashboardLayout theme={theme} toggleTheme={toggleTheme} />}>
                    <Route index element={<Navigate to="/dashboard/athlete" replace />} />
                    <Route path="athlete" element={<AthleteDashboard />} />
                    <Route path="coach" element={<CoachDashboard />} />
                    <Route path="org" element={<OrgDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
