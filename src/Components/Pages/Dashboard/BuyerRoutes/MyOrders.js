import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className="overflow-x-auto py-20">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Used Time</th>
                        <th>Price</th>
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, i) => <tr
                            key={i}
                        >
                            <th>{i + 1}</th>
                            <td>{order.buyer}</td>
                            <td>{order.productName}</td>
                            <td>{order.usedTime}</td>
                            <td>{order.oldPrice}</td>
                            <td><Link className='btn btn-sm btn-success' to=''>Pay</Link></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;