import React, { useContext } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Footer = () => {
    const { user } = useContext(AuthContext);
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <div>
                <Link className='btn btn-ghost normal-case text-4xl font-bold'>LastBooks</Link>
                <p>&copy; by Kaiser Tanveer, 2022</p>
            </div>
            <div>
                <span className="footer-title">Social Contact</span>
                <div className="grid grid-flow-col gap-4">
                    <a className='text-3xl' href='https://web.facebook.com/Kaiser2581' target='_blank'><FaFacebook /></a>
                    <a className='text-3xl' href='https://twitter.com/KaiserTanveer' target='_blank'><FaTwitter /></a>
                    <a className='text-3xl' href='https://www.linkedin.com/in/kaiser-tanveer/' target='_blank'><FaLinkedin /></a>
                    <a className='text-3xl' href='https://www.instagram.com/kaisertanveer2581/' target='_blank'><FaInstagram /></a>
                </div>
            </div>
            <div>
                <h4 className='text-2xl font-bold'>{user?.displayName}</h4>
                <p>{user?.email}</p>
            </div>
        </footer>
    );
};

export default Footer;