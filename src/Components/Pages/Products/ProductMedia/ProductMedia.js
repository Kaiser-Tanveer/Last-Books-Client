import React from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard';

const ProductMedia = ({ product }) => {
    return (
        <div>
            <ProductCard
                product={product}
            />
            <BookingModal
                product={product}
            />
        </div>
    );
};

export default ProductMedia;