import React from 'react';

const StatCard = ({ label, value, trend }) => (
    <div style={{
        background: 'var(--card-bg)',
        padding: '1.5rem',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--border-color)'
    }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{label}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
        {trend && <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{trend}</div>}
    </div>
);

const AthleteDashboard = () => {
    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Hello, Rahul</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Badminton | Under-19 | Pune</p>
                </div>
                <button className="btn-primary">Update Profile</button>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard label="Profile Completion" value="85%" trend="+5% this week" />
                <StatCard label="Matches Played" value="12" />
                <StatCard label="Win Rate" value="68%" trend="Top 10% in region" />
                <StatCard label="Opportunities Applied" value="4" />
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recommended Opportunities</h2>
                    <div className="feature-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem' }}>District Level Selection Trials</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pune District Badminton Association</p>
                        </div>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View</button>
                    </div>
                    <div className="feature-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem' }}>Yonex Summer Camp Scholarship</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Yonex India</p>
                        </div>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View</button>
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>AI Insights</h2>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(255,77,0,0.1), rgba(255,0,85,0.1))',
                        padding: '1.5rem',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--accent-primary)'
                    }}>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Based on your recent match data, your <strong>backhand smash</strong> effectiveness has dropped by 12%. Consider focusing on strength training for your wrist this week.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AthleteDashboard;
