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

const AthleteDashboard = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: 'Rahul Kumar',
        email: 'rahul@example.com',
        phone: '',
        dateOfBirth: '',
        gender: '',
        sport: 'Badminton',
        category: 'Under-19',
        location: 'Pune',
        aadharNumber: '',
        achievements: '',
        bio: ''
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [aadharCard, setAadharCard] = useState(null);

    // Auto-open profile sidebar 1.5 seconds after login
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsProfileOpen(true);
        }, 1500);

        // Cleanup timer on unmount
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleAadharUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAadharCard(file.name);
        }
    };

    const handleSaveProfile = () => {
        // Save profile logic here
        console.log('Profile saved:', profileData);
        setIsProfileOpen(false);
    };
    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Hello, {profileData.fullName}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Badminton | Under-19 | Pune</p>
                </div>
                <button className="btn-primary" onClick={() => setIsProfileOpen(true)}>Update Profile</button>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard label="Profile Completion" value="85%" trend="+5% this week" />
                <StatCard label="Matches Played" value="12" />
                <StatCard label="Win Rate" value="68%" trend="Top 10% in region" />
                <StatCard label="Opportunities Applied" value="4" />
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recommended Opportunities</h2>
                    <div className="feature-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem' }}>District Level Selection Trials</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pune District Badminton Association</p>
                        </div>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View</button>
                    </div>
                    <div className="feature-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem' }}>Yonex Summer Camp Scholarship</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Yonex India</p>
                        </div>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View</button>
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>AI Insights</h2>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(255,77,0,0.1), rgba(255,0,85,0.1))',
                        padding: '1.5rem',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--accent-primary)'
                    }}>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Based on your recent match data, your <strong>backhand smash</strong> effectiveness has dropped by 12%. Consider focusing on strength training for your wrist this week.
                        </p>
                    </div>
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

                        {/* Profile Photo Upload */}
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                margin: '0 auto 1rem',
                                border: '3px solid var(--accent-primary)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'var(--bg-secondary)'
                            }}>
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '3rem', color: 'var(--text-secondary)' }}>👤</span>
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
                                Upload Photo
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                            </label>
                        </div>

                        {/* Form Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Full Name */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profileData.fullName}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            {/* Date of Birth & Gender */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={profileData.dateOfBirth}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Gender</label>
                                    <select
                                        name="gender"
                                        value={profileData.gender}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Sport & Category */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Sport</label>
                                    <input
                                        type="text"
                                        name="sport"
                                        value={profileData.sport}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={profileData.category}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Under-19"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={profileData.location}
                                    onChange={handleInputChange}
                                    placeholder="City, State"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            {/* Aadhar Number */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Aadhar Card Number</label>
                                <input
                                    type="text"
                                    name="aadharNumber"
                                    value={profileData.aadharNumber}
                                    onChange={handleInputChange}
                                    placeholder="XXXX XXXX XXXX"
                                    maxLength="12"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            {/* Aadhar Card Upload */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Upload Aadhar Card</label>
                                <div style={{
                                    border: '2px dashed var(--border-color)',
                                    borderRadius: '6px',
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    backgroundColor: 'var(--bg-secondary)'
                                }}>
                                    {aadharCard ? (
                                        <div>
                                            <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>✓ {aadharCard}</p>
                                            <label style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'transparent',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                Change File
                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleAadharUpload} style={{ display: 'none' }} />
                                            </label>
                                        </div>
                                    ) : (
                                        <label style={{ cursor: 'pointer' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Click to upload or drag and drop</p>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>PDF, JPG, or PNG (Max 5MB)</p>
                                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleAadharUpload} style={{ display: 'none' }} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Achievements */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Key Achievements</label>
                                <textarea
                                    name="achievements"
                                    value={profileData.achievements}
                                    onChange={handleInputChange}
                                    placeholder="List your major achievements, awards, medals..."
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Bio</label>
                                <textarea
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself, your sports journey, goals..."
                                    rows="4"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
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

export default AthleteDashboard;
