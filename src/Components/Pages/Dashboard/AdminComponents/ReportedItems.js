import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ReportedItems = () => {
    // Loading reported items
    const { data: items = [] } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = fetch('http://localhost:5000/bookings/reported');
            const data = (await res).json();
            return (data)
        }
    })
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>SL</th>
                    <th>Products</th>
                    <th>Buyer Name</th>
                    <th>Buyer Email</th>
                    <th>Buyer Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((items, i) => <tr
                        key={items._id}
                    >
                        <th>{i + 1}</th>
                        <td>{items.productName}</td>
                        <td>{items.buyer}</td>
                        <td>{items.email}</td>
                        <td>{items.phone}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default ReportedItems;