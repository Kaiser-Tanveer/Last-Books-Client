import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard';

const ProductMedia = ({ product }) => {
    const [modalData, setModalData] = useState({});

    return (
        <div>
            <ProductCard
                setModalData={setModalData}
                product={product}
            />
            {
                modalData && modalData.oldPrice &&
                <BookingModal
                    modalData={modalData}
                    setModalData={setModalData}
                />
            }
        </div>
    );
};

export default ProductMedia;