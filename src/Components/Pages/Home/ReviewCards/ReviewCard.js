import React from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const ReviewCard = ({ singleReview }) => {
    const { customer, rating, email, review, date } = singleReview;
    return (
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-300 bg-gray-50 text-gray-800 shadow-lg">
            <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                    <div>
                        <FaUserCircle className="object-cover w-12 h-12 rounded-full bg-gray-500" />
                    </div>
                    <div>
                        <h4 className="font-bold">{customer}</h4>
                        <span className="text-xs text-gray-600">{date}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-yellow-500">
                    <FaStar />
                    <span className="text-xl font-bold">{rating}</span>
                </div>
            </div>
            <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>{review}</p>
                <p className='text-right'>{email}</p>
            </div>
        </div>
    );
};

export default ReviewCard;