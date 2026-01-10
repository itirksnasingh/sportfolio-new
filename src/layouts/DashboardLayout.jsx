import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const DashboardLayout = ({ theme, toggleTheme }) => {
    return (
        <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside className="dashboard-sidebar" style={{
                width: '250px',
                padding: '2rem',
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--glass-bg)'
            }}>
                <div className="logo" style={{ marginBottom: '3rem' }}>
                    Sport<span className="accent-dot">folio</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <NavLink
                        to="/dashboard/athlete"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            padding: '0.5rem 0'
                        })}
                    >
                        Athlete Dashboard
                    </NavLink>
                    <NavLink
                        to="/dashboard/coach"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            padding: '0.5rem 0'
                        })}
                    >
                        Coach Dashboard
                    </NavLink>
                    <NavLink
                        to="/dashboard/org"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            padding: '0.5rem 0'
                        })}
                    >
                        Org Dashboard
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <button onClick={toggleTheme} className="theme-toggle" style={{ margin: '0 auto' }}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <div style={{ marginTop: '1rem' }}>
                        <NavLink to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                            ← Back to Home
                        </NavLink>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
