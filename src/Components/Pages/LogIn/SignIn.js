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
    const { user, signIn, reset } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [token] = useToken(loggedInEmail);

    if (token) {
        navigate(from, { replace: true });
    }

    //------------------ Submit Handler --------------------//
    const submitHandler = data => {
        setLoading(true);
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                setLoading(false);
                toast.success('Logged in Successfully!!');
                setLoggedInEmail(data.email);
            })
            .catch(err => {
                console.error(err.message);
                setFormError(err.message);
            })
    }

    //--------------- Password Reset ---------------------//


    return (
        <div className="hero min-h-screen py-24 mx-auto lg:w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="text-center lg:text-left">
                    <FaUser className='text-5xl mx-auto text-sky-500' />
                    <h1 className="text-5xl font-bold text-center text-sky-500">Login now!</h1>
                    <p className="py-6">Register Now to Explore Awesome and Special Features</p>
                    <p><strong>Role as an Admin</strong>
                        <div className='flex items-center my-4'>
                            <HiOutlineMail className='mr-2' /> <span className='border rounded-md px-2 border-primary'>ad@min.com</span> <br />
                        </div>
                        <div className='flex items-center'>
                            <HiOutlineKey className='mr-2' /> <span className='border rounded-md px-2 border-primary'>iamAdmin</span>
                        </div>
                    </p>
                </div>
                <div className="card w-full border-opacity-30 border border-sky-500 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <h2 className='text-4xl font-semibold text-center text-sky-500'>Login</h2>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Your email" className="input input-bordered w-full" />
                                {errors.email && <p className='text-sky-500'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: 'Password is required',
                                    pattern: { value: /(?=.*[a-z])(?=.*[A-Z])/, message: 'Password must contain Uppercase and LowerCase' },
                                    minLength: { value: 6, message: 'Password must be 6 characters or long' }
                                })} placeholder="Your Password" className="input input-bordered w-full" />
                                {errors.password && <p className='text-sky-500'>{errors.password.message}</p>}
                            </div>
                            <label>forgotten password? <span onClick={reset(user?.email)
                                .then(() => { })
                                .then(err => console.error(err))
                            } className="link-hover link-error">reset it</span></label>
                            <button 
                                type="submit" 
                                className='w-full btn mt-8 font-bold bg-sky-500 text-white border-sky-500 hover:bg-sky-500 hover:border-sky-500'
                                disabled={loading}>
                                {loading ? <ThreeDots height="20" width="50" color="#ffffff" /> : "Login"}
                            </button>
                            <p className='text-sky-500'>{formError}</p>
                            <p>New to Last Book? <Link className='text-sky-500 link-hover mt-3' to='/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;