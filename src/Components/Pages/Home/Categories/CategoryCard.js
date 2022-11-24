import React from 'react';

const CategoryCard = ({ category }) => {
    const { img, title, description } = category
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src={img} alt="booksCategory" /></figure>
            <div className="card-body">
                <h2 className="card-title mx-auto text-3xl">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <p>Click to see all books</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;