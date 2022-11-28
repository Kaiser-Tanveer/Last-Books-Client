import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

const MyProdCard = ({ myProduct }) => {
    const { img, title, details, book, oldPrice, used, date, location } = myProduct;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="productImg" className='w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {book} {title}
                    <div className="badge badge-secondary">Price: ৳{oldPrice}</div>
                </h2>
                <p>{details}</p>
                <div>Updated time: <span className="badge badge-secondary">{date}</span></div>
                <div className='flex justify-between my-5'>
                    <div className="badge text-white p-2">Location : <HiLocationMarker className='mx-1' />{location}</div>
                    <div className="badge text-white p-2">Used : {used}</div>
                </div>
                <div className="card-actions justify-end">
                    <div className="btn btn-sm btn-primary font-semibold w-full">ADVERTISE</div>
                </div>
            </div>
        </div>
    );
};

export default MyProdCard;