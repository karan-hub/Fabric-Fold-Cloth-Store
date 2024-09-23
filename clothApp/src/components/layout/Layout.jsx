/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow">{children}</main>
            <Footer/>
        </div>
    );
};

export default Layout;