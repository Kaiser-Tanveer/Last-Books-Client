import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

const AllBuyers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = fetch('https://used-books-server.vercel.app/users/buyers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = (await res).json();
            console.log(data);
            return data;
        }
    })

    // User deleting handler 
    const userDelHandler = id => {
        const permission = window.confirm('Sure to delete this user!');
        if (permission) {
            fetch(`https://used-books-server.vercel.app/users/buyers/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        console.log(data);
                        toast.success('User Deleted Successfully!');
                        refetch();
                    }
                });
        }
    }

    return (
        <div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, i) => <tr
                            key={user._id}
                        >
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role ? user.role : 'buyer'}</td>
                            <td><button onClick={() => userDelHandler(user._id)} className='btn btn-sm btn-error'><FaTrashAlt /></button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBuyers;