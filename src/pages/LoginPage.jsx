import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role');
    const [role, setRole] = useState(roleParam || 'athlete');
    const navigate = useNavigate();

    useEffect(() => {
        if (roleParam) {
            setRole(roleParam);
        }
    }, [roleParam]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Store user role in localStorage
        localStorage.setItem('userRole', role);
        navigate(`/dashboard/${role}`);
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
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome to Sportfolio</h2>

                <form onSubmit={handleLogin}>
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

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
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

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
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

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
