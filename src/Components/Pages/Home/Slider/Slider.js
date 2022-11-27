import React from 'react';
import bannerBg1 from '../../../../Assets/SliderBg/bg1.png';
import bannerBg2 from '../../../../Assets/SliderBg/bg2.png';
import bannerBg3 from '../../../../Assets/SliderBg/bg3.png';
import SliderItems from './SliderItems';

const Slider = () => {
    const sliderData = [
        {
            image: bannerBg1,
            prev: 3,
            id: 1,
            next: 2
        },
        {
            image: bannerBg2,
            prev: 1,
            id: 2,
            next: 3
        },
        {
            image: bannerBg3,
            prev: 2,
            id: 3,
            next: 1
        },
    ]
    return (
        <div>
            <div className="carousel w-full py-10">
                {
                    sliderData.map(slider => <SliderItems
                        key={slider.id}
                        slider={slider}
                    />)
                }
            </div>
        </div>
    );
};

export default Slider;