import React from 'react';
import EmptyState from '../components/EmptyState';

const StatCard = ({ label, value, note }) => (
  <div
    style={{
      background: 'var(--card-bg)',
      padding: '1.5rem',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border-color)',
    }}
  >
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
      {label}
    </div>
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
    {note && (
      <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
        {note}
      </div>
    )}
  </div>
);

const AthleteDashboard = () => {
  return (
    <div>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <h1>Rahul Sharma</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Badminton • Under-19 • Pune
          </p>
        </div>
        <button className="btn-primary">Edit Profile</button>
      </header>

      {/* Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <StatCard label="Profile Completion" value="85%" note="+5% this week" />
        <StatCard label="Matches Played" value="12" />
        <StatCard label="Win Rate" value="68%" note="Top 10% locally" />
        <StatCard label="Applications" value="4" />
      </section>

      {/* Opportunities */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Recommended Opportunities</h2>

        <EmptyState
          icon="🎯"
          title="No personalized opportunities yet"
          description="Complete your profile to unlock trials, scholarships and tournaments."
          actionText="Explore Opportunities"
        />
      </section>

      {/* AI Insights */}
      <section>
        <h2 style={{ marginBottom: '1rem' }}>AI Performance Insight</h2>

        <div
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            background:
              'linear-gradient(135deg, rgba(255,77,0,0.15), rgba(255,0,85,0.15))',
            border: '1px solid var(--accent-primary)',
          }}
        >
          <p style={{ fontSize: '0.95rem' }}>
            🧠 <strong>Sample Insight:</strong> Athletes in your category
            improve faster by competing in district-level events.
          </p>
          <small style={{ color: 'var(--text-secondary)' }}>
            AI insights activate once performance data is added.
          </small>
        </div>
      </section>
    </div>
  );
};

export default AthleteDashboard;