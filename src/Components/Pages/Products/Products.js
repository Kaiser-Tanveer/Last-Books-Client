import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Products = () => {
    const products = useLoaderData({});
    const { classes } = products;
    return (
        <div className='w-5/6 mx-auto py-24 rounded-xl grid grid-cols-1 gap-10'>
            {
                classes.map((product, i) => <ProductCard
                    key={i}
                    product={product}
                />)
            }
        </div>
    );
};

export default Products;