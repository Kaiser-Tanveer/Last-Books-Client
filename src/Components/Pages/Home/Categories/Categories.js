import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])
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
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    />)
                }
            </div>
        </div>
    );
};

export default Categories;