import React from 'react';
import { MagnifyingGlass,  } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <div className='h-[100vh] flex mx-auto items-center justify-center'>
            <MagnifyingGlass
            visible={true}
            height="120"
            width="120"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#0da5e9"
            color="#f97316"
            />
        </div>
    );
};

export default Spinner;