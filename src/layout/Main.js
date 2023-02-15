import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-14'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;