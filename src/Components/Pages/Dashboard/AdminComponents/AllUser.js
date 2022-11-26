import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';

const AllUser = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = fetch('http://localhost:5000/users');
            const data = (await res).json();
            return data;
        }
    })

    // Verify Handler 
    const verifyHandler = id => {
        console.log(id);
        fetch(`http://localhost:5000/users/verified/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data); toast.success('Verified Successfully!');
                refetch();
            })
    }

    // User deleting handler 
    const userDelHandler = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data); toast.success('User Deleted Successfully!');
                refetch();
            });
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
                        <th>Verify</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => <tr
                            key={user._id}
                        >
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role ? user.role : 'buyer'}</td>
                            <td>
                                {
                                    user.verify ?
                                        <h4 className='text-success font-semibold'><FaCheck className='text-blue-500' /></h4>
                                        :
                                        <button onClick={() => verifyHandler(user._id)} className='btn btn-sm btn-success btn-outline'>VERIFY</button>
                                }
                            </td>
                            <td><button onClick={() => userDelHandler(user._id)} className='btn btn-sm btn-error'>X</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;