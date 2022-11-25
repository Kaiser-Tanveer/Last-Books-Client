import React from 'react';

const ProductCard = ({ product }) => {
    const { book, title, img, newPrice, oldPrice, used, details } = product;
    console.log(product);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={img} className="rounded-lg max-w-[300px] shadow-2xl" alt='bookImg' />
                <div className='lg:w-[480px] mx-auto text-center'>
                    <h1 className="text-4xl font-bold">{book}</h1>
                    <h1 className="text-2xl font-bold">{title}</h1>

                    <p className="py-6 w-1/2 mx-auto">{details}</p>

                    <div className='grid md:grid-cols-3'>
                        <h4>Regular Price: ৳<del>{newPrice}</del></h4>
                        <h4>Used Time: {used}</h4>
                        <h4>Discount Price: ৳{oldPrice}</h4>
                    </div>
                    <label htmlFor="booking-modal" className="btn btn-success mt-10">PURCHASE</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;