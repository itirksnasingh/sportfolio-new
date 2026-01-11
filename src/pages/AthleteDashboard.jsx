import React from 'react';
import EmptyState from '../components/EmptyState';

const StatCard = ({ label, value, note }) => (
  <div
    style={{
      background: 'var(--card-bg)',
      padding: '1.5rem',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border-color)',
    }}
  >
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
      {label}
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
    {note && (
      <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
        {note}
      </div>
    )}
  </div>
);

const AthleteDashboard = () => {
  return (
    <div>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <h1>Rahul Sharma</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Badminton • Under-19 • Pune
          </p>
        </div>
        <button className="btn-primary">Edit Profile</button>
      </header>

      {/* Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <StatCard label="Profile Completion" value="85%" note="+5% this week" />
        <StatCard label="Matches Played" value="12" />
        <StatCard label="Win Rate" value="68%" note="Top 10% locally" />
        <StatCard label="Applications" value="4" />
      </section>

      {/* Opportunities */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Recommended Opportunities</h2>

        <EmptyState
          icon="🎯"
          title="No personalized opportunities yet"
          description="Complete your profile to unlock trials, scholarships and tournaments."
          actionText="Explore Opportunities"
        />
      </section>

      {/* AI Insights */}
      <section>
        <h2 style={{ marginBottom: '1rem' }}>AI Performance Insight</h2>

        <div
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            background:
              'linear-gradient(135deg, rgba(255,77,0,0.15), rgba(255,0,85,0.15))',
            border: '1px solid var(--accent-primary)',
          }}
        >
          <p style={{ fontSize: '0.95rem' }}>
            🧠 <strong>Sample Insight:</strong> Athletes in your category
            improve faster by competing in district-level events.
          </p>
          <small style={{ color: 'var(--text-secondary)' }}>
            AI insights activate once performance data is added.
          </small>
    const { userProfile, currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
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

    // Update profile data when user profile is loaded
    useEffect(() => {
        if (userProfile) {
            setProfileData({
                fullName: userProfile.displayName || userProfile.profile?.fullName || 
                         (currentUser?.displayName ? `${currentUser.displayName.split(' ')[0]}` : 'User'),
                email: userProfile.email || currentUser?.email || '',
                phone: userProfile.profile?.phone || '',
                dateOfBirth: userProfile.profile?.dateOfBirth || '',
                gender: userProfile.profile?.gender || '',
                sport: userProfile.profile?.sport || 'Badminton',
                category: userProfile.profile?.category || 'Under-19',
                location: userProfile.profile?.location || 'Pune',
                aadharNumber: userProfile.profile?.aadharNumber || '',
                achievements: userProfile.profile?.achievements || '',
                bio: userProfile.profile?.bio || ''
            });
        } else if (currentUser) {
            // Set initial values from Firebase user object
            setProfileData(prev => ({
                ...prev,
                fullName: currentUser.displayName ? `Hey ${currentUser.displayName.split(' ')[0]}` : 'Hey User',
                email: currentUser.email || ''
            }));
        }
    }, [userProfile, currentUser]);

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
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Hello, {profileData.fullName || 'User'}</h1>
                    <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🏸 {profileData.sport}</span>
                        <span>•</span>
                        <span>{profileData.category}</span>
                        <span>•</span>
                        <span>📍 {profileData.location}</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => setIsProfileOpen(true)}>✏️ Edit Profile</button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🤖</span> AI Assistant
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
                    { id: 'overview', label: 'Overview', icon: '📊' },
                    { id: 'opportunities', label: 'Opportunities', icon: '🎯' },
                    { id: 'connections', label: 'Network', icon: '👥' },
                    { id: 'coaches', label: 'Coaches', icon: '🎓' },
                    { id: 'stats', label: 'Stats & Videos', icon: '📈' },
                    { id: 'ai-insights', label: 'AI Insights', icon: '🤖' }
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
                        <StatCard label="Profile Completion" value="85%" trend="+5% this week" icon="✅" />
                        <StatCard label="Profile Views" value="247" trend="+23 this week" icon="👁️" />
                        <StatCard label="Connections" value="45" trend="12 pending" icon="👥" />
                        <StatCard label="Opportunities" value="8" trend="2 new today" icon="🎯" />
                    </section>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="feature-card">
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>🔥</span> Recommended Opportunities
                            </h2>
                            {[
                                { title: 'District Level Selection Trials', org: 'Pune District Badminton Association', deadline: '5 days', type: 'Trial' },
                                { title: 'Yonex Summer Camp Scholarship', org: 'Yonex India', deadline: '12 days', type: 'Scholarship' },
                                { title: 'State Team Selection', org: 'Maharashtra Sports Authority', deadline: '18 days', type: 'Selection' }
                            ].map((opp, idx) => (
                                <div key={idx} className="feature-card" style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-secondary)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{opp.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{opp.org}</p>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--accent-glow)', borderRadius: '4px' }}>{opp.type}</span>
                                                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--card-bg)', borderRadius: '4px' }}>⏰ {opp.deadline}</span>
                                            </div>
                                        </div>
                                        <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Apply</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="feature-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(255,77,0,0.1), rgba(255,0,85,0.1))', border: '1px solid var(--accent-primary)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>🤖</span> AI-Powered Insights
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    Your profile is <strong>85% complete</strong>. Add video highlights to increase visibility by 40%!
                                </p>
                                <button className="btn-secondary" style={{ width: '100%' }}>Get AI Guidance</button>
                            </div>

                            <div className="feature-card">
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Quick Stats</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        { label: 'Applications Sent', value: '12' },
                                        { label: 'Interview Requests', value: '3' },
                                        { label: 'Coach Messages', value: '5' }
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

            {/* Opportunities Tab */}
            {activeTab === 'opportunities' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Browse Opportunities</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>All</button>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Trials</button>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Scholarships</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { title: 'National Badminton Championship', org: 'BAI', type: 'Championship', location: 'Delhi', date: 'Feb 15-20', status: 'Open' },
                            { title: 'Under-19 Training Camp', org: 'Sports Authority of India', type: 'Training', location: 'Bangalore', date: 'Mar 1-30', status: 'Open' },
                            { title: 'Talent Hunt Program', org: 'Yonex India', type: 'Scouting', location: 'Mumbai', date: 'Feb 25', status: 'Applied' },
                            { title: 'State Selection Trials', org: 'Maharashtra Sports', type: 'Trial', location: 'Pune', date: 'Feb 10', status: 'Open' }
                        ].map((opp, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.1rem' }}>{opp.title}</h3>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: opp.status === 'Applied' ? 'var(--accent-glow)' : 'var(--bg-secondary)', color: opp.status === 'Applied' ? 'var(--accent-primary)' : 'var(--text-secondary)', borderRadius: '12px', fontWeight: '600' }}>
                                        {opp.status}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{opp.org}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>{opp.type}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>📍 {opp.location}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>📅 {opp.date}</span>
                                </div>
                                <button className="btn-primary" style={{ width: '100%' }}>{opp.status === 'Applied' ? 'View Application' : 'Apply Now'}</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Connections/Network Tab */}
            {activeTab === 'connections' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Network</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Connected Athletes</h3>
                            {[
                                { name: 'Priya Sharma', sport: 'Football', location: 'Mumbai', mutual: 5 },
                                { name: 'Arjun Patel', sport: 'Swimming', location: 'Bangalore', mutual: 3 },
                                { name: 'Sneha Rao', sport: 'Badminton', location: 'Pune', mutual: 8 }
                            ].map((athlete, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👤</div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{athlete.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{athlete.sport} • {athlete.location}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{athlete.mutual} mutual connections</p>
                                    </div>
                                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Message</button>
                                </div>
                            ))}
                        </div>

                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Connection Requests</h3>
                            {[
                                { name: 'Vikram Singh', sport: 'Basketball', location: 'Delhi' },
                                { name: 'Ananya Desai', sport: 'Tennis', location: 'Chennai' }
                            ].map((request, idx) => (
                                <div key={idx} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff4d00, #ff0055)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👤</div>
                                        <div>
                                            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{request.name}</h4>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{request.sport} • {request.location}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-primary" style={{ flex: 1, padding: '0.5rem' }}>Accept</button>
                                        <button className="btn-secondary" style={{ flex: 1, padding: '0.5rem' }}>Decline</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Coaches Tab */}
            {activeTab === 'coaches' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Discover Coaches & Organizations</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { name: 'Coach Vijay Singh', sport: 'Cricket', exp: '15 years', athletes: 24, verified: true },
                            { name: 'Coach Meera Reddy', sport: 'Athletics', exp: '10 years', athletes: 18, verified: true },
                            { name: 'Pune Sports Academy', sport: 'Multi-Sport', exp: 'Est. 2010', athletes: 150, verified: true },
                            { name: 'Coach Rajesh Kumar', sport: 'Boxing', exp: '20 years', athletes: 32, verified: true }
                        ].map((coach, idx) => (
                            <div key={idx} className="feature-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6432ff, #9664ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎓</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {coach.name}
                                            {coach.verified && <span style={{ fontSize: '0.8rem' }}>✅</span>}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{coach.sport}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>⏱️ {coach.exp}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>👥 {coach.athletes} Athletes</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-primary" style={{ flex: 1 }}>Connect</button>
                                    <button className="btn-secondary" style={{ flex: 1 }}>Email</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats & Videos Tab */}
            {activeTab === 'stats' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Performance Stats & Video Highlights</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Season Statistics</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { label: 'Matches Played', value: '24', change: '+4 this month' },
                                    { label: 'Win Rate', value: '68%', change: '+5% improvement' },
                                    { label: 'Points Scored', value: '342', change: 'Personal best' },
                                    { label: 'Training Hours', value: '156', change: 'This quarter' }
                                ].map((stat, idx) => (
                                    <div key={idx} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>{stat.value}</span>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', margin: 0 }}>{stat.change}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Video Highlights</h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {[
                                    { title: 'District Finals - Winning Smash', duration: '0:45', views: 342 },
                                    { title: 'Training Session Highlights', duration: '2:15', views: 128 },
                                    { title: 'State Championship Match', duration: '1:30', views: 567 }
                                ].map((video, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', alignItems: 'center' }}>
                                        <div style={{ width: '80px', height: '60px', background: 'linear-gradient(135deg, rgba(255,77,0,0.3), rgba(255,0,85,0.3))', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>▶️</div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{video.title}</h4>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{video.duration} • {video.views} views</p>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>+ Upload New Video</button>
                            </div>
                        </div>
                    </div>

                    <div className="feature-card">
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Certificates & Achievements</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {[
                                { title: 'District Champion 2025', issuer: 'PDA', date: 'Jan 2025' },
                                { title: 'Level 2 Coaching Certificate', issuer: 'BAI', date: 'Dec 2024' },
                                { title: 'State Finalist', issuer: 'Maharashtra Sports', date: 'Nov 2024' }
                            ].map((cert, idx) => (
                                <div key={idx} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{cert.title}</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{cert.issuer}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{cert.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* AI Insights Tab */}
            {activeTab === 'ai-insights' && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>SportFolio AI Assistant</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                        <div>
                            <div className="feature-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(255,77,0,0.05), rgba(255,0,85,0.05))', border: '2px solid var(--accent-primary)' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>🤖</span> AI Career Guidance
                                </h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    Based on your profile and performance data, here are personalized recommendations:
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px' }}>
                                        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>📈 Profile Improvement</h4>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>Add 2-3 video highlights to increase profile views by 40%. Recruiters are 3x more likely to contact athletes with video content.</p>
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px' }}>
                                        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>⚠️ Injury Risk Awareness</h4>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>Your training intensity has increased by 35% in the last month. Consider adding rest days to prevent overtraining injuries.</p>
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px' }}>
                                        <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>🎯 Career Path</h4>
                                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>You're performing in top 15% of Under-19 badminton players in Maharashtra. Focus on state-level tournaments to qualify for nationals.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="feature-card">
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>💬 Ask AI Anything</h3>
                                <textarea 
                                    placeholder="Ask about training plans, injury prevention, career guidance, or profile optimization..."
                                    style={{
                                        width: '100%',
                                        minHeight: '120px',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.9rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Get AI Response</button>
                            </div>
                        </div>

                        <div>
                            <div className="feature-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(0,255,150,0.1), rgba(0,200,255,0.1))', border: '1px solid rgba(0,200,200,0.5)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>✅</span> AI-Verified Profile
                                </h3>
                                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    Get your profile AI-verified to increase visibility by <strong>60%</strong> and gain recruiter trust!
                                </p>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    <p style={{ marginBottom: '0.5rem' }}>✓ Stats verification</p>
                                    <p style={{ marginBottom: '0.5rem' }}>✓ Achievement validation</p>
                                    <p style={{ marginBottom: '0.5rem' }}>✓ Priority in search results</p>
                                </div>
                                <button className="btn-primary" style={{ width: '100%' }}>Start Verification</button>
                            </div>

                            <div className="feature-card">
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Quick Actions</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem' }}>📊 Analyze Performance</button>
                                    <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem' }}>🏋️ Training Plan</button>
                                    <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem' }}>💪 Injury Prevention</button>
                                    <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem' }}>🎓 Career Roadmap</button>
                                </div>
                            </div>
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
      </section>
    </div>
  );
};

export default AthleteDashboard;