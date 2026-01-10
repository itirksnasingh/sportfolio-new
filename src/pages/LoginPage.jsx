import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [role, setRole] = useState('athlete');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate(`/dashboard/${role}`);
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>I am a...</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                            <button
                                type="button"
                                onClick={() => setRole('athlete')}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: role === 'athlete' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                    background: role === 'athlete' ? 'var(--accent-glow)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer'
                                }}
                            >
                                Athlete
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('coach')}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: role === 'coach' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                    background: role === 'coach' ? 'var(--accent-glow)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer'
                                }}
                            >
                                Coach
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('org')}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: role === 'org' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                    background: role === 'org' ? 'var(--accent-glow)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer'
                                }}
                            >
                                Org
                            </button>
                        </div>
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
