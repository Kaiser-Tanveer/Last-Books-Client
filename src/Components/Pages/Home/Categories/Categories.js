import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import CategoryCard from './CategoryCard';

const Categories = () => {
    // Loading data using useQuery
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = fetch('https://used-books-server.vercel.app/categories');
            const data = (await res).json();
            return data;
        }
    })
    return (
        <div className='pt-14'>
            <h2 className='text-5xl font-bold py-10'>Get Books for <span className='text-orange-600'>
                <Typewriter
                    words={['Primary Secondary and Intermediate']}
                    loop={''}
                    cursor
                    cursorStyle='|'
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    categories?.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    />)
                }
            </div>
        </div>
    );
};

export default Categories;