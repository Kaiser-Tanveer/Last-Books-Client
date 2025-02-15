import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';

const Checkout = ({ order, refetchOrders }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [trxId, setTrxId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [zipCode, setZipCode] = useState('');

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(trxId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

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
                        email: email,
                        address: {
                            postal_code: zipCode,
                        },
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
                        setSuccess('Payment completed!');
                        setTrxId(paymentIntent.id);

                        // Update order as paid in the database
                        fetch(`https://used-books-server.vercel.app/bookings/${_id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ paid: true })
                        })
                            .then(res => {
                                if (!res.ok) {
                                    // If response is not OK, log the response text to debug
                                    return res.text().then(text => {
                                        console.error('Error response:', text);
                                        throw new Error(`HTTP error! Status: ${res.status}`);
                                    });
                                }
                                return res.json();
                            })
                            .then(updatedOrder => {
                                // Refetch orders to show updated status
                                refetchOrders();
                            })
                            .catch(error => {
                                console.error('Fetch error:', error);
                            });

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

                <div className="mt-3 flex gap-2">
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

                {/* CVC */}
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

                {/* Zip Code */}
                <div className="border border-gray-300 p-2 rounded w-1/3 flex items-center">
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full"
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
                    <p className='text-sky-500 text-center'>{success}</p>
                    <div className="flex items-center gap-2">
                        <p className="flex items-center">
                            <span className='font-semibold mr-1'>Trx ID:</span> {trxId.length > 10 ? `${trxId.slice(0, 10)}...` : trxId}
                        </p>

                        {/* Copy Button */}
                        <button 
                            onClick={copyToClipboard} 
                            className="p-1 bg-gray-200 hover:bg-gray-300 rounded block ml-auto cursor-pointer"
                            title="Copy Transaction ID"
                        >
                            <Copy size={16} />
                        </button>

                        {/* Copied Message */}
                        {copied && <span className="text-sky-500 text-sm">Copied!</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
