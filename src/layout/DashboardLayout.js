import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import useAdmin from '../Components/MyHooks/useAdmin/useAdmin';
// import useSeller from '../Components/MyHooks/useSeller/useSeller';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';
// import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import { FaUniversalAccess } from 'react-icons/fa';

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    const menuHandler = () => {
        setOpen(!open);
    }
    
    // const { user } = useContext(AuthContext);
    // const [isAdmin] = useAdmin(user.email);
    // const [isSeller] = useSeller(user.email);
    return (
        <div>
            <Navbar />
            <label onClick={menuHandler} htmlFor="dashboard-drawer" className='btn-ghost lg:hidden bg-transparent'>
                <FaUniversalAccess className={
                    open === !true ?
                        'absolute left-0 top-16 z-50 rounded-full bg-primary p-1 text-3xl'
                        :
                        'absolute left-0 animate-spin top-16 z-50 rounded-full bg-primary p-1 text-3xl'
                } />
            </label>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content mt-10 lg:mt-20">
                        {/* {
                            !isSeller && !isAdmin && */}
                        <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                        {/* }
                        {
                            isSeller &&
                            <> */}
                        <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                        <li><Link to='/dashboard/addProducts'>Add a Product</Link></li>
                        {/* </>
                        }
                        {
                            isAdmin &&
                            <> */}
                        <li><Link to='/dashboard/users/sellers'>All Sellers</Link></li>
                        <li><Link to='/dashboard/users/buyers'>All Buyers</Link></li>
                        <li><Link to='/dashboard/reported'>Reported Items</Link></li>
                        {/* </>
                        } */}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;