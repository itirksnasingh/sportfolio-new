import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("athlete");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${role}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(circle at top center, rgba(255,77,0,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(255,0,85,0.10), transparent 60%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          background: "var(--card-bg)",
          borderRadius: "var(--border-radius)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ marginBottom: "0.5rem" }}>Welcome to Sportfolio</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Role selector */}
          <div style={{ marginBottom: "2.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
              }}
            >
              Continue as
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              {[
                { key: "athlete", label: "Athlete" },
                { key: "coach", label: "Coach" },
                { key: "org", label: "Organization" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setRole(item.key)}
                  style={{
                    padding: "0.55rem",
                    borderRadius: "8px",
                    border:
                      role === item.key
                        ? "1px solid var(--accent-primary)"
                        : "1px solid var(--border-color)",
                    background:
                      role === item.key
                        ? "var(--accent-glow)"
                        : "transparent",
                    color: "var(--text-primary)",
                    fontWeight: "500",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.85rem",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.85rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role');
    const [role, setRole] = useState(roleParam || 'athlete');
    const navigate = useNavigate();
    const { login, loginWithGoogle, signup, currentUser, updateUserRole, error: authError } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        if (roleParam) {
            setRole(roleParam);
        }
        // Scroll to top when page loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // If already logged in, redirect to role selection or dashboard
        if (currentUser) {
            const userRole = localStorage.getItem('userRole');
            if (userRole) {
                navigate(`/dashboard/${userRole}`);
            } else {
                navigate('/get-started');
            }
        }
    }, [roleParam, currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            if (isSignup) {
                // Sign up new user
                await signup(email, password, displayName);
            } else {
                // Login existing user
                await login(email, password);
            }
            
            // After successful authentication, update role in backend if role was selected
            if (role) {
                try {
                    await updateUserRole(role);
                } catch (roleErr) {
                    console.error('Error updating role:', roleErr);
                    // Continue even if role update fails
                }
            }
            
            // Navigate to appropriate page
            if (role) {
                navigate(`/dashboard/${role}`);
            } else {
                navigate('/get-started');
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        
        try {
            await loginWithGoogle();
            
            // After successful Google login, update role in backend if role was selected
            if (role) {
                try {
                    await updateUserRole(role);
                } catch (roleErr) {
                    console.error('Error updating role:', roleErr);
                    // Continue even if role update fails
                }
            }
            
            // Navigate to appropriate page
            if (role) {
                navigate(`/dashboard/${role}`);
            } else {
                navigate('/get-started');
            }
        } catch (err) {
            console.error('Google login error:', err);
            setError(err.message || 'Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '110vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                background: 'var(--card-bg)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                
                {error && (
                    <div style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>I am a...</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                            <button
                                type="button"
                                onClick={() => !roleParam && setRole('athlete')}
                                disabled={roleParam}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: role === 'athlete' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                    background: role === 'athlete' ? 'var(--accent-glow)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    cursor: roleParam ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    opacity: roleParam && role !== 'athlete' ? 0.5 : 1
                                }}
                            >
                                Athlete {roleParam === 'athlete' && '🔒'}
                            </button>
                            <button
                                type="button"
                                onClick={() => !roleParam && setRole('coach')}
                                disabled={roleParam}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: role === 'coach' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                    background: role === 'coach' ? 'var(--accent-glow)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    cursor: roleParam ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    opacity: roleParam && role !== 'coach' ? 0.5 : 1
                                }}
                            >
                                Coach {roleParam === 'coach' && '🔒'}
                            </button>
                            <button
                                type="button"
                                onClick={() => !roleParam && setRole('org')}
                                disabled={roleParam}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: role === 'org' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                    background: role === 'org' ? 'var(--accent-glow)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    cursor: roleParam ? 'not-allowed' : 'pointer',
                                    opacity: roleParam && role !== 'org' ? 0.5 : 1
                                }}
                            >
                                Organization {roleParam === 'org' && '🔒'}
                            </button>
                        </div>
                        {roleParam && (
                            <p style={{ 
                                marginTop: '0.75rem', 
                                fontSize: '0.85rem', 
                                color: 'var(--accent-primary)',
                                textAlign: 'center'
                            }}>
                                ✓ Role selected and locked
                            </p>
                        )}
                    </div>

                    {isSignup && (
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Your name"
                                required={isSignup}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
                    )}
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength="6"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-primary" 
                        style={{ width: '100%', marginBottom: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            borderRadius: '6px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"/>
                            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"/>
                            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"/>
                            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"/>
                        </svg>
                        Continue with Google
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--accent-primary)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                textDecoration: 'underline'
                            }}
                        >
                            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
