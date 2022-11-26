import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const AllUser = () => {
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = fetch('http://localhost:5000/users')
            const data = (await res).json();
            return data;
        }
    })
    return (
        <div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Verify</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => <tr
                            key={i}
                        >
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><FaCheck className='text-blue-500' /></td>
                            <td><button className='btn btn-sm btn-error'>X</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;