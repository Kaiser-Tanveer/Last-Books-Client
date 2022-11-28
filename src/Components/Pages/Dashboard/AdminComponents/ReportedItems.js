import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ReportedItems = () => {
    // Loading reported items
    const { data: items = [], refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/bookings/reported');
            const data = await res.json();
            return (data);
        }
    });

    // Remove Item 
    const removeHandler = id => {
        const proceed = window.confirm('Sure to delete this Report!');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/reported/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                })
        }
    }
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>SL</th>
                    <th>Products</th>
                    <th>Buyer Name</th>
                    <th>Buyer Email</th>
                    <th>Buyer Phone</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    items?.map((items, i) => <tr
                        key={items._id}
                    >
                        <th>{i + 1}</th>
                        <td>{items.productName}</td>
                        <td>{items.buyer}</td>
                        <td>{items.email}</td>
                        <td>{items.phone}</td>
                        <td><button onClick={() => removeHandler(items._id)} className='btn btn-ghost'><FaTrashAlt className='text-error' /></button></td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default ReportedItems;