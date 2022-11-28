import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import Checkout from './Checkout';
import payBg from '../../../../Assets/backgrounds/paymentBg.png';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const navigation = useNavigation();
    const order = useLoaderData();
    const { productName, oldPrice } = order;
    if (navigation.state === 'loading') {
        return <Spinner />
    }
    console.log(order);
    return (
        <div className='mx-auto'>

            <div className="w-full">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={payBg} className="max-w-sm rounded-lg shadow-2xl" alt='bgImg' />
                    <div>
                        <h2 className='text-3xl font-bold'>Payment for {productName}</h2>
                        <p>Please, pay <span className='badge badge-secondary font-bold'>৳{oldPrice}</span></p>
                        <div className='w-full lg:w-96 my-6 mx-auto'>
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