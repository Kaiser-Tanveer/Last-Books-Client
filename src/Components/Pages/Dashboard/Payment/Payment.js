import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import Checkout from './Checkout';
import payBg from '../../../../Assets/backgrounds/paymentBg.png';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const Payment = () => {
    const navigation = useNavigation();
    const order = useLoaderData();
    const { productName, oldPrice } = order;
    if (navigation.state === 'loading') {
        return <Spinner />
    }

    return (
        <div className='mx-auto md:w-4/5 md:mt-24 rounded-lg md:border-2 border-gray-500 shadow-2xl shadow-gray-700 md:bg-transparent md:bg-gradient-to-r md:from-[#516bb8] md:to-[#496ebf]'>
            <div className="w-full">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={payBg} className="max-w-sm rounded-lg" alt='bgImg' />
                    <div className='bg-white p-6 h-96 rounded-xl shadow-inner border-2 border-gray-500 shadow-gray-700'>
                        <h2 className='text-2xl font-bold'>Payment for {productName}</h2>
                        <p>Please, pay <span className='badge badge-error font-bold text-white'>৳{oldPrice}</span></p>
                        <div className='w-full my-6 mx-auto'>
                            <Elements stripe={stripePromise}>
                                <Checkout
                                    order={order}
                                />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Payment;