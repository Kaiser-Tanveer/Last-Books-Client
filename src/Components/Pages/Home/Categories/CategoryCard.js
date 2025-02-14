import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../../../../Assets/backgrounds/book.png';

const CategoryCard = ({ category }) => {
    const { titleName, description } = category;
    return (
        <div className='p-4 rounded-lg shadow-lg shadow-gray-700 lg:shadow-none mx-auto lg:w-[520px] overflow-hidden group bg-sky-400 lg:bg-transparent'>
            <Link to={`products/${category.titleName}`}
                className='rounded-lg'
            >
                <div className="relative rounded-lg">
                    <img src={bgImg} alt="booksCategory" className='skew-x-12 -skew-y-6 group-hover:-rotate-180 group-hover:skew-y-0 group-hover:skew-x-0 duration-500' />
                    <div className="shadow-inner lg:shadow-none shadow-gray-700 lg:absolute bg-sky-600 bg-opacity-90 lg:h-[80%] lg:w-1/2 p-6 rounded-b-md lg:rounded-r-md lg:-ml-80 lg:group-hover:ml-[52%] lg:-mt-[59%] duration-700">
                        <h2 className="text-2xl lg:text-3xl text-orange-500 pb-4 md:pb-2 font-bold text-center lg:text-left">{titleName}</h2>
                        <hr className='hidden md:block' />
                        <p className='md:pt-4 w-full lg:text-normal lg:text-left text-gray-300 text-justify-full leading-relaxed'>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;