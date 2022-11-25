import React from 'react';
import { Link } from 'react-router-dom';
import nfBg from '../../../Assets/backgrounds/NotFoundBg.jpg';

const NotFound = () => {
    return (
        <div style={{ background: `linear-gradient(to top, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${nfBg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}>
            <div className='py-32'>
                <h1 className='text-white text-center text-6xl font-bold'>Oops!</h1>
                <h1 className='text-center text-7xl text-orange-500 font-bold py-2'>404</h1>
                <p className='text-white text-center text-xl'><span className='text-2xl'>Error!</span> Page is not found</p>
                <h3 className='text-center text-white'>Back to <Link className='btn btn-outline btn-success btn-sm my-5' to='/'>Homepage</Link></h3>
            </div>
        </div>
    );
};

export default NotFound;