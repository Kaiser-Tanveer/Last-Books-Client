import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div>
            <h2 className='text-3xl font-bold py-10'>Get Books for Primary Secondary and Intermediate</h2>
            <Link onClick='/category' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    />)
                }
            </Link>
        </div>
    );
};

export default Categories;