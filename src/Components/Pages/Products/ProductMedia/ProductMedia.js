import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard';

const ProductMedia = ({ product, user, refetch }) => {
    const [modalData, setModalData] = useState({});
    console.log(user);
    return (
        <div>
            <ProductCard
                setModalData={setModalData}
                product={product}
            />
            {
                modalData &&
                <BookingModal
                    modalData={modalData}
                    setModalData={setModalData}
                />
            }
        </div>
    );
};

export default ProductMedia;