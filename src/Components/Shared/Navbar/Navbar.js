import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import logo from '../../../Assets/logo/icons8-open-book.gif';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    // logOutHandler
    const logOutHandler = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err));
    };

    // MenuItems variable 
    const menuItems = <>
        <li>
            <NavLink to='/' className={({ isActive }) => isActive ? "rounded-md text-sky-500 font-bold" : "rounded-md"}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? "rounded-md text-sky-500 font-bold" : "rounded-md"}>
                Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink to='/blog' className={({ isActive }) => isActive ? "rounded-md text-sky-500 font-bold" : "rounded-md"}>
                Blog
            </NavLink>
        </li>
    </>
    return (
        <div className="navbar glass fixed mx-auto z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case font-bold text-2xl text-sky-500">
                    <img src={logo} alt="logoImg" className='w-10' />
                    <span>LastBooks</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className='group p-[2px] rounded-lg hover:scale-110 duration-500 border-2 border-orange-500 ease-in-out hover:bg-orange-500 hover:text-white hover:border-white'>
                            <button onClick={logOutHandler} className='flex items-center text-orange-500 group-hover:text-white rounded-md px-2 border-0 mx-auto duration-500 ease-in-out lg:mr-0'><HiOutlineLogout className='font-bold text-xl mr-1' /> Logout</button>
                        </div>
                        :
                         
                        <div className='group p-[2px] rounded-lg hover:scale-110 duration-500 border-2 border-sky-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-white'>
                            <Link className="flex items-center text-sky-500 group-hover:text-white rounded-md px-2 border-0 mx-auto duration-500 ease-in-out lg:mr-0" to='/register'><HiOutlineLogin className='font-bold text-xl mr-1' /> Register</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;