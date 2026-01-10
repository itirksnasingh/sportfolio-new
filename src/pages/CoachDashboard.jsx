import React from 'react';
import EmptyState from '../components/EmptyState';

const CoachDashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>Coach Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Manage athletes and training plans
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>My Athletes</h2>

        <EmptyState
          icon="👥"
          title="No athletes connected"
          description="Invite athletes to track performance and progress."
          actionText="Invite Athlete"
        />
      </section>

      <section>
        <h2 style={{ marginBottom: '1rem' }}>AI Coaching Suggestions</h2>

        <div
          style={{
            padding: '1.5rem',
            background: 'var(--card-bg)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--border-color)',
          }}
        >
          <p>
            🧠 Coaches training U-19 badminton athletes often see better results
            by focusing on agility & endurance in pre-season.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CoachDashboard;
