import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RoleSelectionPage = () => {
    const navigate = useNavigate();

    const handleRoleLogin = (role) => {
        // Scroll to top first
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Small delay to ensure smooth scroll completes before navigation
        setTimeout(() => {
            navigate(`/login?role=${role}`);
        }, 300);
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Navbar */}
            <header className="glass-header">
                <nav>
                    <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                        Sport<span className="accent-dot">folio</span>
                    </Link>
                    <ul className="nav-links">
                        <li style={{ marginLeft: '120px' }}>
                            <Link 
                                to="/" 
                                style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/discover" 
                                style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Discover
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    <div className="header-actions">
                        <Link to="/login" className="btn-primary">Login / Signup</Link>
                    </div>
                </nav>
            </header>

            <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
            {/* Left Sidebar */}
            <aside style={{
                width: '250px',
                padding: '2rem',
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--glass-bg)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div className="logo" style={{ marginBottom: '3rem' }}>
                    Sport<span className="accent-dot">folio</span>
                </div>

                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-glow)',
                        border: '2px solid var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}>
                        👤
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem' }}>User</p>
                        <p style={{ margin: 0,fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Choose your role</p>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/')}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                    }}
                >
                    ← Back to Home
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '6rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>Choose Your Role</h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Select the option that best describes you to get started with Sportfolio
                        </p>
                    </div>

                    {/* Role Cards Grid */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        {/* Athlete Section */}
                        <div className="feature-card" style={{ 
                            padding: '2rem', 
                            display: 'flex', 
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                            <h3 style={{ 
                                fontSize: '1.5rem', 
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                color: 'var(--accent-primary)'
                            }}>
                                Athlete
                            </h3>
                            
                            {/* Sample Cards for Athletes */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {/* Demo Profile Cards */}
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #ff4d00, #ff0055)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🏃</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Rahul Kumar</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Badminton • U-19</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>📊 Stats</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🏆 12 Wins</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>District champion looking for state-level opportunities</p>
                                </div>
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #0096ff, #00ffc8)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>⚽</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Priya Sharma</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Football • U-17</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>⚡ Striker</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🎯 8 Goals</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>State player seeking national level trials and scholarships</p>
                                </div>
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #ffc800, #ff9600)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🏊</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Arjun Patel</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Swimming • Senior</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🥇 Medalist</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>⏱️ 50m Free</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>National record holder exploring sponsorship opportunities</p>
                                </div>
                            </div>

                            {/* Catchy Line */}
                            <p style={{ 
                                fontSize: '0.9rem', 
                                color: 'var(--text-secondary)', 
                                fontStyle: 'italic',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                backgroundColor: 'var(--accent-glow)',
                                borderRadius: '6px',
                                border: '1px solid var(--accent-primary)'
                            }}>
                                "Turn your passion into performance. Your journey to greatness starts here!"
                            </p>

                            <button 
                                onClick={() => handleRoleLogin('athlete')}
                                className="btn-primary" 
                                style={{ width: '100%' }}
                            >
                                Athlete Login
                            </button>
                        </div>

                        {/* Coach Section */}
                        <div className="feature-card" style={{ 
                            padding: '2rem', 
                            display: 'flex', 
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                            <h3 style={{ 
                                fontSize: '1.5rem', 
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                color: 'var(--accent-primary)'
                            }}>
                                Coach
                            </h3>
                            
                            {/* Sample Cards for Coaches */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {/* Demo Profile Cards */}
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #6432ff, #9664ff)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🎓</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Coach Vijay Singh</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Cricket • 15 Years Exp</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>👥 24 Athletes</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>⭐ Certified</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Professional coach specializing in pace bowling and batting</p>
                                </div>
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #00c896, #00ffc8)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🏋️</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Coach Meera Reddy</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Athletics • 10 Years Exp</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🏃 Sprint Coach</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>📊 Analytics</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Data-driven training methods for 100m and 200m sprinters</p>
                                </div>
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            background: 'linear-gradient(135deg, #ff6496, #ff3264)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🥊</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Coach Rajesh Kumar</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Boxing • 20 Years Exp</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🥇 Olympian</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>💪 Fitness</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Former olympian training next generation boxers</p>
                                </div>
                            </div>

                            {/* Catchy Line */}
                            <p style={{ 
                                fontSize: '0.9rem', 
                                color: 'var(--text-secondary)', 
                                fontStyle: 'italic',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                backgroundColor: 'var(--accent-glow)',
                                borderRadius: '6px',
                                border: '1px solid var(--accent-primary)'
                            }}>
                                "Shape champions, build legacies. Empower the next generation of athletes!"
                            </p>

                            <button 
                                onClick={() => handleRoleLogin('coach')}
                                className="btn-primary" 
                                style={{ width: '100%' }}
                            >
                                Coach Login
                            </button>
                        </div>

                        {/* Organization Section */}
                        <div className="feature-card" style={{ 
                            padding: '2rem', 
                            display: 'flex', 
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                            <h3 style={{ 
                                fontSize: '1.5rem', 
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                color: 'var(--accent-primary)'
                            }}>
                                Organization
                            </h3>
                            
                            {/* Sample Cards for Organizations */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {/* Demo Profile Cards */}
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '8px', 
                                            background: 'linear-gradient(135deg, #3296ff, #0064ff)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🏛️</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Pune Sports Academy</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Multi-Sport • Est. 2010</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>📢 8 Active Posts</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>✅ Verified</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Premier training facility offering scholarships and trials</p>
                                </div>
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '8px', 
                                            background: 'linear-gradient(135deg, #c864ff, #9632ff)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🏆</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Maharashtra Cricket Board</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Cricket • Governing Body</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🔍 Scouting</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>📊 156 Apps</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Official board conducting district and state level trials</p>
                                </div>
                                <div style={{ 
                                    position: 'relative',
                                    height: '180px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'transparent',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ 
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '8px', 
                                            background: 'linear-gradient(135deg, #ff9632, #ff6400)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>🎾</div>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Yonex Sports India</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Badminton • Sponsor</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>💰 Scholarships</span>
                                        <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>🏕️ Camps</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Leading brand providing equipment and training support</p>
                                </div>
                            </div>

                            {/* Catchy Line */}
                            <p style={{ 
                                fontSize: '0.9rem', 
                                color: 'var(--text-secondary)', 
                                fontStyle: 'italic',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                backgroundColor: 'var(--accent-glow)',
                                borderRadius: '6px',
                                border: '1px solid var(--accent-primary)'
                            }}>
                                "Connect talent with opportunity. Build the future of Indian sports!"
                            </p>

                            <button 
                                onClick={() => handleRoleLogin('org')}
                                className="btn-primary" 
                                style={{ width: '100%' }}
                            >
                                Organization Login
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            </div>
        </div>
    );
};

export default RoleSelectionPage;
