import React from 'react';
import './ProductCard.css';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';

const ProductCard = ({ product, setModalData }) => {
    const { book, title, location, name, img, newPrice, oldPrice, used, details } = product;

    return (
        <div className="hero w-[350px] mx-auto h-[450px] p-4 bg-gray-100 shadow-inner shadow-sky-700 rounded-md overflow-hidden relative group">
            <div className="hero-content flex-col lg:flex-row card-inner">
                <img src={img} className="card-front rounded-lg max-w-[300px] duration-700 absolute w-[300px] h-[400px] border-2 border-gray-200 shadow-lg shadow-gray-700" alt='bookImg' />
                <div className='card-back border border-sky-500 shadow-lg shadow-gray-700 bg-gray-50 px-4'>
                    <h1 className="text-3xl text-sky-500 pt-4 font-bold">{book}</h1>
                    <h1 className="text-2xl">{title}</h1>
                    <p className="py-4 w-full mx-auto text-justify-full">{details.length > 60 ? details.slice(0, 60) + "..." : details}</p>
                    <div className='grid grid-cols-12 gap-4'>
                        <article className='col-span-4 font-bold'>
                            <p className='flex items-center justify-between'><span>Seller</span>:</p>
                            <p className='flex items-center justify-between'><HiOutlineLocationMarker />:</p>
                        </article>
                        <article className='col-span-8 text-left'>
                            <p>{name}</p>
                            <p>{location}</p>
                        </article>
                    </div>
                    <div className='mt-8 flex items-center justify-between mb-8 border-y-2 border-sky-500'>
                        <h4 className='flex items-center'>
                        <span className='text-xl'>৳:</span> 
                        <span className='text-orange-500 line-through ml-1'>{`(${newPrice})`}</span> 
                        <span className='text-orange-500 text-xl ml-1'>{oldPrice}</span>
                        </h4>
                        <h4 className='flex items-center'> <HiOutlineClock className='text-xl font-bold'/>: <span className='text-orange-500 text-normal ml-1'> {used}</span></h4>
                    </div>
                    <label onClick={() => setModalData(product)} htmlFor="booking-modal" className="absolute bottom-6 left-[30%] hover:shadow-inner shadow-lg shadow-gray-700 hover:shadow-gray-700 text-sky-500 hover:text-gray-700 py-2 px-4 font-semibold border hover:border-gray-500 border-sky-500 rounded-md duration-500 ease-in-out cursor-pointer">PURCHASE</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;