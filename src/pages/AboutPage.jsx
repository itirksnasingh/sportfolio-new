import React from 'react';

const AboutPage = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10rem 2rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Built for Privacy. <br />Powered by Progress.</h1>

            <div style={{ marginBottom: '4rem' }}>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Sportfolio is not a social media platform. We don't sell your data, we don't have an ad feed, and we don't care about likes or followers.
                </p>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                    We exist to provide a structured, transparent ecosystem where athletes can get discovered based on merit, coaches can manage talent efficiently, and organizations can find the right candidates.
                </p>
            </div>

            <div className="features-grid" style={{ padding: '0' }}>
                <div className="feature-card">
                    <OneProfileIcon />
                    <h3>One Profile</h3>
                    <p>A single, verified digital identity for your entire sports career.</p>
                </div>
                <div className="feature-card">
                    <FairDiscoveryIcon />
                    <h3>Fair Discovery</h3>
                    <p>Opportunities are matched based on data and performance, not popularity.</p>
                </div>
                <div className="feature-card">
                    <AiGuidedIcon />
                    <h3>AI Guided</h3>
                    <p>Smart insights to help you identify gaps in your training and performance.</p>
                </div>
            </div>
        </div>
    );
};

const OneProfileIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="op-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 0.8 }} />
            </linearGradient>
        </defs>
        {/* Abstract "Cards" stacking to show multiple facets in one */}
        <rect x="20" y="25" width="40" height="50" rx="4" fill="var(--text-secondary)" opacity="0.2" transform="rotate(-10 40 50)" />
        <rect x="60" y="20" width="30" height="40" rx="4" fill="var(--text-secondary)" opacity="0.2" transform="rotate(15 75 40)" />

        {/* Main Center Profile Card */}
        <rect x="25" y="20" width="50" height="60" rx="6" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="1.5" />

        {/* Avatar/Face */}
        <circle cx="50" cy="40" r="10" fill="url(#op-grad)" />
        <path d="M40 60 C40 55, 60 55, 60 60" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" />

        {/* Sport Icons (Abstracted) */}
        <circle cx="70" cy="25" r="5" fill="var(--bg-primary)" stroke="var(--text-secondary)" strokeWidth="1" /> {/* Ball */}
        <path d="M70 25 L73 22" stroke="var(--text-secondary)" strokeWidth="1" />

        {/* Verified Badge */}
        <circle cx="65" cy="70" r="8" fill="var(--bg-primary)" stroke="var(--accent-secondary)" strokeWidth="1.5" />
        <path d="M62 70 L64 72 L68 67" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FairDiscoveryIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="fd-beam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
            </linearGradient>
        </defs>

        {/* Background Grid - "Data" */}
        <path d="M20 30 H80 M20 45 H80 M20 60 H80" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.1" strokeDasharray="4 4" />

        {/* Bar Chart Rising from Data */}
        <rect x="30" y="50" width="8" height="20" fill="var(--text-secondary)" opacity="0.3" />
        <rect x="42" y="40" width="8" height="30" fill="var(--text-secondary)" opacity="0.5" />
        <rect x="54" y="25" width="8" height="45" fill="var(--accent-primary)" opacity="0.9" /> {/* The Winner */}

        {/* Magnifying Glass / Spotlight Finding the Winner */}
        <circle cx="58" cy="40" r="14" stroke="var(--accent-secondary)" strokeWidth="2" fill="none" />
        <path d="M48 50 L35 70" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" /> {/* Handle */}

        {/* Shine on glass */}
        <path d="M50 35 Q53 30 60 32" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
    </svg>
);

const AiGuidedIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="ai-chip" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.1 }} />
            </linearGradient>
        </defs>

        {/* Graph Line - Up and Down */}
        <polyline points="20,70 40,60 50,75 70,40 90,30" fill="none" stroke="var(--text-secondary)" strokeWidth="2" opacity="0.5" strokeLinejoin="round" />

        {/* The "Gap" or Issue identified */}
        <circle cx="50" cy="75" r="4" fill="var(--accent-secondary)" />

        {/* AI Brain / Construct Overlaying */}
        <rect x="35" y="20" width="30" height="30" rx="4" fill="url(#ai-chip)" stroke="var(--accent-primary)" strokeWidth="1" />
        <path d="M40 30 H60 M40 38 H55 M40 46 H50" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.6" />

        {/* Connection from Brain to Gap */}
        <path d="M50 50 L50 75" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="4 2" />

        {/* Correction Path (AI Suggestion) */}
        <path d="M40 60 Q50 30 70 40" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
    </svg>
);

export default AboutPage;
