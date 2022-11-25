import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard';

const ProductMedia = ({ product }) => {
    const [books, setBook] = useState(product);
    console.log(books);
    return (
        <div>
            <ProductCard
                product={product}
            />
            {
                books &&
                <BookingModal
                    books={books}
                    setBook={setBook}
                />
            }
        </div>
    );
};

export default ProductMedia;