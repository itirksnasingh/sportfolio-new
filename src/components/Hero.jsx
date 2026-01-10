import { Link } from 'react-router-dom';

const BatsmanIcon = () => (
    <div className="hero-graphic left" style={{ position: 'absolute', left: '0', top: '55%', transform: 'translateY(-50%)', opacity: 0.6, zIndex: 1, pointerEvents: 'none' }}>
        <svg width="400" height="500" viewBox="0 0 300 400" fill="none" style={{ filter: 'drop-shadow(0 0 15px var(--accent-glow))' }}>
            <defs>
                <linearGradient id="bat-body" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'var(--text-secondary)', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--text-secondary)', stopOpacity: 0.1 }} />
                </linearGradient>
                <linearGradient id="bat-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 0.3 }} />
                </linearGradient>
            </defs>

            {/* Helmet & Head */}
            <path d="M120 60 C120 45, 145 45, 145 60 V75 H120 V60 Z" fill="var(--text-secondary)" opacity="0.9" /> {/* Helmet Shell */}
            <path d="M145 65 L155 75 L145 85" stroke="var(--text-secondary)" strokeWidth="2" fill="none" /> {/* Grill hint */}

            {/* Body / Jersey */}
            <path d="M110 80 L160 85 L170 140 L100 135 Z" fill="url(#bat-body)" />

            {/* Pads (Legs) */}
            <path d="M105 140 L125 145 L115 230 L90 225 Z" fill="var(--text-secondary)" opacity="0.7" /> {/* Front Pad */}
            <rect x="90" y="160" width="35" height="5" rx="2" fill="var(--accent-primary)" opacity="0.5" transform="rotate(5 90 160)" /> {/* Strap */}
            <rect x="95" y="190" width="30" height="5" rx="2" fill="var(--accent-primary)" opacity="0.5" transform="rotate(5 95 190)" /> {/* Strap */}

            <path d="M135 145 L155 150 L165 240 L140 235 Z" fill="var(--text-secondary)" opacity="0.5" /> {/* Back Leg */}

            {/* Gloves & Arms */}
            <circle cx="150" cy="110" r="12" fill="white" opacity="0.9" /> {/* Glove Top */}
            <circle cx="145" cy="125" r="12" fill="white" opacity="0.9" /> {/* Glove Bottom */}
            <path d="M150 85 Q170 90 150 110" stroke="var(--text-secondary)" strokeWidth="12" strokeLinecap="round" opacity="0.8" /> {/* Arm */}

            {/* Bat Drive */}
            <path d="M140 120 L130 110 L220 200 L235 210 L150 130" fill="url(#bat-accent)" />

            {/* Motion Lines */}
            <path d="M50 250 Q150 350 280 220" stroke="var(--accent-primary)" strokeWidth="3" strokeDasharray="15 5" opacity="0.6" fill="none" />

            {/* Ball */}
            <circle cx="260" cy="230" r="8" fill="white" />
        </svg>
    </div>
);

const FootballerIcon = () => (
    <div className="hero-graphic right" style={{ position: 'absolute', right: '0', top: '55%', transform: 'translateY(-50%)', opacity: 0.6, zIndex: 1, pointerEvents: 'none' }}>
        <svg width="400" height="500" viewBox="0 0 300 400" fill="none" style={{ filter: 'drop-shadow(0 0 15px var(--accent-glow))' }}>
            <defs>
                <linearGradient id="foot-jersey" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--text-secondary)', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--text-secondary)', stopOpacity: 0.1 }} />
                </linearGradient>
            </defs>

            {/* Head */}
            <circle cx="140" cy="70" r="18" fill="var(--text-secondary)" opacity="0.8" />

            {/* Jersey / Torso (Leaning back for volley) */}
            <path d="M120 90 L160 90 L150 150 L110 140 Z" fill="url(#foot-jersey)" />
            <path d="M120 95 L110 90 L90 120 L105 125 Z" fill="var(--text-secondary)" opacity="0.6" /> {/* Arm Left */}
            <path d="M160 95 L175 90 L190 120 L175 125 Z" fill="var(--text-secondary)" opacity="0.6" /> {/* Arm Right */}

            {/* Shorts */}
            <path d="M110 140 L150 150 L145 180 L105 170 Z" fill="var(--text-secondary)" opacity="0.8" />

            {/* Shield Leg (Plant) */}
            <path d="M115 175 L135 180 L130 250 L110 245 Z" fill="var(--text-secondary)" opacity="0.6" />
            <path d="M110 245 L135 250 L140 265 L105 260 Z" fill="var(--text-secondary)" opacity="0.9" /> {/* Boot */}

            {/* Kicking Leg (High Volley) */}
            <path d="M140 160 L180 150 L200 120 L160 130 Z" fill="var(--text-secondary)" opacity="0.8" /> {/* Thigh */}
            <path d="M200 120 L190 110 L230 80 L240 95 Z" fill="var(--text-secondary)" opacity="0.8" />  {/* Shin */}
            <path d="M230 80 L240 95 L260 75 L250 65 Z" fill="var(--accent-primary)" opacity="0.9" /> {/* Boot Striking */}

            {/* Ball */}
            <circle cx="270" cy="50" r="15" fill="white" opacity="0.9" />
            <circle cx="270" cy="50" r="15" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="5 3" />

            {/* Motion Lines */}
            <path d="M180 180 Q220 120 290 30" stroke="var(--accent-secondary)" strokeWidth="4" opacity="0.5" />
        </svg>
    </div>
);

const Hero = () => {
    return (
        <section className="hero" style={{ overflow: 'hidden' }}> {/* Prevent scrollbars from graphics */}
            <BatsmanIcon />
            <FootballerIcon />
            <div className="hero-content">
                <h1>One Nation. <br /><span className="text-gradient">One Athlete Platform.</span></h1>
                <p className="hero-sub">The central ecosystem for opportunity discovery, athlete development, and fair visibility in Indian sports.</p>
                <div className="cta-group">
                    <Link to="/login" className="btn-primary big">Get Started</Link>
                    <Link to="/about" className="btn-secondary big">How It Works</Link>
                </div>
            </div>
            <div className="hero-background-glow"></div>
        </section>
    );
};

export default Hero;
