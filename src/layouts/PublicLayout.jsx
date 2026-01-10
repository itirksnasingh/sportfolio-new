import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = ({ theme, toggleTheme }) => {
    return (
        <div className="app-container">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
