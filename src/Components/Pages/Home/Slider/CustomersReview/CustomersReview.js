import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../../../../Contexts/AuthProvider/AuthProvider';
import { ThreeDots } from 'react-loader-spinner';

const CustomersReview = () => {
    const { user } = useContext(AuthContext);

    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [reviewText, setReviewText] = useState("");

    const stars = Array(5).fill(0);

    const clickHandler = num => {
        setValue(num);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
    
        setTimeout(() => {
            const review = reviewText.trim();
            const currentDate = new Date();
            const date = currentDate.toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });
    
            const reviewData = {
                customer: user.displayName,
                email: user.email,
                review,
                rating: value,
                date
            };
    
            fetch('https://used-books-server.vercel.app/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
            .then(res => res.json())
            .then(() => {
                setLoading(false);
                setReviewText("");
                setValue(0);
            })
            .catch(error => {
                console.error("Error submitting review:", error);
                setLoading(false);
            });
    
        }, 1000);
    };
    

    const handleMaybeLater = () => {
        setStatus(true);
        setValue(0);
        setReviewText("");
    };

    return (
        <div className="flex flex-col max-w-xl p-8 shadow-lg mb-32 mx-auto rounded-xl lg:p-12 bg-gray-50 text-gray-800">
            <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-center">How was your experience?</span>
                    <div className='rating'>
                        {stars.map((_, i) => (
                            <FaStar
                                key={i}
                                className={
                                    value <= i
                                        ? "mx-1 text-3xl text-gray-500"
                                        : "mx-1 text-3xl text-orange-500"
                                }
                                onClick={() => clickHandler(i + 1)}
                            />
                        ))}
                    </div>
                </div>
                <form onSubmit={submitHandler} className="flex flex-col w-full">
                    <textarea 
                        rows="3" 
                        placeholder="Message..." 
                        name="review" 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)}
                        className="p-4 rounded-md resize-none text-gray-800 bg-gray-50 border-2 border-primary"
                    >

                    </textarea>
                    {user ? (
                        <button
                            type="submit"
                            className={`rounded-md text-gray-50 bg-primary flex items-center justify-center ${
                                loading ? "h-12 my-8 w-full" : "py-4 my-8 font-semibold"
                            }`}
                            disabled={!reviewText.trim() || loading}
                        >
                            {loading ? (
                                <ThreeDots
                                    visible={true}
                                    height="30"
                                    width="30"
                                    color="#ffffff"
                                    ariaLabel="three-dots-loading"
                                />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="py-4 my-8 font-semibold rounded-md text-gray-50 bg-gray-300"
                            disabled
                        >
                            Leave feedback
                        </button>
                    )}
                </form>
            </div>
            <div className="flex items-center justify-center">
                <button 
                    onClick={handleMaybeLater} 
                    className='btn btn-ghost w-full rounded-md bg-gray-100'
                >
                    Maybe later
                </button>
            </div>
        </div>
    );
};

export default CustomersReview;
