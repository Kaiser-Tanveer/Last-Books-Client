import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigation } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider/AuthProvider';
import Spinner from '../../Spinner/Spinner';

const BookingModal = ({ books: product, setBook }) => {
    const { user } = useContext(AuthContext);
    const { book, title, newPrice, oldPrice, used } = product;
    // console.log(title);
    const navigation = useNavigation();
    const bookingHandler = e => {
        e.preventDefault();
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
        console.log(booking);

        // Sending Booking data to backend
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Booking Confirmed');
                    if (navigation.state === "loading") {
                        return <Spinner />
                    }
                }
                else {
                    toast.error(data.message);
                }
            })
        setBook(null);
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{book} for {title}</h3>
                    <form onSubmit={bookingHandler}>
                        <input name='name' type="text" defaultValue={user?.displayName} className="input input-bordered w-full my-3" disabled />
                        <input name='email' type="email" defaultValue={user?.email} className="input input-bordered w-full my-3" disabled />
                        <div className='flex justify-between'>
                            <p>Regular Price: ৳<del>{newPrice}</del></p>
                            <p>Discount Price: ৳{oldPrice}</p>
                        </div>
                        <input name='phone' type="number" placeholder="Your Phone" className="input input-bordered w-full my-3" required />
                        <textarea name='location' className="textarea textarea-bordered w-full my-3" placeholder="You Location" required></textarea>
                        {
                            !user && <p>Please login to create a Booking</p>
                        }
                        <input type="submit" value='Submit' className={user ?
                            "btn btn-accent w-full"
                            :
                            "btn btn-accent w-full btn-disabled"
                        } />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;