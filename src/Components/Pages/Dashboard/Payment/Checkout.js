import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';

const Checkout = ({ order }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [trxId, setTrxId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const { productName, email, oldPrice, _id } = order;

    useEffect(() => {
        fetch("https://used-books-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ oldPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [oldPrice]);

    const submitHandler = async e => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardNumberElement);
        if (card === null) return;

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: productName,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            const payment = {
                oldPrice,
                trxId: paymentIntent.id,
                email,
                orderId: _id,
            };

            fetch('https://used-books-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.success('Payment successful!');
                        setSuccess('Your payment completed successfully!');
                        setTrxId(paymentIntent.id);
                    }
                });

            setProcessing(false);
        }
    };

    return (
        <div>
            <form className='mt-10' onSubmit={submitHandler}>
                {/* Card Number (Full Width) */}
                <div className="border border-gray-300 p-2 rounded w-full flex items-center">
                    <CardNumberElement
                        options={{
                            placeholder: "Card Number",
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#9e2146' },
                            },
                        }}
                        className="w-full"
                    />
                </div>

                {/* Second Row: Expiry Date, CVC, ZIP Code */}
                <div className="flex gap-2 mt-3">
                    {/* Expiry Date */}
                    <div className="border border-gray-300 p-2 rounded w-1/3 flex items-center">
                        <CardExpiryElement
                            options={{
                                placeholder: "MM/YY",
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#9e2146' },
                                },
                            }}
                            className="w-full"
                        />
                    </div>

                    {/* CVC Code */}
                    <div className="border border-gray-300 p-2 rounded w-1/3 flex items-center">
                        <CardCvcElement
                            options={{
                                placeholder: "CVC",
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#9e2146' },
                                },
                            }}
                            className="w-full"
                        />
                    </div>

                    {/* ZIP Code (Input Field) */}
                    <div className="border border-gray-300 p-2 rounded w-1/3 flex items-center">
                        <input
                            type="text"
                            placeholder="ZIP"
                            className="w-full outline-none bg-transparent"
                        />
                    </div>
                </div>

                <button 
                    className='btn btn-sm btn-error text-white mt-5 w-full bg-[#516bb8] border border-[#516bb8] shadow-lg shadow-gray-700' 
                    type="submit" 
                    disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? <ThreeDots height="18" width="46" color="#ffffff" /> : "Pay"}
                </button>
            </form>

            {/* Error Message */}
            {cardError && <p className='text-error mt-2'>{cardError}</p>}

            {/* Success Message */}
            {success && (
                <div className="mt-4">
                    <p className='text-primary'>{success}</p>
                    <p className='font-bold'>Transaction ID: {trxId}</p>
                </div>
            )}
        </div>
    );
};

export default Checkout;
