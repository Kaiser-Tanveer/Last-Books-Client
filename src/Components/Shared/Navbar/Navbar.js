import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);

    // logOutHandler
    const logOutHandler = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err));
    };

    // MenuItems variable 
    const menuItems = <>
        <li><NavLink className='rounded-md' to='/'>Home</NavLink></li>

        <li><NavLink className='rounded-md' to='/dashboard'>Dashboard</NavLink></li>

        <li><NavLink className='rounded-md' to='/blog'>Blog</NavLink></li>
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
                <Link className="btn btn-ghost normal-case font-bold text-2xl">LastBooks</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className='hover:bg-gradient-to-r from-pink-500 to-yellow-500 p-[2px] rounded-lg hover:scale-125 duration-500 ease-in-out'>
                            <button onClick={logOutHandler} className='flex hover:bg-gray-100 items-center text-error rounded-md px-2 border-0 mx-auto lg:mr-0'><HiOutlineLogout className='font-bold text-xl mr-1' /> Logout</button>
                        </div>
                        :
                        <div className='hover:bg-gradient-to-r from-primary to-secondary p-[2px] rounded-lg hover:scale-125 duration-500 ease-in-out'>
                            <Link className="flex hover:bg-gray-100 text-primary items-center px-2 border-0 mr-auto lg:mr-0 rounded-md" to='/register'><HiOutlineLogin className='font-bold text-xl mr-1' /> Register</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;