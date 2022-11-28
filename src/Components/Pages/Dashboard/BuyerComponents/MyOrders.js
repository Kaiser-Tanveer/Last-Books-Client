import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    // Deleting order 
    const deleteHandler = id => {
        const proceed = window.confirm('Sure to delete this booking!');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/reported/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(() => {
                    toast.success('Deleted Successfully!');
                    refetch();
                });
        };
    }

    // Handling Reports 
    const reportHandler = id => {
        fetch(`http://localhost:5000/bookings/reported/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Reported Successfully!');
                refetch();
            })
    }

    return (
        <>
            {
                orders.length > 0 ?

                    <div className="overflow-x-auto">
                        <h2 className='text-5xl font-bold py-10'>My Orders</h2>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Product</th>
                                    <th>Used Time</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                    <th>Report</th>
                                    <th>Buy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, i) => <tr
                                        key={i}
                                    >
                                        <th>{i + 1}</th>
                                        <td>{order.buyer}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.usedTime}</td>
                                        <td>{order.oldPrice}</td>
                                        <td><button onClick={() => deleteHandler(order._id)} className='btn btn-sm btn-error btn-outline'><FaTrashAlt /></button></td>
                                        <td>
                                            {
                                                order.reported ?
                                                    <h4 className='text-error font-bold'> REPORTED</h4>
                                                    :
                                                    <button onClick={() => reportHandler(order._id)} className='btn btn-sm btn-secondary'>REPORT</button>
                                            }
                                        </td>
                                        <td><Link className='btn btn-sm btn-success' to=''>Pay</Link></td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <h2 className='text-5xl text-center text-orange-500'>You didn't place an order yet!</h2>
            }
        </>
    );
};

export default MyOrders;