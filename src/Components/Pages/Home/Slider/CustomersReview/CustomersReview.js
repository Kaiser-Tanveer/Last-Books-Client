import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../../../../Contexts/AuthProvider/AuthProvider';

const CustomersReview = () => {
    const { user } = useContext(AuthContext);

    const [value, setValue] = useState(0)

    const starts = Array(5).fill(0);

    const clickHandler = num => {
        setValue(num);
    };

    const submitHandler = e => {
        e.preventDefault();
        const review = e.target.review.value;
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
        }

        fetch('http://used-books-server.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
        e.target.review.value = '';
    }

    return (
        <div className="flex flex-col max-w-xl p-8 shadow-lg mb-32 mx-auto rounded-xl lg:p-12 bg-gray-50 text-gray-800">
            <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-center">How was your experience?</span>
                    <div className='rating'>
                        {
                            starts.map((_, i) => {
                                return <div>
                                    <FaStar
                                        key={i}
                                        className={
                                            value <= (i) ?
                                                "mx-1 text-3xl text-gray-500"
                                                :
                                                "mx-1 text-3xl text-orange-500"
                                        }
                                        onClick={() => clickHandler(i + 1)}
                                        // onMouseOver={() => mouseOverHandler(i + 1)}
                                        // onMouseLeave={mouseLeaveHandler}
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>
                <form onSubmit={submitHandler} className="flex flex-col w-full">
                    <textarea rows="3" placeholder="Message..." name='review' className="p-4 rounded-md resize-none text-gray-800 bg-gray-50 border-2 border-primary"></textarea>
                    { user? 
                    <button type="submit" className="py-4 my-8 font-semibold rounded-md text-gray-50 bg-primary">Leave feedback</button>
                    :
                    <button type="submit" className="py-4 my-8 font-semibold rounded-md text-gray-50 bg-gray-300" disabled>Leave feedback</button>
                    }
                </form>
            </div>
            <div className="flex items-center justify-center">
                <button className='btn btn-ghost w-full rounded-md'>Maybe later</button>
            </div>
        </div>
    );
};

export default CustomersReview;