import React from 'react';

const OpportunityCard = ({     title,
    type,
    organization,
    description,
    source,
    applyLink, }) => (
    <div className="feature-card" style={{ textAlign: 'left' }}>
        <div style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--accent-primary)',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
        }}>{type}
        </div>
    
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
          {title}
        </h3>
    
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            marginBottom: "0.75rem",
          }}
        >
          {description}
        </p>
    
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "1rem",
          }}
        >
          <strong>Organization:</strong> {organization}
          <br />
          <strong>Source:</strong> {source}
        </p>
    
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            width: "100%",
            textAlign: "center",
            display: "block",
          }}
        >
          Apply on Official Website
        </a>
    </div>
);

const DiscoverPage = () => {
    return (
        <div
        className="discover-page"
        style={{
          padding: "10rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top center, rgba(255,77,0,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(255,0,85,0.10), transparent 60%)",
        }}
      >
       <div style={{ marginBottom: '3rem' }}>
                <h1 style={{   fontSize: 'clamp(2.2rem, 4vw, 3rem)',
    marginBottom: '1rem', }}>Discover Opportunities</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                Find scholarships, trials, and tournaments curated for you.

                </p>
            </div>
            <div
  style={{
    marginBottom: "2.5rem",
    padding: "1.5rem",
    background: "var(--card-bg)",
    borderRadius: "var(--border-radius)",
    border: "1px solid var(--border-color)",
  }}
>
  <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
    Sportfolio continuously monitors official government portals,
    national sports federations, and verified sports organizations.
    Announcements are analyzed, categorized, and published here
    for easier discovery.
  </p>

  <p
    style={{
      marginTop: "0.75rem",
      fontSize: "0.9rem",
      color: "var(--text-secondary)",
    }}
  >
    Applications are always completed on the original official website.
  </p>
</div>


            <div className="filters" style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>All</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Scholarships</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Tournaments</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Trials</button>
            </div>

            <div className="features-grid">
            <OpportunityCard
  type="Government Scheme"
  title="Khelo India Athlete Scholarship"
  organization="Ministry of Youth Affairs and Sports"
  description="Central government scholarship scheme supporting talented athletes with financial assistance and structured development."
  source="kheloindia.gov.in"
  applyLink="https://kheloindia.gov.in"
/>

<OpportunityCard
  type="National Programme"
  title="Khelo India National Programme for Development of Sports"
  organization="Ministry of Youth Affairs and Sports"
  description="Government programme promoting sports infrastructure, competitions, and talent development nationwide."
  source="yas.nic.in"
  applyLink="https://yas.nic.in/sports/khelo-india-national-programme-development-sports-0"
/>

<OpportunityCard
  type="Government Award"
  title="National Sports Awards – 2026"
  organization="Ministry of Youth Affairs and Sports"
  description="Annual national awards recognizing excellence in various sports disciplines and supporting athletes’ careers."
  source="dbtyas-sports.gov.in"
  applyLink="https://dbtyas-sports.gov.in/home/all_services"
/>

<OpportunityCard
  type="Registration Portal"
  title="National Sports Repository System (NSRS)"
  organization="Khelo India"
  description="Official government portal where athletes can register to get a unique ID and access sports opportunities."
  source="nsrs.kheloindia.gov.in"
  applyLink="https://nsrs.kheloindia.gov.in"
/>

<OpportunityCard
  type="State Opportunities"
  title="State Sports Development & Trials"
  organization="Haryana Sports Department"
  description="Official state government sports programs, trials, and cash awards for athletes, including downloadable applications."
  source="haryanasports.gov.in"
  applyLink="https://haryanasports.gov.in/provider/central-government/"
/>



            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', background: 'var(--card-bg)', borderRadius: 'var(--border-radius)' }}>
                <h3>Don't miss out on opportunities</h3>
                <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Create an account to save opportunities and apply directly.</p>
                <a href="/login" className="btn-primary">Create Free Account</a>
            </div>
        </div>
    );
};

export default DiscoverPage;
