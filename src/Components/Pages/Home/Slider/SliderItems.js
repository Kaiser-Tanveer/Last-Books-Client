import React, { useState } from 'react';
import './SliderItems.css';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const SliderItems = ({ slider }) => {
    const { image, id, prev, next } = slider;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/logIn'); // Navigate after 1 second
        }, 1000);
    };

    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='banner-img'>
                <img src={image} className="w-full min-h-screen img-fluid rounded-xl" alt='bannerImg' />
            </div>
            <div className='absolute hidden lg:block container mx-auto top-[25%] left-[10%] w-[65vw] lg:h-[50vh] rounded-lg border-4 border-gray-400 border-opacity-70'>
                <div className='relative h-[90%] w-[97%] mx-auto mt-[2%] bg-opacity-70 bg-gray-700 rounded-lg'>
                    <button 
                        onClick={handleContinue} 
                        className='absolute bottom-0 right-0 text-xl font-bold bg-sky-500 lg:h-[100%] items-center flex px-6 rounded-r-lg bg-opacity-70'
                    >
                            <span className='border-2 border-gray-200 text-gray-100 uppercase hover:scale-105 rounded-md p-2 duration-500'>
                                {
                                    loading ?
                                    <ThreeDots height="26" width="103" color="#ffffff" />
                                    :
                                    "Continue"
                                }
                            </span>
                    </button>
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
