import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import Checkout from './Checkout';

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
        <div className='w-4/5 mx-auto'>
            <h2 className='text-3xl font-bold'>Payment for {productName}</h2>
            <p>Please, pay <span className='badge badge-secondary font-bold'>৳{oldPrice}</span></p>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <Checkout
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;