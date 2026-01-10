import React from 'react';

const AboutPage = () => {
    return (
        <div style={{maxWidth: "1200px",
            margin: "0 auto",
            padding: "10rem 2rem",
            background:
              "radial-gradient(circle at top center, rgba(255,77,0,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(255,0,85,0.10), transparent 60%)",
           }}>
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
        <rect x="25" y="20" width="50" height="60" rx="8" stroke="var(--text-secondary)" strokeWidth="1.5" fill="var(--card-bg)" />
        <circle cx="50" cy="45" r="12" fill="url(#op-grad)" />
        <rect x="35" y="65" width="30" height="4" rx="2" fill="var(--text-secondary)" opacity="0.4" />
        <rect x="40" y="72" width="20" height="4" rx="2" fill="var(--text-secondary)" opacity="0.3" />
        <circle cx="75" cy="20" r="10" fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="2" />
        <path d="M71 20 L74 23 L79 17" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FairDiscoveryIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="fd-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.8 }} />
            </linearGradient>
        </defs>
        <line x1="10" y1="80" x2="90" y2="80" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.3" />

        {/* Equalizer Bars - Merit Rising */}
        <rect x="25" y="50" width="10" height="30" rx="2" fill="var(--text-secondary)" opacity="0.3" />
        <rect x="45" y="30" width="10" height="50" rx="2" fill="url(#fd-grad)" />
        <rect x="65" y="45" width="10" height="35" rx="2" fill="var(--text-secondary)" opacity="0.3" />

        {/* Highlight/Search */}
        <circle cx="50" cy="30" r="18" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
    </svg>
);

const AiGuidedIcon = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <defs>
            <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.8 }} />
            </linearGradient>
        </defs>

        {/* Network Nodes */}
        <circle cx="50" cy="50" r="8" fill="url(#ai-grad)" />
        <circle cx="50" cy="50" r="15" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.3" />

        <circle cx="25" cy="30" r="4" fill="var(--text-secondary)" opacity="0.6" />
        <circle cx="25" cy="70" r="4" fill="var(--text-secondary)" opacity="0.6" />
        <circle cx="80" cy="40" r="4" fill="var(--text-secondary)" opacity="0.6" />
        <circle cx="75" cy="80" r="4" fill="var(--text-secondary)" opacity="0.6" />

        {/* Connections */}
        <line x1="25" y1="30" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.2" />
        <line x1="25" y1="70" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.2" />
        <line x1="80" y1="40" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.2" />
        <line x1="75" y1="80" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.2" />

        {/* Spark/Insight */}
        <path d="M50 35 L53 45 L60 45 L54 52 L56 60 L50 55 L44 60 L46 52 L40 45 L47 45 Z" fill="white" opacity="0.9" transform="scale(0.5) translate(50,50)" />
    </svg>
);

export default AboutPage;

