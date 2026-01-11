
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ theme, toggleTheme }) => {
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/get-started';
    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    
    return (
        <header className="glass-header">
            <nav>
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                    Sport<span className="accent-dot">folio</span>
                </Link>
                <ul className="nav-links" style={isLoginPage ? { marginRight: '5rem' } : {}}>
                    <li style={isLoginPage ? {} : { marginLeft: '90px' }}>
                        <NavLink 
                            to="/"  
                            end
                            style={({ isActive }) => ({ 
                                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: isActive ? '600' : '500',
                                transition: 'all 0.2s'
                            })}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/discover" 
                            style={({ isActive }) => ({ 
                                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: isActive ? '600' : '500',
                                transition: 'all 0.2s'
                            })}
                        >
                            Discover
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/about" 
                            style={({ isActive }) => ({ 
                                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: isActive ? '600' : '500',
                                transition: 'all 0.2s'
                            })}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
                <div className="header-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? (
                            // Sun Icon for Dark Mode (to switch to light)
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        ) : (
                            // Moon Icon for Light Mode (to switch to dark)
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        )}
                    </button>
                    {!isLoginPage && (
                        currentUser ? (
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    {currentUser.email}
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="btn-primary"
                                    style={{ padding: '0.5rem 1rem' }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary">Login / Signup</Link>
                        )
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
