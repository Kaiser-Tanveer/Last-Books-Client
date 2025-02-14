import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../MyHooks/useToken/useToken';
import { HiOutlineKey, HiOutlineMail } from 'react-icons/hi';
import { ThreeDots } from 'react-loader-spinner';

const SignIn = () => {
    const [formError, setFormError] = useState('');
    const { signIn, reset } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [showAdminInfo, setShowAdminInfo] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [token] = useToken(loggedInEmail);

    if (token) {
        navigate(from, { replace: true });
    }

    //------------------ Submit Handler --------------------//
    const submitHandler = async (data) => {
        setLoading(true);
        try {
            await signIn(data.email, data.password);
            toast.success('Logged in Successfully!');
            setLoggedInEmail(data.email);
        } catch (err) {
            setFormError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //------------------ Password Reset --------------------//
    const handlePasswordReset = async () => {
        try {
            await reset();
            toast.success('Password reset email sent!');
        } catch (err) {
            setFormError(err.message);
        }
    };

    return (
        <div className="hero min-h-screen py-10 mx-auto w-full flex justify-center items-center">
            <div className="grid lg:grid-cols-2 gap-6 w-full max-w-4xl shadow-lg p-8 border border-sky-500 border-opacity-30 rounded-lg">
                <div className="hidden lg:flex flex-col items-center justify-center p-4 border-r border-gray-300">
                    <FaUser className='text-5xl mx-auto text-sky-500' />
                    <h1 className="text-5xl font-bold text-center text-sky-500">Login now!</h1>
                    <p className="py-6">Register Now to Explore Awesome and Special Features</p>
                    <div className='mx-auto'>
                        <button onClick={() => setShowAdminInfo(!showAdminInfo)} className="text-xs text-sky-500 flex items-center justify-center">Admin Login Info ▼</button>
                        {showAdminInfo && (
                            <div className='text-xs p-2 border rounded-md mt-2 bg-gray-100'>
                                <p><HiOutlineMail className='inline mr-1' /> ad@min.com</p>
                                <p><HiOutlineKey className='inline mr-1' /> iamAdmin</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card w-full border-opacity-30 border border-gray-500 shadow-inner shadow-gray-700">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <h2 className='text-4xl font-semibold text-center text-sky-500'>Login</h2>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Your email" className="input input-bordered w-full" />
                                {errors.email && <p className='text-error'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: 'Password is required',
                                    pattern: { value: /(?=.*[a-z])(?=.*[A-Z])/, message: 'Password must contain uppercase and lowercase letters' },
                                    minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                                })} placeholder="Your Password" className="input input-bordered w-full" />
                                {errors.password && <p className='text-error'>{errors.password.message}</p>}
                            </div>
                            <label className="mt-2">Forgot password? <span onClick={handlePasswordReset} className="link-hover link-error cursor-pointer">Reset it</span></label>
                            <button 
                                type="submit" 
                                className='w-full btn mt-8 font-bold bg-sky-500 text-white border-sky-500 hover:bg-sky-500 hover:border-sky-500 shadow-md shadow-gray-700'
                                disabled={loading}>
                                {loading ? <ThreeDots height="20" width="50" color="#ffffff" /> : "Login"}
                            </button>
                            {formError && <p className='text-error'>{formError}</p>}
                            <p>New to Last Book? <Link className='text-sky-500 link-hover mt-3' to='/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
