import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { img, titleName, description } = category
    return (
        <Link to={`products/${category.titleName}`} >
            <div className="card bg-base-100 shadow-xl image-full h-60">
                <figure><img src={img} alt="booksCategory" /></figure>
                <div className="card-body">
                    <h2 className="card-title mx-auto text-3xl text-white">{titleName}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <p className='text-center text-white'>Click to see all books</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;