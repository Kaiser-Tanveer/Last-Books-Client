import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formError, setFormError] = useState('');
    const { createUser, GoogleLogIn, updateUser } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm('');
    const navigate = useNavigate();

    // Submit Handler 
    const submitHandler = data => {
        setFormError('');
        console.log(data);
        createUser(data?.email, data?.password)
            .then(result => {
                const user = result?.user;
                console.log(user);
                toast.success('Registered successfully!');
                const userInfo = {
                    displayName: data?.name
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => {
                console.error(err);
                setFormError(err.message);
            });
    }
    // // Saving User 
    const saveUser = (name, email) => {
        const user = { name, email };
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/');
            })
    };

    return (
        <div className="hero min-h-screen py-24 mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="text-center lg:text-left">
                    <FaUser className='text-5xl mx-auto' />
                    <h1 className="text-5xl font-bold text-center">Register now!</h1>
                    <p className="py-6">Register Now to Explore Awesome and Special Features</p>
                </div>
                <div className="card w-full shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div>
                                <label className="label">
                                    <span className="label-text">Select what you're Registering for:</span>
                                </label>
                                <select {...register("role", { required: 'role is required' })} placeholder="Register as Seller/Buyer" className="select select-bordered w-full">
                                    <option value="seller">Seller</option>
                                    <option value="buyer">Buyer</option>
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: 'Name is required' })} placeholder="Your Name" className="input input-bordered w-full" />
                                {errors.name && <p className='text-error'>{errors.name.message}</p>}
                            </div>
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
                            <input type="submit" value='Register' className='w-full btn mt-8 font-bold' />
                            <p className='text-error'>{formError}</p>
                            <p>Already have an account? Please, <Link className='link-hover text-blue-500 mt-3' to='/logIn'>Login</Link></p>
                            <div className='divider'>OR</div>
                            <button onClick={() => GoogleLogIn()
                                .then(result => {
                                    const user = result.user;
                                    console.log(user);
                                    navigate('/')
                                    toast.success('Signed in Successfully!')
                                })
                                .then(err => console.error(err))
                            } className='btn btn-outline w-full'><FaGoogle className='mx-5 font-bold' />CONTINUE WITH GOOGLE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;