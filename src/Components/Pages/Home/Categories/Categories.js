import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('booksCategories.json')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
                categories.map(category => <CategoryCard
                    key={category.id}
                    category={category}
                />)
            }
        </div>
    );
};

export default Categories;