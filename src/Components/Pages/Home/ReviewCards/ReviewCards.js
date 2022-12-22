import React from 'react';
import ReviewCard from './ReviewCard';
import { useQuery } from '@tanstack/react-query';

const ReviewCards = () => {
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = fetch('http://localhost:5000/reviews');
            const data = await (await res).json();
            return data;
        }
    })
    return (
        <div className='grid lg:grid-cols-2 mb-32 gap-10'>
            {
                reviews.map(singleReview => <ReviewCard
                    key={singleReview._id}
                    singleReview={singleReview}
                />)
            }
        </div>
    );
};

export default ReviewCards;