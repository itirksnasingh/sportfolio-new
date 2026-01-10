import React from 'react';

const EmptyState = ({ icon, title, description, actionText, onAction }) => {
  return (
    <div
      style={{
        padding: '2.5rem',
        textAlign: 'center',
        background: 'var(--card-bg)',
        borderRadius: 'var(--border-radius)',
        border: '1px dashed var(--border-color)',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {description}
      </p>
      {actionText && (
        <button className="btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;