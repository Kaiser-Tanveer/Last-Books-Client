import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import Spinner from '../../Spinner/Spinner';

const AllSellers = () => {
    const { data: users = [], refetch, isLoading, isFetching } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = fetch('https://used-books-server.vercel.app/users/sellers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = (await res).json();
            return data;
        }
    })

    const [showSpinner, setShowSpinner] = useState(isLoading);
    
    useEffect(() => {
        if (isLoading || isFetching) {
          const timer = setTimeout(() => setShowSpinner(true), 1000);
          return () => clearTimeout(timer);
        } else {
          setShowSpinner(false);
        }
      }, [isLoading, isFetching]);
    
      if (showSpinner) {
        return <Spinner />;
      }

    // Verify Handler 
    const verifyHandler = id => {
        fetch(`https://used-books-server.vercel.app/users/sellers/verified/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Verified Successfully!');
                refetch();
            })
    }

    // User deleting handler 
    const userDelHandler = id => {
        const permission = window.confirm('Sure to delete this user!');
        if (permission) {
            fetch(`https://used-books-server.vercel.app/users/sellers/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('User Deleted Successfully!');
                        refetch();
                    }
                });
        }
    }

    return (
        <div className='mt-24'>
        <h2 className='text-3xl font-bold pb-4'>All Sellers</h2>
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
                        users?.map((user, i) => <tr
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
                            <td><button onClick={() => userDelHandler(user._id)} className='btn btn-sm btn-error'><FaTrashAlt /></button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;