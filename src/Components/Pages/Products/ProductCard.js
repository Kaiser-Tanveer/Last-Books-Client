import React from 'react';
import { HiArrowCircleDown, HiLocationMarker } from 'react-icons/hi';

const ProductCard = ({ product, setModalData }) => {
    const { book, title, location, name, img, newPrice, oldPrice, used, details } = product;

    return (
        <div className="hero w-5/6 mx-auto h-[500px] bg-base-200 rounded-md shadow-lg group-hover:cursor-pointer group-hover:blur-sm hover:!blur-none overflow-hidden relative hover:[my-group:translate-y-0]">
            <div className="hero-content flex-col lg:flex-row">
                <img src={img} className="rounded-lg max-w-[300px] hover:rotate-[360deg] duration-700 shadow-2xl absolute hover:scale-125" alt='bookImg' />
                <div className='mx-auto px-5 text-center absolute bg-black/40 h-full w-full text-gray-50 -mb-[800px] group-hover:!mb-0 duration-700 z-50 shadow-lg rounded-lg'>
                    <HiArrowCircleDown className='text-6xl rounded-full p-2 border-2 animate-pulse -ml-4 border-success text-success group-hover:-mt-0 duration-500 group-hover:scale-0' />
                    <h1 className="text-4xl font-bold">{book}</h1>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="py-6 w-full mx-auto">{details}</p>
                    <h3 className='text-xl font-bold flex justify-center'>Seller: <span className='uppercase'>{name} </span></h3>

                    <p className='flex items-center justify-center'><HiLocationMarker /> {location}</p>
                    <div className='grid grid-cols-3 gap-3'>
                        <h4>Regular Price: <del><span className='text-error text-xl'>৳{newPrice}</span></del></h4>
                        <h4>Used Time: <span className='text-error text-xl'>{used}</span></h4>
                        <h4>Discount Price: <span className='text-error text-xl'>৳{oldPrice}</span></h4>
                    </div>
                    <label onClick={() => setModalData(product)} htmlFor="booking-modal" className="btn btn-success mt-10">PURCHASE</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;