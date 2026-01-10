import React from 'react';

const OrgDashboard = () => {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Organization Dashboard</h1>
            <p>Manage your opportunities and applicants.</p>

            <button className="btn-primary" style={{ marginTop: '1rem' }}>+ Post New Opportunity</button>

            <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--card-bg)', borderRadius: 'var(--border-radius)' }}>
                <h3>Active Listings</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>No active listings found.</p>
            </div>
        </div>
    );
};

export default OrgDashboard;
