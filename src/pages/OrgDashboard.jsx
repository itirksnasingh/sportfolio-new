import React, { useState, useEffect } from 'react';

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

const OrgDashboard = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        // Profile fields will be added later
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [orgLogo, setOrgLogo] = useState(null);

    // Auto-open profile sidebar 1.5 seconds after login
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsProfileOpen(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOrgLogo(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = () => {
        console.log('Organization profile saved:', profileData);
        setIsProfileOpen(false);
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Organization Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage your opportunities and applicants</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => setIsProfileOpen(true)}>Update Profile</button>
                    <button className="btn-primary">+ Post Opportunity</button>
                </div>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard label="Active Listings" value="8" trend="2 new this week" />
                <StatCard label="Total Applications" value="156" />
                <StatCard label="Shortlisted" value="32" />
                <StatCard label="Response Rate" value="78%" trend="+12% this month" />
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Active Listings</h2>
                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View All</button>
                </div>

                <div className="feature-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>District Selection Trials</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>45 applications • Closes in 5 days</p>
                    </div>
                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Manage</button>
                </div>

                <div className="feature-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Summer Training Camp</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>28 applications • Closes in 12 days</p>
                    </div>
                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Manage</button>
                </div>

                <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--bg-secondary)' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No more listings. Click "+ Post Opportunity" to create a new listing.</p>
                </div>
            </section>

            {/* Profile Sidebar */}
            {isProfileOpen && (
                <>
                    {/* Overlay */}
                    <div 
                        onClick={() => setIsProfileOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999,
                            backdropFilter: 'blur(4px)'
                        }}
                    />
                    
                    {/* Sidebar */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        height: '100vh',
                        width: '450px',
                        maxWidth: '90vw',
                        backgroundColor: 'var(--card-bg)',
                        borderLeft: '1px solid var(--border-color)',
                        zIndex: 1000,
                        overflowY: 'auto',
                        padding: '2rem',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Update Profile</h2>
                            <button 
                                onClick={() => setIsProfileOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: '0.5rem'
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Organization Logo Upload */}
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '12px',
                                margin: '0 auto 1rem',
                                border: '3px solid var(--accent-primary)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'var(--bg-secondary)'
                            }}>
                                {orgLogo ? (
                                    <img src={orgLogo} alt="Organization Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '3rem', color: 'var(--text-secondary)' }}>🏛️</span>
                                )}
                            </div>
                            <label style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--accent-glow)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}>
                                Upload Logo
                                <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
                            </label>
                        </div>

                        {/* Placeholder Message */}
                        <div style={{
                            padding: '2rem',
                            textAlign: 'center',
                            border: '2px dashed var(--border-color)',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--bg-secondary)',
                            marginBottom: '2rem'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏛️</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Profile Fields Coming Soon</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Organization-specific profile fields will be added here.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <button 
                                onClick={handleSaveProfile}
                                className="btn-primary" 
                                style={{ flex: 1 }}
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={() => setIsProfileOpen(false)}
                                className="btn-secondary" 
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrgDashboard;
