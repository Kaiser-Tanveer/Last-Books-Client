import React from 'react';
import ReviewCard from './ReviewCard';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { HiOutlineChat } from 'react-icons/hi';

const ReviewCards = () => {
    const navigation = useNavigation();
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = fetch('https://used-books-server.vercel.app/reviews');
            const data = await (await res).json();
            return data;
        }
    })
    if (navigation.state === 'loading') {
        return <Spinner />
    }
    return (
        <div className='container mx-auto'>
            <h2 className='flex items-center font-bold text-3xl pb-6'><HiOutlineChat className='mr-1' /> Reviews</h2>
            <div className='grid lg:grid-cols-2 mb-32 gap-10'>
                {
                    reviews.map(singleReview => <ReviewCard
                        key={singleReview._id}
                        singleReview={singleReview}
                    />)
                }
            </div>
        </div>
    );
};

export default ReviewCards;