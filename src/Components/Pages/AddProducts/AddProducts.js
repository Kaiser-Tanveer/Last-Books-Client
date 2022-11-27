import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Spinner from '../Spinner/Spinner';

const AddProducts = () => {
    const { user, loading } = useContext(AuthContext);
    const imageSec = process.env.REACT_APP_IMAGEBB_SEC;
    const { register, formState: { errors }, handleSubmit } = useForm('');
    const navigate = useNavigate();

    // Handling Products 
    const productsHandler = data => {
        const image = data.file[0]
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?&key=${imageSec}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const productsData = {
                        titleName: data.title,
                        email: data.email,
                        book: data.book,
                        img: imgData.data.url,
                        details: data.details,
                        location: data.location,
                        newPrice: data.newPrice,
                        oldPrice: data.oldPrice,
                        used: data.used,
                        name: data.name
                    }
                    console.log(productsData);

                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(productsData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (loading) {
                                return <Spinner />
                            }
                            toast.success('Product Added Successfully!');
                            navigate('/myProducts');
                        })
                }
            })
    }
    return (
        <div className='lg:w-4/5 mx-auto card shadow-xl border-2 py-12 my-24'>
            <h2 className='font-bold text-4xl text-center py-7'>Add a Product</h2>
            <form onSubmit={handleSubmit(productsHandler)} className='w-5/6 lg:w-3/5 mx-auto'>
                <div>
                    <label className="label">
                        <span className="label-text">Select the Category:</span>
                    </label>
                    <select {...register("title", { required: 'Category is required' })} className="select select-bordered w-full">
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Intermediate">Intermediate</option>
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Book Name</span>
                    </label>
                    <input type="text" {...register("book", { required: 'Product Name is required' })} placeholder="Name of the Book" className="input input-bordered w-full" />
                    {errors.book && <p className='text-error'>{errors.book.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Book Image</span>
                    </label>
                    <input type="file" {...register("file", { required: 'Product Name is required' })} placeholder="Name of the file" className="file-input file-input-bordered file-input-info w-full" />
                    {errors.file && <p className='text-error'>{errors.file.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Seller Name</span>
                    </label>
                    <input type="text" {...register("name", { required: 'Name is required' })} defaultValue={user?.displayName} className="input input-bordered w-full" readOnly />
                    {errors.name && <p className='text-error'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: 'Email is required' })} defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                    {errors.email && <p className='text-error'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" {...register("location", { required: 'Location is required' })} placeholder="Your Location" className="input input-bordered w-full" />
                    {errors.location && <p className='text-error'>{errors.location.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Purchased Price</span>
                    </label>
                    <input type="number" {...register("newPrice", { required: 'Price is required' })} placeholder="Purchased Price" className="input input-bordered w-full" />
                    {errors.newPrice && <p className='text-error'>{errors.newPrice.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Selling Price</span>
                    </label>
                    <input type="number" {...register("oldPrice", { required: 'Price is required' })} placeholder="Selling Price" className="input input-bordered w-full" />
                    {errors.oldPrice && <p className='text-error'>{errors.oldPrice.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Used Time</span>
                    </label>
                    <input type="text" {...register("used", { required: 'Time is required' })} placeholder="How long you used" className="input input-bordered w-full" />
                    {errors.used && <p className='text-error'>{errors.used.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea type="text" {...register("details", { required: 'Details is required' })} placeholder="Write about your Product" className="input input-bordered w-full" ></textarea>
                    {errors.details && <p className='text-error'>{errors.details.message}</p>}
                </div>

                <input type="submit" value='Add Product' className='w-full btn mt-8 font-bold' />
            </form>
        </div>
    );
};

export default AddProducts;