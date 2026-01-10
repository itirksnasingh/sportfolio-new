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

const OrgDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        orgName: 'Pune Sports Academy',
        orgType: 'Multi-Sport Academy',
        location: 'Pune, Maharashtra',
        established: '2010'
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
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{profileData.orgName}</h1>
                    <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🏛️ {profileData.orgType}</span>
                        <span>•</span>
                        <span>📍 {profileData.location}</span>
                        <span>•</span>
                        <span>Est. {profileData.established}</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => setIsProfileOpen(true)}>✏️ Edit Profile</button>
                    <button className="btn-primary">+ Post Opportunity</button>
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
                    { id: 'overview', label: '📊 Overview' },
                    { id: 'scout-athletes', label: '🏃 Scout Athletes' },
                    { id: 'scout-coaches', label: '🎓 Scout Coaches' },
                    { id: 'shortlisted', label: '⭐ Shortlisted' },
                    { id: 'messages', label: '📬 Messages' },
                    { id: 'opportunities', label: '🎯 My Opportunities' }
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
                        <StatCard label="Active Opportunities" value="8" trend="2 new this week" icon="🎯" />
                        <StatCard label="Total Applications" value="156" trend="+23 this week" icon="📊" />
                        <StatCard label="Shortlisted" value="32" trend="12 athletes, 8 coaches" icon="⭐" />
                        <StatCard label="Response Rate" value="78%" trend="+12% this month" icon="✅" />
                    </section>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="feature-card">
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>🎯</span> Active Opportunities
                            </h2>
                            {[
                                { title: 'District Selection Trials', applications: 45, deadline: '5 days', type: 'Trial' },
                                { title: 'Summer Training Camp', applications: 28, deadline: '12 days', type: 'Camp' },
                                { title: 'Head Coach Position', applications: 8, deadline: '18 days', type: 'Hiring' }
                            ].map((opp, idx) => (
                                <div key={idx} className="feature-card" style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-secondary)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{opp.title}</h4>
                                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--accent-glow)', borderRadius: '4px' }}>{opp.type}</span>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--card-bg)', borderRadius: '4px' }}>📊 {opp.applications} applications</span>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--card-bg)', borderRadius: '4px' }}>⏰ {opp.deadline}</span>
                                            </div>
                                        </div>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Manage</button>
                                    </div>
                                </div>
                            ))}
                            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>+ Create New Opportunity</button>
                        </div>

                        <div>
                            <div className="feature-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(0,150,255,0.1), rgba(0,255,200,0.1))', border: '1px solid rgba(0,200,255,0.5)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>✅</span> AI-Verified Profiles
                                </h3>
                                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    <strong>Priority access</strong> to AI-verified athletes and coaches for better trust and efficiency!
                                </p>
                                <button className="btn-primary" style={{ width: '100%' }}>View Verified Profiles</button>
                            </div>

                            <div className="feature-card">
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Quick Stats</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        { label: 'Pending Reviews', value: '24' },
                                        { label: 'Interviews Scheduled', value: '7' },
                                        { label: 'Hired This Month', value: '3' }
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
            {activeTab === 'scout-athletes' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Scout & Search Athletes</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="text" placeholder="Search by name, sport, location..." style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', minWidth: '300px' }} />
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>🔍 Filter</button>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>✅ Verified Only</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { name: 'Rahul Kumar', sport: 'Badminton', age: '17', location: 'Pune', rank: 'State Level', stats: '85% Win Rate', verified: true },
                            { name: 'Priya Sharma', sport: 'Football', age: '16', location: 'Mumbai', rank: 'National U-17', stats: '24 Goals', verified: true },
                            { name: 'Arjun Patel', sport: 'Swimming', age: '18', location: 'Bangalore', rank: 'District Champion', stats: '50m - 24.5s', verified: false },
                            { name: 'Sneha Rao', sport: 'Badminton', age: '17', location: 'Pune', rank: 'State Finalist', stats: '68% Win Rate', verified: true },
                            { name: 'Vikram Singh', sport: 'Basketball', age: '19', location: 'Delhi', rank: 'College Level', stats: '18 PPG', verified: false },
                            { name: 'Ananya Desai', sport: 'Tennis', age: '16', location: 'Chennai', rank: 'State Rank 3', stats: 'ITF Ranked', verified: true }
                        ].map((athlete, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff4d00, #ff0055)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🏃</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {athlete.name}
                                            {athlete.verified && <span style={{ fontSize: '0.9rem', padding: '0.25rem 0.5rem', background: 'rgba(0,255,150,0.2)', color: '#00ff96', borderRadius: '4px', fontWeight: '600', fontSize: '0.7rem' }}>✅ VERIFIED</span>}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{athlete.sport} • {athlete.age} years</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 {athlete.location}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--accent-glow)', borderRadius: '12px', color: 'var(--accent-primary)', fontWeight: '600' }}>{athlete.rank}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>📊 {athlete.stats}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                    <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>📩 Message</button>
                                    <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>📧 Email</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>👍 Recruit</button>
                                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>💬 Talk</button>
                                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>⭐ Shortlist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Scout Coaches Tab */}
            {activeTab === 'scout-coaches' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Scout & Search Coaches</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="text" placeholder="Search by name, sport, experience..." style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', minWidth: '300px' }} />
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>🔍 Filter</button>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>✅ Verified Only</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { name: 'Coach Vijay Singh', sport: 'Cricket', exp: '15 years', athletes: 24, specialization: 'Pace Bowling', verified: true },
                            { name: 'Coach Meera Reddy', sport: 'Athletics', exp: '10 years', athletes: 18, specialization: 'Sprint Training', verified: true },
                            { name: 'Coach Rajesh Kumar', sport: 'Boxing', exp: '20 years', athletes: 32, specialization: 'Fitness & Technique', verified: true },
                            { name: 'Coach Priya Sharma', sport: 'Badminton', exp: '12 years', athletes: 28, specialization: 'Junior Development', verified: false }
                        ].map((coach, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #6432ff, #9664ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎓</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {coach.name}
                                            {coach.verified && <span style={{ fontSize: '0.9rem', padding: '0.25rem 0.5rem', background: 'rgba(0,255,150,0.2)', color: '#00ff96', borderRadius: '4px', fontWeight: '600', fontSize: '0.7rem' }}>✅ VERIFIED</span>}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{coach.sport} Coach • {coach.exp}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{coach.specialization}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>👥 {coach.athletes} Athletes</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                    <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>📩 Message</button>
                                    <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>📧 Email</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>👫 Hire</button>
                                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>💬 Talk</button>
                                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>⭐ Shortlist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Shortlisted Tab */}
            {activeTab === 'shortlisted' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Shortlisted Candidates</h2>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>All (32)</button>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Athletes (24)</button>
                        <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Coaches (8)</button>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { name: 'Rahul Kumar', type: 'Athlete', sport: 'Badminton', info: 'State Level, 17 years', status: 'Interview Pending', verified: true },
                            { name: 'Coach Vijay Singh', type: 'Coach', sport: 'Cricket', info: '15 years experience', status: 'Contacted', verified: true },
                            { name: 'Priya Sharma', type: 'Athlete', sport: 'Football', info: 'National U-17, 16 years', status: 'Offer Sent', verified: true }
                        ].map((candidate, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
                                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: candidate.type === 'Athlete' ? 'linear-gradient(135deg, #ff4d00, #ff0055)' : 'linear-gradient(135deg, #6432ff, #9664ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                                            {candidate.type === 'Athlete' ? '🏃' : '🎓'}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                {candidate.name}
                                                {candidate.verified && <span style={{ fontSize: '0.8rem' }}>✅</span>}
                                            </h3>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{candidate.sport} {candidate.type}</p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{candidate.info}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ 
                                            fontSize: '0.85rem', 
                                            padding: '0.5rem 1rem', 
                                            background: candidate.status === 'Offer Sent' ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                                            color: candidate.status === 'Offer Sent' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                            borderRadius: '12px',
                                            fontWeight: '600'
                                        }}>
                                            {candidate.status}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>View Profile</button>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Message</button>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>❌ Remove</button>
                                    </div>
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
                                { name: 'Rahul Kumar', type: 'Athlete', last: 'Thank you for the opportunity!', time: '1h ago', unread: true },
                                { name: 'Coach Vijay Singh', type: 'Coach', last: 'I\'d be interested...', time: '3h ago', unread: true },
                                { name: 'Priya Sharma', type: 'Athlete', last: 'When is the trial?', time: '1d ago', unread: false },
                                { name: 'Coach Meera Reddy', type: 'Coach', last: 'Looking forward to discussing', time: '2d ago', unread: false }
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
                                        <div>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: conv.unread ? '600' : '500' }}>{conv.name}</h4>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{conv.type}</span>
                                        </div>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{conv.time}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{conv.last}</p>
                                </div>
                            ))}
                        </div>

                        <div className="feature-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem' }}>Rahul Kumar</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Athlete - Badminton</p>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px 12px 12px 4px', marginBottom: '1rem', maxWidth: '80%' }}>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>I\'m very interested in the District Selection Trials opportunity. Can you provide more details?</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1 hour ago</span>
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

            {/* My Opportunities Tab */}
            {activeTab === 'opportunities' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>My Opportunities</h2>
                        <button className="btn-primary">+ Create New</button>
                    </div>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { title: 'District Selection Trials', type: 'Trial', applications: 45, shortlisted: 12, status: 'Active', deadline: '5 days' },
                            { title: 'Summer Training Camp', type: 'Camp', applications: 28, shortlisted: 8, status: 'Active', deadline: '12 days' },
                            { title: 'Head Coach Position', type: 'Hiring', applications: 8, shortlisted: 3, status: 'Active', deadline: '18 days' }
                        ].map((opp, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{opp.title}</h3>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--accent-glow)', borderRadius: '12px', color: 'var(--accent-primary)', fontWeight: '600' }}>{opp.type}</span>
                                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: opp.status === 'Active' ? 'rgba(0,255,150,0.2)' : 'var(--bg-secondary)', color: opp.status === 'Active' ? '#00ff96' : 'var(--text-secondary)', borderRadius: '12px', fontWeight: '600' }}>{opp.status}</span>
                                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>⏰ Closes in {opp.deadline}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Manage</button>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>✏️ Edit</button>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Applications</p>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{opp.applications}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Shortlisted</p>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>{opp.shortlisted}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Response Rate</p>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>78%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
