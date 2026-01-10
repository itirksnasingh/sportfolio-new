import React, { useState, useEffect } from 'react';

const StatCard = ({ label, value, trend, icon }) => (
    <div style={{
        background: 'var(--card-bg)',
        padding: '1.5rem',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '2rem', opacity: 0.1 }}>{icon}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{label}</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
        {trend && <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{trend}</div>}
    </div>
);

const CoachDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: 'Coach Vijay Singh',
        email: 'vijay@example.com',
        phone: '',
        age: '',
        sport: 'Cricket',
        experience: '15 years',
        specialization: 'Pace Bowling & Batting',
        location: 'Pune',
        bio: '',
        certificateType: '',
        pastTeams: ''
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [certificate, setCertificate] = useState(null);

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

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleCertificateUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCertificate(file.name);
        }
    };

    const handleSaveProfile = () => {
        console.log('Coach profile saved:', profileData);
        setIsProfileOpen(false);
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome, {profileData.fullName}</h1>
                    <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🎯 {profileData.sport}</span>
                        <span>•</span>
                        <span>{profileData.experience} Experience</span>
                        <span>•</span>
                        <span>📍 {profileData.location}</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => setIsProfileOpen(true)}>✏️ Edit Profile</button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>✅</span> Get Verified
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '2rem', 
                borderBottom: '1px solid var(--border-color)',
                overflowX: 'auto'
            }}>
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'athletes', label: 'Scout Athletes' },
                    { id: 'my-squad', label: 'My Squad' },
                    { id: 'organizations', label: 'Organizations' },
                    { id: 'messages', label: 'Messages' },
                    { id: 'portfolio', label: 'Portfolio' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '1rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '3px solid var(--accent-primary)' : '3px solid transparent',
                            color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontWeight: activeTab === tab.id ? '600' : '500',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <>
                    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <StatCard label="Total Athletes" value="24" trend="+3 this month" icon="👥" />
                        <StatCard label="Active Programs" value="5" trend="2 upcoming" icon="🏋️" />
                        <StatCard label="Profile Views" value="342" trend="+45 this week" icon="👁️" />
                        <StatCard label="Organizations" value="8" trend="3 interested" icon="🏛️" />
                    </section>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="feature-card">
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>🏃</span> My Squad
                            </h2>
                            {[
                                { name: 'Rahul Kumar', sport: 'Cricket', age: '17', performance: '92%' },
                                { name: 'Ankit Sharma', sport: 'Cricket', age: '18', performance: '88%' },
                                { name: 'Priya Patel', sport: 'Cricket', age: '16', performance: '85%' }
                            ].map((athlete, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏋️</div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{athlete.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{athlete.sport} • {athlete.age} years</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <div style={{ flex: 1, height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: athlete.performance, height: '100%', background: 'var(--accent-primary)' }} />
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-primary)' }}>{athlete.performance}</span>
                                        </div>
                                    </div>
                                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View</button>
                                </div>
                            ))}
                            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>+ Add Athlete</button>
                        </div>

                        <div>
                            <div className="feature-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(100,50,255,0.1), rgba(150,100,255,0.1))', border: '1px solid rgba(120,80,255,0.5)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>✅</span> Get AI Verified
                                </h3>
                                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    Boost your credibility and get <strong>prioritized visibility</strong> with AI verification!
                                </p>
                                <button className="btn-primary" style={{ width: '100%' }}>Start Verification</button>
                            </div>

                            <div className="feature-card">
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Quick Stats</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        { label: 'Training Sessions', value: '18' },
                                        { label: 'Athlete Requests', value: '7' },
                                        { label: 'Org Messages', value: '4' }
                                    ].map((stat, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                                            <span style={{ fontSize: '0.9rem' }}>{stat.label}</span>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-primary)' }}>{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Scout Athletes Tab */}
            {activeTab === 'athletes' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Scout Athletes</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="text" placeholder="Search athletes..." style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', minWidth: '250px' }} />
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Filter</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { name: 'Rahul Kumar', sport: 'Badminton', age: '17', location: 'Pune', rank: 'State Level', verified: true },
                            { name: 'Priya Sharma', sport: 'Football', age: '16', location: 'Mumbai', rank: 'National U-17', verified: true },
                            { name: 'Arjun Patel', sport: 'Swimming', age: '18', location: 'Bangalore', rank: 'District Champion', verified: false },
                            { name: 'Sneha Rao', sport: 'Badminton', age: '17', location: 'Pune', rank: 'State Finalist', verified: true },
                            { name: 'Vikram Singh', sport: 'Basketball', age: '19', location: 'Delhi', rank: 'College Level', verified: false },
                            { name: 'Ananya Desai', sport: 'Tennis', age: '16', location: 'Chennai', rank: 'State Rank 3', verified: true }
                        ].map((athlete, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff4d00, #ff0055)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🏃</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {athlete.name}
                                            {athlete.verified && <span style={{ fontSize: '0.8rem' }}>✅</span>}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{athlete.sport} • {athlete.age} years</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 {athlete.location}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--accent-glow)', borderRadius: '12px', color: 'var(--accent-primary)', fontWeight: '600' }}>{athlete.rank}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-primary" style={{ flex: 1 }}>Connect</button>
                                    <button className="btn-secondary" style={{ flex: 1 }}>Email</button>
                                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>⭐</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* My Squad Tab */}
            {activeTab === 'my-squad' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>My Squad</h2>
                        <button className="btn-primary">+ Add Athlete</button>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { name: 'Rahul Kumar', sport: 'Cricket', age: '17', performance: '92%', sessions: 24, attendance: '95%' },
                            { name: 'Ankit Sharma', sport: 'Cricket', age: '18', performance: '88%', sessions: 22, attendance: '91%' },
                            { name: 'Priya Patel', sport: 'Cricket', age: '16', performance: '85%', sessions: 20, attendance: '88%' }
                        ].map((athlete, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
                                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #6432ff, #9664ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🏋️</div>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{athlete.name}</h3>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{athlete.sport} • {athlete.age} years</p>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>💪 {athlete.sessions} sessions</span>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>📅 {athlete.attendance}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Performance</p>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <div style={{ flex: 1, height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: athlete.performance, height: '100%', background: 'var(--accent-primary)' }} />
                                                </div>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{athlete.performance}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Message</button>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>View Profile</button>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>⋯</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Organizations Tab */}
            {activeTab === 'organizations' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Connect with Organizations & Academies</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { name: 'Pune Sports Academy', type: 'Multi-Sport', athletes: 150, verified: true, status: 'Connected' },
                            { name: 'Maharashtra Cricket Board', type: 'Cricket', athletes: 500, verified: true, status: 'Interested' },
                            { name: 'Yonex Sports India', type: 'Badminton', athletes: 200, verified: true, status: 'Available' },
                            { name: 'Sports Authority of India', type: 'Government', athletes: 1000, verified: true, status: 'Available' }
                        ].map((org, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'linear-gradient(135deg, #3296ff, #0064ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🏛️</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {org.name}
                                            {org.verified && <span style={{ fontSize: '0.8rem' }}>✅</span>}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{org.type}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>👥 {org.athletes} Athletes</span>
                                    <span style={{ 
                                        fontSize: '0.75rem', 
                                        padding: '0.25rem 0.75rem', 
                                        background: org.status === 'Connected' ? 'var(--accent-glow)' : org.status === 'Interested' ? 'rgba(255,200,0,0.2)' : 'var(--bg-secondary)', 
                                        color: org.status === 'Connected' ? 'var(--accent-primary)' : org.status === 'Interested' ? '#ffc800' : 'var(--text-secondary)',
                                        borderRadius: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {org.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-primary" style={{ flex: 1 }}>Connect</button>
                                    <button className="btn-secondary" style={{ flex: 1 }}>View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Messages</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', minHeight: '500px' }}>
                        <div className="feature-card" style={{ padding: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Conversations</h3>
                            {[
                                { name: 'Pune Sports Academy', last: 'Looking forward to...', time: '2h ago', unread: true },
                                { name: 'Rahul Kumar', last: 'Thank you coach!', time: '5h ago', unread: false },
                                { name: 'Maharashtra Cricket Board', last: 'Selection trials...', time: '1d ago', unread: true },
                                { name: 'Ankit Sharma', last: 'Training schedule?', time: '2d ago', unread: false }
                            ].map((conv, idx) => (
                                <div key={idx} style={{ 
                                    padding: '1rem', 
                                    background: conv.unread ? 'var(--accent-glow)' : 'var(--bg-secondary)', 
                                    borderRadius: '8px', 
                                    marginBottom: '0.75rem',
                                    cursor: 'pointer',
                                    border: conv.unread ? '1px solid var(--accent-primary)' : '1px solid transparent'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: conv.unread ? '600' : '500' }}>{conv.name}</h4>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{conv.time}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{conv.last}</p>
                                </div>
                            ))}
                        </div>

                        <div className="feature-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem' }}>Pune Sports Academy</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Organization</p>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px 12px 12px 4px', marginBottom: '1rem', maxWidth: '80%' }}>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>We're interested in your coaching profile for our upcoming badminton program.</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2 hours ago</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                                <button className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Coaching Portfolio</h2>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="feature-card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.3rem' }}>Profile Overview</h3>
                                <button className="btn-secondary">✏️ Edit</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Experience</p>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{profileData.experience}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Specialization</p>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{profileData.specialization}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Athletes Trained</p>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>200+</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Success Rate</p>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--accent-primary)' }}>92%</p>
                                </div>
                            </div>
                        </div>

                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Achievements & Certifications</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                                {[
                                    { title: 'Level 3 Coaching Certificate', issuer: 'BCCI', year: '2020' },
                                    { title: 'Sports Psychology Diploma', issuer: 'SAI', year: '2018' },
                                    { title: 'Best Coach Award', issuer: 'Maharashtra Sports', year: '2023' },
                                    { title: 'Youth Development Program', issuer: 'ICC', year: '2019' }
                                ].map((cert, idx) => (
                                    <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏆</div>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{cert.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{cert.issuer}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cert.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Success Stories</h3>
                            {[
                                { athlete: 'Rohit Sharma', achievement: 'Selected for National U-19 Team', year: '2024' },
                                { athlete: 'Priya Patel', achievement: 'State Champion - Under 17', year: '2023' },
                                { athlete: 'Ankit Kumar', achievement: 'Zonal Selection Cricket', year: '2024' }
                            ].map((story, idx) => (
                                <div key={idx} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⭐</div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{story.athlete}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>{story.achievement}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{story.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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

                        {/* Profile Form Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Basic Information */}
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>📋 Basic Information</h3>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={profileData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Age *</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={profileData.age}
                                            onChange={handleInputChange}
                                            placeholder="Age"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '6px',
                                                border: '1px solid var(--border-color)',
                                                backgroundColor: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.95rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Experience *</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={profileData.experience}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 15 years"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '6px',
                                                border: '1px solid var(--border-color)',
                                                backgroundColor: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.95rem'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        placeholder="your.email@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Contact Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 XXXXXXXXXX"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Coaching Information */}
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>🎯 Coaching Information</h3>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Sport/Discipline *</label>
                                    <input
                                        type="text"
                                        name="sport"
                                        value={profileData.sport}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Cricket, Football, Badminton"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Specialization</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={profileData.specialization}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Pace Bowling, Goalkeeping, Fitness Training"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Location *</label>
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
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Bio / About You</label>
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleInputChange}
                                        placeholder="Brief introduction about your coaching philosophy, achievements, etc."
                                        rows={4}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Verification Documents */}
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>✅ Verification Documents</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    Upload <strong>ANY ONE</strong> of the following documents to verify your coaching credentials:
                                </p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Certificate Type *</label>
                                    <select
                                        name="certificateType"
                                        value={profileData.certificateType}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="">Select certificate type...</option>
                                        <optgroup label="Federation Certificates">
                                            <option value="sai">Sports Authority of India (SAI)</option>
                                            <option value="state-federation">State Sports Federation</option>
                                            <option value="national-federation">National Federation (AIFF, BCCI, etc.)</option>
                                        </optgroup>
                                        <optgroup label="Institution Proof">
                                            <option value="school-letter">School/College Appointment Letter</option>
                                            <option value="academy-id">Academy ID Card</option>
                                        </optgroup>
                                        <optgroup label="Sports Proof">
                                            <option value="player-history">Player History/Career Proof</option>
                                            <option value="past-teams">Past Teams Coached</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div style={{
                                    padding: '1.5rem',
                                    border: '2px dashed var(--border-color)',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    backgroundColor: 'var(--bg-secondary)',
                                    marginBottom: '1rem'
                                }}>
                                    {certificate ? (
                                        <div>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>{certificate}</p>
                                            <button
                                                onClick={() => setCertificate(null)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: 'transparent',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <label style={{ cursor: 'pointer', display: 'block' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
                                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>Upload Certificate/Proof</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PDF, JPG, PNG (Max 5MB)</p>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleCertificateUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>🏆 Additional Information</h3>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Past Teams Coached</label>
                                    <textarea
                                        name="pastTeams"
                                        value={profileData.pastTeams}
                                        onChange={handleInputChange}
                                        placeholder="List teams/athletes you've coached (e.g., U-19 State Team, XYZ Academy, Individual players, etc.)"
                                        rows={3}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
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

export default CoachDashboard;
