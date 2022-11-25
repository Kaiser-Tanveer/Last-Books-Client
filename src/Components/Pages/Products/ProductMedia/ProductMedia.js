import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard';

const ProductMedia = ({ product }) => {
    const [book, setBook] = useState(product);
    return (
        <div>
            <ProductCard
                product={product}
            />
            {
                book &&
                <BookingModal
                    product={product}
                    setBook={setBook}
                />
            }
        </div>
    );
};

export default ProductMedia;