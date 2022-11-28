import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

const ProductCard = ({ product, setModalData }) => {
    const { book, title, location, name, img, newPrice, oldPrice, used, details } = product;

    return (
        <div className="hero min-h-screen bg-base-200 rounded-md shadow-lg">
            <div className="hero-content flex-col lg:flex-row">
                <img src={img} className="rounded-lg max-w-[300px] shadow-2xl" alt='bookImg' />
                <div className='lg:w-[480px] mx-auto text-center'>
                    <h1 className="text-4xl font-bold">{book}</h1>
                    <h1 className="text-2xl font-bold">{title}</h1>

                    <p className="py-6 w-1/2 mx-auto">{details}</p>
                    <h3 className='text-xl font-bold flex justify-center'>Seller: <span className='uppercase'>{name} </span></h3>

                    <p className='flex items-center justify-center'><HiLocationMarker /> {location}</p>
                    <div className='grid md:grid-cols-3'>
                        <h4>Regular Price: ৳<del>{newPrice}</del></h4>
                        <h4>Used Time: {used}</h4>
                        <h4>Discount Price: ৳{oldPrice}</h4>
                    </div>
                    <label onClick={() => setModalData(product)} htmlFor="booking-modal" className="btn btn-success mt-10">PURCHASE</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;