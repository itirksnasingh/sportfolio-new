import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />
            <section className="problem-statement" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>The Problem with Sports Today</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                        Talent is everywhere, but opportunity is not.
                        Fragmented information, lack of visibility, and limited access to resources hold back millions of athletes.
                    </p>
                </div>
            </section>

            <Features />

            <section className="cta-section" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>Ready to Start Your Journey?</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Join the ecosystem that powers Indian sports.
                </p>
                <Link to="/login" className="btn-primary big">Get Started Now</Link>
            </section>
        </div>
    );
};

export default LandingPage;
