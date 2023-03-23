import React from 'react';
import './SliderItems.css';
import { Link } from 'react-router-dom';

const SliderItems = ({ slider }) => {
    const { image, id, prev, next } = slider;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='banner-img'>
                <img src={image} className="w-full min-h-screen img-fluid rounded-xl" alt='bannerImg' />
            </div>
            <div className='absolute hidden lg:block container mx-auto top-[25%] left-[10%] w-[65vw] lg:h-[50vh] rounded-lg border-4 border-gray-400 border-opacity-70'>
                <div className='relative h-[90%] w-[97%] mx-auto mt-[2%] bg-opacity-70 bg-gray-700 rounded-lg'>
                    <Link to="logIn" className='absolute bottom-0 right-0 text-xl font-bold bg-sky-500 lg:h-[100%] items-center flex px-6 rounded-r-lg bg-opacity-70'><span className='border-2 border-gray-200 text-gray-100 uppercase hover:scale-110 hover:text-error hover:border-error rounded-md p-2 duration-500'>continue</span></Link>
                </div>
            </div>
            <div className="">
                <a href={`#slide${prev}`} className="absolute bottom-1/2 btn btn-circle left-0 z-40 -ml-6">❮</a>
                <a href={`#slide${next}`} className="absolute bottom-1/2 btn btn-circle right-0 z-40 -mr-6">❯</a>
            </div>
            <div className="absolute flex transform -translate-y-1/2 left-[10%] md:left-[16%] top-[30%] md:top-[42%]">
                <h1 className='text-white text-5xl md:text-6xl text-left font-bold'>Find the Cheapest<br />
                    Books Ever
                </h1>
            </div>
            <div className="absolute w-[70%] text-left flex transform -translate-y-1/2 left-[10%] md:left-[16%] top-2/4 md:top-[55%] lg:top-[60%]">
                <p className='text-xl text-white'>You can get The Used Books in water price <span className='hidden lg:inline'> in our Book House</span></p>
            </div>
        </div>
    );
};

export default SliderItems;