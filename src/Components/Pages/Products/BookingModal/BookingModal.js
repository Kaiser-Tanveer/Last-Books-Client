import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';
import { ThreeDots } from 'react-loader-spinner';

const BookingModal = ({ modalData: product, setModalData }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const { user } = useContext(AuthContext);
    const { book, title, newPrice, oldPrice, used } = product;
    
    const bookingHandler = e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            productName: book + ' ' + title,
            buyer: name,
            email,
            phone,
            location,
            newPrice,
            oldPrice,
            usedTime: used,
        }

        // Sending Booking data to backend
        fetch('https://used-books-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.acknowledged) {
                    navigate('/dashboard/myOrders');
                    toast.success('Booking Confirmed');
                } else {
                    toast.error(data.message);
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error('An error occurred, please try again.');
            });
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setModalData(null)} htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 text-orange-500 border-orange-500 bg-white hover:scale-110 hover:bg-orange-500 hover:text-white ease-linear hover:border-orange-700 duration-500">✕</label>
                    <h3 className="text-lg font-bold text-orange-500">"{book}" for {title}</h3>
                    <form onSubmit={bookingHandler}>
                        <input name='name' type="text" defaultValue={user?.displayName} className="input input-bordered w-full my-3" disabled />
                        <input name='email' type="email" defaultValue={user?.email} className="input input-bordered w-full my-3" disabled />
                        <div className='flex justify-between'>
                            <p>Regular Price: ৳<span className='text-error font-bold'><del>{newPrice}</del></span></p>
                            <p>Discount Price: ৳<span className='text-error font-bold'>{oldPrice}</span></p>
                        </div>
                        <input name='phone' type="number" placeholder="Your Phone" className="input input-bordered w-full my-3" required />
                        <textarea name='location' className="textarea textarea-bordered w-full my-3" placeholder="Your Location" required></textarea>
                        {
                            !user && <p className='text-center font-semibold text-xl border-2 border-error'>Please <Link to='/logIn' className='link-hover link-success'>login</Link> to create a Booking</p>
                        }
                        
                        {
                            loading ? (
                                <div className="flex justify-center items-center w-full py-3 btn bg-orange-500 text-white border font-bold border-orange-500 hover:bg-orange-500 hover:border-orange-500 ease-linear duration-500">
                                <ThreeDots height="20" width="50" color="#ffffff" /> 
                                </div>
                            ) : (
                                <input
                                    type="submit"
                                    value='Submit'
                                    className={user ? 
                                        "btn bg-orange-500 text-white border font-bold border-orange-500 hover:bg-orange-500 hover:border-orange-500 w-full ease-linear duration-500"
                                        : 
                                        "btn btn-accent w-full btn-disabled"
                                    }
                                />
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
