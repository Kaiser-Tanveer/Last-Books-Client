import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';
import Spinner from '../../Spinner/Spinner';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard';

const ProductMedia = ({ product }) => {
    const { loading } = useContext(AuthContext);
    const [modalData, setModalData] = useState({});



    if (loading) {
        return <Spinner />
    }
    return (
        <div>
            {/* 
//get the current date
    const currentdate = new Date();
    const date = currentdate.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(date); */}


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