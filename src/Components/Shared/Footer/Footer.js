import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Footer = () => {
    const { user } = useContext(AuthContext);
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div>
                <Link className='btn btn-ghost normal-case text-4xl font-bold'>LastBooks</Link>
                <p>&copy; by Kaiser Tanveer, 2022</p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <Link className="link link-hover">Branding</Link>
                <Link className="link link-hover">Design</Link>
                <Link className="link link-hover">Marketing</Link>
                <Link className="link link-hover">Advertisement</Link>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <Link className="link link-hover">About us</Link>
                <Link className="link link-hover">Contact</Link>
                <Link className="link link-hover">Jobs</Link>
                <Link className="link link-hover">Press kit</Link>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <Link className="link link-hover">Terms of use</Link>
                <Link className="link link-hover">Privacy policy</Link>
                <Link className="link link-hover">Cookie policy</Link>
                <Link className="link link-hover">{user?.email}</Link>
            </div>
        </footer>
    );
};

export default Footer;