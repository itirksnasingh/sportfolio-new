import React from 'react';

const CoachDashboard = () => {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Coach Dashboard</h1>
            <p>Welcome back, Coach.</p>

            <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--card-bg)', borderRadius: 'var(--border-radius)' }}>
                <h3>My Squad</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>List of athletes under your training will appear here.</p>
            </div>
        </div>
    );
};

export default CoachDashboard;
