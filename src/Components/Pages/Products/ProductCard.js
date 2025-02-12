import React from 'react';
import './ProductCard.css';
import { HiLocationMarker } from 'react-icons/hi';

const ProductCard = ({ product, setModalData }) => {
    const { book, title, location, name, img, newPrice, oldPrice, used, details } = product;

    return (
        <div className="hero w-[350px] mx-auto h-[450px] p-4 bg-gray-100 shadow-inner shadow-gray-700 rounded-md cursor-pointer overflow-hidden relative group">
            <div className="hero-content flex-col lg:flex-row card-inner">
                <img src={img} className="card-front rounded-lg max-w-[300px] duration-700 absolute w-[300px] h-[400px] border-2 border-gray-200 shadow-lg shadow-gray-700" alt='bookImg' />
                <div className='card-back border border-gray-500 shadow-lg shadow-gray-700'>
                    <h1 className="text-3xl text-sky-500 pt-4 font-bold">{book}</h1>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="py-4 w-full mx-auto">{details.length > 60 ? details.slice(0, 60) + "..." : details}</p>
                    <h3 className='text-xl font-bold flex justify-center'>Seller: <span className='uppercase'>{name} </span></h3>

                    <p className='flex items-center mb-4 justify-center'><HiLocationMarker /> {location}</p>
                    <div className='grid grid-cols-3 gap-3 mb-8 border-y-2 border-sky-500'>
                        <h4>Regular Price: <del><span className='text-error text-xl red'>৳{newPrice}</span></del></h4>
                        <h4>Used Time: <span className='text-error text-xl'>{used}</span></h4>
                        <h4>Discount Price: <span className='text-error text-xl'>৳{oldPrice}</span></h4>
                    </div>
                    <label onClick={() => setModalData(product)} htmlFor="booking-modal" className="absolute bottom-6 left-[30%] shadow-inner hover:shadow-lg hover:shadow-gray-700 hover:text-primary-focus shadow-gray-700 py-2 px-4 font-semibold border border-gray-500 bg-gray-300 hover:bg-gray-100 rounded-md duration-500">PURCHASE</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;