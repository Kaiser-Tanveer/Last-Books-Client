import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import CategoryCard from './CategoryCard';

const Categories = () => {
    // Loading data using useQuery
    const { data: categories = [], status, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = fetch('https://used-books-server.vercel.app/categories');
            const data = (await res).json();
            return data;
        }
    })
    console.log(status.loading);
    return (
        <div className='container mx-auto pt-14'>
            <h2 className='text-5xl font-bold py-10'>Books of <span className='text-orange-600'>
                <Typewriter
                    words={["Primary", "Secondary", "Intermediate"]}
                    loop={''}
                    cursor
                    cursorStyle='|'
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto'>
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