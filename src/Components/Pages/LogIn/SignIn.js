import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formError, setFormError] = useState('');
    const { signIn } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    // Submit Handler 
    const submitHandler = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Logged in Successfully!!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err.message);
                setFormError(err.message);
            })
    }

    return (
        <div className="hero min-h-screen py-24 mx-auto lg:w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="text-center lg:text-left">
                    <FaUser className='text-5xl mx-auto' />
                    <h1 className="text-5xl font-bold text-center">Login now!</h1>
                    <p className="py-6">Register Now to Explore Awesome and Special Features</p>
                </div>
                <div className="card w-full shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <h2 className='text-4xl font-semibold text-center'>Login</h2>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: 'Email is required' })} placeholder="Your email" className="input input-bordered w-full" />
                                {errors.email && <p className='text-error'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: 'Password is required',
                                    pattern: { value: /(?=.*[a-z])(?=.*[A-Z])/, message: 'Password must contain Uppercase and LowerCase' },
                                    minLength: { value: 6, message: 'Password must be 6 characters or long' }
                                })} placeholder="Your Password" className="input input-bordered w-full" />
                                {errors.password && <p className='text-error'>{errors.password.message}</p>}
                            </div>
                            <input type="submit" value='Login' className='w-full btn mt-8 font-bold' />
                            <p className='text-error'>{formError}</p>
                            <p>New to Last Book? Please, <Link className='text-blue-500 link-hover mt-3' to='/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;