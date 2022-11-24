import React from 'react';
import Categories from './Categories/Categories';
import Slider from './Slider/Slider';
import WhyUsedBooks from './WhyUsedBooks/WhyUsedBooks';

const Home = () => {
    return (
        <div className='w-5/6 mx-auto'>
            <Slider />
            <Categories />
            <WhyUsedBooks />
        </div>
    );
};

export default Home;