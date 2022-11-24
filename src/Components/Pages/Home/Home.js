import React from 'react';
import Categories from './Categories/Categories';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <div className='w-5/6 mx-auto'>
            Total Categories:
            <Slider />
            <Categories />
        </div>
    );
};

export default Home;