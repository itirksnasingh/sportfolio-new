import React from 'react';

const DiscoveryIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="discovery-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id="discovery-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
            </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="50" cy="50" r="45" fill="url(#discovery-glow)" />

        {/* Orbit Rings */}
        <circle cx="50" cy="50" r="20" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.2" />
        <circle cx="50" cy="50" r="35" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />

        {/* Central Core */}
        <circle cx="50" cy="50" r="8" fill="url(#discovery-grad)" />
        <circle cx="50" cy="50" r="14" stroke="var(--accent-primary)" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Connected Nodes (Outer Ring) */}
        {[0, 120, 240].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 35 * Math.cos(rad);
            const y = 50 + 35 * Math.sin(rad);
            return (
                <g key={i}>
                    <line x1="50" y1="50" x2={x} y2={y} stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.15" />
                    <circle cx={x} cy={y} r="3" fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="1.5" />
                </g>
            );
        })}

        {/* Floating Data Points (Inner Ring) */}
        {[60, 180, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 20 * Math.cos(rad);
            const y = 50 + 20 * Math.sin(rad);
            return (
                <circle key={`inner-${i}`} cx={x} cy={y} r="2" fill="var(--text-secondary)" opacity="0.6" />
            );
        })}
    </svg>
);

const ProfileIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="profile-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 0.8 }} />
            </linearGradient>
        </defs>

        {/* Card Backgrounds (Stacked) */}
        <rect x="25" y="25" width="50" height="60" rx="6" fill="var(--card-bg)" stroke="var(--border-color)" transform="rotate(-5 50 50)" />
        <rect x="25" y="25" width="50" height="60" rx="6" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.3" transform="rotate(5 50 50)" />

        {/* Main Card */}
        <rect x="25" y="20" width="50" height="65" rx="6" fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="1.5" />

        {/* Profile Avatar Area */}
        <circle cx="50" cy="40" r="10" fill="url(#profile-grad)" />
        <path d="M35 60 C35 55, 65 55, 65 60" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* Data Bars */}
        <rect x="35" y="65" width="30" height="4" rx="2" fill="var(--text-secondary)" opacity="0.3" />
        <rect x="35" y="73" width="20" height="4" rx="2" fill="var(--accent-primary)" opacity="0.6" />

        {/* Verification Tick */}
        <circle cx="70" cy="25" r="8" fill="var(--bg-primary)" stroke="var(--accent-secondary)" strokeWidth="1.5" />
        <path d="M66 25 L69 28 L74 22" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const VisibilityIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="vis-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0 }} />
            </linearGradient>
        </defs>

        {/* Eye Shape / Lens */}
        <path d="M20 50 Q50 20 80 50 Q50 80 20 50 Z" stroke="var(--text-secondary)" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
        <circle cx="50" cy="50" r="15" stroke="var(--accent-primary)" strokeWidth="2" />
        <circle cx="50" cy="50" r="6" fill="var(--accent-secondary)" />

        {/* Projection/Beam */}
        <path d="M50 50 L85 20 M50 50 L85 80" stroke="url(#vis-grad)" strokeWidth="2" />

        {/* Nodes being seen */}
        <circle cx="85" cy="20" r="4" fill="var(--text-primary)" opacity="0.8" />
        <circle cx="85" cy="80" r="4" fill="var(--text-primary)" opacity="0.8" />
        <circle cx="90" cy="50" r="3" fill="var(--text-secondary)" opacity="0.5" />

        {/* Merit Graph Overlay */}
        <polyline points="20,80 40,70 60,40 80,30" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
    </svg>
);

const Features = () => {
    return (
        <section id="features" className="features-grid">
            <div className="feature-card">
                <DiscoveryIcon />
                <h3>Centralized Discovery</h3>
                <p>One platform for government schemes, private scholarships, and selection trials.</p>
            </div>
            <div className="feature-card">
                <ProfileIcon />
                <h3>Structured Profiles</h3>
                <p>No social noise. Just verified stats, achievements, and readiness data.</p>
            </div>
            <div className="feature-card">
                <VisibilityIcon />
                <h3>Fair Visibility</h3>
                <p>Get recognized by coaches and organizations based on merit, not followers.</p>
            </div>
        </section>
    );
};

export default Features;
