import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../MyHooks/useToken/useToken';
import { ThreeDots } from 'react-loader-spinner';

const Register = () => {
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const { createUser, GoogleLogIn, updateUser } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm('');
    const navigate = useNavigate();
    const [enteredEmail, setEnteredEmail] = useState('');
    const [token] = useToken(enteredEmail);

    if (token) {
        navigate('/');
    }

    // Submit Handler 
    const submitHandler = data => {
        setLoading(true);
        setFormError('');
        createUser(data?.email, data?.password)
            .then(() => {
                toast.success('Registered successfully!');
                const userInfo = { displayName: data?.name };
                updateUser(userInfo)
                    .then(() => saveUser(data.name, data.email, data.role))
                    .catch(err => console.error(err));
            })
            .catch(err => {
                console.error(err);
                setFormError(err.message);
            });
    }

    // Saving User 
    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('https://used-books-server.vercel.app/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(() => {
            setLoading(false);
            setEnteredEmail(email);
        });
    }

    return (
        <div className="hero min-h-screen py-10 mx-auto w-full flex justify-center items-center">
            <div className="grid lg:grid-cols-2 gap-6 w-full max-w-4xl shadow-lg p-8 border border-sky-500 border-opacity-30 rounded-lg">
                {/* Left Section - Sidebar */}
                <div className="hidden lg:flex flex-col items-center justify-center p-4 border-r border-gray-300">
                    <FaUser className='text-6xl text-sky-500 mb-4' />
                    <h1 className="text-3xl font-bold text-center text-sky-500">Register Now!</h1>
                    <p className="text-gray-500 text-sm text-center">Join us and explore amazing features!</p>
                </div>

                {/* Right Section - Form */}
                <div className="w-full md:w-4/5 mx-auto">
                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
                        {/* Role Selection */}
                        <div>
                            <label className="label text-sm">Register As:</label>
                            <select {...register("role", { required: 'Role is required' })} className="select select-bordered w-full text-sm">
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                            <div>
                                <label className="label text-sm">Name</label>
                                <input type="text" {...register("name", { required: 'Name is required' })} className="input input-bordered w-full text-sm" />
                                {errors.name && <p className='text-error text-xs'>{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="label text-sm">Email</label>
                                <input type="email" {...register("email", { required: 'Email is required' })} className="input input-bordered w-full text-sm" />
                                {errors.email && <p className='text-error text-xs'>{errors.email.message}</p>}
                            </div>

                        {/* Password Field */}
                        <div>
                            <label className="label text-sm">Password</label>
                            <input type="password" {...register("password", {
                                required: 'Password is required',
                                pattern: { value: /(?=.*[a-z])(?=.*[A-Z])/, message: 'Must contain Uppercase & Lowercase' },
                                minLength: { value: 6, message: 'Minimum 6 characters' }
                            })} className="input input-bordered w-full text-sm" />
                            {errors.password && <p className='text-error text-xs'>{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className='w-full btn bg-sky-500 text-white hover:bg-sky-600 border border-sky-500'
                            disabled={loading}>
                            {loading ? <ThreeDots height="20" width="50" color="#ffffff" /> : "Register"}
                        </button>

                        {/* Form Error */}
                        {formError && <p className='text-error text-xs text-center'>{formError}</p>}

                        {/* Login Link */}
                        <p className="text-center text-sm">
                            Already have an account? <Link className='text-sky-500' to='/logIn'>Login</Link>
                        </p>

                        {/* Divider */}
                        <div className='divider text-xs'>OR</div>

                        {/* Google Login Button */}
                        <button onClick={() => GoogleLogIn()
                            .then(result => {
                                const user = result.user;
                                saveUser(user.displayName, user.email, 'buyer');
                                navigate('/');
                                toast.success('Signed in Successfully!');
                            })
                            .catch(err => console.error(err))
                        } className='btn border border-sky-500 bg-white text-sky-500 w-full text-sm flex items-center justify-center hover:bg-sky-500 hover:text-white'>
                            <FaGoogle className='text-red-500 text-lg mr-2' /> CONTINUE WITH GOOGLE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
