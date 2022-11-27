import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';
import MyProdCard from './MyProdCard';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: myProducts = [], } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myProducts?email=${user?.email}`)
            const data = await res.json();
            return data
        }
    })
    return (
        <div className='grid lg:grid-cols-2 gap-2 my-20'>
            {
                myProducts?.map(myProduct => <MyProdCard
                    key={myProduct._id}
                    myProduct={myProduct}
                />)
            }
        </div>
    );
};

export default MyProducts;