import React from 'react';
import './SliderItems.css';

const SliderItems = ({ slider }) => {
    const { image, id, prev, next } = slider;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='banner-img'>
                <img src={image} className="w-full img-fluid rounded-xl" alt='' />
            </div>
            <div className="absolute flex transform -translate-y-1/2 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
            <div className="absolute flex transform -translate-y-1/2 left-24 top-1/3">
                <h1 className='text-white text-6xl text-left font-bold hidden md:block'>Find the Cheapest<br />
                    Books Ever
                </h1>
            </div>
            <div className="absolute w-2/5 text-left flex transform -translate-y-1/2 left-24 top-1/3 lg:top-1/2">
                <p className='md:hidden lg:block text-xl text-white'>You can get The Used Books in water price <span className='hidden lg:inline'> in our Book House</span></p>
            </div>
        </div>
    );
};

export default SliderItems;